import { server } from './server/server.js';
import 'dotenv/config';

const PORT = process.env.PORT || 3000;

server.start(PORT);
