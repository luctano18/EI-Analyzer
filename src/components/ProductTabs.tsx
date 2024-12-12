import React, { useState, useRef, useEffect } from 'react';
import { Calendar, Users, UserPlus, ArrowRight, Video, MessageSquare } from 'lucide-react';
import SignUpModal2 from './auth/SignUpModal2';
import BookingModal from './features/BookingModal';

export default function ProductTabs() {
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setActiveTab(null);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleTabClick = (tab: string) => {
    setActiveTab(activeTab === tab ? null : tab);
  };

  return (
    <div ref={containerRef} className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
      <SignUpModal2 
        isOpen={showSignUpModal}
        onClose={() => setShowSignUpModal(false)}
      />

      <BookingModal
        isOpen={showBookingModal}
        onClose={() => setShowBookingModal(false)}
      />
    </div>
  );
}