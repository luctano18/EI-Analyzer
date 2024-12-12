import { useState } from 'react';
import toast from 'react-hot-toast';

const RATE_LIMIT_WINDOW = 300000; // 5 minutes in milliseconds
const MAX_ATTEMPTS = 3;
const COOLDOWN_PERIOD = 900000; // 15 minutes in milliseconds
const BACKOFF_MULTIPLIER = 2;

interface RateLimitState {
  attempts: number[];
  cooldownUntil: number | null;
  backoffMultiplier: number;
}

export function useRateLimit() {
  const [state, setState] = useState<RateLimitState>({
    attempts: [],
    cooldownUntil: null,
    backoffMultiplier: 1
  });

  const checkRateLimit = (): boolean => {
    const now = Date.now();

    // Check if in cooldown period
    if (state.cooldownUntil && now < state.cooldownUntil) {
      const remainingMinutes = Math.ceil((state.cooldownUntil - now) / 60000);
      toast.error(`Too many attempts. Please try again in ${remainingMinutes} minutes.`);
      return false;
    }

    // Clear old attempts
    const recentAttempts = state.attempts.filter(time => now - time < RATE_LIMIT_WINDOW);

    if (recentAttempts.length >= MAX_ATTEMPTS) {
      // Calculate dynamic cooldown with exponential backoff
      const cooldownDuration = COOLDOWN_PERIOD * state.backoffMultiplier;
      const cooldownUntil = now + cooldownDuration;

      setState(prev => ({
        ...prev,
        cooldownUntil,
        backoffMultiplier: prev.backoffMultiplier * BACKOFF_MULTIPLIER
      }));

      const cooldownMinutes = Math.ceil(cooldownDuration / 60000);
      toast.error(`Too many signup attempts. Please try again in ${cooldownMinutes} minutes.`);
      return false;
    }

    // Add new attempt
    setState(prev => ({
      ...prev,
      attempts: [...recentAttempts, now]
    }));

    return true;
  };

  const resetRateLimit = () => {
    setState({
      attempts: [],
      cooldownUntil: null,
      backoffMultiplier: 1
    });
  };

  return { checkRateLimit, resetRateLimit };
}