import React, { useState } from 'react';
import { ArrowRight, Calendar, User, Star } from 'lucide-react';
import { Job } from '../../../../data/types';
import { mockDb } from '../../../../data/mockDatabase';
import { AdminJobModal } from '../jobs/AdminJobModal';
import { UserProfileModal } from '../users/UserProfileModal';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../../ui/Table';
import { Badge } from '../../ui/Badge';

export const ActionRequiredTable = ({ jobs, onReview }: { jobs: Job[], onReview?: () => void }) => {
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [selectedLinguistId, setSelectedLinguistId] = useState<string | null>(null);

  // Mock score generator consistent with other components
  const getConfidence = (id: string) => (4 + (id.length % 10) / 10).toFixed(1);

  if (jobs.length === 0) {
    return (
      <div className="p-12 text-center text-gray-400 text-sm flex flex-col items-center">
        <div className="mb-3 w-12 h-12 rounded-xl bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border border-green-200 dark:border-green-800 flex items-center justify-center rotate-[-45deg]">
            <ArrowRight size={24} />
        </div>
        No pending actions required. All cleared!
      </div>
    );
  }

  const handleLinguistClick = (e: React.MouseEvent, linguistId: string) => {
      e.stopPropagation();
      setSelectedLinguistId(linguistId);
  }

  return (
    <>
    <div>
      {/* --- MOBILE VIEW: CARDS --- */}
      <div className="block md:hidden divide-y divide-gray-100 dark:divide-white/5">
        {jobs.map(job => {
            const linguist = job.linguistId ? mockDb.getAllUsers().find(u => u.id === job.linguistId) : null;
            return (
                <div key={job.id} className="p-4 space-y-3 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors cursor-pointer" onClick={() => setSelectedJob(job)}>
                    <div className="flex justify-between items-start">
                        <div>
                            <span className="text-[10px] font-mono text-gray-400">#{job.id}</span>
                            <h4 className="font-bold text-gray-900 dark:text-white leading-tight mt-0.5">{job.title}</h4>
                        </div>
                        <Badge variant="neutral">{job.category}</Badge>
                    </div>
                    
                    <div className="flex flex-col gap-2">
                        {linguist ? (
                            <div className="flex items-center gap-2 p-2 bg-white dark:bg-white/5 rounded-lg border border-gray-100 dark:border-white/5" onClick={(e) => handleLinguistClick(e, linguist.id)}>
                                <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-white/10 flex items-center justify-center overflow-hidden border border-white dark:border-gray-800 shrink-0">
                                    {linguist.avatarUrl ? <img src={linguist.avatarUrl} className="w-full h-full object-cover"/> : <span className="text-xs font-bold text-gray-500">{linguist.firstName[0]}</span>}
                                </div>
                                <div>
                                    <p className="font-bold text-gray-800 dark:text-gray-200 text-xs hover:text-jambo-600 hover:underline">{linguist.firstName} {linguist.lastName}</p>
                                    <p className="text-[10px] text-orange-500 font-bold flex items-center gap-0.5">
                                        <Star size={8} fill="currentColor" /> {getConfidence(linguist.id)} Confidence
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <div className="flex items-center gap-1.5 text-xs text-gray-500">
                                <User size={12} /> Unassigned
                            </div>
                        )}
                        <div className="flex items-center gap-1.5 text-xs text-gray-500">
                            <Calendar size={12} />
                            <span>Completed: {new Date(job.completedAt || new Date()).toLocaleDateString()}</span>
                        </div>
                    </div>

                    <button 
                        onClick={(e) => { e.stopPropagation(); setSelectedJob(job); }}
                        className="w-full mt-2 bg-jambo-600 text-white text-xs font-bold py-2.5 rounded-lg flex items-center justify-center gap-2 shadow-sm hover:bg-jambo-700 active:scale-95 transition-all"
                    >
                        Review Submission <ArrowRight size={14} />
                    </button>
                </div>
            );
        })}
      </div>

      {/* --- DESKTOP VIEW: TABLE --- */}
      <div className="hidden md:block">
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Ref ID</TableHead>
                    <TableHead>Job Title</TableHead>
                    <TableHead>Linguist</TableHead>
                    <TableHead>Completed On</TableHead>
                    <TableHead align="right">Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {jobs.map(job => {
                    const linguist = job.linguistId ? mockDb.getAllUsers().find(u => u.id === job.linguistId) : null;
                    return (
                        <TableRow key={job.id} onClick={() => setSelectedJob(job)}>
                            <TableCell className="font-mono text-xs text-gray-500">{job.id}</TableCell>
                            <TableCell>
                                <span className="font-bold text-gray-900 dark:text-white block truncate max-w-[180px]">{job.title}</span>
                                <span className="text-xs text-gray-500">{job.category}</span>
                            </TableCell>
                            <TableCell>
                                {linguist ? (
                                    <div className="flex items-center gap-2 group cursor-pointer" onClick={(e) => handleLinguistClick(e, linguist.id)}>
                                        <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-white/10 flex items-center justify-center overflow-hidden border-2 border-white dark:border-gray-800 shrink-0">
                                            {linguist.avatarUrl ? (
                                                <img src={linguist.avatarUrl} className="w-full h-full object-cover" alt={`${linguist.firstName}'s avatar`} />
                                            ) : (
                                                <span className="text-xs font-bold text-gray-500">{linguist.firstName[0]}{linguist.lastName[0]}</span>
                                            )}
                                        </div>
                                        <div className="min-w-0">
                                            <p className="font-bold text-gray-900 dark:text-white text-sm truncate group-hover:text-jambo-600 dark:group-hover:text-jambo-400 transition-colors">
                                                {linguist.firstName} {linguist.lastName}
                                            </p>
                                            <p className="text-[10px] text-orange-500 font-bold flex items-center gap-0.5">
                                                <Star size={10} fill="currentColor" /> {getConfidence(linguist.id)} Confidence
                                            </p>
                                        </div>
                                    </div>
                                ) : (
                                    <span className="text-gray-400 text-xs italic">Unknown</span>
                                )}
                            </TableCell>
                            <TableCell className="text-gray-500 text-xs">
                                {new Date(job.completedAt || new Date()).toLocaleDateString()}
                            </TableCell>
                            <TableCell align="right">
                                <button 
                                    onClick={(e) => { e.stopPropagation(); setSelectedJob(job); }}
                                    className="text-xs font-bold bg-white dark:bg-white/10 border border-gray-200 dark:border-white/20 text-gray-700 dark:text-white px-4 py-2 rounded-lg hover:bg-jambo-50 dark:hover:bg-white/20 hover:text-jambo-700 hover:border-jambo-200 transition-all inline-flex items-center gap-2 shadow-sm"
                                >
                                    Review <ArrowRight size={12} />
                                </button>
                            </TableCell>
                        </TableRow>
                    );
                })}
            </TableBody>
        </Table>
      </div>
    </div>

    {selectedJob && (
        <AdminJobModal 
            job={selectedJob} 
            onClose={() => setSelectedJob(null)} 
            onUpdate={() => { 
                const updated = mockDb.getAllJobs().find(j => j.id === selectedJob?.id);
                if (updated) {
                    setSelectedJob(updated);
                }
                // If job not found, do nothing, which keeps modal open with stale data.
                // This is better than closing abruptly if the job moves out of view.
            }} 
        />
    )}

    {selectedLinguistId && (
        <UserProfileModal
            user={mockDb.getAllUsers().find(u => u.id === selectedLinguistId)!}
            onClose={() => setSelectedLinguistId(null)}
            onUpdate={() => {}}
            onNavigate={() => {}}
        />
    )}
    </>
  );
};
