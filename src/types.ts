export interface Proverb {
  id: string;
  text: string;
  country: string;
  category: EICategory;
  explanation: string;
  actionableSteps: string[];
  originalText?: string;
  ethnicGroup?: string;
  period?: string;
  reflectionQuestion?: string;
}

export type EICategory = 'self-awareness' | 'self-regulation' | 'empathy' | 'social-skills' | 'motivation' | 'african-wisdom';

export interface CategoryInfo {
  title: string;
  description: string;
  image: string;
  definition: string;
  importance: string;
}

export interface UserInput {
  challenge: string;
  emotions: string[];
}