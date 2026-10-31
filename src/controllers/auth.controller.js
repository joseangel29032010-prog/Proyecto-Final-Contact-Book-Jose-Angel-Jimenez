const bcrypt = require('bcryptjs');
const AppError = require('../utils/AppError');
const { User } = require('../models');
const { signToken } = require('../utils/jwt');

function publicUser(user) {
  const safeUser = user.get({ plain: true });
  delete safeUser.passwordHash;
  return safeUser;
}

async function register(req, res, next) {
  try {
    const { name, email, password } = req.body;

    const normalizedEmail = email.toLowerCase().trim();

    const existingUser = await User.findOne({
      where: { email: normalizedEmail },
    });

    if (existingUser) {
      throw new AppError('El email ya está registrado', 409);
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email: normalizedEmail,
      passwordHash,
      role: 'member',
    });

    const token = signToken(user);

    res.status(201).json({
      user: publicUser(user),
      token,
    });
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      return next(new AppError('El email ya está registrado', 409));
    }

    next(error);
  }
}

async function login(req, res, next) {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({
      where: { email: email.toLowerCase().trim() },
    });

    if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
      throw new AppError('Credenciales inválidas', 401);
    }

    const token = signToken(user);

    res.status(200).json({
      user: publicUser(user),
      token,
    });
  } catch (error) {
    next(error);
  }
}

async function me(req, res, next) {
  try {
    const user = await User.findByPk(req.user.id);

    if (!user) {
      throw new AppError('Token inválido o expirado', 401);
    }

    res.status(200).json({
      user: publicUser(user),
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  register,
  login,
  me,
};