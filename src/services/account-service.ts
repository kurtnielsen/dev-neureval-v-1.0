import { eq } from 'drizzle-orm';
import { db } from '../models/schema';
import { Account, NewAccount, accounts } from '../models/schema';

class AccountService {
  async getAllAccounts(): Promise<Account[]> {
    try {
      const accountsList = await db.select().from(accounts).execute();
      return accountsList;
    } catch (error) {
      console.error('Error fetching all accounts:', error);
      throw new Error('Failed to fetch all accounts');
    }
  }

  async getAccountById(id: string): Promise<Account | null> {
    try {
      const account = await db.select().from(accounts).where(eq(accounts.id, id)).execute();
      return account.length ? account[0] : null;
    } catch (error) {
      console.error(`Error fetching account by id (${id}):`, error);
      throw new Error('Failed to fetch account by id');
    }
  }

  async createAccount(account: NewAccount): Promise<Account> {
    try {
      const newAccount = await db.insert(accounts).values(account).returning().execute();
      return newAccount[0];
    } catch (error) {
      console.error('Error creating account:', error);
      throw new Error('Failed to create account');
    }
  }
}

// Exporting an instance for singleton-like usage
export const accountService = new AccountService();
