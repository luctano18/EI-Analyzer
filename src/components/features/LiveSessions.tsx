import React from 'react';
import { Users, Calendar, Clock, AlertCircle } from 'lucide-react';

export default function LiveSessions() {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-start space-x-4 mb-6">
        <div className="bg-amber-100 p-3 rounded-full">
          <Users className="w-6 h-6 text-amber-600" />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-gray-900">Live Wisdom Circles</h3>
          <p className="text-gray-600 mt-1">
            Join group discussions and share experiences with others on their emotional intelligence journey.
          </p>
        </div>
      </div>

      <div className="bg-gray-50 border border-gray-100 rounded-lg p-6">
        <div className="flex items-start space-x-3">
          <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-medium text-gray-900">No Active Sessions</h4>
            <p className="text-gray-600 mt-1">
              There are currently no live wisdom circles in session. Check our upcoming schedule below.
            </p>
          </div>
        </div>

        <div className="mt-6 space-y-4">
          <h4 className="font-medium text-gray-900 flex items-center gap-2">
            <Calendar className="w-4 h-4 text-amber-600" />
            Upcoming Sessions
          </h4>
          
          <div className="grid gap-4">
            {[
              {
                title: "Emotional Resilience Circle",
                date: "Next Tuesday",
                time: "2:00 PM CST",
                facilitator: "Dr. Remi Douah"
              },
              {
                title: "African Wisdom & Modern Life",
                date: "Next Thursday",
                time: "6:00 PM CST",
                facilitator: "Dr. Remi Douah"
              }
            ].map((session, index) => (
              <div 
                key={index}
                className="bg-white p-4 rounded-lg border border-gray-200 hover:border-amber-200 transition-colors"
              >
                <h5 className="font-medium text-gray-900">{session.title}</h5>
                <div className="mt-2 space-y-1 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{session.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{session.time}</span>
                  </div>
                  <div className="text-amber-600">
                    Facilitator: {session.facilitator}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-6">
            <button 
              className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
              onClick={() => {
                window.open('https://zoom.us', '_blank');
              }}
            >
              Register for Sessions
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}