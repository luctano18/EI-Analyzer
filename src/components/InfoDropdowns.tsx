import React, { useState } from 'react';
import { AlertCircle, BookOpen, Brain } from 'lucide-react';
import InfoModal from './info/InfoModal';
import DisclaimerContent from './info/DisclaimerContent';
import HowToContent from './info/HowToContent';
import EIContent from './info/EIContent';

export default function InfoDropdowns() {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [disclaimerAccepted, setDisclaimerAccepted] = useState(false);
  const [showValidateButton, setShowValidateButton] = useState(false);

  const handleContinue = () => {
    if (disclaimerAccepted) {
      setActiveModal(null);
      // Additional actions after accepting disclaimer can be added here
    }
  };

  const handleDisclaimerAccept = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDisclaimerAccepted(e.target.checked);
    setShowValidateButton(e.target.checked);
  };

  return (
    <>
      <div className="flex flex-wrap gap-4 justify-center mb-8">
        <button
          onClick={() => setActiveModal('ei')}
          className="group relative flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#D2691E] to-[#8B4513] text-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300"
        >
          <div className="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MCIgaGVpZ2h0PSI1MCI+CiAgPHBhdGggZD0iTTAgMGg1MHY1MEgweiIgZmlsbD0ibm9uZSIvPgogIDxjaXJjbGUgY3g9IjI1IiBjeT0iMjUiIHI9IjEyLjUiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIi8+CiAgPGNpcmNsZSBjeD0iMjUiIGN5PSIyNSIgcj0iNi4yNSIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiLz4KPC9zdmc+')] group-hover:opacity-30 transition-opacity duration-300"></div>
          <Brain className="w-5 h-5 relative z-10" />
          <span className="relative z-10 font-medium">Understanding EI</span>
        </button>

        <button
          onClick={() => setActiveModal('disclaimer')}
          className="group relative flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#8B4513] to-[#A0522D] text-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300"
        >
          <div className="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+CiAgPHBhdGggZD0iTTAgMGg2MHY2MEgweiIgZmlsbD0ibm9uZSIvPgogIDxwYXRoIGQ9Ik0zMCAzMEwxNSA0NWwxNS0xNS0xNS0xNSAxNSAxNSAxNS0xNS0xNSAxNSAxNSAxNXoiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIi8+Cjwvc3ZnPg==')] group-hover:opacity-30 transition-opacity duration-300"></div>
          <AlertCircle className="w-5 h-5 relative z-10" />
          <span className="relative z-10 font-medium">Important Disclaimer</span>
        </button>

        <button
          onClick={() => setActiveModal('howTo')}
          className="group relative flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#CD853F] to-[#DEB887] text-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300"
        >
          <div className="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+CiAgPHBhdGggZD0iTTAgMGg0MHY0MEgweiIgZmlsbD0ibm9uZSIvPgogIDxwYXRoIGQ9Ik0wIDBoNDB2NDBIMHoiIGZpbGw9Im5vbmUiLz4KICA8cGF0aCBkPSJNMjAgMjBMMCAwaDQwTDIwIDIwem0wIDBMMCA0MGg0MEwyMCAyMHoiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIi8+Cjwvc3ZnPg==')] group-hover:opacity-30 transition-opacity duration-300"></div>
          <BookOpen className="w-5 h-5 relative z-10" />
          <span className="relative z-10 font-medium">How to Use EI Analyzer</span>
        </button>
      </div>

      <InfoModal
        title="Understanding Emotional Intelligence"
        isOpen={activeModal === 'ei'}
        onClose={() => setActiveModal(null)}
      >
        <EIContent />
      </InfoModal>

      <InfoModal
        title="Important Disclaimer"
        isOpen={activeModal === 'disclaimer'}
        onClose={() => setActiveModal(null)}
        showContinue={true}
        onContinue={handleContinue}
        canContinue={disclaimerAccepted}
      >
        <DisclaimerContent
          disclaimerAccepted={disclaimerAccepted}
          onDisclaimerAccept={handleDisclaimerAccept}
          onContinue={handleContinue}
          showValidateButton={showValidateButton}
        />
      </InfoModal>

      <InfoModal
        title="How to Use This Tool"
        isOpen={activeModal === 'howTo'}
        onClose={() => setActiveModal(null)}
      >
        <HowToContent />
      </InfoModal>
    </>
  );
}