import React, { useState } from 'react';
import { Map } from 'lucide-react';
import AfricanMap from './AfricanMap';

export default function MapButton() {
  const [showMap, setShowMap] = useState(false);

  return (
    <>
      <button
        onClick={() => setShowMap(true)}
        className="group relative flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300"
      >
        <div className="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+CiAgPHBhdGggZD0iTTAgMGg2MHY2MEgweiIgZmlsbD0ibm9uZSIvPgogIDxwYXRoIGQ9Ik0zMCAzMEwxNSA0NWwxNS0xNS0xNS0xNSAxNSAxNSAxNS0xNS0xNSAxNSAxNSAxNXoiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIi8+Cjwvc3ZnPg==')] group-hover:opacity-30 transition-opacity duration-300"></div>
        <Map className="w-5 h-5 relative z-10" />
        <span className="relative z-10 font-medium">Explore African Map</span>
      </button>

      {showMap && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-xl w-full max-w-6xl animate-fadeIn">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-900">
                  African Cultural Heritage Map
                </h2>
                <button
                  onClick={() => setShowMap(false)}
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <AfricanMap />
            </div>
          </div>
        </div>
      )}
    </>
  );
}