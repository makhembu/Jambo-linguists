
import React from 'react';
import { Card } from './Card';

/* 
  DESIGN SYSTEM: Stat Card
  ------------------------
  Unified KPI display.
*/

interface StatCardProps {
  title: string;
  value: string;
  subtext: string;
  icon: any; // Lucide Icon
  variant?: 'brand' | 'teal' | 'orange' | 'success' | 'danger' | 'info' | 'neutral'; 
  onClick?: () => void;
  trend?: boolean; // If true, shows green trend (mock)
}

export const StatCard = ({ title, value, subtext, icon: Icon, variant = 'brand', onClick, trend }: StatCardProps) => {
  
  // Icon styles mapping
  const iconStyles: Record<string, string> = {
      brand: 'bg-jambo-100 text-jambo-700 dark:bg-jambo-900/30 dark:text-jambo-300 border border-jambo-200 dark:border-jambo-800',
      teal: 'bg-teal-50 text-brand-teal dark:bg-teal-900/20 dark:text-teal-400 border border-teal-100 dark:border-teal-800',
      orange: 'bg-orange-50 text-brand-orange dark:bg-orange-900/20 dark:text-orange-400 border border-orange-100 dark:border-orange-800',
      success: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border border-green-200 dark:border-green-800',
      danger: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border border-red-200 dark:border-red-800',
      info: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border border-blue-200 dark:border-blue-800',
      neutral: 'bg-gray-100 text-gray-600 dark:bg-white/10 dark:text-gray-400 border border-gray-200 dark:border-white/10'
  };

  // Hover border colors for interactive cards
  const hoverBorders = {
    brand: 'hover:border-jambo-200 dark:hover:border-jambo-800',
    teal: 'hover:border-teal-200 dark:hover:border-teal-800',
    orange: 'hover:border-orange-200 dark:hover:border-orange-800',
    success: 'hover:border-green-200 dark:hover:border-green-800',
    danger: 'hover:border-red-200 dark:hover:border-red-800',
    info: 'hover:border-blue-200 dark:hover:border-blue-800',
    neutral: 'hover:border-gray-300 dark:hover:border-white/20',
  };

  const activeHover = onClick ? (hoverBorders[variant] || hoverBorders.neutral) : '';
  const iconClass = iconStyles[variant] || iconStyles.brand;

  return (
    <Card 
      onClick={onClick}
      className={`p-5 flex flex-col justify-between h-full ${activeHover}`}
      hoverEffect={!!onClick}
    >
      <div className="flex items-center gap-3 mb-3">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${iconClass}`}>
            <Icon size={20} />
        </div>
        <span className="text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider truncate flex-1">
          {title}
        </span>
      </div>
      
      <div>
        <p className="text-2xl md:text-3xl font-serif font-bold text-gray-900 dark:text-white truncate tracking-tight">
          {value}
        </p>
        <p className={`text-xs mt-1 font-medium truncate ${trend ? 'text-green-600 dark:text-green-400' : 'text-gray-400 dark:text-gray-500'}`}>
          {subtext}
        </p>
      </div>
    </Card>
  );
};
