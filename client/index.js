import 'dotenv/config';
import next from 'next';

const PRODUCTION = process.env.PROD_ENV.toUpperCase() === 'TRUE';
if (PRODUCTION) {
  console.log('RUNNING IN PRODUCTION MODE');
} else {
  console.log('non-production mode');
}

const nextApp = next({ dev: !PRODUCTION });
const handle = nextApp.getRequestHandler();

export { nextApp, handle };
