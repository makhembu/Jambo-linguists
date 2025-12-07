
import React, { useState, useEffect } from 'react';
import { Job, Invoice } from '../../../data/types';
import { mockDb } from '../../../data/mockDatabase';
import { Modal } from '../../ui/Modal';
import { InvoicePreviewModal } from '../../portal/dashboard/finance/InvoicePreviewModal';
import { UserProfileModal } from '../users/UserProfileModal';
import { JobHistoryTimeline } from '../../ui/JobHistoryTimeline';
import { JobStatusBadge } from '../../ui/JobStatusBadge';
import { JobChatWidget } from '../../messaging/JobChatWidget';

// Sub-components
import { JobHeader } from './modal/JobHeader';
import { JobOverview } from './modal/JobOverview';
import { LinguistAssignment } from './modal/LinguistAssignment';
import { JobProcessStepper } from './view-modal/JobProcessStepper';
import { SubmissionDetails } from './view-modal/SubmissionDetails';
import { RevisionRequestForm } from './view-modal/RevisionRequestForm';
import { PaymentBanner } from './view-modal/PaymentBanner';
import { AdminJobEditForm } from './modal/AdminJobEditForm';
import { JobActions } from './modal/JobActions';
import { AdminCompletionForm } from './view-modal/AdminCompletionForm';
import { RevisionHistory } from './view-modal/RevisionHistory';

interface AdminJobModalProps {
  job: Job;
  onClose: () => void;
  onUpdate: (message?: string) => void;
}

