import React from 'react';
import { List, Play, Brain, AlertCircle } from 'lucide-react';

export default function HowToContent() {
  return (
    <div className="space-y-8">
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
              <li>Receive African-inspired proverbs categorized into key Emotional Intelligence (EI) areas</li>
              <li>Each proverb includes its country of origin and a brief explanation</li>
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
            <h4 className="font-medium text-gray-800 mb-2">6. Find Out More</h4>
            <p className="text-gray-700">
              Explore other proverbs, search by category or country, and discover the deeper cultural context of each proverb.
            </p>
          </div>

          <div>
            <h4 className="font-medium text-gray-800 mb-2">7. Daily Inspiration</h4>
            <p className="text-gray-700">
              Use the "Random Inspiration" function to get a daily dose of African wisdom to boost your emotional intelligence.
            </p>
          </div>

          <div>
            <h4 className="font-medium text-gray-800 mb-2">8. Respect the Content</h4>
            <p className="text-gray-700">
              Remember that proverbs reflect cultural traditions and philosophies. Use them thoughtfully and respectfully.
            </p>
          </div>
        </div>
      </section>

      <section>
        <div className="flex items-center gap-2 mb-4">
          <Play className="w-6 h-6 text-amber-600" />
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
  );
}