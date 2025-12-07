
import React from 'react';
import { AlertCircle, FileText, Upload } from 'lucide-react';

interface CompletionFormProps {
  completionNotes: string;
  setCompletionNotes: (notes: string) => void;
  completionFile: string | null;
  handleFileSelect: () => void;
}

export const CompletionForm = ({ completionNotes, setCompletionNotes, completionFile, handleFileSelect }: CompletionFormProps) => {
  return (
    <div className="p-4 md:p-8 space-y-6 animate-in slide-in-from-right-8 duration-300">
      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 flex gap-3 text-yellow-800 text-xs md:text-sm">
        <AlertCircle size={20} className="shrink-0" />
        <p>Please ensure all deliverables are correct. Once submitted, the job status will be updated to Completed and cannot be reverted.</p>
      </div>

      <div className="space-y-4 md:space-y-6">
        <div className="space-y-2">
          <label className="text-xs md:text-sm font-bold text-gray-700 uppercase tracking-wide">Completion Notes / Summary *</label>
          <textarea 
            value={completionNotes}
            onChange={(e) => setCompletionNotes(e.target.value)}
            placeholder="Describe the work done, duration confirmation, or any issues encountered..."
            rows={4}
            className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 md:p-4 focus:outline-none focus:border-jambo-600 focus:ring-4 focus:ring-jambo-50 transition-all resize-none text-sm md:text-base"
          ></textarea>
        </div>

        <div className="space-y-2">
          <label className="text-xs md:text-sm font-bold text-gray-700 uppercase tracking-wide">Upload Proof / Deliverable</label>
          <div 
            onClick={handleFileSelect}
            className={`border-2 border-dashed rounded-xl p-6 md:p-8 flex flex-col items-center justify-center gap-2 cursor-pointer transition-colors ${completionFile ? 'border-jambo-600 bg-jambo-50' : 'border-gray-300 hover:border-jambo-400 hover:bg-gray-50'}`}
          >
            {completionFile ? (
              <>
                <div className="w-10 h-10 md:w-12 md:h-12 bg-jambo-600 text-white rounded-full flex items-center justify-center">
                  <FileText size={20} className="md:w-6 md:h-6" />
                </div>
                <p className="font-bold text-jambo-700 text-center text-sm md:text-base break-all">{completionFile}</p>
                <p className="text-xs text-gray-500">Click to change file</p>
              </>
            ) : (
              <>
                <Upload size={24} className="text-gray-400 md:w-8 md:h-8" />
                <p className="font-medium text-gray-600 text-sm md:text-base text-center">Tap to upload file</p>
                <p className="text-[10px] md:text-xs text-gray-400">PDF, DOCX, MP3 (Max 10MB)</p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
