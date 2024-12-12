interface Proverb {
  text: string;
  originalText?: string;
  explanation: string;
  country: string;
  ethnicGroup?: string;
}

export const proverbsByCountry: Record<string, Proverb[]> = {
  'NGA': [
    {
      text: "The river that forgets its source will dry up",
      originalText: "Odò tí ó gbàgbé orísun rẹ̀ yóò gbẹ",
      explanation: "This proverb teaches the importance of staying connected to one's roots and understanding one's true nature.",
      country: "Nigeria",
      ethnicGroup: "Yoruba"
    }
  ],
  'GHA': [
    {
      text: "The one who sees the bottom of the river does not rush to cross",
      originalText: "Nea ohunu asuogya no mmirika nntwa nsu no",
      explanation: "This wisdom emphasizes the value of self-knowledge and careful consideration before taking action.",
      country: "Ghana",
      ethnicGroup: "Akan"
    }
  ],
  'KEN': [
    {
      text: "The eye that has seen is different from the ear that has heard",
      originalText: "Jicho lililoona si sawa na sikio lililosikia",
      explanation: "This proverb emphasizes the importance of direct experience and understanding in developing true wisdom.",
      country: "Kenya",
      ethnicGroup: "Swahili"
    }
  ]
};