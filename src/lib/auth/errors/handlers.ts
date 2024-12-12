import { AuthError } from '@supabase/supabase-js';
import { AuthenticationError, ServerError, NetworkError } from './types';
import { isRateLimitError, handleRateLimitError } from '../rateLimiting';

export function handleAuthError(error: unknown): AuthenticationError {
  console.error('Auth error:', error);

  // Handle network errors
  if (error instanceof Error && 'cause' in error && error.cause === 'NetworkError') {
    return new NetworkError();
  }

  // Handle Supabase auth errors
  if (error instanceof AuthError) {
    // Handle rate limiting
    if (isRateLimitError(error)) {
      return new AuthenticationError(
        handleRateLimitError(error),
        'rate_limit_exceeded',
        429
      );
    }

    // Handle server errors
    if (error.status === 500) {
      return new ServerError();
    }

    // Handle specific error codes
    switch (error.code) {
      case 'invalid_credentials':
        return new AuthenticationError(
          'Invalid email or password',
          'invalid_credentials',
          401
        );
      case 'user_exists':
        return new AuthenticationError(
          'An account with this email already exists',
          'user_exists',
          409
        );
      case 'email_not_confirmed':
        return new AuthenticationError(
          'Please verify your email address',
          'email_not_confirmed',
          403
        );
      default:
        return new AuthenticationError(
          error.message,
          error.code || 'unknown_error',
          error.status || 500
        );
    }
  }

  // Handle unknown errors
  return new AuthenticationError(
    'An unexpected error occurred',
    'unknown_error',
    500
  );
}

export function isAuthError(error: unknown): error is AuthenticationError {
  return error instanceof AuthenticationError;
}