const bcrypt = require('bcryptjs');
const { User, Category } = require('../models');

async function seedInitialData() {
  const categories = ['family', 'friends', 'work', 'other'];

  for (const name of categories) {
    await Category.findOrCreate({
      where: { name },
    });
  }

  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;

  if (!email || !password) {
    throw new Error('Faltan ADMIN_EMAIL o ADMIN_PASSWORD en .env');
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const [, created] = await User.findOrCreate({
    where: { email: email.toLowerCase() },
    defaults: {
      name: 'Administrador',
      email: email.toLowerCase(),
      passwordHash,
      role: 'admin',
    },
  });

  console.log(
    created
      ? 'Administrador inicial creado.'
      : 'El administrador inicial ya existe.'
  );
}

module.exports = seedInitialData;