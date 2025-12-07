
import React from 'react';
import { Download, Users, FileCheck, Briefcase } from 'lucide-react';
import { mockDb } from '../../../../data/mockDatabase';

interface QuickActionsProps {
  onNavigate?: (section: string, filter?: string) => void;
}

export const QuickActions = ({ onNavigate }: QuickActionsProps) => {
  
  const downloadCSV = (content: string, filename: string) => {
      const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
  };

  const handleExportJobs = () => {
      const jobs = mockDb.getAllJobs();
      if (jobs.length === 0) {
          alert("No jobs to export.");
          return;
      }
      const headers = ['ID', 'Title', 'Category', 'Status', 'Date', 'Time', 'Location', 'Rate', 'Linguist ID', 'Total Payout'];
      const rows = jobs.map(j => [
          j.id,
          `"${j.title.replace(/"/g, '""')}"`,
          j.category,
          j.status,
          j.date,
          j.time || '',
          `"${j.location.replace(/"/g, '""')}"`,
          j.rate,
          j.linguistId || 'Unassigned',
          j.totalPayout || 0
      ].join(','));
      const csvContent = [headers.join(','), ...rows].join('\n');
      downloadCSV(csvContent, `Jambo_Jobs_Export_${new Date().toISOString().split('T')[0]}.csv`);
  };

  const handleExportUsers = () => {
      const users = mockDb.getAllUsers();
      if (users.length === 0) {
          alert("No users to export.");
          return;
      }
      const headers = ['ID', 'First Name', 'Last Name', 'Email', 'Role', 'Status', 'Joined'];
      const rows = users.map(u => [
          u.id,
          u.firstName,
          u.lastName,
          u.email,
          u.role,
          u.isSuspended ? 'Suspended' : (u.isVerified ? 'Active' : 'Pending'),
          u.createdAt
      ].join(','));
      const csvContent = [headers.join(','), ...rows].join('\n');
      downloadCSV(csvContent, `Jambo_Users_Export_${new Date().toISOString().split('T')[0]}.csv`);
  };

  const styles = {
      info: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200 dark:border-blue-800',
      brand: 'bg-jambo-100 text-jambo-700 dark:bg-jambo-900/30 dark:text-jambo-300 border-jambo-200 dark:border-jambo-800',
      warning: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400 border-orange-200 dark:border-orange-800',
      success: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800'
  };

  const actions: { label: string, icon: any, style: string, onClick: () => void }[] = [
      { 
          label: 'Export Jobs CSV', 
          icon: Download, 
          style: styles.info,
          onClick: handleExportJobs
      },
      { 
          label: 'Export Users CSV', 
          icon: Users, 
          style: styles.brand, 
          onClick: handleExportUsers
      },
      { 
          label: 'Review Approvals', 
          icon: FileCheck, 
          style: styles.warning, 
          onClick: () => onNavigate && onNavigate('jobs', 'Pending Approval')
      },
      { 
          label: 'Manage Linguists', 
          icon: Briefcase, 
          style: styles.success, 
          onClick: () => onNavigate && onNavigate('linguists')
      },
  ];

  return (
    <div className="bg-white dark:bg-[#13111c] rounded-xl shadow-sm border border-gray-200 dark:border-white/5 p-5">
        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 gap-3">
            {actions.map((action, i) => {
                const Icon = action.icon;
                return (
                    <button 
                        key={i}
                        onClick={action.onClick}
                        className="flex flex-col items-center justify-center p-3 rounded-xl border border-gray-100 dark:border-white/5 hover:border-gray-300 dark:hover:border-white/20 hover:shadow-md transition-all group bg-gray-50/50 dark:bg-white/5"
                    >
                        <div className={`mb-2 group-hover:scale-110 transition-transform w-10 h-10 flex items-center justify-center rounded-xl border ${action.style}`}>
                            <Icon size={20} />
                        </div>
                        <span className="text-xs font-bold text-gray-700 dark:text-gray-300 text-center leading-tight">{action.label}</span>
                    </button>
                );
            })}
        </div>
    </div>
  );
};
