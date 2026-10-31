
require('dotenv').config();

const request = require('supertest');
const app = require('../src/app');
const sequelize = require('../src/config/database');

describe('Pruebas de Contact Book API', () => {
  test('GET / debe responder correctamente', async () => {
    const response = await request(app).get('/');

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Contact Book API funcionando');
  });

  test('GET /health debe confirmar la conexión con PostgreSQL', async () => {
    const response = await request(app).get('/health');

    expect(response.status).toBe(200);
    expect(response.body.status).toBe('OK');
    expect(response.body.database).toBe('connected');
  });

  test('Una ruta inexistente debe responder 404', async () => {
    const response = await request(app).get('/ruta-inexistente');

    expect(response.status).toBe(404);
  });
});

afterAll(async () => {
  await sequelize.close();
});
