import { NextRequest, NextResponse } from 'next/server';
import { db } from 'src/db/lib/db'; // Drizzle ORM instance
import { authors } from 'src/db/schema'; // Authors schema
import { supabase } from '@/lib/supabase'; // Supabase client
import { eq } from 'drizzle-orm'; // Drizzle ORM query operators

// ----------------------------------------------------------------------
// POST: Create a new author (protected route)
// ----------------------------------------------------------------------
export async function POST(req: NextRequest) {
  try {
    const { name, avatarUrl } = await req.json();

    if (!name || !avatarUrl) {
      return NextResponse.json({ error: 'Name and avatarUrl are required' }, { status: 400 });
    }

    // Get the authenticated user
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();

    if (sessionError || !session) {
      return NextResponse.json({ error: 'Authentication failed, no session found' }, { status: 401 });
    }
// TODO add or confifgure roles
    const userId = session.user.id;
    const isAdmin = session.user.role === 'authenticated'; // Modify logic based on your admin checks

    const [newAuthor] = await db.insert(authors).values({
      name,
      avatarUrl,
      userId,  // Attach the user ID to the author
      isAdmin, // Is the user an admin?
    }).returning();

    return NextResponse.json({ data: newAuthor }, { status: 201 });

  } catch (error) {
    console.error('Error creating new author:', error);
    return NextResponse.json({ error: 'Failed to create author', detail: error.message }, { status: 500 });
  }
}

// ----------------------------------------------------------------------
// GET: Retrieve all authors or a specific author by ID
// ----------------------------------------------------------------------
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const authorId = searchParams.get('id'); // Retrieve the ID from the query params

  try {
    let result;

    if (authorId) {
      // Fetch a single author by ID
      result = await db.select().from(authors).where(eq(authors.id, authorId)).limit(1);
      if (!result || result.length === 0) {
        return NextResponse.json({ error: 'Author not found' }, { status: 404 });
      }
    } else {
      // Fetch all authors
      result = await db.select().from(authors);
    }

    return NextResponse.json({ data: result }, { status: 200 });

  } catch (error) {
    console.error('Error fetching authors:', error);
    return NextResponse.json({ error: 'Failed to retrieve authors', detail: error.message }, { status: 500 });
  }
}

// ----------------------------------------------------------------------
// PUT: Update an existing author
// ----------------------------------------------------------------------
export async function PUT(req: NextRequest) {
  try {
    const { id, name, avatarUrl } = await req.json();

    if (!id || !name || !avatarUrl) {
      return NextResponse.json({ error: 'ID, name, and avatarUrl are required' }, { status: 400 });
    }

    // Get the authenticated user
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();

    if (sessionError || !session?.user?.id) {
      return NextResponse.json({ error: 'Authentication failed' }, { status: 401 });
    }

    const userId = session.user.id;

    // Fetch the author to check if the user is allowed to update
    const [author] = await db.select().from(authors).where(eq(authors.id, id)).limit(1);

    if (!author) {
      return NextResponse.json({ error: 'Author not found' }, { status: 404 });
    }

    if (author.userId !== userId) {
      return NextResponse.json({ error: 'Unauthorized to update this author' }, { status: 403 });
    }

    // Update the author
    const updatedAuthor = await db.update(authors).set({ name, avatarUrl }).where(eq(authors.id, id)).returning();

    return NextResponse.json({ data: updatedAuthor }, { status: 200 });

  } catch (error) {
    console.error('Error updating author:', error);
    return NextResponse.json({ error: 'Failed to update author', detail: error.message }, { status: 500 });
  }
}

// ----------------------------------------------------------------------
// DELETE: Delete an author (Admin only)
// ----------------------------------------------------------------------
export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json({ error: 'Author ID is required' }, { status: 400 });
    }

    const { data: { session }, error: sessionError } = await supabase.auth.getSession();

    if (sessionError || !session?.user?.id) {
      return NextResponse.json({ error: 'Authentication failed' }, { status: 401 });
    }

    const userId = session.user.id;

    const existingAuthor = await db.select().from(authors).where(eq(authors.id, id)).limit(1);
    if (!existingAuthor || existingAuthor.length === 0) {
      return NextResponse.json({ error: 'Author not found' }, { status: 404 });
    }

    const author = existingAuthor[0];
    if (!author.isAdmin) {
      return NextResponse.json({ error: 'Only admins can delete authors' }, { status: 403 });
    }

    await db.delete(authors).where(eq(authors.id, id));

    return NextResponse.json({ message: 'Author deleted successfully' }, { status: 200 });

  } catch (error) {
    console.error('Error deleting author:', error);
    return NextResponse.json({ error: 'Failed to delete author', detail: error.message }, { status: 500 });
  }
}
