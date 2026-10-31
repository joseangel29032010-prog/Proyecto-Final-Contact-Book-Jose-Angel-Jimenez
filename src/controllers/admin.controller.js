const { User } = require('../models');
const AppError = require('../utils/AppError');

async function getUsers(req, res, next) {
  try {
    const users = await User.findAll({
      attributes: { exclude: ['passwordHash'] },
    });

    res.status(200).json({ users });
  } catch (error) {
    next(error);
  }
}

async function updateUserRole(req, res, next) {
  try {
    const { role } = req.body;
    const allowedRoles = ['member', 'manager', 'admin'];

    if (!allowedRoles.includes(role)) {
      throw new AppError(
        'El rol debe ser member, manager o admin',
        400
      );
    }

    const user = await User.findByPk(req.params.id);

    if (!user) {
      throw new AppError('Usuario no encontrado', 404);
    }

    await user.update({ role });

    const safeUser = user.get({ plain: true });
    delete safeUser.passwordHash;

    res.status(200).json({
      message: 'Rol actualizado correctamente',
      user: safeUser,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = { getUsers, updateUserRole };