import React, { useState, useEffect, useRef } from 'react';
import { Globe, ChevronDown } from 'lucide-react';

// Using a local CustomSelect component to avoid large-scale refactoring
// In a real-world scenario, this would be a shared UI component.
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
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 text-gray-800 font-medium focus:outline-none focus:border-jambo-600 focus:bg-white focus:ring-4 focus:ring-jambo-50 appearance-none cursor-pointer hover:border-jambo-300 transition-all flex justify-between items-center"
            >
                <span>{selectedLabel}</span>
                <ChevronDown size={16} className={`text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            {isOpen && (
                <div className="absolute top-full mt-2 w-full bg-white backdrop-blur-md rounded-xl shadow-2xl border border-gray-200 z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                    <ul className="max-h-60 overflow-y-auto custom-scrollbar p-2">
                        {options.map(opt => (
                            <li key={opt.value}>
                                <button
                                    onClick={() => handleSelect(opt.value)}
                                    className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                                        value === opt.value
                                            ? 'font-bold bg-jambo-50 text-jambo-700'
                                            : 'text-gray-800 hover:bg-jambo-50/50'
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


export const ProfileLanguageForm = () => {
  const [primaryLang, setPrimaryLang] = useState('English');
  const [targetLang, setTargetLang] = useState('Swahili');

  const primaryLangOptions = [
    { value: 'English', label: 'English' }
  ];

  const targetLangOptions = [
    { value: 'Swahili', label: 'Swahili' },
    { value: 'French', label: 'French' },
    { value: 'Arabic', label: 'Arabic' },
    { value: 'Somali', label: 'Somali' },
    { value: 'Lingala', label: 'Lingala' },
  ];
  
  return (
    <div className="p-8 md:p-10 border-b border-gray-100">
        <h3 className="text-xl font-bold text-jambo-950 flex items-center gap-3 mb-8">
          <div className="bg-brand-orange/10 p-2 rounded-lg">
            <Globe size={24} className="text-brand-orange" />
          </div>
          Language Pairs
        </h3>
        <div className="grid md:grid-cols-2 gap-8">
           <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">Primary Language</label>
              <CustomSelect
                options={primaryLangOptions}
                value={primaryLang}
                onChange={setPrimaryLang}
              />
           </div>
           <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">Target Language</label>
              <CustomSelect
                options={targetLangOptions}
                value={targetLang}
                onChange={setTargetLang}
              />
           </div>
        </div>
     </div>
  );
};