import React, { useCallback, useRef, useState } from 'react';
import { Calendar, Mail, Phone, X, Globe, Loader, Video, Map, UserPlus } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { supabase } from '../../lib/supabase';
import toast from 'react-hot-toast';
import SignUpForm2 from '../auth/SignUpForm2';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const benefits = [
  'Personalized emotional intelligence insights',
  'Access to African wisdom traditions',
  'Progress tracking and analytics',
  'Community support and discussions',
  'Exclusive meditation audio content'
];

const journeyFeatures = [
  {
    icon: Map,
    title: 'Explore African Countries',
    description: 'Discover wisdom traditions across the continent',
    action: 'explore-map'
  },
  {
    icon: Video,
    title: 'Live Workshops',
    description: 'Attend interactive workshops with our emotional intelligence experts',
    action: 'workshops'
  }
];

export default function AIConsultationModal({ isOpen, onClose }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [showSignUpForm, setShowSignUpForm] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  const handleEscapeKey = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      if (showSignUpForm) {
        setShowSignUpForm(false);
      } else {
        onClose();
      }
    }
  }, [showSignUpForm, onClose]);

  React.useEffect(() => {
    document.addEventListener('keydown', handleEscapeKey);
    return () => document.removeEventListener('keydown', handleEscapeKey);
  }, [handleEscapeKey]);

  React.useEffect(() => {
    if (showSignUpForm || isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showSignUpForm, isOpen]);

  if (!isOpen) return null;

  const handleSignUpComplete = () => {
    setShowSignUpForm(false);
    onClose();
    toast.success('Welcome! Your journey begins now.');
  };

  if (showSignUpForm) {
    return (
      <div 
        className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-sm"
        onClick={(e) => e.target === e.currentTarget && setShowSignUpForm(false)}
        role="dialog"
        aria-modal="true"
        aria-labelledby="signup-modal-title"
      >
        <div 
          className="bg-white rounded-xl w-full max-w-xl animate-fadeIn shadow-2xl"
          role="document"
        >
          <div className="p-4 flex justify-end">
            <button
              onClick={() => setShowSignUpForm(false)}
              className="text-gray-500 hover:text-gray-700 transition-colors p-2 rounded-full hover:bg-gray-100"
              aria-label="Close signup form"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <SignUpForm2 onClose={handleSignUpComplete} />
        </div>
      </div>
    );
  }

  return (
    <div 
      className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onClose()}
      role="dialog"
      aria-modal="true"
      aria-labelledby="consultation-modal-title"
    >
      <div 
        ref={modalRef}
        className="bg-white rounded-lg w-full max-w-4xl animate-fadeIn shadow-2xl"
        role="document"
      >
        {/* Header */}
        <div className="relative h-32 bg-gradient-to-r from-amber-600 to-orange-600 rounded-t-xl overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+CiAgPHBhdGggZD0iTTAgMGg2MHY2MEgweiIgZmlsbD0ibm9uZSIvPgogIDxwYXRoIGQ9Ik0zMCAzMEwxNSA0NWwxNS0xNS0xNS0xNSAxNSAxNSAxNS0xNS0xNSAxNSAxNSAxNXoiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIi8+Cjwvc3ZnPg==')] opacity-10"></div>
          <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
            <div className="w-16 h-16 bg-white rounded-full p-3 shadow-lg">
              <Globe className="w-full h-full text-amber-600" />
            </div>
          </div>
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-white/80 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full"
            aria-label="Close consultation modal"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="absolute bottom-12 left-0 right-0 text-center text-white">
            <h2 id="consultation-modal-title" className="text-xl font-bold">Start your coaching journey</h2>
            <p className="text-white/80 text-sm">Create your account to unlock personalized AI coaching</p>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 pt-12">
          <div className="mb-6">
            <h3 className="font-medium text-gray-900 mb-3">What you'll get:</h3>
            <ul className="space-y-2">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-center gap-2 text-gray-600">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-600" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Continue Your Journey Section */}
          <section className="mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {journeyFeatures.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <button
                    key={index}
                    onClick={() => {}}
                    className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow text-left"
                  >
                    <div className="p-3 bg-amber-100 rounded-lg w-fit mb-4">
                      <Icon className="w-5 h-5 text-amber-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      {feature.description}
                    </p>
                  </button>
                );
              })}
            </div>
          </section>

          {/* Create Account Button */}
          <div className="flex justify-center">
            <button
              onClick={() => setShowSignUpForm(true)}
              className="group relative flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300"
            >
              <div className="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+CiAgPHBhdGggZD0iTTAgMGg2MHY2MEgweiIgZmlsbD0ibm9uZSIvPgogIDxwYXRoIGQ9Ik0zMCAzMEwxNSA0NWwxNS0xNS0xNS0xNSAxNSAxNSAxNS0xNS0xNSAxNSAxNSAxNXoiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIi8+Cjwvc3ZnPg==')] group-hover:opacity-30 transition-opacity duration-300"></div>
              <UserPlus className="w-5 h-5 relative z-10" />
              <span className="relative z-10 font-medium">Create Account</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}