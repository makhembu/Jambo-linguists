
import React, { useState, useEffect } from 'react';
import { PoundSterling, Briefcase, Star } from 'lucide-react';
import { mockDb } from '../../../data/mockDatabase';
import { OngoingJobsWidget } from './overview/OngoingJobsWidget';
import { NewJobsWidget } from './overview/NewJobsWidget';
import { RecentActivity } from './overview/RecentActivity';
import { PageHeader } from '../../ui/PageHeader';
import { StatCard } from '../../ui/StatCard';
import { Badge } from '../../ui/Badge';

export const DashboardOverview = ({ navigateToSection }: { navigateToSection: (section: string, jobId?: string) => void }) => {
  // Use state to trigger re-renders
  const [dataVersion, setDataVersion] = useState(0);

  useEffect(() => {
    const unsubscribe = mockDb.subscribe(() => {
      setDataVersion(v => v + 1);
    });
    return unsubscribe;
  }, []);

  const user = mockDb.auth.getCurrentUser();
  const stats = mockDb.getStats();
  
  // Get active jobs (Scheduled or In Progress) sorted by date
  const ongoingJobs = mockDb.getBookedJobs().sort((a, b) => 
    new Date(a.date + ' ' + (a.time || '00:00')).getTime() - new Date(b.date + ' ' + (b.time || '00:00')).getTime()
  );

  // Get available jobs (Open)
  const allAvailableJobs = mockDb.getAvailableJobs();

  // Filter out expired jobs to match the Marketplace default view
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const todayStr = `${year}-${month}-${day}`;

  const activeOpportunities = allAvailableJobs.filter(job => job.date >= todayStr);
  const notifications = mockDb.getNotifications();

  // Status Indicator Component
  const Status = () => (
    <div>
      <span className="text-xs font-bold text-gray-400 uppercase tracking-widest block text-left md:text-right mb-1">Current Status</span>
      <Badge variant="success" className="animate-pulse">Available for Work</Badge>
    </div>
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
        
        {/* Unified Page Header */}
        <PageHeader 
          title={`Good Morning, ${user?.firstName || 'Linguist'}`}
          subtitle="Here's your schedule and new opportunities."
          statusIndicator={<Status />}
        />

        {/* BENTO GRID STATS LAYOUT */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            <div className="col-span-2 md:col-span-1">
                <StatCard 
                    title={stats.earningsLabel} 
                    value={stats.earnings} 
                    subtext={stats.earningsTrend} 
                    icon={PoundSterling} 
                    variant="brand"
                    trend={true} 
                />
            </div>
            <div className="col-span-1">
                <StatCard 
                    title="Jobs Done" 
                    value={stats.completedJobs.toString()} 
                    subtext="All time" 
                    icon={Briefcase} 
                    variant="teal"
                />
            </div>
            <div className="col-span-1">
                <StatCard 
                    title="Quality" 
                    value={stats.qualityScore} 
                    subtext={stats.qualityScoreSubtext} 
                    icon={Star} 
                    variant="orange"
                />
            </div>
        </div>

        {/* MAIN LAYOUT GRID */}
        <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column (Main Content) */}
            <div className="lg:col-span-2 space-y-8">
                <OngoingJobsWidget jobs={ongoingJobs} onClick={navigateToSection} />
                <NewJobsWidget jobs={activeOpportunities} onClick={navigateToSection} />
            </div>

            {/* Right Column (Sidebar) */}
            <div className="lg:col-span-1 space-y-6">
                 <RecentActivity 
                    notifications={notifications} 
                    onItemClick={navigateToSection}
                />
                
                <div className="bg-brand-teal text-white rounded-2xl p-6 shadow-lg relative overflow-hidden group hover:shadow-xl transition-shadow">
                    <div className="relative z-10">
                        <h4 className="font-serif font-bold text-lg mb-2">Refer a Linguist</h4>
                        <p className="text-sm opacity-90 mb-4">Know a skilled interpreter? Refer them to Jambo and earn a bonus.</p>
                        <button className="bg-white text-brand-teal font-bold px-4 py-2 rounded-lg text-sm hover:bg-teal-50 transition-colors shadow-md">
                            Get Referral Link
                        </button>
                    </div>
                    <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-white/20 rounded-full blur-2xl group-hover:scale-125 transition-transform duration-700"></div>
                </div>
            </div>
        </div>
    </div>
  );
};
