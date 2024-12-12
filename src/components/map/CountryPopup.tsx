import React from 'react';
import { X } from 'lucide-react';
import { proverbsByCountry } from './data/proverbs-data';

interface Props {
  countryCode: string;
  onClose: () => void;
}

export default function CountryPopup({ countryCode, onClose }: Props) {
  const proverbs = proverbsByCountry[countryCode] || [];

  return (
    <div className="absolute top-4 right-4 w-80 bg-white rounded-lg shadow-lg z-[1000] overflow-hidden">
      <div className="p-4 bg-amber-50 border-b border-amber-100">
        <div className="flex justify-between items-start">
          <h3 className="font-semibold text-amber-900">
            {proverbs[0]?.country || 'Country'}
          </h3>
          <button
            onClick={onClose}
            className="text-amber-700 hover:text-amber-900 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <p className="text-sm text-amber-800 mt-1">
          {proverbs.length} proverbs available
        </p>
      </div>

      <div className="max-h-80 overflow-y-auto p-4">
        {proverbs.length > 0 ? (
          <div className="space-y-4">
            {proverbs.map((proverb, index) => (
              <div key={index} className="space-y-2">
                {proverb.originalText && (
                  <p className="text-sm italic text-gray-600">
                    "{proverb.originalText}"
                  </p>
                )}
                <p className="text-gray-900">"{proverb.text}"</p>
                <p className="text-sm text-gray-700">{proverb.explanation}</p>
                {proverb.ethnicGroup && (
                  <p className="text-xs text-amber-600">
                    {proverb.ethnicGroup} tradition
                  </p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center py-4">
            No proverbs available for this country yet.
          </p>
        )}
      </div>
    </div>
  );
}