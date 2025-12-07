
import React from 'react';
import { LucideIcon } from 'lucide-react';

export type IconBoxVariant = 'brand' | 'success' | 'warning' | 'danger' | 'info' | 'neutral' | 'dark' | 'orange' | 'teal' | 'glass' | 'yellow';
export type IconBoxSize = 'sm' | 'md' | 'lg' | 'xl' | '2xl';

interface IconBoxProps {
  icon: LucideIcon;
  variant?: IconBoxVariant;
  size?: IconBoxSize;
  className?: string;
  shape?: 'square' | 'circle';
  onClick?: (e: React.MouseEvent) => void;
}

export const IconBox = ({ icon: Icon, variant = 'neutral', size = 'md', className = '', shape = 'square', onClick }: IconBoxProps) => {
  const variants: Record<IconBoxVariant, string> = {
    brand: 'bg-jambo-100 text-jambo-700 dark:bg-jambo-900/30 dark:text-jambo-300 border border-jambo-200 dark:border-jambo-800',
    success: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border border-green-200 dark:border-green-800',
    warning: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400 border border-orange-200 dark:border-orange-800',
    danger: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border border-red-200 dark:border-red-800',
    info: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border border-blue-200 dark:border-blue-800',
    neutral: 'bg-gray-100 text-gray-600 dark:bg-white/10 dark:text-gray-400 border border-gray-200 dark:border-white/10',
    dark: 'bg-gray-900 text-white dark:bg-white dark:text-gray-900 border border-gray-800 dark:border-white',
    orange: 'bg-orange-50 text-brand-orange dark:bg-orange-900/20 dark:text-orange-400 border border-orange-100 dark:border-orange-800',
    teal: 'bg-teal-50 text-brand-teal dark:bg-teal-900/20 dark:text-teal-400 border border-teal-100 dark:border-teal-800',
    glass: 'bg-white/20 text-white backdrop-blur-md border border-white/20 shadow-inner',
    yellow: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400 border border-yellow-200 dark:border-yellow-800',
  };

  const sizes: Record<IconBoxSize, string> = {
    sm: 'w-8 h-8 p-1.5',
    md: 'w-10 h-10 p-2',
    lg: 'w-12 h-12 p-2.5',
    xl: 'w-16 h-16 p-4',
    '2xl': 'w-24 h-24 p-6'
  };

  const iconSizes: Record<IconBoxSize, number> = {
    sm: 16,
    md: 20,
    lg: 24,
    xl: 32,
    '2xl': 48
  };

  const shapes = {
    square: 'rounded-xl',
    circle: 'rounded-full',
  };

  return (
    <div 
        onClick={onClick}
        className={`flex items-center justify-center shrink-0 ${sizes[size]} ${variants[variant]} ${shapes[shape]} ${className} ${onClick ? 'cursor-pointer hover:opacity-80 transition-opacity' : ''}`}
    >
      <Icon size={iconSizes[size]} strokeWidth={2} />
    </div>
  );
};
