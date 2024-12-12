import React, { useState } from 'react';
import { AlertCircle, ChevronDown, ChevronUp } from 'lucide-react';

export default function Disclaimer() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-amber-50 border-l-4 border-amber-600 p-4 mb-8">
      <div className="flex flex-col">
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-start justify-between w-full text-left"
        >
          <div className="flex items-start">
            <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5 mr-3 flex-shrink-0" />
            <div>
              <h3 className="text-sm font-medium text-amber-800">Important Disclaimer</h3>
              {!isExpanded && (
                <p className="mt-1 text-sm text-amber-700">
                  Click to read our full disclaimer about the African-Inspired Emotional Intelligence Generator.
                </p>
              )}
            </div>
          </div>
          {isExpanded ? (
            <ChevronUp className="w-5 h-5 text-amber-600" />
          ) : (
            <ChevronDown className="w-5 h-5 text-amber-600" />
          )}
        </button>
        
        {isExpanded && (
          <div className="mt-4 text-sm text-amber-700 space-y-4 pl-8">
            <p>
              The African-Inspired Emotional Intelligence Generator is a tool designed for educational 
              and inspirational purposes only. The proverbs, explanations, and insights provided are 
              drawn from a variety of cultural sources and traditions to encourage reflection, 
              emotional growth, and personal development.
            </p>

            <div>
              <h4 className="font-medium text-amber-800 mb-2">Please note the following:</h4>
              <ol className="list-decimal pl-5 space-y-3">
                <li>
                  <strong>Cultural Sensitivity:</strong> While we strive to represent the richness 
                  and diversity of African cultures, the interpretations and applications of the 
                  proverbs are generalized and may not reflect the full complexity of the original 
                  cultural contexts. Users are encouraged to explore further and seek additional 
                  insights where necessary.
                </li>
                <li>
                  <strong>Not a Substitute for Professional Advice:</strong> The content provided 
                  is not intended to replace professional advice, therapy, counseling, or other 
                  forms of emotional or mental health support. If you are experiencing significant 
                  emotional distress or mental health challenges, please consult a qualified 
                  professional.
                </li>
                <li>
                  <strong>Accuracy of Information:</strong> Every effort has been made to ensure 
                  the accuracy and authenticity of the proverbs and their origins. However, due 
                  to variations in oral traditions and translations, some interpretations may 
                  differ. The platform does not claim complete authority on cultural or emotional 
                  topics.
                </li>
                <li>
                  <strong>User Responsibility:</strong> Users are responsible for how they apply 
                  the advice and insights offered by the platform. The creators of this tool are 
                  not liable for any outcomes resulting from the use or misuse of the provided 
                  content.
                </li>
                <li>
                  <strong>Cultural Representation:</strong> This tool is meant to celebrate and 
                  share the wisdom of African cultures with a global audience. It is not 
                  exhaustive and may not fully capture the breadth of traditions, beliefs, or 
                  philosophies from all African countries or communities.
                </li>
              </ol>
            </div>

            <p>
              By using this tool, you acknowledge and agree to these terms and understand its 
              purpose as a source of guidance and inspiration rather than definitive advice or 
              cultural authority.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}