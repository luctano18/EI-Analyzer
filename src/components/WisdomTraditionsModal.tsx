import React from 'react';
import { X, BookOpen, MapPin, Users, Globe } from 'lucide-react';
import AfricaMap from './map/AfricaMap';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const traditions = [
  {
    region: 'West Africa',
    traditions: [
      {
        culture: 'Yoruba',
        description: 'Emphasizes the concept of "Iwa-pele" (good character) and emotional balance through proverbs and oral traditions.',
        location: 'Nigeria, Benin, Togo'
      },
      {
        culture: 'Akan',
        description: 'Uses "Ananse" stories and proverbs to teach emotional intelligence and wisdom.',
        location: 'Ghana, Ivory Coast'
      }
    ]
  },
  {
    region: 'East Africa',
    traditions: [
      {
        culture: 'Maasai',
        description: 'Focuses on collective emotional strength and resilience through community wisdom.',
        location: 'Kenya, Tanzania'
      },
      {
        culture: 'Ethiopian',
        description: 'Rich tradition of wisdom literature emphasizing personal growth and emotional maturity.',
        location: 'Ethiopia'
      }
    ]
  },
  {
    region: 'Southern Africa',
    traditions: [
      {
        culture: 'Zulu',
        description: 'Teaches emotional wisdom through "Ubuntu" philosophy of interconnectedness.',
        location: 'South Africa'
      },
      {
        culture: 'Shona',
        description: 'Uses traditional storytelling to convey emotional intelligence concepts.',
        location: 'Zimbabwe'
      }
    ]
  }
];

export default function WisdomTraditionsModal({ isOpen, onClose }: Props) {
  const [selectedCountry, setSelectedCountry] = React.useState<any>(null);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden animate-fadeIn">
        <div className="flex justify-between items-center p-6 bg-gradient-to-r from-amber-600 to-orange-600">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/10 rounded-full">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-xl font-bold text-white">
              African Wisdom Traditions
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-6 rounded-lg mb-8">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-white rounded-full shadow-sm">
                <Globe className="w-6 h-6 text-amber-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-amber-900 mb-2">
                  Discover Ancient Wisdom for Modern Life
                </h3>
                <p className="text-amber-800">
                  For centuries, African cultures have cultivated deep insights into emotional 
                  intelligence through proverbs, stories, and communal practices. These traditions 
                  offer timeless guidance for navigating life's challenges, fostering resilience, 
                  and building meaningful connections.
                </p>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Explore Wisdom Traditions by Region
            </h3>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <AfricaMap onCountrySelect={(country, data) => setSelectedCountry(data)} />
              {selectedCountry && (
                <div className="mt-4 p-4 bg-amber-50 rounded-lg">
                  <h4 className="font-medium text-amber-900 mb-2">{selectedCountry.name}</h4>
                  <p className="text-sm text-amber-800">{selectedCountry.description}</p>
                  <div className="mt-2">
                    <h5 className="text-xs font-medium text-amber-900 mb-1">Key Traditions:</h5>
                    <div className="flex flex-wrap gap-2">
                      {selectedCountry.categories.map((category: string) => (
                        <span 
                          key={category}
                          className="px-2 py-1 bg-white text-amber-600 rounded-full text-xs"
                        >
                          {category}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-8">
            {traditions.map((region) => (
              <div key={region.region} className="bg-amber-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-amber-900 mb-4">
                  {region.region}
                </h3>
                <div className="grid gap-6 md:grid-cols-2">
                  {region.traditions.map((tradition) => (
                    <div 
                      key={tradition.culture}
                      className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                    >
                      <h4 className="font-semibold text-gray-900 mb-2">
                        {tradition.culture} Tradition
                      </h4>
                      <p className="text-gray-600 text-sm mb-3">
                        {tradition.description}
                      </p>
                      <div className="flex items-center text-sm text-amber-600">
                        <MapPin className="w-4 h-4 mr-1" />
                        <span>{tradition.location}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-amber-100 rounded-full">
                <Users className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <h4 className="font-medium text-amber-900 mb-1">
                  Living Traditions
                </h4>
                <p className="text-sm text-amber-800">
                  These wisdom traditions continue to evolve and adapt, offering timeless 
                  insights for modern emotional challenges while preserving their cultural essence.
                  Each tradition represents a unique approach to understanding and managing emotions, 
                  relationships, and personal growth.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 border-t bg-gray-50">
          <button
            onClick={onClose}
            className="w-full py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}