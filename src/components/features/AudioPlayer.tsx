import React, { useState, useEffect } from 'react';
import { useAudioPlayer } from 'react-use-audio-player';
import { Play, Pause, Volume2, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';

interface Song {
  id: string;
  title: string;
  country: string;
  context: string;
  tourismHighlight: string;
  audioUrl: string;
  mood: string[];
}

interface Props {
  userChallenge?: string;
  userEmotions?: string[];
}

const musicLibrary: Song[] = [
  {
    id: '1',
    title: "Kora Serenity",
    country: "Senegal",
    context: "Traditional kora music played during moments of reflection and healing",
    tourismHighlight: "Visit the historic Djoudj National Bird Sanctuary, home to millions of migratory birds",
    audioUrl: "/audio/kora-serenity.mp3",
    mood: ["calm", "sad", "anxious"]
  },
  {
    id: '2',
    title: "Drums of Joy",
    country: "Ghana",
    context: "Celebratory drumming patterns from the Ashanti tradition",
    tourismHighlight: "Explore the ancient Ashanti Kingdom's golden stool at Manhyia Palace",
    audioUrl: "/audio/drums-joy.mp3",
    mood: ["happy", "excited", "motivated"]
  },
  {
    id: '3',
    title: "Desert Meditation",
    country: "Mali",
    context: "Tuareg desert blues inspiring perseverance and hope",
    tourismHighlight: "Experience the mystical city of Timbuktu, a UNESCO World Heritage site",
    audioUrl: "/audio/desert-meditation.mp3",
    mood: ["contemplative", "determined", "hopeful"]
  }
];

export default function AudioPlayer({ userChallenge, userEmotions }: Props) {
  const [selectedSong, setSelectedSong] = useState<Song | null>(null);
  const { togglePlayPause, playing, volume, setVolume, load } = useAudioPlayer();
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    if (!userChallenge || !userEmotions?.length) {
      setShowPrompt(true);
      return;
    }

    // Recommend music based on user's emotions
    const recommendedSong = musicLibrary.find(song => 
      song.mood.some(m => userEmotions.includes(m))
    ) || musicLibrary[0];

    setSelectedSong(recommendedSong);
    load(recommendedSong.audioUrl, {
      autoplay: false,
      format: 'mp3'
    });
  }, [userChallenge, userEmotions]);

  if (showPrompt) {
    return (
      <div className="bg-amber-50 p-4 rounded-lg">
        <div className="flex items-start space-x-3">
          <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-medium text-amber-800">Complete Your Journey</h3>
            <p className="text-sm text-amber-700 mt-1">
              Please share your challenge and emotions first to receive personalized music recommendations.
            </p>
            <button
              onClick={() => {
                setShowPrompt(false);
                toast.error('Please complete the challenge form above first');
              }}
              className="mt-2 text-sm text-amber-600 hover:text-amber-700"
            >
              Go to Challenge Form
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!selectedSong) return null;

  return (
    <div className="space-y-4">
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="font-semibold text-lg">{selectedSong.title}</h3>
            <p className="text-sm text-gray-600">{selectedSong.country}</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Volume2 className="w-4 h-4 text-gray-600" />
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                className="w-24"
              />
            </div>
            <button
              onClick={togglePlayPause}
              className="p-2 bg-amber-600 text-white rounded-full hover:bg-amber-700 transition-colors"
            >
              {playing ? (
                <Pause className="w-5 h-5" />
              ) : (
                <Play className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        <div className="space-y-2 text-sm">
          <p className="text-gray-700">{selectedSong.context}</p>
          <div className="bg-amber-50 p-3 rounded-lg">
            <p className="text-amber-800">
              <span className="font-medium">Tourism Highlight:</span>{' '}
              {selectedSong.tourismHighlight}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}