import { NextRequest, NextResponse } from 'next/server';
import { db } from 'src/db/lib/db'; // Drizzle ORM instance
import { authors } from 'src/db/schema'; // Your authors schema
import { supabase } from 'src/supabaseClient'; // Supabase client for auth

export async function POST(req: NextRequest) {
  try {
    // Parse the incoming request body
    const { name, avatarUrl } = await req.json();

    // Validate input
    if (!name || !avatarUrl) {
      return NextResponse.json({ error: 'Name and avatarUrl are required' }, { status: 400 });
    }

    // Get the authenticated user from Supabase
    const { data: { session } } = await supabase.auth.getSession();

    const userId = session?.user?.id || null; // Use the user ID if available, otherwise null
    const isAdmin = session?.user?.role === 'authenticated'; // Example admin logic, you can modify it

    // Insert new author into the database
    const newAuthor = await db.insert(authors).values({
      name,
      avatarUrl,
      userId,    // Insert userId (or null for anonymous users)
      isAdmin,   // Insert isAdmin based on the user role
    }).returning();

    // Return the newly inserted author data
    return NextResponse.json({ data: newAuthor }, { status: 201 });
  } catch (error) {
    console.error('Error creating new author:', error);
    return NextResponse.json({ error: 'Failed to create author', detail: error }, { status: 500 });
  }
}
