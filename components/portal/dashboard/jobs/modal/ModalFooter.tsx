
import React, { useMemo, useState } from 'react';
import { CheckCircle, Phone, Printer, Send, Lock, Loader2, XCircle, RotateCcw, LogOut } from 'lucide-react';
import { mockDb } from '../../../../../data/mockDatabase';
import { Job, Invoice } from '../../../../../data/types';
import { generateInvoicePDF } from '../../finance/pdfGenerator';
import { calculateJobPayout } from '../job-helpers';

interface ModalFooterProps {
  currentStatus: string;
  viewMode: 'details' | 'completionForm';
  isAvailable: boolean;
  isBooked: boolean;
  isHistory: boolean;
  uploading: boolean;
  completionNotes: string;
  onClose: () => void;
  handleAccept: () => void;
  handleSubmitCompletion: () => void;
  handleUnassign?: () => void; // New prop
  setViewMode: (mode: 'details' | 'completionForm') => void;
  job: Job;
}

export const ModalFooter = ({ 
  currentStatus, viewMode, isAvailable, isBooked, isHistory, 
  uploading, completionNotes, onClose, 
  handleAccept, handleSubmitCompletion, handleUnassign, setViewMode, job
}: ModalFooterProps) => {

  const [isGeneratingInvoice, setIsGeneratingInvoice] = useState(false);
  const isRevision = currentStatus === 'Revision';
  
  const complianceCheck = useMemo(() => {
     if (!job || !job.requiredCourseIds) return { compliant: true, missingCourses: [] };
     return mockDb.checkCompliance(job.requiredCourseIds);
  }, [job]);

  const handlePrintInvoice = async () => {
      if (!job) return;
      setIsGeneratingInvoice(true);
      
      const user = mockDb.auth.getCurrentUser();
      if (!user) {
          setIsGeneratingInvoice(false);
          return;
      }

      const payout = calculateJobPayout(job);

      if (payout <= 0) {
          console.error("Cannot generate invoice with zero or negative payout.");
          setIsGeneratingInvoice(false);
          return;
      }

      const invoice: Invoice = {
          id: `inv-${job.id}`,
          userId: user.id,
          reference: `INV-${job.id}`,
          date: job.completedAt || new Date().toISOString(),
          dueDate: new Date(new Date(job.completedAt || new Date()).getTime() + 14 * 24 * 60 * 60 * 1000).toISOString(),
          amount: payout,
          status: 'Pending',
          items: [
              { description: `${job.category}: ${job.title}`, amount: payout, jobId: job.id }
          ],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          deletedAt: null
      };
      
      try {
          await generateInvoicePDF(invoice, user);
      } catch (error) {
          console.error("Failed to generate PDF invoice:", error);
      } finally {
          setIsGeneratingInvoice(false);
      }
  };

  // Expiration Logic
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const jobDate = new Date(job.date);
  const isExpired = isAvailable && jobDate < today;

  return (
    <div className="p-4 md:p-6 border-t border-gray-100 dark:border-white/5 bg-gray-50 dark:bg-white/5 flex flex-col sm:flex-row items-center justify-between gap-3 md:gap-4 shrink-0 safe-area-bottom">
      {/* Left Side Info - Status messages */}
      <div className="text-center sm:text-left w-full sm:w-auto min-h-[20px] sm:min-h-[36px]">
        {viewMode === 'completionForm' && (
          <p className="text-sm font-bold text-gray-500 dark:text-gray-400 hidden sm:block">
              {isRevision ? 'Submitting Revision...' : 'Finalizing Job...'}
          </p>
        )}
        
        {viewMode === 'details' && (
            <>
                {isAvailable && (
                    <div className="flex justify-center sm:justify-start items-center w-full">
                        {isExpired ? (
                            <p className="text-sm font-bold text-red-500 dark:text-red-400 flex items-center gap-1">
                                <XCircle size={14} /> Application Closed
                            </p>
                        ) : complianceCheck.compliant ? (
                            <div className="flex sm:flex-col items-center sm:items-start gap-2 sm:gap-0">
                                <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Deadline:</p>
                                <p className="text-sm font-bold text-gray-900 dark:text-gray-200">Today, 5:00 PM</p>
                            </div>
                        ) : (
                            <div className="flex items-center gap-2 text-red-600 dark:text-red-400">
                                <Lock size={16} />
                                <div className="text-left">
                                    <p className="text-[10px] md:text-xs font-bold uppercase">Qualifications Missing</p>
                                    <p className="text-[10px] md:text-xs hidden sm:block">Complete: {complianceCheck.missingCourses.join(', ')}</p>
                                </div>
                            </div>
                        )}
                    </div>
                )}
                {isBooked && !isRevision && (
                    <p className="text-sm font-bold text-green-600 dark:text-green-500 flex items-center justify-center sm:justify-start gap-1">
                        <CheckCircle size={14}/> Job is active
                    </p>
                )}
                {isRevision && (
                    <p className="text-sm font-bold text-amber-600 dark:text-amber-500 flex items-center justify-center sm:justify-start gap-1">
                        <RotateCcw size={14}/> Action Required: Revision
                    </p>
                )}
                {currentStatus === 'Pending Approval' && (
                    <p className="text-sm font-bold text-indigo-500 dark:text-indigo-400 flex items-center justify-center sm:justify-start gap-1">
                        <Loader2 size={14} className="animate-spin" /> Awaiting Admin Review
                    </p>
                )}
                {currentStatus === 'Completed' && (
                    <p className="text-sm font-bold text-gray-500 dark:text-gray-400 flex items-center justify-center sm:justify-start gap-1">
                        <CheckCircle size={14}/> Work Approved • Payment Pending
                    </p>
                )}
            </>
        )}
      </div>
      
      {/* Buttons */}
      <div className="flex gap-3 w-full sm:w-auto">
        <button 
          onClick={onClose}
          disabled={uploading}
          className="flex-1 sm:flex-none px-4 md:px-6 py-2.5 md:py-3 border border-gray-300 dark:border-white/10 text-gray-700 dark:text-gray-200 font-bold rounded-xl hover:bg-gray-100 dark:hover:bg-white/10 transition-colors disabled:opacity-50 text-sm md:text-base"
        >
          Close
        </button>
        
        {viewMode === 'completionForm' ? (
          <button 
            onClick={handleSubmitCompletion}
            disabled={uploading || !completionNotes}
            className="flex-[2] sm:flex-none px-6 md:px-8 py-2.5 md:py-3 bg-jambo-600 dark:bg-jambo-500 text-white font-bold rounded-xl shadow-lg hover:bg-jambo-700 dark:hover:bg-jambo-600 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:shadow-none text-sm md:text-base"
          >
            {uploading ? (
              <span className="flex items-center gap-2"><div className="w-4 h-4 border-2 border-white/50 border-t-white rounded-full animate-spin"></div> Sending...</span>
            ) : (
              <><Send size={18} /> {isRevision ? 'Submit Revision' : 'Submit Work'}</>
            )}
          </button>
        ) : (
          <>
            {isAvailable && (
              <button 
                onClick={handleAccept}
                disabled={uploading || !complianceCheck.compliant || isExpired}
                className={`flex-[2] sm:flex-none px-6 md:px-8 py-2.5 md:py-3 font-bold rounded-xl shadow-lg flex items-center justify-center gap-2 transition-all text-sm md:text-base ${
                    complianceCheck.compliant && !isExpired
                    ? 'bg-jambo-600 dark:bg-jambo-500 text-white hover:bg-jambo-700 dark:hover:bg-jambo-600 hover:scale-105'
                    : 'bg-gray-200 dark:bg-white/10 text-gray-400 dark:text-gray-500 cursor-not-allowed shadow-none'
                }`}
              >
                {uploading ? (
                  <span className="flex items-center gap-2"><div className="w-4 h-4 border-2 border-white/50 border-t-white rounded-full animate-spin"></div> Accepting...</span>
                ) : (
                  <>{isExpired ? <XCircle size={18} /> : (complianceCheck.compliant ? <CheckCircle size={20} /> : <Lock size={18} />)} {isExpired ? 'Expired' : 'Claim Job'}</>
                )}
              </button>
            )}

            {(isBooked || isRevision) && (
              <div className="flex gap-2 w-full sm:w-auto">
                {handleUnassign && currentStatus === 'Scheduled' && (
                    <button 
                        type="button"
                        onClick={(e) => {
                            e.preventDefault();
                            handleUnassign();
                        }}
                        className="flex-1 sm:flex-none px-4 py-2.5 md:py-3 bg-white dark:bg-white/5 border border-red-200 dark:border-red-900/50 text-red-600 dark:text-red-400 font-bold rounded-xl hover:bg-red-50 dark:hover:bg-red-900/10 flex items-center justify-center gap-2 text-sm md:text-base"
                    >
                        <LogOut size={18} /> Unassign
                    </button>
                )}
                <button className="flex-1 sm:flex-none px-4 py-2.5 md:py-3 bg-white dark:bg-white/5 border border-gray-300 dark:border-white/10 text-gray-700 dark:text-gray-200 font-bold rounded-xl hover:bg-gray-50 dark:hover:bg-white/10 flex items-center justify-center gap-2 text-sm md:text-base">
                  <Phone size={18} /> <span className="hidden sm:inline">Contact</span>
                </button>
                <button 
                  onClick={() => setViewMode('completionForm')}
                  className={`flex-[2] sm:flex-none px-4 md:px-6 py-2.5 md:py-3 text-white font-bold rounded-xl flex items-center justify-center gap-2 shadow-lg text-sm md:text-base transition-all
                    ${isRevision ? 'bg-amber-500 hover:bg-amber-600' : 'bg-jambo-600 hover:bg-jambo-700 dark:bg-jambo-500 dark:hover:bg-jambo-600'}
                  `}
                >
                  {isRevision ? <RotateCcw size={18} /> : <CheckCircle size={18} />} 
                  {isRevision ? 'Update & Resubmit' : 'Complete Job'}
                </button>
              </div>
            )}

            {currentStatus === 'Completed' && (
              <button 
                onClick={handlePrintInvoice}
                disabled={isGeneratingInvoice}
                className="flex-[2] sm:flex-none px-4 md:px-6 py-2.5 md:py-3 bg-gray-800 dark:bg-gray-700 text-white font-bold rounded-xl hover:bg-gray-900 dark:hover:bg-gray-600 transition-colors flex items-center justify-center gap-2 text-sm md:text-base disabled:opacity-60"
              >
                {isGeneratingInvoice ? <Loader2 size={18} className="animate-spin"/> : <Printer size={18} />} 
                Invoice
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};
