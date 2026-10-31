const User = require('./User');
const Contact = require('./Contact');
const Category = require('./Category');

// Un usuario puede tener muchos contactos.
User.hasMany(Contact, {
  foreignKey: 'userId',
  as: 'contacts',
});

Contact.belongsTo(User, {
  foreignKey: 'userId',
  as: 'user',
});

// Una categoría puede tener muchos contactos.
Category.hasMany(Contact, {
  foreignKey: 'categoryId',
  as: 'contacts',
});

Contact.belongsTo(Category, {
  foreignKey: 'categoryId',
  as: 'category',
});

module.exports = {
  User,
  Contact,
  Category,
};