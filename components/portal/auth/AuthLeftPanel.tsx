import React from 'react';
import { GraduationCap, Shield } from 'lucide-react';

export const AuthLeftPanel = () => {
  return (
    <div className="hidden lg:w-5/12 bg-jambo-600 dark:bg-jambo-950 text-white relative overflow-hidden lg:flex flex-col justify-between p-8 md:p-12 lg:p-16 transition-colors duration-300">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
           <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
           <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-brand-orange/20 rounded-full blur-[100px]"></div>
           <div className="absolute top-20 -left-20 w-72 h-72 bg-white/10 rounded-full blur-[80px]"></div>
        </div>

        <div className="relative z-10">
           <div className="inline-block px-3 py-1 bg-brand-orange/20 text-brand-orange text-xs font-bold uppercase tracking-widest rounded-full mb-6 border border-brand-orange/20">
             Freelancer Partner Network
           </div>
           <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6 leading-tight drop-shadow-md">
             Jambo Linguist <br/><span className="text-jambo-200">Portal</span>
           </h1>
           <p className="text-jambo-50 font-light text-lg leading-relaxed max-w-md">
             Your hub for assignments, professional development, and compliance resources. Manage your freelance career with clarity and ease.
           </p>
        </div>

        <div className="relative z-10 mt-12 space-y-8">
           <div className="flex gap-4 group">
              <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-white/20 transition-colors">
                 <GraduationCap className="text-brand-orange" size={24} />
              </div>
              <div>
                 <h3 className="font-serif font-bold text-lg mb-1">Tailored Training</h3>
                 <p className="text-sm text-jambo-100 leading-relaxed font-light">
                   Access specialized modules designed for freelance interpreters, including glossaries for legal and medical terminology.
                 </p>
              </div>
           </div>

           <div className="flex gap-4 group">
              <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-white/20 transition-colors">
                 <Shield className="text-brand-teal" size={24} />
              </div>
              <div>
                 <h3 className="font-serif font-bold text-lg mb-1">Standards & Ethics</h3>
                 <p className="text-sm text-jambo-100 leading-relaxed font-light">
                   Review our <span className="text-white underline decoration-white/30 cursor-pointer hover:decoration-white font-medium">Code of Conduct</span> and <span className="text-white underline decoration-white/30 cursor-pointer hover:decoration-white font-medium">Policies</span> to ensure alignment with our quality promise.
                 </p>
              </div>
           </div>
        </div>

        <div className="relative z-10 mt-12 text-xs text-jambo-200 font-mono">
           <p>© Jambo Linguists Ltd. Authorized Access Only.</p>
        </div>
      </div>
  );
};