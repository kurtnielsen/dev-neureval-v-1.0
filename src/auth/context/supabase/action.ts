'use client';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
// ----------------------------------------------------------------------

export type SignInParams = {
  email: string;
  password: string;
};

export type SignUpParams = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

/** **************************************
 * Supabase client
 *************************************** */
const supabase = createClientComponentClient();

/** **************************************
 * Sign in
 *************************************** */
export const signInWithPassword = async ({ email, password }: SignInParams): Promise<void> => {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    console.error('Error during sign in:', error);
    throw error;
  }

  if (!data.session?.access_token) {
    throw new Error('Access token not found in response');
  }

  // Here you can set the supabase session, which will be handled by supabase-helpers
  console.log('Signed in successfully with access token:', data.session.access_token);
};
/** **************************************
 * Sign up
 *************************************** */
export const signUp = async ({ email, password }: SignUpParams): Promise<void> => {
  const { data, error } = await supabase.auth.signUp({ email, password });

  if (error) {
    console.error('Error during sign up:', error);
    throw error;
  }

  if (!data.session?.access_token) {
    throw new Error('Access token not found in response');
  }

  sessionStorage.setItem('supabase.auth.token', data.session.access_token);
};
/** **************************************
 * Sign out
 *************************************** */
export const signOut = async (): Promise<void> => {
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error('Error during sign out:', error);
    throw error;
  }

  console.log('Signed out successfully');
};
