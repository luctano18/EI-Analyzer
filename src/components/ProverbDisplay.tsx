import React from 'react';
import { Quote } from 'lucide-react';

interface ProverbDisplayProps {
  originalText?: string;
  translation: string;
  origin: string;
  ethnicGroup?: string;
  period?: string;
  explanation: string;
  actionableSteps: string[];
  reflectionQuestion: string;
}

export default function ProverbDisplay({
  originalText,
  translation,
  origin,
  ethnicGroup,
  period,
  explanation,
  actionableSteps,
  reflectionQuestion
}: ProverbDisplayProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl mx-auto">
      <div className="flex items-start space-x-4">
        <div className="bg-amber-100 p-3 rounded-full">
          <Quote className="w-6 h-6 text-amber-600" />
        </div>
        <div className="flex-1">
          {originalText && (
            <p className="text-lg font-medium text-gray-600 italic mb-2">
              "{originalText}"
            </p>
          )}
          <p className="text-xl font-bold text-gray-900 mb-4">
            "{translation}"
          </p>
          <div className="text-sm text-gray-600 mb-6">
            <span>Origin: {origin}</span>
            {ethnicGroup && <span> • {ethnicGroup}</span>}
            {period && <span> • {period}</span>}
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="font-semibold text-gray-900 mb-2">Wisdom Teaching</h3>
          <p className="text-gray-700">{explanation}</p>
        </div>

        <div>
          <h3 className="font-semibold text-gray-900 mb-2">Practical Application</h3>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            {actionableSteps.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ul>
        </div>

        <div className="bg-amber-50 p-4 rounded-lg">
          <h3 className="font-semibold text-amber-800 mb-2">For Reflection</h3>
          <p className="text-amber-900">{reflectionQuestion}</p>
        </div>
      </div>
    </div>
  );
}