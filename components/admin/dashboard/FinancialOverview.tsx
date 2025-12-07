
import React, { useMemo } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { Job } from '@/data/types';

export const FinancialOverview = ({ jobs }: { jobs: Job[] }) => {
  // Calculate data for the last 6 months based on COMPLETED jobs
  const data = useMemo(() => {
    const months = [];
    const today = new Date();
    
    for (let i = 5; i >= 0; i--) {
      const d = new Date(today.getFullYear(), today.getMonth() - i, 1);
      const monthName = d.toLocaleString('default', { month: 'short' });
      const year = d.getFullYear();
      const monthIdx = d.getMonth();

      // Filter jobs for this month
      const monthJobs = jobs.filter(j => {
        if (j.status !== 'Completed' || !j.completedAt) return false;
        const jobDate = new Date(j.completedAt);
        return jobDate.getMonth() === monthIdx && jobDate.getFullYear() === year;
      });

      // Calculate totals
      // Logic: Payout is what we pay linguists. 
      // Revenue is simulated as Payout / 0.7 (assuming 30% margin) for this demo
      const payout = monthJobs.reduce((sum, j) => sum + (j.totalPayout || 0), 0);
      const income = payout > 0 ? Math.round(payout * 1.45) : 0; // Simulated markup

      months.push({ month: monthName, income, payout });
    }
    return months;
  }, [jobs]);

  const maxVal = Math.max(...data.map(d => Math.max(d.income, d.payout, 100))); // Ensure non-zero divisor
  const currentMonth = data[data.length - 1];
  const prevMonth = data[data.length - 2];
  
  const profit = currentMonth.income - currentMonth.payout;
  const margin = currentMonth.income > 0 ? Math.round((profit / currentMonth.income) * 100) : 0;
  
  const revenueGrowth = prevMonth.income > 0 
    ? ((currentMonth.income - prevMonth.income) / prevMonth.income) * 100 
    : 0;

  return (
    <div className="bg-white dark:bg-[#13111c] rounded-xl shadow-sm border border-gray-200 dark:border-white/5 p-6 h-full flex flex-col">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
            <h3 className="font-serif font-bold text-lg text-gray-900 dark:text-white">Financial Performance</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Gross Revenue vs Linguist Payouts</p>
        </div>
        <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-wide">
            <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-jambo-600"></span> Revenue
            </div>
            <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-gray-300 dark:bg-gray-600"></span> Cost
            </div>
        </div>
      </div>

      <div className="flex-1 flex items-end justify-between gap-2 sm:gap-4 min-h-[200px] relative pt-8">
         {/* Grid Lines */}
         <div className="absolute inset-0 flex flex-col justify-between pointer-events-none text-[10px] text-gray-300 dark:text-gray-600 font-mono">
            <div className="border-b border-dashed border-gray-100 dark:border-white/5 w-full h-px"></div>
            <div className="border-b border-dashed border-gray-100 dark:border-white/5 w-full h-px"></div>
            <div className="border-b border-dashed border-gray-100 dark:border-white/5 w-full h-px"></div>
            <div className="border-b border-dashed border-gray-100 dark:border-white/5 w-full h-px"></div>
            <div className="border-b border-gray-200 dark:border-white/10 w-full h-px"></div>
         </div>

         {data.map((item, idx) => (
             <div key={idx} className="relative h-full flex items-end justify-center gap-1 group">
                 {/* Tooltip */}
                 <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs p-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 pointer-events-none shadow-lg">
                    <div className="font-bold border-b border-white/20 pb-1 mb-1">{item.month}</div>
                    <div className="flex justify-between gap-3"><span>In:</span> <span className="text-green-300 font-mono">£{item.income.toLocaleString()}</span></div>
                    <div className="flex justify-between gap-3"><span>Out:</span> <span className="text-red-300 font-mono">£{item.payout.toLocaleString()}</span></div>
                 </div>

                 {/* Income Bar */}
                 <div 
                    className="w-3 sm:w-6 bg-jambo-600 rounded-t-sm transition-all duration-500 hover:bg-jambo-500 relative z-10"
                    style={{ height: `${Math.max((item.income / maxVal) * 100, 2)}%` }}
                 ></div>
                 
                 {/* Payout Bar */}
                 <div 
                    className="w-3 sm:w-6 bg-gray-300 dark:bg-gray-700 rounded-t-sm transition-all duration-500 hover:bg-gray-400 dark:hover:bg-gray-600 relative z-10"
                    style={{ height: `${Math.max((item.payout / maxVal) * 100, 2)}%` }}
                 ></div>
             </div>
         ))}
      </div>
      
      {/* X-Axis Labels */}
      <div className="flex justify-between mt-4 px-1 sm:px-4">
         {data.map((item, idx) => (
             <div key={idx} className="flex-1 text-center text-[10px] sm:text-xs font-bold text-gray-400 uppercase">
                 {item.month}
             </div>
         ))}
      </div>

      <div className="mt-6 pt-6 border-t border-gray-100 dark:border-white/5 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
              <p className="text-xs text-gray-500 uppercase font-bold">Net Profit ({currentMonth.month})</p>
              <div className="flex items-center gap-2 mt-1">
                  <span className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">£{profit.toLocaleString()}</span>
                  {revenueGrowth >= 0 ? (
                      <span className="text-xs font-bold text-green-500 flex items-center bg-green-50 dark:bg-green-900/20 px-1.5 py-0.5 rounded">
                          <TrendingUp size={12} className="mr-1" /> +{revenueGrowth.toFixed(1)}%
                      </span>
                  ) : (
                      <span className="text-xs font-bold text-red-500 flex items-center bg-red-50 dark:bg-red-900/20 px-1.5 py-0.5 rounded">
                          <TrendingDown size={12} className="mr-1" /> {revenueGrowth.toFixed(1)}%
                      </span>
                  )}
              </div>
          </div>
          <div>
              <p className="text-xs text-gray-500 uppercase font-bold">Margin</p>
              <div className="flex items-center gap-2 mt-1">
                  <span className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">{margin}%</span>
                  <span className="text-xs font-bold text-gray-400 flex items-center">
                      Avg
                  </span>
              </div>
          </div>
      </div>
    </div>
  );
};
