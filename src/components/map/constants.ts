export const MapStyles = {
  STREETS: 'mapbox://styles/mapbox/streets-v12',
  SATELLITE: 'mapbox://styles/mapbox/satellite-v9',
  LIGHT: 'mapbox://styles/mapbox/light-v11',
  DARK: 'mapbox://styles/mapbox/dark-v11',
  TERRAIN: 'mapbox://styles/mapbox/outdoors-v12'
} as const;

export const MapLayers = {
  CULTURAL_SITES: {
    id: 'cultural-sites',
    name: 'Cultural Heritage Sites',
    defaultVisible: true
  },
  PROVERBS: {
    id: 'proverbs',
    name: 'Traditional Proverbs',
    defaultVisible: true
  },
  TRIBES: {
    id: 'tribal-territories',
    name: 'Tribal Territories',
    defaultVisible: false
  },
  PARKS: {
    id: 'national-parks',
    name: 'National Parks',
    defaultVisible: true
  },
  CITIES: {
    id: 'major-cities',
    name: 'Major Cities',
    defaultVisible: true
  }
} as const;

export const MapColors = {
  PRIMARY: '#D97706', // amber-600
  SECONDARY: '#92400E', // amber-800
  ACCENT: '#F59E0B', // amber-500
  BACKGROUND: '#FEF3C7' // amber-100
} as const;