'use client';

// ----------------------------------------------------------------------

import '../styles/tailwind.css';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@mui/material';

// ----------------------------------------------------------------------

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const supabase = createClientComponentClient();

  const handleSignUp = async () => {
    await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${location.origin}/auth/callback`,
      },
    });
    router.refresh();
  };

  const handleSignIn = async () => {
    await supabase.auth.signInWithPassword({
      email,
      password,
    });
    router.refresh();
  };

  return (
    <main className="h-screen flex items-center justify-center bg-gray-800 p-6">
      <div className="bg-gray-900 p-8 rounder-lg shadow-md w-96">
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-4 w-full p-3 rounded-md border border-gray-700 bg-gray-900 text-white placeholder:text-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-4 w-full p-3 rounded-md border border-gray-700 bg-gray-900 text-white placeholder:text-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        />
        <Button
          className="w-full mb-2 p-3 rounded-md bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
          onClick={handleSignUp}
        >
          Sign Up
        </Button>
        <Button
          className="w-full p-3 rounded-md bg-gray-700 text-white hover:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500"
          onClick={handleSignIn}
        >
          Sign In
        </Button>
      </div>
    </main>
  );
}
