import React from 'react';
import { X } from 'lucide-react';
import SignUpForm2 from './SignUpForm2';
import type { FormData } from './SignUpForm2/types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onBack?: () => void;
  initialData?: Partial<FormData>;
}

export default function SignUpModal2({ isOpen, onClose, onBack, initialData }: Props) {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-white rounded-xl w-full max-w-[480px] max-h-[85vh] overflow-hidden animate-fadeIn shadow-2xl">
        <div className="relative h-24 bg-gradient-to-r from-amber-600 to-orange-600 overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+CiAgPHBhdGggZD0iTTAgMGg2MHY2MEgweiIgZmlsbD0ibm9uZSIvPgogIDxwYXRoIGQ9Ik0zMCAzMEwxNSA0NWwxNS0xNS0xNS0xNSAxNSAxNSAxNS0xNS0xNSAxNSAxNSAxNXoiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIi8+Cjwvc3ZnPg==')] group-hover:opacity-30 transition-opacity duration-300"></div>
          <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2">
            <div className="w-12 h-12 bg-white rounded-full p-2 shadow-lg">
              <img
                src="https://globevisions.io/epimap/img/Epimap247logo.jpg"
                alt="EPIMAP247 Logo"
                className="w-full h-full object-contain rounded-full"
                onError={(e) => {
                  const img = e.target as HTMLImageElement;
                  img.src = 'https://via.placeholder.com/150?text=Logo';
                }}
              />
            </div>
          </div>
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-white/80 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full"
          >
            <X className="w-4 h-4" />
          </button>
          <div className="absolute bottom-8 left-0 right-0 text-center text-white">
            <h2 className="text-lg font-bold">Join Our Community</h2>
            <p className="text-white/80 text-xs">Begin your emotional intelligence journey</p>
          </div>
        </div>

        <div className="p-4 overflow-y-auto max-h-[calc(85vh-6rem)]">
          <SignUpForm2 onClose={onClose} onBack={onBack} initialData={initialData} />
        </div>
      </div>
    </div>
  );
}