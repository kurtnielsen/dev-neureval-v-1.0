'use client';

import { useEffect, useCallback } from 'react';

import Typography from '@mui/material/Typography';

import { paths } from 'src/routes/paths';
import { useRouter, useSearchParams } from 'src/routes/hooks';

import { useBoolean } from 'src/hooks/use-boolean';
import { useResponsive } from 'src/hooks/use-responsive';

import { DashboardContent } from 'src/layouts/dashboard';



import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react';


// ----------------------------------------------------------------------



const LABEL_INDEX = 'google-calendar';

export function GoogleCalendarView() {

  const session = useSession();
  const supabase = useSupabaseClient();

  const router = useRouter();

  const searchParams = useSearchParams();

  const selectedLabelId = searchParams.get('label') ?? LABEL_INDEX;

  

  async function googleSignIn() {
    const { error } = await supabase.auth.signInWithOAuth({ 
      provider: 'google', 
      options: {
        scopes: 'https://www.googleapis.com/auth/calendar'
      }
    });
    if (error) console.error('Error: ', error.message);
    alert('You did not successfully sign in with Google');
    console.log(error);
  }
  
  async function googleSignOut() {
    await supabase.auth.signOut();
    alert('You have successfully signed out of Google');
  }

  return (
   

        <div>

            {/* {session ?  */}
              <>
              {/* <h2>Hey There {session.user.email}</h2> */}
              <button onClick={googleSignOut}>Sign Out</button>
              <h3>Click the button below to sign in with Google</h3>
              </>
              {/* : */}
              <>
              <button onClick={() => googleSignIn()}>Sign In</button>
              <h2>Click the button below to sign in with Google</h2>
              </>
            {/* } */}
          
        </div>
       
  
  );
}
