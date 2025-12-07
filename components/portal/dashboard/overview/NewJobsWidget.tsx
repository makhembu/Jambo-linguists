
import React from 'react';
import { ArrowRight, Briefcase, Sparkles } from 'lucide-react';
import { Job } from '@/data/mockDatabase';
import { IconBox } from '../../../ui/IconBox';

interface NewJobsWidgetProps {
  jobs: Job[];
  onClick: (section: string, jobId?: string) => void;
}

export const NewJobsWidget = ({ jobs, onClick }: NewJobsWidgetProps) => {
  const count = jobs.length;

  return (
    <div 
      onClick={() => onClick('jobs-available')}
      className="bg-gradient-to-br from-brand-teal to-teal-600 dark:from-teal-800 dark:to-teal-900 rounded-2xl shadow-lg p-8 relative overflow-hidden group cursor-pointer transition-transform hover:-translate-y-1"
    >
        {/* Background Decor */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-black/10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2"></div>

        <div className="relative z-10 flex items-center justify-between">
            <div className="space-y-4">
                <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-white text-xs font-bold uppercase tracking-widest border border-white/20">
                    <Sparkles size={12} />
                    <span>Job Feed</span>
                </div>
                
                <div>
                    <h3 className="text-4xl md:text-5xl font-serif font-bold text-white mb-2">
                        {count} New
                    </h3>
                    <p className="text-teal-50 text-lg font-medium">
                        Opportunities Available
                    </p>
                </div>

                <p className="text-teal-100 text-sm max-w-md leading-relaxed">
                    {count > 0 
                        ? "Fresh assignments matching your language pair and location are waiting for you in the marketplace." 
                        : "No new jobs available at the moment. Check back later for updates."}
                </p>
            </div>

            <div className="hidden sm:block group-hover:scale-110 transition-transform duration-500">
                <IconBox icon={Briefcase} variant="glass" size="2xl" />
            </div>
        </div>

        <div className="mt-8 flex items-center gap-2 text-white font-bold text-sm uppercase tracking-wide group-hover:gap-3 transition-all">
            Browse Marketplace <ArrowRight size={16} />
        </div>
    </div>
  );
};
