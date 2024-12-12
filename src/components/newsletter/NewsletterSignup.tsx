import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Mail, BookOpen } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import toast from 'react-hot-toast';

type FormData = {
  email: string;
  acceptNewsletter: boolean;
};

export default function NewsletterSignup() {
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    defaultValues: {
      acceptNewsletter: false
    }
  });

  const onSubmit = async (data: FormData) => {
    if (!data.acceptNewsletter) {
      toast.error('Please accept the newsletter subscription to receive the free eBook');
      return;
    }

    setIsLoading(true);
    try {
      // Mock successful subscription for demo
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success('Thank you for subscribing! Check your email for the free eBook.');
      reset();
      
      // In production, uncomment and use actual Supabase call:
      /*
      const { error: insertError } = await supabase
        .from('newsletter_subscribers')
        .insert({
          email: data.email,
          subscribed: true,
          source: 'ebook_offer'
        });

      if (insertError) throw insertError;
      */
    } catch (error: any) {
      console.error('Newsletter subscription error:', error);
      toast.error('Error subscribing to newsletter. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-8 rounded-lg shadow-sm">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-center mb-6">
          <div className="bg-amber-100 p-3 rounded-full">
            <BookOpen className="w-6 h-6 text-amber-600" />
          </div>
        </div>
        
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Get Your Free eBook
          </h2>
          <p className="text-gray-600">
            Sign up to receive "10 African Proverbs for Emotional Resilience"
            and join our weekly wisdom newsletter for continuous growth.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="email"
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address'
                  }
                })}
                placeholder="Enter your email"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                disabled={isLoading}
              />
            </div>
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
            )}
          </div>

          <div className="flex items-start space-x-2">
            <input
              type="checkbox"
              {...register('acceptNewsletter', {
                required: 'Please accept the newsletter subscription'
              })}
              id="newsletter-consent"
              className="mt-1 rounded text-amber-600 focus:ring-amber-500"
              disabled={isLoading}
            />
            <label
              htmlFor="newsletter-consent"
              className="text-sm text-gray-600 leading-tight"
            >
              I agree to receive the newsletter and marketing emails. You can unsubscribe at any time.
              By subscribing, you agree to our Privacy Policy and Terms of Service.
            </label>
          </div>
          {errors.acceptNewsletter && (
            <p className="text-sm text-red-600">{errors.acceptNewsletter.message}</p>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 px-4 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-md hover:from-amber-700 hover:to-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Processing...</span>
              </>
            ) : (
              <>
                <BookOpen className="w-5 h-5" />
                <span>Get Free eBook</span>
              </>
            )}
          </button>
        </form>

        <p className="mt-4 text-xs text-gray-500 text-center">
          We respect your privacy. Your information is safe and will never be shared.
        </p>
      </div>
    </div>
  );
}