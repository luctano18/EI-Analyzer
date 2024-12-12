import React from 'react';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'fr' : 'en';
    i18n.changeLanguage(newLang);
  };

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center gap-1 px-2 py-1.5 text-xs font-medium bg-white/10 hover:bg-white/20 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-white/50"
      aria-label={i18n.language === 'en' ? 'Switch to French' : 'Switch to English'}
    >
      <Globe className="w-3 h-3" />
      <span>{i18n.language === 'en' ? 'FR' : 'EN'}</span>
    </button>
  );
}