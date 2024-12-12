import React from 'react';
import LanguageSwitcher from '../LanguageSwitcher';
import BannerTitle from './BannerTitle';
import AuthButton from './AuthButton';

interface Props {
  onAuthClick: () => void;
}

export default function NavigationBanner({ onAuthClick }: Props) {
  return (
    <div className="bg-gradient-to-r from-amber-700 to-orange-600">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <BannerTitle />
          <div className="flex items-center gap-3">
            <LanguageSwitcher />
            <AuthButton onClick={onAuthClick} />
          </div>
        </div>
      </div>
    </div>
  );
}