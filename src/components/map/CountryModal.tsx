import React from 'react';
import { X } from 'lucide-react';
import { categories } from '../../data/categories';
import type { EICategory } from '../../types';

interface CountryData {
  name: string;
  categories: EICategory[];
  description: string;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  country: CountryData | null;
}

export default function CountryModal({ isOpen, onClose, country }: Props) {
  if (!isOpen || !country) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-white rounded-lg w-full max-w-lg animate-fadeIn">
        <div className="flex justify-between items-start p-6 border-b">
          <div>
            <h2 className="text-xl font-bold text-gray-900">{country.name}</h2>
            <p className="text-sm text-gray-600 mt-1">{country.description}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Emotional Intelligence Categories
          </h3>
          <div className="grid gap-4">
            {country.categories.map((categoryKey) => {
              const category = categories[categoryKey];
              return (
                <div 
                  key={categoryKey}
                  className="bg-amber-50 p-4 rounded-lg"
                >
                  <h4 className="font-medium text-amber-900 mb-2">
                    {category.title}
                  </h4>
                  <p className="text-sm text-amber-800">
                    {category.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-gray-50 px-6 py-4 rounded-b-lg">
          <p className="text-sm text-gray-600">
            Click on other highlighted countries to explore more African wisdom traditions.
          </p>
        </div>
      </div>
    </div>
  );
}