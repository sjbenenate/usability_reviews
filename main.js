import { server } from './src/server.js';
import 'dotenv/config';

const PORT = process.env.PORT || 3000;

const PRODUCTION = process.env.PROD_ENV.toUpperCase() === 'TRUE';
console.log(PRODUCTION);
if (PRODUCTION) {
  console.log('RUNNING IN PRODUCTION MODE');
} else {
  console.log('non-production mode');
}
server.start(PORT);
