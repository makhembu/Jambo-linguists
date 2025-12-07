
import React from 'react';
import { Search, LayoutGrid, List } from 'lucide-react';
import { Input } from '../../../../ui/Input';

interface TrainingFilterBarProps {
  searchTerm: string;
  setSearchTerm: (s: string) => void;
  viewMode: 'grid' | 'list';
  setViewMode: (mode: 'grid' | 'list') => void;
  placeholder?: string;
}

export const TrainingFilterBar = ({ 
  searchTerm, setSearchTerm, viewMode, setViewMode,
  placeholder = "Search modules..."
}: TrainingFilterBarProps) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-between items-center mb-6">
        <div className="w-full sm:max-w-md relative">
            <Input 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={placeholder}
                leftIcon={<Search size={16} />}
            />
        </div>

        <div className="flex bg-white dark:bg-white/5 p-1 rounded-lg border border-gray-200 dark:border-white/10">
            <button 
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-md transition-all ${viewMode === 'grid' ? 'bg-jambo-50 dark:bg-white/10 text-jambo-600 dark:text-jambo-400 shadow-sm' : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-200'}`}
                title="Grid View"
            >
                <LayoutGrid size={18} />
            </button>
            <button 
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded-md transition-all ${viewMode === 'list' ? 'bg-jambo-50 dark:bg-white/10 text-jambo-600 dark:text-jambo-400 shadow-sm' : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-200'}`}
                title="List View"
            >
                <List size={18} />
            </button>
        </div>
    </div>
  );
};
