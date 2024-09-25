import type { NextRequest } from 'next/server';

import { paramCase } from 'src/utils/change-case';
import { STATUS, response, handleError } from 'src/utils/response';

import { db } from 'src/db/lib/db';  // Import the Drizzle ORM instance
import { posts } from 'src/db/schema';  // Import the schema for the posts table


// ----------------------------------------------------------------------

export const runtime = 'edge';

/** **************************************
 * Get latest posts
 *************************************** */
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl;
    const title = searchParams.get('title');

    const post = await db.select().from(posts);

    const latestPosts = post.filter((post: { title: string; }) => paramCase(post.title) !== title);

    return response({ latestPosts }, STATUS.OK);
  } catch (error) {
    return handleError('Post - Get latest', error);
  }
}


// ----------------------------------------------------------------------
