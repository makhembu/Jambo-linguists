
import React from 'react';
import { Calendar, MapPin, PoundSterling, Lock, FileText, Download, ExternalLink } from 'lucide-react';
import { Job } from '@/data/types';
import { JobStatusBadge } from '../../../ui/JobStatusBadge';
import { LinguistSelector } from './LinguistSelector';
import { User } from '@/data/types';

interface JobOverviewProps {
  job: Job;
  linguist: User | null | undefined;
  allLinguists: User[];
  isAssignmentLocked: boolean;
  onAssign: (id: string | null) => void;
  onViewProfile: (id: string) => void;
}

export const JobOverview = ({ job, linguist, allLinguists, isAssignmentLocked, onAssign, onViewProfile }: JobOverviewProps) => {
  
  const renderFiles = () => (
    job.attachments && job.attachments.length > 0 ? (
        <div className="space-y-2">
            {job.attachments.map((file, idx) => (
                <div key={idx} className="flex items-center justify-between p-2 rounded-lg bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5 group">
                    <div className="flex items-center gap-2 overflow-hidden">
                        <div className="bg-white dark:bg-white/10 p-1.5 rounded text-jambo-600 dark:text-jambo-400">
                            <FileText size={14} />
                        </div>
                        <span className="text-xs font-bold text-gray-700 dark:text-gray-300 truncate">{file.name}</span>
                    </div>
                    <a 
                        href={file.url} 
                        download={file.type === 'file'}
                        target="_blank"
                        rel="noreferrer"
                        className="text-gray-400 hover:text-jambo-600 dark:hover:text-white transition-colors"
                        title={file.type === 'link' ? 'Open Link' : 'Download'}
                    >
                        {file.type === 'link' ? <ExternalLink size={14} /> : <Download size={14} />}
                    </a>
                </div>
            ))}
        </div>
    ) : (
        <p className="text-xs text-gray-400 italic">No source files attached.</p>
    )
  );

  return (
    <div className="p-6 space-y-8">
        {/* Status */}
        <div>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-2">Job Status</span>
            <JobStatusBadge status={job.status} />
        </div>

        {/* Linguist Assignment */}
        <div>
            <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Assigned Linguist</span>
                {isAssignmentLocked && <div title="Cannot reassign while pending review"><Lock size={12} className="text-gray-400" /></div>}
            </div>
            <LinguistSelector 
                allLinguists={allLinguists}
                currentLinguist={linguist}
                onSelect={onAssign}
                disabled={isAssignmentLocked}
            />
            {isAssignmentLocked && (
                <p className="text-[10px] text-gray-400 mt-2 italic bg-gray-50 dark:bg-white/5 p-2 rounded">
                    Reassignment is disabled for this status. Request a revision to unlock.
                </p>
            )}
            {linguist && (
                <div className="mt-2 flex justify-end">
                    <button 
                        className="text-[10px] font-bold text-jambo-600 dark:text-jambo-400 hover:underline"
                        onClick={() => onViewProfile(linguist.id)}
                    >
                        View Profile
                    </button>
                </div>
            )}
        </div>

        <div className="h-px bg-gray-100 dark:bg-white/5"></div>

        {/* Details */}
        <div className="space-y-4 text-sm">
            <div className="flex gap-3">
                <Calendar size={16} className="text-gray-400 shrink-0" />
                <div>
                    <p className="font-bold text-gray-900 dark:text-white">Date & Time</p>
                    <p className="text-gray-500 dark:text-gray-400">{new Date(job.date).toLocaleDateString()} at {job.time}</p>
                </div>
            </div>
            <div className="flex gap-3">
                <MapPin size={16} className="text-gray-400 shrink-0" />
                <div>
                    <p className="font-bold text-gray-900 dark:text-white">Location</p>
                    <p className="text-gray-500 dark:text-gray-400 leading-snug break-words">{job.location}</p>
                </div>
            </div>
            <div className="flex gap-3">
                <PoundSterling size={16} className="text-gray-400 shrink-0" />
                <div>
                    <p className="font-bold text-gray-900 dark:text-white">Rate</p>
                    <p className="text-gray-500 dark:text-gray-400 font-mono">{job.rate}</p>
                </div>
            </div>
        </div>

        <div className="h-px bg-gray-100 dark:bg-white/5"></div>

        {/* Attachments */}
        <div>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-3">Job Files</span>
            {renderFiles()}
        </div>

        <div className="h-px bg-gray-100 dark:bg-white/5"></div>

        <div>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-2">Description</span>
            <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{job.description}</p>
        </div>
    </div>
  );
};
