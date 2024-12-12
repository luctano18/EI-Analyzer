import React from 'react';
import { useTranslation } from 'react-i18next';
import { LogIn } from 'lucide-react';

interface Props {
  onClick: () => void;
}

export default function AuthButton({ onClick }: Props) {
  const { t } = useTranslation();

  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors text-sm font-medium"
    >
      <LogIn className="w-4 h-4" />
      <span>{t('nav.signIn')}</span>
    </button>
  );
}