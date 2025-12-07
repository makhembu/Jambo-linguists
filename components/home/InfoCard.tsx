
import React from 'react';
import { ArrowRight } from 'lucide-react';

export const InfoCard = ({ 
  title, 
  content, 
  buttonText, 
  variant,
  onClick
}: { 
  title: string, 
  content: string, 
  buttonText: string, 
  variant: 'pink' | 'teal',
  onClick?: () => void
}) => {
  const isPink = variant === 'pink';
  const bgClass = isPink 
    ? "bg-gradient-to-br from-[#db4a66] to-[#b83b52] dark:from-[#9c3549] dark:to-[#822a3a]" 
    : "bg-gradient-to-br from-[#4fd1c5] to-[#319795] dark:from-[#368f86] dark:to-[#226967]";
  
  const shadowClass = isPink
    ? "shadow-[0_20px_40px_-15px_rgba(219,74,102,0.5)]"
    : "shadow-[0_20px_40px_-15px_rgba(79,209,197,0.5)]";

  return (
    <div 
      onClick={onClick}
      className={`rounded-2xl p-6 sm:p-8 md:p-8 lg:p-12 ${bgClass} ${shadowClass} text-white transition-all duration-300 hover:-translate-y-2 relative overflow-hidden group h-full flex flex-col justify-between cursor-pointer`}
    >
      {/* Texture */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      
      <div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 md:mb-6 serif">{title}</h2>
        <p className="text-sm sm:text-base leading-relaxed mb-8 md:mb-10 opacity-95 font-light">
          {content}
        </p>
      </div>
      
      <div>
        <button className="bg-white text-gray-900 px-5 py-2.5 md:px-6 md:py-3 rounded-lg font-bold flex items-center gap-2 hover:bg-gray-100 transition-colors shadow-lg pointer-events-none text-sm md:text-base">
          {buttonText}
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
};
