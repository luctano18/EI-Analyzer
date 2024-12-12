import React from 'react';
import { CategoryInfo } from '../types';

interface Props {
  category: CategoryInfo;
}

export default function CategoryCard({ category }: Props) {
  return (
    <div className="group relative overflow-hidden rounded-lg">
      <img
        src={category.image}
        alt={category.title}
        className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
        loading="lazy"
        onError={(e) => {
          const img = e.target as HTMLImageElement;
          img.src = 'https://images.unsplash.com/photo-1523960264582-64fac49fe1e7';
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/0 p-4 flex flex-col justify-end">
        <h3 className="text-xl font-bold text-white mb-2">{category.title}</h3>
        <p className="text-white/80 text-sm">{category.description}</p>
      </div>

      <div className="absolute inset-0 bg-black/90 p-4 flex flex-col justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <h4 className="text-white font-bold mb-2">Definition:</h4>
        <p className="text-white/90 text-sm mb-4">{category.definition}</p>
        <h4 className="text-white font-bold mb-2">Importance:</h4>
        <p className="text-white/90 text-sm">{category.importance}</p>
      </div>
    </div>
  );
}