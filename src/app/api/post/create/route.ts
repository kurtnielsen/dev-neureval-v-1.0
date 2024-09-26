import { NextRequest } from 'next/server';
import { db } from 'src/db/lib/db';  // Drizzle ORM instance
import { posts } from 'src/db/schema';  // Posts schema
import { logger } from 'src/utils/logger';
import { STATUS, response, handleError } from 'src/utils/response';
// ----------------------------------------------------------------------
// ToDo: 
// 1. Get the user session from Supabase
// 2. Extract the user ID from the session
// 3. Insert the user ID into the post as created_by_id before saving it to the database

// ----------------------------------------------------------------------

// export const runtime = 'edge';
export const runtime = 'nodejs';


export async function POST(req: Request) {
  try {
    const body = await req.json();  // Parse the request body
    console.log('Incoming data:', body);

    if (!body.createdById) {
      throw new Error('User ID is required');
    }
    // Insert the new post into the database using the Drizzle ORM
 
  const newPost = await db.insert(posts).values({
    title: body.title,
    content: body.content,
    createdById: body.createdById,
    createdAt: new Date(),
    description: body.description,
    coverUrl: body.coverUrl,
    tags: body.tags,
    metaKeywords: body.metaKeywords,
    metaTitle: body.metaTitle,
    metaDescription: body.metaDescription,
  }).returning();

  return response({ post: newPost }, STATUS.CREATED);
    } catch (error) {
      console.error('Error creating new post:', error);
      return handleError('Error creating new post', error);
    }
  }

    // const newPost = await db.insert(posts).values(body).returning();
    //   {
    //   title: body.title,
    //   content: body.content,
    //   createdById: body.createdById,  // Assuming you have an author or user ID
    //   createdAt: new Date(),
    // }).returning();

    // return response({ post: newPost }, STATUS.CREATED);
//     return new Response(JSON.stringify({ post: newPost }), { status: 201 });
//   } catch (error) {
//     console.error('Error creating new post:', error);
//     // return handleError('Error creating new post', error);
//     return new Response('Error creating post', { status: 500 });
//   }
// }
