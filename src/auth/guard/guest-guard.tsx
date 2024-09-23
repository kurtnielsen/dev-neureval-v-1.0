'use client';

// ----------------------------------------------------------------------
// code is a React component written in TypeScript that acts as a guard for guest users, ensuring that only unauthenticated users can access the wrapped content. This component is particularly useful in applications where certain pages or sections should only be accessible to users who are not logged in. 

import { useState, useEffect } from 'react';

import { useRouter, useSearchParams } from 'src/routes/hooks';

import { CONFIG } from 'src/config-global';

import { SplashScreen } from 'src/components/loading-screen';

import { useAuthContext } from '../hooks';

// ----------------------------------------------------------------------
// The Props type is defined to specify the expected structure of the props that the GuestGuard component will receive. In this case, the GuestGuard component expects a single prop called children, which is of type React.ReactNode. This type represents any valid React child element, such as a component, string, or fragment.

type Props = {
  children: React.ReactNode;
};

// ----------------------------------------------------------------------
// The GuestGuard component is defined as a functional component that takes children as its prop. The component uses several hooks to manage state and handle routing.

export function GuestGuard({ children }: Props) {
  // useRouter: Provides routing capabilities, allowing the component to navigate programmatically.
  const router = useRouter();

  // useSearchParams: Retrieves URL search parameters, which can be used to determine where to redirect the user after authentication.
  const searchParams = useSearchParams();

  // useAuthContext: Accesses the authentication state, providing information about whether the user is currently authenticated and if the authentication state is still loading.
  const { loading, authenticated } = useAuthContext();

  // useState: Manages the isChecking state, which indicates whether the component is still checking the user's authentication status.
  const [isChecking, setIsChecking] = useState<boolean>(true);

  // returnTo: Determines the URL to redirect authenticated users to, either from the returnTo search parameter or a default path from the configuration.
  const returnTo = searchParams.get('returnTo') || CONFIG.auth.redirectPath;

  // The checkPermissions function is defined to handle the logic for checking the user's authentication status. It is an asynchronous function that performs the following steps:
  // If the authentication state is still loading, it returns early.
  // If the user is authenticated, it redirects them to the returnTo URL and returns early.
  // If the user is not authenticated, it sets isChecking to false.
  const checkPermissions = async (): Promise<void> => {
    if (loading) {
      return;
    }

    if (authenticated) {
      router.replace(returnTo);
      return;
    }

    setIsChecking(false);
  };
  // The useEffect hook is used to call the checkPermissions function whenever the authenticated or loading state changes. This ensures that the component re-evaluates the user's authentication status whenever it updates.
  useEffect(() => {
    checkPermissions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authenticated, loading]);

  //The component conditionally renders its content based on the isChecking state. If isChecking is true, it returns the SplashScreen component to indicate that it is still checking the user's authentication status. If isChecking is false, it renders the children prop, allowing guest users to access the wrapped content.
  if (isChecking) {
    return <SplashScreen />;
  }

  return <>{children}</>;
}
// In summary, the GuestGuard component ensures that only unauthenticated users can access the wrapped content. It uses various hooks to manage state, handle routing, and access authentication information. The component displays a loading screen while checking the user's authentication status and redirects authenticated users to a specified URL. This makes it a useful component for protecting guest-only routes in a React application.