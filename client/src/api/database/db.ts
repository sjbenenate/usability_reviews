// db.ts
import { Pool } from 'pg';

const options = {
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  user: process.env.POSTGRES_USER,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
  maxLifetimeSeconds: 60,
};

const connectionPool = new Pool(options);

export { connectionPool };
