import React from 'react';
import { MapPin, Calendar, Clock, Info } from 'lucide-react';
import type { CountryInfo } from './types';

interface Props {
  country: CountryInfo;
  onSave: (id: string) => void;
  isSaved: boolean;
}

export default function CountryCard({ country, onSave, isSaved }: Props) {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="relative h-48">
        <img
          src={country.imageUrl}
          alt={`${country.name} landscape`}
          className="w-full h-full object-cover"
        />
        <button
          onClick={() => onSave(country.id)}
          className={`absolute top-4 right-4 p-2 rounded-full ${
            isSaved ? 'bg-amber-500 text-white' : 'bg-white text-amber-500'
          } shadow-md hover:scale-105 transition-transform`}
        >
          <svg
            className="w-5 h-5"
            fill={isSaved ? 'currentColor' : 'none'}
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
            />
          </svg>
        </button>
      </div>

      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-bold text-gray-900">{country.name}</h3>
          <span className="px-3 py-1 bg-amber-100 text-amber-800 text-sm rounded-full">
            {country.region}
          </span>
        </div>

        <blockquote className="border-l-4 border-amber-500 pl-4 mb-4 italic text-gray-700">
          "{country.proverb}"
          <p className="text-sm text-gray-600 mt-1 not-italic">
            - {country.proverbOrigin}
          </p>
        </blockquote>

        <p className="text-gray-600 mb-4">{country.proverbMeaning}</p>

        <div className="space-y-3 mb-6">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <MapPin className="w-4 h-4 text-amber-500" />
            <span>Must visit: {country.mustVisit.join(', ')}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Calendar className="w-4 h-4 text-amber-500" />
            <span>Best time: {country.bestTime}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Clock className="w-4 h-4 text-amber-500" />
            <span>Recommended stay: {country.recommendedDuration}</span>
          </div>
        </div>

        <div className="bg-amber-50 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Info className="w-4 h-4 text-amber-600" />
            <h4 className="font-medium text-amber-900">Cultural Tips</h4>
          </div>
          <ul className="list-disc list-inside text-sm text-amber-800 space-y-1">
            {country.culturalTips.map((tip, index) => (
              <li key={index}>{tip}</li>
            ))}
          </ul>
        </div>

        <div className="mt-6 flex gap-3">
          <button
            onClick={() => window.open(country.guideUrl, '_blank')}
            className="flex-1 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors text-sm font-medium"
          >
            Travel Guide
          </button>
          <button
            onClick={() => window.open(country.bookingUrl, '_blank')}
            className="flex-1 px-4 py-2 border border-amber-600 text-amber-600 rounded-lg hover:bg-amber-50 transition-colors text-sm font-medium"
          >
            Book Experiences
          </button>
        </div>
      </div>
    </div>
  );
}