import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';

interface CustomSelectOption {
    value: string;
    label: string;
}

interface CustomSelectProps {
    options: CustomSelectOption[];
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
}

export const CustomSelect = ({ options, value, onChange, placeholder = "Select an option" }: CustomSelectProps) => {
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
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
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
                className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-4 py-2.5 text-sm dark:text-white focus:ring-2 focus:ring-jambo-500 outline-none flex items-center justify-between text-left"
            >
                <span className="font-medium text-gray-800 dark:text-white">{selectedLabel}</span>
                <ChevronDown size={16} className={`text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            {isOpen && (
                <div className="absolute top-full mt-2 w-full bg-white/95 dark:bg-[#2a2438]/95 backdrop-blur-md rounded-xl shadow-2xl border border-gray-200 dark:border-white/10 z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                    <ul className="max-h-60 overflow-y-auto custom-scrollbar p-2">
                        {options.map(opt => (
                            <li key={opt.value}>
                                <button
                                    onClick={() => handleSelect(opt.value)}
                                    className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                                        value === opt.value
                                            ? 'font-bold bg-jambo-50 dark:bg-jambo-900/30 text-jambo-700 dark:text-jambo-300'
                                            : 'text-gray-800 dark:text-gray-200 hover:bg-jambo-50/50 dark:hover:bg-jambo-900/20'
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
