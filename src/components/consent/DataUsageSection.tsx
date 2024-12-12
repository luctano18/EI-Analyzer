import React from 'react';
import { Check, X } from 'lucide-react';

interface DataPoint {
  included: boolean;
  text: string;
}

const collectedData: DataPoint[] = [
  { included: true, text: "Emotional states and trends" },
  { included: true, text: "Interaction patterns with features" },
  { included: true, text: "Anonymous demographic information" },
  { included: false, text: "Personal identifiers (name, email)" },
  { included: false, text: "Private messages or entries" },
  { included: false, text: "Sensitive personal data" }
];

export default function DataUsageSection() {
  return (
    <div className="space-y-6 mb-8">
      <h3 className="text-lg font-medium text-gray-900">Data Collection & Usage</h3>
      
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="bg-amber-50 p-4 rounded-lg">
          <h4 className="font-medium text-amber-900 mb-3">We Collect:</h4>
          <ul className="space-y-2">
            {collectedData.filter(d => d.included).map((data, index) => (
              <li key={index} className="flex items-start gap-2 text-amber-800">
                <Check className="w-4 h-4 text-amber-600 mt-1 flex-shrink-0" />
                <span>{data.text}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-red-50 p-4 rounded-lg">
          <h4 className="font-medium text-red-900 mb-3">We Never Collect:</h4>
          <ul className="space-y-2">
            {collectedData.filter(d => !d.included).map((data, index) => (
              <li key={index} className="flex items-start gap-2 text-red-800">
                <X className="w-4 h-4 text-red-600 mt-1 flex-shrink-0" />
                <span>{data.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}