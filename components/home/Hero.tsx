
import React from 'react';

export const Hero = () => {
  return (
    <section className="relative pt-28 pb-20 md:pt-36 md:pb-24 lg:pt-44 lg:pb-32 px-4 sm:px-6 overflow-hidden bg-jambo-600 dark:bg-jambo-950 text-center transition-colors duration-300">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="absolute -top-[20%] -right-[10%] w-[300px] md:w-[500px] lg:w-[600px] h-[300px] md:h-[500px] lg:h-[600px] bg-jambo-500/30 rounded-full blur-[60px] md:blur-[100px]"></div>
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black/10 to-transparent"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10 px-4 flex flex-col items-center justify-center min-h-[30vh] md:min-h-[40vh]">
        {/* Title */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 md:mb-6 leading-tight drop-shadow-md whitespace-normal animate-in slide-in-from-bottom-5 fade-in duration-700">
          Jambo Linguists Limited
        </h1>
        
        <p className="text-base sm:text-lg md:text-xl lg:text-3xl text-jambo-100 font-light mb-8 tracking-wide animate-in slide-in-from-bottom-5 fade-in duration-700 delay-100 max-w-2xl px-4">
          The Home of <span className="font-semibold text-white">Swahili</span>
        </p>

        <div className="w-16 md:w-24 h-1 bg-white/30 rounded-full animate-in zoom-in duration-1000"></div>
      </div>
    </section>
  );
};
