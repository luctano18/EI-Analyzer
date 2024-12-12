import React from 'react';
import ConsentHeader from './ConsentHeader';
import ConsentIntroduction from './ConsentIntroduction';
import DataUsageSection from './DataUsageSection';
import DataProtectionSection from './DataProtectionSection';
import ConsentOptions from './ConsentOptions';
import ConsentFooter from './ConsentFooter';

interface Props {
  onConsentChange: (hasConsent: boolean) => void;
}

export default function DataPrivacyConsent({ onConsentChange }: Props) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100">
      <div className="p-6">
        <ConsentHeader />
        <ConsentIntroduction />
        <DataUsageSection />
        <DataProtectionSection />
        <ConsentOptions onConsentChange={onConsentChange} />
        <ConsentFooter />
      </div>
    </div>
  );
}