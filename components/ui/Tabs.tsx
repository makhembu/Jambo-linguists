
import React from 'react';

export interface TabsListProps {
  children?: React.ReactNode;
  className?: string;
}

export const TabsList = ({ children, className = '' }: TabsListProps) => (
  <div className={`flex flex-wrap gap-2 border-b border-gray-200 dark:border-white/10 ${className}`}>
    {children}
  </div>
);

export interface TabsTriggerProps {
  active: boolean;
  onClick: () => void;
  children?: React.ReactNode;
  variant?: 'underline' | 'pill';
  icon?: React.ReactNode;
  className?: string;
}

export const TabsTrigger = ({ active, onClick, children, variant = 'underline', icon, className = '' }: TabsTriggerProps) => {
  const baseStyles = "text-sm font-bold transition-colors flex items-center gap-2 px-4 py-3";
  
  const variants = {
    underline: active 
      ? "text-jambo-600 dark:text-white border-b-2 border-jambo-600" 
      : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 border-b-2 border-transparent",
    pill: active
      ? "bg-jambo-600 text-white rounded-lg shadow-sm"
      : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/10 rounded-lg",
  };

  return (
    <button 
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {icon}
      {children}
    </button>
  );
};
