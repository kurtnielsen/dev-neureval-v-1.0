import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from '../schema'; // Import your schema here
import 'dotenv/config';

const pool = new Pool({
  host: process.env.PG_HOST,
  port: Number(process.env.PG_PORT || 6543),
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DATABASE,
});

export const db = drizzle(pool, { schema });
