
import React, { useState, useEffect, useRef } from 'react';
import { Plus, X } from 'lucide-react';

export interface FABAction {
  label: string;
  icon: any;
  onClick: () => void;
  variant?: 'brand' | 'success' | 'warning' | 'danger' | 'info' | 'neutral';
}

interface MobileFABProps {
  actions: FABAction[];
  mainIcon?: any;
}

export const MobileFAB = ({ actions, mainIcon: MainIcon = Plus }: MobileFABProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('touchstart', handleClickOutside);
    }
    return () => {
        document.removeEventListener('mousedown', handleClickOutside);
        document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isOpen]);

  const getVariantClasses = (variant: string = 'neutral') => {
      switch(variant) {
          case 'brand': return 'bg-jambo-100 text-jambo-700 dark:bg-jambo-900/30 dark:text-jambo-300';
          case 'success': return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
          case 'warning': return 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400';
          case 'danger': return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
          case 'info': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400';
          default: return 'bg-white dark:bg-white/10 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-white/10';
      }
  };

  return (
    <>
      {/* Overlay for focus trap on mobile */}
      {isOpen && (
        <div 
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[90] pointer-events-auto transition-opacity duration-300" 
            onClick={() => setIsOpen(false)} 
        />
      )}

      <div className="fixed bottom-24 right-4 z-[100] lg:hidden flex flex-col items-end pointer-events-none safe-area-bottom" ref={containerRef}>
        
        {/* Actions Stack */}
        <div className={`flex flex-col items-end gap-4 mb-4 transition-all duration-300 ease-out z-[100] pointer-events-auto ${isOpen ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-90 pointer-events-none'}`}>
          {actions.map((action, idx) => (
            <button
              key={idx}
              onClick={() => {
                  action.onClick();
                  setIsOpen(false);
              }}
              className="flex items-center gap-3 group active:scale-95 transition-transform"
              aria-label={action.label}
            >
              <span className="bg-white dark:bg-[#1a1625] dark:text-white px-4 py-2 rounded-xl text-sm font-bold shadow-lg shadow-black/10 whitespace-nowrap border border-gray-100 dark:border-white/10 opacity-100">
                {action.label}
              </span>
              <div className={`w-14 h-14 rounded-full shadow-xl flex items-center justify-center border-2 border-white dark:border-[#1a1625] ${getVariantClasses(action.variant)}`}>
                <action.icon size={24} />
              </div>
            </button>
          ))}
        </div>

        {/* Main Toggle Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`w-16 h-16 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 z-[100] pointer-events-auto border-4 border-white dark:border-[#0f0a15] ${isOpen ? 'bg-gray-800 text-white rotate-45 scale-110' : 'bg-jambo-600 text-white hover:scale-105 active:scale-95'}`}
          aria-label={isOpen ? "Close Actions" : "Open Actions"}
        >
          {isOpen ? <X size={32} /> : <MainIcon size={32} />}
        </button>
      </div>
    </>
  );
};
