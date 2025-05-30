import express from 'express';

const PORT = Number(process.env.SERVER_PORT) || 3000;
console.log(PORT);
const server = express();

const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).send('Hello, world!\n');
});

server.use(router);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
