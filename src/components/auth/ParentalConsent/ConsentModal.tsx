import React, { useState, useCallback } from 'react';
import { X, ShieldCheck } from 'lucide-react';
import ConsentForm from './ConsentForm';
import ConsentInfo from './ConsentInfo';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  fullName: string;
}

export default function ConsentModal({ isOpen, onClose, onConfirm, fullName }: Props) {
  const [hasCheckedConsent, setHasCheckedConsent] = useState(false);

  const handleOverlayClick = useCallback((e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
      onClick={handleOverlayClick}
    >
      <div 
        className="bg-white rounded-lg max-w-[480px] w-full animate-fadeIn shadow-xl"
        role="dialog"
        aria-modal="true"
        aria-labelledby="consent-modal-title"
      >
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-100 rounded-full">
              <ShieldCheck className="w-6 h-6 text-amber-600" />
            </div>
            <h2 
              id="consent-modal-title"
              className="text-xl font-semibold text-gray-900"
            >
              Parental Consent Required
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Close modal"
          >
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-6 max-h-[calc(100vh-16rem)] overflow-y-auto">
          <ConsentInfo />
          <div className="mt-6">
            <ConsentForm 
              fullName={fullName}
              onConsentChange={setHasCheckedConsent}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t bg-gray-50 flex flex-col sm:flex-row justify-end gap-3 rounded-b-lg">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 hover:text-gray-900 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={!hasCheckedConsent}
            className="px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Confirm Parental Consent
          </button>
        </div>
      </div>
    </div>
  );
}