import { supabase } from '../supabase-config';
import { SignupData } from './validation';
import { AuthenticationError, handleAuthError } from './errors';
import { isRateLimitError, handleRateLimitError } from './rateLimiting';

export async function createAuthUser(data: SignupData, hasParentalConsent: boolean) {
  try {
    const { data: authData, error: signUpError } = await supabase.auth.signUp({
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

    if (signUpError) {
      if (isRateLimitError(signUpError)) {
        throw new AuthenticationError(
          handleRateLimitError(signUpError),
          'rate_limit_exceeded',
          429
        );
      }
      throw signUpError;
    }

    if (!authData.user) throw new Error('Failed to create user account');

    return authData.user;
  } catch (error) {
    throw handleAuthError(error);
  }
}

export async function createUserProfile(userId: string, data: SignupData) {
  try {
    const { error: profileError } = await supabase
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

    if (profileError) {
      throw profileError;
    }
  } catch (error) {
    // If profile creation fails, clean up the auth user
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
    if (error instanceof AuthenticationError) {
      throw error;
    }
    throw handleAuthError(error);
  }
}