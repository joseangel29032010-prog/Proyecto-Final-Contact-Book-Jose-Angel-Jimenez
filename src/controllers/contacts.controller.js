
const { Op } = require('sequelize');
const { Contact, Category } = require('../models');
const AppError = require('../utils/AppError');

async function findContact(id, userId) {
  const contact = await Contact.findOne({
    where: { id, userId },
    include: [{ model: Category, as: 'category' }],
  });

  return contact;
}

function formatContact(contact) {
  const data = contact.get({ plain: true });
  data.category = data.category.name;
  return data;
}

async function getAllContacts(req, res, next) {
  try {
    const contacts = await Contact.findAll({
      where: { userId: req.user.id },
      include: [{ model: Category, as: 'category' }],
    });

    res.status(200).json({
      contacts: contacts.map(formatContact),
    });
  } catch (error) {
    next(error);
  }
}

async function getContactById(req, res, next) {
  try {
    const contact = await findContact(req.params.id, req.user.id);

    if (!contact) {
      throw new AppError('Contacto no encontrado', 404);
    }

    res.status(200).json({ contact: formatContact(contact) });
  } catch (error) {
    next(error);
  }
}

async function createContact(req, res, next) {
  try {
    const { name, phone, email, favorite } = req.body;
    const categoryName = req.body.category || 'other';

    const duplicate = await Contact.findOne({
      where: { phone, userId: req.user.id },
    });

    if (duplicate) {
      throw new AppError('Este teléfono ya está registrado', 409);
    }

    const category = await Category.findOne({
      where: { name: categoryName },
    });

    const contact = await Contact.create({
      name,
      phone,
      email,
      favorite: favorite ?? false,
      userId: req.user.id,
      categoryId: category.id,
    });

    const savedContact = await findContact(contact.id, req.user.id);

    res.status(201).json({
      message: 'Contacto creado correctamente',
      contact: formatContact(savedContact),
    });
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      return next(new AppError('Este teléfono ya está registrado', 409));
    }
    next(error);
  }
}

async function updateContact(req, res, next) {
  try {
    const contact = await findContact(req.params.id, req.user.id);

    if (!contact) {
      throw new AppError('Contacto no encontrado', 404);
    }

    const { name, phone, email, favorite } = req.body;
    const categoryName = req.body.category ?? 'other';

    const duplicate = await Contact.findOne({
      where: {
        phone,
        userId: req.user.id,
        id: { [Op.ne]: contact.id },
      },
    });

    if (duplicate) {
      throw new AppError('Este teléfono ya está registrado', 409);
    }

    const category = await Category.findOne({
      where: { name: categoryName },
    });

    await contact.update({
      name,
      phone,
      email,
      favorite: favorite ?? false,
      categoryId: category.id,
    });

    const updatedContact = await findContact(contact.id, req.user.id);

    res.status(200).json({
      message: 'Contacto actualizado correctamente',
      contact: formatContact(updatedContact),
    });
  } catch (error) {
    next(error);
  }
}

async function toggleFavorite(req, res, next) {
  try {
    const contact = await findContact(req.params.id, req.user.id);

    if (!contact) {
      throw new AppError('Contacto no encontrado', 404);
    }

    await contact.update({ favorite: !contact.favorite });

    const updatedContact = await findContact(contact.id, req.user.id);

    res.status(200).json({
      message: 'Favorito actualizado',
      contact: formatContact(updatedContact),
    });
  } catch (error) {
    next(error);
  }
}

async function deleteContact(req, res, next) {
  try {
    const contact = await findContact(req.params.id, req.user.id);

    if (!contact) {
      throw new AppError('Contacto no encontrado', 404);
    }

    await contact.destroy();

    res.status(200).json({
      message: 'Contacto eliminado correctamente',
    });
  } catch (error) {
    next(error);
  }
}

async function getContactStats(req, res, next) {
  try {
    const contacts = await Contact.findAll({
      where: { userId: req.user.id },
      include: [{ model: Category, as: 'category' }],
    });

    const byCategory = {
      family: 0,
      friends: 0,
      work: 0,
      other: 0,
    };

    contacts.forEach((contact) => {
      byCategory[contact.category.name]++;
    });

    res.status(200).json({
      clientId: req.clientId,
      total: contacts.length,
      favorites: contacts.filter((contact) => contact.favorite).length,
      byCategory,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  toggleFavorite,
  deleteContact,
  getContactStats,
};
