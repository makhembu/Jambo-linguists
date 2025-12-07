
import React from 'react';
import { Search, Home, Globe, Briefcase, MessageSquare, HelpCircle } from 'lucide-react';
import { ThemeToggle } from '../../Theme';
import { mockDb } from '../../../data/mockDatabase';
import { COMPANY_INFO } from '../../../data/constants';
import { NotificationPanel } from '../../ui/NotificationPanel';

interface HeaderProps {
  title: string;
  navigateToSection: (sectionId: string) => void;
  onNavigate: (page: string) => void;
}

export const Header = ({ title, navigateToSection, onNavigate }: HeaderProps) => {
  const user = mockDb.auth.getCurrentUser();

  const handleQuickAction = (action: string) => {
      navigateToSection(action);
  };

  return (
    <header className="h-16 lg:h-20 bg-white/80 dark:bg-[#1a1625]/90 border-b border-gray-200 dark:border-white/5 flex items-center justify-between px-4 lg:px-10 sticky top-0 z-40 transition-all duration-300 shadow-sm backdrop-blur-md">
      <div className="flex items-center gap-3 lg:gap-4">
          {/* Mobile Logo Title - Direct Home Link */}
          <div className="lg:hidden h-9 cursor-pointer active:opacity-80 flex items-center" onClick={() => onNavigate('home')}>
               <img 
                src={COMPANY_INFO.logoUrl} 
                alt="Jambo Portal" 
                className="h-full w-auto object-contain rounded-md"
              />
          </div>
          
          {/* Page Title */}
          <div className="flex flex-col">
              <h2 className="text-lg md:text-xl font-serif font-bold text-gray-900 dark:text-white truncate max-w-[200px] md:max-w-none leading-none">
                  {title}
              </h2>
              {/* Optional Breadcrumb for larger screens */}
              <span className="hidden md:inline-block text-[10px] text-gray-400 font-medium mt-1">Portal / {title}</span>
          </div>
      </div>
      
      <div className="flex items-center gap-2 md:gap-4 lg:gap-6">
          {/* Desktop Search Bar */}
          <div className="relative hidden md:block w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input 
                type="text" 
                placeholder="Search jobs, docs..." 
                className="w-full bg-gray-100 dark:bg-white/5 border border-transparent dark:border-white/5 rounded-full pl-10 pr-4 py-2.5 text-sm focus:ring-2 focus:ring-jambo-600 focus:bg-white dark:focus:bg-[#2a2438] transition-all outline-none text-gray-800 dark:text-gray-100 placeholder:text-gray-500 shadow-sm" 
              />
          </div>
          
          <div className="flex items-center gap-2">
              {/* Quick Actions (Desktop) */}
              <div className="hidden lg:flex items-center gap-1 bg-gray-100 dark:bg-white/5 p-1 rounded-full border border-gray-200 dark:border-white/5 mr-2">
                  <button 
                    onClick={() => handleQuickAction('jobs-available')}
                    className="p-2 text-gray-500 dark:text-gray-400 hover:text-jambo-600 dark:hover:text-white hover:bg-white dark:hover:bg-white/10 rounded-full transition-all"
                    title="Find Work"
                  >
                      <Briefcase size={18} />
                  </button>
                  <button 
                    onClick={() => handleQuickAction('messages')}
                    className="p-2 text-gray-500 dark:text-gray-400 hover:text-jambo-600 dark:hover:text-white hover:bg-white dark:hover:bg-white/10 rounded-full transition-all"
                    title="Messages"
                  >
                      <MessageSquare size={18} />
                  </button>
                  <button 
                    onClick={() => window.open('mailto:support@jambolinguists.com')}
                    className="p-2 text-gray-500 dark:text-gray-400 hover:text-jambo-600 dark:hover:text-white hover:bg-white dark:hover:bg-white/10 rounded-full transition-all"
                    title="Contact Support"
                  >
                      <HelpCircle size={18} />
                  </button>
              </div>

              {/* Home Shortcuts */}
              <button 
                onClick={() => navigateToSection('dashboard')}
                className="hidden md:block p-2 text-gray-400 hover:text-jambo-600 dark:hover:text-jambo-400 transition-colors hover:bg-gray-100 dark:hover:bg-white/5 rounded-full"
                title="Dashboard Overview"
              >
                <Home size={20} />
              </button>

              <button 
                onClick={() => onNavigate('home')}
                className="hidden md:block p-2 text-gray-400 hover:text-jambo-600 dark:hover:text-jambo-400 transition-colors hover:bg-gray-100 dark:hover:bg-white/5 rounded-full"
                title="Return to Main Website"
              >
                <Globe size={20} />
              </button>

              <div className="h-6 w-px bg-gray-200 dark:bg-white/10 hidden sm:block"></div>

              <ThemeToggle />

              <NotificationPanel onNavigate={navigateToSection} />

              {/* User Profile Avatar - Desktop Only (Mobile uses BottomNav) */}
              {user && (
                <div 
                    onClick={() => navigateToSection('profile')}
                    className="hidden lg:block w-10 h-10 rounded-full bg-gray-200 dark:bg-white/10 overflow-hidden cursor-pointer border-2 border-white dark:border-white/10 hover:border-brand-orange transition-all hover:scale-105 shadow-md ml-1"
                    title="My Profile"
                >
                    {user.avatarUrl ? (
                        <img src={user.avatarUrl} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center font-bold text-gray-500 dark:text-gray-400 text-xs">
                            {user.firstName?.[0]}{user.lastName?.[0]}
                        </div>
                    )}
                </div>
              )}
          </div>
      </div>
    </header>
  );
};
