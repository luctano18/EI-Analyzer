import React, { useState, useRef, useEffect } from 'react';
import { Search, X, HelpCircle } from 'lucide-react';
import { UserInput } from '../types';
import InfoModal from './info/InfoModal';
import HowToContent from './info/HowToContent';

interface Props {
  onSubmit: (input: UserInput) => void;
}

const emotions = [
  { value: 'acceptance', label: 'Acceptance', category: 'positive' },
  { value: 'anger', label: 'Anger', category: 'challenging' },
  { value: 'anxiety', label: 'Anxiety', category: 'challenging' },
  { value: 'apathy', label: 'Apathy', category: 'challenging' },
  { value: 'confusion', label: 'Confusion', category: 'challenging' },
  { value: 'despair', label: 'Despair', category: 'challenging' },
  { value: 'determination', label: 'Determination', category: 'positive' },
  { value: 'embarrassment', label: 'Embarrassment', category: 'challenging' },
  { value: 'empathy', label: 'Empathy', category: 'positive' },
  { value: 'excitement', label: 'Excitement', category: 'positive' },
  { value: 'fear', label: 'Fear', category: 'challenging' },
  { value: 'freedom', label: 'Freedom', category: 'positive' },
  { value: 'frustration', label: 'Frustration', category: 'challenging' },
  { value: 'gratitude', label: 'Gratitude', category: 'positive' },
  { value: 'guilt', label: 'Guilt', category: 'challenging' },
  { value: 'heartbreak', label: 'Heartbreak', category: 'challenging' },
  { value: 'homesickness', label: 'Homesickness', category: 'challenging' },
  { value: 'hope', label: 'Hope', category: 'positive' },
  { value: 'imposter-syndrome', label: 'Imposter Syndrome', category: 'challenging' },
  { value: 'insecurity', label: 'Insecurity', category: 'challenging' },
  { value: 'jealousy', label: 'Jealousy', category: 'challenging' },
  { value: 'loneliness', label: 'Loneliness', category: 'challenging' },
  { value: 'overwhelm', label: 'Overwhelm', category: 'challenging' },
  { value: 'peer-pressure', label: 'Peer Pressure', category: 'challenging' },
  { value: 'pride', label: 'Pride', category: 'positive' },
  { value: 'rejection', label: 'Rejection', category: 'challenging' },
  { value: 'relief', label: 'Relief', category: 'positive' },
  { value: 'reluctance', label: 'Reluctance', category: 'challenging' },
  { value: 'resilience', label: 'Resilience', category: 'positive' },
  { value: 'sadness', label: 'Sadness', category: 'challenging' },
  { value: 'self-doubt', label: 'Self-Doubt', category: 'challenging' },
  { value: 'social-anxiety', label: 'Social Anxiety', category: 'challenging' },
  { value: 'stress', label: 'Stress', category: 'challenging' },
  { value: 'uncertainty', label: 'Uncertainty', category: 'challenging' },
  { value: 'validation-seeking', label: 'Validation-Seeking', category: 'challenging' },
  { value: 'vulnerability', label: 'Vulnerability', category: 'challenging' },
];

export default function ChallengeInput({ onSubmit }: Props) {
  const [challenge, setChallenge] = useState('');
  const [selectedEmotions, setSelectedEmotions] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isEmotionDropdownOpen, setIsEmotionDropdownOpen] = useState(false);
  const [showHowToModal, setShowHowToModal] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current && 
        !dropdownRef.current.contains(event.target as Node) &&
        searchInputRef.current &&
        !searchInputRef.current.contains(event.target as Node)
      ) {
        setIsEmotionDropdownOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedEmotions.length === 0) return;
    
    onSubmit({ 
      challenge, 
      emotions: selectedEmotions 
    });
    setSearchTerm('');
    setIsEmotionDropdownOpen(false);
  };

  const handleEmotionSelect = (value: string) => {
    if (selectedEmotions.length < 3) {
      setSelectedEmotions(prev => [...prev, value]);
      setSearchTerm('');
      setIsEmotionDropdownOpen(false);
    }
  };

  const handleRemoveEmotion = (valueToRemove: string) => {
    setSelectedEmotions(prev => prev.filter(value => value !== valueToRemove));
  };

  const handleSearchFocus = () => {
    setSearchTerm('');
    setIsEmotionDropdownOpen(true);
  };

  const getEmotionLabel = (value: string) => {
    return emotions.find(e => e.value === value)?.label || value;
  };

  const getEmotionCategory = (value: string) => {
    return emotions.find(e => e.value === value)?.category || 'challenging';
  };

  const filteredEmotions = emotions.filter(e => 
    e.label.toLowerCase().includes(searchTerm.toLowerCase()) &&
    !selectedEmotions.includes(e.value)
  );

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">


      <div className="space-y-6">
        <div>
          <label htmlFor="challenge" className="block text-xl font-semibold text-gray-900 mb-3">
            What is the challenge you are facing?
          </label>
          <textarea
            id="challenge"
            value={challenge}
            onChange={(e) => setChallenge(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            rows={4}
            placeholder="Share your situation..."
            required
          />
        </div>

        <div className="relative">
          <label className="block text-xl font-semibold text-gray-900 mb-3">
            How do you feel about it? (Select up to 3 emotions)
          </label>
          
          {selectedEmotions.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {selectedEmotions.map(value => (
                <span
                  key={value}
                  className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                    getEmotionCategory(value) === 'positive'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}
                >
                  {getEmotionLabel(value)}
                  <button
                    type="button"
                    onClick={() => handleRemoveEmotion(value)}
                    className="ml-2 focus:outline-none"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </span>
              ))}
            </div>
          )}

          {selectedEmotions.length < 3 && (
            <div className="relative">
              <input
                ref={searchInputRef}
                type="text"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setIsEmotionDropdownOpen(true);
                }}
                onFocus={handleSearchFocus}
                placeholder="Search or select emotions..."
                className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              />
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            </div>
          )}

          {isEmotionDropdownOpen && selectedEmotions.length < 3 && (
            <div 
              ref={dropdownRef}
              className="absolute z-10 w-full mt-1 bg-white rounded-md shadow-lg max-h-60 overflow-auto"
            >
              <div className="p-2 grid grid-cols-1 sm:grid-cols-2 gap-1">
                {filteredEmotions.map((emotion) => (
                  <button
                    key={emotion.value}
                    type="button"
                    onClick={() => handleEmotionSelect(emotion.value)}
                    className={`text-left px-4 py-2 rounded-md hover:bg-amber-50 transition-colors ${
                      emotion.category === 'positive'
                        ? 'border-l-4 border-green-400'
                        : 'border-l-4 border-amber-400'
                    }`}
                  >
                    {emotion.label}
                  </button>
                ))}
                {filteredEmotions.length === 0 && (
                  <p className="col-span-2 p-4 text-center text-gray-500">
                    No emotions found matching your search
                  </p>
                )}
              </div>
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={!challenge || selectedEmotions.length === 0}
          className="w-full py-3 px-6 bg-gradient-to-r from-amber-600 to-orange-500 text-white rounded-md hover:from-amber-700 hover:to-orange-600 transition-colors duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Seek Wisdom
        </button>
      </div>

      <InfoModal
        title="How to Use This Tool"
        isOpen={showHowToModal}
        onClose={() => setShowHowToModal(false)}
      >
        <HowToContent />
      </InfoModal>
    </form>
  );
}