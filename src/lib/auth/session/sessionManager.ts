import { supabase } from '../../supabase-config';
import { handleAuthError } from '../errors/handlers';
import { User, Session } from '@supabase/supabase-js';

export async function getCurrentSession(): Promise<Session | null> {
  try {
    const { data: { session }, error } = await supabase.auth.getSession();
    if (error) throw error;
    return session;
  } catch (error) {
    throw handleAuthError(error);
  }
}

export async function getCurrentUser(): Promise<User | null> {
  try {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error) throw error;
    return user;
  } catch (error) {
    throw handleAuthError(error);
  }
}

export async function signOut(): Promise<void> {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  } catch (error) {
    throw handleAuthError(error);
  }
}