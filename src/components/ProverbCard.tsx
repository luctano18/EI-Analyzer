import React from 'react';
import { Heart } from 'lucide-react';
import { Proverb } from '../types';

interface Props {
  proverb: Proverb;
  onFavorite: (id: string) => void;
  isFavorite: boolean;
}

export default function ProverbCard({ proverb, onFavorite, isFavorite }: Props) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 transition-transform hover:scale-[1.02]">
      <div className="flex justify-between items-start mb-4">
        <div>
          <span className="inline-block px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm font-medium">
            {proverb.category}
          </span>
          <span className="ml-2 text-sm text-gray-600">
            {proverb.ethnicGroup ? `${proverb.ethnicGroup}, ` : ''}{proverb.country}
          </span>
        </div>
        <button
          onClick={() => onFavorite(proverb.id)}
          className={`p-2 rounded-full transition-colors duration-200 ${
            isFavorite ? 'text-red-500 hover:text-red-600' : 'text-gray-400 hover:text-gray-500'
          }`}
        >
          <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
        </button>
      </div>

      {proverb.originalText && (
        <p className="text-gray-600 italic mb-2">"{proverb.originalText}"</p>
      )}

      <blockquote className="text-lg font-medium text-gray-900 mb-4">
        "{proverb.text}"
      </blockquote>

      <p className="text-gray-700 mb-4">{proverb.explanation}</p>

      <div className="space-y-4">
        <div>
          <h4 className="font-medium text-gray-900 mb-2">Reflective Actions:</h4>
          <ul className="list-disc list-inside space-y-1 text-gray-700">
            {proverb.actionableSteps.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ul>
        </div>

        {proverb.reflectionQuestion && (
          <div className="bg-amber-50 p-4 rounded-lg">
            <h4 className="font-medium text-amber-800 mb-1">For Reflection:</h4>
            <p className="text-amber-900">{proverb.reflectionQuestion}</p>
          </div>
        )}
      </div>
    </div>
  );
}