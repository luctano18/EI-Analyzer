import React, { useState } from 'react';
import { 
  Calendar, 
  MessageSquare, 
  LineChart
} from 'lucide-react';
import BookingModal from './BookingModal';
import VirtualAssistant from './VirtualAssistant';
import ProgressTrackingModal from './progress/ProgressTrackingModal';
import AuthModal from '../auth/AuthModal';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  action: () => void;
  isActive?: boolean;
}

function FeatureCard({ icon, title, description, action, isActive }: FeatureCardProps) {
  return (
    <button
      onClick={action}
      className={`flex flex-col items-center p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-all ${
        isActive ? 'ring-2 ring-amber-500' : ''
      }`}
    >
      <div className="p-3 bg-amber-100 rounded-full mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-sm text-gray-600 text-center">{description}</p>
    </button>
  );
}

interface Props {
  userChallenge?: string;
  userEmotions?: string[];
}

export default function InteractiveFeatures({ userChallenge, userEmotions }: Props) {
  const [activeFeature, setActiveFeature] = useState<string | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isProgressModalOpen, setIsProgressModalOpen] = useState(false);

  const handleFeatureClick = (feature: string) => {
    if (feature === 'appointment') {
      setIsBookingModalOpen(true);
      return;
    }

    if (feature === 'progress') {
      setIsProgressModalOpen(true);
      return;
    }

    if (activeFeature === feature) {
      setActiveFeature(null);
    } else {
      setActiveFeature(feature);
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <FeatureCard
          icon={<MessageSquare className="w-6 h-6 text-amber-600" />}
          title="Live session with EI Assistant"
          description="Chat with our AI wisdom guide for personalized insights"
          action={() => handleFeatureClick('chat')}
          isActive={activeFeature === 'chat'}
        />

        <FeatureCard
          icon={<LineChart className="w-6 h-6 text-amber-600" />}
          title="Progress Tracker"
          description="Monitor your emotional intelligence growth journey"
          action={() => handleFeatureClick('progress')}
          isActive={activeFeature === 'progress'}
        />

        <FeatureCard
          icon={<Calendar className="w-6 h-6 text-amber-600" />}
          title="Book a Live Session with EI Coach"
          description="Schedule a one-on-one session with our wisdom counselors"
          action={() => handleFeatureClick('appointment')}
          isActive={activeFeature === 'appointment'}
        />

        {activeFeature === 'chat' && (
          <div className="col-span-full">
            <VirtualAssistant />
          </div>
        )}
      </div>

      <BookingModal 
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
      />

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />

      <ProgressTrackingModal
        isOpen={isProgressModalOpen}
        onClose={() => setIsProgressModalOpen(false)}
        onSignUp={() => {
          setIsProgressModalOpen(false);
          setIsAuthModalOpen(true);
        }}
      />
    </>
  );
}