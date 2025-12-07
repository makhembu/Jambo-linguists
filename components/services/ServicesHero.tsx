import React from 'react';

export const ServicesHero = () => {
  return (
    <section className="relative pt-48 pb-20 md:pt-60 md:pb-24 px-6 overflow-hidden bg-jambo-600 dark:bg-jambo-950 transition-colors duration-300">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="absolute top-20 left-20 w-[400px] h-[400px] bg-white/10 rounded-full blur-[100px]"></div>
      </div>
      
      <div className="max-w-7xl mx-auto text-center">
         <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6 drop-shadow-lg animate-in fade-in slide-in-from-bottom-5 duration-700">Services</h1>
      </div>
    </section>
  )
}