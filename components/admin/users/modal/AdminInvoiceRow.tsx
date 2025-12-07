
import React, { useState } from 'react';
import { FileText, Eye, Download, Loader2 } from 'lucide-react';
import { Invoice, User } from '../../../../../data/types';
import { generateInvoicePDF } from '../../../portal/dashboard/finance/pdfGenerator';

export interface AdminInvoiceRowProps {
  invoice: Invoice;
  user: User;
  onPreview: () => void;
}

export const AdminInvoiceRow: React.FC<AdminInvoiceRowProps> = ({ invoice, user, onPreview }) => {
  const [isDownloading, setIsDownloading] = useState(false);

  const statusColors = {
      'Paid': 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
      'Pending': 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
      'Overdue': 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
      'Draft': 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400',
  };
  
  const handleDownload = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isDownloading) return;
    setIsDownloading(true);
    try {
        await generateInvoicePDF(invoice, user);
    } catch (err) {
        console.error("PDF generation failed:", err);
    } finally {
        setIsDownloading(false);
    }
  };

  return (
    <div className="flex items-center justify-between p-3 rounded-lg border border-gray-100 dark:border-white/5 bg-white dark:bg-white/5 hover:border-gray-300 transition-colors group">
        <div className="flex items-center gap-3">
            <div className="w-8 h-8 p-1.5 rounded-lg bg-gray-100 text-gray-600 dark:bg-white/10 dark:text-gray-400 border border-gray-200 dark:border-white/10 flex items-center justify-center">
                <FileText size={16} />
            </div>
            <div>
                <p className="text-sm font-bold text-gray-900 dark:text-white">{invoice.reference}</p>
                <p className="text-xs text-gray-500">{new Date(invoice.date).toLocaleDateString()}</p>
            </div>
        </div>
        <div className="flex items-center gap-4">
            <p className="text-sm font-bold font-mono text-gray-900 dark:text-white">£{invoice.amount.toFixed(2)}</p>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${statusColors[invoice.status]}`}>{invoice.status}</span>
            <div className="flex items-center gap-1">
                <button onClick={onPreview} className="p-1.5 rounded text-gray-400 hover:bg-gray-100 dark:hover:bg-white/10 hover:text-jambo-600 transition-colors"><Eye size={16}/></button>
                <button onClick={handleDownload} disabled={isDownloading} className="p-1.5 rounded text-gray-400 hover:bg-gray-100 dark:hover:bg-white/10 hover:text-jambo-600 transition-colors">{isDownloading ? <Loader2 size={16} className="animate-spin"/> : <Download size={16}/>}</button>
            </div>
        </div>
    </div>
  );
};
