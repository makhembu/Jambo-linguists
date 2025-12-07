
import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { FileText, Mic, Video } from 'lucide-react';
import { Job, mockDb } from '@/data/mockDatabase';
import { ToastType } from '../Toast';
import { JobChatWidget } from '../../../messaging/JobChatWidget';

// Sub-components
import { ModalHeader } from './modal/ModalHeader';
import { JobInfo } from './modal/JobInfo';
import { CompletionForm } from './modal/CompletionForm';
import { ModalFooter } from './modal/ModalFooter';

interface JobDetailsModalProps {
  job: Job;
  onClose: () => void;
  onNavigate: (section: string) => void;
  showToast: (msg: string, type: ToastType) => void;
}

export const JobDetailsModal = ({ job, onClose, onNavigate, showToast }: JobDetailsModalProps) => {
  const [currentStatus, setCurrentStatus] = useState(job.status);
  const [viewMode, setViewMode] = useState<'details' | 'completionForm'>('details');
  const [completionNotes, setCompletionNotes] = useState('');
  const [completionFile, setCompletionFile] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  
  // Chat Logic
  const currentUser = mockDb.auth.getCurrentUser();
  // Default to admin if no postedBy set, or if postedBy is self (unlikely but possible in testing)
  const chatPeerId = (job.postedBy && job.postedBy !== currentUser?.id) ? job.postedBy : 'u-admin-001';

  // Status Helpers
  const isAvailable = currentStatus === 'Open';
  const isBooked = currentStatus === 'Scheduled' || currentStatus === 'In Progress';
  const isHistory = currentStatus === 'Completed' || currentStatus === 'Cancelled';
  
  // Theme Helper
  const getTheme = () => {
    switch (job.category) {
      case 'Translation': return { bg: 'bg-teal-50 dark:bg-teal-900/30', text: 'text-teal-700 dark:text-teal-300', border: 'border-teal-200 dark:border-teal-800', icon: FileText };
      case 'Transcription': return { bg: 'bg-orange-50 dark:bg-orange-900/30', text: 'text-orange-700 dark:text-orange-300', border: 'border-orange-200 dark:border-orange-800', icon: Mic };
      default: return { bg: 'bg-purple-50 dark:bg-purple-900/30', text: 'text-jambo-700 dark:text-purple-300', border: 'border-purple-200 dark:border-purple-800', icon: Video };
    }
  };

  const theme = getTheme();

  // Handlers
  const handleAccept = () => {
    setUploading(true);
    setTimeout(() => {
        mockDb.updateJobStatus(job.id, 'Scheduled');
        setCurrentStatus('Scheduled');
        setUploading(false);
        showToast('Job Accepted Successfully', 'success');
        onClose();
        onNavigate('jobs-bookings');
    }, 1200);
  };

  const handleSubmitCompletion = () => {
      setUploading(true);
      setTimeout(() => {
          mockDb.updateJobStatus(job.id, 'Completed', {
              notes: completionNotes,
              file: completionFile || undefined
          });
          setUploading(false);
          showToast('Job Completed Successfully', 'success');
          onClose();
          onNavigate('jobs-history');
      }, 2000);
  };

  const handleUnassign = () => {
      if (window.confirm('Are you sure you want to unassign yourself from this job? It will be returned to the marketplace.')) {
          setUploading(true);
          setTimeout(() => {
              const success = mockDb.unassignJob(job.id);
              setUploading(false);
              if (success) {
                  showToast('Job unassigned successfully.', 'info');
                  onClose();
                  // Force refresh or nav
                  onNavigate('jobs-available'); 
              } else {
                  showToast('Failed to unassign job. Please contact support.', 'error');
              }
          }, 800);
      }
  };

  const handleFileSelect = () => {
      const fakeFileName = `Completion_Proof_${job.id}_${Date.now()}.pdf`;
      setCompletionFile(fakeFileName);
  };

  // Lock body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const modalContent = (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center md:p-4 animate-in fade-in duration-300 safe-area-inset-top">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-jambo-950/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      {/* Main Container */}
      <div className="bg-white dark:bg-[#1a1625] w-full h-full md:h-auto md:max-h-[90vh] landscape:max-h-[100dvh] md:max-w-3xl md:rounded-2xl shadow-2xl relative z-10 flex flex-col animate-in zoom-in-95 duration-300 overflow-hidden safe-area-padding">
        
        <ModalHeader 
          job={job}
          viewMode={viewMode}
          setViewMode={setViewMode}
          onClose={onClose}
          theme={theme}
          currentStatus={currentStatus}
        />

        {/* Dynamic Body Content - Scrollable Area */}
        <div className="flex-1 min-h-0 overflow-y-auto custom-scrollbar bg-white dark:bg-[#1a1625] pb-24 md:pb-0">
          {viewMode === 'details' ? (
            <JobInfo 
              job={job} 
              isHistory={isHistory} 
              isAvailable={isAvailable} 
            />
          ) : (
            <CompletionForm 
              completionNotes={completionNotes}
              setCompletionNotes={setCompletionNotes}
              completionFile={completionFile}
              handleFileSelect={handleFileSelect}
            />
          )}
        </div>

        <ModalFooter 
          currentStatus={currentStatus}
          job={job}
          viewMode={viewMode}
          isAvailable={isAvailable}
          isBooked={isBooked}
          isHistory={isHistory}
          uploading={uploading}
          completionNotes={completionNotes}
          onClose={onClose}
          handleAccept={handleAccept}
          handleSubmitCompletion={handleSubmitCompletion}
          handleUnassign={handleUnassign}
          setViewMode={setViewMode}
        />

        {/* Messaging Widget (Floats above content) */}
        {currentUser && (
            <JobChatWidget 
                jobId={job.id}
                currentUserId={currentUser.id}
                peerId={chatPeerId}
            />
        )}

      </div>
    </div>
  );

  // Use React Portal to render at document root, bypassing all other stacking contexts (headers, sidebars)
  return createPortal(modalContent, document.body);
};
