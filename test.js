const request = require('supertest');
const app = require('./app');

describe('Cozy Bean Café Tests', () => {
  it('GET / should return 200', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toEqual(200);
  });

  it('GET /overview should return 200', async () => {
    const res = await request(app).get('/overview');
    expect(res.statusCode).toEqual(200);
  });

  it('GET /menu should return 200', async () => {
    const res = await request(app).get('/menu');
    expect(res.statusCode).toEqual(200);
  });

  it('GET /cart should return 200', async () => {
    const res = await request(app).get('/cart');
    expect(res.statusCode).toEqual(200);
  });
});