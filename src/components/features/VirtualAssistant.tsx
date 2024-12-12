import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Send, MessageSquare, Volume2, VolumeX } from 'lucide-react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import toast from 'react-hot-toast';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
}

export default function VirtualAssistant() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isVoiceMode, setIsVoiceMode] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const synthesis = window.speechSynthesis;

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
    isMicrophoneAvailable
  } = useSpeechRecognition();

  useEffect(() => {
    if (transcript) {
      setInput(transcript);
    }
  }, [transcript]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = async (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Math.random().toString(),
      text: text.trim(),
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    resetTranscript();

    // Simulate AI response
    setTimeout(() => {
      const response: Message = {
        id: Math.random().toString(),
        text: "I understand your perspective. Here's a relevant African proverb: 'The eye that has seen is different from the ear that has heard.' This wisdom reminds us that direct experience brings deeper understanding.",
        sender: 'assistant',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, response]);

      if (isVoiceMode && isAudioEnabled) {
        speakText(response.text);
      }
    }, 1000);
  };

  const speakText = (text: string) => {
    if (!isAudioEnabled) return;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    synthesis.speak(utterance);
  };

  const toggleVoiceMode = () => {
    if (!browserSupportsSpeechRecognition) {
      toast.error('Your browser does not support speech recognition.');
      return;
    }

    if (!isMicrophoneAvailable) {
      toast.error('Please enable microphone access to use voice input.');
      return;
    }

    setIsVoiceMode(!isVoiceMode);
    if (!isVoiceMode) {
      SpeechRecognition.startListening({ continuous: true });
    } else {
      SpeechRecognition.stopListening();
      resetTranscript();
    }
  };

  const toggleAudio = () => {
    setIsAudioEnabled(!isAudioEnabled);
    if (isSpeaking) {
      synthesis.cancel();
      setIsSpeaking(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="p-4 bg-amber-600 text-white flex justify-between items-center">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <MessageSquare className="w-5 h-5" />
          Virtual Assistant
        </h2>
        <div className="flex items-center gap-3">
          <button
            onClick={toggleAudio}
            className="p-2 hover:bg-amber-700 rounded-full transition-colors"
            title={isAudioEnabled ? 'Disable audio' : 'Enable audio'}
          >
            {isAudioEnabled ? (
              <Volume2 className="w-5 h-5" />
            ) : (
              <VolumeX className="w-5 h-5" />
            )}
          </button>
          <button
            onClick={toggleVoiceMode}
            className={`p-2 hover:bg-amber-700 rounded-full transition-colors ${
              isVoiceMode ? 'bg-amber-700' : ''
            }`}
            title={isVoiceMode ? 'Switch to text mode' : 'Switch to voice mode'}
          >
            {isVoiceMode ? (
              <Mic className={`w-5 h-5 ${listening ? 'animate-pulse' : ''}`} />
            ) : (
              <MicOff className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      <div className="h-96 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.sender === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`max-w-[80%] rounded-lg p-3 ${
                message.sender === 'user'
                  ? 'bg-amber-100 text-amber-900'
                  : 'bg-gray-100 text-gray-900'
              }`}
            >
              <p>{message.text}</p>
              <span className="text-xs opacity-50 mt-1 block">
                {message.timestamp.toLocaleTimeString()}
              </span>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSubmit(input)}
            placeholder={isVoiceMode ? 'Speak or type your message...' : 'Type your message...'}
            className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          />
          <button
            onClick={() => handleSubmit(input)}
            className="p-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
        {isVoiceMode && (
          <div className="mt-2 text-center text-sm text-gray-500">
            {listening ? 'Listening...' : 'Click the microphone to start speaking'}
          </div>
        )}
      </div>
    </div>
  );
}