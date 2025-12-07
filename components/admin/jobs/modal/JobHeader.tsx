
import React, { useState, useRef, useEffect } from 'react';
import { X, Printer, Loader2, MoreVertical, Edit, FileText } from 'lucide-react';
import { Job } from '../../../../data/types';
import { JobStatusBadge } from '../../../ui/JobStatusBadge';
import { JobDetailsPDF } from '../pdf/JobDetailsPDF';

interface JobHeaderProps {
  job: Job;
  onClose: () => void;
  onEdit?: () => void;
}

export const JobHeader = ({ job, onClose, onEdit }: JobHeaderProps) => {
  const [isExporting, setIsExporting] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
        if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
            setIsMenuOpen(false);
        }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleExportPDF = async () => {
      setIsExporting(true);
      try {
          await JobDetailsPDF.generate(job);
      } catch (e) {
          console.error("Failed to generate Job PDF:", e);
          alert("Failed to generate PDF. Please try again.");
      } finally {
          setIsExporting(false);
      }
  };

  return (
    <header className="p-4 sm:p-5 md:p-6 bg-white dark:bg-[#1a1625] border-b border-gray-200 dark:border-white/5 flex justify-between items-center shadow-sm z-10 shrink-0">
        <div className="min-w-0 pr-4">
            <h2 className="font-serif font-bold text-lg sm:text-xl md:text-2xl text-gray-900 dark:text-white truncate">{job.title}</h2>
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs text-gray-500 mt-1">
                <span className="font-mono">#{job.id}</span>
                <span className="hidden xs:inline">•</span>
                <span>{job.category}</span>
                <span className="hidden sm:inline">•</span>
                <JobStatusBadge status={job.status} className="scale-90 origin-left" />
            </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
            <button 
                onClick={handleExportPDF}
                disabled={isExporting}
                className="hidden sm:flex p-2 hover:bg-gray-100 dark:hover:bg-white/10 rounded-full text-gray-500 dark:text-gray-400 transition-colors disabled:opacity-50"
                title="Export PDF"
            >
                {isExporting ? <Loader2 size={18} className="animate-spin"/> : <Printer size={18} />}
            </button>
            
            {/* Dropdown Menu */}
            <div className="relative" ref={menuRef}>
                <button 
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-white/10 rounded-full text-gray-500 dark:text-gray-400"
                >
                    <MoreVertical size={18} />
                </button>
                {isMenuOpen && (
                    <div className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-[#2a2438] rounded-xl shadow-2xl border border-gray-200 dark:border-white/10 overflow-hidden animate-in fade-in zoom-in-95 duration-200 z-50">
                        {onEdit && (
                            <button 
                                onClick={() => { onEdit(); setIsMenuOpen(false); }}
                                className="w-full text-left px-4 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-white/5 flex items-center gap-2 font-medium"
                            >
                                <Edit size={16} className="text-jambo-600 dark:text-jambo-400" /> Edit Job Details
                            </button>
                        )}
                        <button 
                            onClick={() => { handleExportPDF(); setIsMenuOpen(false); }}
                            className="w-full text-left px-4 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-white/5 flex items-center gap-2 md:hidden"
                        >
                            {isExporting ? <Loader2 size={16} className="animate-spin"/> : <FileText size={16} />} 
                            Export PDF
                        </button>
                    </div>
                )}
            </div>

            <button 
                onClick={onClose} 
                className="p-2 bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 rounded-full text-gray-500 dark:text-gray-300 transition-colors"
            >
                <X size={18} />
            </button>
        </div>
    </header>
  );
};
