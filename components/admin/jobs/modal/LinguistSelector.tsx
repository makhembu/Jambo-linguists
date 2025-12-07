
import React, { useState, useEffect, useRef } from 'react';
import { User as UserType } from '@/data/types';
import { ChevronDown, Search, X } from 'lucide-react';

export const LinguistSelector = ({ allLinguists, currentLinguist, onSelect, disabled }: { allLinguists: UserType[], currentLinguist: UserType | null | undefined, onSelect: (userId: string | null) => void, disabled?: boolean }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const filteredLinguists = allLinguists.filter(u =>
        u.id !== currentLinguist?.id && (
            `${u.firstName} ${u.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (u.location && u.location.toLowerCase().includes(searchTerm.toLowerCase()))
        )
    );

    const handleSelect = (userId: string | null) => {
        onSelect(userId);
        setIsOpen(false);
        setSearchTerm('');
    };

    const initials = (name: string) => name.split(' ').map(n => n[0]).join('');

    return (
        <div ref={dropdownRef} className="relative w-full">
            <button
                type="button"
                onClick={() => !disabled && setIsOpen(!isOpen)}
                disabled={disabled}
                className={`w-full border rounded-lg p-2 text-sm flex items-center justify-between transition-all 
                    ${disabled 
                        ? 'bg-gray-100 dark:bg-white/5 border-gray-200 dark:border-white/10 text-gray-400 cursor-not-allowed' 
                        : 'bg-gray-50 dark:bg-white/5 border-gray-200 dark:border-white/10 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-jambo-600 hover:border-jambo-300'
                    }`}
            >
                {currentLinguist ? (
                    <div className={`flex items-center gap-2 ${disabled ? 'opacity-70' : ''}`}>
                        <div className="w-6 h-6 rounded-full bg-jambo-100 dark:bg-jambo-900 text-jambo-700 dark:text-jambo-300 flex items-center justify-center text-[10px] font-bold overflow-hidden">
                            {currentLinguist.avatarUrl ? <img src={currentLinguist.avatarUrl} className="w-full h-full object-cover"/> : initials(`${currentLinguist.firstName} ${currentLinguist.lastName}`)}
                        </div>
                        <span className="font-medium">{currentLinguist.firstName} {currentLinguist.lastName}</span>
                    </div>
                ) : (
                    <span className="text-gray-400">Select a linguist...</span>
                )}
                {!disabled && <ChevronDown size={16} className={`text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />}
            </button>
            
            {isOpen && !disabled && (
                <div className="absolute top-full mt-2 w-full bg-white/90 dark:bg-[#2a2438]/90 backdrop-blur-md rounded-xl shadow-2xl border border-gray-200 dark:border-white/10 z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="p-2 border-b border-gray-100 dark:border-white/10">
                        <div className="relative">
                            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input 
                                type="text"
                                placeholder="Search by name or location..."
                                value={searchTerm}
                                autoFocus
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full bg-gray-100 dark:bg-white/5 border-none rounded-md pl-9 pr-4 py-2 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-jambo-500"
                            />
                        </div>
                    </div>
                    <ul className="max-h-60 overflow-y-auto custom-scrollbar p-2">
                        <li>
                            <button onClick={() => handleSelect(null)} className="w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                                <X size={16} /> Unassign / Clear
                            </button>
                        </li>
                        {filteredLinguists.length > 0 ? filteredLinguists.map(u => (
                            <li key={u.id}>
                                <button onClick={() => handleSelect(u.id)} className="w-full flex items-center gap-3 px-3 py-2 rounded-md hover:bg-jambo-50 dark:hover:bg-jambo-900/30 transition-colors text-left">
                                    <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-white/10 flex items-center justify-center text-xs font-bold text-gray-500 overflow-hidden shrink-0">
                                        {u.avatarUrl ? <img src={u.avatarUrl} className="w-full h-full object-cover"/> : initials(`${u.firstName} ${u.lastName}`)}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="font-bold text-gray-900 dark:text-white truncate">{u.firstName} {u.lastName}</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{u.location}</p>
                                    </div>
                                </button>
                            </li>
                        )) : (
                            <li className="px-3 py-4 text-center text-sm text-gray-400 dark:text-gray-500">No linguists found.</li>
                        )}
                    </ul>
                </div>
            )}
        </div>
    );
};
