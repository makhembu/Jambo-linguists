
import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | 'full';
  className?: string;
  showCloseButton?: boolean;
}

export const Modal = ({ isOpen, onClose, children, size = '2xl', className = '', showCloseButton = false }: ModalProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  if (!isOpen) return null;

  const maxWidths = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    '3xl': 'max-w-3xl',
    '4xl': 'max-w-4xl',
    'full': 'max-w-[95vw]',
  };

  const modalContent = (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200 safe-area-padding">
      <div className="absolute inset-0 bg-jambo-950/60 backdrop-blur-sm transition-opacity" onClick={onClose}></div>
      <div className={`
        relative z-10 flex flex-col w-full ${maxWidths[size]} 
        max-h-[100dvh] h-full md:h-auto md:max-h-[90vh]
        bg-white dark:bg-[#1a1625] 
        rounded-2xl shadow-2xl border border-gray-200 dark:border-white/10
        animate-in zoom-in-95 duration-200 
        overflow-hidden ${className}
      `}>
        {showCloseButton && (
           <button 
             onClick={onClose} 
             className="absolute top-4 right-4 p-2 bg-gray-100/50 hover:bg-gray-200/50 dark:bg-black/20 dark:hover:bg-black/40 text-gray-500 dark:text-gray-400 rounded-full transition-colors z-50 backdrop-blur-sm border border-transparent dark:border-white/5"
           >
             <X size={20} />
           </button>
        )}
        {children}
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};
