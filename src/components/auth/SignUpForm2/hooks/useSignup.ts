import { useState } from 'react';
import { FormData } from '../types';
import { signUp } from '../../../../lib/auth/signup';
import { validateSignupData } from '../../../../lib/auth/validation';
import { AuthenticationError } from '../../../../lib/auth/errors';
import { useRateLimit } from './useRateLimit';
import toast from 'react-hot-toast';

export function useSignup(onClose: () => void) {
  const [isLoading, setIsLoading] = useState(false);
  const { checkRateLimit } = useRateLimit();

  const handleSignup = async (data: FormData, hasParentalConsent: boolean) => {
    if (!checkRateLimit()) {
      return;
    }

    if (data.ageRange === 'under16' && !hasParentalConsent) {
      toast.error('Parental consent is required for users under 16');
      return;
    }

    const validation = validateSignupData(data);
    if (!validation.success) {
      validation.errors.forEach(error => {
        toast.error(error.message);
      });
      return;
    }

    setIsLoading(true);
    try {
      const result = await signUp(validation.data, hasParentalConsent);
      
      if (result.success) {
        toast.success('Please check your email to confirm your account');
        setTimeout(() => {
          onClose();
        }, 3000);
      }
    } catch (error) {
      console.error('Signup error:', error);
      
      if (error instanceof AuthenticationError) {
        toast.error(error.message);
      } else {
        toast.error('An unexpected error occurred. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    handleSignup
  };
}