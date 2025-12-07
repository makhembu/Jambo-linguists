
import React from 'react';
import { Save, Ban, CheckCircle, Edit2, Loader2, Repeat, FileText, Lock } from 'lucide-react';

interface JobActionsProps {
  isEditing: boolean;
  setIsEditing: (val: boolean) => void;
  onSave: () => void;
  onCancelChanges: () => void;
  onClose: () => void;
  onCancelJob: () => void;
  onCompleteJob: () => void;
  onRequestRevision: () => void; 
  onAdminOverride?: () => void;
  isProcessing: boolean;
  status: string;
}

export const JobActions = ({ 
  isEditing, setIsEditing, onSave, onCancelChanges, onClose, 
  onCancelJob, onCompleteJob, onRequestRevision, onAdminOverride, isProcessing, status 
}: JobActionsProps) => {
  return (
    <div className="p-4 md:p-6 border-t border-gray-200 dark:border-white/10 bg-white dark:bg-[#1a1625] flex flex-col-reverse sm:flex-row justify-between items-center gap-3 sticky bottom-0 z-20">
       
       <div className="flex gap-3 w-full sm:w-auto">
          {status !== 'Cancelled' && status !== 'Completed' && (
              <button 
                onClick={onCancelJob}
                className="flex-1 sm:flex-none justify-center px-4 py-2 border border-red-200 text-red-600 dark:border-red-900/50 dark:text-red-400 rounded-lg text-sm font-bold hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors flex items-center gap-2"
              >
                  <Ban size={16} /> Cancel Job
              </button>
          )}
          {status === 'Pending Approval' && (
              <>
                <button 
                    onClick={onRequestRevision}
                    disabled={isProcessing}
                    className="flex-1 sm:flex-none justify-center px-4 py-2 bg-amber-100 text-amber-700 border border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800 rounded-lg text-sm font-bold hover:bg-amber-200 dark:hover:bg-amber-900/50 transition-colors flex items-center gap-2 disabled:opacity-70"
                >
                    <Repeat size={16} /> Request Revision
                </button>
                <button 
                    onClick={onCompleteJob}
                    disabled={isProcessing}
                    className="flex-1 sm:flex-none justify-center px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-bold hover:bg-green-700 transition-colors flex items-center gap-2 shadow-lg shadow-green-600/20 disabled:opacity-70"
                >
                    {isProcessing ? <Loader2 size={16} className="animate-spin" /> : <FileText size={16} />}
                    Approve Work & Invoice
                </button>
              </>
          )}
          {status === 'Revision' && onAdminOverride && (
              <button 
                  onClick={onAdminOverride}
                  className="flex-1 sm:flex-none justify-center px-4 py-2 bg-gray-900 text-white dark:bg-white dark:text-gray-900 rounded-lg text-sm font-bold hover:opacity-90 transition-opacity flex items-center gap-2 shadow-md"
              >
                  <Lock size={16} /> Override & Complete
              </button>
          )}
       </div>

       <div className="flex gap-3 w-full sm:w-auto">
          {isEditing ? (
              <>
                <button 
                    onClick={onCancelChanges}
                    className="flex-1 sm:flex-none justify-center px-4 py-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-sm font-bold transition-colors"
                >
                    Discard
                </button>
                <button 
                    onClick={onSave}
                    disabled={isProcessing}
                    className="flex-1 sm:flex-none justify-center px-6 py-2 bg-jambo-600 text-white rounded-lg text-sm font-bold hover:bg-jambo-700 transition-colors flex items-center gap-2 shadow-lg shadow-jambo-600/20 disabled:opacity-70"
                >
                    {isProcessing ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />} 
                    Save Changes
                </button>
              </>
          ) : (
              <button 
                onClick={() => setIsEditing(true)}
                className="w-full sm:w-auto justify-center px-6 py-2 bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-white rounded-lg text-sm font-bold hover:bg-gray-200 dark:hover:bg-white/20 transition-colors flex items-center gap-2"
              >
                  <Edit2 size={16} /> Edit Details
              </button>
          )}
       </div>
    </div>
  );
};
