import { createClient } from '@supabase/supabase-js';
import { z } from 'zod';

const envSchema = z.object({
  SUPABASE_SERVICE_ROLE_KEY: z.string(),
  VITE_SUPABASE_URL: z.string(),
});

const env = envSchema.parse(import.meta.env);

// Create a Supabase client with the service role key for admin operations
export const supabaseAdmin = createClient(
  env.VITE_SUPABASE_URL,
  env.SUPABASE_SERVICE_ROLE_KEY,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
);