import React, { useState } from 'react';
import { ArrowRight, AlertCircle, CheckCircle } from 'lucide-react';

interface TermsActionsProps {
  scrolledToBottom: boolean;
  onNext: () => void;
  onBack: () => void;
}

export const TermsActions = ({ scrolledToBottom, onNext, onBack }: TermsActionsProps) => {
  const [agreed, setAgreed] = useState({ conduct: false, privacy: false });
  const allAgreed = agreed.conduct && agreed.privacy;

  return (
    <div className="space-y-6 flex flex-col h-full">
       <div className="bg-white p-6 rounded-xl shadow-lg border border-jambo-100 flex-grow">
          <div className="bg-blue-50 border border-blue-100 p-4 rounded-lg mb-6">
              <div className="flex gap-3">
                <AlertCircle className="text-blue-600 shrink-0" size={20} />
                <div>
                    <h4 className="text-blue-900 font-bold text-sm mb-1">Read to Sign</h4>
                    <p className="text-blue-700 text-xs leading-relaxed">
                      You must scroll to the bottom of the document to unlock the agreement checkboxes.
                    </p>
                </div>
              </div>
          </div>

          <div className="space-y-4">
              <label className={`flex items-start gap-3 p-4 rounded-xl border transition-all cursor-pointer ${scrolledToBottom ? 'bg-white border-brand-teal hover:border-brand-teal hover:bg-teal-50 shadow-sm' : 'bg-gray-50 border-gray-100 opacity-60 cursor-not-allowed'}`}>
                <div className="relative flex items-center mt-0.5">
                  <input 
                    type="checkbox" 
                    disabled={!scrolledToBottom}
                    checked={agreed.conduct}
                    onChange={(e) => setAgreed({...agreed, conduct: e.target.checked})}
                    className="peer h-5 w-5 opacity-0 absolute z-10 cursor-pointer" 
                  />
                  <div className="w-5 h-5 border-2 border-gray-300 rounded peer-checked:bg-brand-teal peer-checked:border-brand-teal transition-colors"></div>
                  <CheckCircle className="absolute w-5 h-5 text-white opacity-0 peer-checked:opacity-100 pointer-events-none" size={14} />
                </div>
                <span className="text-sm text-gray-700 font-medium leading-tight">I have read and accept the <strong className="text-jambo-600 block">Code of Conduct</strong></span>
              </label>

              <label className={`flex items-start gap-3 p-4 rounded-xl border transition-all cursor-pointer ${scrolledToBottom ? 'bg-white border-brand-teal hover:border-brand-teal hover:bg-teal-50 shadow-sm' : 'bg-gray-50 border-gray-100 opacity-60 cursor-not-allowed'}`}>
                <div className="relative flex items-center mt-0.5">
                  <input 
                    type="checkbox" 
                    disabled={!scrolledToBottom}
                    checked={agreed.privacy}
                    onChange={(e) => setAgreed({...agreed, privacy: e.target.checked})}
                    className="peer h-5 w-5 opacity-0 absolute z-10 cursor-pointer" 
                  />
                  <div className="w-5 h-5 border-2 border-gray-300 rounded peer-checked:bg-brand-teal peer-checked:border-brand-teal transition-colors"></div>
                  <CheckCircle className="absolute w-5 h-5 text-white opacity-0 peer-checked:opacity-100 pointer-events-none" size={14} />
                </div>
                <span className="text-sm text-gray-700 font-medium leading-tight">I agree to the <strong className="text-jambo-600 block">GDPR & Confidentiality</strong></span>
              </label>
          </div>
       </div>

       <div className="flex flex-col gap-3">
          <button 
            onClick={onNext}
            disabled={!allAgreed}
            className="w-full bg-jambo-600 hover:bg-jambo-700 disabled:bg-gray-300 disabled:text-gray-500 disabled:shadow-none disabled:cursor-not-allowed text-white font-bold py-4 px-6 rounded-xl shadow-xl hover:shadow-jambo-600/30 transition-all flex items-center justify-center gap-2 transform active:scale-95"
          >
            Accept & Continue
            <ArrowRight size={20} />
          </button>
          <button onClick={onBack} className="text-gray-400 hover:text-jambo-600 text-sm font-medium py-2 text-center transition-colors">
            Back to Welcome
          </button>
       </div>
    </div>
  );
};