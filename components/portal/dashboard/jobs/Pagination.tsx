
import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-4 mt-8">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 hover:bg-gray-50 dark:hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm text-gray-600 dark:text-gray-300"
      >
        <ChevronLeft size={20} />
      </button>

      <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
        Page <span className="text-jambo-600 dark:text-jambo-400 font-bold">{currentPage}</span> of {totalPages}
      </span>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 hover:bg-gray-50 dark:hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm text-gray-600 dark:text-gray-300"
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
};
