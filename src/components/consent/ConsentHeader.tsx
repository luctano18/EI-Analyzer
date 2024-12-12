import React from 'react';
import { Shield } from 'lucide-react';

export default function ConsentHeader() {
  return (
    <div className="flex items-center gap-3 mb-6">
      <div className="p-2 bg-amber-100 rounded-full">
        <Shield className="w-5 h-5 text-amber-600" />
      </div>
      <div>
        <h2 className="text-lg font-semibold text-gray-900">
          Consent to Anonymize and Share Data
        </h2>
        <p className="text-sm text-gray-600">
          For application improvement and research purposes
        </p>
      </div>
    </div>
  );
}