export const cities = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [3.3792, 6.5244]
      },
      properties: {
        name: 'Lagos',
        country: 'Nigeria',
        population: '14.8 million',
        isCapital: false
      }
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [32.5599, 15.5007]
      },
      properties: {
        name: 'Khartoum',
        country: 'Sudan',
        population: '5.2 million',
        isCapital: true
      }
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [30.0444, -1.9441]
      },
      properties: {
        name: 'Kigali',
        country: 'Rwanda',
        population: '1.2 million',
        isCapital: true
      }
    }
  ]
};