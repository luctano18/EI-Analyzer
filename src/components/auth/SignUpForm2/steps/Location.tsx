import React, { useState, useEffect } from 'react';
import { UseFormRegister, FieldErrors, UseFormSetValue } from 'react-hook-form';
import { FormData } from '../types';
import StateSelect from '../components/StateSelect';
import CitySelect from '../components/CitySelect';

interface Props {
  register: UseFormRegister<FormData>;
  errors: FieldErrors<FormData>;
  setValue: UseFormSetValue<FormData>;
}

export default function Location({ register, errors, setValue }: Props) {
  const [selectedState, setSelectedState] = useState('');

  const handleStateChange = (stateCode: string) => {
    setSelectedState(stateCode);
    // Reset city when state changes
    setValue('city', '', { shouldValidate: true });
  };

  return (
    <div className="space-y-6">
      <StateSelect
        register={register}
        errors={errors}
        onStateChange={handleStateChange}
      />

      <CitySelect
        register={register}
        errors={errors}
        selectedState={selectedState}
        disabled={!selectedState}
      />

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          ZIP Code
        </label>
        <input
          type="text"
          {...register('zipCode', {
            pattern: {
              value: /^\d{5}(-\d{4})?$/,
              message: 'Invalid ZIP code format'
            }
          })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          placeholder="Enter your ZIP code"
          aria-invalid={errors.zipCode ? 'true' : 'false'}
        />
        {errors.zipCode && (
          <p className="mt-1 text-sm text-red-600" role="alert">{errors.zipCode.message}</p>
        )}
      </div>
    </div>
  );
}