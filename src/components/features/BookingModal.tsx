import React, { useCallback, useRef, useState } from 'react';
import { Calendar, Mail, Phone, X, Globe, Loader } from 'lucide-react';
import { createZoomMeeting, sendMeetingConfirmation } from '../../lib/zoom';
import { supabase } from '../../lib/supabase';
import toast from 'react-hot-toast';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  const handleOverlayClick = useCallback((e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  }, [onClose]);

  const handleEmailClick = () => {
    window.location.href = 'mailto:info@846s.org';
  };

  const handleWebsiteClick = () => {
    window.open('https://www.846s.org', '_blank');
  };

  const handleScheduleMeeting = async () => {
    try {
      setIsLoading(true);

      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast.error('Please sign in to schedule a meeting');
        return;
      }

      const { data: profile } = await supabase
        .from('profiles')
        .select('email')
        .eq('id', user.id)
        .single();

      if (!profile?.email) {
        toast.error('Email not found in profile');
        return;
      }

      const now = new Date();
      const meetingDetails = {
        topic: "EI Analyzer Consultation",
        startTime: now.toISOString(),
        duration: 60,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        agenda: "Personal consultation session"
      };

      const zoomMeeting = await createZoomMeeting(meetingDetails);
      
      await sendMeetingConfirmation(
        profile.email,
        zoomMeeting,
        meetingDetails
      );

      toast.success('Meeting scheduled successfully! Check your email for details.');
      onClose();
    } catch (error: any) {
      console.error('Error scheduling meeting:', error);
      toast.error(error.message || 'Failed to schedule meeting. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={handleOverlayClick}
    >
      <div 
        ref={modalRef}
        className="bg-white rounded-lg w-full max-w-sm animate-fadeIn"
      >
        <div className="p-4">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-xl font-bold text-gray-900">Book Appointment</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-4">
            <div className="bg-amber-50 p-3 rounded-lg flex items-center space-x-3">
              <img
                src="https://globevisions.io/epimap/img/Remi%20Douah.jpg"
                alt="Dr. Remi Douah"
                className="w-16 h-16 rounded-full object-cover border-2 border-white shadow"
              />
              <div>
                <h3 className="font-semibold text-amber-900 text-sm">
                  Remi Douah, Ph.D., M.P.H.
                </h3>
                <p className="text-amber-800 text-sm">Emotional Intelligence Coach</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-sm">
              <button
                onClick={handleEmailClick}
                className="flex items-center space-x-2 p-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <Mail className="w-4 h-4 text-amber-600" />
                <span className="text-gray-700">info@846s.org</span>
              </button>

              <button
                onClick={handleWebsiteClick}
                className="flex items-center space-x-2 p-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <Globe className="w-4 h-4 text-amber-600" />
                <span className="text-gray-700">846s.org</span>
              </button>

              <div className="flex items-center space-x-2 p-2 bg-gray-50 rounded-lg col-span-2">
                <Phone className="w-4 h-4 text-amber-600 flex-shrink-0" />
                <div className="text-gray-700">
                  612-716-0100 | 612-447-9733
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <button
                onClick={handleScheduleMeeting}
                disabled={isLoading}
                className="block w-full py-2 px-4 bg-amber-600 text-white text-center rounded-lg hover:bg-amber-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <Loader className="w-4 h-4 animate-spin" />
                    <span>Scheduling...</span>
                  </>
                ) : (
                  <span>Schedule Zoom Meeting</span>
                )}
              </button>
              
              <button
                onClick={handleEmailClick}
                className="block w-full py-2 px-4 border border-amber-600 text-amber-600 text-center rounded-lg hover:bg-amber-50 transition-colors text-sm"
              >
                Send Email
              </button>
            </div>

            <p className="text-xs text-gray-500 text-center">
              Available Mon-Fri, 9AM-5PM CST
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}