import React, { useState } from 'react';
import { UserPlus } from 'lucide-react';
import SignUpModal2 from './SignUpModal2';

export default function SignUpButton2() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="group relative flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300"
      >
        <div className="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+CiAgPHBhdGggZD0iTTAgMGg2MHY2MEgweiIgZmlsbD0ibm9uZSIvPgogIDxwYXRoIGQ9Ik0zMCAzMEwxNSA0NWwxNS0xNS0xNS0xNSAxNSAxNSAxNS0xNS0xNSAxNSAxNSAxNXoiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIi8+Cjwvc3ZnPg==')] group-hover:opacity-30 transition-opacity duration-300"></div>
        <UserPlus className="w-5 h-5 relative z-10" />
        <span className="relative z-10 font-medium">Create Account</span>
      </button>

      <SignUpModal2 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}