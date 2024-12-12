export const tribalTerritories = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [3.0000, 6.0000],
          [4.0000, 6.0000],
          [4.0000, 7.0000],
          [3.0000, 7.0000],
          [3.0000, 6.0000]
        ]]
      },
      properties: {
        name: 'Yoruba Territory',
        people: 'Yoruba',
        population: 'Approximately 35 million',
        description: 'Traditional homeland of the Yoruba people'
      }
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [-2.0000, 7.0000],
          [-1.0000, 7.0000],
          [-1.0000, 8.0000],
          [-2.0000, 8.0000],
          [-2.0000, 7.0000]
        ]]
      },
      properties: {
        name: 'Ashanti Territory',
        people: 'Ashanti',
        population: 'Approximately 11 million',
        description: 'Traditional homeland of the Ashanti people'
      }
    }
  ]
};