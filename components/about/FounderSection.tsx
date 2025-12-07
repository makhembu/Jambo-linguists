'use client'
import React from 'react';
import { Sparkles } from 'lucide-react';

export const FounderSection = () => {
  return (
    <section className="py-24 px-6 max-w-7xl mx-auto overflow-hidden">
       <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          {/* Image Side */}
          <div className="lg:w-1/2 relative flex justify-center order-2 lg:order-1">
              {/* Decorative Circle matching brand orange */}
              <div className="absolute inset-0 bg-gradient-to-tr from-brand-orange to-amber-200 dark:to-amber-900 opacity-20 rounded-full blur-3xl transform scale-110"></div>
              
              {/* Main Image Container */}
              <div className="relative w-80 h-80 md:w-96 md:h-96 lg:w-[500px] lg:h-[500px]">
                  {/* The orange circle background from the design */}
                  <div className="absolute inset-4 bg-gradient-to-b from-brand-orange to-amber-600 rounded-full shadow-2xl"></div>
                  
                  {/* Image */}
                  <img 
                    src="https://jambolinguists.com/wp-content/uploads/2024/09/director-photo.png" 
                    alt="Linah Makembu - Founding Director" 
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-auto max-h-[110%] object-contain drop-shadow-xl z-10 hover:scale-105 transition-transform duration-500"
                    loading="eager"
                    fetchPriority="high"
                  />
                  
                  {/* Floating badge */}
                  <div className="absolute bottom-8 right-0 md:-right-4 bg-white dark:bg-[#1a1625] p-4 rounded-xl shadow-xl z-20 max-w-[180px] animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300 hover:rotate-2 transition-transform">
                    <p className="text-jambo-600 dark:text-jambo-400 font-bold text-sm leading-tight">DPSI Law Qualified</p>
                    <p className="text-gray-400 dark:text-gray-500 text-xs mt-1">International School of Linguists</p>
                  </div>
              </div>
          </div>

          {/* Text Side */}
          <div className="lg:w-1/2 order-1 lg:order-2">
             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-orange/10 text-brand-orange text-xs font-bold uppercase tracking-widest mb-6">
                <Sparkles size={14} /> Leadership
             </div>
             
             <h2 className="text-5xl md:text-6xl font-serif font-bold text-gray-900 dark:text-white mb-2">The Founding Director</h2>
             <h3 className="text-3xl font-serif text-jambo-600 dark:text-jambo-400 mb-8 italic">Linah Makembu</h3>
             
             <div className="space-y-6 text-gray-600 dark:text-gray-300 text-lg font-light leading-relaxed">
               <p>
                 Linah is a language professional working from English to Swahili. She specializes in the areas of 
                 <span className="text-gray-900 dark:text-white font-medium"> criminal and justice, immigration, legal, and healthcare</span> in the North of England.
               </p>
               <p>
                 She started her linguistic journey as a volunteer in 2019 in a local church, a service she still carries out today. 
                 She is an associate member of the Institute of Translation and Interpreting (ITI) and Chartered Institute of Linguists (CIOL), 
                 a Language Assessor with DPSI Online, Member of NUPIT, and a former board member of ITI.
               </p>
               <p className="border-l-4 border-brand-orange pl-4 italic text-gray-800 dark:text-gray-200">
                 "Ms Makembu has a keen interest in advocacy work and the development and representation of Africa's rare languages 
                 to ensure equitable access to resources."
               </p>
             </div>

             <div className="mt-10 flex gap-4">
               {['ITI', 'CIOL', 'NUPIT'].map((org) => (
                 <span key={org} className="px-4 py-2 border border-gray-200 dark:border-white/20 rounded-lg text-gray-400 dark:text-gray-500 font-bold text-sm hover:border-jambo-600 dark:hover:border-jambo-400 hover:text-jambo-600 dark:hover:text-jambo-400 transition-colors cursor-default">
                   {org}
                 </span>
               ))}
             </div>
          </div>
       </div>
    </section>
  )
}