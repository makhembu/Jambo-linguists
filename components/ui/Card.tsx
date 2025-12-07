import React from 'react';

/* 
  DESIGN SYSTEM: Card Component
  -----------------------------
  Standard container for all dashboard widgets.
  - Background: White (Light) / #1a1625 (Dark)
  - Border: Gray-200 (Light) / White/5% (Dark)
  - Radius: XL (rounded-xl)
  - Shadow: Small default, medium on hover for interactive cards
*/

export interface CardProps {
  children?: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hoverEffect?: boolean;
}

export const Card: React.FC<CardProps> = ({ children, className = '', onClick, hoverEffect = false }) => {
  return (
    <div 
      onClick={onClick}
      className={`
        bg-white dark:bg-[#1a1625] 
        border border-gray-200 dark:border-white/5 
        rounded-xl shadow-sm 
        transition-all duration-300
        ${hoverEffect || onClick ? 'hover:shadow-lg hover:-translate-y-1 cursor-pointer' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
};