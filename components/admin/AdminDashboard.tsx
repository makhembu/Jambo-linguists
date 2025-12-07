
import React, { useState, useEffect } from 'react';
import { ActionRequiredTable } from './dashboard/ActionRequiredTable';
import { LiveOperationsFeed } from './dashboard/LiveOperationsFeed';
import { ComplianceWatchlist } from './dashboard/ComplianceWatchlist';
import { QuickActions } from './dashboard/QuickActions';
import { OngoingJobsWidget } from './dashboard/OngoingJobsWidget'; 
import { 
  AlertCircle, Briefcase, PoundSterling, Clock, CheckCircle, Users, ChevronDown, ChevronUp 
} from 'lucide-react';
import { mockDb } from '../../data/mockDatabase';
import { PageHeader } from '../ui/PageHeader';
import { StatCard } from '../ui/StatCard';
import { Badge } from '../ui/Badge';
import { Card } from '../ui/Card';

interface AdminDashboardProps {
  onNavigate?: (section: string, filter?: string) => void;
}

export const AdminDashboard = ({ onNavigate }: AdminDashboardProps) => {
  const [isRegExpanded, setIsRegExpanded] = useState(true);
  const [dataVersion, setDataVersion] = useState(0);

  useEffect(() => {
    const unsubscribe = mockDb.subscribe(() => {
      setDataVersion(v => v + 1);
    });
    return unsubscribe;
  }, []);

  const user = mockDb.auth.getCurrentUser();
  const allJobs = mockDb.getAllJobs();
  const allUsers = mockDb.getAllUsers();
  
  const pendingJobs = allJobs.filter(j => j.status === 'Pending Approval');
  const activeJobs = allJobs.filter(j => j.status === 'In Progress' || j.status === 'Scheduled');
  const openJobs = allJobs.filter(j => j.status === 'Open');
  
  const completedJobs = allJobs.filter(j => j.status === 'Completed');
  const totalPayoutCompleted = completedJobs.reduce((sum, job) => sum + (job.totalPayout || 0), 0);

  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good Morning' : hour < 18 ? 'Good Afternoon' : 'Good Evening';
  const today = new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

  const handleNav = (filter: string) => {
    if (onNavigate) {
      onNavigate('jobs', filter);
    }
  };

  const Status = () => (
    <div>
        <span className="text-xs font-bold text-gray-400 uppercase tracking-widest block text-left md:text-right mb-1">System Status</span>
        <Badge variant="success" className="animate-pulse">Operational</Badge>
    </div>
  );

  return (
    <div className="space-y-8 pb-12">
       <PageHeader 
         title={`${greeting}, ${user?.firstName || 'Admin'}`}
         subtitle={`${today} • System Overview`}
         statusIndicator={<Status />}
       />

       <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          <StatCard 
             title="Action Required"
             value={pendingJobs.length.toString()}
             subtext="Jobs awaiting approval"
             icon={AlertCircle}
             variant="danger"
             onClick={() => handleNav('Pending Approval')}
          />
          <StatCard 
             title="Live Operations"
             value={activeJobs.length.toString()}
             subtext="Jobs active/scheduled"
             icon={Clock}
             variant="info"
             onClick={() => handleNav('Scheduled')}
          />
          <StatCard 
             title="Open Marketplace"
             value={openJobs.length.toString()}
             subtext="Unfilled assignments"
             icon={Briefcase}
             variant="orange"
             onClick={() => handleNav('Open')}
          />
          <StatCard 
             title="Gross Payroll"
             value={`£${totalPayoutCompleted.toLocaleString()}`}
             subtext="Total completed value"
             icon={PoundSterling}
             variant="success"
             onClick={() => handleNav('Completed')}
          />
       </div>

       <div className="grid lg:grid-cols-3 gap-6 md:gap-8 items-start">
          <div className="lg:col-span-2 space-y-6 md:space-y-8">
             <Card className="overflow-hidden">
                <div className="p-4 md:p-6 border-b border-gray-100 dark:border-white/5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-gray-50/50 dark:bg-white/5">
                   <h3 className="font-bold text-lg text-gray-900 dark:text-white flex items-center gap-2 font-serif">
                      <CheckCircle size={20} className="text-jambo-600" /> 
                      Approval Queue
                   </h3>
                   <Badge variant="brand">{pendingJobs.length} Items Pending</Badge>
                </div>
                <ActionRequiredTable jobs={pendingJobs} onReview={() => handleNav('Pending Approval')} />
             </Card>

             <OngoingJobsWidget onNavigate={onNavigate} />
          </div>

          <div className="lg:col-span-1 space-y-6 md:space-y-8">
             <QuickActions onNavigate={onNavigate} />

             <Card className="overflow-hidden flex flex-col transition-all">
                <div className="p-4 md:p-6 border-b border-gray-100 dark:border-white/5 flex justify-between items-center bg-gray-50/50 dark:bg-white/5 cursor-pointer" onClick={() => setIsRegExpanded(!isRegExpanded)}>
                   <h3 className="font-bold text-lg text-gray-900 dark:text-white flex items-center gap-2 font-serif">
                      <Users size={20} className="text-brand-teal" /> 
                      Recent Registrations
                   </h3>
                   <div className="flex items-center gap-2">
                       <button 
                         onClick={(e) => { e.stopPropagation(); onNavigate && onNavigate('linguists'); }}
                         className="text-xs font-bold text-blue-600 hover:underline px-2 py-1"
                       >
                         View All
                       </button>
                       <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors">
                           {isRegExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                       </button>
                   </div>
                </div>
                {isRegExpanded && (
                    <div className="max-h-[400px] overflow-y-auto custom-scrollbar animate-in slide-in-from-top-2 duration-300">
                        <LiveOperationsFeed />
                    </div>
                )}
             </Card>

             <ComplianceWatchlist users={allUsers} />
          </div>
       </div>
    </div>
  );
};
