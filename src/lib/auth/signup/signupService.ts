import { supabase } from '../../supabase-config';
import { SignupData } from '../validation';
import { handleAuthError } from '../errors/handlers';
import { User } from '@supabase/supabase-js';

async function createAuthUser(data: SignupData, hasParentalConsent: boolean): Promise<User> {
  try {
    const { data: authData, error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          full_name: data.fullName,
          phone_number: data.phoneNumber,
          gender: data.gender,
          ethnicity: data.ethnicity,
          age_range: data.ageRange,
          has_parental_consent: hasParentalConsent,
          city: data.city,
          state: data.state,
          zip_code: data.zipCode
        },
        emailRedirectTo: `${window.location.origin}/auth/callback`
      }
    });

    if (error) throw error;
    if (!authData.user) throw new Error('Failed to create user account');

    return authData.user;
  } catch (error) {
    throw handleAuthError(error);
  }
}

async function createUserProfile(userId: string, data: SignupData): Promise<void> {
  try {
    const { error } = await supabase
      .from('profiles')
      .insert([{
        id: userId,
        email: data.email,
        full_name: data.fullName,
        phone_number: data.phoneNumber,
        metadata: {
          gender: data.gender,
          ethnicity: data.ethnicity,
          age_range: data.ageRange
        }
      }]);

    if (error) throw error;
  } catch (error) {
    // Clean up auth user if profile creation fails
    await supabase.auth.admin.deleteUser(userId);
    throw handleAuthError(error);
  }
}

export async function signUp(data: SignupData, hasParentalConsent: boolean) {
  try {
    const user = await createAuthUser(data, hasParentalConsent);
    await createUserProfile(user.id, data);
    return { success: true, user };
  } catch (error) {
    throw handleAuthError(error);
  }
}