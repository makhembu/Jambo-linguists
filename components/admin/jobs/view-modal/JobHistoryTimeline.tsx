
import React from 'react';
import { CheckCircle, AlertTriangle, FileText, UserPlus, FileUp, Download, XCircle, PlusCircle, RefreshCw } from 'lucide-react';
import { JobHistoryEvent } from '../../../../data/types';

interface JobHistoryTimelineProps {
    history: JobHistoryEvent[];
}

export const JobHistoryTimeline = ({ history }: JobHistoryTimelineProps) => {
    
    // Sort oldest first
    const sortedHistory = [...history].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    if (!sortedHistory || sortedHistory.length === 0) {
        return (
            <div className="bg-white dark:bg-[#1a1625] rounded-xl p-8 border border-gray-200 dark:border-white/10 shadow-sm mt-6 text-center">
                <p className="text-gray-400">No history available for this job.</p>
            </div>
        );
    }

    const getIcon = (type: string) => {
        switch (type) {
            case 'APPROVED': return { icon: CheckCircle, color: 'text-green-600 bg-green-100 dark:bg-green-900/30' };
            case 'REVISION_REQUESTED': return { icon: AlertTriangle, color: 'text-amber-600 bg-amber-100 dark:bg-amber-900/30' };
            case 'SUBMITTED': 
            case 'RESUBMITTED': return { icon: FileUp, color: 'text-blue-600 bg-blue-100 dark:bg-blue-900/30' };
            case 'ASSIGNED': return { icon: UserPlus, color: 'text-purple-600 bg-purple-100 dark:bg-purple-900/30' };
            case 'CANCELLED': return { icon: XCircle, color: 'text-red-600 bg-red-100 dark:bg-red-900/30' };
            case 'CREATED': return { icon: PlusCircle, color: 'text-gray-600 bg-gray-100 dark:bg-white/10' };
            default: return { icon: FileText, color: 'text-gray-500 bg-gray-100' };
        }
    };

    const getLabel = (type: string) => {
        switch (type) {
            case 'REVISION_REQUESTED': return 'Revision'; // Specific request for clear labelling
            case 'RESUBMITTED': return 'Resubmission';
            case 'APPROVED': return 'Job Approved';
            case 'SUBMITTED': return 'Job Submitted';
            case 'ASSIGNED': return 'Linguist Assigned';
            case 'CREATED': return 'Job Posted';
            default: return type.charAt(0) + type.slice(1).toLowerCase();
        }
    };

    return (
        <div className="bg-white dark:bg-[#1a1625] rounded-xl p-6 border border-gray-200 dark:border-white/10 shadow-sm mt-6">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                <RefreshCw size={14} /> Full Audit Trail
            </h3>
            
            <div className="relative border-l-2 border-gray-100 dark:border-white/5 ml-4 space-y-8">
                {sortedHistory.map((event, idx) => {
                    const { icon: Icon, color } = getIcon(event.type);
                    const isRevision = event.type === 'REVISION_REQUESTED';

                    return (
                        <div key={event.id} className="relative pl-8">
                            {/* Dot Icon */}
                            <div className={`absolute -left-[19px] top-0 w-9 h-9 rounded-full border-4 border-white dark:border-[#1a1625] flex items-center justify-center ${color}`}>
                                <Icon size={16} />
                            </div>

                            {/* Content Layout - Stack on small/medium, Row on Large */}
                            <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-1">
                                <div>
                                    <h4 className={`text-sm font-bold ${isRevision ? 'text-amber-600 dark:text-amber-400' : 'text-gray-900 dark:text-white'}`}>
                                        {getLabel(event.type)}
                                    </h4>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">by {event.actorName}</p>
                                </div>
                                <span className="text-[10px] font-mono text-gray-400 mt-1 lg:mt-0">
                                    {new Date(event.date).toLocaleString()}
                                </span>
                            </div>

                            {/* Content Box */}
                            {(event.description || event.attachment) && (
                                <div className="mt-3 bg-gray-50 dark:bg-white/5 rounded-lg border border-gray-200 dark:border-white/5 p-3 text-sm max-w-full">
                                    {event.description && (
                                        <p className="text-gray-700 dark:text-gray-300 mb-2 italic break-words">
                                            "{event.description}"
                                        </p>
                                    )}
                                    {event.attachment && (
                                        <div className="flex items-center gap-3 bg-white dark:bg-black/20 p-2 rounded border border-gray-200 dark:border-white/5 w-fit max-w-full">
                                            <FileText size={14} className="text-jambo-600 dark:text-jambo-400 shrink-0" />
                                            <span className="text-xs font-bold text-gray-800 dark:text-gray-200 truncate">{event.attachment}</span>
                                            <button className="ml-2 text-xs font-bold text-blue-600 hover:text-blue-800 hover:underline flex items-center gap-1 shrink-0">
                                                <Download size={12} /> Download
                                            </button>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
