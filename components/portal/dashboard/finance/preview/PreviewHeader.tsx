
import React from 'react';
import { X } from 'lucide-react';

interface PreviewHeaderProps {
  reference: string;
  onClose: () => void;
}

export const PreviewHeader = ({ reference, onClose }: PreviewHeaderProps) => (
  <header className="p-4 sm:p-6 flex items-center justify-between border-b border-gray-100 dark:border-white/5 shrink-0">
    <div>
      <h2 className="text-xl font-serif font-bold text-gray-900 dark:text-white">Invoice Preview</h2>
      <p className="text-sm text-gray-500 dark:text-gray-400">Reference: {reference}</p>
    </div>
    <button 
      onClick={onClose}
      className="p-2 bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 rounded-full text-gray-500 dark:text-gray-400 transition-colors"
      aria-label="Close modal"
    >
      <X size={20} />
    </button>
  </header>
);
