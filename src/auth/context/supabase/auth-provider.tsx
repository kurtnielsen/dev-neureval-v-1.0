'use client';

// The provided code defines a React component named AuthProvider that serves as a context provider for authentication using Supabase. This component is designed to manage and provide authentication state to its child components.

//  The useMemo, useEffect, and useCallback hooks from React are used for memoization, side effects, and callback functions, respectively. The useSetState hook is a custom hook for managing state, and axios is imported for making HTTP requests. The supabase instance is imported for interacting with Supabase's authentication API. The AuthContext is imported to provide authentication state to the component tree, and the AuthState type is imported for TypeScript type checking.

import { useMemo, useEffect, useCallback } from 'react';
import { useSetState } from 'src/hooks/use-set-state';
import axios from 'src/utils/axios';
import { supabase } from '@/lib/supabase';
import { AuthContext } from '../auth-context';
import type { AuthState } from '../../types';

// ----------------------------------------------------------------------

// The Props type is defined to specify that the AuthProvider component expects a children prop of type React.ReactNode.

type Props = {
  children: React.ReactNode;
};

// ----------------------------------------------------------------------
// The AuthProvider component is defined as a functional component that takes children as a prop. It uses the useSetState hook to manage the authentication state, initializing it with user set to null and loading set to true.

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { state, setState } = useSetState<AuthState>({
    user: null,
    loading: true,
  });

  // ----------------------------------------------------------------------
  // Session checking logic
  // The checkUserSession function is defined using the useCallback hook to ensure it is memoized. This function checks the user's session by calling supabase.auth.getSession(). If there is an error, it sets the state to indicate that the user is not authenticated and logs the error. If a session is found, it updates the state with the user's information and sets the authorization header for axios with the access token. If no session is found, it clears the authorization header and updates the state accordingly.
  
  const checkUserSession = useCallback(async () => {
    try {
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (error) {
        setState({ user: null, loading: false });
        console.error(error);
        throw error;
      }

      if (session) {
        const accessToken = session.access_token;
        setState({ user: { ...session.user, ...session }, loading: false });
        axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
      } else {
        setState({ user: null, loading: false });
        delete axios.defaults.headers.common.Authorization;
      }
    } catch (error) {
      console.error(error);
      setState({ user: null, loading: false });
    }
  }, [setState]);

  // ----------------------------------------------------------------------
  // Trigger session check on mount
  // The useEffect hook is used to trigger the checkUserSession function when the component mounts. This ensures that the user's session is checked as soon as the component is rendered.

  useEffect(() => {
    checkUserSession();
  }, [checkUserSession]);

  // ----------------------------------------------------------------------
  // Prepare values for context
  // The authStatus and status variables are derived from the state to determine the current authentication status. The useMemo hook is used to memoize the context value, which includes the user's information, the checkUserSession function, and the authentication status flags (loading, authenticated, and unauthenticated).

  const authStatus = state.user ? 'authenticated' : 'unauthenticated';
  const status = state.loading ? 'loading' : authStatus;

  const memoizedValue = useMemo(() => ({
    user: state.user
      ? {
          ...state.user,
          id: state.user?.id,
          accessToken: state.user?.access_token,
          displayName: state.user?.user_metadata?.display_name,
          role: state.user?.role ?? 'admin',
        }
      : null,
    checkUserSession,
    loading: status === 'loading',
    authenticated: status === 'authenticated',
    unauthenticated: status === 'unauthenticated',
  }), [checkUserSession, state.user, status]);
  // ----------------------------------------------------------------------
  // Note: The role property is being assigned a value based on the state of the user. The state.user?.role expression uses optional chaining (?.) to safely access the role property of the user object within the state. Optional chaining ensures that if state.user is null or undefined, the expression will short-circuit and return undefined instead of throwing an error.
  // The ?? operator is the nullish coalescing operator. It provides a default value if the left-hand side expression evaluates to null or undefined. In this case, if state.user?.role is null or undefined, the role property will be assigned the string 'admin'.
  // In summary, this line of code ensures that the role property is set to the user's role if it exists. If the user's role is not defined, it defaults to 'admin'. This is a common pattern in TypeScript and JavaScript to provide fallback values and avoid potential runtime errors due to null or undefined values.
  // ----------------------------------------------------------------------

  // ----------------------------------------------------------------------
  // Wrap children in AuthContext
  // Finally, the AuthProvider component returns the AuthContext.Provider component, wrapping its children with the memoized context value. This makes the authentication state and functions available to all child components that consume the AuthContext.
  return (
    <AuthContext.Provider value={memoizedValue}>
      {children}
    </AuthContext.Provider>
  );
}

// In summary, the AuthProvider component manages the authentication state using Supabase and provides this state to its child components through the AuthContext. It checks the user's session on mount, updates the state accordingly, and memoizes the context value to optimize performance.