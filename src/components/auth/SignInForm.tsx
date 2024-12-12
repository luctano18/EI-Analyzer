import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Mail, Lock, Loader, ArrowRight } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import toast from 'react-hot-toast';
import type { View } from './AuthModal';

interface SignInFormProps {
  onViewChange: (view: View) => void;
  onClose: () => void;
}

type FormData = {
  email: string;
  password: string;
};

export default function SignInForm({ onViewChange, onClose }: SignInFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });
      
      if (error) throw error;
      
      toast.success('Welcome back!');
      onClose();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = async (provider: 'google' | 'facebook') => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: window.location.origin,
        },
      });
      if (error) throw error;
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div className="w-full max-w-[352px] mx-auto">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <div>
          <div className="relative">
            <Mail className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="email"
              {...register('email', { 
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address'
                }
              })}
              placeholder="Email address"
              className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-md focus:ring-1 focus:ring-amber-500 focus:border-amber-500"
              disabled={isLoading}
            />
          </div>
          {errors.email && (
            <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>
          )}
        </div>

        <div>
          <div className="relative">
            <Lock className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="password"
              {...register('password', {
                required: 'Password is required'
              })}
              placeholder="Password"
              className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-md focus:ring-1 focus:ring-amber-500 focus:border-amber-500"
              disabled={isLoading}
            />
          </div>
          {errors.password && (
            <p className="mt-1 text-xs text-red-600">{errors.password.message}</p>
          )}
        </div>

        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => onViewChange('forgot-password')}
            className="text-xs text-amber-600 hover:text-amber-500 font-medium"
          >
            Forgot password?
          </button>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex items-center justify-center gap-2 py-2 bg-gradient-to-r from-amber-600 to-orange-600 text-white text-sm font-medium rounded-md hover:from-amber-700 hover:to-orange-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-amber-500"
        >
          {isLoading ? (
            <>
              <Loader className="w-4 h-4 animate-spin" />
              <span>Signing in...</span>
            </>
          ) : (
            <>
              <span>Sign In</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </form>

      <div className="mt-4">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200" />
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="px-2 bg-white text-gray-500">Or continue with</span>
          </div>
        </div>

        <div className="mt-3 grid grid-cols-2 gap-2">
          <button
            onClick={() => handleSocialLogin('google')}
            className="flex items-center justify-center gap-2 px-3 py-1.5 border border-gray-200 rounded-md text-xs text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"
              />
            </svg>
            Google
          </button>
          <button
            onClick={() => handleSocialLogin('facebook')}
            className="flex items-center justify-center gap-2 px-3 py-1.5 border border-gray-200 rounded-md text-xs text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
              />
            </svg>
            Facebook
          </button>
        </div>
      </div>

      <div className="mt-3 text-center">
        <p className="text-xs text-gray-600">
          Don't have an account?{' '}
          <button
            onClick={() => onViewChange('register')}
            className="font-medium text-amber-600 hover:text-amber-500 transition-colors"
          >
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
}