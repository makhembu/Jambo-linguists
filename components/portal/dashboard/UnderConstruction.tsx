
import React from 'react';
import { Briefcase } from 'lucide-react';
import { IconBox } from '../../ui/IconBox';

export const UnderConstruction = ({ title }: { title: string }) => {
  return (
    <div className="flex flex-col items-center justify-center h-[50vh] text-center opacity-50 animate-in fade-in zoom-in duration-500">
        <div className="mb-6">
            <IconBox icon={Briefcase} variant="neutral" size="2xl" />
        </div>
        <h3 className="text-2xl font-bold text-gray-300 dark:text-white/50 font-serif mb-2">Section Under Construction</h3>
        <p className="text-gray-400 dark:text-white/30 max-w-sm mx-auto">
            You have navigated to <strong>{title}</strong>. 
            This feature is coming soon to the Jambo Portal.
        </p>
    </div>
  );
};
