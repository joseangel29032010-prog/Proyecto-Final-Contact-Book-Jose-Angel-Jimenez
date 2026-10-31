
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');

const contactsRoutes = require('./routes/contacts.routes');
const authRoutes = require('./routes/auth.routes');
const adminRoutes = require('./routes/admin.routes');
const requestTimer = require('./middlewares/requestTimer');
const notFound = require('./middlewares/notFound');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

app.use(helmet());
app.use(cors({ origin: 'http://localhost:5173' }));
app.use(morgan('dev'));
app.use(express.json());
app.use(requestTimer);


app.get('/', (req, res) => {
  res.json({ message: 'Contact Book API funcionando' });
});

app.get('/health', async (req, res) => {
  try {
    await require('./config/database').authenticate();

    res.status(200).json({
      status: 'OK',
      database: 'connected',
    });
  } catch (error) {
    res.status(503).json({
      status: 'ERROR',
      database: 'disconnected',
    });
  }
});


app.use('/contacts', contactsRoutes);
app.use('/auth', authRoutes);
app.use('/admin', adminRoutes);
console.log('Rutas /contacts cargadas');

app.use(notFound);
app.use(errorHandler);

module.exports = app;
