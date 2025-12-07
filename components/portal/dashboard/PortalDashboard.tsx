
import React, { useState } from 'react';
import { Sidebar, menuItems } from './dashboard/Sidebar';
import { Header } from './dashboard/Header';
import { BottomNav } from './BottomNav';
import { Toast, ToastType } from './dashboard/Toast';
import { DashboardOverview } from './dashboard/Overview';
import { JobsLayout } from './dashboard/jobs/JobsLayout';
import { ResourceLibrary } from './dashboard/resources/ResourceLibrary';
import { UnderConstruction } from './dashboard/UnderConstruction';
import { MyProfile } from './dashboard/profile/MyProfile'; 
import { FinancePage } from './dashboard/finance/FinancePage'; 
import { TrainingModules } from './dashboard/training/TrainingModules';
import { TrainingOngoing } from './dashboard/training/TrainingOngoing';
import { TrainingCertificates } from './dashboard/training/TrainingCertificates';
import { PortalMessages } from './dashboard/messages/PortalMessages';
import { MobileFAB, FABAction } from '../../ui/MobileFAB';
import { Briefcase, Calendar, MessageSquare, HelpCircle } from 'lucide-react';

export const PortalDashboard = ({ onNavigate, onLogout }: { onNavigate: (page: string) => void, onLogout: () => void }) => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [targetJobId, setTargetJobId] = useState<string | null>(null);

  const [toast, setToast] = useState<{ visible: boolean; message: string; type: ToastType }>({
    visible: false,
    message: '',
    type: 'success'
  });

  const showToast = (message: string, type: ToastType = 'success') => {
    setToast({ visible: true, message, type });
  };

  const navigateToSection = (sectionId: string, jobId?: string) => {
    setActiveSection(sectionId);
    if (jobId) {
      setTargetJobId(jobId);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const activeItem = menuItems.find(m => activeSection.startsWith(m.id));
  const activeSubItem = activeItem?.subItems?.find(s => s.id === activeSection);
  const currentLabel = activeSubItem?.label || activeItem?.label || 'Dashboard';

  const isJobSection = activeSection.startsWith('jobs');

  // FAB Actions Configuration
  const fabActions: FABAction[] = [
      { label: 'Find Work', icon: Briefcase, onClick: () => navigateToSection('jobs-available'), variant: 'brand' },
      { label: 'My Bookings', icon: Calendar, onClick: () => navigateToSection('jobs-bookings'), variant: 'info' },
      { label: 'Messages', icon: MessageSquare, onClick: () => navigateToSection('messages'), variant: 'success' },
      { label: 'Support', icon: HelpCircle, onClick: () => window.open('mailto:support@jambolinguists.com'), variant: 'neutral' },
  ];

  return (
    <div className="flex h-screen w-full bg-gray-50 dark:bg-[#0f0a15] font-sans text-gray-800 dark:text-gray-200 transition-colors duration-300 overflow-hidden">
      
      <Toast 
        message={toast.message} 
        type={toast.type} 
        isVisible={toast.visible} 
        onClose={() => setToast(prev => ({ ...prev, visible: false }))} 
      />

      {/* Desktop Sidebar - Hidden completely on mobile */}
      <div className="hidden lg:block shrink-0">
        <Sidebar 
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          onNavigate={onNavigate}
          onLogout={onLogout}
        />
      </div>

      {/* Main Content Column */}
      <div className="flex-1 flex flex-col min-w-0 relative h-full">
         <Header 
           title={currentLabel}
           navigateToSection={navigateToSection}
           onNavigate={onNavigate}
         />

         {/* Scrollable Container */}
         {/* pb-32 ensures content isn't hidden behind BottomNav AND FAB on mobile */}
         <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-10 scroll-smooth pb-32 lg:pb-10 custom-scrollbar bg-gray-50 dark:bg-[#0f0a15]">
            
            <div 
              key={activeSection} 
              className="animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out max-w-7xl mx-auto"
            >
                {activeSection === 'dashboard' && <DashboardOverview navigateToSection={navigateToSection} />}

                {isJobSection && (
                    <JobsLayout 
                        activeSection={activeSection}
                        navigateToSection={navigateToSection}
                        targetJobId={targetJobId}
                        showToast={showToast}
                    />
                )}
                
                {activeSection === 'messages' && <PortalMessages />}

                {(activeSection === 'training' || activeSection === 'training-modules') && (
                    <TrainingModules />
                )}
                
                {activeSection === 'training-ongoing' && (
                    <TrainingOngoing />
                )}

                {activeSection === 'training-certificates' && (
                    <TrainingCertificates />
                )}

                {activeSection === 'resources' && (
                    <ResourceLibrary />
                )}

                {activeSection === 'finance' && (
                    <FinancePage />
                )}
                
                {activeSection === 'profile' && (
                    <MyProfile navigateToSection={navigateToSection} onLogout={onLogout} />
                )}
                
                {!['dashboard', 'messages', 'resources', 'finance', 'profile'].includes(activeSection) && 
                 !isJobSection && 
                 !activeSection.startsWith('training') && (
                    <UnderConstruction title={currentLabel} />
                )}
            </div>
         </main>
      </div>

      {/* Mobile FAB - Z-Index 100 ensures it floats above standard content */}
      <MobileFAB actions={fabActions} />

      {/* Mobile Bottom Navigation - Z-Index 50 */}
      <BottomNav 
        activeSection={activeSection} 
        onNavigate={(section) => navigateToSection(section)} 
        onLogout={onLogout}
      />
    </div>
  );
};
