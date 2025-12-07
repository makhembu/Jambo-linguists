
import React from 'react';
import { CheckCircle } from 'lucide-react';
import { IconBox } from '../ui/IconBox';

export const PortalPending = ({ onNavigate }: { onNavigate: (page: string) => void }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6 animate-in fade-in zoom-in duration-500">
       <div className="bg-white max-w-lg w-full rounded-2xl shadow-2xl p-12 text-center border-t-8 border-jambo-600 flex flex-col items-center">
          <div className="mb-6">
             <IconBox icon={CheckCircle} variant="success" size="2xl" />
          </div>
          <h2 className="text-3xl font-serif font-bold text-gray-900 mb-4">Application Received</h2>
          <p className="text-gray-600 mb-8 leading-relaxed">
            Thank you for completing your profile. Our recruitment team will review your documents and be in touch shortly via email.
          </p>
          
          <div className="flex flex-col gap-4">
            <button 
                onClick={() => onNavigate('home')}
                className="text-jambo-600 font-bold hover:text-jambo-800 hover:underline"
            >
                Return to Homepage
            </button>
          </div>
       </div>
    </div>
  );
};
