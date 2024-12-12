import mapboxgl from 'mapbox-gl';
import { MapColors } from '../constants';
import { cities, parks } from '../data';

export function addGeographicLayer(map: mapboxgl.Map) {
  // Add major cities
  map.addSource('major-cities', {
    type: 'geojson',
    data: cities
  });

  map.addLayer({
    id: 'major-cities',
    type: 'symbol',
    source: 'major-cities',
    layout: {
      'icon-image': 'city',
      'icon-size': 1.2,
      'text-field': ['get', 'name'],
      'text-offset': [0, 1.5],
      'text-anchor': 'top',
      'text-size': 12
    },
    paint: {
      'text-color': '#000000',
      'text-halo-color': '#ffffff',
      'text-halo-width': 1
    }
  });

  // Add national parks
  map.addSource('national-parks', {
    type: 'geojson',
    data: parks
  });

  map.addLayer({
    id: 'national-parks',
    type: 'fill',
    source: 'national-parks',
    paint: {
      'fill-color': '#2F855A',
      'fill-opacity': 0.2,
      'fill-outline-color': '#1F573D'
    }
  });

  map.addLayer({
    id: 'national-parks-label',
    type: 'symbol',
    source: 'national-parks',
    layout: {
      'text-field': ['get', 'name'],
      'text-size': 11,
      'text-justify': 'center',
      'text-anchor': 'center'
    },
    paint: {
      'text-color': '#1F573D',
      'text-halo-color': '#ffffff',
      'text-halo-width': 1
    }
  });

  // Add click handlers
  map.on('click', 'national-parks', (e) => {
    if (!e.features?.length) return;

    const { name, description, area, established } = e.features[0].properties;
    const coordinates = e.lngLat;

    new mapboxgl.Popup()
      .setLngLat(coordinates)
      .setHTML(`
        <h3 class="font-bold text-lg">${name}</h3>
        <p class="text-sm text-gray-600">Established: ${established}</p>
        <p class="text-sm text-gray-600">Area: ${area} km²</p>
        <p class="mt-2">${description}</p>
      `)
      .addTo(map);
  });

  // Change cursor on hover
  map.on('mouseenter', 'national-parks', () => {
    map.getCanvas().style.cursor = 'pointer';
  });

  map.on('mouseleave', 'national-parks', () => {
    map.getCanvas().style.cursor = '';
  });
}