export const AdminJobModal = ({ job: initialJob, onClose, onUpdate }: AdminJobModalProps) => {
  // --- State ---
  const [job, setJob] = useState<Job>(initialJob);
  const [loadingAction, setLoadingAction] = useState<'approve' | 'request_revision' | 'save' | 'admin_complete' | null>(null);
  
  // UI Modes
  const [isRevisionMode, setIsRevisionMode] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isAdminCompleting, setIsAdminCompleting] = useState(false);
  
  // Navigation State
  const [invoiceToPreview, setInvoiceToPreview] = useState<Invoice | null>(null);
  const [viewingLinguistId, setViewingLinguistId] = useState<string | null>(null);

  // Derived Data (Services)
  const currentUser = mockDb.auth.getCurrentUser();
  const linguist = job.linguistId ? mockDb.getAllUsers().find(u => u.id === job.linguistId) : null;
  const allLinguists = mockDb.getAllUsers().filter(u => u.role === 'linguist' && u.isVerified && !u.isSuspended);
  const invoice = mockDb.getAllInvoices().find(i => i.items.some(item => item.jobId === job.id));
  
  const isAssignmentLocked = ['Pending Approval', 'Completed', 'Cancelled'].includes(job.status);
  const peerId = job.linguistId; // Chat target

  // Reset local state when prop changes
  useEffect(() => { 
      setJob(initialJob); 
      setIsRevisionMode(false); 
      setIsEditing(false); 
      setIsAdminCompleting(false);
  }, [initialJob]);

  // --- Actions (Service Calls) ---

  const handleApprove = () => {
      setLoadingAction('approve');
      setTimeout(() => {
          // Service call: Approve logic
          const newInvoice = mockDb.adminApproveJobSubmission(job.id);
          setLoadingAction(null);
          setInvoiceToPreview(newInvoice); // Trigger invoice modal
          
          // Refresh local job state
          const updatedJob = mockDb.getAllJobs().find(j => j.id === job.id);
          if (updatedJob) setJob(updatedJob);
      }, 1000);
  };

  const handleRequestRevision = (feedback: string, file: File | null) => {
      setLoadingAction('request_revision');
      setTimeout(() => {
          // Service call: Update status with feedback
          mockDb.updateJobStatus(job.id, 'Revision', { 
              revisionFeedback: feedback,
              revisionFile: file ? file.name : undefined
          });
          setLoadingAction(null);
          setIsRevisionMode(false);
          
          const updatedJob = mockDb.getAllJobs().find(j => j.id === job.id);
          if (updatedJob) setJob(updatedJob);
          
          onUpdate('Revision Requested');
      }, 1000);
  };

  const handleAssignLinguist = (linguistId: string | null) => {
      // Service call: Assign
      mockDb.adminAssignJob(job.id, linguistId);
      
      const updatedJob = mockDb.getAllJobs().find(j => j.id === job.id);
      if (updatedJob) setJob(updatedJob);
      
      onUpdate(linguistId ? 'Linguist Assigned' : 'Job Unassigned');
  };

  const handleSaveEdit = (updatedData: Partial<Job>, newFiles: File[], keptAttachments: any[]) => {
      setLoadingAction('save');
      
      // Prepare attachment payload
      const newAttachmentsPayload = newFiles.map(f => ({ name: f.name, type: 'file' as const, url: '#' }));
      
      setTimeout(() => {
          // Service call: Full update
          const updated = mockDb.adminUpdateJobDetails(
              job.id, 
              updatedData, 
              newAttachmentsPayload,
              keptAttachments
          );
          
          if (updated) {
              setJob(updated);
              onUpdate('Job Details Updated');
          }
          setLoadingAction(null);
          setIsEditing(false);
      }, 1000);
  };

  const handleAdminForceComplete = (notes: string) => {
      setLoadingAction('admin_complete');
      setTimeout(() => {
          const updated = mockDb.adminForceCompleteJob(job.id, notes);
          setJob(updated);
          setLoadingAction(null);
          setIsAdminCompleting(false);
          onUpdate('Job Force Completed by Admin');
      }, 1000);
  };

  const handleCancelJob = () => {
      if(window.confirm("Are you sure you want to cancel this job? This action will be logged.")) {
          mockDb.updateJobStatus(job.id, 'Cancelled');
          
          // Immediate UI update
          const updated = mockDb.getAllJobs().find(j => j.id === job.id);
          if(updated) setJob(updated);
          
          // Notify parent to refresh list
          onUpdate('Job Cancelled');
      }
  };

  return (
    <>
    <Modal isOpen={true} onClose={onClose} size="4xl" className="h-full md:h-[85vh]">
        <div className="flex flex-col md:flex-row h-full overflow-hidden bg-gray-50 dark:bg-[#0f0a15]">
            
            {/* LEFT PANEL: Activity Stream / Edit Form */}
            <div className="flex-1 flex flex-col min-w-0 min-h-0 bg-white dark:bg-[#1a1625] md:bg-gray-50 md:dark:bg-[#0f0a15] order-2 md:order-1 relative">
                
                <JobHeader 
                    job={job} 
                    onClose={onClose} 
                    onEdit={() => setIsEditing(true)} 
                />

                <div className="flex-1 overflow-y-auto custom-scrollbar p-4 md:p-6 space-y-6 pb-24 md:pb-6">
                    {isEditing ? (
                        <AdminJobEditForm 
                            job={job}
                            onSave={handleSaveEdit}
                            onCancel={() => setIsEditing(false)}
                            isSaving={loadingAction === 'save'}
                        />
                    ) : isAdminCompleting ? (
                        <AdminCompletionForm 
                            onCancel={() => setIsAdminCompleting(false)}
                            onSubmit={handleAdminForceComplete}
                            isLoading={loadingAction === 'admin_complete'}
                        />
                    ) : (
                        <>
                            {/* Mobile Info Block */}
                            <div className="md:hidden space-y-4">
                               <div className="flex items-center justify-between">
                                  <span className="text-xs font-bold uppercase text-gray-500">Status</span>
                                  <JobStatusBadge status={job.status} />
                               </div>
                               
                               <div className="bg-gray-50 dark:bg-white/5 p-4 rounded-xl border border-gray-100 dark:border-white/5">
                                   <div className="space-y-2 mb-4">
                                        <p className="text-sm text-gray-600 dark:text-gray-300">{job.description}</p>
                                        <div className="text-xs text-gray-500 dark:text-gray-400">
                                            <p><span className="font-bold">Location:</span> {job.location}</p>
                                            <p><span className="font-bold">Time:</span> {job.time || 'N/A'}</p>
                                        </div>
                                   </div>
                               </div>

                               <LinguistAssignment 
                                    linguist={linguist}
                                    allLinguists={allLinguists}
                                    isLocked={isAssignmentLocked}
                                    onAssign={handleAssignLinguist}
                               />
                            </div>

                            <JobProcessStepper status={job.status} />

                            {invoice && (
                                <PaymentBanner 
                                    existingInvoice={invoice} 
                                    onReview={() => setInvoiceToPreview(invoice)} 
                                />
                            )}

                            <SubmissionDetails 
                                job={job}
                                onApprove={handleApprove}
                                onRequestRevision={() => setIsRevisionMode(true)}
                                isLoading={loadingAction === 'approve'}
                                isRevisionMode={isRevisionMode}
                            >
                                <RevisionRequestForm 
                                    onCancel={() => setIsRevisionMode(false)}
                                    onSubmit={handleRequestRevision}
                                    isLoading={loadingAction === 'request_revision'}
                                />
                            </SubmissionDetails>

                            <RevisionHistory job={job} />

                            <JobHistoryTimeline history={job.history || []} />
                        </>
                    )}
                </div>

                {!isEditing && !isAdminCompleting && (
                    <JobActions 
                        isEditing={isEditing}
                        setIsEditing={setIsEditing}
                        onSave={() => {}} // Handled inside Edit Form
                        onCancelChanges={() => setIsEditing(false)}
                        onClose={onClose}
                        onCancelJob={handleCancelJob}
                        onCompleteJob={handleApprove}
                        onRequestRevision={() => setIsRevisionMode(true)}
                        onAdminOverride={() => setIsAdminCompleting(true)}
                        isProcessing={!!loadingAction}
                        status={job.status}
                    />
                )}

                {/* Chat Widget: Only show if not editing and a linguist is assigned */}
                {!isEditing && !isAdminCompleting && currentUser && peerId && (
                    <JobChatWidget 
                        jobId={job.id} 
                        currentUserId={currentUser.id} 
                        peerId={peerId}
                    />
                )}
            </div>

            {/* RIGHT PANEL: Static Context Sidebar (Desktop Only) */}
            {!isEditing && !isAdminCompleting && (
                <div className="w-80 bg-white dark:bg-[#1a1625] border-l border-gray-200 dark:border-white/5 overflow-y-auto custom-scrollbar hidden md:block shrink-0 order-1 md:order-2">
                    <JobOverview 
                        job={job}
                        linguist={linguist}
                        allLinguists={allLinguists}
                        isAssignmentLocked={isAssignmentLocked}
                        onAssign={handleAssignLinguist}
                        onViewProfile={setViewingLinguistId}
                    />
                </div>
            )}
        </div>
    </Modal>

    {/* Sub-Modals */}
    {invoiceToPreview && (
        <InvoicePreviewModal 
            invoice={invoiceToPreview} 
            onClose={() => { setInvoiceToPreview(null); }} 
            onMarkPaid={() => {
                // Service call: Update invoice status
                mockDb.updateInvoiceStatus(invoiceToPreview.id, 'Paid');
                setInvoiceToPreview(null);
                onUpdate('Invoice Marked as Paid');
            }}
        />
    )}

    {viewingLinguistId && (
        <UserProfileModal 
            user={mockDb.getAllUsers().find(u => u.id === viewingLinguistId)!} 
            onClose={() => setViewingLinguistId(null)}
            onUpdate={() => {}}
            onNavigate={() => {}}
        />
    )}
    </>
  );
};
