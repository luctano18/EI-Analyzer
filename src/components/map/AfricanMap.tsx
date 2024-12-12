import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useThemeStore } from '../../stores/themeStore';
import { MapStyles, MapLayers } from './constants';
import { setupMapControls } from './utils/controls';
import { addCulturalLayer } from './utils/culturalLayer';
import { addGeographicLayer } from './utils/geographicLayer';
import { handleMapErrors } from './utils/errorHandling';

// Set Mapbox access token
mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

export default function AfricanMap() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const { theme } = useThemeStore();
  const [selectedStyle, setSelectedStyle] = useState(MapStyles.STREETS);

  useEffect(() => {
    if (!mapContainer.current) return;

    try {
      // Initialize map
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: selectedStyle,
        center: [17.5368, 0.0236], // Center on Africa
        zoom: 3.5,
        minZoom: 2,
        maxZoom: 18,
        pitch: 45,
        bearing: 0
      });

      // Add controls
      setupMapControls(map.current);

      // Add layers when map loads
      map.current.on('load', () => {
        addCulturalLayer(map.current!);
        addGeographicLayer(map.current!);
      });

      // Error handling
      map.current.on('error', (e) => handleMapErrors(e));

      // Cleanup
      return () => {
        map.current?.remove();
      };
    } catch (error) {
      console.error('Error initializing map:', error);
      handleMapErrors(error);
    }
  }, []);

  // Update map style when theme changes
  useEffect(() => {
    if (!map.current) return;
    const style = theme === 'dark' ? MapStyles.DARK : MapStyles.STREETS;
    map.current.setStyle(style);
    setSelectedStyle(style);
  }, [theme]);

  return (
    <div className="relative w-full h-[600px]">
      <div ref={mapContainer} className="absolute inset-0 rounded-lg overflow-hidden" />
      
      {/* Layer Controls */}
      <div className="absolute top-4 right-4 bg-white dark:bg-gray-800 p-2 rounded-lg shadow-lg z-10">
        <h3 className="text-sm font-medium mb-2 px-2">Map Layers</h3>
        {Object.values(MapLayers).map((layer) => (
          <label key={layer.id} className="flex items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
            <input
              type="checkbox"
              defaultChecked={layer.defaultVisible}
              onChange={(e) => {
                if (!map.current) return;
                const visibility = e.target.checked ? 'visible' : 'none';
                map.current.setLayoutProperty(layer.id, 'visibility', visibility);
              }}
              className="mr-2"
            />
            <span className="text-sm">{layer.name}</span>
          </label>
        ))}
      </div>

      {/* Attribution */}
      <div className="absolute bottom-2 right-2 text-xs text-gray-600 dark:text-gray-400">
        © Mapbox © OpenStreetMap contributors
      </div>
    </div>
  );
}