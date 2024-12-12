import { supabase } from '../lib/supabase-config';
import { FormData } from '../components/auth/SignUpForm2/types';
import { z } from 'zod';
import toast from 'react-hot-toast';

// Validation schema for signup data
const signupSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  phoneNumber: z.string().optional(),
  gender: z.string().optional(),
  ethnicity: z.string().optional(),
  ageRange: z.enum(['under16', '16orOlder']),
  city: z.string().optional(),
  state: z.string().optional(),
  zipCode: z.string().optional()
});

export async function signUp(data: FormData, hasParentalConsent: boolean) {
  try {
    // Validate form data
    const validatedData = signupSchema.parse(data);

    // Create auth user with metadata
    const { data: authData, error: signUpError } = await supabase.auth.signUp({
      email: validatedData.email,
      password: validatedData.password,
      options: {
        data: {
          full_name: validatedData.fullName,
          phone_number: validatedData.phoneNumber,
          gender: validatedData.gender,
          ethnicity: validatedData.ethnicity,
          age_range: validatedData.ageRange,
          has_parental_consent: hasParentalConsent,
          city: validatedData.city,
          state: validatedData.state,
          zip_code: validatedData.zipCode
        },
        emailRedirectTo: `${window.location.origin}/auth/callback`
      }
    });

    if (signUpError) {
      if (signUpError.status === 500) {
        throw new Error('Server error. Please try again later.');
      }
      throw signUpError;
    }

    if (!authData.user) {
      throw new Error('Failed to create user account');
    }

    // Create profile in database
    const { error: profileError } = await supabase
      .from('profiles')
      .insert([{
        id: authData.user.id,
        email: validatedData.email,
        full_name: validatedData.fullName,
        phone_number: validatedData.phoneNumber,
        metadata: {
          gender: validatedData.gender,
          ethnicity: validatedData.ethnicity,
          age_range: validatedData.ageRange,
          has_parental_consent: hasParentalConsent
        }
      }]);

    if (profileError) {
      // If profile creation fails, we should delete the auth user
      await supabase.auth.admin.deleteUser(authData.user.id);
      throw profileError;
    }

    return { success: true, user: authData.user };
  } catch (error: any) {
    console.error('Signup error:', error);
    
    // Handle specific error cases
    if (error.message?.includes('Email')) {
      throw new Error('Please enter a valid email address');
    }
    
    if (error.message?.includes('Password')) {
      throw new Error('Password must be at least 8 characters long');
    }

    if (error.code === '23505') {
      throw new Error('This email is already registered');
    }

    // Handle rate limiting
    if (error.status === 429) {
      throw new Error('Too many signup attempts. Please try again later.');
    }

    // Handle unexpected errors
    throw new Error(error.message || 'An unexpected error occurred. Please try again.');
  }
}

export function handleSignupError(error: any): string {
  if (error?.status === 429) {
    return 'Too many signup attempts. Please try again later.';
  }

  if (error?.message?.includes('Email')) {
    return 'Please enter a valid email address';
  }
  
  if (error?.message?.includes('Password')) {
    return 'Password must be at least 8 characters long';
  }

  if (error?.code === '23505') {
    return 'This email is already registered';
  }

  return error.message || 'An error occurred during signup. Please try again.';
}