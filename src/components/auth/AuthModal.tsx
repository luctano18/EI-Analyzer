import React, { useRef, useCallback } from 'react';
import { X } from 'lucide-react';
import SignInForm from './SignInForm';
import SignUpForm2 from './SignUpForm2';
import ForgotPassword from './ForgotPassword';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export type View = 'login' | 'register' | 'forgot-password';

export default function AuthModal({ isOpen, onClose }: Props) {
  const [view, setView] = React.useState<View>('login');
  const modalRef = useRef<HTMLDivElement>(null);

  const handleOverlayClick = useCallback((e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-sm"
      onClick={handleOverlayClick}
    >
      <div 
        ref={modalRef}
        className="bg-white rounded-lg w-full max-w-[400px] max-h-[90vh] overflow-hidden animate-fadeIn"
      >
        <div className="flex justify-between items-center p-4 bg-gradient-to-r from-amber-600 to-orange-600">
          <div>
            <h2 className="text-lg font-bold text-white">
              {view === 'login' ? 'Welcome Back' : 
               view === 'register' ? 'Create Your Account' : 
               'Reset Password'}
            </h2>
            <p className="text-white/80 text-xs">
              {view === 'login' ? 'Sign in to continue your journey' :
               view === 'register' ? 'Join our community of emotional intelligence seekers' :
               'We\'ll send you a reset link'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 overflow-y-auto max-h-[calc(90vh-76px)]">
          {view === 'login' && (
            <SignInForm onViewChange={setView} onClose={onClose} />
          )}
          {view === 'register' && (
            <SignUpForm2 onClose={onClose} />
          )}
          {view === 'forgot-password' && (
            <ForgotPassword onBack={() => setView('login')} />
          )}
        </div>
      </div>
    </div>
  );
}