import { pgTable, uuid, varchar, text, timestamp, integer, boolean, PgTable, real } from 'drizzle-orm/pg-core';
import { drizzle } from 'drizzle-orm/node-postgres';
import * as dotenv from 'dotenv';
import { sql } from 'drizzle-orm/sql';
import { Pool } from 'pg';
import { relations } from 'drizzle-orm';
import { z } from 'zod';

dotenv.config();

// ---- Zod Validation Schemas for Type Safety (Optional but Recommended) ----

export const userSchema = z.object({
  id: z.string().uuid(),
  displayName: z.string().min(1),
  email: z.string().email(),
  phoneNumber: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
});

export const postSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(1),
  content: z.string(),
  createdById: z.string().uuid(),
});

// ---- Tables Definitions ----

// Accounts Table
export const accounts = pgTable('accounts', {
  id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
  userId: uuid('user_id').references(() => users.id).notNull(),
  type: varchar('type', { length: 50 }).notNull(),
  provider: varchar('provider', { length: 50 }).notNull(),
  providerAccountId: varchar('provider_account_id', { length: 50 }).notNull(),
  refreshToken: text('refresh_token'),
  accessToken: text('access_token'),
  expiresAt: integer('expires_at'),
  tokenType: text('token_type'),
  scope: text('scope'),
  idToken: text('id_token'),
  sessionState: text('session_state'),
  refreshTokenExpiresIn: integer('refresh_token_expires_in'),
});

// Authors Table
export const authors = pgTable('authors', {
  id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
  name: varchar('name', { length: 255 }).notNull(),
  avatarUrl: text('avatar_url'),
});

// PostTags Join Table
export const postTags = pgTable('post_tags', {
  postId: uuid('post_id').references(() => posts.id).notNull(),
  tagId: uuid('tag_id').references(() => tags.id).notNull(),
});

// Audit Logs Table
export const auditLogs = pgTable('audit_logs', {
  id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
  userId: uuid('user_id').references(() => users.id),
  entityId: uuid('entity_id'),
  entityType: varchar('entity_type', { length: 50 }),
  action: varchar('action', { length: 50 }),
  timestamp: timestamp('timestamp').default(sql`now()`),
  details: text('details'),
});

// ConversationParticipants Join Table
export const conversationParticipants = pgTable('conversation_participants', {
  conversationId: uuid('conversation_id').references(() => conversations.id),
  participantId: uuid('participant_id').references(() => users.id),
});

// Conversations Table
export const conversations = pgTable('conversations', {
  id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
  type: varchar('type', { length: 50 }),
  unreadCount: integer('unread_count').default(0),
});

// Files Table
export const files = pgTable('files', {
  id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
  name: varchar('name', { length: 255 }),
  path: varchar('path', { length: 255 }),
  preview: varchar('preview', { length: 255 }),
  size: real('size'),
  createdAt: timestamp('created_at').default(sql`now()`),
  modifiedAt: timestamp('modified_at'),
  type: varchar('type', { length: 50 }),
});

// ProductImages Join Table for Product-to-Files Relationship
export const productImages = pgTable('product_images', {
  productId: uuid('product_id').references(() => products.id),
  imageId: uuid('image_id').references(() => files.id),
});

// Products Table
export const products = pgTable('products', {
  id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
  name: varchar('name', { length: 255 }).notNull(),
  description: text('description'),
  price: real('price').notNull(),
  createdAt: timestamp('created_at').default(sql`now()`),
  updatedAt: timestamp('updated_at').default(sql`now()`),
});

// Tasks Table
export const tasks = pgTable('tasks', {
  id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
  reporter: uuid('reporter').references(() => users.id),
  name: varchar('name', { length: 255 }),
  labels: varchar('labels', { length: 50 }).array(),
  description: text('description'),
  due: timestamp('due'),
  priority: varchar('priority', { length: 50 }),
  status: varchar('status', { length: 50 }),
});

// JOIN Tables ----------------------------------------------------------------------------------------------------

// Posts Table
export const posts = pgTable('posts', {
  id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
  publish: varchar('publish', { length: 50 }),
  metaKeywords: varchar('meta_keywords', { length: 255 }).array(),
  content: text('content'),
  tags: varchar('tags', { length: 50 }).array(),
  metaTitle: varchar('meta_title', { length: 255 }),
  createdAt: timestamp('created_at').default(sql`now()`),
  updatedAt: timestamp('updated_at').default(sql`now()`),
  title: varchar('title', { length: 255 }).notNull(),
  coverUrl: varchar('cover_url', { length: 255 }),
  totalViews: integer('total_views').default(0),
  totalShares: integer('total_shares').default(0),
  totalComments: integer('total_comments').default(0),
  totalFavorites: integer('total_favorites').default(0),
  metaDescription: text('meta_description'),
  description: text('description'),
  createdById: uuid('created_by_id').references(() => users.id).notNull(), // Foreign key to users
});

// Tags Table
export const tags = pgTable('tags', {
  id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
  name: varchar('name', { length: 100 }).notNull().unique(),
});

// // Comments Table
// export const comments = pgTable('comments', {
//   id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
//   postId: uuid('post_id').references(() => posts.id).notNull(),
//   userId: uuid('user_id').references(() => users.id).notNull(),
//   message: text('message').notNull(),
//   postedAt: timestamp('posted_at').default(sql`now()`),
//   replyCommentId: uuid('reply_comment_id').references(() => comments.id).nullable(), // Nullable for top-level comments
// });

// // Relations for Self-referencing in Comments
// export const commentRelations = relations(comments, ({ one }): { parentComment: ReturnType<typeof one> } => ({
//   parentComment: one(comments, {
//     fields: [comments.replyCommentId],
//     references: [comments.id],
//     nullable: true,
//   }),
// }));

// -----------------------------------------------------------------------------------------------------------------
// ----Users Table----

// Users Table
export const users = pgTable('users', {
  id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
  displayName: varchar('display_name', { length: 255 }),
  photoURL: varchar('photo_url', { length: 255 }),
  phoneNumber: varchar('phone_number', { length: 20 }),
  country: varchar('country', { length: 100 }),
  address: varchar('address', { length: 255 }),
  state: varchar('state', { length: 100 }),
  city: varchar('city', { length: 100 }),
  zipCode: varchar('zip_code', { length: 20 }),
  about: text('about'),
  role: varchar('role', { length: 50 }),
  isPublic: boolean('is_public').default(false),
  email: varchar('email', { length: 255 }).unique().notNull(),
  password: varchar('password', { length: 255 }).notNull(),
});


// ---- Initialize Database Connection ----

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export const db = drizzle(pool, {
  schema: {
    accounts,
    authors,
    postTags,
    auditLogs,
    conversationParticipants,
    conversations,
    files,
    productImages,
    products,
    tasks,
    posts,
    tags,
    users,
    // comments,
    // commentRelations,
  },
});

// Running Supabase Locally
// https://supabase.com/docs/guides/cli/getting-started#installing-the-supabase-cli