import { eq } from 'drizzle-orm';
import { db } from '@/db';
import { User, NewUser, users } from '@/db/schema';

class UserService {
  async getAllUsers(): Promise<User[]> {
    try {
      const usersList = await db.select().from(users).execute();
      return usersList;
    } catch (error) {
      console.error('Error fetching all users:', error);
      throw new Error('Failed to fetch all users');
    }
  }

  async getUserById(id: string): Promise<User | null> {
    try {
      const user = await db.select().from(users).where(eq(users.id, id)).execute();
      return user.length ? user[0] : null;
    } catch (error) {
      console.error(`Error fetching user by id (${id}):`, error);
      throw new Error('Failed to fetch user by id');
    }
  }

  async createUser(user: NewUser): Promise<User> {
    try {
      const newUser = await db.insert(users).values(user).returning().execute();
      return newUser[0];
    } catch (error) {
      console.error('Error creating user:', error);
      throw new Error('Failed to create user');
    }
  }
}

// Exporting an instance for singleton-like usage
export const userService = new UserService();
