import React, { useState, useEffect } from 'react';
import { Download, Loader2, CheckCircle, Edit, User as UserIcon } from 'lucide-react';
import { Invoice, User } from '@/data/types';
import { mockDb } from '@/data/mockDatabase';
import { generateInvoicePDF } from './pdfGenerator';
import { PreviewHeader } from './preview/PreviewHeader';
import { PreviewItems } from './preview/PreviewItems';
import { PreviewSummary } from './preview/PreviewSummary';
import { StatusBadge } from './components/StatusBadge';
import { Modal } from '../../../ui/Modal';

interface InvoicePreviewModalProps {
  invoice: Invoice;
  onClose: () => void;
  onMarkPaid?: () => void;
  onEdit?: (invoice: Invoice) => void;
  onViewJob?: (jobId: string) => void;
  onViewProfile?: (userId: string) => void;
}

export const InvoicePreviewModal = ({ invoice, onClose, onMarkPaid, onEdit, onViewJob, onViewProfile }: InvoicePreviewModalProps) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [isPaying, setIsPaying] = useState(false);
  const currentUser = mockDb.auth.getCurrentUser();
  const isAdmin = currentUser?.role === 'admin';
  
  // ROBUST USER RESOLUTION
  let user: User | undefined | null = null;

  if (invoice.customRecipient) {
      user = {
          id: 'custom',
          firstName: invoice.customRecipient.name || 'Unknown',
          lastName: '',
          email: invoice.customRecipient.email || '',
          location: invoice.customRecipient.address || '',
          role: 'client',
          isVerified: true,
          createdAt: ''
      } as any;
  } else if (invoice.userId) {
      user = mockDb.getAllUsers().find(u => u.id === invoice.userId);
      if (!user) {
           user = {
              id: invoice.userId,
              firstName: 'Unknown',
              lastName: 'User',
              email: '',
              role: 'client',
              isVerified: false,
              createdAt: ''
           } as any;
      }
  }

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const handleDownload = async () => {
    setIsGenerating(true);
    try {
      await generateInvoicePDF(invoice, user || null);
    } catch (error) {
      console.error("Failed to generate PDF", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handlePay = () => {
      if (!onMarkPaid) return;
      setIsPaying(true);
      setTimeout(() => {
          onMarkPaid();
          setIsPaying(false);
      }, 1000);
  }

  // Handle profile click
  const handleProfileClick = () => {
      if (onViewProfile && user && user.id !== 'custom') {
          onViewProfile(user.id);
      }
  };

  return (
    <Modal isOpen={true} onClose={onClose} size="4xl">
        <PreviewHeader reference={invoice.reference} onClose={onClose} />

        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto custom-scrollbar p-4 sm:p-8">
          <div className="flex flex-col md:flex-row gap-6 md:gap-8 mb-8">
            {/* From */}
            <div className="flex-1">
              <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">From</p>
              <p className="font-bold text-gray-900 dark:text-white">Jambo Linguists Ltd</p>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                First Floor, Radley House,<br />
                Richardshaw Rd, Pudsey, LS28 6LE
              </p>
            </div>
            
            {/* To */}
            <div className="flex-1 md:text-right">
              <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Billed To</p>
              <div 
                className={`inline-block text-left md:text-right ${onViewProfile && user?.id !== 'custom' ? 'cursor-pointer group' : ''}`}
                onClick={handleProfileClick}
              >
                  <p className={`font-bold text-gray-900 dark:text-white flex items-center md:justify-end gap-2 ${onViewProfile && user?.id !== 'custom' ? 'group-hover:text-jambo-600 dark:group-hover:text-jambo-400 transition-colors' : ''}`}>
                    {user?.firstName} {user?.lastName}
                    {onViewProfile && user?.id !== 'custom' && <UserIcon size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />}
                  </p>
                  {user?.email && <p className="text-sm text-gray-600 dark:text-gray-300">{user.email}</p>}
                  {user?.location && <p className="text-sm text-gray-600 dark:text-gray-300">{user.location}</p>}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4 bg-gray-50 dark:bg-white/5 rounded-xl border border-gray-100 dark:border-white/10 mb-8">
            <div>
              <p className="text-xs font-bold uppercase text-gray-400">Issue Date</p>
              <p className="font-medium text-gray-800 dark:text-gray-200 text-sm md:text-base">{new Date(invoice.date).toLocaleDateString('en-GB')}</p>
            </div>
            <div>
              <p className="text-xs font-bold uppercase text-gray-400">Due Date</p>
              <p className="font-medium text-gray-800 dark:text-gray-200 text-sm md:text-base">{new Date(invoice.dueDate).toLocaleDateString('en-GB')}</p>
            </div>
            <div className="col-span-2 md:col-span-1 md:text-right flex md:block justify-between items-center">
              <p className="text-xs font-bold uppercase text-gray-400 mb-1">Status</p>
              <StatusBadge status={invoice.status} />
            </div>
          </div>
          
          <PreviewItems items={invoice.items} onViewJob={onViewJob} />
          <PreviewSummary invoice={invoice} />
          
          {invoice.notes && (
              <div className="mt-8 p-4 bg-gray-50 dark:bg-white/5 rounded-xl border border-gray-100 dark:border-white/5">
                  <p className="text-xs font-bold uppercase text-gray-400 mb-1">Notes</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{invoice.notes}</p>
              </div>
          )}

        </main>
        
        {/* Footer */}
        <footer className="p-4 sm:p-6 bg-gray-50 dark:bg-white/5 border-t border-gray-100 dark:border-white/5 flex flex-col sm:flex-row justify-between gap-3 shrink-0">
          <div className="flex gap-3 w-full sm:w-auto">
             <button
                onClick={handleDownload}
                disabled={isGenerating}
                className="flex-1 sm:flex-none bg-white dark:bg-white/10 hover:bg-gray-50 dark:hover:bg-white/20 border border-gray-200 dark:border-white/10 text-gray-700 dark:text-white font-bold py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-all disabled:opacity-60 text-sm"
            >
                {isGenerating ? <Loader2 size={18} className="animate-spin" /> : <Download size={18} />}
                {isGenerating ? 'Generating...' : 'PDF'}
            </button>
            
            {isAdmin && onEdit && (
                <button
                    onClick={() => onEdit(invoice)}
                    className="flex-1 sm:flex-none bg-white dark:bg-white/10 hover:bg-gray-50 dark:hover:bg-white/20 border border-gray-200 dark:border-white/10 text-gray-700 dark:text-white font-bold py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-all text-sm"
                >
                    <Edit size={18} /> Edit
                </button>
            )}
          </div>
          
          {onMarkPaid && invoice.status !== 'Paid' && (
              <button 
                onClick={handlePay}
                disabled={isPaying}
                className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg flex items-center justify-center gap-2 transition-all disabled:opacity-60 text-sm"
              >
                  {isPaying ? <Loader2 size={18} className="animate-spin" /> : <CheckCircle size={18} />}
                  Mark as Paid
              </button>
          )}
        </footer>
    </Modal>
  );
};