import type { NextRequest } from 'next/server';

import { paramCase } from 'src/utils/change-case';
import { STATUS, response, handleError } from 'src/utils/response';

import { db } from 'src/db/lib/db';  // Import the Drizzle ORM instance
import { posts } from 'src/db/schema';  // Import the schema for the posts table

// ----------------------------------------------------------------------

export const runtime = 'edge';

/** **************************************
 * Get post details
 *************************************** */
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl;
    const title = searchParams.get('title');

    const allPosts = await db.select().from(posts);

    const post = allPosts.find((post) => paramCase(post.title) === title);

    if (!post) {
      return response({ message: 'Post not found!' }, STATUS.NOT_FOUND);
    }

    return response({ post }, STATUS.OK);
  } catch (error) {
    return handleError('Post - Get details', error);
  }
}
    

  
