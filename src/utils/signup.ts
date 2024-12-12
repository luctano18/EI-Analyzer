import { supabase } from '../lib/supabase';
import { FormData } from '../components/auth/SignUpForm2/types';
import { z } from 'zod';
import { handleError } from './errors';

// Validation schema for signup data
const signupDataSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  phoneNumber: z.string().optional(),
  gender: z.string().optional(),
  customGender: z.string().optional(),
  ethnicity: z.string().optional(),
  customEthnicity: z.string().optional(),
  ageRange: z.enum(['under16', '16orOlder']),
  city: z.string().optional(),
  state: z.string().optional(),
  zipCode: z.string().optional()
});

export async function createUserProfile(formData: FormData, userId: string) {
  try {
    // Validate form data
    const validatedData = signupDataSchema.parse(formData);

    // Prepare profile data
    const profileData = {
      id: userId,
      email: validatedData.email,
      full_name: validatedData.fullName,
      phone_number: validatedData.phoneNumber,
      location: {
        city: validatedData.city,
        state: validatedData.state,
        zip_code: validatedData.zipCode
      },
      metadata: {
        gender: validatedData.gender === 'other' ? validatedData.customGender : validatedData.gender,
        ethnicity: validatedData.ethnicity === 'other' ? validatedData.customEthnicity : validatedData.ethnicity,
        age_range: validatedData.ageRange
      },
      preferences: {
        emailNotifications: true,
        language: 'en',
        theme: 'light',
        fontSize: 'medium'
      }
    };

    // Insert profile into database
    const { error } = await supabase
      .from('profiles')
      .insert([profileData])
      .select()
      .single();

    if (error) {
      throw error;
    }

    // Create audit log entry
    await supabase.from('audit_logs').insert([{
      user_id: userId,
      action: 'CREATE',
      table_name: 'profiles',
      record_id: userId,
      new_data: profileData
    }]);

    return { success: true };

  } catch (error) {
    return handleError(error);
  }
}

export async function validateSignupData(data: FormData) {
  try {
    await signupDataSchema.parseAsync(data);
    return { isValid: true };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        isValid: false,
        errors: error.errors.map(err => ({
          field: err.path.join('.'),
          message: err.message
        }))
      };
    }
    return { isValid: false, errors: [{ message: 'Invalid form data' }] };
  }
}