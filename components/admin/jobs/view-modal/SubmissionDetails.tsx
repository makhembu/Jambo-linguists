
import React from 'react';
import { AlertCircle, Download, CheckCircle, FileText } from 'lucide-react';
import { Job } from '../../../../data/types';
import { Button } from '../../../ui/Button';

interface SubmissionDetailsProps {
  job: Job;
  onApprove: () => void;
  onRequestRevision: () => void;
  isLoading: boolean;
  isRevisionMode: boolean;
  children?: React.ReactNode; // For Revision Form injection
}

export const SubmissionDetails = ({ job, onApprove, onRequestRevision, isLoading, isRevisionMode, children }: SubmissionDetailsProps) => {
    if (!['Pending Approval'].includes(job.status)) return null;

    return (
        <div className="bg-white dark:bg-[#1a1625] border border-orange-200 dark:border-orange-900/50 rounded-xl p-4 md:p-6 shadow-sm ring-1 ring-orange-100 dark:ring-orange-900/30">
            <div className="flex items-start gap-3 mb-4">
                <div className="p-2 bg-orange-100 dark:bg-orange-900/40 text-orange-600 dark:text-orange-400 rounded-lg shrink-0">
                    <AlertCircle size={20} />
                </div>
                <div>
                    <h3 className="font-bold text-gray-900 dark:text-white">Review Submission</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Linguist has submitted work.</p>
                </div>
            </div>
            
            <div className="bg-gray-50 dark:bg-white/5 p-4 rounded-lg border border-gray-100 dark:border-white/5 mb-4 text-sm text-gray-700 dark:text-gray-300 break-words">
                <span className="font-bold block mb-1 text-xs uppercase text-gray-400">Linguist Note:</span>
                "{job.completionNotes || 'No notes provided.'}"
                {job.completionFile && (
                    <div className="mt-2 flex items-center gap-2 font-bold text-blue-600 dark:text-blue-400 cursor-pointer hover:underline">
                        <Download size={14} /> <span className="truncate">{job.completionFile}</span>
                    </div>
                )}
            </div>

            {!isRevisionMode ? (
                <div className="flex flex-col sm:flex-row gap-3 mt-4">
                    <Button 
                        variant="danger" 
                        onClick={onRequestRevision} 
                        className="flex-1"
                    >
                        Request Revision
                    </Button>
                    <Button 
                        variant="primary" 
                        onClick={onApprove} 
                        isLoading={isLoading} 
                        className="flex-[2] bg-green-600 hover:bg-green-700"
                    >
                        <CheckCircle size={16} /> Approve & Pay
                    </Button>
                </div>
            ) : (
                children
            )}
        </div>
    );
};
