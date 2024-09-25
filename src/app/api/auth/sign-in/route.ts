import type { NextRequest } from 'next/server';

import { sign } from 'src/utils/jwt';
import { STATUS, response } from 'src/utils/response';

import { db } from 'src/db/lib/db';  // Drizzle ORM instance
import { users } from 'src/db/schema';  // Users schema
import { eq } from 'drizzle-orm';

// ----------------------------------------------------------------------

const JWT_EXPIRES_IN: string = process.env.JWT_EXPIRES_IN || '3 days';
const JWT_SECRET: string = process.env.JWT_SECRET || 'default_secret';

if (!JWT_SECRET || !JWT_EXPIRES_IN) {
  throw new Error('JWT_SECRET and JWT_EXPIRES_IN must be defined');
}

export const runtime = 'edge';

/**
 * This API is used for demo purpose only
 * You should use a real database
 * You should hash the password before saving to database
 * You should not save the password in the database
 * You should not expose the JWT_SECRET in the client side
 */

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    const user = await db.query.users.findMany({
      where: eq((users.email, email), (users.password, password))
    });

    if (!user) {
      return response('There is no user corresponding to the email address.', STATUS.UNAUTHORIZED);
    }

    if (user.length === 0 || user[0].password !== password) {
      return response('Wrong password', STATUS.UNAUTHORIZED);
    }

    const accessToken = await sign({ userId: user[0]?.id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });

    return response({ user, accessToken }, 200);
  } catch (error) {
    console.error('[Auth - sign in]: ', error);
    return response('Internal server error', STATUS.ERROR);
  }
}

/**
 * Next updated version changes:
 * return response( { message: 'There is no user corresponding to the email address.' }, status.unauthorized );
 * return response({ message: 'Wrong password' }, status.unauthorized);
 * return response({ message: 'Internal server error' }, status.error);
 */
