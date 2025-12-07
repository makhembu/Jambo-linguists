
import React from 'react';
import { UploadCloud, FileText, X } from 'lucide-react';

interface DocumentsFormProps {
    files: File[];
    onFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onRemoveFile: (index: number) => void;
}

export const DocumentsForm = ({ files, onFileChange, onRemoveFile }: DocumentsFormProps) => {
    return (
        <div className="space-y-3">
            <div className="border-2 border-dashed border-gray-300 dark:border-white/20 rounded-xl p-6 text-center cursor-pointer hover:border-jambo-500 hover:bg-jambo-50/50 dark:hover:bg-jambo-900/10 transition-colors relative">
                <input type="file" multiple onChange={onFileChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                <div className="flex flex-col items-center">
                    <UploadCloud size={24} className="text-gray-400 mb-2" />
                    <p className="font-medium text-gray-600 dark:text-gray-300 text-sm">Click to upload or drag & drop</p>
                    <p className="text-xs text-gray-400">PDF, DOCX, etc. (Max 10MB each)</p>
                </div>
            </div>
            {files.length > 0 && (
                <div className="space-y-2">
                    {files.map((file, index) => (
                        <div key={index} className="flex items-center gap-3 p-2 bg-gray-50 dark:bg-white/5 rounded-lg border border-gray-200 dark:border-white/10">
                            <FileText size={16} className="text-jambo-600 dark:text-jambo-400 shrink-0" />
                            <span className="text-xs font-medium text-gray-800 dark:text-gray-200 truncate flex-1">{file.name}</span>
                            <span className="text-xs text-gray-400 shrink-0">{(file.size / 1024).toFixed(1)} KB</span>
                            <button type="button" onClick={() => onRemoveFile(index)} className="p-1 text-gray-400 hover:text-red-500 dark:hover:text-red-400 shrink-0"><X size={14} /></button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
};
