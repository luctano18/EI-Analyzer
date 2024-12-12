import React, { useState } from 'react';
import { Calendar, Bot, Loader, UserPlus, BookOpen } from 'lucide-react';
import BookingModal from './features/BookingModal';
import SignUpModal2 from './auth/SignUpModal2';
import AIConsultationModal from './consultation/AIConsultationModal';
import WisdomTraditionsModal from './WisdomTraditionsModal';
import NewsletterModal from './newsletter/NewsletterModal';
import MapButton from './map/MapButton';

interface Props {
  onScrollToSection: () => void;
}

export default function CTAButtons({ onScrollToSection }: Props) {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
  const [isConsultationModalOpen, setIsConsultationModalOpen] = useState(false);
  const [isWisdomModalOpen, setIsWisdomModalOpen] = useState(false);
  const [isNewsletterModalOpen, setIsNewsletterModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleAIConsultation = () => {
    setIsConsultationModalOpen(true);
  };

  return (
    <div className="w-full max-w-3xl mx-auto mb-12">
      <div className="flex flex-col sm:flex-row justify-center gap-3 px-4 mb-4">
        <button
          onClick={handleAIConsultation}
          className="group relative flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 disabled:opacity-70 text-sm"
          disabled={isLoading}
          aria-label="Get Started with AI Coach"
        >
          <div className="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+CiAgPHBhdGggZD0iTTAgMGg2MHY2MEgweiIgZmlsbD0ibm9uZSIvPgogIDxwYXRoIGQ9Ik0zMCAzMEwxNSA0NWwxNS0xNS0xNS0xNSAxNSAxNSAxNS0xNS0xNSAxNSAxNSAxNXoiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIi8+Cjwvc3ZnPg==')] group-hover:opacity-30 transition-opacity duration-300"></div>
          {isLoading ? (
            <Loader className="w-4 h-4 animate-spin" />
          ) : (
            <Bot className="w-4 h-4 relative z-10" />
          )}
          <span className="relative z-10 font-medium">
            Get Started with AI Coach
          </span>
        </button>

        <div className="flex sm:flex-row gap-3">
          <button
            onClick={() => setIsBookingModalOpen(true)}
            className="group relative flex items-center justify-center gap-2 px-4 py-2 bg-white border-2 border-amber-600 text-amber-600 rounded-lg overflow-hidden shadow-md hover:shadow-lg hover:bg-amber-50 transition-all duration-300 text-sm"
            aria-label="Book a Live Session with EI Coach"
          >
            <Calendar className="w-4 h-4 relative z-10" />
            <span className="relative z-10 font-medium">
              Book a Live Session with EI Coach
            </span>
          </button>

          <button
            onClick={() => setIsNewsletterModalOpen(true)}
            className="group relative flex items-center justify-center gap-2 px-4 py-2 bg-white border-2 border-amber-600 text-amber-600 rounded-lg overflow-hidden shadow-md hover:shadow-lg hover:bg-amber-50 transition-all duration-300 text-sm"
            aria-label="Get Free Ebook"
          >
            <BookOpen className="w-4 h-4 relative z-10" />
            <span className="relative z-10 font-medium">
              Get Free Ebook
            </span>
          </button>
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-4">
        <button
          onClick={() => setIsSignUpModalOpen(true)}
          className="group relative flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300"
        >
          <div className="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+CiAgPHBhdGggZD0iTTAgMGg2MHY2MEgweiIgZmlsbD0ibm9uZSIvPgogIDxwYXRoIGQ9Ik0zMCAzMEwxNSA0NWwxNS0xNS0xNS0xNSAxNSAxNSAxNS0xNS0xNSAxNSAxNSAxNXoiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIi8+Cjwvc3ZnPg==')] group-hover:opacity-30 transition-opacity duration-300"></div>
          <UserPlus className="w-5 h-5 relative z-10" />
          <span className="relative z-10 font-medium">Create Account</span>
        </button>

        <MapButton />
      </div>

      <BookingModal 
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
      />

      <SignUpModal2
        isOpen={isSignUpModalOpen}
        onClose={() => setIsSignUpModalOpen(false)}
      />

      <AIConsultationModal
        isOpen={isConsultationModalOpen}
        onClose={() => setIsConsultationModalOpen(false)}
      />

      <WisdomTraditionsModal
        isOpen={isWisdomModalOpen}
        onClose={() => setIsWisdomModalOpen(false)}
      />

      <NewsletterModal
        isOpen={isNewsletterModalOpen}
        onClose={() => setIsNewsletterModalOpen(false)}
      />
    </div>
  );
}