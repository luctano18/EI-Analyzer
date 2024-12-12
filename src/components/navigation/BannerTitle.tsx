import React from 'react';
import { Brain } from 'lucide-react';

export default function BannerTitle() {
  return (
    <div className="flex items-center gap-6">
      <div className="flex-shrink-0 bg-white/10 p-3 rounded-lg">
        <img
          src="/images/epimap247logo.png"
          alt="EPIMAP247 Logo"
          className="w-12 h-12 object-contain rounded"
          onError={(e) => {
            const img = e.target as HTMLImageElement;
            img.style.display = 'none';
            const parent = img.parentElement;
            if (parent) {
              parent.appendChild(
                Object.assign(document.createElement('div'), {
                  className: 'w-12 h-12 flex items-center justify-center',
                  innerHTML: '<svg className="w-8 h-8 text-amber-200" viewBox="0 0 24 24"><path fill="currentColor" d="M2 12C2 6.48 6.48 2 12 2s10 4.48 10 10-4.48 10-10 10S2 17.52 2 12zm10 6c3.31 0 6-2.69 6-6s-2.69-6-6-6-6 2.69-6 6 2.69 6 6 6z"/></svg>'
                })
              );
            }
          }}
        />
      </div>
      
      <div className="flex flex-col">
        <h1 className="text-2xl font-bold text-white tracking-wide">
          EMOTIONAL INTELLIGENCE ANALYZER (EI ANALYZER)
        </h1>
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <Brain className="w-4 h-4 text-amber-200" />
            <p className="text-amber-100 text-sm font-medium">
              Emotional Intelligence Inspired by African Wisdom
            </p>
          </div>
          <div className="text-center">
            <p className="text-white/90 text-[11px] max-w-2xl">
              Discover the ancient wisdom and modern analysis of emotional intelligence through personalized AI and live coaching sessions
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}