import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import { proverbs } from '../../data/proverbs';

const containerStyle = {
  width: '100%',
  height: '600px'
};

const center = {
  lat: 2.4604,  // Centered on Africa
  lng: 21.7357
};

const mapOptions = {
  mapTypeControl: true,
  streetViewControl: false,
  styles: [
    {
      featureType: 'administrative',
      elementType: 'geometry',
      stylers: [{ visibility: 'on' }]
    },
    {
      featureType: 'poi',
      stylers: [{ visibility: 'off' }]
    }
  ]
};

interface CountryProverbs {
  country: string;
  position: google.maps.LatLngLiteral;
  proverbs: Array<{
    text: string;
    originalText?: string;
    ethnicGroup?: string;
    category: string;
  }>;
}

// Map of country names to their coordinates
const countryCoordinates: Record<string, google.maps.LatLngLiteral> = {
  'Nigeria': { lat: 9.0820, lng: 8.6753 },
  'Ghana': { lat: 7.9465, lng: -1.0232 },
  'Kenya': { lat: -0.0236, lng: 37.9062 },
  'Tanzania': { lat: -6.3690, lng: 34.8888 },
  'Ethiopia': { lat: 9.1450, lng: 40.4897 },
  'South Africa': { lat: -30.5595, lng: 22.9375 },
  'Zimbabwe': { lat: -19.0154, lng: 29.1549 },
  'Sierra Leone': { lat: 8.4606, lng: -11.7799 },
  'East Africa': { lat: -3.0674, lng: 37.3556 },
};

export default function ProverbsMap() {
  const [selectedCountry, setSelectedCountry] = useState<CountryProverbs | null>(null);

  // Group proverbs by country
  const countryProverbs: CountryProverbs[] = Object.values(proverbs)
    .flat()
    .reduce((acc: CountryProverbs[], proverb) => {
      const country = proverb.country;
      if (!countryCoordinates[country]) return acc;

      const existing = acc.find(cp => cp.country === country);
      if (existing) {
        existing.proverbs.push(proverb);
      } else {
        acc.push({
          country,
          position: countryCoordinates[country],
          proverbs: [proverb]
        });
      }
      return acc;
    }, []);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Explore African Proverbs by Region
      </h2>
      
      <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={4}
          options={mapOptions}
        >
          {countryProverbs.map((cp) => (
            <Marker
              key={cp.country}
              position={cp.position}
              onClick={() => setSelectedCountry(cp)}
              icon={{
                path: google.maps.SymbolPath.CIRCLE,
                scale: 8,
                fillColor: '#d97706',
                fillOpacity: 1,
                strokeColor: '#ffffff',
                strokeWeight: 2,
              }}
            />
          ))}

          {selectedCountry && (
            <InfoWindow
              position={selectedCountry.position}
              onCloseClick={() => setSelectedCountry(null)}
            >
              <div className="max-w-sm">
                <h3 className="font-bold text-lg mb-2">{selectedCountry.country}</h3>
                <div className="space-y-4">
                  {selectedCountry.proverbs.map((proverb, index) => (
                    <div key={index} className="border-b pb-2 last:border-b-0">
                      {proverb.originalText && (
                        <p className="text-sm text-gray-600 italic mb-1">
                          "{proverb.originalText}"
                        </p>
                      )}
                      <p className="text-gray-800">"{proverb.text}"</p>
                      <div className="mt-1 flex gap-2">
                        {proverb.ethnicGroup && (
                          <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                            {proverb.ethnicGroup}
                          </span>
                        )}
                        <span className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded">
                          {proverb.category}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </LoadScript>
    </div>
  );
}