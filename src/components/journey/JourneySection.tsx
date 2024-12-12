import React, { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import CountryCard from './CountryCard';
import { CountryInfo, JourneyFilters } from './types';
import { journeyData } from './data';

export default function JourneySection() {
  const [filters, setFilters] = useState<JourneyFilters>({
    region: null,
    searchTerm: ''
  });
  const [savedCountries, setSavedCountries] = useState<Set<string>>(new Set());

  const regions = Array.from(
    new Set(journeyData.map(country => country.region))
  );

  const filteredCountries = journeyData.filter(country => {
    const matchesRegion = !filters.region || country.region === filters.region;
    const matchesSearch = !filters.searchTerm || 
      country.name.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
      country.proverb.toLowerCase().includes(filters.searchTerm.toLowerCase());
    return matchesRegion && matchesSearch;
  });

  const handleSave = (countryId: string) => {
    setSavedCountries(prev => {
      const newSet = new Set(prev);
      if (newSet.has(countryId)) {
        newSet.delete(countryId);
      } else {
        newSet.add(countryId);
      }
      return newSet;
    });
  };

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Continue Your Journey
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore African wisdom through traditional proverbs and immerse yourself
            in the rich cultural heritage of each destination.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-6 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search countries or proverbs..."
              value={filters.searchTerm}
              onChange={(e) => setFilters(prev => ({ ...prev, searchTerm: e.target.value }))}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            />
          </div>

          <div className="flex items-center gap-4">
            <Filter className="w-5 h-5 text-gray-400" />
            <select
              value={filters.region || ''}
              onChange={(e) => setFilters(prev => ({ 
                ...prev, 
                region: e.target.value || null 
              }))}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            >
              <option value="">All Regions</option>
              {regions.map(region => (
                <option key={region} value={region}>{region}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCountries.map(country => (
            <CountryCard
              key={country.id}
              country={country}
              onSave={handleSave}
              isSaved={savedCountries.has(country.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}