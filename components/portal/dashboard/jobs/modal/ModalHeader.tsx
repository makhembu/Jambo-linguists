
import React from 'react';
import { X, ChevronLeft, AlertCircle, Clock } from 'lucide-react';
import { Job } from '../../../../../data/mockDatabase';
import { JobStatusBadge } from '../../../../ui/JobStatusBadge';

interface ModalHeaderProps {
  job: Job;
  viewMode: 'details' | 'completionForm';
  setViewMode: (mode: 'details' | 'completionForm') => void;
  onClose: () => void;
  theme: { bg: string; text: string; border: string; icon: any };
  currentStatus: string;
}

export const ModalHeader = ({ job, viewMode, setViewMode, onClose, theme, currentStatus }: ModalHeaderProps) => {
  const Icon = theme.icon;
  const isAvailable = currentStatus === 'Open';
  
  // Expiration Logic
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const jobDate = new Date(job.date);
  const isExpired = isAvailable && jobDate < today;

  return (
    <div className="p-4 sm:p-5 md:p-6 border-b border-gray-100 dark:border-white/5 flex justify-between items-start sticky top-0 bg-white dark:bg-[#1a1625] z-20 shadow-sm shrink-0 transition-all">
      <div className="flex gap-3 sm:gap-4 overflow-hidden items-start w-full">
        {viewMode === 'completionForm' ? (
          <button 
            onClick={() => setViewMode('details')} 
            className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-xl bg-gray-100 dark:bg-white/5 flex items-center justify-center shrink-0 hover:bg-gray-200 dark:hover:bg-white/10 transition-colors mt-1"
          >
            <ChevronLeft size={24} className="text-gray-600 dark:text-gray-300" />
          </button>
        ) : (
          <div className={`w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-xl ${isExpired ? 'bg-gray-100 text-gray-500' : `${theme.bg} ${theme.text}`} flex items-center justify-center shrink-0 mt-1 transition-all`}>
            <Icon size={20} className="sm:w-6 sm:h-6 md:w-7 md:h-7 transition-all" />
          </div>
        )}
        
        <div className="min-w-0 flex-1">
          {viewMode === 'completionForm' ? (
            <>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-serif font-bold text-gray-900 dark:text-white leading-tight truncate">
                Submit Completion
              </h2>
              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-medium mt-0.5">Finalizing Job #{job.id}</p>
            </>
          ) : (
            <>
              <div className="flex flex-wrap items-center gap-2 mb-1.5">
                <span className={`text-[10px] sm:text-xs font-bold uppercase tracking-widest px-2 py-0.5 rounded-full border ${isExpired ? 'bg-gray-100 text-gray-500 border-gray-200' : `${theme.bg} ${theme.text} ${theme.border}`}`}>
                  {job.category}
                </span>
                
                <JobStatusBadge status={currentStatus} className="text-[10px] sm:text-xs" />

                {isExpired && (
                    <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest px-2 py-0.5 rounded-full bg-gray-100 text-gray-500 border border-gray-200 flex items-center gap-1">
                        <Clock size={10} /> Expired
                    </span>
                )}

                {!isExpired && job.isUrgent && isAvailable && (
                  <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest px-2 py-0.5 rounded-full bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-300 flex items-center gap-1">
                    <AlertCircle size={10} /> <span className="hidden sm:inline">Urgent</span>
                  </span>
                )}
              </div>
              <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-serif font-bold text-gray-900 dark:text-white leading-tight break-words">
                {job.title}
              </h2>
              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-medium mt-1">Ref ID: #{job.id}</p>
            </>
          )}
        </div>
      </div>
      <button 
        onClick={onClose}
        className="p-2 bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 rounded-full text-gray-500 dark:text-gray-400 transition-colors shrink-0 ml-2 sm:ml-4 mt-1"
        aria-label="Close Modal"
      >
        <X size={20} />
      </button>
    </div>
  );
};
