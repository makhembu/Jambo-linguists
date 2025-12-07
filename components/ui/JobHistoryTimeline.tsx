

import React from 'react';
import { 
  CheckCircle, AlertTriangle, FileText, UserPlus, FileUp, 
  Download, XCircle, PlusCircle, RefreshCw, Clock, Globe, PoundSterling 
} from 'lucide-react';
import { JobHistoryEvent } from '@/data/types';

interface JobHistoryTimelineProps {
    history: JobHistoryEvent[];
    className?: string;
}

export const JobHistoryTimeline = ({ history, className = '' }: JobHistoryTimelineProps) => {
    // Sort: Oldest -> Newest (Chronological)
    const sortedHistory = [...history].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    if (!sortedHistory || sortedHistory.length === 0) {
        return (
            <div className={`text-center py-8 border border-dashed border-gray-200 dark:border-white/10 rounded-xl ${className}`}>
                <p className="text-gray-400 text-sm">No history recorded.</p>
            </div>
        );
    }

    const getEventConfig = (type: string) => {
        switch (type) {
            case 'APPROVED': 
            case 'INVOICE_PAID':
                return { icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-100 dark:bg-green-900/30', border: 'border-green-200 dark:border-green-800' };
            case 'REVISION_REQUESTED': 
                return { icon: AlertTriangle, color: 'text-amber-600', bg: 'bg-amber-100 dark:bg-amber-900/30', border: 'border-amber-200 dark:border-amber-800' };
            case 'INVOICE_PENDING':
                return { icon: PoundSterling, color: 'text-orange-600', bg: 'bg-orange-100 dark:bg-orange-900/30', border: 'border-orange-200 dark:border-orange-800' };
            case 'SUBMITTED': 
            case 'RESUBMITTED': 
                return { icon: FileUp, color: 'text-blue-600', bg: 'bg-blue-100 dark:bg-blue-900/30', border: 'border-blue-200 dark:border-blue-800' };
            case 'ASSIGNED': 
                return { icon: UserPlus, color: 'text-purple-600', bg: 'bg-purple-100 dark:bg-purple-900/30', border: 'border-purple-200 dark:border-purple-800' };
            case 'CANCELLED': 
                return { icon: XCircle, color: 'text-red-600', bg: 'bg-red-100 dark:bg-red-900/30', border: 'border-red-200 dark:border-red-800' };
            case 'CREATED': 
                return { icon: PlusCircle, color: 'text-gray-600', bg: 'bg-gray-100 dark:bg-white/10', border: 'border-gray-200 dark:border-white/10' };
            default: 
                return { icon: FileText, color: 'text-gray-500', bg: 'bg-gray-50 dark:bg-white/5', border: 'border-gray-200 dark:border-white/10' };
        }
    };

    const formatDateTime = (isoString: string) => {
        const d = new Date(isoString);
        return {
            date: d.toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' }),
            time: d.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })
        };
    };

    return (
        <div className={`space-y-6 ${className}`}>
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2 mb-4">
                <RefreshCw size={14} /> Full Audit Trail
            </h3>
            
            <div className="relative border-l-2 border-gray-100 dark:border-white/5 ml-4 space-y-8 pb-2">
                {sortedHistory.map((event, idx) => {
                    const conf = getEventConfig(event.type);
                    const Icon = conf.icon;
                    const { date, time } = formatDateTime(event.date);

                    return (
                        <div key={event.id} className="relative pl-8">
                            {/* Icon Node */}
                            <div className={`absolute -left-[19px] top-0 w-9 h-9 rounded-full border-4 border-white dark:border-[#1a1625] flex items-center justify-center ${conf.bg} ${conf.color} z-10`}>
                                <Icon size={16} />
                            </div>

                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1">
                                <div>
                                    <div className="flex items-center gap-2">
                                        <h4 className="text-sm font-bold text-gray-900 dark:text-white">
                                            {event.type.replace(/_/g, ' ')}
                                        </h4>
                                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-gray-100 dark:bg-white/10 text-gray-500 font-medium hidden sm:inline-block">
                                            {event.type === 'CREATED' ? 'System' : 'Action'}
                                        </span>
                                    </div>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                                        <span className="font-medium text-gray-700 dark:text-gray-300">{event.actorName}</span> performed this action.
                                    </p>
                                </div>
                                <div className="text-right flex flex-row sm:flex-col items-center sm:items-end gap-2 sm:gap-0 mt-1 sm:mt-0">
                                    <span className="text-xs font-bold text-gray-700 dark:text-gray-300">{date}</span>
                                    <span className="text-[10px] font-mono text-gray-400 flex items-center gap-1">
                                        <Clock size={10} /> {time}
                                    </span>
                                </div>
                            </div>

                            {/* Detailed Description Box */}
                            {(event.description || event.attachment) && (
                                <div className={`mt-3 p-3 rounded-lg border text-sm ${conf.bg} ${conf.border} bg-opacity-30 dark:bg-opacity-10`}>
                                    {event.description && (
                                        <p className="text-gray-700 dark:text-gray-300 mb-2 leading-relaxed">
                                            {event.description}
                                        </p>
                                    )}
                                    {event.attachment && (
                                        <div className="flex items-center gap-2 bg-white dark:bg-black/20 p-2 rounded border border-black/5 dark:border-white/5 w-fit max-w-full">
                                            <FileText size={14} className="text-jambo-600 dark:text-jambo-400 shrink-0" />
                                            <span className="text-xs font-bold text-gray-800 dark:text-gray-200 truncate">{event.attachment}</span>
                                            <button className="ml-2 text-xs font-bold text-blue-600 hover:text-blue-800 hover:underline flex items-center gap-1 shrink-0 cursor-pointer">
                                                <Download size={12} />
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
