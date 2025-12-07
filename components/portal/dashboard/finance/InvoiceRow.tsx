
import React, { useState } from 'react';
import { FileText, Eye, Download, Loader2 } from 'lucide-react';
import { Invoice } from '../../../../data/types';
import { generateInvoicePDF } from './pdfGenerator';
import { mockDb } from '../../../../data/mockDatabase';
import { Card } from '../../../ui/Card';
import { IconBox } from '../../../ui/IconBox';

export interface InvoiceRowProps {
  invoice: Invoice;
  onSelect: () => void;
}

export const InvoiceRow: React.FC<InvoiceRowProps> = ({ invoice, onSelect }) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const user = mockDb.auth.getCurrentUser();

  const statusColors = {
      'Paid': 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800',
      'Pending': 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400 border-orange-200 dark:border-orange-800',
      'Overdue': 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800',
      'Draft': 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400 border-gray-200 dark:border-gray-700',
  };
  
  const handleDownload = async (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent modal from opening
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
    <Card 
      onClick={onSelect}
      hoverEffect={true}
      className="p-4 md:p-5 flex flex-col md:flex-row items-start md:items-center gap-4 group"
    >
       {/* Icon & Ref */}
       <div className="flex items-center gap-4 min-w-[200px]">
          <div className="group-hover:text-jambo-600 dark:group-hover:text-jambo-400 transition-colors">
             <IconBox icon={FileText} variant="neutral" size="md" />
          </div>
          <div>
              <p className="font-bold text-gray-900 dark:text-white text-sm">{invoice.reference}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{invoice.items.length} item{invoice.items.length !== 1 ? 's' : ''}</p>
          </div>
       </div>

       {/* Dates */}
       <div className="flex-1 grid grid-cols-2 md:grid-cols-2 gap-4 w-full md:w-auto">
          <div>
              <p className="text-[10px] text-gray-400 font-bold uppercase">Issued</p>
              <p className="text-sm text-gray-700 dark:text-gray-300 font-medium">{new Date(invoice.date).toLocaleDateString('en-GB')}</p>
          </div>
          <div>
              <p className="text-[10px] text-gray-400 font-bold uppercase">Due Date</p>
              <p className="text-sm text-gray-700 dark:text-gray-300 font-medium">{new Date(invoice.dueDate).toLocaleDateString('en-GB')}</p>
          </div>
       </div>

       {/* Amount, Status, & Actions */}
       <div className="flex items-center justify-between w-full md:w-auto gap-4 md:gap-6 mt-2 md:mt-0 pt-2 md:pt-0 border-t md:border-t-0 border-gray-50 dark:border-white/5">
          <div className="text-left md:text-right min-w-[80px]">
              <p className="font-bold text-gray-900 dark:text-white">£{invoice.amount.toFixed(2)}</p>
          </div>
          
          <div className={`px-3 py-1 rounded-full text-xs font-bold border ${statusColors[invoice.status]} min-w-[80px] text-center`}>
              {invoice.status}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDownload}
              disabled={isDownloading}
              className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-jambo-600 dark:hover:text-jambo-400 hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
              title="Download PDF"
            >
              {isDownloading ? <Loader2 size={16} className="animate-spin" /> : <Download size={16} />}
            </button>
            <div className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 group-hover:text-jambo-600 dark:group-hover:text-jambo-400 opacity-0 group-hover:opacity-100 transition-opacity" title="View Details">
                <Eye size={18} />
            </div>
          </div>
       </div>
    </Card>
  );
};
