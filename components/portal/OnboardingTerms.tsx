import React, { useState } from 'react';
import { Shield } from 'lucide-react';
import { TermsDocument } from './onboarding/TermsDocument';
import { TermsActions } from './onboarding/TermsActions';

export const OnboardingTerms = ({ onNext, onBack }: { onNext: () => void, onBack: () => void }) => {
  const [scrolledToBottom, setScrolledToBottom] = useState(false);

  return (
    <div className="max-w-6xl mx-auto animate-in fade-in slide-in-from-right-8 duration-500 py-6">
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
         <div>
            <span className="text-brand-orange font-bold tracking-[0.2em] text-xs uppercase mb-2 block">Step 2 of 3</span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-jambo-950">Compliance & Standards</h2>
         </div>
         <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-jambo-100 shadow-sm rounded-lg text-jambo-700 text-sm font-medium w-fit">
            <Shield size={16} />
            The Gatekeeper Check
         </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <TermsDocument onScrollBottom={() => setScrolledToBottom(true)} />
        <TermsActions 
          scrolledToBottom={scrolledToBottom} 
          onNext={onNext} 
          onBack={onBack} 
        />
      </div>
    </div>
  );
};