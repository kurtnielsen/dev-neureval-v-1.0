'use client';

import { supabase } from 'src/supabaseClient';
import { setSession } from './utils';
import { STORAGE_KEY } from './constant';

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
 * Sign in
 *************************************** */
export const signInWithPassword = async ({ email, password }: SignInParams): Promise<void> => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      console.error('Sign In Error:', error.message);
      throw new Error(error.message);
    }

    if (!data.session?.access_token) {
      console.error('Access token not found in response:', data);
      throw new Error('Access token not found in response');
    }

    setSession(data.session.access_token); // Use setSession to handle the access token
  } catch (error) {
    console.error('Error during sign in:', error);
    throw error;
  }
};

/** **************************************
 * Sign up
 *************************************** */
export const signUp = async ({
  email,
  password,
  firstName,
  lastName,
}: SignUpParams): Promise<void> => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { firstName, lastName },
      },
    });

    if (error) {
      console.error('Sign Up Error:', error.message);
      throw new Error(error.message);
    }

    if (!data.session?.access_token) {
      console.error('Access token not found in response:', data);
      throw new Error('Access token not found in response');
    }

    sessionStorage.setItem(STORAGE_KEY, data.session.access_token); // Use the STORAGE_KEY defined for Supabase
  } catch (error) {
    console.error('Error during sign up:', error);
    throw error;
  }
};

/** **************************************
 * Sign out
 *************************************** */
export const signOut = async (): Promise<void> => {
  try {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error('Sign Out Error:', error.message);
      throw new Error(error.message);
    }

    console.log('Signed out successfully');
    setSession(null); // Clear the session data
    // Clear additional demo credentials and related items
    [
      'demo-email',
      'demo-password',
      'sb-jrpnzhqsnwvibpojjgeq-auth-token-code-verifier',
      STORAGE_KEY,
    ].forEach((item) => {
      sessionStorage.removeItem(item);
      localStorage.removeItem(item);
      document.cookie = `${item}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    });

    window.location.href = '/auth/supabase/sign-in'; // Redirect to login page
  } catch (error) {
    console.error('Error during sign out:', error);
  }
};
