import React from 'react';
import { ExternalLink } from 'lucide-react';

interface Partner {
  name: string;
  logo: string;
  description: string;
  website: string;
  category?: string;
}

const partners: Partner[] = [
  {
    name: "846s.org",
    logo: "https://app.epimap247inc.com/img/846s%20logo.png",
    description: "(Black, Indigenous, and people of color) BIPOC Mental Health.",
    website: "https://www.846s.org",
    category: "Community Partner"
  }
];

export default function PartnersList() {
  return (
    <section className="py-4 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-3">
          <h2 className="text-xl font-bold text-gray-900">Our Partner</h2>
          <p className="text-xs text-gray-600">
            Working together to bring emotional intelligence and cultural wisdom to communities
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          {partners.map((partner) => (
            <div
              key={partner.name}
              className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300"
            >
              <div className="p-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 flex-shrink-0">
                    <img
                      src={partner.logo}
                      alt={`${partner.name} logo`}
                      className="w-full h-full object-contain"
                      onError={(e) => {
                        const img = e.target as HTMLImageElement;
                        img.src = 'https://via.placeholder.com/150?text=Logo';
                      }}
                    />
                  </div>
                  
                  <div className="flex-grow min-w-0">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-semibold text-gray-900 truncate">
                          {partner.name}
                        </h3>
                        {partner.category && (
                          <span className="text-[10px] px-1.5 py-0.5 bg-amber-100 text-amber-800 rounded-full">
                            {partner.category}
                          </span>
                        )}
                      </div>
                      <a
                        href={partner.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-2 inline-flex items-center text-amber-600 hover:text-amber-700 transition-colors"
                      >
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                    <p className="text-xs text-gray-600 mt-0.5 line-clamp-2">
                      {partner.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-3 text-center">
          <p className="text-[10px] text-gray-500">
            Interested in partnering with us? {' '}
            <a 
              href="mailto:info@epimap247inc.com"
              className="text-amber-600 hover:text-amber-700 transition-colors"
            >
              Contact our partnership team
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}