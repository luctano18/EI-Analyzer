import React from 'react';
import { X } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  fullName: string;
}

export default function ParentalConsentModal({ isOpen, onClose, onConfirm, fullName }: Props) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-lg w-full animate-fadeIn">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold text-gray-900">Parental Consent Required</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div className="prose prose-amber">
            <h3 className="text-lg font-medium text-gray-900">Language for Youth Under 16</h3>
            <p className="text-gray-700">
              We care about your privacy and safety. Before you can create an account, 
              we need to make sure you have permission from your parent or legal guardian.
            </p>
            
            <div className="bg-amber-50 p-4 rounded-lg mt-4">
              <h4 className="font-medium text-amber-900">Important Information:</h4>
              <ul className="list-disc list-inside text-amber-800 space-y-2 mt-2">
                <li>Your parent or guardian must approve your account</li>
                <li>We collect minimal personal information to protect your privacy</li>
                <li>You can delete your account at any time</li>
                <li>We never share your information with third parties</li>
              </ul>
            </div>
          </div>

          <div className="border-t pt-4">
            <label className="flex items-start space-x-3">
              <input
                type="checkbox"
                id="consent"
                className="mt-1 rounded text-amber-600 focus:ring-amber-500"
                required
              />
              <span className="text-sm text-gray-700">
                I, <span className="font-medium">{fullName}</span>, acknowledge that I have 
                parental permission to create an account, and my parent/guardian has reviewed 
                and accepts the Terms of Service and Privacy Policy.
              </span>
            </label>
          </div>
        </div>

        <div className="p-4 border-t bg-gray-50 flex justify-end space-x-3 rounded-b-lg">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 hover:text-gray-900 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700 transition-colors"
          >
            Confirm Parental Consent
          </button>
        </div>
      </div>
    </div>
  );
}