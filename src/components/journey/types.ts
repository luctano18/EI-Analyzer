export interface CountryInfo {
  id: string;
  name: string;
  region: string;
  imageUrl: string;
  proverb: string;
  proverbOrigin: string;
  proverbMeaning: string;
  mustVisit: string[];
  bestTime: string;
  recommendedDuration: string;
  culturalTips: string[];
  guideUrl: string;
  bookingUrl: string;
}

export interface JourneyFilters {
  region: string | null;
  searchTerm: string;
}