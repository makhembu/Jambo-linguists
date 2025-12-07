'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { OnboardingWelcome } from '../components/portal/OnboardingWelcome';
import { OnboardingTerms } from '../components/portal/OnboardingTerms';
import { OnboardingProfile } from '../components/portal/OnboardingProfile';
import { PortalPending } from '../components/portal/PortalPending';
import { PortalAuth } from '../components/portal/PortalAuth';
import { PortalDashboard } from '../components/portal/PortalDashboard';
import { mockDb } from '@/data/mockDatabase';
import { COMPANY_INFO } from '@/data/constants';
import { SeoHead } from '../components/seo/SeoHead';

export const PortalPage = () => {
  const router = useRouter();
  const [view, setView] = useState<'auth' | 'welcome' | 'terms' | 'profile' | 'pending' | 'dashboard'>('auth');

  useEffect(() => {
    const user = mockDb.auth.getCurrentUser();
    if (user && user.role !== 'admin') {
        setView('dashboard');
    }
  }, []);

  return (
    <>
      <SeoHead title="Linguist Portal" forceNoIndex={true} />
      
      {/* DASHBOARD VIEW */}
      {view === 'dashboard' && (
        <div key="dashboard" className="animate-in fade-in duration-700 min-h-screen bg-gray-50 dark:bg-[#0f0a15]">
          <PortalDashboard onLogout={() => setView('auth')} />
        </div>
      )}

      {/* PENDING VIEW */}
      {view === 'pending' && (
        <div key="pending" className="animate-in fade-in zoom-in-95 duration-500">
          <PortalPending />
        </div>
      )}

      {/* AUTH VIEW */}
      {view === 'auth' && (
        <div key="auth" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <PortalAuth 
            onStartOnboarding={() => setView('welcome')} 
            onLogin={() => setView('dashboard')}
          />
        </div>
      )}

      {/* ONBOARDING VIEWS */}
      {['welcome', 'terms', 'profile'].includes(view) && (
        <div className="min-h-screen bg-gray-50 dark:bg-[#0f0a15] flex flex-col relative overflow-hidden">
          {/* Background effects omitted for brevity */}

          {/* Portal Header */}
          <div className="bg-[#841BA0] border-b border-jambo-700 sticky top-0 z-50 shadow-lg transition-all duration-300">
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
              <div className="flex items-center gap-4 cursor-pointer group" onClick={() => router.push('/')}>
                  <div className="h-12 flex items-center justify-center transition-transform group-hover:scale-105">
                     <img 
                      src={COMPANY_INFO.logoUrl} 
                      alt={COMPANY_INFO.name} 
                      className="h-full w-auto object-contain rounded-lg" 
                     />
                  </div>
                  <div className="h-8 w-px bg-white/20 hidden md:block"></div>
                  <div className="hidden md:flex flex-col">
                    <span className="font-serif font-bold text-white text-lg leading-none">Linguist Portal</span>
                    <span className="text-[10px] text-jambo-200 uppercase tracking-widest leading-none mt-1">Authorized Access</span>
                  </div>
              </div>
              <div className="flex items-center gap-3">
                 <div className="text-[10px] md:text-xs font-bold text-white uppercase tracking-widest bg-white/10 border border-white/20 px-4 py-1.5 rounded-full backdrop-blur-sm">
                    Onboarding Progress
                 </div>
              </div>
            </div>
            <div className="h-1 bg-jambo-900 w-full">
              <div 
                className="h-full bg-brand-orange transition-all duration-700 ease-out shadow-[0_0_10px_rgba(234,141,53,0.5)]" 
                style={{ width: `${(['welcome', 'terms', 'profile'].indexOf(view) + 1) / 3 * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Onboarding Content */}
          <div className="flex-1 overflow-y-auto custom-scrollbar relative z-10">
             {view === 'welcome' && (
               <OnboardingWelcome onNext={() => setView('terms')} />
             )}
             {view === 'terms' && (
               <OnboardingTerms onNext={() => setView('profile')} onBack={() => setView('welcome')} />
             )}
             {view === 'profile' && (
               <OnboardingProfile onFinish={() => setView('pending')} onBack={() => setView('terms')} />
             )}
          </div>
        </div>
      )}
    </>
  );
};
