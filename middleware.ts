import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';

// need middleware to be able to write to cookies to keep session alive in server side
// i.e., this persists the session in the cookie. This runs before each route is accessed
export async function middleware(req: any) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });
  await supabase.auth.getSession();
  return res;
}
//supabase uses server side cookies to initiate the session and then we need to configure a code exchange route to authenticate the user
// this exchanges the user's session token for a JWT token that can be used to authenticate the user on the client side
// create app/auth/callback/route.ts
