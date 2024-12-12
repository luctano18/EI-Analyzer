export const proverbs = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [3.3792, 6.5244]
      },
      properties: {
        title: 'Yoruba Wisdom',
        text: 'The river that forgets its source will dry up',
        culture: 'Yoruba',
        category: 'self-awareness'
      }
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-1.0232, 7.9465]
      },
      properties: {
        title: 'Akan Wisdom',
        text: 'The one who sees the bottom of the river does not rush to cross',
        culture: 'Akan',
        category: 'self-regulation'
      }
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [39.2583, -6.8163]
      },
      properties: {
        title: 'Swahili Wisdom',
        text: 'The eye that has seen is different from the ear that has heard',
        culture: 'Swahili',
        category: 'empathy'
      }
    }
  ]
};