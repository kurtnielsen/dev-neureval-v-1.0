# Supabase Auth Provider

## Step 1: Refactor AuthProvider for Supabase

We'll align your AuthProvider to follow the same flow, with session checking, token management, and exposing the authentication state through context.

Create or Update auth/context/supabase/auth-provider.tsx:

```typescript
'use client';

import { useMemo, useEffect, useCallback } from 'react';
import { useSetState } from 'src/hooks/use-set-state';  // Reuse their hook for consistency
import axios from 'src/utils/axios';  // Reuse axios instance for API
import { supabase } from 'src/lib/supabase';
import { AuthContext } from '../auth-context';
import type { AuthState } from '../../types';

// Supabase AuthProvider
export function SupabaseAuthProvider({ children }: { children: React.ReactNode }) {
  const { state, setState } = useSetState<AuthState>({
    user: null,
    loading: true,
  });

  // Session checking logic
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

  // Trigger session check on mount
  useEffect(() => {
    checkUserSession();
  }, [checkUserSession]);

  // Prepare values for context
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

  // Wrap children in AuthContext
  return (
    <AuthContext.Provider value={memoizedValue}>
      {children}
    </AuthContext.Provider>
  );
}
```

## Key Changes

- Session Handling: Uses supabase.auth.getSession() to get the current session.
- Axios Authorization: Automatically adds/removes the authorization header based on session status, just like in their approach.
- Context Management: Provides user, loading, authenticated, and unauthenticated states, along with checkUserSession for consistency with their architecture.

## Step 2: Update index.ts
In your auth/context/supabase/index.ts file, make sure you're exporting both the actions.tsx functions and the SupabaseAuthProvider:

```typescript
export * from './actions';
export * from './auth-provider';
```

<!-- ## Step 3: Update auth/context/auth-context.tsx

Update the AuthContext to use the SupabaseAuthProvider:

```typescript
import { createContext } from 'react';
import { SupabaseAuthProvider } from './supabase/auth-provider';

export const AuthContext = createContext<{
  user: null | {
    id: string;
    accessToken: string;
    displayName: string;
    role: string;
  };
  checkUserSession: () => Promise<void>;
  loading: boolean;
  authenticated: boolean;
  unauthenticated: boolean;
} -->

## Integrate into _app.tsx

In your _app.tsx file, wrap your <AuthProvider> with the SupabaseAuthProvider:

```typescript
<SupabaseAuthProvider>
  <AuthProvider>
    <Component {...pageProps} />
  </AuthProvider>
</SupabaseAuthProvider>
``` -->

OLD CODE
      // refactor
  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors, isSubmitting },
  // } = useForm<SignInSchemaType>({
  //   resolver: zodResolver(SignInSchema),
  //   defaultValues: {
  //     email: '',
  //     password: '',
  //   },
  // });
// refactor
  // const onSubmit = handleSubmit(async (data) => {
  //   try {
  //     const { data: session, error } = await supabase.auth.signInWithPassword({
  //       email: data.email,
  //       password: data.password,
  //     });
  
  //     if (error) throw error;
  
  //     await checkUserSession?.();  // Keeps their session handling intact
  //     router.refresh();  // This keeps their routing logic consistent
  //   } catch (error) {
  //     console.error(error);
  //     setErrorMsg(error.message || 'Error signing in');
  //   }
  // });
  // my original code
  // const onSubmit = async (data: SignInSchemaType) => {
  //   try {
  //     await signInWithPassword({ email: data.email, password: data.password });
  //     await checkUserSession?.();
  //     router.refresh();
  //   } catch (error) {
  //     console.error(error);
  //     setErrorMsg(typeof error === 'string' ? error : error.message);
  //   }
  // };

      {/* <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        autoComplete="on"
        display="flex"
        flexDirection="column"
        gap={3}
      >
        <Box gap={3} display="flex" flexDirection="column">
          <TextField
          label="Email address"
          {...register('email')}
          error={!!errors.email}
          helperText={errors.email?.message}
          InputLabelProps={{ shrink: true }}
          fullWidth
          /> */}
{/*           
          <Box>
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              id="email"
              {...register('email')}
              autoComplete="username"
              placeholder="Email"
              required
              style={{
                width: '100%',
                padding: '10px',
                margin: '5px 0',
                borderRadius: '4px',
                border: '1px solid #ccc',
              }}
            />
            {errors.email && <span>{errors.email.message}</span>}
          </Box> */}

          {/* <TextField
          label="Password"
          {...register('password')}
          type={password.value ? 'text' : 'password'}
          error={!!errors.password}
          helperText={errors.password?.message}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={password.onToggle} edge="end">
                  <Iconify icon={password.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
          InputLabelProps={{ shrink: true }}
          fullWidth
          /> */}
            {/* <Box>
            <label htmlFor="password">Password</label>
            <input
              type={password.value ? 'text' : 'password'}
              id="password"
              {...register('password')}
              autoComplete="current-password"
              placeholder="6+ characters"
              required
              style={{
                width: '100%',
                padding: '10px',
                margin: '5px 0',
                borderRadius: '4px',
                border: '1px solid #ccc',
              }}
            />
            <IconButton onClick={password.onToggle} edge="end">
              <Iconify icon={password.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
            </IconButton>
            {errors.password && <span>{errors.password.message}</span>}
          </Box> */}
        {/* </Box> */}

      //   <Link
      //     component={RouterLink}
      //     href="#"
      //     variant="body2"
      //     color="inherit"
      //     sx={{ alignSelf: 'flex-end' }}
      //   >
      //     Forgot password?
      //   </Link>

      //   <LoadingButton
      //     fullWidth
      //     color="inherit"
      //     size="large"
      //     type="submit"
      //     variant="contained"
      //     loading={isSubmitting}
      //     loadingIndicator="Sign in..."
      //   >
      //     Sign in
      //   </LoadingButton>
      // </Box>