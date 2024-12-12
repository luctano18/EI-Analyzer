import React from 'react';

export default function EIContent() {
  return (
    <div className="space-y-6">
      <p>
        Emotional intelligence (EI) refers to the ability to recognize, understand, and manage one's own emotions, 
        as well as those of others. This concept is broken down into five key components:
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-amber-50 p-4 rounded-lg">
          <h4 className="font-semibold text-amber-800 mb-2">1. Self-awareness</h4>
          <p>The ability to recognize your own emotions and their impact</p>
        </div>

        <div className="bg-amber-50 p-4 rounded-lg">
          <h4 className="font-semibold text-amber-800 mb-2">2. Self-regulation</h4>
          <p>Managing emotions and impulses effectively</p>
        </div>

        <div className="bg-amber-50 p-4 rounded-lg">
          <h4 className="font-semibold text-amber-800 mb-2">3. Motivation</h4>
          <p>Internal drive beyond external rewards</p>
        </div>

        <div className="bg-amber-50 p-4 rounded-lg">
          <h4 className="font-semibold text-amber-800 mb-2">4. Empathy</h4>
          <p>Understanding and sharing others' emotions</p>
        </div>

        <div className="bg-amber-50 p-4 rounded-lg md:col-span-2">
          <h4 className="font-semibold text-amber-800 mb-2">5. Social Skills</h4>
          <p>Building and maintaining effective relationships</p>
        </div>
      </div>
    </div>
  );
}