import React, { useState } from 'react';
import CategoryCard from './CategoryCard';
import AfricanWisdomMap from './map/AfricanWisdomMap';
import { categories } from '../data/categories';

export default function CategorySection() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
        Emotional Intelligence Categories
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.entries(categories).map(([key, category]) => (
          <div
            key={key}
            onClick={() => setSelectedCategory(key === selectedCategory ? null : key)}
            className="cursor-pointer"
          >
            <CategoryCard category={category} />
          </div>
        ))}
      </div>

      {selectedCategory === 'african-wisdom' && (
        <div className="mt-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Explore African Wisdom Traditions
          </h3>
          <p className="text-gray-600 mb-6">
            Click on highlighted countries to discover traditional proverbs and teachings
            from different African cultures.
          </p>
          <AfricanWisdomMap />
        </div>
      )}
    </section>
  );
}