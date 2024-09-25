import type { NextRequest } from 'next/server';

import { sign } from 'src/utils/jwt';
import { STATUS, response } from 'src/utils/response';
import { db } from 'src/db/lib/db';  // Drizzle ORM instance
import { users } from 'src/db/schema';  // Users schema
import { eq } from 'drizzle-orm';
// ----------------------------------------------------------------------

/**
 * This API is used for demo purpose only
 * You should use a real database
 * You should hash the password before saving to database
 * You should not save the password in the database
 * You should not expose the JWT_SECRET in the client side
 */

const JWT_EXPIRES_IN: string = process.env.JWT_EXPIRES_IN || '3 days';
const JWT_SECRET: string = process.env.JWT_SECRET || 'default_secret';

if (!JWT_SECRET || !JWT_EXPIRES_IN) {
  throw new Error('JWT_SECRET and JWT_EXPIRES_IN must be defined');
}

export const runtime = 'edge';

export async function POST(req: NextRequest) {
  try {
    const { email, password, firstName, lastName } = await req.json();
    const existUser = await db.query.users.findMany({
      where: eq(users.email, email),
    });
    // const existUser = users.find((_user) => _user.email === email);

    if (existUser) {
      return response(
        'There already exists an account with the given email address.',
        STATUS.CONFLICT
      );
    }

    const newUser = {
      id: crypto.randomUUID(),
      displayName: `${firstName} ${lastName}`,
      email,
      password,
      photoURL: '',
      phoneNumber: '',
      country: '',
      address: '',
      state: '',
      city: '',
      zipCode: '',
      about: '',
      role: 'user',
      isPublic: true,
    };

    const accessToken = await sign({ userId: newUser.id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });

    // Push new user to database
    await db.insert(users).values(newUser);

    return response({ user: newUser, accessToken }, STATUS.OK);
  } catch (error) {
    console.error('[Auth - sign up]: ', error);
    return response('Internal server error', STATUS.ERROR);
  }
}

/**
 * Next updated version changes:
 * return response( { message: 'There already exists an account with the given email address.' }, status.conflict );
 * return response({ message: 'Internal server error' }, status.error);
 */
