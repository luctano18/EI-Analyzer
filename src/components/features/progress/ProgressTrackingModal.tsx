import React from 'react';
import { BookOpen, Gift, X } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSignUp: () => void;
}

export default function ProgressTrackingModal({ isOpen, onClose, onSignUp }: Props) {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white rounded-xl w-full max-w-lg animate-fadeIn shadow-2xl">
        <div className="p-6 bg-gradient-to-r from-amber-600 to-orange-600">
          <div className="flex justify-between items-center text-white mb-4">
            <div className="flex items-center gap-2">
              <BookOpen className="w-6 h-6" />
              <h2 className="text-xl font-bold">Track Your Learning Journey!</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <p className="text-white/90">
            Never lose your progress again. Join thousands of successful learners today!
          </p>
        </div>

        <div className="p-6">
          <div className="space-y-6">
            <div className="grid gap-4">
              {[
                {
                  title: "Track Your Progress",
                  description: "Monitor your emotional intelligence development"
                },
                {
                  title: "Set Personal Goals",
                  description: "Create and achieve meaningful milestones"
                },
                {
                  title: "Get Insights",
                  description: "Receive personalized recommendations"
                },
                {
                  title: "Join Community",
                  description: "Connect with others on similar journeys"
                }
              ].map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="p-2 bg-amber-100 rounded-lg">
                    <BookOpen className="w-5 h-5 text-amber-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{feature.title}</h3>
                    <p className="text-sm text-gray-600">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-amber-50 p-4 rounded-lg flex items-start gap-3">
              <div className="p-2 bg-white rounded-lg">
                <Gift className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <h3 className="font-medium text-amber-900">New Member Bonus!</h3>
                <p className="text-sm text-amber-800">
                  Get exclusive access to premium features when you join today.
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <button
                onClick={onSignUp}
                className="w-full py-3 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-lg hover:from-amber-700 hover:to-orange-700 transition-all duration-200 font-medium"
              >
                Create Your Free Account Now
              </button>
              <p className="text-center text-sm text-gray-500">
                *No credit card required
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}