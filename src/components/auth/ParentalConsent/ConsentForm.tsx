import React from 'react';
import { Check } from 'lucide-react';

interface Props {
  fullName: string;
  onConsentChange: (hasConsent: boolean) => void;
}

export default function ConsentForm({ fullName, onConsentChange }: Props) {
  return (
    <div className="border-t pt-4">
      <label className="flex items-start gap-3 group cursor-pointer">
        <div className="relative flex items-center">
          <input
            type="checkbox"
            id="consent"
            className="peer sr-only"
            onChange={(e) => onConsentChange(e.target.checked)}
            required
          />
          <div className="w-5 h-5 border-2 border-gray-300 rounded peer-checked:border-amber-600 peer-checked:bg-amber-600 transition-colors">
            <Check className="w-4 h-4 text-white scale-0 peer-checked:scale-100 transition-transform duration-200" />
          </div>
        </div>
        <span className="text-sm text-gray-700">
          I, <span className="font-medium">{fullName}</span>, acknowledge that I have 
          parental permission to create an account, and my parent/guardian has reviewed 
          and accepts the <a href="#" className="text-amber-600 hover:text-amber-700">Terms of Service</a> and{' '}
          <a href="#" className="text-amber-600 hover:text-amber-700">Privacy Policy</a>.
        </span>
      </label>
    </div>
  );
}