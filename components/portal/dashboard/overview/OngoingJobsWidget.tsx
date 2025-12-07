
import React from 'react';
import { Calendar, MapPin, Clock, ChevronRight, Briefcase, Loader2, AlertCircle } from 'lucide-react';
import { Job } from '@/data/mockDatabase';
import { IconBox, IconBoxVariant } from '../../../ui/IconBox';

interface OngoingJobsWidgetProps {
  jobs: Job[];
  onClick: (section: string, jobId?: string) => void;
}

export const OngoingJobsWidget = ({ jobs, onClick }: OngoingJobsWidgetProps) => {
  if (jobs.length === 0) {
     return (
        <div className="bg-gradient-to-br from-jambo-600 to-jambo-800 dark:from-jambo-950 dark:to-jambo-900 rounded-2xl p-8 text-white shadow-xl flex items-center justify-center min-h-[220px] relative overflow-hidden group transition-colors duration-300">
           <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 pointer-events-none"></div>
           <div className="text-center opacity-90 relative z-10 flex flex-col items-center">
              <div className="mb-3">
                 <IconBox icon={Briefcase} variant="glass" size="md" />
              </div>
              <h3 className="text-lg font-bold font-serif">No Active Assignments</h3>
              <p className="text-sm mt-1 text-jambo-100 mb-4">Your schedule is currently clear.</p>
              <button 
                onClick={() => onClick('jobs-available')}
                className="bg-white text-jambo-900 px-6 py-2 rounded-lg text-sm font-bold hover:bg-jambo-50 transition-colors"
              >
                Find Work
              </button>
           </div>
        </div>
     );
  }

  // Helper to determine card styling
  const getJobTheme = (job: Job): { wrapper: string, accent: string, badge: string, iconVariant: IconBoxVariant, statusLabel: string } => {
      if (job.status === 'In Progress') {
          return {
              wrapper: 'bg-blue-50/80 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800',
              accent: 'bg-blue-500',
              badge: 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/40 dark:text-blue-300 dark:border-blue-700',
              iconVariant: 'info',
              statusLabel: 'In Progress'
          };
      }
      if (job.status === 'Revision' || (job.status === 'Open' && job.isUrgent)) {
          return {
              wrapper: 'bg-amber-50/80 border-amber-200 dark:bg-amber-900/20 dark:border-amber-800',
              accent: 'bg-amber-500',
              badge: 'bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900/40 dark:text-amber-300 dark:border-amber-700',
              iconVariant: 'warning',
              statusLabel: job.status === 'Revision' ? 'Revision Needed' : 'Urgent'
          };
      }
      // Default / Scheduled
      return {
          wrapper: 'bg-purple-50/60 border-purple-100 dark:bg-[#1a1625] dark:border-purple-900/30',
          accent: 'bg-jambo-600',
          badge: 'bg-white text-jambo-700 border-purple-100 dark:bg-white/5 dark:text-jambo-300 dark:border-white/10',
          iconVariant: 'brand',
          statusLabel: 'Scheduled'
      };
  };

  return (
    <div className="space-y-4">
        <div className="flex items-center justify-between">
            <h3 className="text-xl font-serif font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <Clock size={20} className="text-jambo-600 dark:text-jambo-400" />
                Upcoming Schedule
            </h3>
            <button 
                onClick={() => onClick('jobs-bookings')}
                className="text-xs font-bold text-gray-500 hover:text-jambo-600 dark:text-gray-400 dark:hover:text-white transition-colors"
            >
                View All Bookings
            </button>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
            {jobs.slice(0, 2).map(job => {
                const theme = getJobTheme(job);
                const isUrgent = job.isUrgent;

                return (
                    <div 
                        key={job.id}
                        onClick={() => onClick('jobs-bookings', job.id)}
                        className={`relative overflow-hidden rounded-xl p-5 border cursor-pointer transition-all hover:-translate-y-1 hover:shadow-lg group ${theme.wrapper}`}
                    >
                        {/* Left Accent Bar */}
                        <div className={`absolute left-0 top-0 bottom-0 w-1 ${theme.accent}`}></div>

                        {/* Top Badge Row */}
                        <div className="flex items-start justify-between mb-3 pl-2">
                            <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-md border flex items-center gap-1.5 ${theme.badge}`}>
                                {job.status === 'In Progress' ? <Loader2 size={10} className="animate-spin"/> : <Clock size={10} />}
                                {theme.statusLabel}
                            </span>
                            
                            {isUrgent && job.status !== 'Revision' && (
                                <span className="text-[10px] font-bold uppercase tracking-wider text-red-600 dark:text-red-400 flex items-center gap-1 bg-red-50 dark:bg-red-900/20 px-2 py-1 rounded-full">
                                    <AlertCircle size={10} /> Urgent
                                </span>
                            )}
                        </div>

                        {/* Content */}
                        <div className="pl-2">
                            <div className="mb-3">
                                <h4 className="font-bold text-gray-900 dark:text-white text-lg leading-tight truncate pr-2 group-hover:text-jambo-600 dark:group-hover:text-jambo-400 transition-colors">
                                    {job.title}
                                </h4>
                                <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">{job.category} • Ref: #{job.id.split('-').pop()}</span>
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center gap-2.5 text-sm text-gray-700 dark:text-gray-300">
                                    <IconBox icon={Calendar} variant={theme.iconVariant} size="sm" />
                                    <span className="font-semibold">
                                        {new Date(job.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
                                    </span>
                                    <span className="text-gray-300 dark:text-gray-600">|</span>
                                    <span className="font-medium">{job.time}</span>
                                </div>
                                <div className="flex items-center gap-2.5 text-sm text-gray-600 dark:text-gray-400">
                                    <IconBox icon={MapPin} variant={theme.iconVariant} size="sm" />
                                    <span className="truncate">{job.location.split(',')[0]}</span>
                                </div>
                            </div>
                        </div>

                        {/* Action Arrow */}
                        <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">
                            <div className={`w-8 h-8 rounded-full shadow-sm flex items-center justify-center text-white ${theme.accent}`}>
                                <ChevronRight size={16} />
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    </div>
  );
};
