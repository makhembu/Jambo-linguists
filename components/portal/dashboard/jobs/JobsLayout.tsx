
import React from 'react';
import { JobsAvailable } from './JobsAvailable';
import { JobsBookings } from './JobsBookings';
import { JobsHistory } from './JobsHistory';
import { JobsCalendar } from './JobsCalendar';
import { Briefcase, CalendarCheck, History, Calendar } from 'lucide-react';
import { ToastType } from '../Toast';

interface JobsLayoutProps {
  activeSection: string;
  navigateToSection: (section: string, jobId?: string) => void;
  targetJobId: string | null;
  showToast: (msg: string, type: ToastType) => void;
}

export const JobsLayout = ({ activeSection, navigateToSection, targetJobId, showToast }: JobsLayoutProps) => {
  
  // If user navigated to "Jobs" root via bottom nav, default to "Available"
  const currentTab = activeSection === 'jobs' ? 'jobs-available' : activeSection;

  const tabs = [
    { id: 'jobs-available', label: 'Marketplace', icon: Briefcase },
    { id: 'jobs-bookings', label: 'My Bookings', icon: CalendarCheck },
    { id: 'jobs-history', label: 'History', icon: History },
    { id: 'jobs-calendar', label: 'Calendar', icon: Calendar },
  ];

  return (
    <div className="space-y-6">
      {/* Tab Navigation - Sticky on Mobile for easy access */}
      <div className="sticky top-0 z-30 bg-gray-50/95 dark:bg-[#0f0a15]/95 backdrop-blur-sm pt-2 pb-4 -mx-4 px-4 sm:mx-0 sm:px-0">
        <div className="bg-white dark:bg-[#1a1625] rounded-xl p-1 shadow-sm border border-gray-200 dark:border-white/5 flex overflow-x-auto no-scrollbar snap-x touch-pan-x">
            {tabs.map((tab) => {
            const isActive = currentTab === tab.id;
            return (
                <button
                key={tab.id}
                onClick={() => navigateToSection(tab.id)}
                className={`
                    flex-1 min-w-[100px] flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-xs font-bold uppercase tracking-wide transition-all snap-center
                    ${isActive 
                    ? 'bg-jambo-600 text-white shadow-md' 
                    : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5'
                    }
                `}
                >
                <tab.icon size={16} />
                <span className="whitespace-nowrap">{tab.label}</span>
                </button>
            );
            })}
        </div>
      </div>

      {/* Content Area */}
      <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
        {currentTab === 'jobs-available' && (
          <JobsAvailable navigateToSection={navigateToSection} initialJobId={targetJobId} showToast={showToast} />
        )}
        {currentTab === 'jobs-bookings' && (
          <JobsBookings navigateToSection={navigateToSection} initialJobId={targetJobId} showToast={showToast} />
        )}
        {currentTab === 'jobs-history' && (
          <JobsHistory navigateToSection={navigateToSection} initialJobId={targetJobId} showToast={showToast} />
        )}
        {currentTab === 'jobs-calendar' && (
          <JobsCalendar navigateToSection={navigateToSection} showToast={showToast} />
        )}
      </div>
    </div>
  );
};
