
import React, { useEffect, useState } from 'react';
import { CheckCircle, AlertCircle, X, Info } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'info';

interface ToastProps {
  message: string;
  type: ToastType;
  isVisible: boolean;
  onClose: () => void;
}

export const Toast = ({ message, type, isVisible, onClose }: ToastProps) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  const styles = {
    success: 'bg-green-600 text-white',
    error: 'bg-red-600 text-white',
    info: 'bg-blue-600 text-white',
  };

  const icons = {
    success: CheckCircle,
    error: AlertCircle,
    info: Info,
  };

  const Icon = icons[type];

  return (
    <div className={`fixed top-6 left-1/2 -translate-x-1/2 z-[10000] flex items-center gap-3 px-6 py-3 rounded-full shadow-xl animate-in fade-in slide-in-from-top-4 duration-300 ${styles[type]}`}>
      <Icon size={20} className="shrink-0" />
      <span className="font-bold text-sm md:text-base">{message}</span>
      <button onClick={onClose} className="bg-white/20 hover:bg-white/30 rounded-full p-1 transition-colors">
        <X size={14} />
      </button>
    </div>
  );
};
