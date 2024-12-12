import React, { useCallback } from 'react';
import { BookOpen, X, ArrowRight } from 'lucide-react';

interface Props {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  showContinue?: boolean;
  onContinue?: () => void;
  canContinue?: boolean;
}

export default function InfoModal({ 
  title, 
  isOpen, 
  onClose, 
  children, 
  showContinue, 
  onContinue,
  canContinue = true 
}: Props) {
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
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div 
        className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] shadow-2xl animate-fadeIn relative overflow-hidden"
      >
        <div className="sticky top-0 bg-gradient-to-r from-amber-600 to-orange-600 px-6 py-4 flex justify-between items-center">
          <h2 
            id="modal-title"
            className="text-xl font-semibold text-white flex items-center gap-2"
          >
            <BookOpen className="w-6 h-6" />
            {title}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-full transition-colors"
            aria-label="Close modal"
          >
            <X className="w-6 h-6 text-white" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-4rem)]">
          {children}
        </div>

        <div className="p-4 border-t bg-amber-50 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 hover:text-gray-900 transition-colors"
          >
            Close
          </button>
          {showContinue && (
            <button
              onClick={onContinue}
              disabled={!canContinue}
              className="flex items-center gap-2 px-6 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span>Continue</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}