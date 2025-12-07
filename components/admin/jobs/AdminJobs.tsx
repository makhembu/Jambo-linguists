
import React, { useState, useEffect, useMemo } from 'react';
import { Plus, Search } from 'lucide-react';
import { mockDb, Job, JobStatus, Invoice } from '../../../data/mockDatabase';
import { AdminJobModal } from './AdminJobModal';
import { UserProfileModal } from '../users/UserProfileModal';
import { Toast, ToastType } from '../../portal/dashboard/Toast';
import { AddJobModal } from './AddJobModal';
import { AdminJobsFilter, SortConfig } from './list/AdminJobsFilter';
import { AdminJobsTable } from './list/AdminJobsTable';
import { AdminJobsMobileList } from './list/AdminJobsMobileList';

interface AdminJobsProps {
  initialFilter?: string;
  actionRequest?: string | null; // Prop to handle external triggers like 'create-job'
  onActionComplete?: () => void;
}

export const AdminJobs = ({ initialFilter = 'All', actionRequest, onActionComplete }: AdminJobsProps) => {
  const [jobs, setJobs] = useState<Job[]>(mockDb.getAllJobs());
  const [invoices, setInvoices] = useState<Invoice[]>(mockDb.getAllInvoices());
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>(initialFilter);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [selectedLinguistId, setSelectedLinguistId] = useState<string | null>(null);
  const [isAddJobModalOpen, setIsAddJobModalOpen] = useState(false);
  
  // Sorting State
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: 'date', direction: 'desc' });
  
  const [toast, setToast] = useState<{ visible: boolean; message: string; type: ToastType }>({
    visible: false,
    message: '',
    type: 'success'
  });

  const showToast = (message: string, type: ToastType = 'success') => {
    setToast({ visible: true, message, type });
  };

  useEffect(() => {
    setFilterStatus(initialFilter);
  }, [initialFilter]);

  // Handle external actions (like from FAB)
  useEffect(() => {
      if (actionRequest === 'create-job') {
          setIsAddJobModalOpen(true);
          if (onActionComplete) onActionComplete();
      }
  }, [actionRequest, onActionComplete]);

  const refreshData = () => {
      setJobs(mockDb.getAllJobs());
      setInvoices(mockDb.getAllInvoices());
  };

  const filteredJobs = useMemo(() => {
      let result = jobs.filter(job => {
        const matchesSearch = 
            job.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
            job.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            job.location.toLowerCase().includes(searchTerm.toLowerCase());
        
        let matchesStatus = false;
        if (filterStatus === 'All') {
            matchesStatus = true;
        } else if (filterStatus === 'Scheduled') {
            matchesStatus = job.status === 'Scheduled' || job.status === 'In Progress';
        } else if (filterStatus === 'Payment Pending') {
            const inv = invoices.find(i => i.items.some(item => item.jobId === job.id));
            matchesStatus = job.status === 'Completed' && (inv?.status === 'Pending' || inv?.status === 'Overdue');
        } else {
            matchesStatus = job.status === filterStatus;
        }

        return matchesSearch && matchesStatus;
      });

      // Sorting Logic
      result.sort((a, b) => {
          let aVal: any = '';
          let bVal: any = '';

          switch(sortConfig.key) {
              case 'date':
                  aVal = new Date(a.date).getTime();
                  bVal = new Date(b.date).getTime();
                  break;
              case 'status':
                  aVal = a.status;
                  bVal = b.status;
                  break;
              case 'rate':
                  // Extract number from rate string for rough sorting
                  const getRateVal = (rate: string | undefined) => {
                      if (!rate) return 0;
                      const num = parseFloat(rate.replace(/[^0-9.]/g, ''));
                      return isNaN(num) ? 0 : num;
                  }
                  aVal = getRateVal(a.rate);
                  bVal = getRateVal(b.rate);
                  break;
              default:
                  aVal = new Date(a.date).getTime();
                  bVal = new Date(b.date).getTime();
          }

          if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
          if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
          return 0;
      });

      return result;
  }, [jobs, searchTerm, filterStatus, invoices, sortConfig]);
  
  const unpaidJobsCount = useMemo(() => {
    const unpaidInvoiceJobIds = new Set<string>();
    invoices
        .filter(inv => inv.status === 'Pending' || inv.status === 'Overdue')
        .forEach(inv => {
            inv.items.forEach(item => {
                if (item.jobId) {
                    unpaidInvoiceJobIds.add(item.jobId);
                }
            });
        });
    return unpaidInvoiceJobIds.size;
  }, [invoices]);

  const handleLinguistClick = (e: React.MouseEvent, linguistId: string) => {
      e.stopPropagation();
      setSelectedLinguistId(linguistId);
  };

  const getStatusColor = (status: string) => {
      switch(status) {
          case 'Open': return 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400';
          case 'Scheduled': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400';
          case 'In Progress': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400 animate-pulse';
          case 'Pending Approval': return 'bg-orange-100 text-orange-700 dark:bg-orange-900/20 dark:text-orange-400';
          case 'Revision': return 'bg-amber-100 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400';
          case 'Completed': return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300';
          default: return 'bg-gray-100 text-gray-600';
      }
  };

  const filters = [
      { id: 'All', label: 'All Jobs' },
      { id: 'Pending Approval', label: 'Pending Approval' },
      { id: 'Revision', label: 'Revision' },
      { id: 'Open', label: 'Marketplace' },
      { id: 'Scheduled', label: 'Live / Scheduled' },
      { id: 'Payment Pending', label: 'Unpaid Invoices' },
      { id: 'Completed', label: 'Completed History' }
  ];

  return (
    <div className="space-y-6">
        <Toast 
            message={toast.message} 
            type={toast.type} 
            isVisible={toast.visible} 
            onClose={() => setToast(prev => ({ ...prev, visible: false }))} 
        />

        <div className="flex flex-col md:flex-row justify-between gap-4">
            <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Job Operations</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">Manage assignments, approvals, and history.</p>
            </div>
            <button 
                onClick={() => setIsAddJobModalOpen(true)}
                className="bg-jambo-600 hover:bg-jambo-700 text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 text-sm shadow-lg shadow-jambo-600/20 transition-all w-fit"
            >
                <Plus size={18} /> Create Job
            </button>
        </div>

        <AdminJobsFilter 
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            filterStatus={filterStatus}
            setFilterStatus={setFilterStatus}
            filters={filters}
            unpaidJobsCount={unpaidJobsCount}
            sortConfig={sortConfig}
            setSortConfig={setSortConfig}
        />

        <div className="bg-white dark:bg-[#13111c] rounded-xl shadow-sm border border-gray-200 dark:border-white/5 overflow-hidden">
            {filteredJobs.length === 0 ? (
                <div className="p-12 text-center text-gray-400">No jobs found matching filters.</div>
            ) : (
                <>
                    <AdminJobsMobileList 
                        jobs={filteredJobs}
                        onJobSelect={setSelectedJob}
                        getStatusColor={getStatusColor}
                    />
                    <AdminJobsTable 
                        jobs={filteredJobs}
                        invoices={invoices}
                        onJobSelect={setSelectedJob}
                        onLinguistSelect={handleLinguistClick}
                        getStatusColor={getStatusColor}
                    />
                </>
            )}
        </div>

        {isAddJobModalOpen && (
            <AddJobModal 
                onClose={() => setIsAddJobModalOpen(false)}
                onJobAdded={(newJob) => {
                    refreshData();
                    showToast('Job created successfully!', 'success');
                    setIsAddJobModalOpen(false);
                    setSelectedJob(newJob);
                }}
            />
        )}

        {selectedJob && (
            <AdminJobModal 
                job={selectedJob} 
                onClose={() => setSelectedJob(null)} 
                onUpdate={(msg) => { 
                    refreshData(); 
                    // Update current selected job to keep modal open with new info
                    const updated = mockDb.getAllJobs().find(j => j.id === selectedJob.id);
                    if (updated) setSelectedJob(updated);
                    
                    if (msg) showToast(msg, 'success');
                }} 
            />
        )}

        {selectedLinguistId && (
            <UserProfileModal
                user={mockDb.getAllUsers().find(u => u.id === selectedLinguistId)!}
                onClose={() => setSelectedLinguistId(null)}
                onUpdate={() => {}}
                onNavigate={() => {}}
            />
        )}
    </div>
  );
};
