import React, { useState } from 'react';
import {
  Home,
  Settings,
  User,
  Bell,
  Shield,
  Globe,
  ChevronDown,
  ChevronRight,
  LogOut
} from 'lucide-react';
import { useThemeStore } from '../../../stores/themeStore';

interface NavGroup {
  title: string;
  items: {
    icon: React.ElementType;
    label: string;
    href?: string;
    onClick?: () => void;
  }[];
}

export default function ProfileSidebar() {
  const { theme } = useThemeStore();
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set(['general']));

  const navGroups: NavGroup[] = [
    {
      title: 'General',
      items: [
        { icon: Home, label: 'Overview', href: '/profile' },
        { icon: Settings, label: 'Preferences', href: '/profile/preferences' },
        { icon: User, label: 'Personal Info', href: '/profile/personal' }
      ]
    },
    {
      title: 'Settings',
      items: [
        { icon: Bell, label: 'Notifications', href: '/profile/notifications' },
        { icon: Shield, label: 'Privacy & Security', href: '/profile/security' },
        { icon: Globe, label: 'Language & Region', href: '/profile/language' }
      ]
    }
  ];

  const toggleGroup = (title: string) => {
    setExpandedGroups(prev => {
      const next = new Set(prev);
      if (next.has(title)) {
        next.delete(title);
      } else {
        next.add(title);
      }
      return next;
    });
  };

  return (
    <aside className={`w-64 min-h-screen border-r ${
      theme === 'dark' 
        ? 'bg-gray-800 border-gray-700' 
        : 'bg-white border-gray-200'
    }`}>
      <nav className="p-4 space-y-6">
        {navGroups.map((group) => (
          <div key={group.title}>
            <button
              onClick={() => toggleGroup(group.title)}
              className="flex items-center justify-between w-full px-2 py-1 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400"
            >
              <span>{group.title}</span>
              {expandedGroups.has(group.title) ? (
                <ChevronDown className="w-4 h-4" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              )}
            </button>

            {expandedGroups.has(group.title) && (
              <div className="mt-2 space-y-1">
                {group.items.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={item.onClick}
                    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-amber-50 dark:hover:bg-amber-900/20 rounded-lg transition-colors"
                  >
                    <item.icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </a>
                ))}
              </div>
            )}
          </div>
        ))}

        <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={() => {/* Handle logout */}}
            className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors w-full"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </nav>
    </aside>
  );
}