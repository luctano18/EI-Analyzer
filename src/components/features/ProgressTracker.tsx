import React, { useState } from 'react';
import { LineChart } from 'lucide-react';
import ProgressTrackingModal from './ProgressTrackingModal';
import { supabase } from '../../lib/supabase';
import { useThemeStore } from '../../stores/themeStore';

interface Props {
  onAuthRequired: () => void;
}

export default function ProgressTracker({ onAuthRequired }: Props) {
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const { theme } = useThemeStore();

  const handleTrackProgress = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      setShowSignUpModal(true);
      return;
    }
    // If user is authenticated, handle progress tracking logic here
  };

  return (
    <>
      <div 
        onClick={handleTrackProgress}
        className={`bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 cursor-pointer transition-all duration-200 hover:shadow-xl hover:scale-[1.02] focus-within:ring-2 focus-within:ring-amber-500`}
        role="button"
        tabIndex={0}
        onKeyPress={(e) => e.key === 'Enter' && handleTrackProgress()}
        aria-label="Open progress tracker"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Progress Tracker</h2>
          <div className="p-2 bg-amber-100 dark:bg-amber-900/50 rounded-full">
            <LineChart className="w-6 h-6 text-amber-600 dark:text-amber-400" />
          </div>
        </div>
        
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          Track your emotional intelligence journey and measure your growth over time.
        </p>
        
        <button
          className="w-full py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
          aria-label="Track your progress"
        >
          Track Your Progress
        </button>
      </div>

      <ProgressTrackingModal
        isOpen={showSignUpModal}
        onClose={() => setShowSignUpModal(false)}
        onSignUp={() => {
          setShowSignUpModal(false);
          onAuthRequired();
        }}
      />
    </>
  );
}