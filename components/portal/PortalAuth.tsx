'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import { ThemeToggle } from '../Theme';
import { AuthLeftPanel } from './auth/AuthLeftPanel';
import { AuthForm } from './auth/AuthForm';

export const PortalAuth = ({ onStartOnboarding, onLogin }: { onStartOnboarding: () => void, onLogin: () => void }) => {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0f0a15] flex flex-col-reverse lg:flex-row relative animate-in fade-in duration-700 transition-colors duration-300">
      
      <div className="absolute top-6 right-6 z-10 flex items-center gap-4">
        <ThemeToggle />
        <button 
          onClick={() => router.push('/')}
          className="flex items-center gap-2 text-gray-400 hover:text-jambo-600 dark:text-gray-500 dark:hover:text-jambo-400 transition-colors text-sm font-medium"
        >
          Back to Site <ArrowRight size={16} />
        </button>
      </div>
      
      <AuthLeftPanel />
      <AuthForm 
        onStartOnboarding={onStartOnboarding} 
        onLogin={onLogin} 
        demoConfig={{
            email: "linah@jambolinguists.com",
            password: "password",
            label: "Demo Linguist Account"
        }}
      />
    </div>
  );
};
