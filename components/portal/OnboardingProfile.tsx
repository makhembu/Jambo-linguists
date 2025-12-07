import React from 'react';
import { CheckCircle } from 'lucide-react';
import { ProfileLanguageForm } from './onboarding/ProfileLanguageForm';
import { ProfileComplianceForm } from './onboarding/ProfileComplianceForm';

export const OnboardingProfile = ({ onFinish, onBack }: { onFinish: () => void, onBack: () => void }) => {
  return (
    <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-right-8 duration-500 py-6">
      <div className="text-center mb-10">
        <span className="text-brand-orange font-bold tracking-[0.2em] text-xs uppercase mb-3 block">Step 3 of 3</span>
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-jambo-950 mb-4">Complete Your Profile</h2>
        <div className="bg-white/60 backdrop-blur-sm p-4 rounded-xl inline-block border border-white/50">
           <p className="text-gray-600 font-light text-lg">
             To activate your account for assignments, we need to verify your credentials.
           </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-xl shadow-jambo-900/5 border border-white/50 ring-1 ring-black/5 overflow-hidden">
         <ProfileLanguageForm />
         <ProfileComplianceForm />

         <div className="p-8 border-t border-gray-100 flex items-center justify-between bg-white">
            <button onClick={onBack} className="text-gray-400 hover:text-jambo-600 text-sm font-medium px-4 transition-colors">
                Back to Terms
            </button>
            <button 
              onClick={onFinish}
              className="bg-brand-orange hover:bg-orange-600 text-white font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-orange-500/30 transition-all flex items-center gap-2 transform hover:translate-x-1"
            >
              Submit Profile for Review
              <CheckCircle size={20} />
            </button>
         </div>
      </div>
    </div>
  );
};