import React, { useState } from 'react';
import { AlertTriangle, X } from 'lucide-react';

export const AlertBar = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 flex flex-col md:flex-row items-start md:items-center gap-4 mb-8 animate-in slide-in-from-top-2 shadow-lg transition-all duration-300">
        <AlertTriangle className="text-brand-orange shrink-0 mt-0.5" size={20} />
        <div className="flex-1">
            <h4 className="text-orange-900 font-bold text-sm">Action Required: Compliance Update</h4>
            <p className="text-orange-700 text-sm mt-1">Your Professional Indemnity Insurance is due for renewal in 14 days. Please upload the new certificate.</p>
        </div>
        <div className="w-full md:w-auto flex items-center gap-2 shrink-0 mt-2 md:mt-0">
            <button className="flex-1 md:flex-initial text-xs font-bold uppercase bg-white border border-orange-200 text-brand-orange px-4 py-2 rounded-lg hover:bg-brand-orange hover:text-white transition-colors shadow-sm whitespace-nowrap">
                Update Now
            </button>
            <button 
                onClick={() => setIsVisible(false)}
                className="text-orange-400 hover:text-orange-700 hover:bg-orange-100 p-1.5 rounded-lg transition-colors"
                aria-label="Dismiss alert"
            >
                <X size={18} />
            </button>
        </div>
    </div>
  );
};