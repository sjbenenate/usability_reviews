import express from 'express';
import { clerkMiddleware } from '@clerk/express';
import { UsersRouter } from './routes/users.js';

const server = express();

// MIDDLEWARE

server.use(clerkMiddleware());

// ERRORS

server.on('error', (error) => {
  console.error('Server error:', error);
});

// CUSTOM METHODS

server.start = async (port) => {
  server._runningInstance = server.listen(port, () => {
    console.log(`server is running on port ${port}`);
  });
};

server.stop = (done) => {
  server._runningInstance.close(done);
};

// ENDPOINTS
server.use('/api/users', UsersRouter);

server.get('/', (req, res) => {
  res.status(200).send('Hello, world!\n');
});

export { server };
