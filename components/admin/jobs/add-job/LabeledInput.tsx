
import React from 'react';

export const LabeledInput: React.FC<{ label: string; name?: string; value?: any; onChange?: any; required?: boolean; children: React.ReactNode }> = ({ label, required, children }) => (
    <div>
        <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
            {label} {required && <span className="text-red-500">*</span>}
        </label>
        <div className="mt-1.5">{children}</div>
    </div>
);
