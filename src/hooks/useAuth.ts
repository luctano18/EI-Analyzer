import { useState, useCallback } from 'react';
import { signUp } from '../lib/auth/signup/signupService';
import { signOut, getCurrentUser } from '../lib/auth/session/sessionManager';
import { requestPasswordReset } from '../lib/auth/recovery/passwordReset';
import { isAuthError } from '../lib/auth/errors/handlers';
import toast from 'react-hot-toast';
import { useRateLimit } from './useRateLimit';

export function useAuth() {
  const [isLoading, setIsLoading] = useState(false);
  const { checkRateLimit } = useRateLimit();

  const handleSignUp = useCallback(async (data: any, hasParentalConsent: boolean) => {
    if (!checkRateLimit()) return;
    
    setIsLoading(true);
    try {
      const result = await signUp(data, hasParentalConsent);
      toast.success('Please check your email to confirm your account');
      return result;
    } catch (error) {
      if (isAuthError(error)) {
        toast.error(error.message);
      } else {
        toast.error('An unexpected error occurred. Please try again.');
      }
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [checkRateLimit]);

  const handleSignOut = useCallback(async () => {
    try {
      await signOut();
      toast.success('Signed out successfully');
    } catch (error) {
      if (isAuthError(error)) {
        toast.error(error.message);
      }
    }
  }, []);

  const handlePasswordReset = useCallback(async (email: string) => {
    if (!checkRateLimit()) return;

    try {
      await requestPasswordReset(email);
      toast.success('Password reset instructions sent to your email');
    } catch (error) {
      if (isAuthError(error)) {
        toast.error(error.message);
      }
    }
  }, [checkRateLimit]);

  return {
    isLoading,
    signUp: handleSignUp,
    signOut: handleSignOut,
    requestPasswordReset: handlePasswordReset,
    getCurrentUser
  };
}