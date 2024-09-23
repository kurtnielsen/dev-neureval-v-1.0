// TypeScript middleware function for a Next.js application that uses Supabase for authentication. 
// This middleware is designed to manage user sessions by writing to cookies on the server side, ensuring that the session remains active. 

import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';

// need middleware to be able to write to cookies to keep session alive in server side
// i.e., this persists the session in the cookie. This runs before each route is accessed

// The middleware function is an asynchronous function that takes a req (request) object as its parameter. The type of req is set to any for flexibility, but it could be more specifically typed for better type safety.
export async function middleware(req: any) {

  // NextResponse.next() is called to create a response object (res) that allows the request to proceed to the next middleware or route handler.
  const res = NextResponse.next();
 
  // createMiddlewareClient is called with the req and res objects to create a Supabase client instance. This client is configured to work within the context of the middleware.
  const supabase = createMiddlewareClient({ req, res });

  // supabase.auth.getSession() is called to retrieve the current session. This function ensures that the session is kept alive by writing it to cookies on the server side.
  await supabase.auth.getSession();

  // Finally, the response object (res) is returned, allowing the request to continue to the next handler.
  return res;
}
//supabase uses server side cookies to initiate the session and then we need to configure a code exchange route to authenticate the user
// this exchanges the user's session token for a JWT token that can be used to authenticate the user on the client side
// create app/auth/callback/route.ts


// In summary, this TypeScript middleware function for a Next.js application uses Supabase to manage user sessions by writing to cookies on the server side. The middleware ensures that the session remains active by retrieving it before each route is accessed. 
// This setup is crucial for maintaining user authentication and session persistence in a server-side rendered application. The comments provide additional context on the need for a code exchange route to handle user authentication on the client side.