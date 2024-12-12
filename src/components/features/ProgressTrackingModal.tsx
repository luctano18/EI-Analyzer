import React, { useEffect, useRef } from 'react';
import { BookOpen, Medal, Laptop, Users, Gift, X } from 'lucide-react';
import { useThemeStore } from '../../stores/themeStore';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSignUp: () => void;
}

export default function ProgressTrackingModal({ isOpen, onClose, onSignUp }: Props) {
  const modalRef = useRef<HTMLDivElement>(null);
  const initialFocusRef = useRef<HTMLButtonElement>(null);
  const { theme } = useThemeStore();

  useEffect(() => {
    if (isOpen) {
      initialFocusRef.current?.focus();
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onClose()}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div 
        ref={modalRef}
        className={`bg-white dark:bg-gray-800 rounded-xl w-full max-w-lg animate-fadeIn shadow-2xl`}
        role="document"
      >
        <div className="p-6 bg-gradient-to-r from-amber-600 to-orange-600">
          <div className="flex justify-between items-center text-white mb-4">
            <div className="flex items-center gap-2">
              <BookOpen className="w-6 h-6" />
              <h2 id="modal-title" className="text-xl font-bold">Track Your Learning Journey! 📚✨</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-full transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <p className="text-white/90">
            Never lose your progress again. Join thousands of successful learners today!
          </p>
        </div>

        <div className="p-6">
          <div className="space-y-6">
            <div className="space-y-4">
              {[
                {
                  icon: <BookOpen className="w-5 h-5" />,
                  title: "Curated Content Access",
                  description: "Listen to curated African wisdom and meditation tracks"
                },
                {
                  icon: <Medal className="w-5 h-5" />,
                  title: "Progress Tracking",
                  description: "Save your completed lessons and track personal milestones"
                },
                {
                  icon: <Laptop className="w-5 h-5" />,
                  title: "Seamless Experience",
                  description: "Pick up exactly where you left off on any device"
                },
                {
                  icon: <Users className="w-5 h-5" />,
                  title: "Community Learning",
                  description: "Join group discussions and wisdom sharing circles"
                }
              ].map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="p-2 bg-amber-100 dark:bg-amber-900/50 rounded-lg">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-gray-100">{feature.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg flex items-start gap-3">
              <div className="p-2 bg-white dark:bg-amber-800 rounded-lg">
                <Gift className="w-5 h-5 text-amber-600 dark:text-amber-200" />
              </div>
              <div>
                <h3 className="font-medium text-amber-900 dark:text-amber-100">New Member Bonus!</h3>
                <p className="text-sm text-amber-800 dark:text-amber-200">
                  Get exclusive access to premium study materials when you join today.
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <button
                ref={initialFocusRef}
                onClick={onSignUp}
                className="w-full py-3 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-lg hover:from-amber-700 hover:to-orange-700 transition-all duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
              >
                Create Your Free Account Now
              </button>
              <p className="text-center text-sm text-gray-500 dark:text-gray-400">
                *No credit card required
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}