'use client'
import React, { useState, useEffect } from 'react';
import { Eye, Handshake, Lightbulb } from 'lucide-react';

export const CorporateOverviewSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    // Small delay to ensure smooth transition on mount
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const servicePoints = [
    "We provide service on short notice.",
    "We have qualified compliant & vetted interpreters.",
    "We are open five days a week.",
    "Our office hours are from 9 am to 8 pm (Mon to Fri).",
    "Provide high-quality translations by real people.",
    "We provide all services solely in Swahili.",
    "Translations that are certified.",
    "Observe GDPR and Data Protection Guidelines."
  ];

  const sectorBars = [
    { label: "Courts: Magistrate, Family, County Court, Crown Courts", color: "bg-red-700" },
    { label: "Immigration & Tribunal", color: "bg-teal-600" },
    { label: "Government Agencies", color: "bg-blue-800" },
    { label: "NHS", color: "bg-purple-600" },
    { label: "Councils & Social Services", color: "bg-green-600" },
    { label: "Refugees & Asylum Seekers", color: "bg-black" },
    { label: "HM Prison & Probation Centres", color: "bg-[#8B4513]" }, // Brown
    { label: "Offices of Law Firms", color: "bg-gray-500" },
  ];

  return (
    <section className="py-20 px-6 bg-slate-50 dark:bg-transparent border-t border-gray-100 dark:border-white/5 transition-colors duration-300">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-16">
        
        {/* Left Column: Mission, Vision, Values */}
        <div className="space-y-10">
          
          {/* Mission & Vision Cards */}
          <div className="grid sm:grid-cols-2 gap-6">
             <div className="bg-gradient-to-br from-blue-900 to-blue-700 p-8 rounded-xl text-white shadow-xl flex flex-col justify-center min-h-[200px] hover:scale-105 transition-transform duration-300 cursor-default border border-white/10">
                <Eye className="mb-4 opacity-80" size={32} />
                <p className="font-serif text-xl leading-relaxed">
                  To be the world's greatest in bridging communication barriers.
                </p>
             </div>
             <div className="bg-gradient-to-br from-[#1a9eb0] to-[#126e7a] p-8 rounded-xl text-white shadow-xl flex flex-col justify-center min-h-[200px] hover:scale-105 transition-transform duration-300 cursor-default border border-white/10">
                <Handshake className="mb-4 opacity-80" size={32} />
                <p className="font-serif text-xl leading-relaxed">
                  To help individuals & organizations achieve their communication goals.
                </p>
             </div>
          </div>

          {/* Core Values */}
          <div className="bg-white dark:bg-white/5 p-8 rounded-xl border border-gray-200 dark:border-white/10 shadow-sm hover:shadow-lg transition-shadow backdrop-blur-sm">
             <h3 className="text-2xl font-serif font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
               <Lightbulb className="text-green-600" />
               Our Values
             </h3>
             <ul className="space-y-6">
               <li className="flex gap-4 items-start">
                 <span className="w-2 h-2 mt-2 rounded-full bg-green-500 shrink-0"></span>
                 <div>
                   <strong className="text-gray-900 dark:text-white block mb-1">Transparency</strong>
                   <span className="text-gray-600 dark:text-gray-300 font-light">Because we are ethical in all we do the very core of our business.</span>
                 </div>
               </li>
               <li className="flex gap-4 items-start">
                 <span className="w-2 h-2 mt-2 rounded-full bg-green-500 shrink-0"></span>
                 <div>
                   <strong className="text-gray-900 dark:text-white block mb-1">Innovation</strong>
                   <span className="text-gray-600 dark:text-gray-300 font-light">A key asset as we incorporate new & practical ideas.</span>
                 </div>
               </li>
               <li className="flex gap-4 items-start">
                 <span className="w-2 h-2 mt-2 rounded-full bg-green-500 shrink-0"></span>
                 <div>
                   <strong className="text-gray-900 dark:text-white block mb-1">Collaboration</strong>
                   <span className="text-gray-600 dark:text-gray-300 font-light">Because in partnership we deliver exceptional service.</span>
                 </div>
               </li>
             </ul>
          </div>
        </div>

        {/* Right Column: Service List & Sectors */}
        <div className="space-y-10">
           
           {/* Service List (Gold Card) */}
           <div className="bg-[#b8860b] dark:bg-[#b8860b]/80 text-white p-8 rounded-xl shadow-xl hover:-translate-y-1 transition-transform border border-white/10 backdrop-blur-sm">
              <h3 className="text-white/80 text-xs font-bold uppercase tracking-widest mb-6">Service Guarantee</h3>
              <ul className="space-y-3">
                {servicePoints.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-white/95 font-light leading-snug">
                    <span className="w-1.5 h-1.5 bg-white rounded-full mt-2 shrink-0"></span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
           </div>

           {/* Sectors (Animated Colored Bars) */}
           <div className="space-y-4">
              <h3 className="text-gray-400 dark:text-jambo-200 text-xs font-bold uppercase tracking-widest mb-2 ml-1">Key Sectors</h3>
              {sectorBars.map((item, idx) => (
                <div key={idx} className="h-12 relative rounded-md bg-gray-100 dark:bg-white/5 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                   {/* Background Bar that grows */}
                   <div 
                      className={`absolute top-0 left-0 h-full ${item.color} flex items-center whitespace-nowrap overflow-hidden z-10`}
                      style={{
                        width: isVisible ? '100%' : '0%',
                        transition: 'width 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
                        transitionDelay: `${idx * 100}ms`
                      }}
                   >
                     <div className="px-5 w-full flex items-center justify-between">
                        <span className="text-white text-sm font-medium animate-in fade-in duration-700" style={{ animationDelay: `${(idx * 100) + 400}ms` }}>
                          {item.label}
                        </span>
                        {/* Shine effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 -translate-x-full animate-[shimmer_2s_infinite]"></div>
                     </div>
                   </div>
                   
                   {/* Fallback Text if needed (not visible due to z-index logic but keeps layout) */}
                   <div className="px-5 h-full flex items-center text-transparent text-sm font-medium pointer-events-none">
                      {item.label}
                   </div>
                </div>
              ))}
           </div>
        </div>

      </div>
    </section>
  );
};