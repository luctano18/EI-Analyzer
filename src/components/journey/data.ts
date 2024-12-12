import { CountryInfo } from './types';

export const journeyData: CountryInfo[] = [
  {
    id: 'ethiopia',
    name: 'Ethiopia',
    region: 'East Africa',
    imageUrl: 'https://images.unsplash.com/photo-1523960264582-64fac49fe1e7',
    proverb: "When spider webs unite, they can tie up a lion",
    proverbOrigin: 'Ethiopian Proverb',
    proverbMeaning: 'This proverb teaches the power of unity and collaboration, showing how small contributions, when combined, can achieve remarkable results.',
    mustVisit: [
      'Lalibela Rock Churches',
      'Simien Mountains',
      'Danakil Depression'
    ],
    bestTime: 'October to May (Dry Season)',
    recommendedDuration: '10-14 days',
    culturalTips: [
      'Remove shoes before entering churches',
      'Use right hand for eating and greetings',
      'Dress modestly when visiting religious sites'
    ],
    guideUrl: 'https://www.ethiopia.travel',
    bookingUrl: 'https://www.getyourguide.com/ethiopia'
  },
  {
    id: 'kenya',
    name: 'Kenya',
    region: 'East Africa',
    imageUrl: 'https://images.unsplash.com/photo-1489392191049-fc10c97e64b6',
    proverb: "A man who uses force is afraid of reasoning",
    proverbOrigin: 'Kenyan Proverb',
    proverbMeaning: 'This wisdom emphasizes the importance of dialogue and understanding over confrontation, suggesting that those who resort to force often lack the ability to solve problems through discussion.',
    mustVisit: [
      'Masai Mara',
      'Amboseli National Park',
      'Lamu Old Town'
    ],
    bestTime: 'June to October (Dry Season)',
    recommendedDuration: '7-10 days',
    culturalTips: [
      'Greet elders with respect',
      'Ask permission before taking photos of people',
      'Learn basic Swahili greetings'
    ],
    guideUrl: 'https://magicalkenya.com',
    bookingUrl: 'https://www.getyourguide.com/kenya'
  },
  {
    id: 'senegal',
    name: 'Senegal',
    region: 'West Africa',
    imageUrl: 'https://images.unsplash.com/photo-1523805009345-7448845a9e53',
    proverb: "Knowledge is like a garden: if it is not cultivated, it cannot be harvested",
    proverbOrigin: 'Senegalese Proverb',
    proverbMeaning: 'This proverb emphasizes the importance of continuous learning and personal development, comparing knowledge to a garden that needs constant care to bear fruit.',
    mustVisit: [
      'Djoudj National Bird Sanctuary',
      'Pink Lake',
      'Goree Island'
    ],
    bestTime: 'November to February (Cool Season)',
    recommendedDuration: '7-10 days',
    culturalTips: [
      'Dress conservatively',
      'Learn basic French greetings',
      'Ask permission before entering religious sites'
    ],
    guideUrl: 'https://www.visitsenegal.com',
    bookingUrl: 'https://www.getyourguide.com/senegal'
  }
];