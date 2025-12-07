import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Search, Filter, Download, Plus, Loader2 } from 'lucide-react';
import { mockDb, Invoice, Job } from '@/data/mockDatabase';
import { AdminFinanceStats } from './AdminFinanceStats';
import { AdminInvoiceTable } from './AdminInvoiceTable';
import { InvoicePreviewModal } from '../../portal/dashboard/finance/InvoicePreviewModal';
import { ManualPaymentModal } from './ManualPaymentModal';
import { UserProfileModal } from '../users/UserProfileModal';
import { AdminJobModal } from '../jobs/AdminJobModal';
import { generateStatementPDF } from '../../portal/dashboard/finance/pdfGenerator';


export const AdminFinance = () => {
  const [invoices, setInvoices] = useState(mockDb.getAllInvoices());
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  
  // Modal states
  const [isManualPaymentOpen, setIsManualPaymentOpen] = useState(false);
  const [invoiceToEdit, setInvoiceToEdit] = useState<Invoice | null>(null);
  const [viewingLinguistId, setViewingLinguistId] = useState<string | null>(null);
  const [jobToView, setJobToView] = useState<Job | null>(null);

  // Export state
  const [isExporting, setIsExporting] = useState(false);
  const [isExportMenuOpen, setIsExportMenuOpen] = useState(false);
  const exportMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
        if (exportMenuRef.current && !exportMenuRef.current.contains(event.target as Node)) {
            setIsExportMenuOpen(false);
        }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const refreshData = () => {
      const freshInvoices = mockDb.getAllInvoices();
      setInvoices(freshInvoices);
      
      // Update selected invoice if open to reflect new state immediately
      if (selectedInvoice) {
          const updatedSelected = freshInvoices.find(i => i.id === selectedInvoice.id);
          if (updatedSelected) setSelectedInvoice(updatedSelected);
      }
  };

  const handleMarkPaid = (id: string, fromModal: boolean = false) => {
      if (!fromModal && !confirm('Are you sure you want to mark this invoice as Paid? This will update the status immediately.')) {
        return;
      }

      mockDb.updateInvoiceStatus(id, 'Paid');
      refreshData();
  };

  const handleEditInvoice = (invoice: Invoice) => {
      setSelectedInvoice(null);
      setInvoiceToEdit(invoice);
      setIsManualPaymentOpen(true);
  };

  const handleJobView = (jobId: string) => {
      const job = mockDb.getAllJobs().find(j => j.id === jobId);
      if (job) {
          setJobToView(job);
      }
  };

  const handleProfileView = (userId: string) => {
      setViewingLinguistId(userId);
  };

  const filteredInvoices = useMemo(() => {
      return invoices.filter(inv => {
          // Status Filter
          if (statusFilter !== 'All' && inv.status !== statusFilter) return false;
          
          // Search Filter (Ref, or User Name)
          if (searchTerm) {
              const lowerTerm = searchTerm.toLowerCase();
              const user = mockDb.getAllUsers().find(u => u.id === inv.userId);
              const userName = user ? `${user.firstName} ${user.lastName}`.toLowerCase() : '';
              const customName = inv.customRecipient?.name.toLowerCase() || '';
              
              return (
                  inv.reference.toLowerCase().includes(lowerTerm) ||
                  userName.includes(lowerTerm) ||
                  customName.includes(lowerTerm) ||
                  inv.amount.toString().includes(lowerTerm)
              );
          }
          return true;
      });
  }, [invoices, statusFilter, searchTerm]);

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
          const periodLabel = {
              '30d': 'Last 30 Days',
              '90d': 'Last 90 Days',
              'year': `Year ${now.getFullYear()}`,
              'all': 'All Time'
          }[period];
          // Pass null for user to generate a company-wide report
          await generateStatementPDF(filtered, null, periodLabel);
      } catch (e) {
          console.error(e);
      } finally {
          setIsExporting(false);
      }
  };


  return (
    <div className="space-y-6 animate-in fade-in duration-500">
        <div className="flex flex-col md:flex-row justify-between gap-4">
            <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Financial Operations</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">Manage payroll, invoices, and payouts.</p>
            </div>
            <div className="flex gap-3">
                <div className="relative" ref={exportMenuRef}>
                  <button 
                    onClick={() => setIsExportMenuOpen(!isExportMenuOpen)}
                    disabled={isExporting || invoices.length === 0}
                    className="bg-white dark:bg-white/10 text-gray-700 dark:text-white border border-gray-200 dark:border-white/20 px-4 py-2 rounded-lg font-bold text-sm shadow-sm hover:bg-gray-50 dark:hover:bg-white/20 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isExporting ? <Loader2 size={16} className="animate-spin" /> : <Download size={16} />} 
                    Export Report
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
                <button 
                    onClick={() => { setInvoiceToEdit(null); setIsManualPaymentOpen(true); }}
                    className="bg-jambo-600 hover:bg-jambo-700 text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 text-sm shadow-lg shadow-jambo-600/20 transition-all"
                >
                    <Plus size={18} /> Manual Payment
                </button>
            </div>
        </div>

        <AdminFinanceStats invoices={invoices} />

        {/* Filters */}
        <div className="bg-white dark:bg-[#13111c] p-4 rounded-xl shadow-sm border border-gray-200 dark:border-white/5 flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <input 
                    type="text" 
                    placeholder="Search by Reference, Linguist Name, Amount..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-jambo-600 dark:text-white"
                />
            </div>
            <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 custom-scrollbar">
                {['All', 'Paid', 'Pending', 'Overdue'].map(status => (
                    <button 
                        key={status}
                        onClick={() => setStatusFilter(status)}
                        className={`px-4 py-2 rounded-lg text-xs font-bold whitespace-nowrap transition-colors border ${
                            statusFilter === status 
                                ? 'bg-gray-900 text-white border-gray-900 dark:bg-white dark:text-gray-900' 
                                : 'bg-white dark:bg-white/5 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/10'
                        }`}
                    >
                        {status}
                    </button>
                ))}
            </div>
        </div>

        <AdminInvoiceTable 
            invoices={filteredInvoices} 
            onView={setSelectedInvoice}
            onMarkPaid={(id) => handleMarkPaid(id, false)}
            onUserSelect={setViewingLinguistId}
        />

        {selectedInvoice && (
            <InvoicePreviewModal
                invoice={selectedInvoice}
                onClose={() => setSelectedInvoice(null)}
                onMarkPaid={() => handleMarkPaid(selectedInvoice.id, true)}
                onEdit={handleEditInvoice}
                onViewJob={handleJobView}
                onViewProfile={handleProfileView}
            />
        )}

        {isManualPaymentOpen && (
            <ManualPaymentModal 
                onClose={() => { setIsManualPaymentOpen(false); setInvoiceToEdit(null); }} 
                onInvoiceCreated={refreshData}
                invoiceToEdit={invoiceToEdit}
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

        {jobToView && (
            <AdminJobModal 
                job={jobToView} 
                onClose={() => setJobToView(null)} 
                onUpdate={() => setJobToView(null)} 
            />
        )}
    </div>
  );
};