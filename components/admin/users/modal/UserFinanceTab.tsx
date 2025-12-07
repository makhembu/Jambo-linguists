
import React, { useState, useRef, useEffect } from 'react';
import { mockDb } from '../../../../../data/mockDatabase';
import { Invoice } from '../../../../../data/types';
import { PoundSterling, FileText, CheckCircle, Clock, AlertCircle, Download, Loader2 } from 'lucide-react';
import { AdminInvoiceRow } from './AdminInvoiceRow';
import { InvoicePreviewModal } from '../../../portal/dashboard/finance/InvoicePreviewModal';
import { generateStatementPDF } from '../../../portal/dashboard/finance/pdfGenerator';

export const UserFinanceTab = ({ userId }: { userId: string }) => {
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [isExporting, setIsExporting] = useState(false);
  const [isExportMenuOpen, setIsExportMenuOpen] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0); // Force re-render on data change
  const exportMenuRef = useRef<HTMLDivElement>(null);
  
  const user = mockDb.getAllUsers().find(u => u.id === userId);
  
  // Re-fetch data on render (triggered by state changes)
  const invoices = mockDb.getInvoicesByUser(userId);
  
  // Calc Stats
  // Updated: Total Paid is now sum of Paid Invoices
  const totalPaid = invoices.filter(i => i.status === 'Paid').reduce((acc, curr) => acc + curr.amount, 0);
  const totalInvoiced = invoices.reduce((acc, curr) => acc + curr.amount, 0);
  const unpaidInvoices = invoices.filter(i => i.status === 'Pending' || i.status === 'Overdue');
  const pendingInvoicesAmount = unpaidInvoices.reduce((acc, curr) => acc + curr.amount, 0);
  const unpaidCount = unpaidInvoices.length;

   useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
        if (exportMenuRef.current && !exportMenuRef.current.contains(event.target as Node)) {
            setIsExportMenuOpen(false);
        }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleExportStatement = async (period: '30d' | '90d' | 'year' | 'all') => {
      if (invoices.length === 0) return;
      
      setIsExporting(true);
      setIsExportMenuOpen(false);

      const now = new Date();
      const filtered = invoices.filter(inv => {
          const invDate = new Date(inv.date);
          if (period === 'all') return true;
          if (period === 'year') return invDate.getFullYear() === now.getFullYear();
          
          let days = 0;
          if (period === '30d') days = 30;
          if (period === '90d') days = 90;
          
          const cutoff = new Date();
          cutoff.setDate(now.getDate() - days);
          return invDate >= cutoff;
      });

      if (filtered.length === 0) {
          console.warn("No invoices in selected period to export.");
          setIsExporting(false);
          return;
      }

      try {
          if (!user) return;
          const periodLabel = {
              '30d': 'Last 30 Days',
              '90d': 'Last 90 Days',
              'year': `Year ${now.getFullYear()}`,
              'all': 'All Time'
          }[period];
          await generateStatementPDF(filtered, user, periodLabel);
      } catch (e) {
          console.error(e);
      } finally {
          setIsExporting(false);
      }
  };

  const handleMarkPaid = () => {
      if (selectedInvoice) {
          mockDb.updateInvoiceStatus(selectedInvoice.id, 'Paid');
          // Update local modal state to reflect change immediately
          setSelectedInvoice(prev => prev ? ({...prev, status: 'Paid'}) : null);
          // Trigger re-render of parent stats
          setRefreshTrigger(prev => prev + 1);
      }
  }

  if (!user) return <p className="p-6 text-center text-gray-500">User not found.</p>;

  return (
    <>
      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-gray-50 dark:bg-white/5 p-4 rounded-xl border border-gray-200 dark:border-white/10">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Total Paid (Invoices)</p>
                <p className="text-xl font-bold text-jambo-600 dark:text-jambo-400 font-mono">£{totalPaid.toFixed(2)}</p>
            </div>
            <div className="bg-gray-50 dark:bg-white/5 p-4 rounded-xl border border-gray-200 dark:border-white/10">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Total Invoiced</p>
                <p className="text-xl font-bold text-gray-900 dark:text-white font-mono">£{totalInvoiced.toFixed(2)}</p>
            </div>
            <div className="bg-gray-50 dark:bg-white/5 p-4 rounded-xl border border-gray-200 dark:border-white/10">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Pending Pay</p>
                <p className="text-xl font-bold text-orange-500 font-mono">£{pendingInvoicesAmount.toFixed(2)}</p>
            </div>
        </div>

        <div>
             <div className="flex items-center justify-between mb-3">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                    Invoices
                    {unpaidCount > 0 && (
                        <span className="bg-red-500 text-white w-5 h-5 flex items-center justify-center rounded-full text-[10px] font-bold">{unpaidCount}</span>
                    )}
                </h3>
                <div className="relative" ref={exportMenuRef}>
                  <button 
                    onClick={() => setIsExportMenuOpen(!isExportMenuOpen)}
                    disabled={isExporting || invoices.length === 0}
                    className="bg-white dark:bg-white/10 text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-white/20 px-3 py-1.5 rounded-lg font-bold text-xs shadow-sm hover:bg-gray-50 dark:hover:bg-white/20 transition-colors flex items-center gap-2 disabled:opacity-50"
                  >
                    {isExporting ? <Loader2 size={14} className="animate-spin" /> : <Download size={14} />} 
                    Export Statement
                  </button>
                  {isExportMenuOpen && (
                    <div className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-[#1a1625] rounded-lg shadow-lg border border-gray-200 dark:border-white/10 z-10 p-2 animate-in fade-in slide-in-from-top-2 duration-200">
                        <button onClick={() => handleExportStatement('30d')} className="w-full text-left px-3 py-2 text-sm rounded-md hover:bg-gray-100 dark:hover:bg-white/5 text-gray-700 dark:text-gray-200">Last 30 Days</button>
                        <button onClick={() => handleExportStatement('90d')} className="w-full text-left px-3 py-2 text-sm rounded-md hover:bg-gray-100 dark:hover:bg-white/5 text-gray-700 dark:text-gray-200">Last 90 Days</button>
                        <button onClick={() => handleExportStatement('year')} className="w-full text-left px-3 py-2 text-sm rounded-md hover:bg-gray-100 dark:hover:bg-white/5 text-gray-700 dark:text-gray-200">This Year</button>
                        <button onClick={() => handleExportStatement('all')} className="w-full text-left px-3 py-2 text-sm rounded-md hover:bg-gray-100 dark:hover:bg-white/5 text-gray-700 dark:text-gray-200">All Time</button>
                    </div>
                  )}
                </div>
            </div>
            {invoices.length === 0 ? (
                <div className="text-center py-8 border border-dashed border-gray-200 dark:border-white/10 rounded-xl">
                    <p className="text-gray-400 text-sm">No invoices generated yet.</p>
                </div>
            ) : (
                <div className="space-y-2">
                    {invoices.map(inv => (
                        <AdminInvoiceRow 
                            key={inv.id} 
                            invoice={inv}
                            user={user}
                            onPreview={() => setSelectedInvoice(inv)}
                        />
                    ))}
                </div>
            )}
        </div>
      </div>
      {selectedInvoice && (
          <InvoicePreviewModal 
              invoice={selectedInvoice}
              onClose={() => setSelectedInvoice(null)}
              onMarkPaid={handleMarkPaid}
          />
      )}
    </>
  );
};
