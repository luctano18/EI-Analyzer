import React, { useState } from 'react';
import { BookOpen, ChevronDown, ChevronUp } from 'lucide-react';

export default function Guidelines() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-l-4 border-orange-600 p-4 mb-8">
      <div className="flex flex-col">
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-start justify-between w-full text-left"
        >
          <div className="flex items-start">
            <BookOpen className="w-5 h-5 text-orange-600 mt-0.5 mr-3 flex-shrink-0" />
            <div>
              <h3 className="text-sm font-medium text-orange-800">How to Use This Tool</h3>
              {!isExpanded && (
                <p className="mt-1 text-sm text-orange-700">
                  Click to learn how to make the most of the African-Inspired Emotional Intelligence Generator.
                </p>
              )}
            </div>
          </div>
          {isExpanded ? (
            <ChevronUp className="w-5 h-5 text-orange-600" />
          ) : (
            <ChevronDown className="w-5 h-5 text-orange-600" />
          )}
        </button>
        
        {isExpanded && (
          <div className="mt-4 text-sm text-orange-700 space-y-4 pl-8">
            <h4 className="font-medium text-orange-800 mb-2">Guidelines for Using the African-Inspired Emotional Intelligence Generator</h4>
            
            <ol className="list-decimal pl-5 space-y-3">
              <li>
                <strong>Input Your Challenge:</strong>
                <p className="mt-1">Start by typing a real-life challenge or emotional situation you're facing into the prompt box.</p>
              </li>

              <li>
                <strong>Explore the Results:</strong>
                <ul className="list-disc pl-5 mt-1 space-y-1">
                  <li>Receive African-inspired proverbs categorized into key Emotional Intelligence (EI) areas: Self-awareness, Self-regulation, Empathy, Social Skills, and Motivation.</li>
                  <li>Each proverb includes its country of origin and a brief explanation to help you apply its wisdom.</li>
                </ul>
              </li>

              <li>
                <strong>Engage with Visuals:</strong>
                <p className="mt-1">Hover over the category images to see definitions of each EI area and understand how it relates to managing emotions.</p>
              </li>

              <li>
                <strong>Reflect and Apply:</strong>
                <p className="mt-1">Use the explanations and actionable tips provided with each proverb to reflect on your situation and navigate it effectively.</p>
              </li>

              <li>
                <strong>Save and Share:</strong>
                <p className="mt-1">Save your favorite proverbs or share them on social media for inspiration with friends and family.</p>
              </li>

              <li>
                <strong>Learn More:</strong>
                <p className="mt-1">Explore additional proverbs, search by category or country, and discover the deeper cultural context behind each saying.</p>
              </li>

              <li>
                <strong>Daily Inspiration:</strong>
                <p className="mt-1">Use the "Random Inspiration" feature for a daily dose of African wisdom to boost your emotional intelligence.</p>
              </li>

              <li>
                <strong>Respect the Content:</strong>
                <p className="mt-1">Remember that the proverbs reflect cultural traditions and philosophies. Use them thoughtfully and respectfully.</p>
              </li>
            </ol>

            <p className="italic">
              By following these steps, you'll make the most of the app's features and deepen your understanding of 
              Emotional Intelligence through the lens of African wisdom.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}