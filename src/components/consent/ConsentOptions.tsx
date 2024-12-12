import React from 'react';
import { Check, X } from 'lucide-react';

interface Props {
  onConsentChange: (hasConsent: boolean) => void;
}

export default function ConsentOptions({ onConsentChange }: Props) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-900">Your Consent Choice</h3>
      
      <div className="space-y-3">
        <label className="flex items-start gap-3 p-4 border border-gray-200 rounded-lg hover:bg-amber-50 cursor-pointer transition-colors">
          <input
            type="radio"
            name="consent"
            className="mt-1 text-amber-600 focus:ring-amber-500"
            onChange={() => onConsentChange(true)}
          />
          <div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-600" />
              <span className="font-medium text-gray-900">
                I consent to data anonymization and sharing
              </span>
            </div>
            <p className="text-sm text-gray-600 mt-1">
              Help improve the application and contribute to emotional intelligence research
            </p>
          </div>
        </label>

        <label className="flex items-start gap-3 p-4 border border-gray-200 rounded-lg hover:bg-red-50 cursor-pointer transition-colors">
          <input
            type="radio"
            name="consent"
            className="mt-1 text-amber-600 focus:ring-amber-500"
            onChange={() => onConsentChange(false)}
          />
          <div>
            <div className="flex items-center gap-2">
              <X className="w-4 h-4 text-red-600" />
              <span className="font-medium text-gray-900">
                I do not consent to data sharing
              </span>
            </div>
            <p className="text-sm text-gray-600 mt-1">
              Continue using the app without contributing data to research
            </p>
          </div>
        </label>
      </div>
    </div>
  );
}