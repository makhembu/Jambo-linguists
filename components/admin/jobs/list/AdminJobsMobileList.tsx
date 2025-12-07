
import React from 'react';
import { Job } from '@/data/types';
import { Clock, MapPin, Briefcase, MoreVertical, ArrowRight, User } from 'lucide-react';
import { mockDb } from '@/data/mockDatabase';

interface AdminJobsMobileListProps {
    jobs: Job[];
    onJobSelect: (job: Job) => void;
    getStatusColor: (status: string) => string;
}

export const AdminJobsMobileList = ({ jobs, onJobSelect, getStatusColor }: AdminJobsMobileListProps) => {
    
    const getRateDisplay = (job: Job) => {
        if (job.totalPayout) return `£${job.totalPayout.toFixed(2)}`;
        
        if (job.category === 'Translation' && job.wordRate !== undefined) {
            // Display exact pence value (e.g. 0.065 -> 6.5p)
            return `${(job.wordRate * 100).toString()}p/word`; 
        }
        if (job.category === 'Interpreting' && job.hourlyRate) {
            return `£${job.hourlyRate.toFixed(2)}/hr`;
        }
        if (job.category === 'Transcription' && job.minuteRate) {
            return `£${job.minuteRate.toFixed(2)}/min`;
        }
        if (job.fixedRate) {
            return `£${job.fixedRate.toFixed(2)} Fixed`;
        }
        return job.rate;
    };

    return (
        <div className="md:hidden divide-y divide-gray-100 dark:divide-white/5">
            {jobs.map(job => {
                const linguist = job.linguistId ? mockDb.getAllUsers().find(u => u.id === job.linguistId) : null;
                
                return (
                    <div key={job.id} className="p-4 space-y-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-white/5" onClick={() => onJobSelect(job)}>
                        <div className="flex justify-between items-start">
                            <div>
                                <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${getStatusColor(job.status)}`}>
                                    {job.status}
                                </span>
                                <h4 className="font-bold text-gray-900 dark:text-white mt-1">{job.title}</h4>
                                <p className="text-xs text-gray-500 font-mono">#{job.id}</p>
                            </div>
                            {job.status === 'Pending Approval' ? (
                                <span className="bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 p-1.5 rounded-full"><Clock size={16} /></span>
                            ) : (
                                <button className="p-2 text-gray-400 hover:bg-gray-50 rounded-lg">
                                    <MoreVertical size={16} />
                                </button>
                            )}
                        </div>
                        
                        {/* Details Grid */}
                        <div className="grid grid-cols-2 gap-2 text-xs text-gray-600 dark:text-gray-400">
                            <div className="flex items-center gap-1"><Clock size={12}/> {new Date(job.date).toLocaleDateString()}</div>
                            <div className="flex items-center gap-1"><MapPin size={12}/> {job.location.split(',')[0]}</div>
                            <div className="flex items-center gap-1"><Briefcase size={12}/> {job.category}</div>
                            <div className="font-bold text-jambo-600 dark:text-jambo-400">{getRateDisplay(job)}</div>
                        </div>

                        {/* Linguist Section */}
                        {linguist ? (
                            <div className="flex items-center gap-2 p-2 bg-gray-50 dark:bg-white/5 rounded-lg border border-gray-100 dark:border-white/5">
                                <div className="w-6 h-6 rounded-full bg-jambo-100 dark:bg-jambo-900 text-jambo-700 dark:text-jambo-300 flex items-center justify-center text-[10px] font-bold overflow-hidden shrink-0">
                                    {linguist.avatarUrl ? <img src={linguist.avatarUrl} className="w-full h-full object-cover" alt="Linguist"/> : linguist.firstName[0]}
                                </div>
                                <span className="text-xs font-bold text-gray-700 dark:text-gray-300">{linguist.firstName} {linguist.lastName}</span>
                            </div>
                        ) : (
                            <div className="flex items-center gap-2 p-2 bg-gray-50 dark:bg-white/5 rounded-lg border border-gray-100 dark:border-white/5 border-dashed">
                                <div className="w-6 h-6 rounded-full bg-gray-200 dark:bg-white/10 flex items-center justify-center text-gray-400 shrink-0">
                                    <User size={12} />
                                </div>
                                <span className="text-xs text-gray-400 italic">Unassigned</span>
                            </div>
                        )}

                        {job.status === 'Pending Approval' && (
                            <button 
                                onClick={(e) => { e.stopPropagation(); onJobSelect(job); }}
                                className="w-full mt-2 bg-jambo-600 text-white text-xs font-bold py-2.5 rounded-lg flex items-center justify-center gap-2 shadow-sm"
                            >
                                Review Submission <ArrowRight size={14} />
                            </button>
                        )}
                    </div>
                );
            })}
        </div>
    );
};
