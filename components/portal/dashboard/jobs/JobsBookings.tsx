
import React, { useState, useMemo, useEffect } from 'react';
import { JobCard } from './JobCard';
import { JobListItem } from './JobListItem';
import { JobDetailsModal } from './JobDetailsModal';
import { JobFilters, FiltersState } from './JobFilters';
import { Pagination } from './Pagination';
import { CalendarCheck } from 'lucide-react';
import { mockDb, Job } from '../../../../data/mockDatabase';
import { ToastType } from '../Toast';

const ITEMS_PER_PAGE = 6;

interface JobsBookingsProps {
    navigateToSection: (section: string, jobId?: string) => void;
    initialJobId?: string | null;
    showToast: (msg: string, type: ToastType) => void;
}

export const JobsBookings = ({ navigateToSection, initialJobId, showToast }: JobsBookingsProps) => {
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  
  const [filters, setFilters] = useState<FiltersState>({
    category: 'All', 
    distance: 'Any',
    sortBy: 'date',
    status: 'All'
  });
  
  const allBookedJobs = mockDb.getBookedJobs();

  // Handle deep linking to a job if initialJobId is provided
  useEffect(() => {
    if (initialJobId) {
        const target = allBookedJobs.find(j => j.id === initialJobId);
        if (target) setSelectedJob(target);
    }
  }, [initialJobId]);

  const filteredJobs = useMemo(() => {
    let result = [...allBookedJobs];

    // 1. Search Filter
    if (searchTerm.trim()) {
        const lowerTerm = searchTerm.toLowerCase();
        result = result.filter(job => 
            job.title.toLowerCase().includes(lowerTerm) ||
            job.id.toLowerCase().includes(lowerTerm) ||
            job.location.toLowerCase().includes(lowerTerm) ||
            (job.description && job.description.toLowerCase().includes(lowerTerm))
        );
    }

    // 2. Filters
    if (filters.category !== 'All') {
       result = result.filter(j => j.category === filters.category);
    }

    if (filters.distance !== 'Any') {
      const maxDist = parseInt(filters.distance);
      result = result.filter(j => {
          if (j.distance === undefined || j.distance === 0) return true; 
          return j.distance <= maxDist;
      });
    }
    
    if (filters.status && filters.status !== 'All') {
        result = result.filter(j => j.status === filters.status);
    }

    // 3. Sorting
    result.sort((a, b) => {
      if (filters.sortBy === 'rate') {
        const rateA = parseFloat(a.rate.replace(/[^0-9.]/g, '')) || 0;
        const rateB = parseFloat(b.rate.replace(/[^0-9.]/g, '')) || 0;
        return rateB - rateA;
      }
      
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();

      if (filters.sortBy === 'date_asc') {
        return dateA - dateB;
      }
      return dateB - dateA;
    });

    return result;
  }, [filters, allBookedJobs, searchTerm]);

  // Pagination Logic
  const totalPages = Math.ceil(filteredJobs.length / ITEMS_PER_PAGE);
  const paginatedJobs = filteredJobs.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      window.scrollTo({ top: 0, behavior: 'smooth' }); 
    }
  };

  return (
    <div className="animate-in fade-in duration-500 pb-12">
      <div className="mb-6 md:mb-8">
         <h2 className="text-2xl md:text-4xl font-serif font-bold text-jambo-950 dark:text-white mb-2">My Bookings</h2>
         <p className="text-gray-500 dark:text-gray-400 text-sm md:text-lg">Manage your upcoming assignments and active projects.</p>
      </div>

      <JobFilters 
        filters={filters} 
        setFilters={(f) => { setFilters(f); setCurrentPage(1); }} 
        viewMode={viewMode}
        setViewMode={setViewMode}
        showDistance={true}
        showStatus={false} 
        searchTerm={searchTerm}
        onSearchChange={(term) => { setSearchTerm(term); setCurrentPage(1); }}
      />

      {filteredJobs.length === 0 ? (
         <div className="flex flex-col items-center justify-center py-20 bg-white dark:bg-[#1a1625] rounded-2xl border border-dashed border-gray-200 dark:border-white/10">
            <div className="w-20 h-20 bg-gray-50 dark:bg-white/5 rounded-full flex items-center justify-center mb-6">
                <CalendarCheck size={32} className="text-gray-300 dark:text-gray-500" />
            </div>
            <h3 className="text-xl font-bold text-gray-400 dark:text-gray-500 font-serif">No active bookings found</h3>
            <p className="text-gray-400 dark:text-gray-600 mt-2">Try adjusting filters or visit the Marketplace.</p>
            <button 
                onClick={() => navigateToSection('jobs-available')}
                className="mt-4 text-jambo-600 dark:text-jambo-400 font-bold hover:underline"
            >
                Browse Marketplace
            </button>
         </div>
      ) : (
        <>
            <div className={viewMode === 'grid' ? "grid md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8" : "flex flex-col gap-3 mb-8"}>
            {paginatedJobs.map(job => (
                viewMode === 'grid'
                ? <JobCard key={job.id} job={job} onClick={() => setSelectedJob(job)} />
                : <JobListItem key={job.id} job={job} onClick={() => setSelectedJob(job)} />
            ))}
            </div>

            <Pagination 
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />
        </>
      )}

      {selectedJob && (
        <JobDetailsModal 
          job={selectedJob} 
          onClose={() => setSelectedJob(null)} 
          onNavigate={navigateToSection}
          showToast={showToast}
        />
      )}
    </div>
  );
};
