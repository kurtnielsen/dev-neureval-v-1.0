'use client';

// ----------------------------------------------------------------------
// The provided code is a TypeScript module that handles authentication operations using Supabase. It includes functions for signing in, signing up, and signing out users.
// ----------------------------------------------------------------------

import { supabase } from 'src/supabaseClient';
import { setSession } from './utils';
import { STORAGE_KEY } from './constant';
import { syncUserWithDatabase } from 'src/auth/context/supabase/userSync';


// The SignInParams and SignUpParams types are defined to specify the expected structure of the parameters for the sign-in and sign-up functions. These types ensure that the functions receive the correct data.

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
 * The signInWithPassword function is an asynchronous function that takes an object of type SignInParams as its parameter. It attempts to sign in a user using Supabase's signInWithPassword method. If an error occurs during the sign-in process, it logs the error and throws a new error. If the sign-in is successful but the response does not contain an access token, it logs an error and throws a new error. If everything is successful, it calls the setSession function to handle the access token.
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
 * The signUp function is an asynchronous function that takes an object of type SignUpParams as its parameter. It attempts to sign up a new user using Supabase's signUp method. The user's first name and last name are included in the sign-up options. If an error occurs during the sign-up process, it logs the error and throws a new error. If the sign-up is successful but the response does not contain an access token, it logs an error and throws a new error. If everything is successful, it stores the access token in sessionStorage using the STORAGE_KEY.
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
 * Sync user with database
 * xample function that runs after login or on page load
 *************************************** */

async function handleUserLogin() {
  // Sync the user with your database
  await syncUserWithDatabase();

/** **************************************
 * Sign out
 * The signOut function is an asynchronous function that attempts to sign out the current user using Supabase's signOut method. If an error occurs during the sign-out process, it logs the error and throws a new error. If the sign-out is successful, it logs a success message, clears the session data using the setSession function, and removes various items from sessionStorage, localStorage, and cookies. Finally, it redirects the user to the sign-in page.
 *************************************** */
export const signOut = async (): Promise<void> => {
  try {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error('Sign Out Error:', error.message);
      throw new Error(error.message);
    }

    // console.log('Signed out successfully');
    // setSession(null); // Clear the session data
    // // Clear additional demo credentials and related items
    // [
    //   'demo-email',
    //   'demo-password',
    //   'sb-jrpnzhqsnwvibpojjgeq-auth-token-code-verifier',
    //   STORAGE_KEY,
    // ].forEach((item) => {
    //   sessionStorage.removeItem(item);
    //   localStorage.removeItem(item);
    //   document.cookie = `${item}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    // });
    
    // without demo credentials
    console.log('Signed out successfully');
    setSession(null); // Clear the session data
    sessionStorage.removeItem(STORAGE_KEY); // Remove the access token from sessionStorage


    window.location.href = '/auth/supabase/sign-in'; // Redirect to login page
  } catch (error) {
    console.error('Error during sign out:', error);
  }
};


// In summary, this module provides a set of functions to handle user authentication using Supabase. It includes robust error handling and ensures that session data is properly managed and stored.