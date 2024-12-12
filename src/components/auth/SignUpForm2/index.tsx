import React from 'react';
import { useForm } from 'react-hook-form';
import { Loader, ArrowLeft } from 'lucide-react';
import BasicInfo from './steps/BasicInfo';
import Demographics from './steps/Demographics';
import Location from './steps/Location';
import StepIndicator from './StepIndicator';
import type { FormData } from './types';
import { useSignup } from './hooks/useSignup';
import { useFormSteps } from './hooks/useFormSteps';

interface Props {
  onClose: () => void;
  onBack?: () => void;
  initialData?: Partial<FormData>;
}

export default function SignUpForm2({ onClose, onBack, initialData }: Props) {
  const { 
    register, 
    handleSubmit, 
    watch, 
    formState: { errors }, 
    setValue, 
    trigger 
  } = useForm<FormData>({
    defaultValues: initialData,
    mode: 'onChange'
  });

  const { isLoading, handleSignup } = useSignup(onClose);
  const {
    currentStep,
    hasParentalConsent,
    setHasParentalConsent,
    handleNext,
    handleBack
  } = useFormSteps({ trigger, setValue });

  const onSubmit = (data: FormData) => handleSignup(data, hasParentalConsent);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <StepIndicator currentStep={currentStep} totalSteps={3} />

      <div className="space-y-4">
        {currentStep === 1 && (
          <BasicInfo 
            register={register} 
            errors={errors} 
            watch={watch} 
          />
        )}

        {currentStep === 2 && (
          <Demographics
            register={register}
            errors={errors}
            watch={watch}
            onParentalConsentChange={setHasParentalConsent}
            hasParentalConsent={hasParentalConsent}
          />
        )}

        {currentStep === 3 && (
          <Location
            register={register}
            errors={errors}
            setValue={setValue}
          />
        )}
      </div>

      <div className="flex justify-between items-center pt-4 border-t">
        <div className="flex gap-4">
          {currentStep > 1 ? (
            <button
              type="button"
              onClick={handleBack}
              className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={onBack}
              className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
          )}
        </div>

        {currentStep < 3 ? (
          <button
            type="button"
            onClick={() => handleNext(watch('ageRange'))}
            className="px-4 py-2 bg-amber-600 text-white text-sm rounded-lg hover:bg-amber-700 transition-colors"
          >
            Continue
          </button>
        ) : (
          <button
            type="submit"
            disabled={isLoading}
            className="px-4 py-2 bg-amber-600 text-white text-sm rounded-lg hover:bg-amber-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isLoading ? (
              <>
                <Loader className="w-4 h-4 animate-spin" />
                <span>Creating Account...</span>
              </>
            ) : (
              <span>Create Account</span>
            )}
          </button>
        )}
      </div>
    </form>
  );
}