import React from 'react';
import { Check } from 'lucide-react';

interface Props {
  password: string;
}

export default function PasswordStrength({ password = '' }: Props) {
  if (!password) return null;

  const requirements = [
    {
      text: 'At least 8 characters',
      met: password.length >= 8,
    },
    {
      text: 'Contains uppercase letter',
      met: /[A-Z]/.test(password),
    },
    {
      text: 'Contains lowercase letter',
      met: /[a-z]/.test(password),
    },
    {
      text: 'Contains number',
      met: /[0-9]/.test(password),
    },
    {
      text: 'Contains special character',
      met: /[^A-Za-z0-9]/.test(password),
    },
  ];

  const strength = requirements.filter(req => req.met).length;
  const strengthText = ['Weak', 'Fair', 'Good', 'Strong', 'Very Strong'][Math.max(0, strength - 1)] || 'Weak';
  const strengthColor = [
    'bg-red-500',
    'bg-orange-500',
    'bg-yellow-500',
    'bg-green-500',
    'bg-emerald-500',
  ][Math.max(0, strength - 1)] || 'bg-gray-200';

  return (
    <div className="mt-2 space-y-2">
      <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
        <div
          className={`h-full ${strengthColor} transition-all duration-300`}
          style={{ width: `${(strength / 5) * 100}%` }}
        />
      </div>
      
      <p className={`text-sm ${strength > 2 ? 'text-green-600' : 'text-amber-600'}`}>
        Password strength: {strengthText}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
        {requirements.map((req, index) => (
          <div
            key={index}
            className={`flex items-center space-x-2 ${
              req.met ? 'text-green-600' : 'text-gray-500'
            }`}
          >
            {req.met && <Check className="w-4 h-4" />}
            <span>{req.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}