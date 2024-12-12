import { supabase } from './supabase-config';
import { AuthError } from '@supabase/supabase-js';
import { z } from 'zod';

// Validation schemas
const signUpSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  fullName: z.string().min(2),
  metadata: z.record(z.unknown()).optional(),
});

export async function signUp(data: z.infer<typeof signUpSchema>) {
  try {
    const { email, password, fullName, metadata } = signUpSchema.parse(data);

    const { data: authData, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          ...metadata,
        },
      },
    });

    if (error) throw error;
    return { user: authData.user, session: authData.session };
  } catch (error) {
    if (error instanceof AuthError) {
      throw new Error(`Auth error: ${error.message}`);
    }
    throw error;
  }
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

export async function resetPassword(email: string) {
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/reset-password`,
  });
  if (error) throw error;
}

export async function updatePassword(newPassword: string) {
  const { error } = await supabase.auth.updateUser({
    password: newPassword,
  });
  if (error) throw error;
}