import React from 'react';
import { Check } from 'lucide-react';

interface Props {
  currentStep: number;
  totalSteps: number;
}

export default function StepIndicator({ currentStep, totalSteps }: Props) {
  return (
    <div className="relative mb-4">
      <div className="absolute top-3 left-0 w-full h-0.5 bg-gray-200 rounded-full">
        <div
          className="absolute h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
        />
      </div>

      <div className="relative flex justify-between">
        {Array.from({ length: totalSteps }).map((_, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber < currentStep;
          const isCurrent = stepNumber === currentStep;

          return (
            <div
              key={stepNumber}
              className={`flex flex-col items-center ${
                isCompleted || isCurrent ? 'text-amber-600' : 'text-gray-400'
              }`}
            >
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 ${
                  isCompleted
                    ? 'bg-gradient-to-r from-amber-500 to-orange-500 shadow-sm'
                    : isCurrent
                    ? 'border-2 border-amber-500 bg-white'
                    : 'border-2 border-gray-200 bg-white'
                }`}
              >
                {isCompleted ? (
                  <Check className="w-3.5 h-3.5 text-white" />
                ) : (
                  <span className={`text-xs font-medium ${isCurrent ? 'text-amber-600' : 'text-gray-400'}`}>
                    {stepNumber}
                  </span>
                )}
              </div>
              <span className="mt-1 text-[10px] font-medium">
                {stepNumber === 1 && 'Basic Info'}
                {stepNumber === 2 && 'Demographics'}
                {stepNumber === 3 && 'Location'}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}