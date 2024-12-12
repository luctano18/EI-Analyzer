import React from 'react';
import { AlertCircle } from 'lucide-react';

interface Props {
  disclaimerAccepted: boolean;
  onDisclaimerAccept: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onContinue: () => void;
  showValidateButton: boolean;
}

export default function DisclaimerContent({
  disclaimerAccepted,
  onDisclaimerAccept,
  onContinue,
  showValidateButton
}: Props) {
  return (
    <div className="prose prose-amber max-w-none">
      <p className="lead text-lg text-gray-700">
        The African-Inspired Emotional Intelligence Generator is a tool designed for educational 
        and inspirational purposes only. The proverbs, explanations, and insights provided are 
        drawn from a variety of cultural sources and traditions to encourage reflection, 
        emotional growth, and personal development.
      </p>

      <div className="bg-amber-50 p-4 rounded-lg mt-6">
        <h4 className="font-medium text-amber-900 mb-4">Please note the following:</h4>
        <ol className="list-decimal list-inside space-y-4 text-amber-800">
          <li className="flex items-start gap-3">
            <div className="p-1 bg-amber-100 rounded-full mt-1">
              <AlertCircle className="w-4 h-4 text-amber-600" />
            </div>
            <span>
              <strong>Cultural Sensitivity:</strong> While we strive to represent the richness 
              and diversity of African cultures, interpretations and applications of proverbs 
              are generalized and may not reflect the full complexity of the original cultural 
              contexts. Users are encouraged to explore further and seek additional information 
              where necessary.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <div className="p-1 bg-amber-100 rounded-full mt-1">
              <AlertCircle className="w-4 h-4 text-amber-600" />
            </div>
            <span>
              <strong>Not a Substitute:</strong> The content provided is not intended to replace 
              professional advice, therapy, counseling, or other forms of emotional or mental 
              health support. If you are experiencing significant emotional distress or mental 
              health challenges, please consult a qualified professional.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <div className="p-1 bg-amber-100 rounded-full mt-1">
              <AlertCircle className="w-4 h-4 text-amber-600" />
            </div>
            <span>
              <strong>Accuracy:</strong> Every effort has been made to ensure the accuracy and 
              authenticity of the proverbs and their origins. However, due to variations in 
              oral traditions and translations, some interpretations may differ. The platform 
              does not claim to be a total authority on cultural or emotional subjects.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <div className="p-1 bg-amber-100 rounded-full mt-1">
              <AlertCircle className="w-4 h-4 text-amber-600" />
            </div>
            <span>
              <strong>User Responsibility:</strong> Users are responsible for how they apply 
              the advice and insights offered by the platform. The creators of this tool are 
              not liable for any outcomes resulting from the use or misuse of the content provided.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <div className="p-1 bg-amber-100 rounded-full mt-1">
              <AlertCircle className="w-4 h-4 text-amber-600" />
            </div>
            <span>
              <strong>Cultural Representation:</strong> This tool is meant to celebrate and 
              share the wisdom of African cultures with a global audience. It is not exhaustive 
              and may not fully capture the breadth of traditions, beliefs, or philosophies 
              from all African countries or communities.
            </span>
          </li>
        </ol>
      </div>

      <div className="mt-6">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={disclaimerAccepted}
            onChange={onDisclaimerAccept}
            className="mt-1.5 rounded text-amber-600 focus:ring-amber-500"
          />
          <span className="text-sm text-gray-700">
            By using this tool, I acknowledge and accept these terms and understand that it 
            serves as a source of guidance and inspiration rather than definitive advice or 
            cultural authority.
          </span>
        </label>
      </div>

      {showValidateButton && (
        <div className="mt-4 flex justify-center">
          <button
            onClick={onContinue}
            className="px-6 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
          >
            Validate and Continue
          </button>
        </div>
      )}
    </div>
  );
}