import React from 'react';
import { UseFormRegister, FieldErrors, UseFormWatch } from 'react-hook-form';
import ParentalConsentModal from '../ParentalConsentModal';

interface Props {
  register: UseFormRegister<any>;
  errors: FieldErrors;
  watch: UseFormWatch<any>;
  onParentalConsentChange: (value: boolean) => void;
  hasParentalConsent: boolean;
}

const genderOptions = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'nonBinary', label: 'Non-Binary' },
  { value: 'genderqueer', label: 'Genderqueer' },
  { value: 'transgenderMale', label: 'Transgender Male' },
  { value: 'transgenderFemale', label: 'Transgender Female' },
  { value: 'agender', label: 'Agender' },
  { value: 'genderfluid', label: 'Genderfluid' },
  { value: 'preferNotToSay', label: 'Prefer Not to Say' },
  { value: 'other', label: 'Other' }
];

const ethnicityOptions = [
  { value: 'african', label: 'African' },
  { value: 'africanAmerican', label: 'African-American/Black' },
  { value: 'asian', label: 'Asian' },
  { value: 'hispanic', label: 'Hispanic/Latino' },
  { value: 'middleEastern', label: 'Middle Eastern' },
  { value: 'indigenous', label: 'Indigenous/First Nations/Native American' },
  { value: 'pacificIslander', label: 'Pacific Islander' },
  { value: 'white', label: 'White/Caucasian' },
  { value: 'multiracial', label: 'Multiracial' },
  { value: 'preferNotToSay', label: 'Prefer Not to Say' },
  { value: 'other', label: 'Other' }
];

export default function Demographics({
  register,
  errors,
  watch,
  onParentalConsentChange,
  hasParentalConsent
}: Props) {
  const [showConsentModal, setShowConsentModal] = React.useState(false);
  const gender = watch('gender');
  const ethnicity = watch('ethnicity');
  const ageRange = watch('ageRange');

  React.useEffect(() => {
    if (ageRange === 'under16' && !hasParentalConsent) {
      setShowConsentModal(true);
    }
  }, [ageRange, hasParentalConsent]);

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Gender (Optional)
        </label>
        <select
          {...register('gender')}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
        >
          <option value="">Select gender</option>
          {genderOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {gender === 'other' && (
          <input
            type="text"
            {...register('customGender')}
            placeholder="Please specify your gender"
            className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          />
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Ethnicity (Optional)
        </label>
        <select
          {...register('ethnicity')}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
        >
          <option value="">Select ethnicity</option>
          {ethnicityOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {ethnicity === 'other' && (
          <input
            type="text"
            {...register('customEthnicity')}
            placeholder="Please specify your ethnicity"
            className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          />
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Age Range
        </label>
        <div className="space-y-2">
          <label className="flex items-center">
            <input
              type="radio"
              {...register('ageRange', { required: 'Please select your age range' })}
              value="under16"
              className="mr-2 text-amber-600 focus:ring-amber-500"
            />
            <span>Under 16</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              {...register('ageRange', { required: 'Please select your age range' })}
              value="16orOlder"
              className="mr-2 text-amber-600 focus:ring-amber-500"
            />
            <span>16 or older</span>
          </label>
        </div>
        {errors.ageRange && (
          <p className="mt-1 text-sm text-red-600">{errors.ageRange.message as string}</p>
        )}
        {ageRange === 'under16' && hasParentalConsent && (
          <p className="mt-2 text-sm text-green-600">✓ Parental consent confirmed</p>
        )}
      </div>

      <ParentalConsentModal
        isOpen={showConsentModal}
        onClose={() => setShowConsentModal(false)}
        onConfirm={() => {
          onParentalConsentChange(true);
          setShowConsentModal(false);
        }}
      />
    </div>
  );
}