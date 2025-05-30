const request = require('supertest');
const server = require('../server.js');

describe('Server Endpoints', () => {
  it('should return hello world', async () => {
    const res = await request(server)
      .get('/')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(res.body.message).toBe('Hello, world!\n');
  });
});
