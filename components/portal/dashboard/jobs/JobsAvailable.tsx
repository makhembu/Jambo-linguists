import React, { useState, useMemo, useEffect } from 'react';
import { JobFilters, FiltersState } from './JobFilters';
import { JobCard } from './JobCard';
import { JobListItem } from './JobListItem';
import { JobDetailsModal } from './JobDetailsModal';
import { Pagination } from './Pagination';
import { mockDb, Job } from '../../../../data/mockDatabase';
import { ToastType } from '../Toast';

const ITEMS_PER_PAGE = 6;

interface JobsAvailableProps {
  navigateToSection: (section: string, jobId?: string) => void;
  initialJobId?: string | null;
  showToast: (msg: string, type: ToastType) => void;
}

export const JobsAvailable = ({ navigateToSection, initialJobId, showToast }: JobsAvailableProps) => {
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showExpired, setShowExpired] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  const [filters, setFilters] = useState<FiltersState>({
    category: 'All', 
    distance: 'Any',
    sortBy: 'date' // Default: Newest first
  });

  // Fetch all available (Open) jobs
  const allOpenJobs = mockDb.getAvailableJobs();
  const currentUser = mockDb.auth.getCurrentUser();

  // Handle deep linking
  useEffect(() => {
    if (initialJobId) {
        const target = allOpenJobs.find(j => j.id === initialJobId);
        if (target) setSelectedJob(target);
    }
  }, [initialJobId, allOpenJobs]);

  const filteredJobs = useMemo(() => {
    let result = [...allOpenJobs];

    // 0. Language Pair Filter
    if (currentUser && currentUser.role === 'linguist' && currentUser.languages) {
        const userLangs = currentUser.languages.map(l => l.toLowerCase());
        result = result.filter(job => {
            const requiredLangs = job.languagePair.split(/[<>]+/).map(l => l.trim().toLowerCase()).filter(Boolean);
            if (requiredLangs.length === 0) return true; // if no language specified, show it.
            // Check if every language required for the job is present in the user's languages
            return requiredLangs.every(lang => userLangs.includes(lang));
        });
    }

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

    // 2. Date Filter (Hide past unless showExpired is true)
    if (!showExpired) {
        const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        result = result.filter(job => {
            const jobDate = new Date(job.date);
            return jobDate >= today;
        });
    }

    // 3. Category Filter
    if (filters.category !== 'All') {
       result = result.filter(j => j.category === filters.category);
    }

    // 4. Distance Filter
    if (filters.distance !== 'Any') {
      const maxDist = parseInt(filters.distance);
      result = result.filter(j => {
          if (j.distance === undefined || j.distance === null) return true; // Keep if unknown
          return j.distance <= maxDist;
      });
    }

    // 5. Sorting
    result.sort((a, b) => {
      if (filters.sortBy === 'rate') {
        // Safe numeric parse for "£30/hr", "£0.10/word" etc.
        const rateA = parseFloat(a.rate.replace(/[^0-9.]/g, '')) || 0;
        const rateB = parseFloat(b.rate.replace(/[^0-9.]/g, '')) || 0;
        return rateB - rateA; // Descending
      }
      
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();

      if (filters.sortBy === 'date_asc') {
        return dateA - dateB; // Oldest to Newest
      }
      
      // Default: date (Newest to Oldest)
      return dateB - dateA; 
    });

    return result;
  }, [filters, allOpenJobs, showExpired, searchTerm, currentUser]);

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
    <div className="animate-in fade-in duration-500 relative pb-12">
      <div className="mb-6">
         <h2 className="text-2xl sm:text-3xl font-serif font-bold text-jambo-950 dark:text-white mb-2">Job Marketplace</h2>
         <p className="text-gray-500 dark:text-gray-400 text-sm sm:text-base">Browse available assignments across Interpreting, Translation, and Transcription.</p>
      </div>

      <JobFilters 
        filters={filters} 
        setFilters={(f) => { setFilters(f); setCurrentPage(1); }} 
        viewMode={viewMode}
        setViewMode={setViewMode}
        showDistance={true}
        showExpired={showExpired}
        setShowExpired={setShowExpired}
        searchTerm={searchTerm}
        onSearchChange={(term) => { setSearchTerm(term); setCurrentPage(1); }}
      />

      {filteredJobs.length === 0 ? (
        <div className="text-center py-24 bg-white dark:bg-[#1a1625] rounded-2xl border border-dashed border-gray-300 dark:border-white/10">
           <div className="w-16 h-16 bg-gray-100 dark:bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
              <span className="text-2xl">?</span>
           </div>
           <p className="text-gray-500 dark:text-gray-400 text-xl font-serif">No jobs found matching your filters.</p>
           <div className="flex gap-4 justify-center mt-4">
               {!showExpired && (
                   <button onClick={() => setShowExpired(true)} className="text-sm font-bold text-gray-500 hover:text-jambo-600 underline">
                       Check expired jobs?
                   </button>
               )}
               <button 
                 onClick={() => { setFilters({ category: 'All', distance: 'Any', sortBy: 'date' }); setSearchTerm(''); setCurrentPage(1); }}
                 className="text-jambo-600 dark:text-jambo-400 font-bold hover:underline text-lg"
               >
                 Clear Filters
               </button>
           </div>
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

      {/* Modal */}
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
