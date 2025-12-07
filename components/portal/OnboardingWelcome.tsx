import React from 'react';
import { ArrowRight, Play } from 'lucide-react';

export const OnboardingWelcome = ({ onNext }: { onNext: () => void }) => (
  <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700 py-10">
    <div className="text-center mb-10">
      <span className="text-brand-orange font-bold tracking-[0.2em] text-xs uppercase mb-3 block">Step 1 of 3</span>
      <h2 className="text-4xl md:text-5xl font-serif font-bold text-jambo-950 mb-6 drop-shadow-sm">Habari, Welcome to the Family</h2>
      <div className="bg-white/60 backdrop-blur-sm p-6 rounded-2xl border border-white/50 shadow-sm inline-block">
        <p className="text-gray-700 text-lg font-light max-w-2xl mx-auto leading-relaxed">
          Before you start your journey as a Jambo Linguist, please watch a short welcome message from our Director, Linah Makembu.
        </p>
      </div>
    </div>

    {/* Video Placeholder Container */}
    <div className="relative aspect-video bg-jambo-950 rounded-2xl shadow-2xl overflow-hidden group cursor-pointer mb-12 ring-4 ring-white border border-gray-200 transform transition-all hover:scale-[1.01] hover:shadow-jambo-900/20">
      {/* Thumbnail / Poster */}
      <img 
        src="https://jambolinguists.com/wp-content/uploads/2024/09/director-photo.png" 
        alt="Director Welcome" 
        className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-overlay scale-105 group-hover:scale-110 transition-transform duration-700"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-jambo-900/90 via-jambo-900/20 to-transparent"></div>
      
      {/* Play Button */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-24 h-24 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/40 shadow-[0_0_30px_rgba(255,255,255,0.3)] group-hover:scale-110 transition-all duration-300 relative">
          <div className="absolute inset-0 bg-white/30 rounded-full animate-ping opacity-75"></div>
          <Play size={36} className="text-white fill-white ml-2 relative z-10" />
        </div>
      </div>

      <div className="absolute bottom-8 left-8 text-white">
        <div className="inline-block px-3 py-1 bg-brand-orange text-white text-[10px] font-bold uppercase tracking-widest rounded-full mb-2">Director's Message</div>
        <p className="font-serif font-bold text-2xl md:text-3xl mb-1">Our Vision & Your Role</p>
        <p className="text-sm opacity-80 font-light tracking-wide">Duration: 2:30</p>
      </div>
    </div>

    <div className="flex justify-center">
      <button 
        onClick={onNext}
        className="bg-jambo-600 hover:bg-jambo-700 text-white font-bold py-4 px-12 rounded-full shadow-lg hover:shadow-jambo-600/30 transition-all flex items-center gap-3 group text-lg transform hover:-translate-y-1"
      >
        Continue to Onboarding
        <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
      </button>
    </div>
  </div>
);