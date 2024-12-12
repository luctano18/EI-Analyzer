import mapboxgl from 'mapbox-gl';

export function setupMapControls(map: mapboxgl.Map) {
  // Navigation controls
  map.addControl(
    new mapboxgl.NavigationControl({
      visualizePitch: true
    }),
    'top-left'
  );

  // Fullscreen control
  map.addControl(
    new mapboxgl.FullscreenControl(),
    'top-right'
  );

  // Scale control
  map.addControl(
    new mapboxgl.ScaleControl({
      maxWidth: 100,
      unit: 'metric'
    }),
    'bottom-left'
  );

  // Geolocation control
  map.addControl(
    new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true
      },
      trackUserLocation: true,
      showUserHeading: true
    }),
    'top-left'
  );
}