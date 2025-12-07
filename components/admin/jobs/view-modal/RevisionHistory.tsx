
import React from 'react';
import { AlertCircle, FileText, History, Download, CheckCircle, Clock } from 'lucide-react';
import { Job, JobHistoryEvent } from '../../../../data/types';

interface RevisionHistoryProps {
    job: Job;
}

export const RevisionHistory = ({ job }: RevisionHistoryProps) => {
    // Filter history for revision-related events
    const revisionEvents = (job.history || [])
        .filter(h => h.type === 'REVISION_REQUESTED' || h.type === 'RESUBMITTED')
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    const activeRevision = job.status === 'Revision' 
        ? revisionEvents.find(h => h.type === 'REVISION_REQUESTED' && new Date(h.date).getTime() > new Date(job.completedAt || 0).getTime())
        : null;

    if (revisionEvents.length === 0) {
        return (
            <div className="p-8 text-center border border-dashed border-gray-200 dark:border-white/10 rounded-xl mt-6">
                <div className="w-12 h-12 bg-gray-100 dark:bg-white/5 rounded-full flex items-center justify-center mx-auto mb-3 text-gray-400">
                    <History size={24} />
                </div>
                <p className="text-gray-500 dark:text-gray-400 text-sm">No revision history found for this job.</p>
            </div>
        );
    }

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300 mt-6">
            
            {/* Active Revision Banner */}
            {job.status === 'Revision' && (
                <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-5 shadow-sm">
                    <h3 className="font-bold text-amber-800 dark:text-amber-200 flex items-center gap-2 mb-3">
                        <AlertCircle size={20} /> Active Revision Request
                    </h3>
                    <div className="bg-white dark:bg-black/20 p-4 rounded-lg border border-amber-100 dark:border-amber-900/30">
                        <p className="text-sm text-gray-800 dark:text-gray-200 leading-relaxed">
                            {job.revisionFeedback || "Please review the deliverables and make necessary corrections."}
                        </p>
                        {job.revisionFile && (
                            <div className="mt-3 pt-3 border-t border-amber-100 dark:border-amber-900/30 flex items-center gap-3">
                                <span className="text-xs font-bold text-amber-700 dark:text-amber-300 uppercase">Markup File:</span>
                                <div className="flex items-center gap-2 bg-amber-100 dark:bg-amber-900/40 px-3 py-1.5 rounded-lg text-xs font-bold text-amber-900 dark:text-amber-100">
                                    <FileText size={12} /> {job.revisionFile}
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="mt-3 flex justify-end">
                        <span className="text-xs font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1">
                            <Clock size={12} /> Awaiting Linguist Response
                        </span>
                    </div>
                </div>
            )}

            {/* Timeline */}
            <div className="bg-white dark:bg-[#1a1625] rounded-xl p-6 border border-gray-200 dark:border-white/10 shadow-sm">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                    <History size={14} /> Revision Timeline
                </h3>
                
                <div className="relative border-l-2 border-gray-100 dark:border-white/5 ml-3 space-y-8">
                    {revisionEvents.map((event) => (
                        <div key={event.id} className="relative pl-8">
                            {/* Dot */}
                            <div className={`absolute -left-[9px] top-0 w-4 h-4 rounded-full border-2 border-white dark:border-[#1a1625] ${event.type === 'REVISION_REQUESTED' ? 'bg-amber-500' : 'bg-blue-500'}`}></div>
                            
                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1 mb-2">
                                <div>
                                    <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded border mb-1 inline-block ${
                                        event.type === 'REVISION_REQUESTED' 
                                            ? 'bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-800' 
                                            : 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800'
                                    }`}>
                                        {event.type === 'REVISION_REQUESTED' ? 'Request Sent' : 'Linguist Responded'}
                                    </span>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">{new Date(event.date).toLocaleString()}</p>
                                </div>
                                <span className="text-xs font-bold text-gray-700 dark:text-gray-300">{event.actorName}</span>
                            </div>

                            <div className="bg-gray-50 dark:bg-white/5 p-3 rounded-lg border border-gray-100 dark:border-white/5 text-sm text-gray-700 dark:text-gray-300">
                                {event.description}
                                {event.attachment && (
                                    <div className="mt-2 flex items-center gap-2 text-xs font-bold text-jambo-600 dark:text-jambo-400 bg-white dark:bg-white/10 p-2 rounded border border-gray-200 dark:border-white/5 w-fit">
                                        <FileText size={12} /> {event.attachment}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
