import React from 'react';
import { ShieldCheck, UserCheck, Trash2, Lock } from 'lucide-react';

export default function ConsentInfo() {
  return (
    <div className="prose prose-amber max-w-none">
      <h3 className="text-xl font-medium text-gray-900 mb-4">Language for Youth Under 16</h3>
      <p className="text-gray-700 text-lg leading-relaxed">
        We care about your privacy and safety. Before you can create an account, 
        we need to make sure you have permission from your parent or legal guardian.
      </p>
      
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-6 rounded-xl mt-6">
        <h4 className="font-medium text-amber-900 text-lg mb-4">Important Information:</h4>
        <div className="grid gap-4">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-amber-100 rounded-lg">
              <UserCheck className="w-5 h-5 text-amber-600" />
            </div>
            <p className="text-amber-800 mt-1">
              Your parent or guardian must approve your account
            </p>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="p-2 bg-amber-100 rounded-lg">
              <ShieldCheck className="w-5 h-5 text-amber-600" />
            </div>
            <p className="text-amber-800 mt-1">
              We collect minimal personal information to protect your privacy
            </p>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="p-2 bg-amber-100 rounded-lg">
              <Trash2 className="w-5 h-5 text-amber-600" />
            </div>
            <p className="text-amber-800 mt-1">
              You can delete your account at any time
            </p>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="p-2 bg-amber-100 rounded-lg">
              <Lock className="w-5 h-5 text-amber-600" />
            </div>
            <p className="text-amber-800 mt-1">
              We never share your information with third parties
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}