
import React, { useState, useEffect } from 'react';
import { OnboardingWelcome } from '../components/portal/OnboardingWelcome';
import { OnboardingTerms } from '../components/portal/OnboardingTerms';
import { OnboardingProfile } from '../components/portal/OnboardingProfile';
import { PortalPending } from '../components/portal/PortalPending';
import { PortalAuth } from '../components/portal/PortalAuth';
import { PortalDashboard } from '../components/portal/PortalDashboard'; // Import Dashboard
import { mockDb } from '../data/mockDatabase';
import { COMPANY_INFO } from '../data/constants';
import { SeoHead } from '../components/seo/SeoHead';

// 4. MAIN PORTAL CONTAINER
export const PortalPage = ({ onNavigate }: { onNavigate: (page: string) => void }) => {
  // State: 'auth' | 'welcome' | 'terms' | 'profile' | 'pending' | 'dashboard'
  const [view, setView] = useState<'auth' | 'welcome' | 'terms' | 'profile' | 'pending' | 'dashboard'>('auth');

  // Check login status on mount (for "Login as User" flow)
  useEffect(() => {
    const user = mockDb.auth.getCurrentUser();
    // Only auto-enter dashboard if it's a linguist or client (prevent Admin crossover)
    if (user && user.role !== 'admin') {
        setView('dashboard');
    }
  }, []);

  return (
    <>
      <SeoHead title="Linguist Portal" forceNoIndex={true} />
      
      {/* --- DASHBOARD VIEW --- */}
      {view === 'dashboard' && (
        <div key="dashboard" className="animate-in fade-in duration-700 min-h-screen bg-gray-50 dark:bg-[#0f0a15]">
          <PortalDashboard onNavigate={onNavigate} onLogout={() => setView('auth')} />
        </div>
      )}

      {/* --- SUCCESS / PENDING VIEW --- */}
      {view === 'pending' && (
        <div key="pending" className="animate-in fade-in zoom-in-95 duration-500">
          <PortalPending onNavigate={onNavigate} />
        </div>
      )}

      {/* --- LOGIN / REGISTER VIEW (Auth) --- */}
      {view === 'auth' && (
        <div key="auth" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <PortalAuth 
            onNavigate={onNavigate} 
            onStartOnboarding={() => setView('welcome')} 
            onLogin={() => setView('dashboard')}
          />
        </div>
      )}

      {/* --- ONBOARDING LAYOUT WRAPPER --- */}
      {['welcome', 'terms', 'profile'].includes(view) && (
        <div className="min-h-screen bg-gray-50 dark:bg-[#0f0a15] flex flex-col relative overflow-hidden">
          {/* Brand Ambient Background Effects */}
          <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
             <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03]"></div>
             <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-jambo-500/10 rounded-full blur-[100px]"></div>
             <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-brand-orange/10 rounded-full blur-[100px]"></div>
          </div>

          {/* Portal Header - Updated to match Main Site Navbar Identity */}
          <div className="bg-[#841BA0] border-b border-jambo-700 sticky top-0 z-50 shadow-lg transition-all duration-300">
              <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                <div className="flex items-center gap-4 cursor-pointer group" onClick={() => onNavigate('home')}>
                    {/* Logo Container - Matches Main Navbar Style */}
                    <div className="h-12 flex items-center justify-center transition-transform group-hover:scale-105">
                       <img 
                        src={COMPANY_INFO.logoUrl} 
                        alt={COMPANY_INFO.name} 
                        className="h-full w-auto object-contain rounded-lg" 
                       />
                    </div>
                    
                    {/* Text Branding */}
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
              
              {/* Progress Bar - Updated colors for Purple Background */}
              <div className="h-1 bg-jambo-900 w-full">
                <div 
                  className="h-full bg-brand-orange transition-all duration-700 ease-out shadow-[0_0_10px_rgba(234,141,53,0.5)]" 
                  style={{ width: `${(['welcome', 'terms', 'profile'].indexOf(view) + 1) / 3 * 100}%` }}
                ></div>
              </div>
          </div>

          {/* RENDER THE ACTUAL ONBOARDING CONTENT */}
          <div className="flex-1 overflow-y-auto custom-scrollbar relative z-10">
             {view === 'welcome' && (
               <div key="welcome" className="animate-in fade-in slide-in-from-right-8 duration-500">
                  <OnboardingWelcome onNext={() => setView('terms')} />
               </div>
             )}
             {view === 'terms' && (
               <div key="terms" className="animate-in fade-in slide-in-from-right-8 duration-500">
                  <OnboardingTerms onNext={() => setView('profile')} onBack={() => setView('welcome')} />
               </div>
             )}
             {view === 'profile' && (
               <div key="profile" className="animate-in fade-in slide-in-from-right-8 duration-500">
                  <OnboardingProfile onFinish={() => setView('pending')} onBack={() => setView('terms')} />
               </div>
             )}
          </div>
        </div>
      )}
    </>
  );
};
