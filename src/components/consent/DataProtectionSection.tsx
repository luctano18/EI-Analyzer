import React from 'react';
import { Lock, Shield, Users } from 'lucide-react';

const protectionMeasures = [
  {
    icon: <Lock className="w-5 h-5" />,
    title: "Complete Anonymization",
    description: "All personal identifiers are removed before analysis"
  },
  {
    icon: <Shield className="w-5 h-5" />,
    title: "Secure Storage",
    description: "Data is stored on encrypted servers with strict access controls"
  },
  {
    icon: <Users className="w-5 h-5" />,
    title: "Ethical Usage",
    description: "Data is only shared with verified research partners"
  }
];

export default function DataProtectionSection() {
  return (
    <div className="space-y-4 mb-8">
      <h3 className="text-lg font-medium text-gray-900">How We Protect Your Data</h3>
      
      <div className="grid gap-4 sm:grid-cols-3">
        {protectionMeasures.map((measure, index) => (
          <div 
            key={index}
            className="p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-white rounded-full text-amber-600">
                {measure.icon}
              </div>
              <h4 className="font-medium text-gray-900">{measure.title}</h4>
            </div>
            <p className="text-sm text-gray-600">{measure.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}