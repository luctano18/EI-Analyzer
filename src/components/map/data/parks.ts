export const parks = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [35.0000, -3.0000],
          [36.0000, -3.0000],
          [36.0000, -2.0000],
          [35.0000, -2.0000],
          [35.0000, -3.0000]
        ]]
      },
      properties: {
        name: 'Serengeti National Park',
        country: 'Tanzania',
        area: '14,750',
        established: '1951',
        description: 'Home to the great wildebeest migration'
      }
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [37.0000, -1.5000],
          [37.5000, -1.5000],
          [37.5000, -1.0000],
          [37.0000, -1.0000],
          [37.0000, -1.5000]
        ]]
      },
      properties: {
        name: 'Nairobi National Park',
        country: 'Kenya',
        area: '117',
        established: '1946',
        description: 'Urban wildlife sanctuary near Nairobi'
      }
    }
  ]
};