import request from 'supertest';
import { jest } from '@jest/globals';
import { server } from './server.js';

describe('Server Endpoints', () => {
  afterAll((done) => {
    server.stop(done);
  });

  beforeAll(() => {
    server.start();
  });

  it('should return hello world', async () => {
    const response = await request(server)
      .get('/')
      .expect('Content-Type', /text\/html/)
      .expect(200);

    expect(response.text).toBe('Hello, world!\n');
  });

  it('should handle server errors', async () => {
    const mockError = new Error('Test error');
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

    server.emit('error', mockError);

    expect(consoleSpy).toHaveBeenCalledWith('Server error:', mockError);
    consoleSpy.mockRestore();
  });
});
