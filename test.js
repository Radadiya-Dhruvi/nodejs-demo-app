const request = require('supertest');
const app = require('./app');

describe('Cozy Bean Café Workflow Tests', () => {
  it('loads mandatory login page on root url', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toEqual(200);
    expect(res.text).toContain('Please login to enter our café experience');
  });

  it('loads café overview page with background hero and Australia location', async () => {
    const res = await request(app).get('/overview');
    expect(res.statusCode).toEqual(200);
    expect(res.text).toContain('Melbourne VIC 3000, Australia');
  });

  it('loads menu page with multiple horizontal categories', async () => {
    const res = await request(app).get('/menu');
    expect(res.statusCode).toEqual(200);
    expect(res.text).toContain('Caramel Macchiato');
    expect(res.text).toContain('Crispy Paneer Burger');
    expect(res.text).toContain('Blue Lagoon Soda');
  });

  it('loads cart and payment checkout options', async () => {
    const res = await request(app).get('/cart');
    expect(res.statusCode).toEqual(200);
    expect(res.text).toContain('Your Order Summary');
    expect(res.text).toContain('UPI / QR Code');
    expect(res.text).toContain('Debit / Credit Card');
  });
});