import React, { useState, useEffect, useRef } from 'react';
import { User as UserIcon, Globe, Briefcase, GraduationCap, Award, ChevronDown } from 'lucide-react';
import { User } from '../../../../../data/types';

// Using a local CustomSelect component to avoid large-scale refactoring
const CustomSelect: React.FC<{
    options: { value: string; label: string }[];
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
}> = ({ options, value, onChange, placeholder = "Select an option" }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const selectedLabel = options.find(opt => opt.value === value)?.label || placeholder;

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSelect = (newValue: string) => {
        onChange(newValue);
        setIsOpen(false);
    };

    return (
        <div ref={dropdownRef} className="relative w-full">
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-3 py-2 text-sm text-gray-900 dark:text-white focus:outline-none focus:border-brand-teal flex items-center justify-between"
            >
                <span>{selectedLabel}</span>
                <ChevronDown size={16} className={`text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            {isOpen && (
                <div className="absolute top-full mt-2 w-full bg-white dark:bg-[#2a2438] rounded-xl shadow-xl border border-gray-100 dark:border-white/10 z-20 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                    <ul className="max-h-60 overflow-y-auto custom-scrollbar p-1">
                        {options.map(opt => (
                            <li key={opt.value}>
                                <button
                                    onClick={() => handleSelect(opt.value)}
                                    className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                                        value === opt.value
                                            ? 'font-bold bg-jambo-50 dark:bg-jambo-900/30 text-jambo-700 dark:text-jambo-300'
                                            : 'text-gray-800 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-white/5'
                                    }`}
                                >
                                    {opt.label}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

interface ProfessionalDetailsProps {
  user: User;
  isEditing: boolean;
  formData: any;
  setFormData: (data: any) => void;
}

export const ProfessionalDetails = ({ user, isEditing, formData, setFormData }: ProfessionalDetailsProps) => {
  const roleOptions = [
      { value: 'linguist', label: 'Linguist' },
      { value: 'admin', label: 'Admin' },
      { value: 'client', label: 'Client' },
  ];
  
  return (
    <div className="bg-white dark:bg-[#1a1625] rounded-xl p-5 border border-gray-200 dark:border-white/10 shadow-sm">
        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100 dark:border-white/5 pb-3 mb-4">Professional Profile</h3>
        
        <div className="space-y-6">
            {/* System Role */}
            <div className="group">
                <div className="flex items-center gap-2 mb-1.5">
                    <UserIcon size={14} className="text-brand-teal" />
                    <label className="text-[10px] font-bold text-gray-500 uppercase">System Role</label>
                </div>
                {isEditing ? (
                    <CustomSelect
                        options={roleOptions}
                        value={formData.role}
                        onChange={(val) => setFormData({...formData, role: val})}
                    />
                ) : (
                    <div className="text-sm font-medium text-gray-800 dark:text-gray-200 capitalize">{user.role}</div>
                )}
            </div>

            {/* Languages */}
            <div>
                <div className="flex items-center gap-2 mb-2">
                    <Globe size={14} className="text-brand-teal" />
                    <label className="text-[10px] font-bold text-gray-500 uppercase">Languages</label>
                </div>
                <div className="flex flex-wrap gap-2">
                    {user.languages && user.languages.length > 0 ? (
                        user.languages.map(lang => (
                            <span key={lang} className="bg-teal-50 dark:bg-teal-900/20 border border-teal-100 dark:border-teal-800 px-3 py-1 rounded-full text-xs font-bold text-teal-700 dark:text-teal-300">
                                {lang}
                            </span>
                        ))
                    ) : (
                        <span className="text-sm text-gray-400 italic">No languages listed</span>
                    )}
                </div>
            </div>

            {/* Qualifications */}
            <div>
                <div className="flex items-center gap-2 mb-2">
                    <GraduationCap size={14} className="text-brand-teal" />
                    <label className="text-[10px] font-bold text-gray-500 uppercase">Qualifications</label>
                </div>
                <div className="flex flex-wrap gap-2">
                    {user.qualifications && user.qualifications.length > 0 ? (
                        user.qualifications.map(qual => (
                            <span key={qual} className="bg-gray-100 dark:bg-white/10 px-3 py-1 rounded-full text-xs font-bold text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-white/10 flex items-center gap-1">
                                <Award size={10} className="text-orange-500" /> {qual}
                            </span>
                        ))
                    ) : (
                        <span className="text-sm text-gray-400 italic">No qualifications listed</span>
                    )}
                </div>
            </div>
        </div>
    </div>
  );
};