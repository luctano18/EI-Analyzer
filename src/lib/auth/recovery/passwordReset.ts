import { supabase } from '../../supabase-config';
import { handleAuthError } from '../errors/handlers';

export async function requestPasswordReset(email: string): Promise<void> {
  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });

    if (error) throw error;
  } catch (error) {
    throw handleAuthError(error);
  }
}

export async function updatePassword(newPassword: string): Promise<void> {
  try {
    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (error) throw error;
  } catch (error) {
    throw handleAuthError(error);
  }
}