import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserPreferences {
  emailNotifications: boolean;
  language: string;
  fontSize: 'small' | 'medium' | 'large';
  colorScheme: string;
}

interface UserPreferencesState {
  preferences: UserPreferences;
  updatePreferences: (preferences: Partial<UserPreferences>) => void;
}

const defaultPreferences: UserPreferences = {
  emailNotifications: true,
  language: 'en',
  fontSize: 'medium',
  colorScheme: 'amber',
};

export const useUserPreferencesStore = create<UserPreferencesState>()(
  persist(
    (set) => ({
      preferences: defaultPreferences,
      updatePreferences: (newPreferences) =>
        set((state) => ({
          preferences: { ...state.preferences, ...newPreferences },
        })),
    }),
    {
      name: 'user-preferences-storage',
    }
  )
);