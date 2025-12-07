
import React, { useState, useRef, useEffect } from 'react';
import { mockDb } from '@/data/mockDatabase';
import { FinanceStats } from './FinanceStats';
import { InvoiceList } from './InvoiceList';
import { BankDetailsCard } from './BankDetailsCard';
import { Download, Loader2 } from 'lucide-react';
import { generateStatementPDF } from './pdfGenerator';
import { InvoicePreviewModal } from './InvoicePreviewModal'; // Import new modal
import { Invoice } from '@/data/types'; // Import Invoice type

export const FinancePage = () => {
  const user = mockDb.auth.getCurrentUser();
  const invoices = mockDb.getInvoices();
  const stats = mockDb.getFinanceStats();
  const [isExporting, setIsExporting] = useState(false);
  const [isExportMenuOpen, setIsExportMenuOpen] = useState(false);
  const exportMenuRef = useRef<HTMLDivElement>(null);
  
  // New state for modal
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);

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
          // Optionally, show a toast notification here
          return;
      }

      try {
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

  return (
    <>
      <div className="animate-in fade-in duration-500 pb-12">
         <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 md:mb-8">
            <div>
               <h2 className="text-2xl md:text-4xl font-serif font-bold text-jambo-950 dark:text-white mb-2">Finances</h2>
               <p className="text-gray-500 dark:text-gray-400 text-sm md:text-lg">Track your earnings, invoices, and payment schedules.</p>
            </div>
            <div className="relative" ref={exportMenuRef}>
              <button 
                onClick={() => setIsExportMenuOpen(!isExportMenuOpen)}
                disabled={isExporting || invoices.length === 0}
                className="bg-white dark:bg-white/10 text-gray-700 dark:text-white border border-gray-200 dark:border-white/20 px-4 py-2 rounded-lg font-bold text-sm shadow-sm hover:bg-gray-50 dark:hover:bg-white/20 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isExporting ? <Loader2 size={16} className="animate-spin" /> : <Download size={16} />} 
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

         <FinanceStats stats={stats} />

         <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content: Invoice List */}
            <div className="lg:col-span-2">
               <InvoiceList invoices={invoices} onInvoiceSelect={setSelectedInvoice} />
            </div>

            {/* Sidebar: Bank Details & Tax Info */}
            <div className="lg:col-span-1 space-y-6">
               <BankDetailsCard user={user} />
               
               {/* Tax Summary Card */}
               <div className="bg-white dark:bg-[#1a1625] rounded-2xl p-6 border border-gray-100 dark:border-white/5 shadow-lg">
                  <h4 className="font-serif font-bold text-gray-900 dark:text-white mb-4">Tax Summary (24/25)</h4>
                  <div className="space-y-3">
                     <div className="flex justify-between text-sm">
                        <span className="text-gray-500 dark:text-gray-400">Gross Earnings</span>
                        <span className="font-bold text-gray-900 dark:text-white">£{stats.totalPaid.toLocaleString()}</span>
                     </div>
                     <div className="flex justify-between text-sm">
                        <span className="text-gray-500 dark:text-gray-400">Estimated Tax</span>
                        <span className="font-bold text-gray-900 dark:text-white">£{(stats.totalPaid * 0.2).toLocaleString()}</span>
                     </div>
                     <div className="h-px bg-gray-100 dark:bg-white/10 my-2"></div>
                     <div className="flex justify-between text-sm">
                        <span className="text-gray-500 dark:text-gray-400">Net Estimated</span>
                        <span className="font-bold text-jambo-600 dark:text-jambo-400">£{(stats.totalPaid * 0.8).toLocaleString()}</span>
                     </div>
                  </div>
                  <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-xs text-blue-700 dark:text-blue-300 leading-snug">
                     <strong>Note:</strong> This is an estimate based on a standard 20% rate. Consult your accountant for accuracy.
                  </div>
               </div>
            </div>
         </div>
      </div>
      {/* Render Modal */}
      {selectedInvoice && (
        <InvoicePreviewModal
          invoice={selectedInvoice}
          onClose={() => setSelectedInvoice(null)}
        />
      )}
    </>
  );
};
