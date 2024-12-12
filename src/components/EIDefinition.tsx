import React, { useState } from 'react';
import { Brain, ChevronDown, ChevronUp } from 'lucide-react';

export default function EIDefinition() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-gradient-to-r from-purple-50 to-indigo-50 border-l-4 border-purple-600 p-4 mb-8">
      <div className="flex flex-col">
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-start justify-between w-full text-left"
        >
          <div className="flex items-start">
            <Brain className="w-5 h-5 text-purple-600 mt-0.5 mr-3 flex-shrink-0" />
            <div>
              <h3 className="text-sm font-medium text-purple-800">Understanding Emotional Intelligence</h3>
              {!isExpanded && (
                <p className="mt-1 text-sm text-purple-700">
                  Click to learn about the five components of Emotional Intelligence (EI).
                </p>
              )}
            </div>
          </div>
          {isExpanded ? (
            <ChevronUp className="w-5 h-5 text-purple-600" />
          ) : (
            <ChevronDown className="w-5 h-5 text-purple-600" />
          )}
        </button>
        
        {isExpanded && (
          <div className="mt-4 text-sm text-purple-700 space-y-4 pl-8">
            <p>
              Emotional intelligence (EI) refers to the ability to recognize, understand, and manage one's own emotions, 
              as well as those of others. This concept is broken down into five key components:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white bg-opacity-50 p-4 rounded-lg">
                <h4 className="font-semibold text-purple-800 mb-2">1. Self-awareness</h4>
                <p>The ability to recognize your own emotions and how they affect your thoughts and behavior.</p>
              </div>

              <div className="bg-white bg-opacity-50 p-4 rounded-lg">
                <h4 className="font-semibold text-purple-800 mb-2">2. Self-regulation</h4>
                <p>The ability to control or redirect disruptive emotions and impulses.</p>
              </div>

              <div className="bg-white bg-opacity-50 p-4 rounded-lg">
                <h4 className="font-semibold text-purple-800 mb-2">3. Motivation</h4>
                <p>A passion to work for internal reasons beyond money or status.</p>
              </div>

              <div className="bg-white bg-opacity-50 p-4 rounded-lg">
                <h4 className="font-semibold text-purple-800 mb-2">4. Empathy</h4>
                <p>The ability to understand the emotions of others and react accordingly.</p>
              </div>

              <div className="bg-white bg-opacity-50 p-4 rounded-lg md:col-span-2">
                <h4 className="font-semibold text-purple-800 mb-2">5. Social Skills</h4>
                <p>The ability to manage relationships to move people in desired directions.</p>
              </div>
            </div>

            <p>
              These five components form the foundation of emotional intelligence, helping individuals 
              navigate both personal and professional relationships with greater understanding and control.
            </p>

            <p className="text-xs text-purple-600 italic">
              Source: Petrides, K. V., & Furnham, A. (2001). Trait emotional intelligence: 
              Psychometric investigation with reference to established trait taxonomies. 
              European Journal of Personality, 15(6), 425-448.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}