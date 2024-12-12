import { z } from 'zod';

export const signupSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character'),
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  phoneNumber: z.string().optional(),
  gender: z.string().optional(),
  ethnicity: z.string().optional(),
  ageRange: z.enum(['under16', '16orOlder']),
  city: z.string().optional(),
  state: z.string().optional(),
  zipCode: z.string().optional()
});

export type SignupData = z.infer<typeof signupSchema>;

export function validateSignupData(data: unknown) {
  try {
    return {
      success: true,
      data: signupSchema.parse(data)
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        errors: error.errors.map(err => ({
          field: err.path.join('.'),
          message: err.message
        }))
      };
    }
    return {
      success: false,
      errors: [{ message: 'Invalid form data' }]
    };
  }
}