'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { AdminSidebar } from '../components/admin/AdminSidebar';
import { AdminHeader } from '../components/admin/AdminHeader';
import { AdminBottomNav } from '../components/admin/AdminBottomNav';
import { AdminDashboard } from '../components/admin/AdminDashboard';
import { AdminJobs } from '../components/admin/jobs/AdminJobs';
import { AdminJobsCalendar } from '../components/admin/jobs/AdminJobsCalendar';
import { AdminUsers } from '../components/admin/users/AdminUsers';
import { AdminFinance } from '../components/admin/finance/AdminFinance';
import { AdminCompliance } from '../components/admin/compliance/AdminCompliance';
import { AdminContent } from '../components/admin/content/AdminContent';
import { AdminAuth } from '../components/admin/AdminAuth';
import { AdminSettings } from '../components/admin/settings/AdminSettings'; 
import { PortalMessages } from '../components/portal/dashboard/messages/PortalMessages';
import { UnderConstruction } from '../components/portal/dashboard/UnderConstruction';
import { mockDb } from '@/data/mockDatabase';
import { AdminBlogManager } from '../components/admin/blog/AdminBlogManager';
import { SeoHead } from '../components/seo/SeoHead';
import { MobileFAB, FABAction } from '../components/ui/MobileFAB';
import { Briefcase, FileText, MessageSquare, PenTool, Users } from 'lucide-react';

export const AdminPage = () => {
  const router = useRouter();

  const [activeSection, setActiveSection] = useState('dashboard');
  const [view, setView] = useState<'auth' | 'dashboard'>('auth');
  
  const [jobsFilter, setJobsFilter] = useState('All');

  const [jobsAction, setJobsAction] = useState<string | null>(null);
  const [blogAction, setBlogAction] = useState<string | null>(null);

  useEffect(() => {
    const user = mockDb.auth.getCurrentUser();
    if (user && user.role === 'admin') {
      setView('dashboard');
    }
  }, []);

  const navigateHome = () => {
    router.push('/');
  };

  const handleDashboardNavigation = (sectionOrLink: string, filterOverride?: string) => {
    let section = sectionOrLink;
    let activeFilter = filterOverride;

    if (sectionOrLink.includes(':')) {
      const [main, filter] = sectionOrLink.split(':');
      section = main;
      activeFilter = filter;
    }

    setActiveSection(section);
    if (activeFilter) setJobsFilter(activeFilter);

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (view === 'auth') {
    return (
      <>
        <SeoHead title="Admin Access" forceNoIndex={true} />
        <AdminAuth 
          onLoginSuccess={() => setView('dashboard')}
          onNavigateHome={navigateHome}
        />
      </>
    );
  }

  const getTitle = () => {
    switch(activeSection) {
      case 'dashboard': return 'Admin Control Center';
      case 'jobs': 
      case 'jobs-list': return 'Job Operations';
      case 'jobs-calendar': return 'Operations Calendar';
      case 'linguists': return 'Linguist Directory';
      case 'financials': return 'Financial Operations';
      case 'compliance': return 'Compliance Management';
      case 'content': return 'LMS & Resources';
      case 'settings': return 'System Settings';
      case 'messages': return 'Messages';
      case 'blog': return 'Blog Manager';
      default: return 'Admin Portal';
    }
  };

  const fabActions: FABAction[] = [
    { label: 'Add Job', icon: Briefcase, onClick: () => { setActiveSection('jobs'); setJobsAction('create-job'); }, variant: 'brand' },
    { label: 'New Invoice', icon: FileText, onClick: () => setActiveSection('financials'), variant: 'success' },
    { label: 'Messages', icon: MessageSquare, onClick: () => setActiveSection('messages'), variant: 'info' },
    { label: 'Linguists', icon: Users, onClick: () => setActiveSection('linguists'), variant: 'warning' },
    { label: 'Blog Post', icon: PenTool, onClick: () => { setActiveSection('blog'); setBlogAction('create-post'); }, variant: 'neutral' },
  ];

  return (
    <div className="flex h-screen w-full bg-gray-50 dark:bg-[#0b0a10] font-sans text-gray-800 dark:text-gray-200">
      <SeoHead title={`Admin - ${getTitle()}`} forceNoIndex={true} />
      
      <AdminSidebar 
        activeSection={activeSection} 
        setActiveSection={(s) => { setActiveSection(s); setJobsFilter('All'); }}
      />

      <div className="flex-1 flex flex-col min-w-0 relative h-full">
        <AdminHeader 
          title={getTitle()}
          onDashboardClick={() => handleDashboardNavigation('dashboard')}
          onSectionChange={(section) => handleDashboardNavigation(section)}
        />

        <div className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 custom-scrollbar pb-32 lg:pb-8">
          <div className="max-w-[1600px] mx-auto animate-in fade-in duration-500">
            
            {activeSection === 'dashboard' && (
              <AdminDashboard onNavigate={handleDashboardNavigation} />
            )}

            {(activeSection === 'jobs' || activeSection === 'jobs-list') && (
              <AdminJobs 
                initialFilter={jobsFilter} 
                actionRequest={jobsAction} 
                onActionComplete={() => setJobsAction(null)}
              />
            )}

            {activeSection === 'jobs-calendar' && <AdminJobsCalendar />}
            {activeSection === 'linguists' && <AdminUsers />}
            {activeSection === 'financials' && <AdminFinance />}
            {activeSection === 'compliance' && <AdminCompliance />}
            {activeSection === 'content' && <AdminContent />}
            {activeSection === 'settings' && <AdminSettings />}
            {activeSection === 'messages' && <PortalMessages />}
            
            {activeSection === 'blog' && (
              <AdminBlogManager
                actionRequest={blogAction}
                onActionComplete={() => setBlogAction(null)}
              />
            )}

            {![
              'dashboard','jobs','jobs-list','jobs-calendar',
              'linguists','financials','compliance','content',
              'settings','messages','blog'
            ].includes(activeSection) && (
              <UnderConstruction title={activeSection.charAt(0).toUpperCase() + activeSection.slice(1)} />
            )}
          </div>
        </div>
      </div>

      <MobileFAB actions={fabActions} />

      <AdminBottomNav 
        activeSection={activeSection} 
        setActiveSection={setActiveSection}
      />
    </div>
  );
};
