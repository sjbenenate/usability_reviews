import express from 'express';

const PORT = process.env.PORT || 3000;

const server = express();

const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).send('Hello, world!\n');
});

server.use(router);

server.on('error', (error) => {
  console.error('Server error:', error);
});

server.start = async () => {
  server._runningInstance = server.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
  });
};

server.stop = (done) => {
  server._runningInstance.close(done);
};

export { server };
