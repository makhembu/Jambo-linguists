
import React from 'react';
import { Wallet, Clock, CalendarCheck, TrendingUp } from 'lucide-react';
import { FinanceStats as FinanceStatsType } from '../../../../data/types';
import { IconBox } from '../../../ui/IconBox';

interface FinanceStatsProps {
  stats: FinanceStatsType;
}

export const FinanceStats = ({ stats }: FinanceStatsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
      {/* Total Earnings */}
      <div className="bg-gradient-to-br from-jambo-600 to-jambo-700 dark:from-jambo-900 dark:to-jambo-950 p-6 rounded-2xl shadow-lg text-white relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-4 opacity-10 transform group-hover:scale-110 transition-transform">
           <Wallet size={64} />
        </div>
        <p className="text-jambo-200 text-xs font-bold uppercase tracking-widest mb-1">Total Paid (YTD)</p>
        <p className="text-3xl font-bold mb-2">£{stats.totalPaid.toLocaleString('en-GB', { minimumFractionDigits: 2 })}</p>
        <div className="flex items-center gap-2 text-xs text-white/80">
           <TrendingUp size={14} className="text-green-300"/>
           <span>+12% from last month</span>
        </div>
      </div>

      {/* Pending Payout */}
      <div className="bg-white dark:bg-[#1a1625] p-6 rounded-2xl border border-gray-100 dark:border-white/5 shadow-lg">
         <div className="flex items-start justify-between mb-4">
            <div>
               <p className="text-gray-500 dark:text-gray-400 text-xs font-bold uppercase tracking-widest mb-1">Pending Payout</p>
               <p className="text-3xl font-bold text-gray-900 dark:text-white">£{stats.pendingPayout.toLocaleString('en-GB', { minimumFractionDigits: 2 })}</p>
            </div>
            <IconBox icon={Clock} variant="warning" size="md" />
         </div>
         <p className="text-xs text-gray-400">Processing cycle: 14 days</p>
      </div>

      {/* Next Payout Date */}
      <div className="bg-white dark:bg-[#1a1625] p-6 rounded-2xl border border-gray-100 dark:border-white/5 shadow-lg">
         <div className="flex items-start justify-between mb-4">
            <div>
               <p className="text-gray-500 dark:text-gray-400 text-xs font-bold uppercase tracking-widest mb-1">Next Payout</p>
               <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.nextPayoutDate}</p>
            </div>
            <IconBox icon={CalendarCheck} variant="info" size="md" />
         </div>
         <p className="text-xs text-gray-400">Bank transfers usually take 2-3 days</p>
      </div>

      {/* Invoice Count */}
      <div className="bg-white dark:bg-[#1a1625] p-6 rounded-2xl border border-gray-100 dark:border-white/5 shadow-lg flex flex-col justify-center items-center text-center">
         <p className="text-4xl font-bold text-gray-900 dark:text-white mb-1">{stats.invoicesCount}</p>
         <p className="text-gray-500 dark:text-gray-400 text-xs font-bold uppercase tracking-widest">Invoices Generated</p>
         <div className="w-8 h-1 bg-jambo-600 dark:bg-jambo-500 rounded-full mt-3"></div>
      </div>
    </div>
  );
};
