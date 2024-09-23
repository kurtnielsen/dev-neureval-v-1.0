'use client';

import { z as zod } from 'zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';

import { useBoolean } from 'src/hooks/use-boolean';

import { Iconify } from 'src/components/iconify';
import { Form, Field } from 'src/components/hook-form';

import { useAuthContext } from '../../hooks';
import { FormHead } from '../../components/form-head';
import { signInWithPassword } from '@/auth/context/supabase';

import { FormDivider } from '@/auth/components/form-divider';
import { FormSocials } from '@/auth/components/form-socials';


// ----------------------------------------------------------------------
// This is a React component named SupabaseSignInView that handles the sign-in process for a user using Supabase. It leverages TypeScript, React, and the Zod library for schema validation.
// This is the sign-in form on the right side of the layouts>auth-split page.
// ---------------------------------------------------------------------- 

// defines a TypeScript type SignInSchemaType inferred from the SignInSchema object. 
export type SignInSchemaType = zod.infer<typeof SignInSchema>;

export const SignInSchema = zod.object({
  email: zod
    .string()
    .min(1, { message: 'Email is required!' })
    .email({ message: 'Email must be a valid email address!' }),
  password: zod
    .string()
    .min(1, { message: 'Password is required!' })
    .min(6, { message: 'Password must be at least 6 characters!' }),
});

// ----------------------------------------------------------------------

// The SupabaseSignInView function component begins by initializing several hooks. It uses useRouter for navigation, useAuthContext to access authentication-related functions, useState to manage error messages, and useBoolean to toggle the visibility of the password field. Default values for the form fields are set to empty strings.

export function SupabaseSignInView() {
  const router = useRouter();

  const { checkUserSession } = useAuthContext();

  const [errorMsg, setErrorMsg] = useState('');

  const password = useBoolean();

  const defaultValues = {
    email: '',
    password: '',
  };
  
// ----------------------------------------------------------------------

// The useForm hook from react-hook-form is used to manage the form state and validation. The zodResolver function integrates Zod schema validation with react-hook-form. The handleSubmit function is extracted from the methods object to handle form submission.

  const methods = useForm<SignInSchemaType>({
    resolver: zodResolver(SignInSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

// ----------------------------------------------------------------------

// The onSubmit function is defined to handle the form submission. It attempts to sign in the user with the provided email and password using the signInWithPassword function. If successful, it checks the user session and refreshes the router. If an error occurs, it sets the error message state.

const onSubmit = handleSubmit(async (data) => {
  try {
    await signInWithPassword({ email: data.email, password: data.password });
    await checkUserSession?.();
    router.refresh();
  } catch (error) {
    console.error(error);
    setErrorMsg(typeof error === 'string' ? error : error.message);
  }
});

// ----------------------------------------------------------------------

//The renderForm variable contains the JSX for the form fields and the submit button. It includes fields for the email and password, with the password field having a toggle button to show or hide the password. The submit button is a LoadingButton that shows a loading indicator while the form is submitting.

const renderForm = (
  <Box gap={3} display="flex" flexDirection="column">
    <Field.Text name='email' label='Email address' InputLabelProps={{ shrink: true }} />
    <Box gap={.5} display="flex" flexDirection="column">
      <Link
      component={RouterLink}
      href={paths.auth.supabase.resetPassword}
      variant="body2"
      color="inherit"
      sx={{ alignSelf: 'flex-end' }}
      >
        Forgot password?
      </Link>

      <Field.Text
      name='password'
      label='Password'
      placeholder='6+ characters'
      type={password.value ? 'text' : 'password'}
      InputLabelProps={{ shrink: true }}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={password.onToggle} edge="end">
              <Iconify icon={password.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
            </IconButton>
          </InputAdornment>
        ),
      }}
      />
    </Box>

    <LoadingButton
    fullWidth
    color="inherit"
    size="large"
    type="submit"
    variant="contained"
    loading={isSubmitting}
    loadingIndicator="Sign in..."
    >
      Sign in
    </LoadingButton>
  </Box>
);
    
// ----------------------------------------------------------------------

// Finally, the component returns the JSX for the sign-in view. It includes a FormHead component with a title and description, an error message alert if there is an error, the form itself, a FormDivider, and FormSocials for social sign-in options.
  
return (
    <>
      <FormHead
        title="Sign in to your account"
        description={
          <>
            {`Don’t have an account? `}
            <Link component={RouterLink} href={paths.auth.supabase.signUp} variant="subtitle2">
              Get started
            </Link>
          </>
        }
        sx={{ textAlign: { xs: 'center', md: 'left' } }}
      />

{!!errorMsg && (
  <Alert severity="error" sx={{ mb: 3 }}>
    {errorMsg}
  </Alert>
)}

<Form methods={methods} onSubmit={onSubmit}>
  {renderForm}
  </Form> 

      <FormDivider />
      <FormSocials
        signInWithGoogle={() => {}}
        singInWithGithub={() => {}}
        signInWithTwitter={() => {}}
      />
    </>
  );
}
