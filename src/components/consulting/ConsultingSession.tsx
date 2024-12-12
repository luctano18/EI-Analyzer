import React, { useState, useEffect } from 'react';
import { Clock, Send, X } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import toast from 'react-hot-toast';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: string;
}

export default function ConsultingSession() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null);
  const [sessionActive, setSessionActive] = useState(false);

  useEffect(() => {
    checkActiveSession();
    let timer: number | undefined;

    if (sessionActive && timeRemaining !== null && timeRemaining > 0) {
      timer = window.setInterval(() => {
        setTimeRemaining(prev => {
          if (prev === null || prev <= 0) {
            endSession();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timer) {
        window.clearInterval(timer);
      }
    };
  }, [sessionActive, timeRemaining]);

  const checkActiveSession = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: planData } = await supabase
        .from('user_plans')
        .select('*')
        .eq('user_id', user.id)
        .gt('minutes_remaining', 0)
        .gt('expires_at', new Date().toISOString())
        .single();

      if (planData) {
        setTimeRemaining(planData.minutes_remaining * 60);
      }
    } catch (error) {
      console.error('Error checking session:', error);
    }
  };

  const startSession = () => {
    if (!timeRemaining) {
      toast.error('No consulting time available. Please purchase a plan.');
      return;
    }

    setSessionActive(true);
    setMessages([
      {
        id: 'welcome',
        content: 'Welcome to your consulting session! How can I help you today?',
        sender: 'ai',
        timestamp: new Date().toISOString()
      }
    ]);
  };

  const endSession = async () => {
    setSessionActive(false);
    
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const minutesUsed = Math.ceil((timeRemaining || 0) / 60);
      await supabase.rpc('update_consulting_minutes', {
        p_user_id: user.id,
        p_minutes_used: minutesUsed
      });

      toast.success('Session ended. Thank you for consulting with us!');
    } catch (error) {
      console.error('Error ending session:', error);
    }
  };

  const sendMessage = async () => {
    if (!input.trim() || !sessionActive) return;

    const newMessage: Message = {
      id: Math.random().toString(),
      content: input.trim(),
      sender: 'user',
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, newMessage]);
    setInput('');
    setIsLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const aiResponse: Message = {
        id: Math.random().toString(),
        content: 'This is a simulated AI response. In production, this would be connected to your AI backend.',
        sender: 'ai',
        timestamp: new Date().toISOString()
      };

      setMessages(prev => [...prev, aiResponse]);
    } catch (error) {
      toast.error('Failed to get response. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-amber-500 p-4 flex items-center justify-between">
          <h2 className="text-white font-semibold text-lg">AI Consulting Session</h2>
          <div className="flex items-center space-x-4">
            {timeRemaining !== null && (
              <div className="flex items-center space-x-2 text-white">
                <Clock className="w-5 h-5" />
                <span>{formatTime(timeRemaining)}</span>
              </div>
            )}
            {sessionActive && (
              <button
                onClick={endSession}
                className="text-white hover:text-red-100 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            )}
          </div>
        </div>

        <div className="h-[500px] flex flex-col">
          {!sessionActive ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  Start Your Consulting Session
                </h3>
                <p className="text-gray-600 mb-6">
                  {timeRemaining
                    ? `You have ${Math.ceil(timeRemaining / 60)} minutes available`
                    : 'Purchase a plan to start consulting'}
                </p>
                <button
                  onClick={startSession}
                  disabled={!timeRemaining}
                  className="px-6 py-2 bg-amber-500 text-white rounded-md hover:bg-amber-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Start Session
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
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
                          ? 'bg-amber-500 text-white'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      <p>{message.content}</p>
                      <span className="text-xs opacity-75 mt-1 block">
                        {new Date(message.timestamp).toLocaleTimeString()}
                      </span>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 rounded-lg p-3">
                      <div className="flex space-x-2">
                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" />
                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-100" />
                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-200" />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="border-t p-4">
                <div className="flex space-x-4">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                    placeholder="Type your message..."
                    className="flex-1 px-4 py-2 border rounded-md focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />
                  <button
                    onClick={sendMessage}
                    disabled={!input.trim() || isLoading}
                    className="px-4 py-2 bg-amber-500 text-white rounded-md hover:bg-amber-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}