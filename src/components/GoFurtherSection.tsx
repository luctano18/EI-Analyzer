import React from 'react';
import { BookOpen, Users, Video, MessageSquare } from 'lucide-react';

export default function GoFurtherSection() {
  return (
    <section className="mb-12 bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600">
          Go Further
        </h2>
        <div className="h-1 w-20 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full mx-auto mt-2"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <div className="p-3 bg-amber-100 rounded-lg w-fit mb-4">
            <BookOpen className="w-6 h-6 text-amber-600" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">Free Resources</h3>
          <p className="text-gray-600 text-sm mb-4">
            Access our library of African proverbs and emotional intelligence guides.
          </p>
          <button className="text-sm text-amber-600 hover:text-amber-700 font-medium">
            Browse Library →
          </button>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <div className="p-3 bg-amber-100 rounded-lg w-fit mb-4">
            <Users className="w-6 h-6 text-amber-600" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">Community Sessions</h3>
          <p className="text-gray-600 text-sm mb-4">
            Join group discussions and learn from shared experiences.
          </p>
          <button className="text-sm text-amber-600 hover:text-amber-700 font-medium">
            Join Session →
          </button>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <div className="p-3 bg-amber-100 rounded-lg w-fit mb-4">
            <Video className="w-6 h-6 text-amber-600" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">Live Workshops</h3>
          <p className="text-gray-600 text-sm mb-4">
            Attend interactive workshops with our emotional intelligence experts.
          </p>
          <button className="text-sm text-amber-600 hover:text-amber-700 font-medium">
            View Schedule →
          </button>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <div className="p-3 bg-amber-100 rounded-lg w-fit mb-4">
            <MessageSquare className="w-6 h-6 text-amber-600" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">Personal Coaching</h3>
          <p className="text-gray-600 text-sm mb-4">
            Get one-on-one guidance from certified emotional intelligence coaches.
          </p>
          <button className="text-sm text-amber-600 hover:text-amber-700 font-medium">
            Book Session →
          </button>
        </div>
      </div>
    </section>
  );
}