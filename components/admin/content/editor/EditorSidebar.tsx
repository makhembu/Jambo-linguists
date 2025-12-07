
import React from 'react';
import { Info, List, Settings } from 'lucide-react';

interface EditorSidebarProps {
  activeStep: 'info' | 'curriculum' | 'settings';
  onChangeStep: (step: 'info' | 'curriculum' | 'settings') => void;
}

export const EditorSidebar = ({ activeStep, onChangeStep }: EditorSidebarProps) => {
  const steps = [
      { id: 'info', label: 'Basic Information', icon: Info },
      { id: 'curriculum', label: 'Curriculum & Content', icon: List },
      { id: 'settings', label: 'Course Settings', icon: Settings },
  ];

  return (
    <div className="flex lg:flex-col overflow-x-auto lg:overflow-visible p-2 lg:p-4 gap-2 lg:space-y-1 no-scrollbar">
        {steps.map(step => (
            <button
                key={step.id}
                onClick={() => onChangeStep(step.id as any)}
                className={`flex-1 lg:flex-none flex items-center justify-center lg:justify-start gap-3 px-4 py-3 rounded-lg text-sm font-bold transition-all whitespace-nowrap ${
                    activeStep === step.id 
                    ? 'bg-jambo-600 text-white shadow-md' 
                    : 'text-gray-500 hover:bg-gray-200 dark:hover:bg-white/10 dark:text-gray-400 bg-white lg:bg-transparent border lg:border-none border-gray-200 dark:border-white/5 dark:bg-white/5'
                }`}
            >
                <step.icon size={18} />
                {step.label}
            </button>
        ))}
    </div>
  );
};