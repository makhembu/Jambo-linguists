
import React from 'react';

/* 
  DESIGN SYSTEM: Badge Component
  ------------------------------
  Used for status, categories, and tags.
*/

type BadgeVariant = 'success' | 'warning' | 'danger' | 'info' | 'neutral' | 'brand';

export interface BadgeProps {
  children?: React.ReactNode;
  variant?: BadgeVariant;
  icon?: React.ReactNode;
  className?: string;
}

export const Badge = ({ children, variant = 'neutral', icon, className = '' }: BadgeProps) => {
  const styles = {
    success: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800',
    warning: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400 border-orange-200 dark:border-orange-800',
    danger: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800',
    info: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200 dark:border-blue-800',
    neutral: 'bg-gray-100 text-gray-600 dark:bg-white/10 dark:text-gray-400 border-gray-200 dark:border-white/10',
    brand: 'bg-jambo-100 text-jambo-700 dark:bg-jambo-900/30 dark:text-jambo-300 border-jambo-200 dark:border-jambo-800',
  };

  return (
    <span className={`
      inline-flex items-center gap-1.5 
      px-2.5 py-0.5 rounded-full 
      text-[10px] md:text-xs font-bold uppercase tracking-wider 
      border ${styles[variant]} 
      ${className}
    `}>
      {icon}
      {children}
    </span>
  );
};
