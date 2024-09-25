import { db } from 'src/db/lib/db';  // Import the Drizzle ORM instance
import { posts } from 'src/db/schema';  // Import the schema for the posts table
import { STATUS, response, handleError } from 'src/utils/response';

// ----------------------------------------------------------------------

/** **************************************
 * Get list of posts
 *************************************** */
export async function GET() {
  try {
    const allPosts = await db.select().from(posts);  // Query all posts
    return response({ posts: allPosts }, STATUS.OK);
  } catch (error) {
    return handleError('Post - Get list', error);
  }
}