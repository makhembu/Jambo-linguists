'use client';
import React from 'react';
import { MapPin, ArrowRight, Calendar, AlertCircle } from 'lucide-react';
import { Job } from '@/data/mockDatabase';
import { Card } from '../../../ui/Card';
import { Badge } from '../../../ui/Badge';

export interface JobCardProps {
  job: Job;
  onClick: () => void;
}

export const JobCard: React.FC<JobCardProps> = ({ job, onClick }) => {
  const isExpired = job.status === 'Open' && new Date(job.date) < new Date();

  return (
    <Card 
      onClick={onClick}
      hoverEffect={true}
      className={`p-5 flex flex-col h-full group ${isExpired ? 'opacity-60' : ''}`}
    >
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
         <Badge variant={job.status === 'Open' ? 'brand' : (job.status === 'Completed' ? 'success' : 'info')} className="mb-1">
            {job.status}
         </Badge>
         {job.isUrgent && !isExpired && (
             <span className="text-[10px] font-bold text-red-500 flex items-center gap-1 uppercase tracking-wide animate-pulse">
                 <AlertCircle size={12} /> Urgent
             </span>
         )}
      </div>

      {/* Title & Type */}
      <h3 className="font-serif font-bold text-lg text-gray-900 dark:text-white leading-tight mb-1 group-hover:text-jambo-600 dark:group-hover:text-jambo-400 transition-colors">
          {job.title}
      </h3>
      <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">{job.category} • {job.type}</p>

      {/* Details */}
      <div className="space-y-2 mt-auto">
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
              <Calendar size={14} className="text-gray-400" />
              <span>{new Date(job.date).toLocaleDateString()}</span>
              {job.time && <span className="text-gray-400">| {job.time}</span>}
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
              <MapPin size={14} className="text-gray-400" />
              <span className="truncate">{job.location.split(',')[0]}</span>
          </div>
      </div>

      {/* Footer */}
      <div className="mt-5 pt-4 border-t border-gray-100 dark:border-white/5 flex items-center justify-between">
          <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase">Rate</p>
              <p className="font-bold text-gray-900 dark:text-white">{job.totalPayout ? `£${job.totalPayout}` : job.rate}</p>
          </div>
          <div className="w-8 h-8 rounded-full bg-gray-50 dark:bg-white/5 flex items-center justify-center text-gray-400 group-hover:bg-jambo-600 group-hover:text-white transition-all">
              <ArrowRight size={16} />
          </div>
      </div>
    </Card>
  );
};
