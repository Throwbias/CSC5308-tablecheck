// Example: tests/auth.test.js
const request = require('supertest');
const app = require('../../server');

describe('Security: Authentication', () => {
  test('GET /api/rides returns 401 when no token is provided', async () => {
   const response = await request(app).get('/api/tables');
    expect(response.status).toBe(401);
  });
});