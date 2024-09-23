'use client';

// The provided code is a React component written in TypeScript that acts as an authentication guard, ensuring that only authenticated users can access the wrapped content. This component is particularly useful in applications where certain pages or sections should only be accessible to logged-in users. 

import { useState, useEffect, useCallback } from 'react';

import { paths } from 'src/routes/paths';
import { useRouter, usePathname, useSearchParams } from 'src/routes/hooks';

import { CONFIG } from 'src/config-global';

import { SplashScreen } from 'src/components/loading-screen';

import { useAuthContext } from '../hooks';

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export function AuthGuard({ children }: Props) {
  const router = useRouter();

  const pathname = usePathname();

  const searchParams = useSearchParams();

  const { authenticated, loading } = useAuthContext();

  const [isChecking, setIsChecking] = useState<boolean>(true);

  // The provided code defines a function called createQueryString using the useCallback hook from React. This function is designed to create a query string by updating a specific parameter in the URL search parameters.
  // The useCallback hook is used to memoize the createQueryString function. This means that the function will only be recreated if the dependencies specified in the dependency array change. In this case, the dependency array contains searchParams, so the function will only be recreated if searchParams changes.
  // The createQueryString function takes two parameters:
    // name: The name of the query parameter to set.
    // value: The value of the query parameter to set.
    // Inside the function, a new instance of URLSearchParams is created using the current searchParams converted to a string. The URLSearchParams class is a built-in JavaScript class that provides utility methods for working with URL query strings.
  // This function is useful for dynamically updating URL query parameters in a React application.
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  // The checkPermissions function is an asynchronous function that checks the user's authentication status and redirects them if they are not authenticated. Here's how it works:
  // 1. Loading Check: The function first checks if the authentication state is still loading. If it is, the function returns early without doing anything further.
  const checkPermissions = async (): Promise<void> => {
    if (loading) {
      return;
    }

    // 2. Authentication Check: If the user is not authenticated, the function proceeds to determine the appropriate sign-in path based on the authentication method configured in CONFIG.auth.method.
    if (!authenticated) {
      const { method } = CONFIG.auth;

      const signInPath = {
        jwt: paths.auth.jwt.signIn,
        auth0: paths.auth.auth0.signIn,
        amplify: paths.auth.amplify.signIn,
        firebase: paths.auth.firebase.signIn,
        supabase: paths.auth.supabase.signIn,
      }[method];

      // 3. Sign-In Path Construction: The function constructs the sign-in URL by appending the current pathname as a query parameter (returnTo) to the sign-in path. This ensures that after successful authentication, the user can be redirected back to the original page they were trying to access.
      const href = `${signInPath}?${createQueryString('returnTo', pathname)}`;
      
      // 4. Redirection: The function then uses the router.replace method to redirect the user to the constructed sign-in URL.
      router.replace(href);
      return;
    }

    // 5. Completion: If the user is authenticated, the function sets the isChecking state to false, indicating that the authentication check is complete.
    setIsChecking(false);
  };

  // The useEffect hook is used to call the checkPermissions function whenever the authenticated or loading state changes. This ensures that the component re-evaluates the user's authentication status whenever it updates.
  useEffect(() => {
    checkPermissions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authenticated, loading]);

    // The component conditionally renders its content based on the isChecking state:
  if (isChecking) {
    return <SplashScreen />;
  }

  return <>{children}</>;
}

// In summary, the provided code is a part of an authentication guard component that ensures only authenticated users can access the wrapped content. It uses the checkPermissions function to check the user's authentication status and redirect unauthenticated users to the appropriate sign-in page. The useEffect hook ensures that the authentication status is re-evaluated whenever it changes, and the component conditionally renders a loading screen or the wrapped content based on the isChecking state. This approach helps in managing user access and providing a seamless authentication experience in a React application.