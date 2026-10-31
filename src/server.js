require('dotenv').config();

const app = require('./app');
const sequelize = require('./config/database');
require('./models');

const seedInitialData = require('./data/initialData');

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    await sequelize.authenticate();
    console.log('Conexión con PostgreSQL establecida correctamente');

    await sequelize.sync();
    console.log('Modelos sincronizados con PostgreSQL');

    await seedInitialData();

    app.listen(PORT, () => {
      console.log(`Contact Book API ejecutándose en el puerto ${PORT}`);
    });
  } catch (error) {
    console.error('Error al iniciar el servidor:', error);
    process.exit(1);
  }
}

startServer();