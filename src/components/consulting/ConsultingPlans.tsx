import React, { useState, useEffect } from 'react';
import { Clock, Star, Zap, Loader } from 'lucide-react';
import { getStripe, createCheckoutSession, validateStripeConfig } from '../../lib/stripe';
import { supabase } from '../../lib/supabase';
import toast from 'react-hot-toast';

interface Plan {
  id: string;
  name: string;
  price: number;
  minutes: number;
  features: string[];
  icon: React.ReactNode;
  popular?: boolean;
  priceId?: string;
}

const plans: Plan[] = [
  {
    id: 'trial',
    name: 'Free Trial',
    price: 0,
    minutes: 15,
    features: [
      '15 minutes of consulting',
      'Basic chat features',
      'Email support',
      'One-time use'
    ],
    icon: <Clock className="w-6 h-6" />
  },
  {
    id: 'casual',
    name: 'Casual',
    price: 29.99,
    minutes: 60,
    priceId: 'price_casual',
    features: [
      '60 minutes of consulting',
      'Advanced chat features',
      'Priority email support',
      'Valid for 30 days',
      'Rollover unused minutes'
    ],
    icon: <Star className="w-6 h-6" />,
    popular: true
  },
  {
    id: 'unlimited',
    name: 'Unlimited',
    price: 99.99,
    minutes: -1,
    priceId: 'price_unlimited',
    features: [
      'Unlimited consulting',
      'Premium chat features',
      '24/7 priority support',
      'Custom insights dashboard',
      'Monthly strategy session'
    ],
    icon: <Zap className="w-6 h-6" />
  }
];

export default function ConsultingPlans() {
  const [isLoading, setIsLoading] = useState(false);
  const [isConfigValid, setIsConfigValid] = useState(false);

  useEffect(() => {
    try {
      validateStripeConfig();
      setIsConfigValid(true);
    } catch (error) {
      console.error('Stripe configuration error:', error);
      setIsConfigValid(false);
    }
  }, []);

  const handlePlanSelect = async (plan: Plan) => {
    if (!isConfigValid) {
      toast.error('Payment system is currently unavailable');
      return;
    }

    setIsLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast.error('Please sign in to purchase a plan');
        return;
      }

      if (plan.id === 'trial') {
        // Check if user has already used trial
        const { data: trialData } = await supabase
          .from('consulting_sessions')
          .select('id')
          .eq('user_id', user.id)
          .eq('plan_id', 'trial')
          .single();

        if (trialData) {
          toast.error('You have already used your free trial');
          return;
        }

        // Activate trial
        const { error: trialError } = await supabase
          .from('user_plans')
          .insert({
            user_id: user.id,
            plan_id: 'trial',
            minutes_remaining: 15,
            expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
          });

        if (trialError) throw trialError;
        toast.success('Trial activated successfully!');
        return;
      }

      // For paid plans, create Stripe checkout session
      if (!plan.priceId) {
        throw new Error('Invalid plan configuration');
      }

      const stripe = await getStripe();
      if (!stripe) {
        throw new Error('Stripe failed to initialize');
      }

      const sessionId = await createCheckoutSession(plan.priceId, user.id);
      const { error } = await stripe.redirectToCheckout({ sessionId });
      
      if (error) throw error;

    } catch (error: any) {
      console.error('Payment error:', error);
      toast.error(error.message || 'Failed to process payment. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8">
      {/* Rest of the component remains the same */}
    </div>
  );
}