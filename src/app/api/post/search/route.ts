import type { NextRequest } from 'next/server';

import { STATUS, response, handleError } from 'src/utils/response';

import { db, posts } from 'src/db/schema';  // Import the schema for the posts table

// ----------------------------------------------------------------------

export const runtime = 'edge';

/** **************************************
 * Get search results
 *************************************** */
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl;
    const query = searchParams.get('query');

    if (query) {
      const cleanQuery = query?.toLowerCase().trim() ?? '';
      const results = (await db.select().from(posts)).filter((post: { title: string }) => post.title.toLowerCase().includes(cleanQuery));
      return response({ results }, STATUS.OK);
    }

    const results = await db.select().from(posts);
    return response({ results }, STATUS.OK);
  } catch (error) {
    return handleError('Post - Get search', error);
  }
}
