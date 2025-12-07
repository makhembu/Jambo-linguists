'use client'
import React from 'react';

export const AboutSwahiliSection = () => {
  return (
     <section className="py-24 bg-gradient-to-br from-[#db4a66] to-[#b83b52] dark:from-[#9c3549] dark:to-[#822a3a] text-white relative overflow-hidden transition-colors duration-300">
        {/* Abstract Pattern */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] border-[60px] border-white/5 rounded-full -translate-y-1/2 translate-x-1/3 blur-sm"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-white/10 rounded-full translate-y-1/2 -translate-x-1/3 blur-3xl"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="md:w-3/4 lg:w-2/3">
             <div className="flex items-center gap-4 mb-6">
                <div className="h-px w-12 bg-white/60"></div>
                <span className="uppercase tracking-widest text-sm font-bold text-white/80">Cultural Heritage</span>
             </div>
             
             <h2 className="text-4xl md:text-6xl font-serif font-bold mb-8 leading-tight">About Swahili</h2>
             
             <div className="space-y-6 text-lg md:text-xl font-light leading-relaxed text-white/90">
               <p>
                 Swahili is a Bantu language spoken by about <strong className="text-white font-medium">35 million</strong> people. It is an official language of Tanzania, Uganda, and Kenya and is used as a lingua franca throughout East Africa.
               </p>
               <p>
                 The name Swahili comes from the Arabic word <em className="text-white">sawahili</em> (coasts), and the language contains a lot of vocabulary from Arabic, Persian, Malagasy, English, German, and Portuguese.
               </p>
               <div className="bg-white/10 p-6 rounded-xl border-l-4 border-white backdrop-blur-md my-8 hover:bg-white/15 transition-colors">
                  <p className="text-base italic">
                    "During the 19th century Swahili was used as the main language of administration by the European colonial powers in East Africa and under their influence the Latin alphabet was increasingly used to write it."
                  </p>
               </div>
               <p className="text-base opacity-80">
                 In the world of interpreting and translation services, rare languages present unique challenges and opportunities. However, they are just as important when it comes to facilitating communication and understanding across cultures.
               </p>
             </div>
          </div>
        </div>
     </section>
  );
};