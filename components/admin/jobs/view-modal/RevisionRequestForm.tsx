
import React, { useState } from 'react';
import { Send, Paperclip, X } from 'lucide-react';
import { Button } from '../../../ui/Button';

interface RevisionRequestFormProps {
  onCancel: () => void;
  onSubmit: (feedback: string, file: File | null) => void;
  isLoading: boolean;
}

export const RevisionRequestForm = ({ onCancel, onSubmit, isLoading }: RevisionRequestFormProps) => {
  const [feedback, setFeedback] = useState('');
  const [revisionFile, setRevisionFile] = useState<File | null>(null);

  const handleSubmit = () => {
      onSubmit(feedback, revisionFile);
  };

  return (
    <div className="space-y-3 mt-4 bg-orange-50 dark:bg-orange-900/10 p-4 rounded-lg border border-orange-100 dark:border-orange-800 animate-in fade-in slide-in-from-top-2">
        <h4 className="text-xs font-bold text-orange-800 dark:text-orange-200 uppercase">Revision Details</h4>
        <textarea 
            className="w-full p-3 border border-gray-200 dark:border-white/10 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 outline-none bg-white dark:bg-black/20 text-gray-900 dark:text-white"
            placeholder="Enter feedback for revision..."
            rows={3}
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
        ></textarea>
        
        <div className="flex items-center gap-2">
            <label className="flex items-center gap-2 text-xs font-bold text-gray-500 dark:text-gray-400 cursor-pointer hover:text-orange-600 transition-colors bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 px-3 py-2 rounded-lg">
                <Paperclip size={14} />
                <span className="truncate max-w-[150px]">{revisionFile ? revisionFile.name : "Attach Markup (Optional)"}</span>
                <input type="file" className="hidden" onChange={(e) => setRevisionFile(e.target.files?.[0] || null)} />
            </label>
            {revisionFile && <button onClick={() => setRevisionFile(null)} className="text-red-500 hover:text-red-600"><X size={14}/></button>}
        </div>

        <div className="flex gap-3 pt-2">
            <Button variant="secondary" onClick={onCancel} className="flex-1">
                Cancel
            </Button>
            <Button 
                variant="danger" 
                onClick={handleSubmit} 
                isLoading={isLoading} 
                disabled={!feedback}
                className="flex-1"
            >
                <Send size={14} /> Send
            </Button>
        </div>
    </div>
  );
};
