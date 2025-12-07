import React from 'react';
import { IconBox } from '../ui/IconBox';

export const ServiceCard: React.FC<{ 
  title: string, 
  description: string, 
  gradient: string,
  icon: any
}> = ({ 
  title, 
  description, 
  gradient, 
  icon: Icon
}) => {
  return (
    <div className={`rounded-xl p-8 ${gradient} text-white shadow-xl hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between min-h-[250px] relative overflow-hidden group cursor-default`}>
       {/* Icon bg decoration */}
       <div className="absolute -right-4 -bottom-4 opacity-20 text-black transform group-hover:scale-110 transition-transform duration-500">
          <Icon size={120} />
       </div>
       
       <div>
         <div className="mb-4">
            <IconBox icon={Icon} variant="glass" size="lg" />
         </div>
         <h3 className="text-2xl font-bold mb-4 font-serif">{title}</h3>
       </div>
       
       <p className="font-light text-sm md:text-base leading-relaxed opacity-95 relative z-10">
         {description}
       </p>
    </div>
  );
}