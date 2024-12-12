import { createClient } from '@supabase/supabase-js';
import { Database } from '../types/database';
import { z } from 'zod';

// Environment variable validation
const envSchema = z.object({
  VITE_SUPABASE_URL: z.string().url(),
  VITE_SUPABASE_ANON_KEY: z.string().min(1),
});

// Validate environment variables
const env = envSchema.safeParse(import.meta.env);

if (!env.success) {
  console.error('Invalid environment configuration:', env.error.format());
  throw new Error('Missing or invalid Supabase environment variables');
}

// Client configuration with proper error handling and retries
const clientConfig = {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    storageKey: 'ei-analyzer-auth',
    storage: window.localStorage
  },
  db: {
    schema: 'public',
  },
  global: {
    headers: { 'x-app-version': '1.0.0' },
  },
  // Add retrying for failed requests
  realtime: {
    params: {
      eventsPerSecond: 10,
    },
  },
};

export const supabase = createClient<Database>(
  env.data.VITE_SUPABASE_URL,
  env.data.VITE_SUPABASE_ANON_KEY,
  clientConfig
);

// Add error event listener
supabase.auth.onAuthStateChange((event, session) => {
  if (event === 'SIGNED_OUT') {
    // Clear any cached data
    localStorage.removeItem('ei-analyzer-auth');
  }
});