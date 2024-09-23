import type { SupabaseClient } from '@supabase/supabase-js';

import { createClient } from '@supabase/supabase-js';

import { CONFIG } from 'src/config-global';

// ----------------------------------------------------------------------
// This line checks if the authentication method specified in the configuration is 'supabase'. The result is stored in the isSupabase constant, which is a boolean value.
const isSupabase = CONFIG.auth.method === 'supabase';

// These lines extract the Supabase URL and API key from the configuration object. These values are necessary for creating a Supabase client instance.
const supabaseUrl = CONFIG.supabase.url;
const supabaseKey = CONFIG.supabase.key;


// This line conditionally creates a Supabase client. If the authentication method is 'supabase', it calls createClient with the Supabase URL and API key to create and export a new Supabase client instance.
// If the authentication method is not 'supabase', it exports an empty object cast as a SupabaseClient type. This ensures that the exported object conforms to the expected type, even if it is not a functional Supabase client.
export const supabase = isSupabase
  ? createClient(supabaseUrl, supabaseKey)
  : ({} as SupabaseClient<any, 'public', any>);

  // In summary, this TypeScript module sets up a Supabase client for a React project using Next.js. It imports necessary functions and types, checks the configuration to determine if Supabase should be used for authentication, and conditionally creates and exports a Supabase client instance. This approach ensures that the Supabase client is only created if it is needed, based on the project's configuration settings. This setup is crucial for managing authentication and interacting with Supabase services in a type-safe manner.