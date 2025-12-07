
import React, { useState, useMemo, useEffect } from 'react';
import { X, Plus, Download, Save, AlertTriangle } from 'lucide-react';
import { mockDb, Invoice } from '@/data/mockDatabase';
import { generateInvoicePDF } from '../../portal/dashboard/finance/pdfGenerator';
import { RecipientSection } from './manual-payment/RecipientSection';
import { LineItemsSection, LineItem } from './manual-payment/LineItemsSection';
import { SummarySection } from './manual-payment/SummarySection';
import { Modal } from '../../ui/Modal';

interface ManualPaymentModalProps {
  onClose: () => void;
  onInvoiceCreated: () => void;
  invoiceToEdit?: Invoice | null; // Optional prop for editing
}

export const ManualPaymentModal = ({ onClose, onInvoiceCreated, invoiceToEdit }: ManualPaymentModalProps) => {
  // Recipient State
  const [recipientType, setRecipientType] = useState<'existing' | 'custom'>('existing');
  const [selectedUserId, setSelectedUserId] = useState<string>('');
  const [customRecipient, setCustomRecipient] = useState({ name: '', email: '', address: '' });

  // Invoice Details State
  const [reference, setReference] = useState(`INV-MAN-${Date.now().toString().slice(-6)}`);
  const [issueDate, setIssueDate] = useState(new Date().toISOString().split('T')[0]);
  const [dueDate, setDueDate] = useState(new Date(Date.now() + 14 * 86400000).toISOString().split('T')[0]);
  
  // Items State
  const [items, setItems] = useState<LineItem[]>([
      { id: '1', description: '', quantity: 1, rate: 0, amount: 0, date: new Date().toISOString().split('T')[0] }
  ]);

  // Tax State
  const [vatEnabled, setVatEnabled] = useState(false);
  const [vatRate, setVatRate] = useState(20);

  // Computed Totals
  const subtotal = useMemo(() => items.reduce((sum, item) => sum + item.amount, 0), [items]);
  const vatAmount = vatEnabled ? (subtotal * vatRate) / 100 : 0;
  const total = subtotal + vatAmount;

  const allUsers = mockDb.getAllUsers();

  // Initialize data for Edit Mode
  useEffect(() => {
      if (invoiceToEdit) {
          setReference(invoiceToEdit.reference);
          setIssueDate(invoiceToEdit.date.split('T')[0]);
          setDueDate(invoiceToEdit.dueDate.split('T')[0]);
          
          if (invoiceToEdit.customRecipient) {
              setRecipientType('custom');
              setCustomRecipient({
                  name: invoiceToEdit.customRecipient.name,
                  email: invoiceToEdit.customRecipient.email || '',
                  address: invoiceToEdit.customRecipient.address || ''
              });
          } else {
              setRecipientType('existing');
              setSelectedUserId(invoiceToEdit.userId);
          }

          setItems(invoiceToEdit.items.map((i, idx) => ({
              id: idx.toString(),
              description: i.description,
              quantity: i.quantity || 1,
              rate: i.rate || i.amount,
              amount: i.amount,
              date: i.date || invoiceToEdit.date.split('T')[0]
          })));

          if (invoiceToEdit.vatRate) {
              setVatEnabled(true);
              setVatRate(invoiceToEdit.vatRate);
          }
      }
  }, [invoiceToEdit]);

  const handleSave = async (download: boolean) => {
      if (recipientType === 'existing' && !selectedUserId) {
          alert("Please select a user.");
          return;
      }
      if (recipientType === 'custom' && !customRecipient.name) {
          alert("Please enter a recipient name.");
          return;
      }

      if (invoiceToEdit && invoiceToEdit.status === 'Paid') {
          if (!confirm("Warning: You are editing a PAID invoice. A notification of amendment will be sent to the user. Continue?")) {
              return;
          }
      }

      const now = new Date().toISOString();
      const invoiceData: Invoice = {
          id: invoiceToEdit ? invoiceToEdit.id : `inv-${Date.now()}`,
          userId: recipientType === 'existing' ? selectedUserId : 'custom',
          reference,
          date: issueDate,
          dueDate: dueDate,
          amount: total,
          subtotal: subtotal,
          vatRate: vatEnabled ? vatRate : undefined,
          status: invoiceToEdit ? invoiceToEdit.status : 'Pending', // Preserve status if editing
          items: items.map(i => ({
              description: i.description,
              quantity: Number(i.quantity),
              rate: Number(i.rate),
              amount: Number(i.amount),
              date: i.date
          })),
          customRecipient: recipientType === 'custom' ? customRecipient : undefined,
          createdAt: invoiceToEdit ? invoiceToEdit.createdAt : now,
          updatedAt: now,
          deletedAt: null
      };

      if (invoiceToEdit) {
          mockDb.updateInvoice(invoiceData);
      } else {
          mockDb.createInvoice(invoiceData);
      }

      if (download) {
          const user = recipientType === 'existing' ? allUsers.find(u => u.id === selectedUserId) || null : null;
          await generateInvoicePDF(invoiceData, user);
      }

      onInvoiceCreated();
      onClose();
  };

  const isPaid = invoiceToEdit?.status === 'Paid';

  return (
    <Modal isOpen={true} onClose={onClose} size="4xl">
        {/* Header */}
        <div className="p-6 border-b border-gray-100 dark:border-white/5 flex justify-between items-center bg-gray-50/50 dark:bg-white/5">
            <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                    {invoiceToEdit ? (
                        <><Save className="text-jambo-600 dark:text-jambo-400" size={24} /> Edit Invoice {invoiceToEdit.reference}</>
                    ) : (
                        <><Plus className="text-jambo-600 dark:text-jambo-400" size={24} /> Create Manual Invoice</>
                    )}
                </h2>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {invoiceToEdit ? 'Update details for this invoice.' : 'Generate a bespoke invoice for any service.'}
                </p>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-white transition-colors">
                <X size={20} />
            </button>
        </div>

        {isPaid && (
            <div className="bg-orange-50 dark:bg-orange-900/20 px-6 py-3 border-b border-orange-100 dark:border-orange-800 flex items-center gap-2 text-orange-700 dark:text-orange-300 text-sm font-bold">
                <AlertTriangle size={16} />
                Warning: Editing a paid invoice will trigger an amendment notification.
            </div>
        )}

        {/* Content */}
        <div className="p-6 overflow-y-auto custom-scrollbar flex-1 bg-gray-50 dark:bg-black/10">
            <div className="grid lg:grid-cols-3 gap-6">
                
                {/* Left Column: Details */}
                <div className="lg:col-span-2 space-y-6">
                    <RecipientSection 
                        recipientType={recipientType} 
                        setRecipientType={setRecipientType}
                        selectedUserId={selectedUserId}
                        setSelectedUserId={setSelectedUserId}
                        customRecipient={customRecipient}
                        setCustomRecipient={setCustomRecipient}
                        allUsers={allUsers}
                    />
                    
                    <LineItemsSection 
                        items={items}
                        setItems={setItems}
                    />
                </div>

                {/* Right Column: Settings & Summary */}
                <div className="lg:col-span-1">
                    <SummarySection 
                        reference={reference} setReference={setReference}
                        issueDate={issueDate} setIssueDate={setIssueDate}
                        dueDate={dueDate} setDueDate={setDueDate}
                        subtotal={subtotal}
                        vatEnabled={vatEnabled} setVatEnabled={setVatEnabled}
                        vatRate={vatRate} setVatRate={setVatRate}
                        vatAmount={vatAmount}
                        total={total}
                    />
                </div>
            </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-100 dark:border-white/5 bg-gray-50 dark:bg-white/5 flex justify-end gap-3">
            <button 
                onClick={onClose}
                className="px-6 py-2.5 rounded-lg border border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-300 font-bold text-sm hover:bg-white dark:hover:bg-white/5 transition-colors"
            >
                Cancel
            </button>
            <button 
                onClick={() => handleSave(false)}
                className="px-6 py-2.5 rounded-lg bg-white dark:bg-white/10 text-gray-700 dark:text-white border border-gray-200 dark:border-white/20 font-bold text-sm hover:bg-gray-50 dark:hover:bg-white/20 transition-colors flex items-center gap-2"
            >
                <Save size={16} /> Save Changes
            </button>
            <button 
                onClick={() => handleSave(true)}
                className="px-6 py-2.5 rounded-lg bg-jambo-600 hover:bg-jambo-700 text-white font-bold text-sm shadow-lg flex items-center gap-2 transition-all"
            >
                <Download size={16} /> Save & Download
            </button>
        </div>
    </Modal>
  );
};
