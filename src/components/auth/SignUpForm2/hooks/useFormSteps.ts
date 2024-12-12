import { useState } from 'react';
import { UseFormTrigger, UseFormSetValue } from 'react-hook-form';
import { FormData } from '../types';
import toast from 'react-hot-toast';

interface UseFormStepsProps {
  trigger: UseFormTrigger<FormData>;
  setValue: UseFormSetValue<FormData>;
}

export function useFormSteps({ trigger, setValue }: UseFormStepsProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [hasParentalConsent, setHasParentalConsent] = useState(false);

  const validateStep = async () => {
    let fieldsToValidate: Array<keyof FormData> = [];

    switch (currentStep) {
      case 1:
        fieldsToValidate = ['fullName', 'email', 'password'];
        break;
      case 2:
        fieldsToValidate = ['ageRange'];
        break;
      case 3:
        fieldsToValidate = ['state', 'city', 'zipCode', 'address'];
        break;
    }

    const isValid = await trigger(fieldsToValidate);
    return isValid;
  };

  const handleNext = async (ageRange?: string) => {
    const isValid = await validateStep();
    if (!isValid) return;

    if (currentStep === 2 && ageRange === 'under16' && !hasParentalConsent) {
      toast.error('Le consentement parental est requis pour les utilisateurs de moins de 16 ans');
      return;
    }

    setCurrentStep(prev => prev + 1);
  };

  const handleBack = () => {
    setCurrentStep(prev => prev - 1);
  };

  return {
    currentStep,
    hasParentalConsent,
    setHasParentalConsent,
    handleNext,
    handleBack
  };
}