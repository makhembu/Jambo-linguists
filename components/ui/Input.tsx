
import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  containerClassName?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = '', leftIcon, rightIcon, containerClassName = '', ...props }, ref) => {
    return (
      <div className={`relative ${containerClassName}`}>
        {leftIcon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
            {leftIcon}
          </div>
        )}
        <input
          ref={ref}
          className={`
            w-full bg-white dark:bg-white/5 
            border border-gray-200 dark:border-white/10 
            rounded-lg text-sm text-gray-900 dark:text-white 
            placeholder:text-gray-400 dark:placeholder:text-gray-500
            focus:outline-none focus:ring-2 focus:ring-jambo-600/50 focus:border-jambo-600
            transition-all disabled:opacity-50 disabled:cursor-not-allowed
            py-2.5
            ${leftIcon ? 'pl-10' : 'px-4'}
            ${rightIcon ? 'pr-10' : 'px-4'}
            ${className}
          `}
          {...props}
        />
        {rightIcon && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
            {rightIcon}
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
