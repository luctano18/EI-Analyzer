import React, { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import Set from '@babel/runtime-corejs3/core-js-stable/set';
import Header from './components/Header';
import ChallengeInput from './components/ChallengeInput';
import ProverbCard from './components/ProverbCard';
import CategorySection from './components/CategorySection';
import AuthModal from './components/auth/AuthModal';
import UserProfile from './components/profile/UserProfile';
import JourneyDashboard from './components/journey/JourneyDashboard';
import InfoDropdowns from './components/InfoDropdowns';
import ConsultingPlans from './components/consulting/ConsultingPlans';
import ConsultingSession from './components/consulting/ConsultingSession';
import InteractiveFeatures from './components/features/InteractiveFeatures';
import PartnersList from './components/partners/PartnersList';
import AnalyticsBanner from './components/analytics/AnalyticsBanner';
import ProductTabs from './components/ProductTabs';
import { supabase } from './lib/supabase';
import type { Proverb, UserInput } from './types';
import { generateProverbs } from './utils/proverbGenerator';

export default function App() {
  const [userInput, setUserInput] = useState<UserInput | null>(null);
  const [proverbs, setProverbs] = useState<Proverb[]>([]);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [currentView, setCurrentView] = useState<'home' | 'profile' | 'journey' | 'consulting'>('home');
  const [showConsultingSession, setShowConsultingSession] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSubmit = async (input: UserInput) => {
    setUserInput(input);
    const generatedProverbs = generateProverbs(input);
    setProverbs(generatedProverbs);

    if (user) {
      await supabase.from('journal_entries').insert([
        {
          user_id: user.id,
          content: input.challenge,
          emotion: input.emotions[0],
          tags: ['challenge'],
        },
      ]);
    }
  };

  const toggleFavorite = async (id: string) => {
    if (!user) {
      setIsAuthModalOpen(true);
      return;
    }

    setFavorites((prev) => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(id)) {
        newFavorites.delete(id);
      } else {
        newFavorites.add(id);
      }
      return newFavorites;
    });

    const proverb = proverbs.find((p) => p.id === id);
    if (proverb) {
      await supabase.from('favorite_proverbs').upsert([
        {
          user_id: user.id,
          proverb_id: id,
          proverb_text: proverb.text,
          is_favorite: !favorites.has(id),
        },
      ]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Toaster position="top-right" />
      <Header
        user={user}
        onAuthClick={() => setIsAuthModalOpen(true)}
        onViewChange={setCurrentView}
        currentView={currentView}
      />
      
      <main className="flex-grow max-w-7xl mx-auto px-4 py-8">
        {currentView === 'home' && (
          <>
            <div className="mb-8">
              <InfoDropdowns />
            </div>

            <CategorySection />

            <section className="mb-12">
              <ChallengeInput onSubmit={handleSubmit} />
            </section>

            {proverbs.length > 0 && (
              <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                  Wisdom for Your Journey
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {proverbs.map((proverb) => (
                    <ProverbCard
                      key={proverb.id}
                      proverb={proverb}
                      onFavorite={toggleFavorite}
                      isFavorite={favorites.has(proverb.id)}
                    />
                  ))}
                </div>
              </section>
            )}

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                Continue Your Journey
              </h2>
              <InteractiveFeatures 
                userChallenge={userInput?.challenge}
                userEmotions={userInput?.emotions}
              />
            </section>

            <PartnersList />
          </>
        )}

        {currentView === 'profile' && user && <UserProfile />}
        {currentView === 'journey' && user && <JourneyDashboard />}
        {currentView === 'consulting' && (
          <div className="space-y-8">
            {showConsultingSession ? (
              <ConsultingSession />
            ) : (
              <ConsultingPlans />
            )}
          </div>
        )}
        
        {(currentView === 'profile' || currentView === 'journey' || currentView === 'consulting') && !user && (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Please sign in to access this feature
            </h2>
            <button
              onClick={() => setIsAuthModalOpen(true)}
              className="py-2 px-4 bg-amber-600 text-white rounded-md hover:bg-amber-700"
            >
              Sign In
            </button>
          </div>
        )}
      </main>

      <footer className="bg-gray-900 text-white py-4">
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-4">
            <AnalyticsBanner />
          </div>
          <p className="text-center text-gray-400 text-sm">
            Connecting ancient wisdom with modern emotional intelligence
          </p>
        </div>
      </footer>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </div>
  );
}