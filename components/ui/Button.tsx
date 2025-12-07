
import React from 'react';
import { Loader2 } from 'lucide-react';

/* 
  DESIGN SYSTEM: Button Component
  --------------------------------
  Unified button styles for Jambo Portal & Admin.
  - Primary: Jambo Brand Purple
  - Secondary: White/Dark Grey (for secondary actions)
  - Outline: Bordered, transparent bg
  - Ghost: Text only, hover bg
  - Danger: Red for destructive actions
*/

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: "button" | "submit" | "reset";
}

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  className = '',
  disabled,
  ...props
}: ButtonProps) => {
  
  const baseStyles = "font-bold rounded-lg transition-all duration-200 flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed active:scale-[0.98]";
  
  const variants = {
    primary: "bg-jambo-600 hover:bg-jambo-700 text-white shadow-lg shadow-jambo-600/20 focus:ring-jambo-500 border border-transparent",
    secondary: "bg-white dark:bg-white/10 text-gray-700 dark:text-white border border-gray-200 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/20 focus:ring-gray-200",
    outline: "bg-transparent border border-jambo-600 text-jambo-600 hover:bg-jambo-50 dark:hover:bg-jambo-900/20 focus:ring-jambo-500",
    ghost: "bg-transparent text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/10 hover:text-jambo-600 dark:hover:text-white",
    danger: "bg-white border border-red-200 text-red-600 hover:bg-red-50 dark:bg-red-900/10 dark:border-red-900/30 dark:text-red-400 dark:hover:bg-red-900/30",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-4 py-2.5 text-sm",
    lg: "px-6 py-3 text-base",
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && <Loader2 size={size === 'sm' ? 14 : 18} className="animate-spin" />}
      {!isLoading && leftIcon}
      {children}
      {!isLoading && rightIcon}
    </button>
  );
};
