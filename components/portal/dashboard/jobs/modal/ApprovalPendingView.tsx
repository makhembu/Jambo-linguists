
import React from 'react';
import { Clock, History } from 'lucide-react';
import { IconBox } from '../../../../ui/IconBox';

export const ApprovalPendingView = ({ onViewHistory }: { onViewHistory?: () => void }) => {
    return (
        <div className="p-8 md:p-12 flex flex-col items-center justify-center text-center min-h-[300px]">
            <div className="mb-6">
                <IconBox icon={Clock} variant="info" size="2xl" />
            </div>
            <h3 className="text-xl md:text-2xl font-serif font-bold text-gray-900 dark:text-white mb-2">Pending Approval</h3>
            <p className="text-sm md:text-base text-gray-500 dark:text-gray-400 max-w-sm mx-auto mb-8">
                Your completion details have been submitted. An administrator will review your work shortly.
            </p>
            {onViewHistory && (
                <button 
                    onClick={onViewHistory}
                    className="flex items-center gap-2 text-jambo-600 dark:text-jambo-400 font-bold hover:underline text-sm"
                >
                    <History size={16} /> View Submission History
                </button>
            )}
        </div>
    );
};
