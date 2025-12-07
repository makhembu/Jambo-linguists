
import React from 'react';

export const Fieldset: React.FC<{ title: string; icon: any; children: React.ReactNode }> = ({ title, icon: Icon, children }) => (
    <fieldset className="border border-gray-200 dark:border-white/10 rounded-xl p-4 pt-2">
        <legend className="px-2 text-xs font-bold text-jambo-600 dark:text-jambo-400 uppercase tracking-widest flex items-center gap-2">
            <Icon size={14} /> {title}
        </legend>
        <div className="space-y-4 pt-2">{children}</div>
    </fieldset>
);
