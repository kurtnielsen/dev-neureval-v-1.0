import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from '../schema'; // Import your schema here
import 'dotenv/config';

  const pool = new Pool({
    host: process.env.PG_HOST || 'aws-0-us-west-1.pooler.supabase.com',
    port: Number(process.env.PG_PORT || 6543),
    user: process.env.PG_USER || 'postgres.jrpnzhqsnwvibpojjgeq',
    password: process.env.PG_PASSWORD || 'dvLtgTMY4DhSxBLo',
    database: process.env.PG_DATABASE || 'postgres',
  });

export const db = drizzle(pool, { schema });
