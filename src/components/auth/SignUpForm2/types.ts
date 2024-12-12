export interface FormData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phoneNumber?: string;
  gender?: string;
  customGender?: string;
  ethnicity?: string;
  customEthnicity?: string;
  ageRange: 'under16' | '16orOlder';
  city?: string;
  state?: string;
  zipCode?: string;
}

export const genderOptions = [
  'Male',
  'Female',
  'Non-Binary',
  'Genderqueer',
  'Transgender Male',
  'Transgender Female',
  'Agender',
  'Genderfluid',
  'Prefer Not to Say',
  'Other'
];

export const ethnicityOptions = [
  'African',
  'African-American/Black',
  'Asian',
  'Hispanic/Latino',
  'Middle Eastern',
  'Indigenous/First Nations/Native American',
  'Pacific Islander',
  'White/Caucasian',
  'Multiracial',
  'Prefer Not to Say',
  'Other'
];