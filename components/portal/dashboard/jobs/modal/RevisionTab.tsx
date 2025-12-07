
import React from 'react';
import { AlertCircle, FileText, Clock, Download, FileCheck, ArrowRight } from 'lucide-react';
import { Job } from '../../../../../data/types';

export const RevisionTab = ({ job }: { job: Job }) => {
    // Show all events involved in the revision loop: REVISION_REQUESTED, SUBMITTED, RESUBMITTED
    const historyEvents = (job.history || []).filter(h => 
        ['REVISION_REQUESTED', 'SUBMITTED', 'RESUBMITTED'].includes(h.type)
    ).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    const activeRevision = job.status === 'Revision' 
        ? historyEvents.find(h => h.type === 'REVISION_REQUESTED')
        : null;

    // If job status is Revision, we show the actionable banner.
    const isActiveRevision = job.status === 'Revision';

    return (
        <div className="p-6 space-y-6">
            
            {isActiveRevision && (
                <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-6 shadow-sm">
                    <div className="flex items-start gap-4">
                        <div className="p-3 bg-amber-100 dark:bg-amber-900/40 rounded-full text-amber-700 dark:text-amber-300 shrink-0">
                            <AlertCircle size={24} />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-lg font-bold text-amber-900 dark:text-amber-100 mb-2">Revision Requested</h3>
                            <div className="bg-white dark:bg-black/20 p-4 rounded-lg border border-amber-100 dark:border-amber-900/30 mb-4">
                                <p className="text-gray-800 dark:text-gray-200 leading-relaxed font-medium">
                                    "{job.revisionFeedback || activeRevision?.description || "Please review the feedback and resubmit."}"
                                </p>
                            </div>
                            
                            {job.revisionFile && (
                                <div className="flex items-center gap-3 bg-white dark:bg-white/5 border border-amber-200 dark:border-amber-800 rounded-lg p-3 w-fit">
                                    <FileText size={18} className="text-amber-600 dark:text-amber-400" />
                                    <span className="font-bold text-sm text-gray-700 dark:text-gray-300">{job.revisionFile}</span>
                                    <button className="text-xs font-bold bg-amber-100 text-amber-800 px-3 py-1.5 rounded hover:bg-amber-200 transition-colors ml-2 flex items-center gap-1">
                                        <Download size={12} /> Download
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="mt-6 pt-4 border-t border-amber-200 dark:border-amber-800 flex justify-end">
                        <p className="text-xs font-bold text-amber-700 dark:text-amber-300 flex items-center gap-1">
                            <Clock size={12} /> Action Required: Resubmit Work
                        </p>
                    </div>
                </div>
            )}

            {/* Full Revision History Trail */}
            <div className="border-t border-gray-100 dark:border-white/5 pt-6">
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Submission & Revision History</h4>
                
                {historyEvents.length === 0 ? (
                    <p className="text-gray-500 text-sm italic">No history available.</p>
                ) : (
                    <div className="space-y-4">
                        {historyEvents.map((event, idx) => {
                            const isLinguist = event.type === 'SUBMITTED' || event.type === 'RESUBMITTED';
                            return (
                                <div key={event.id} className="flex gap-4">
                                    <div className="flex flex-col items-center">
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 z-10 ${
                                            isLinguist 
                                                ? 'bg-blue-100 border-blue-200 text-blue-600 dark:bg-blue-900/30 dark:border-blue-800 dark:text-blue-400' 
                                                : 'bg-amber-100 border-amber-200 text-amber-600 dark:bg-amber-900/30 dark:border-amber-800 dark:text-amber-400'
                                        }`}>
                                            {isLinguist ? <FileCheck size={14} /> : <AlertCircle size={14} />}
                                        </div>
                                        {idx < historyEvents.length - 1 && (
                                            <div className="w-0.5 bg-gray-200 dark:bg-white/10 flex-grow my-1"></div>
                                        )}
                                    </div>
                                    <div className="flex-1 pb-6">
                                        <div className="flex justify-between items-start mb-1">
                                            <div>
                                                <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${
                                                    isLinguist 
                                                        ? 'bg-blue-50 border-blue-100 text-blue-700 dark:bg-blue-900/20 dark:border-blue-900/50 dark:text-blue-300' 
                                                        : 'bg-amber-50 border-amber-100 text-amber-700 dark:bg-amber-900/20 dark:border-amber-900/50 dark:text-amber-300'
                                                }`}>
                                                    {isLinguist ? 'You Submitted' : 'Admin Requested Revision'}
                                                </span>
                                                <p className="text-xs text-gray-400 mt-1">{new Date(event.date).toLocaleString()}</p>
                                            </div>
                                        </div>
                                        
                                        <div className="bg-gray-50 dark:bg-white/5 p-3 rounded-lg border border-gray-100 dark:border-white/5 text-sm text-gray-700 dark:text-gray-300 mt-2">
                                            {event.description && <p className="mb-2">{event.description}</p>}
                                            {event.attachment && (
                                                <div className="flex items-center gap-2 bg-white dark:bg-black/20 p-2 rounded border border-gray-200 dark:border-white/5 w-fit">
                                                    <FileText size={14} className={isLinguist ? 'text-blue-500' : 'text-amber-500'} />
                                                    <span className="font-bold text-xs">{event.attachment}</span>
                                                    <a href="#" className="ml-2 text-gray-400 hover:text-gray-600 dark:hover:text-white transition-colors">
                                                        <Download size={12} />
                                                    </a>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};
