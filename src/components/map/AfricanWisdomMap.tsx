import React, { useState } from 'react';
import { MapContainer, TileLayer, GeoJSON, Tooltip } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Feature } from 'geojson';
import africanCountries from './data/african-countries.json';
import { proverbsByCountry } from './data/proverbs-data';
import CountryPopup from './CountryPopup';

export default function AfricanWisdomMap() {
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);

  const getCountryStyle = (feature: Feature) => {
    const countryCode = feature.properties?.['ISO_A3'];
    const hasProverbs = proverbsByCountry[countryCode]?.length > 0;

    return {
      fillColor: hasProverbs ? '#D97706' : '#E5E7EB',
      weight: 1,
      opacity: 1,
      color: 'white',
      fillOpacity: 0.7
    };
  };

  const onEachCountry = (feature: Feature, layer: any) => {
    const countryCode = feature.properties?.['ISO_A3'];
    const countryName = feature.properties?.['ADMIN'];
    const proverbs = proverbsByCountry[countryCode] || [];

    layer.on({
      mouseover: () => {
        layer.setStyle({
          fillOpacity: 0.9,
          weight: 2
        });
      },
      mouseout: () => {
        layer.setStyle({
          fillOpacity: 0.7,
          weight: 1
        });
      },
      click: () => {
        setSelectedCountry(countryCode);
      }
    });

    layer.bindTooltip(
      `${countryName}${proverbs.length ? ` (${proverbs.length} proverbs)` : ''}`,
      { sticky: true }
    );
  };

  return (
    <div className="relative w-full h-[600px] bg-white rounded-lg shadow-lg overflow-hidden">
      <MapContainer
        center={[0, 20]}
        zoom={3}
        style={{ height: '100%', width: '100%' }}
        minZoom={2}
        maxZoom={8}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />
        <GeoJSON
          data={africanCountries as any}
          style={getCountryStyle}
          onEachFeature={onEachCountry}
        />
      </MapContainer>

      {selectedCountry && (
        <CountryPopup
          countryCode={selectedCountry}
          onClose={() => setSelectedCountry(null)}
        />
      )}

      <div className="absolute bottom-4 left-4 bg-white p-3 rounded-lg shadow-md z-[1000]">
        <h4 className="text-sm font-medium text-gray-900 mb-2">Legend</h4>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-amber-600 rounded-sm"></div>
          <span className="text-xs text-gray-700">Countries with proverbs</span>
        </div>
      </div>
    </div>
  );
}