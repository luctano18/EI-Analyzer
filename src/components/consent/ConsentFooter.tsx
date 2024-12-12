import React from 'react';
import { Mail, FileText, Phone } from 'lucide-react';

export default function ConsentFooter() {
  return (
    <div className="border-t mt-8 pt-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-gray-900">Contact Information</h4>
          <div className="space-y-1">
            <a 
              href="mailto:support@africanwisdom.org"
              className="flex items-center gap-2 text-sm text-gray-600 hover:text-amber-600"
            >
              <Mail className="w-4 h-4" />
              <span>support@africanwisdom.org</span>
            </a>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Phone className="w-4 h-4" />
              <span>1-800-WISDOM-EI</span>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <h4 className="text-sm font-medium text-gray-900">Legal Documents</h4>
          <div className="flex items-center gap-4">
            <button
              onClick={() => window.open('/privacy', '_blank')}
              className="flex items-center gap-1 text-sm text-amber-600 hover:text-amber-700"
            >
              <FileText className="w-4 h-4" />
              <span>Privacy Policy</span>
            </button>
            <button
              onClick={() => window.open('/terms', '_blank')}
              className="flex items-center gap-1 text-sm text-amber-600 hover:text-amber-700"
            >
              <FileText className="w-4 h-4" />
              <span>Terms of Service</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}