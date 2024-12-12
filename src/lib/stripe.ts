import { loadStripe, Stripe } from '@stripe/stripe-js';
import { z } from 'zod';

// Environment variable validation schema
const envSchema = z.object({
  VITE_STRIPE_PUBLIC_KEY: z.string().min(1, 'Stripe public key is required'),
});

// Parse and validate environment variables
const env = envSchema.safeParse(import.meta.env);

if (!env.success) {
  console.error('Missing required environment variables:', env.error.format());
  throw new Error('Invalid environment configuration');
}

let stripePromise: Promise<Stripe | null>;

export const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(env.data.VITE_STRIPE_PUBLIC_KEY);
  }
  return stripePromise;
};

export const createCheckoutSession = async (priceId: string, userId: string) => {
  try {
    const response = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        priceId,
        userId,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to create checkout session');
    }

    const { sessionId } = await response.json();
    return sessionId;
  } catch (error) {
    console.error('Error creating checkout session:', error);
    throw error;
  }
};

export const validateStripeConfig = () => {
  if (!env.success) {
    throw new Error('Invalid Stripe configuration');
  }
  return true;
};