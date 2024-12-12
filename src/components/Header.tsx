import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { User, BookOpen, LogOut, MessageSquare } from 'lucide-react';
import { supabase } from '../lib/supabase';
import HelpModal from './HelpModal';
import NavigationBanner from './navigation/NavigationBanner';

interface Props {
  user: any;
  onAuthClick: () => void;
  onViewChange: (view: 'home' | 'profile' | 'journey' | 'consulting') => void;
  currentView: 'home' | 'profile' | 'journey' | 'consulting';
}

export default function Header({ user, onAuthClick, onViewChange, currentView }: Props) {
  const { t } = useTranslation();
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
  
  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <header>
      {!user && <NavigationBanner onAuthClick={onAuthClick} />}
      <div className="bg-gradient-to-r from-amber-700 to-orange-600 text-white">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">

            <div className="flex items-center gap-4">
              <nav className="flex items-center gap-4">
                {user ? (
                  <>
                    <button
                      onClick={() => onViewChange('consulting')}
                      className={`flex items-center gap-1 hover:opacity-80 text-sm ${
                        currentView === 'consulting' ? 'border-b-2' : ''
                      }`}
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>{t('nav.consulting')}</span>
                    </button>
                    <button
                      onClick={() => onViewChange('journey')}
                      className={`flex items-center gap-1 hover:opacity-80 text-sm ${
                        currentView === 'journey' ? 'border-b-2' : ''
                      }`}
                    >
                      <BookOpen className="w-4 h-4" />
                      <span>{t('nav.journey')}</span>
                    </button>
                    <button
                      onClick={() => onViewChange('profile')}
                      className={`flex items-center gap-1 hover:opacity-80 text-sm ${
                        currentView === 'profile' ? 'border-b-2' : ''
                      }`}
                    >
                      <User className="w-4 h-4" />
                      <span>{t('nav.profile')}</span>
                    </button>
                    <button
                      onClick={handleSignOut}
                      className="flex items-center gap-1 hover:opacity-80 text-sm"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>{t('nav.signOut')}</span>
                    </button>
                  </>
                ) : null}
              </nav>
            </div>
          </div>
        </div>
      </div>

      <HelpModal
        isOpen={isHelpModalOpen}
        onClose={() => setIsHelpModalOpen(false)}
      />
    </header>
  );
}