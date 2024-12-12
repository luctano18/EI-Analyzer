import { v4 as uuidv4 } from 'uuid';
import { Proverb, UserInput, EICategory } from '../types';

interface ProverbData {
  text: string;
  country: string;
  category: EICategory;
  explanation: string;
  originalText?: string;
  ethnicGroup?: string;
  period?: string;
  reflectionQuestion?: string;
}

const proverbDatabase: Record<string, ProverbData[]> = {
  anger: [
    {
      text: 'He who throws dirt loses ground.',
      originalText: 'Mtu atupaye udongo hupoteza ardhi',
      country: 'Tanzania',
      ethnicGroup: 'Swahili',
      category: 'self-regulation',
      explanation: 'This proverb warns against letting anger drive our actions, reminding us that hostile responses often harm ourselves more than others.',
      reflectionQuestion: 'How does your anger affect your ability to maintain relationships and achieve your goals?'
    },
    {
      text: 'The fire you kindle for your enemy often burns yourself more than them.',
      originalText: 'Moto unaowashia adui wako mara nyingi unakuchoma wewe zaidi kuliko yeye',
      country: 'Kenya',
      ethnicGroup: 'Kikuyu',
      category: 'self-awareness',
      explanation: 'This wisdom teaches us to consider the consequences of anger-driven actions and encourages finding more constructive ways to address conflicts.',
      reflectionQuestion: 'What price do you pay when you hold onto anger?'
    }
  ],
  fear: [
    {
      text: 'The eye of a child fears a painted devil.',
      originalText: 'Oju omo kekere beru bilisi ti a ko',
      country: 'Nigeria',
      ethnicGroup: 'Yoruba',
      category: 'self-awareness',
      explanation: 'This proverb teaches us that our fears often appear more threatening than they truly are. It encourages us to examine our anxieties with wisdom and perspective.',
      reflectionQuestion: 'How many of your fears are based on perception rather than reality?'
    },
    {
      text: 'The one who fears the sun will not become chief.',
      country: 'Ghana',
      ethnicGroup: 'Ashanti',
      category: 'motivation',
      explanation: 'This proverb encourages us to face our fears rather than let them limit our potential. Growth and success require stepping out of our comfort zone.',
      reflectionQuestion: 'What opportunities have you missed due to fear?'
    }
  ],
  embarrassment: [
    {
      text: 'A person who falls and gets up is stronger than one who has never fallen.',
      originalText: 'Mtu anayeanguka na kuinuka ni hodari kuliko yule ambaye hajaanguka',
      country: 'East Africa',
      category: 'self-regulation',
      explanation: 'This proverb reminds us that experiencing and overcoming embarrassment or failure makes us more resilient. These moments are opportunities for growth.',
      reflectionQuestion: 'How have past embarrassments made you stronger?'
    },
    {
      text: 'The monkey says: "The higher you climb, the more your behind is exposed."',
      country: 'Sierra Leone',
      category: 'self-awareness',
      explanation: 'This wisdom teaches us that vulnerability and exposure are natural parts of growth and achievement. Rather than fear embarrassment, we should accept it as part of our journey.',
      reflectionQuestion: 'How can you embrace vulnerability as a strength rather than a weakness?'
    }
  ],
  frustrated: [
    {
      text: 'When the shepherd comes home in peace, the milk is sweet.',
      country: 'Ethiopia',
      category: 'self-regulation',
      explanation: 'This proverb teaches us that maintaining inner peace, even in frustrating situations, leads to better outcomes. When we approach challenges with calmness, we often find more effective solutions.',
      reflectionQuestion: 'How does your state of mind affect the outcomes of your actions?'
    },
    {
      text: 'The axe forgets but the tree remembers.',
      country: 'Zimbabwe',
      category: 'empathy',
      explanation: 'This wisdom reminds us to consider the lasting impact of our actions when frustrated. It encourages us to respond thoughtfully rather than react impulsively.',
      reflectionQuestion: 'How might your reactions to frustration affect others in the long term?'
    }
  ],
  anxious: [
    {
      text: 'If you want to go fast, go alone. If you want to go far, go together.',
      country: 'African Proverb',
      category: 'social-skills',
      explanation: 'When anxiety overwhelms us, this proverb reminds us of the strength found in community and support systems. It encourages seeking help rather than facing challenges alone.',
      reflectionQuestion: 'Who can you reach out to when anxiety feels overwhelming?'
    }
  ]
};

const actionableSteps: Record<EICategory, string[]> = {
  'self-awareness': [
    'Take 5 minutes to journal about your current emotions',
    'Identify specific triggers that led to your current state',
    'Practice mindful breathing while reflecting on your feelings'
  ],
  'self-regulation': [
    'Count to ten before responding to challenging situations',
    'Create a list of healthy coping strategies',
    'Set aside time for daily emotional check-ins'
  ],
  'empathy': [
    'Consider the situation from others\' perspectives',
    'Practice active listening in your interactions',
    'Acknowledge and validate others\' feelings'
  ],
  'social-skills': [
    'Reach out to someone you trust for support',
    'Share your experiences with others who might understand',
    'Practice expressing your needs clearly and respectfully'
  ],
  'motivation': [
    'Break down your challenge into smaller, manageable steps',
    'Celebrate small progress and victories',
    'Create a vision board or written plan for your goals'
  ]
};

export function generateProverbs(input: UserInput): Proverb[] {
  const allRelevantProverbs: Proverb[] = [];
  
  // Get proverbs for each selected emotion
  input.emotions.forEach(emotion => {
    const emotionProverbs = proverbDatabase[emotion] || [];
    emotionProverbs.forEach(proverb => {
      allRelevantProverbs.push({
        id: uuidv4(),
        ...proverb,
        actionableSteps: actionableSteps[proverb.category]
      });
    });
  });

  // If no proverbs found for the specific emotions, provide general wisdom
  if (allRelevantProverbs.length === 0) {
    return [{
      id: uuidv4(),
      text: "The rain beats the leopard's skin, but it does not wash out the spots.",
      country: 'African Proverb',
      category: 'self-awareness',
      explanation: 'This proverb reminds us that challenging emotions are part of who we are. Instead of trying to eliminate them, we should learn to understand and manage them effectively.',
      actionableSteps: actionableSteps['self-awareness'],
      reflectionQuestion: 'How can you better accept and work with your emotions rather than against them?'
    }];
  }

  // Deduplicate proverbs and limit to a maximum of 3
  const uniqueProverbs = Array.from(new Set(allRelevantProverbs.map(p => p.text)))
    .map(text => allRelevantProverbs.find(p => p.text === text)!)
    .slice(0, 3);

  return uniqueProverbs;
}