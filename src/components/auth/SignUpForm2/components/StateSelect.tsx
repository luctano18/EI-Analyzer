import React from 'react';
import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { FormData } from '../types';
import { State } from 'country-state-city';

interface Props {
  register: UseFormRegister<FormData>;
  errors: FieldErrors<FormData>;
  onStateChange: (stateCode: string) => void;
}

export default function StateSelect({ register, errors, onStateChange }: Props) {
  const states = State.getStatesOfCountry('US');

  return (
    <div>
      <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
        State
      </label>
      <select
        id="state"
        {...register('state', { required: 'Please select a state' })}
        onChange={(e) => onStateChange(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
        aria-invalid={errors.state ? 'true' : 'false'}
      >
        <option value="">Select state</option>
        {states.map((state) => (
          <option key={state.isoCode} value={state.isoCode}>
            {state.name}
          </option>
        ))}
      </select>
      {errors.state && (
        <p className="mt-1 text-sm text-red-600" role="alert">{errors.state.message}</p>
      )}
    </div>
  );
}