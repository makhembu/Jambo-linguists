import React, { useRef } from 'react';
import { Camera } from 'lucide-react';

interface ImageUploadFieldProps {
  label: string;
  previewUrl: string | null;
  onFileChange: (file: File) => void;
  icon: React.ReactNode;
}

export const ImageUploadField = ({ label, previewUrl, onFileChange, icon }: ImageUploadFieldProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onFileChange(e.target.files[0]);
    }
  };

  return (
    <div>
      <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide">{label}</label>
      <div className="mt-1.5 flex items-center gap-4">
        <div className="w-16 h-16 rounded-lg bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 flex items-center justify-center text-gray-400 overflow-hidden">
          {previewUrl ? (
            <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
          ) : (
            icon
          )}
        </div>
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="bg-white dark:bg-white/10 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-white/10 px-4 py-2 rounded-lg font-bold text-xs shadow-sm hover:bg-gray-50 dark:hover:bg-white/20 transition-colors"
        >
          <Camera size={14} className="inline mr-2" />
          Upload Image
        </button>
        <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileSelect} />
      </div>
    </div>
  );
};
