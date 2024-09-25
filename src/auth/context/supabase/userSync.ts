import { db } from 'src/db/lib/db';  // Drizzle ORM instance
import { users } from 'src/db/schema';  // Users schema
import { supabase } from 'src/supabaseClient';
import { eq } from 'drizzle-orm';

async function syncUserWithDatabase() {
    // Get the authenticated user from Supabase
    const { data: { session } } = await supabase.auth.getSession();
  
    if (session?.user) {
      const supabaseUser = session.user;
  
      // Check if the user already exists in your `users` table
      const existingUser = await db.select().from(users).where(users.email.eq(supabaseUser.email)).limit(1);
  
      // If the user doesn't exist, insert them into the database
      if (existingUser.length === 0) {
        await db.insert(users).values({
          id: supabaseUser.id,  // Use the Supabase user ID
          email: supabaseUser.email,
          name: supabaseUser.user_metadata.full_name || supabaseUser.email, // Full name or email as fallback
          createdAt: new Date(),
        });
      }
    }
  }