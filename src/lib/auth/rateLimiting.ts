import { AuthError } from '@supabase/supabase-js';

const EMAIL_RATE_LIMIT_WINDOW = 3600000; // 1 hour in milliseconds
const EMAIL_COOLDOWN_MESSAGE = 'Please wait before requesting another email';

export function isRateLimitError(error: unknown): boolean {
  if (error instanceof AuthError) {
    return error.status === 429 || error.code === 'over_email_send_rate_limit';
  }
  return false;
}

export function handleRateLimitError(error: unknown): string {
  if (!isRateLimitError(error)) {
    throw error;
  }

  if (error instanceof AuthError && error.code === 'over_email_send_rate_limit') {
    return `${EMAIL_COOLDOWN_MESSAGE}. Try again in 1 hour.`;
  }

  return 'Too many attempts. Please try again later.';
}

export function getRateLimitResetTime(error: AuthError): number {
  // Extract retry-after header if available
  const retryAfter = error.status === 429 ? 
    parseInt(error?.message?.match(/try again in (\d+)/)?.[1] || '3600', 10) : 
    3600;

  return Date.now() + (retryAfter * 1000);
}