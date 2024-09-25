import { headers } from 'next/headers';
import { verify } from 'src/utils/jwt';
import { response, STATUS, handleError } from 'src/utils/response';

import { db } from 'src/db/lib/db';  // Drizzle ORM instance
import { users } from 'src/db/schema';  // Users schema
import { eq } from 'drizzle-orm';


// import { _users, JWT_SECRET } from 'src/_mock/_auth';

// ToDo!!: Replace this with a real database
// export const JWT_SECRET = 'minimal-secret-key';

// export const JWT_EXPIRES_IN = '3 days';
let JWT_SECRET = process.env.JWT_SECRET;
// ----------------------------------------------------------------------

export const runtime = 'edge';

/**
 * Get user info after login
 * This API is used for demo purpose only
 * You should use a real database
 * You should hash the password before saving to database
 * You should not save the password in the database
 * You should not expose the JWT_SECRET in the client side
 */

export async function GET() {
  try {
    const headersList = headers();
    const authorization = headersList.get('authorization');

    if (!authorization || !authorization.startsWith('Bearer ')) {
      return response('Authorization token missing or invalid', STATUS.UNAUTHORIZED);
    }

    const accessToken = `${authorization}`.split(' ')[1];
    if (!JWT_SECRET) {
      throw new Error('JWT_SECRET is not defined');
    }
    const data = await verify(accessToken, JWT_SECRET);

    // const user = users.find((user) => user.id === data.userId);
    // const user = await db.select().from((users) => user.id === data.userId );
    if (!data.userId) {
      return response('Invalid authorization token', STATUS.UNAUTHORIZED);
    }
    const user = await db.select().from(users).where(eq(users.id, data.userId));
    if (!user) {
      return response('Invalid authorization token', STATUS.UNAUTHORIZED);
    }

    return response({ user }, 200);
  } catch (error) {
    console.error('[Auth - me]: ', error);
    return response('Internal server error', STATUS.ERROR);
  }
}

/**
 * Next updated version changes:
 * return response({ message: 'Authorization token missing or invalid' }, STATUS.UNAUTHORIZED);
 * return response({ message: 'Invalid authorization token' }, STATUS.UNAUTHORIZED);
 * return response({ message: 'Internal server error' }, status.error);
 */
