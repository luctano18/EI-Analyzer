import React from 'react';
import { Camera, Calendar } from 'lucide-react';
import { useThemeStore } from '../../../stores/themeStore';

export default function ProfileHeader() {
  const { theme } = useThemeStore();
  
  return (
    <div className={`p-6 rounded-lg ${
      theme === 'dark' ? 'bg-gray-800' : 'bg-white'
    } shadow-sm`}>
      <div className="flex items-start gap-6">
        {/* Profile Picture */}
        <div className="relative">
          <img
            src="https://via.placeholder.com/128"
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover"
          />
          <label className="absolute bottom-0 right-0 p-2 bg-amber-600 rounded-full cursor-pointer hover:bg-amber-700 transition-colors">
            <Camera className="w-4 h-4 text-white" />
            <input type="file" className="hidden" accept="image/*" />
          </label>
        </div>

        {/* Profile Info */}
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <div>
              <h1 className={`text-2xl font-bold ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                John Doe
              </h1>
              <p className="text-gray-500 dark:text-gray-400">
                Product Manager
              </p>
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
              <Calendar className="w-4 h-4" />
              <span>Last login: Today at 2:34 PM</span>
            </div>
          </div>

          <div className="mt-4 flex gap-4">
            <div className="text-sm">
              <span className="text-gray-500 dark:text-gray-400">Email:</span>
              <span className="ml-2 text-gray-900 dark:text-gray-100">john.doe@example.com</span>
            </div>
            <div className="text-sm">
              <span className="text-gray-500 dark:text-gray-400">Member since:</span>
              <span className="ml-2 text-gray-900 dark:text-gray-100">January 2024</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}