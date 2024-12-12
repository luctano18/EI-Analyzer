export const phoneRegex = /^\+?[1-9]\d{1,14}$/;

export const validatePhoneNumber = (phone: string): boolean => {
  if (!phone) return true; // Optional field
  return phoneRegex.test(phone);
};

export const validateZipCode = (zipCode: string): boolean => {
  if (!zipCode) return true; // Optional field
  return /^\d{5}(-\d{4})?$/.test(zipCode);
};

export const validatePasswords = (password: string, confirmPassword: string): boolean => {
  return password === confirmPassword;
};

export const getPasswordStrength = (password: string): number => {
  let strength = 0;
  if (password.length >= 8) strength++;
  if (/[A-Z]/.test(password)) strength++;
  if (/[a-z]/.test(password)) strength++;
  if (/[0-9]/.test(password)) strength++;
  if (/[^A-Za-z0-9]/.test(password)) strength++;
  return strength;
};