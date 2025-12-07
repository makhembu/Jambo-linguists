
import React from 'react';
import { Invoice } from '@/data/types';
import { PoundSterling, Clock, AlertCircle, CheckCircle, FileText } from 'lucide-react';

interface AdminFinanceStatsProps {
  invoices: Invoice[];
}

export const AdminFinanceStats = ({ invoices }: AdminFinanceStatsProps) => {
  const totalPaid = invoices
    .filter(i => i.status === 'Paid')
    .reduce((sum, i) => sum + i.amount, 0);

  const totalPending = invoices
    .filter(i => i.status === 'Pending')
    .reduce((sum, i) => sum + i.amount, 0);

  const overdueCount = invoices.filter(i => i.status === 'Overdue').length;
  const overdueAmount = invoices
    .filter(i => i.status === 'Overdue')
    .reduce((sum, i) => sum + i.amount, 0);

  const draftAmount = invoices
    .filter(i => i.status === 'Draft')
    .reduce((sum, i) => sum + i.amount, 0);

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
      {/* Total Paid */}
      <div className="bg-white dark:bg-[#13111c] p-4 md:p-6 rounded-xl border border-gray-200 dark:border-white/5 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="w-10 h-10 p-2 rounded-xl bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border border-green-200 dark:border-green-800 flex items-center justify-center">
             <PoundSterling size={20} />
          </div>
          <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-gray-400">Paid YTD</span>
        </div>
        <h3 className="text-xl md:text-3xl font-bold text-gray-900 dark:text-white mb-1">
          £{totalPaid.toLocaleString('en-GB', { minimumFractionDigits: 0, maximumFractionDigits: 2 })}
        </h3>
        <p className="text-[10px] md:text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
          <CheckCircle size={10} className="text-green-500" /> Settled
        </p>
      </div>

      {/* Pending Payouts */}
      <div className="bg-white dark:bg-[#13111c] p-4 md:p-6 rounded-xl border border-gray-200 dark:border-white/5 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="w-10 h-10 p-2 rounded-xl bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400 border border-orange-200 dark:border-orange-800 flex items-center justify-center">
             <Clock size={20} />
          </div>
          <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-gray-400">Outstanding</span>
        </div>
        <h3 className="text-xl md:text-3xl font-bold text-gray-900 dark:text-white mb-1">
          £{totalPending.toLocaleString('en-GB', { minimumFractionDigits: 0, maximumFractionDigits: 2 })}
        </h3>
        <p className="text-[10px] md:text-xs text-gray-500 dark:text-gray-400">
          Due for payment
        </p>
      </div>

      {/* Overdue */}
      <div className="bg-white dark:bg-[#13111c] p-4 md:p-6 rounded-xl border border-gray-200 dark:border-white/5 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="w-10 h-10 p-2 rounded-xl bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border border-red-200 dark:border-red-800 flex items-center justify-center">
             <AlertCircle size={20} />
          </div>
          <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-gray-400">Overdue</span>
        </div>
        <h3 className="text-xl md:text-3xl font-bold text-gray-900 dark:text-white mb-1">
          £{overdueAmount.toLocaleString('en-GB', { minimumFractionDigits: 0, maximumFractionDigits: 2 })}
        </h3>
        <p className="text-[10px] md:text-xs text-red-500 font-bold">
          {overdueCount} invoices late
        </p>
      </div>

      {/* Drafts / Unsent */}
      <div className="bg-white dark:bg-[#13111c] p-4 md:p-6 rounded-xl border border-gray-200 dark:border-white/5 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="w-10 h-10 p-2 rounded-xl bg-gray-100 text-gray-600 dark:bg-white/10 dark:text-gray-400 border border-gray-200 dark:border-white/10 flex items-center justify-center">
             <FileText size={20} />
          </div>
          <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-gray-400">Drafts</span>
        </div>
        <h3 className="text-xl md:text-3xl font-bold text-gray-900 dark:text-white mb-1">
          £{draftAmount.toLocaleString('en-GB', { minimumFractionDigits: 0, maximumFractionDigits: 2 })}
        </h3>
        <p className="text-[10px] md:text-xs text-gray-500 dark:text-gray-400">
          Not yet issued
        </p>
      </div>
    </div>
  );
};
