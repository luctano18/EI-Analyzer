import React from 'react';
import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { FormData } from '../types';
import { City } from 'country-state-city';

interface Props {
  register: UseFormRegister<FormData>;
  errors: FieldErrors<FormData>;
  selectedState: string;
  disabled: boolean;
}

export default function CitySelect({ register, errors, selectedState, disabled }: Props) {
  const cities = selectedState ? City.getCitiesOfState('US', selectedState) : [];

  return (
    <div>
      <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
        City
      </label>
      <select
        id="city"
        {...register('city', { required: 'Please select a city' })}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
        disabled={disabled}
        aria-invalid={errors.city ? 'true' : 'false'}
      >
        <option value="">Select city</option>
        {cities.map((city) => (
          <option key={city.name} value={city.name}>
            {city.name}
          </option>
        ))}
      </select>
      {errors.city && (
        <p className="mt-1 text-sm text-red-600" role="alert">{errors.city.message}</p>
      )}
    </div>
  );
}