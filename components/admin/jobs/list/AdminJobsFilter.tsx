import React, { useState, useEffect, useRef } from 'react';
import { Search, ArrowUpDown, ChevronDown } from 'lucide-react';

export interface SortConfig {
    key: string;
    direction: 'asc' | 'desc';
}

interface AdminJobsFilterProps {
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    filterStatus: string;
    setFilterStatus: (status: string) => void;
    filters: { id: string; label: string }[];
    unpaidJobsCount: number;
    sortConfig: SortConfig;
    setSortConfig: (config: SortConfig) => void;
}

const FilterPopover: React.FC<{
  label: string;
  icon: React.ReactNode;
  options: { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}> = ({ label, icon, options, value, onChange, className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className={`relative ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex w-full items-center gap-2 border rounded-lg px-3 py-2.5 text-sm font-medium transition-colors bg-white dark:bg-white/5 border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-white/10 ${
            isOpen && 'bg-gray-100 dark:bg-white/10 border-gray-300 dark:border-white/20 text-gray-900 dark:text-white'
        }`}
      >
        {icon}
        <span className="flex-1 text-left">{label}</span>
        <ChevronDown size={14} className={`transition-transform duration-200 text-gray-400 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && (
        <div className="absolute top-full mt-2 w-full min-w-[180px] bg-white dark:bg-[#2a2438] rounded-xl shadow-xl border border-gray-100 dark:border-white/10 z-20 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
          {options.map(opt => (
            <button
              key={opt.value}
              onClick={() => { onChange(opt.value); setIsOpen(false); }}
              className={`w-full text-left px-4 py-2.5 text-sm transition-colors border-l-2 ${value === opt.value ? 'font-bold bg-jambo-50 dark:bg-jambo-900/20 text-jambo-700 dark:text-jambo-300 border-jambo-600' : 'border-transparent text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-white/5'}`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export const AdminJobsFilter = ({ 
    searchTerm, setSearchTerm, filterStatus, setFilterStatus, 
    filters, unpaidJobsCount, sortConfig, setSortConfig 
}: AdminJobsFilterProps) => {

    const sortOptions = [
        { value: 'date-desc', label: 'Date (Newest First)' },
        { value: 'date-asc', label: 'Date (Oldest First)' },
        { value: 'status-asc', label: 'Status' },
        { value: 'rate-desc', label: 'Rate (High to Low)' },
    ];
    const currentSortValue = `${sortConfig.key}-${sortConfig.direction}`;
    const currentSortLabel = sortOptions.find(o => o.value === currentSortValue)?.label || 'Sort By';
    
    return (
        <div className="bg-white dark:bg-[#13111c] p-4 rounded-xl shadow-sm border border-gray-200 dark:border-white/5 flex flex-col gap-4">
            <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
                {/* Search */}
                <div className="relative w-full md:flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                    <input 
                        type="text" 
                        placeholder="Search by ID, Title, Location..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-jambo-600 dark:text-white"
                    />
                </div>

                {/* Sort Controls */}
                <div className="flex items-center gap-2 w-full md:w-auto">
                    <FilterPopover
                        icon={<ArrowUpDown size={14} />}
                        label={currentSortLabel}
                        options={sortOptions}
                        value={currentSortValue}
                        onChange={(v) => {
                            const [key, direction] = v.split('-');
                            setSortConfig({ key, direction: direction as 'asc' | 'desc' });
                        }}
                        className="w-full md:w-48"
                    />
                </div>
            </div>

            {/* Filter Tags */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 custom-scrollbar">
                {filters.map(f => (
                    <button 
                        key={f.id}
                        onClick={() => setFilterStatus(f.id)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-colors border flex items-center ${filterStatus === f.id ? 'bg-jambo-600 text-white border-jambo-600' : 'bg-white dark:bg-white/5 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/10'}`}
                    >
                        {f.label}
                        {f.id === 'Payment Pending' && unpaidJobsCount > 0 && (
                            <span className="ml-2 bg-red-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full">{unpaidJobsCount}</span>
                        )}
                    </button>
                ))}
            </div>
        </div>
    );
}