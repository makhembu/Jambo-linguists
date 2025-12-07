
import React from 'react';

/* 
  DESIGN SYSTEM: Page Header
  --------------------------
  Standard layout for top of pages.
  Ensures typography consistency (Serif for titles, Sans for subtitles).
*/

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
  statusIndicator?: React.ReactNode;
}

export const PageHeader = ({ title, subtitle, actions, statusIndicator }: PageHeaderProps) => {
  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div className="w-full md:max-w-[70%]">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif font-bold text-gray-900 dark:text-white mb-2 leading-tight">
          {title}
        </h2>
        {subtitle && (
          <p className="text-gray-500 dark:text-gray-400 text-sm md:text-lg font-light">
            {subtitle}
          </p>
        )}
      </div>
      
      {(actions || statusIndicator) && (
        <div className="flex flex-col items-start md:items-end gap-2 shrink-0">
           {statusIndicator && (
             <div className="mb-1">{statusIndicator}</div>
           )}
           <div className="flex gap-3 flex-wrap">
             {actions}
           </div>
        </div>
      )}
    </div>
  );
};
