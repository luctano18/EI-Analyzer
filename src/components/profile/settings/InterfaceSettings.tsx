import React from 'react';
import { Monitor, Moon, Sun } from 'lucide-react';
import { useThemeStore } from '../../../stores/themeStore';

export default function InterfaceSettings() {
  const { theme, setTheme } = useThemeStore();

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
          Interface Settings
        </h3>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Customize how the application looks and feels
        </p>
      </div>

      <div className="space-y-4">
        {/* Theme Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Theme
          </label>
          <div className="grid grid-cols-3 gap-3">
            <button
              onClick={() => setTheme('light')}
              className={`flex items-center justify-center gap-2 p-3 rounded-lg border ${
                theme === 'light'
                  ? 'border-amber-600 bg-amber-50 dark:bg-amber-900/20'
                  : 'border-gray-300 dark:border-gray-700'
              }`}
            >
              <Sun className="w-4 h-4" />
              <span>Light</span>
            </button>
            <button
              onClick={() => setTheme('dark')}
              className={`flex items-center justify-center gap-2 p-3 rounded-lg border ${
                theme === 'dark'
                  ? 'border-amber-600 bg-amber-50 dark:bg-amber-900/20'
                  : 'border-gray-300 dark:border-gray-700'
              }`}
            >
              <Moon className="w-4 h-4" />
              <span>Dark</span>
            </button>
            <button
              onClick={() => setTheme('system')}
              className={`flex items-center justify-center gap-2 p-3 rounded-lg border ${
                theme === 'system'
                  ? 'border-amber-600 bg-amber-50 dark:bg-amber-900/20'
                  : 'border-gray-300 dark:border-gray-700'
              }`}
            >
              <Monitor className="w-4 h-4" />
              <span>System</span>
            </button>
          </div>
        </div>

        {/* Display Density */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Display Density
          </label>
          <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent">
            <option value="comfortable">Comfortable</option>
            <option value="compact">Compact</option>
            <option value="relaxed">Relaxed</option>
          </select>
        </div>

        {/* Font Size */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Font Size
          </label>
          <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent">
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
          </select>
        </div>
      </div>
    </div>
  );
}