import React from 'react';
import { Search } from 'lucide-react';
import ProfileSidebar from './ProfileSidebar';
import ProfileHeader from './ProfileHeader';
import { useThemeStore } from '../../../stores/themeStore';

interface ProfileLayoutProps {
  children: React.ReactNode;
}

export default function ProfileLayout({ children }: ProfileLayoutProps) {
  const { theme } = useThemeStore();

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="flex">
        {/* Sidebar */}
        <ProfileSidebar />

        {/* Main Content */}
        <div className="flex-1 min-w-0">
          <div className="max-w-4xl mx-auto px-4 py-6">
            {/* Quick Search */}
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Quick search settings..."
                  className="w-full pl-10 pr-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Profile Header */}
            <ProfileHeader />

            {/* Main Content */}
            <main className="mt-6">
              {children}
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}