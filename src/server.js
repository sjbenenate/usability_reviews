import express from 'express';

const server = express();

const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).send('Hello, world!\n');
});

server.use(router);

server.on('error', (error) => {
  console.error('Server error:', error);
});

server.start = async (port) => {
  server._runningInstance = server.listen(port, () => {
    console.log(`server is running on port ${port}`);
  });
};

server.stop = (done) => {
  server._runningInstance.close(done);
};

export { server };
