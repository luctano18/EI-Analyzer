import React from 'react';
import { X, Shield } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function ParentalConsentModal({ isOpen, onClose, onConfirm }: Props) {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-white rounded-lg w-full max-w-md animate-fadeIn">
        <div className="flex justify-between items-center p-6 bg-amber-50">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-100 rounded-full">
              <Shield className="w-6 h-6 text-amber-600" />
            </div>
            <h2 className="text-lg font-semibold text-amber-900">
              Parental Consent Required
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-amber-900/60 hover:text-amber-900"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          <div className="prose prose-amber max-w-none">
            <p>
              For users under 16, we require parental consent to create an account. 
              This helps us ensure a safe and appropriate experience for young users.
            </p>

            <div className="bg-amber-50 p-4 rounded-lg mt-4">
              <h4 className="text-amber-900 font-medium mb-2">What parents should know:</h4>
              <ul className="space-y-2 text-amber-800">
                <li>We collect minimal personal information</li>
                <li>All data is securely stored and protected</li>
                <li>Parents can review and delete account data</li>
                <li>Age-appropriate content and features</li>
              </ul>
            </div>

            <div className="mt-6">
              <label className="flex items-start gap-3">
                <input
                  type="checkbox"
                  className="mt-1 rounded text-amber-600 focus:ring-amber-500"
                  required
                />
                <span className="text-sm text-gray-600">
                  I confirm that I have parental/guardian consent to create an account, 
                  and they have reviewed and accepted the Terms of Service and Privacy Policy.
                </span>
              </label>
            </div>
          </div>
        </div>

        <div className="p-4 border-t bg-gray-50 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-900"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-6 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
          >
            Confirm Consent
          </button>
        </div>
      </div>
    </div>
  );
}