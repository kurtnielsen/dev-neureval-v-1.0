import { db } from 'src/db/lib/db';  // Drizzle ORM instance
import { posts } from 'src/db/schema';  // Posts schema
import { STATUS, response, handleError } from 'src/utils/response';

// export const runtime = 'edge';
export const runtime = 'nodejs';

export async function POST(req: Request) {
  try {
    const body = await req.json();  // Parse the request body
    console.log('Incoming data:', body);

    // Insert the new post into the database using the Drizzle ORM
    const newPost = await db.insert(posts).values(body).returning();
    //   {
    //   title: body.title,
    //   content: body.content,
    //   createdById: body.createdById,  // Assuming you have an author or user ID
    //   createdAt: new Date(),
    // }).returning();

    // return response({ post: newPost }, STATUS.CREATED);
    return new Response(JSON.stringify({ post: newPost }), { status: 201 });
  } catch (error) {
    console.error('Error creating new post:', error);
    // return handleError('Error creating new post', error);
    return new Response('Error creating post', { status: 500 });
  }
}
