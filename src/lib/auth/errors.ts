import { AuthError } from '@supabase/supabase-js';

export class AuthenticationError extends Error {
  constructor(
    message: string,
    public code?: string,
    public status?: number
  ) {
    super(message);
    this.name = 'AuthenticationError';
  }
}

export function handleAuthError(error: unknown): AuthenticationError {
  console.error('Auth error:', error);

  if (error instanceof AuthError) {
    switch (error.status) {
      case 400:
        return new AuthenticationError(
          'Invalid email or password format',
          'invalid_credentials',
          400
        );
      case 422:
        return new AuthenticationError(
          'Email or password is incorrect',
          'invalid_credentials',
          422
        );
      case 429:
        return new AuthenticationError(
          'Too many attempts. Please try again later',
          'rate_limit_exceeded',
          429
        );
      case 500:
        return new AuthenticationError(
          'Server error. Please try again later',
          'server_error',
          500
        );
      default:
        return new AuthenticationError(
          error.message,
          error.status?.toString(),
          error.status
        );
    }
  }

  return new AuthenticationError(
    'An unexpected error occurred. Please try again.',
    'unknown_error'
  );
}