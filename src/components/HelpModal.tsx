import React from 'react';
import { X, BookOpen, AlertCircle, Brain, List } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function HelpModal({ isOpen, onClose }: Props) {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-white rounded-lg max-w-3xl w-full animate-fadeIn">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold text-gray-900">How to Use This Tool</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
            aria-label="Close help modal"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 space-y-8 max-h-[calc(100vh-200px)] overflow-y-auto">
          <section>
            <div className="flex items-center gap-2 mb-4">
              <List className="w-6 h-6 text-amber-600" />
              <h3 className="text-lg font-semibold text-gray-900">Guidelines</h3>
            </div>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-800 mb-2">1. Input Your Challenge</h4>
                <p className="text-gray-700">
                  Start by typing a real-life challenge or emotional situation you're facing into the prompt box.
                </p>
              </div>

              <div>
                <h4 className="font-medium text-gray-800 mb-2">2. Explore the Results</h4>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>Receive African-inspired proverbs categorized into key Emotional Intelligence (EI) areas: Self-awareness, Self-regulation, Empathy, Social Skills, and Motivation.</li>
                  <li>Each proverb includes its country of origin and a brief explanation to help you apply its wisdom.</li>
                </ul>
              </div>

              <div>
                <h4 className="font-medium text-gray-800 mb-2">3. Engage with Visuals</h4>
                <p className="text-gray-700">
                  Hover over the category images to see definitions of each EI area and understand how it relates to managing emotions.
                </p>
              </div>

              <div>
                <h4 className="font-medium text-gray-800 mb-2">4. Reflect and Apply</h4>
                <p className="text-gray-700">
                  Use the explanations and actionable tips provided with each proverb to reflect on your situation and navigate it effectively.
                </p>
              </div>

              <div>
                <h4 className="font-medium text-gray-800 mb-2">5. Save and Share</h4>
                <p className="text-gray-700">
                  Save your favorite proverbs or share them on social media for inspiration with friends and family.
                </p>
              </div>

              <div>
                <h4 className="font-medium text-gray-800 mb-2">6. Learn More</h4>
                <p className="text-gray-700">
                  Explore additional proverbs, search by category or country, and discover the deeper cultural context behind each saying.
                </p>
              </div>

              <div>
                <h4 className="font-medium text-gray-800 mb-2">7. Daily Inspiration</h4>
                <p className="text-gray-700">
                  Use the "Random Inspiration" feature for a daily dose of African wisdom to boost your emotional intelligence.
                </p>
              </div>

              <div>
                <h4 className="font-medium text-gray-800 mb-2">8. Respect the Content</h4>
                <p className="text-gray-700">
                  Remember that the proverbs reflect cultural traditions and philosophies. Use them thoughtfully and respectfully.
                </p>
              </div>
            </div>
          </section>

          <section>
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="w-6 h-6 text-amber-600" />
              <h3 className="text-lg font-semibold text-gray-900">Quick Start Guide</h3>
            </div>
            <ol className="list-decimal list-inside space-y-3 text-gray-700">
              <li>Share your situation in the prompt box</li>
              <li>Receive relevant African proverbs with EI insights</li>
              <li>Click category icons for detailed EI explanations</li>
              <li>Save favorites and share wisdom with others</li>
            </ol>
          </section>

          <section>
            <div className="flex items-center gap-2 mb-4">
              <Brain className="w-6 h-6 text-amber-600" />
              <h3 className="text-lg font-semibold text-gray-900">Key Features</h3>
            </div>
            <ul className="list-disc list-inside space-y-3 text-gray-700">
              <li>Proverbs sorted by EI categories</li>
              <li>Cultural context and practical applications</li>
              <li>Daily inspiration through random proverbs</li>
              <li>Search by category or country of origin</li>
            </ul>
          </section>

          <section className="bg-amber-50 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-4">
              <AlertCircle className="w-6 h-6 text-amber-600" />
              <h3 className="text-lg font-semibold text-amber-900">Important Note</h3>
            </div>
            <p className="text-amber-800">
              By following these steps, you'll make the most of the app's features and deepen your understanding 
              of Emotional Intelligence through the lens of African wisdom. Remember to engage with the content 
              respectfully and thoughtfully.
            </p>
          </section>
        </div>

        <div className="p-4 border-t bg-gray-50 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700 transition-colors"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
}