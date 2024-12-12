import React from 'react';
import { Moon, Sun, Settings2 } from 'lucide-react';
import { useThemeStore } from '../../stores/themeStore';
import { useUserPreferencesStore } from '../../stores/userPreferencesStore';

export default function PreferencesForm() {
  const { theme, setTheme } = useThemeStore();
  const { preferences, updatePreferences } = useUserPreferencesStore();

  const fontSizes = [
    { value: 'small', label: 'Small' },
    { value: 'medium', label: 'Medium' },
    { value: 'large', label: 'Large' },
  ];

  const colorSchemes = [
    { value: 'amber', label: 'Amber' },
    { value: 'blue', label: 'Blue' },
    { value: 'green', label: 'Green' },
    { value: 'purple', label: 'Purple' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
          <Settings2 className="w-5 h-5 text-amber-600" />
          Appearance Settings
        </h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Theme
            </label>
            <div className="flex space-x-4">
              <button
                onClick={() => setTheme('light')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md ${
                  theme === 'light'
                    ? 'bg-amber-100 text-amber-800'
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                <Sun className="w-4 h-4" />
                <span>Light</span>
              </button>
              <button
                onClick={() => setTheme('dark')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md ${
                  theme === 'dark'
                    ? 'bg-amber-100 text-amber-800'
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                <Moon className="w-4 h-4" />
                <span>Dark</span>
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Font Size
            </label>
            <select
              value={preferences.fontSize}
              onChange={(e) => updatePreferences({ fontSize: e.target.value as any })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
            >
              {fontSizes.map((size) => (
                <option key={size.value} value={size.value}>
                  {size.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Color Scheme
            </label>
            <div className="grid grid-cols-2 gap-4">
              {colorSchemes.map((scheme) => (
                <button
                  key={scheme.value}
                  onClick={() => updatePreferences({ colorScheme: scheme.value })}
                  className={`px-4 py-2 rounded-md ${
                    preferences.colorScheme === scheme.value
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {scheme.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={preferences.emailNotifications}
                onChange={(e) =>
                  updatePreferences({ emailNotifications: e.target.checked })
                }
                className="rounded text-amber-600 focus:ring-amber-500"
              />
              <span className="text-sm text-gray-700">
                Receive email notifications
              </span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}