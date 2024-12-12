export const culturalSites = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [31.1320, -17.9271]
      },
      properties: {
        name: 'Great Zimbabwe',
        type: 'Archaeological Site',
        description: 'Ancient city ruins that were once the capital of the Kingdom of Zimbabwe',
        url: 'https://whc.unesco.org/en/list/364'
      }
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [32.5930, -14.4876]
      },
      properties: {
        name: 'Chongoni Rock Art',
        type: 'Rock Art',
        description: 'Collection of rock art that reflects the cultural traditions of the peoples of Malawi',
        url: 'https://whc.unesco.org/en/list/476'
      }
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [39.2583, -6.8163]
      },
      properties: {
        name: 'Stone Town',
        type: 'Historic City',
        description: 'Historic center of Zanzibar, showcasing Swahili coastal trading towns',
        url: 'https://whc.unesco.org/en/list/173'
      }
    }
  ]
};