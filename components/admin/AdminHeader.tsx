
import React from 'react';
import { Search, Home, Globe, Plus, UserPlus, FileText, Bell } from 'lucide-react';
import { ThemeToggle } from '../Theme';
import { COMPANY_INFO } from '../../data/constants';
import { NotificationPanel } from '../ui/NotificationPanel';

interface AdminHeaderProps {
  title: string;
  onNavigate: (page: string) => void;
  onDashboardClick: () => void;
  onSectionChange: (section: string) => void;
}

export const AdminHeader = ({ title, onNavigate, onDashboardClick, onSectionChange }: AdminHeaderProps) => {
  
  // Quick Action Handler (Mock)
  const handleAction = (action: string) => {
      onSectionChange(action);
  };

  return (
    <header className="h-16 lg:h-20 bg-white/80 dark:bg-[#13111c]/90 border-b border-gray-200 dark:border-white/5 flex items-center justify-between px-4 lg:px-8 sticky top-0 z-20 shrink-0 transition-all duration-300 shadow-sm backdrop-blur-md">
       <div className="flex items-center gap-4">
          
          {/* Mobile/Tablet Logo - Acts as Home */}
          <div className="lg:hidden h-9 cursor-pointer flex items-center active:scale-95 transition-transform" onClick={onDashboardClick}>
               <img 
                src={COMPANY_INFO.logoUrl} 
                alt={COMPANY_INFO.name} 
                className="h-full w-auto object-contain rounded-md"
              />
          </div>
          
          {/* Desktop Title & Breadcrumb */}
          <div className="flex-col hidden lg:flex">
             <h2 className="text-xl font-bold text-gray-900 dark:text-white leading-none tracking-tight">{title}</h2>
             <div className="flex items-center gap-2 mt-1">
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest bg-gray-100 dark:bg-white/10 px-1.5 rounded">Admin</span>
                <span className="text-[10px] text-gray-400 font-medium">/ System Overview</span>
             </div>
          </div>
       </div>

       <div className="flex items-center gap-3 lg:gap-6">
          {/* Global Search - Desktop */}
          <div className="relative hidden md:block group w-64 lg:w-80">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-jambo-600 transition-colors" size={16} />
             <input 
               type="text" 
               placeholder="Search orders, linguists, invoices..." 
               className="w-full bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-full pl-10 pr-12 py-2.5 text-sm focus:ring-2 focus:ring-jambo-600 focus:bg-white dark:focus:bg-[#1a1625] transition-all outline-none text-gray-800 dark:text-white shadow-sm"
             />
             <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 pointer-events-none opacity-50">
                <kbd className="text-[10px] font-sans bg-white dark:bg-white/10 px-1.5 py-0.5 rounded border border-gray-200 dark:border-white/10">⌘K</kbd>
             </div>
          </div>

          <div className="flex items-center gap-2">
             
             {/* Quick Actions Toolbar */}
             <div className="hidden lg:flex items-center gap-1 bg-gray-100 dark:bg-white/5 p-1 rounded-full border border-gray-200 dark:border-white/5 mr-2">
                <button 
                    onClick={() => handleAction('jobs')}
                    className="p-2 text-gray-600 dark:text-gray-300 hover:text-jambo-600 dark:hover:text-white hover:bg-white dark:hover:bg-white/10 rounded-full transition-all"
                    title="Create Job"
                >
                    <Plus size={18} />
                </button>
                <button 
                    onClick={() => handleAction('linguists')}
                    className="p-2 text-gray-600 dark:text-gray-300 hover:text-jambo-600 dark:hover:text-white hover:bg-white dark:hover:bg-white/10 rounded-full transition-all"
                    title="Add User"
                >
                    <UserPlus size={18} />
                </button>
                <button 
                    onClick={() => handleAction('financials')}
                    className="p-2 text-gray-600 dark:text-gray-300 hover:text-jambo-600 dark:hover:text-white hover:bg-white dark:hover:bg-white/10 rounded-full transition-all"
                    title="New Invoice"
                >
                    <FileText size={18} />
                </button>
             </div>

             <div className="h-6 w-px bg-gray-200 dark:bg-white/10 hidden lg:block mx-1"></div>

             {/* Standard Actions */}
             <button 
                onClick={() => onNavigate('home')}
                className="hidden md:block p-2 text-gray-400 hover:text-jambo-600 dark:hover:text-white transition-colors hover:bg-gray-100 dark:hover:bg-white/5 rounded-full"
                title="View Website"
             >
                <Globe size={20} />
             </button>

             <ThemeToggle />
             
             <NotificationPanel onNavigate={onSectionChange} />
             
             {/* Admin Profile Avatar (Desktop Only - Mobile uses BottomNav) */}
             <div className="hidden lg:flex w-9 h-9 rounded-full bg-gradient-to-br from-jambo-700 to-jambo-900 items-center justify-center text-white text-xs font-bold ml-2 border-2 border-white dark:border-white/10 shadow-md cursor-default">
                AD
             </div>
          </div>
       </div>
    </header>
  );
};
