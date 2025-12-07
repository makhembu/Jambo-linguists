import React, { useState, useEffect, useRef } from 'react';
import { Filter, MapPin, ArrowUpDown, Search, LayoutGrid, List, CheckCircle, ChevronDown, Clock, X } from 'lucide-react';
import { Card } from '../../../ui/Card';
import { Input } from '../../../ui/Input';

export interface FiltersState {
  category: string;
  distance: string;
  sortBy: string;
  status?: string;
}

interface JobFiltersProps {
  filters: FiltersState;
  setFilters: React.Dispatch<React.SetStateAction<FiltersState>>;
  viewMode: 'grid' | 'list';
  setViewMode: (mode: 'grid' | 'list') => void;
  showDistance?: boolean;
  showStatus?: boolean;
  showExpired?: boolean;
  setShowExpired?: (show: boolean) => void;
  searchTerm?: string;
  onSearchChange?: (term: string) => void;
}

// --- Internal Popover Component ---
const FilterPopover: React.FC<{
  label: string;
  icon: React.ReactNode;
  options: { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
}> = ({ label, icon, options, value, onChange }) => {
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
    <div ref={ref} className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 border rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
            isOpen 
            ? 'bg-gray-100 dark:bg-white/10 border-gray-300 dark:border-white/20 text-gray-900 dark:text-white' 
            : 'bg-white dark:bg-white/5 border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-white/10'
        }`}
      >
        {icon}
        <span>{label}</span>
        <ChevronDown size={14} className={`transition-transform duration-200 text-gray-400 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && (
        <div className="absolute top-full mt-2 w-48 bg-white dark:bg-[#2a2438] rounded-xl shadow-xl border border-gray-100 dark:border-white/10 z-20 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
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


export const JobFilters = ({ 
  filters, 
  setFilters, 
  viewMode, 
  setViewMode,
  showDistance = true,
  showStatus = false,
  showExpired,
  setShowExpired,
  searchTerm = "",
  onSearchChange
}: JobFiltersProps) => {
  
  const handleChange = (key: keyof FiltersState, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const categoryOptions = [
    { value: 'All', label: 'All Categories' },
    { value: 'Interpreting', label: 'Interpreting' },
    { value: 'Translation', label: 'Translation' },
    { value: 'Transcription', label: 'Transcription' },
  ];

  const distanceOptions = [
    { value: 'Any', label: 'Any Distance' },
    { value: '5', label: 'Within 5 miles' },
    { value: '10', label: 'Within 10 miles' },
    { value: '25', label: 'Within 25 miles' },
  ];
  
  const sortOptions = [
    { value: 'date', label: 'Newest' },
    { value: 'date_asc', label: 'Oldest' },
    { value: 'rate', label: 'Rate' },
  ];

  const statusOptions = [
      { value: 'All', label: 'All Statuses' },
      { value: 'Completed', label: 'Completed' },
      { value: 'Cancelled', label: 'Cancelled' },
  ]

  const currentCategoryLabel = categoryOptions.find(o => o.value === filters.category)?.label || 'Categories';
  const currentDistanceLabel = distanceOptions.find(o => o.value === filters.distance)?.label || 'Distance';
  const currentStatusLabel = statusOptions.find(o => o.value === filters.status)?.label || 'Status';
  const currentSortLabel = sortOptions.find(o => o.value === filters.sortBy)?.label || 'Sort By';

  return (
    <Card className="p-4 mb-8">
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
        
        {/* Search Input */}
        {onSearchChange && (
            <div className="w-full md:flex-1 relative">
                <Input 
                    placeholder="Search jobs by title, ID, or location..."
                    value={searchTerm}
                    onChange={(e) => onSearchChange(e.target.value)}
                    leftIcon={<Search size={16} />}
                    rightIcon={searchTerm ? <button onClick={() => onSearchChange('')}><X size={14}/></button> : undefined}
                />
            </div>
        )}

        {/* Filters Row */}
        <div className="w-full md:w-auto flex flex-wrap items-center gap-2">
            <FilterPopover 
                icon={<Filter size={14} />} 
                label={currentCategoryLabel}
                options={categoryOptions}
                value={filters.category}
                onChange={(v) => handleChange('category', v)}
            />
            
            {showDistance && <FilterPopover 
                icon={<MapPin size={14} />} 
                label={currentDistanceLabel}
                options={distanceOptions}
                value={filters.distance}
                onChange={(v) => handleChange('distance', v)}
            />}
            
            {showStatus && <FilterPopover 
                icon={<CheckCircle size={14} />} 
                label={currentStatusLabel}
                options={statusOptions}
                value={filters.status || 'All'}
                onChange={(v) => handleChange('status', v)}
            />}
            
            {setShowExpired && (
                <button 
                    onClick={() => setShowExpired(!showExpired)}
                    className={`flex items-center gap-2 border rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                        showExpired 
                        ? 'bg-red-50 border-red-200 text-red-600 dark:bg-red-900/20 dark:border-red-800 dark:text-red-400' 
                        : 'bg-white dark:bg-white/5 border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-white/10'
                    }`}
                >
                    <Clock size={14} />
                    {showExpired ? 'Hide Expired' : 'Show Expired'}
                </button>
            )}

            <div className="h-8 w-px bg-gray-200 dark:bg-white/10 mx-1 hidden md:block"></div>

            {/* Sort & View Toggles */}
            <div className="flex items-center gap-2 ml-auto md:ml-0">
                <FilterPopover
                    icon={<ArrowUpDown size={14} />}
                    label={currentSortLabel}
                    options={sortOptions}
                    value={filters.sortBy}
                    onChange={(v) => handleChange('sortBy', v)}
                />
                
                <div className="flex bg-gray-100 dark:bg-white/5 p-1 rounded-lg border border-gray-200 dark:border-white/10">
                    <button 
                        onClick={() => setViewMode('grid')}
                        className={`p-1.5 rounded-md transition-all ${viewMode === 'grid' ? 'bg-white dark:bg-white/10 text-jambo-600 dark:text-jambo-400 shadow-sm' : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-200'}`}
                        title="Grid View"
                    >
                        <LayoutGrid size={16} />
                    </button>
                    <button 
                        onClick={() => setViewMode('list')}
                        className={`p-1.5 rounded-md transition-all ${viewMode === 'list' ? 'bg-white dark:bg-white/10 text-jambo-600 dark:text-jambo-400 shadow-sm' : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-200'}`}
                        title="List View"
                    >
                        <List size={16} />
                    </button>
                </div>
            </div>
        </div>
      </div>
    </Card>
  );
};