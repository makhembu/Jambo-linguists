
import React from 'react';

export const BlogHeader = () => {
  return (
    <section className="relative pt-36 pb-16 md:pt-48 md:pb-20 px-6 overflow-hidden bg-jambo-600 dark:bg-jambo-950 transition-colors duration-300">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-brand-orange/20 rounded-full blur-[120px]"></div>
      </div>
      
      <div className="max-w-7xl mx-auto text-center">
         <span className="text-brand-orange font-bold tracking-[0.2em] text-sm uppercase mb-4 block animate-in fade-in slide-in-from-bottom-4 duration-700">Latest Insights</span>
         <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6 drop-shadow-lg animate-in fade-in slide-in-from-bottom-5 duration-700 delay-100">Jambo Blog</h1>
         <p className="text-xl text-jambo-100 font-light max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-6 duration-700 delay-200">
           News, culture, and professional advice from the world of Swahili interpreting.
         </p>
      </div>
    </section>
  );
};
