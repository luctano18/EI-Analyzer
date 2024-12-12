import { Proverb } from '../types';

interface ProverbData extends Proverb {
  originalText?: string;
  period?: string;
  ethnicGroup?: string;
  reflectionQuestion: string;
}

export const proverbs: Record<string, ProverbData[]> = {
  'self-awareness': [
    {
      id: 'yoruba-mirror',
      text: 'The river that forgets its source will dry up',
      originalText: 'Odò tí ó gbàgbé orísun rẹ̀ yóò gbẹ',
      country: 'Nigeria',
      ethnicGroup: 'Yoruba',
      period: '~16th century',
      category: 'self-awareness',
      explanation: 'This proverb teaches the importance of staying connected to one\'s roots and understanding one\'s true nature. Just as a river must acknowledge its source to keep flowing, we must maintain awareness of our core values and emotional foundations.',
      actionableSteps: [
        'Take time each day to reflect on your emotional state and its origins',
        'Journal about patterns in your emotional responses',
        'Practice mindful breathing while examining your feelings'
      ],
      reflectionQuestion: 'What core values or beliefs serve as your emotional source?'
    },
    {
      id: 'akan-wisdom',
      text: 'The one who sees the bottom of the river does not rush to cross',
      originalText: 'Nea ohunu asuogya no mmirika nntwa nsu no',
      country: 'Ghana',
      ethnicGroup: 'Akan',
      period: 'Traditional',
      category: 'self-awareness',
      explanation: 'This wisdom emphasizes the value of self-knowledge and careful consideration before taking action. Understanding our emotional depths allows for better decision-making.',
      actionableSteps: [
        'Before reacting, pause to understand your emotional triggers',
        'Consider the deeper reasons behind your immediate feelings',
        'Seek feedback from trusted friends about your emotional patterns'
      ],
      reflectionQuestion: 'What emotions lie beneath your immediate reactions?'
    }
  ],
  'self-regulation': [
    {
      id: 'zulu-patience',
      text: 'The one who hits the drum does not know how far the sound carries',
      originalText: 'Obhula isigubhu akazi ukuthi umsindo uyofinyelela kuphi',
      country: 'South Africa',
      ethnicGroup: 'Zulu',
      period: '~19th century',
      category: 'self-regulation',
      explanation: 'This proverb teaches about the far-reaching impact of our emotional expressions and the importance of measured responses.',
      actionableSteps: [
        'Practice the pause: count to ten before responding when emotional',
        'Consider the ripple effects of your emotional expressions',
        'Develop personal calming rituals for intense emotions'
      ],
      reflectionQuestion: 'How do your emotional expressions affect others around you?'
    }
  ],
  'empathy': [
    {
      id: 'swahili-understanding',
      text: 'The eye that has seen is different from the ear that has heard',
      originalText: 'Jicho lililoona si sawa na sikio lililosikia',
      country: 'Tanzania',
      ethnicGroup: 'Swahili',
      period: 'Traditional',
      category: 'empathy',
      explanation: 'This proverb emphasizes the importance of direct experience and understanding in developing true empathy, rather than just hearing about others\' experiences.',
      actionableSteps: [
        'Practice active listening without immediately offering solutions',
        'Put yourself in others\' situations before judging',
        'Share your own vulnerable experiences to deepen connections'
      ],
      reflectionQuestion: 'How often do you truly try to see through others\' eyes?'
    }
  ]
};

export function getProverbsByCategory(category: string): ProverbData[] {
  return proverbs[category] || [];
}

export function getRandomProverb(): ProverbData {
  const categories = Object.keys(proverbs);
  const randomCategory = categories[Math.floor(Math.random() * categories.length)];
  const categoryProverbs = proverbs[randomCategory];
  return categoryProverbs[Math.floor(Math.random() * categoryProverbs.length)];
}