
import React from 'react';
import { PoundSterling, Briefcase, Star, Award } from 'lucide-react';
import { UserStats } from '@/data/types';
import { StatsCard } from '../overview/StatsCard';

export const ProfileStats = ({ stats }: { stats: UserStats }) => {
  return (
    <div className="space-y-6">
       {/* Main Stats Grid */}
       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
          <StatsCard 
             title={stats.earningsLabel}
             value={stats.earnings}
             subtext={stats.earningsTrend}
             icon={PoundSterling}
             iconColor="text-jambo-600 dark:text-jambo-400"
             trend={true}
          />
          <StatsCard 
             title="Jobs Completed"
             value={stats.completedJobs}
             subtext={stats.completedJobsSubtext}
             icon={Briefcase}
             iconColor="text-brand-teal"
          />
          <StatsCard 
             title="Quality Score"
             value={stats.qualityScore}
             subtext={stats.qualityScoreSubtext}
             icon={Star}
             iconColor="text-brand-orange"
          />
       </div>

       {/* Compliance Badge */}
       <div className="bg-gradient-to-br from-gray-900 to-gray-800 dark:from-gray-800 dark:to-gray-700 rounded-xl p-6 text-white shadow-lg border border-white/10">
          <div className="flex items-center gap-3 mb-3">
             <div className="bg-white/20 p-2 rounded-lg">
                <Award size={20} className="text-yellow-400" />
             </div>
             <h4 className="font-bold text-sm uppercase tracking-wide">Compliance Status</h4>
          </div>
          <div className="flex items-center justify-between text-sm">
             <span className="text-gray-300">DBS Check</span>
             <span className="text-green-400 font-bold flex items-center gap-1">● Valid</span>
          </div>
          <div className="w-full bg-white/10 h-1.5 rounded-full mt-3 overflow-hidden">
             <div className="bg-green-500 h-full w-full"></div>
          </div>
       </div>
    </div>
  );
};
