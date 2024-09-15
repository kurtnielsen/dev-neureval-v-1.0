// import { drizzle } from 'drizzle-orm/node-postgres';
// import { Pool } from 'pg';
// import * as dotenv from 'dotenv';
// import * as schema from '@/db/schema'; // Adjust the import path as needed

// previous setup
// dotenv.config();
// const pool = new Pool({
//   connectionString: process.env.DATABASE_URL,
// });

// const db = drizzle(pool, { schema });

// export default db;

//*****************************************************************************//=
// updated bassed on drizzle docs
//*****************************************************************************//=
import { config } from 'dotenv';
import { defineConfig } from 'drizzle-kit';

config({ path: '.env' });
export default defineConfig({
  schema: './src/db/schema.ts',
  out: './supabase/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
