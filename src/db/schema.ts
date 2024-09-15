import { pgTable, serial, text, varchar, timestamp, integer } from 'drizzle-orm/pg-core';
import { drizzle } from 'drizzle-orm/node-postgres';
import * as dotenv from 'dotenv';
import { sql } from 'drizzle-orm/sql';
import { Pool } from 'pg';

dotenv.config();

// Define the User table
export const users = pgTable('users', {
  id: text('id').primaryKey().default('cuid()'),
  firstName: text('first_name'),
  lastName: text('last_name'),
  displayName: text('display_name'),
  phoneNumber: text('phone_number'),
  address: text('address'),
  state: text('state'),
  city: text('city'),
  zipCode: text('zip_code'),
  email: text('email').unique(),
  emailVerified: timestamp('email_verified'),
  image: text('image'),
});

export type User = typeof users.$inferSelect; // return type when queried
export type NewUser = typeof users.$inferInsert; // insert type

// Define the Post table
export const posts = pgTable('posts', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  createdAt: timestamp('created_at').default(sql`now()`),
  updatedAt: timestamp('updated_at').default(sql`now()`),
  createdById: text('created_by_id').notNull(),
});

export type Post = typeof posts.$inferSelect; // return type when queried
export type NewPost = typeof posts.$inferInsert; // insert type

// Define the Account table
export const accounts = pgTable('accounts', {
  id: text('id').primaryKey().default('cuid()'),
  userId: text('user_id').notNull(),
  type: text('type').notNull(),
  provider: text('provider').notNull(),
  providerAccountId: text('provider_account_id').notNull(),
  refreshToken: text('refresh_token'),
  accessToken: text('access_token'),
  expiresAt: integer('expires_at'),
  tokenType: text('token_type'),
  scope: text('scope'),
  idToken: text('id_token'),
  sessionState: text('session_state'),
  refreshTokenExpiresIn: integer('refresh_token_expires_in'),
});

export type Account = typeof accounts.$inferSelect; // return type when queried
export type NewAccount = typeof accounts.$inferInsert; // insert type

// Initialize the database connection
const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  throw new Error('DATABASE_URL is not set in the environment variables.');
}

const pool = new Pool({
  connectionString: databaseUrl,
});

export const db = drizzle(pool, { schema: { users, posts, accounts } });
