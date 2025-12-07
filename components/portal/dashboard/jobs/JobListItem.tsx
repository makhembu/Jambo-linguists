
import React from 'react';
import { 
  MapPin, Video, Users, Phone, FileText, Mic, 
  ArrowRight, AlertCircle, Clock
} from 'lucide-react';
import { Job } from '../../../../data/mockDatabase';
import { getInterpretingJobPayout } from './job-helpers';
import { Card } from '../../../ui/Card';

export interface JobListItemProps {
  job: Job;
  onClick: () => void;
}

export const JobListItem: React.FC<JobListItemProps> = ({ job, onClick }) => {
  // Expiration Logic
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const jobDate = new Date(job.date);
  const isExpired = job.status === 'Open' && jobDate < today;

  const getTheme = () => {
    if (isExpired) {
        return {
            barColor: 'bg-gray-400',
            badgeText: 'text-gray-500 dark:text-gray-400',
            badgeBorder: 'border-gray-200 dark:border-white/10',
            badgeBg: 'bg-gray-100 dark:bg-white/5',
            icon: job.type === 'Face-to-Face' ? Users : (job.type === 'Telephone' ? Phone : Video)
        };
    }

    switch (job.category) {
      case 'Interpreting':
        return {
          barColor: 'bg-jambo-600 dark:bg-jambo-500',
          badgeText: 'text-purple-700 dark:text-purple-300',
          badgeBorder: 'border-purple-100 dark:border-purple-800',
          badgeBg: 'bg-purple-50 dark:bg-purple-900/30',
          icon: job.type === 'Face-to-Face' ? Users : (job.type === 'Telephone' ? Phone : Video)
        };
      case 'Translation':
        return {
          barColor: 'bg-brand-teal dark:bg-teal-500',
          badgeText: 'text-teal-700 dark:text-teal-300',
          badgeBorder: 'border-teal-100 dark:border-teal-800',
          badgeBg: 'bg-teal-50 dark:bg-teal-900/30',
          icon: FileText
        };
      case 'Transcription':
        return {
          barColor: 'bg-brand-orange dark:bg-orange-500',
          badgeText: 'text-orange-700 dark:text-orange-300',
          badgeBorder: 'border-orange-100 dark:border-orange-800',
          badgeBg: 'bg-orange-50 dark:bg-orange-900/30',
          icon: Mic
        };
      default:
        return {
          barColor: 'bg-gray-500',
          badgeText: 'text-gray-700 dark:text-gray-300',
          badgeBorder: 'border-gray-100 dark:border-gray-700',
          badgeBg: 'bg-gray-50 dark:bg-gray-800',
          icon: Video
        };
    }
  };

  const theme = getTheme();
  const TypeIcon = theme.icon;
  const showPayout = job.status === 'Completed' && job.totalPayout !== undefined;
  const estimatedPayout = getInterpretingJobPayout(job);

  const rateDisplay = (job.category === 'Translation' && job.wordRate) 
    ? `${(job.wordRate * 100).toFixed(0)}p/word` 
    : job.rate;

  return (
    <Card 
      onClick={onClick}
      hoverEffect={true}
      className={`relative overflow-hidden p-4 flex flex-col md:flex-row items-start md:items-center gap-4 ${isExpired ? 'opacity-80 grayscale-[0.3]' : 'hover:border-jambo-200 dark:hover:border-jambo-700'}`}
    >
      <div className={`absolute left-0 top-0 bottom-0 w-1 ${theme.barColor}`}></div>
      
      {/* Date */}
      <div className="flex md:block items-center gap-2 md:w-16 md:text-center shrink-0 md:border-r border-gray-100 dark:border-white/5 md:pr-4">
         <span className={`block text-xs font-bold uppercase ${isExpired ? 'text-gray-400' : 'text-gray-400 dark:text-gray-500'}`}>{new Date(job.date).toLocaleString('en-US', { month: 'short' })}</span>
         <span className={`block text-xl font-bold ${isExpired ? 'text-gray-500' : 'text-gray-800 dark:text-gray-100'}`}>{new Date(job.date).getDate()}</span>
      </div>

      {/* Main Content */}
      <div className="flex-grow grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-4 items-center w-full">
         
         {/* Info */}
         <div className="md:col-span-5 min-w-0">
            <div className="flex items-center gap-2 mb-1">
                <span className={`text-[10px] font-bold uppercase px-1.5 py-0.5 rounded border ${theme.badgeBg} ${theme.badgeText} ${theme.badgeBorder}`}>
                    {isExpired ? 'Expired' : job.category}
                </span>
                {job.isUrgent && !isExpired && (
                    <span className="text-[10px] font-bold uppercase text-red-600 dark:text-red-400 flex items-center gap-1 animate-pulse">
                        <AlertCircle size={10} /> Urgent
                    </span>
                )}
            </div>
            <h4 className={`font-bold truncate transition-colors ${isExpired ? 'text-gray-600 dark:text-gray-400' : 'text-gray-900 dark:text-white group-hover:text-jambo-600 dark:group-hover:text-jambo-400'}`}>{job.title}</h4>
            <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mt-1">
               <TypeIcon size={12} />
               <span>{job.type}</span>
               <span className="w-1 h-1 bg-gray-300 dark:bg-gray-600 rounded-full"></span>
               <span>#{job.id}</span>
            </div>
         </div>

         {/* Location & Lang */}
         <div className="md:col-span-4 min-w-0 space-y-1">
             <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <MapPin size={14} className="text-gray-400 dark:text-gray-500 shrink-0"/>
                <span className="truncate">{job.location}</span>
             </div>
             <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <span className={`w-3 h-3 rounded-full ${theme.barColor} text-[6px] text-white flex items-center justify-center`}>{job.languagePair.charAt(0)}</span>
                <span className="truncate">{job.languagePair}</span>
             </div>
         </div>

         {/* Rate & Action */}
         <div className="md:col-span-3 flex flex-row md:flex-col justify-between items-center md:items-end w-full md:w-auto mt-2 md:mt-0 pt-2 md:pt-0 border-t md:border-0 border-gray-50 dark:border-white/5">
            <div className="text-left md:text-right">
                <p className={`font-bold text-lg leading-none ${isExpired ? 'text-gray-500' : (showPayout ? 'text-green-600 dark:text-green-500' : 'text-jambo-600 dark:text-jambo-400')}`}>
                    {showPayout 
                        ? `£${job.totalPayout}` 
                        : (estimatedPayout !== null ? `£${estimatedPayout.toFixed(2)}` : rateDisplay)
                    }
                </p>
                <p className="text-[10px] text-gray-400 dark:text-gray-500 font-bold uppercase mt-1">
                    {showPayout ? 'Total Paid' : (estimatedPayout !== null ? 'Est. Total' : (job.duration || (job.category === 'Translation' ? `${job.wordCount} words` : job.wordCount + ' words')))}
                </p>
            </div>
            <div className={`md:hidden text-xs font-bold flex items-center gap-1 ${isExpired ? 'text-gray-400' : 'text-jambo-600 dark:text-jambo-400'}`}>
                View <ArrowRight size={12} />
            </div>
         </div>
      </div>
      
      {/* Desktop Hover Arrow */}
      <div className="pl-4 border-l border-gray-100 dark:border-white/5 hidden md:block">
          <div className="w-8 h-8 rounded-full bg-gray-50 dark:bg-white/5 text-gray-400 dark:text-gray-500 flex items-center justify-center group-hover:bg-jambo-600 dark:group-hover:bg-jambo-500 group-hover:text-white transition-colors">
              <ArrowRight size={16} />
          </div>
      </div>
    </Card>
  );
};
