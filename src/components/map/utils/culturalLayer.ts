import mapboxgl from 'mapbox-gl';
import { MapColors } from '../constants';
import { culturalSites, proverbs, tribalTerritories } from '../data';

export function addCulturalLayer(map: mapboxgl.Map) {
  // Add cultural heritage sites
  map.addSource('cultural-sites', {
    type: 'geojson',
    data: culturalSites
  });

  map.addLayer({
    id: 'cultural-sites',
    type: 'symbol',
    source: 'cultural-sites',
    layout: {
      'icon-image': 'monument',
      'icon-size': 1.5,
      'text-field': ['get', 'name'],
      'text-offset': [0, 1.5],
      'text-anchor': 'top',
      'text-size': 12
    },
    paint: {
      'text-color': MapColors.SECONDARY,
      'text-halo-color': '#ffffff',
      'text-halo-width': 1
    }
  });

  // Add proverbs layer
  map.addSource('proverbs', {
    type: 'geojson',
    data: proverbs
  });

  map.addLayer({
    id: 'proverbs',
    type: 'symbol',
    source: 'proverbs',
    layout: {
      'icon-image': 'book',
      'icon-size': 1.2,
      'text-field': ['get', 'title'],
      'text-offset': [0, 1.5],
      'text-anchor': 'top',
      'text-size': 11
    },
    paint: {
      'text-color': MapColors.PRIMARY,
      'text-halo-color': '#ffffff',
      'text-halo-width': 1
    }
  });

  // Add tribal territories
  map.addSource('tribal-territories', {
    type: 'geojson',
    data: tribalTerritories
  });

  map.addLayer({
    id: 'tribal-territories',
    type: 'fill',
    source: 'tribal-territories',
    layout: {
      visibility: 'none'
    },
    paint: {
      'fill-color': MapColors.ACCENT,
      'fill-opacity': 0.2,
      'fill-outline-color': MapColors.SECONDARY
    }
  });

  // Add click handlers for popups
  map.on('click', 'cultural-sites', (e) => {
    if (!e.features?.length) return;
    
    const coordinates = (e.features[0].geometry as any).coordinates.slice();
    const { name, description, type, url } = e.features[0].properties;

    new mapboxgl.Popup()
      .setLngLat(coordinates)
      .setHTML(`
        <h3 class="font-bold text-lg">${name}</h3>
        <p class="text-sm text-gray-600">${type}</p>
        <p class="mt-2">${description}</p>
        ${url ? `<a href="${url}" target="_blank" class="text-amber-600 hover:text-amber-700 text-sm mt-2 inline-block">Learn more →</a>` : ''}
      `)
      .addTo(map);
  });

  // Change cursor on hover
  map.on('mouseenter', 'cultural-sites', () => {
    map.getCanvas().style.cursor = 'pointer';
  });

  map.on('mouseleave', 'cultural-sites', () => {
    map.getCanvas().style.cursor = '';
  });
}