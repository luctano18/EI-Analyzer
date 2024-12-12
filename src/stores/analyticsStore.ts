import { create } from 'zustand';
import { supabase } from '../lib/supabase';

interface TrafficData {
  timestamp: string;
  visitors: number;
}

interface AnalyticsState {
  totalVisits: number;
  activeUsers: number;
  trafficData: TrafficData[];
  isLoading: boolean;
  error: string | null;
  fetchAnalytics: () => Promise<void>;
}

// Generate sample data for development
const generateSampleData = () => {
  const now = new Date();
  const data = [];
  for (let i = 60; i >= 0; i--) {
    const timestamp = new Date(now.getTime() - i * 60 * 1000);
    data.push({
      timestamp: timestamp.toISOString(),
      visitors: Math.floor(Math.random() * 50) + 20
    });
  }
  return data;
};

export const useAnalyticsStore = create<AnalyticsState>((set) => ({
  totalVisits: 0,
  activeUsers: 0,
  trafficData: [],
  isLoading: false,
  error: null,
  fetchAnalytics: async () => {
    set({ isLoading: true });
    try {
      // For development, return sample data
      // In production, this would fetch from Supabase
      const sampleData = generateSampleData();
      const totalVisits = Math.floor(Math.random() * 50000) + 10000;
      const activeUsers = Math.floor(Math.random() * 100) + 50;

      set({
        totalVisits,
        activeUsers,
        trafficData: sampleData,
        isLoading: false,
        error: null
      });
    } catch (error: any) {
      set({
        isLoading: false,
        error: error.message
      });
      console.error('Error fetching analytics:', error);
    }
  }
}));