
import React, { useState } from 'react';
import { Send, AlertTriangle } from 'lucide-react';
import { Button } from '../../../ui/Button';

interface AdminCompletionFormProps {
  onCancel: () => void;
  onSubmit: (notes: string) => void;
  isLoading: boolean;
}

export const AdminCompletionForm = ({ onCancel, onSubmit, isLoading }: AdminCompletionFormProps) => {
  const [notes, setNotes] = useState('');

  const handleSubmit = () => {
      onSubmit(notes);
  };

  return (
    <div className="bg-white dark:bg-[#1a1625] border border-red-200 dark:border-red-900/50 rounded-xl p-6 shadow-sm ring-1 ring-red-100 dark:ring-red-900/30 space-y-4">
        <div className="flex items-start gap-3">
            <div className="p-2 bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-400 rounded-lg shrink-0">
                <AlertTriangle size={20} />
            </div>
            <div>
                <h3 className="font-bold text-gray-900 dark:text-white">Admin Force Completion</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    You are overriding the normal workflow. This job will be reassigned to you and marked complete. 
                    <strong className="block mt-1 text-red-600 dark:text-red-400">The original linguist will NOT be invoiced for this job.</strong>
                </p>
            </div>
        </div>
        
        <div>
            <label className="text-xs font-bold text-gray-500 uppercase mb-2 block">Completion Notes</label>
            <textarea 
                className="w-full p-3 border border-gray-200 dark:border-white/10 rounded-lg text-sm focus:ring-2 focus:ring-red-500 outline-none bg-gray-50 dark:bg-black/20 text-gray-900 dark:text-white"
                placeholder="Enter details about how this job was completed internally..."
                rows={4}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
            ></textarea>
        </div>

        <div className="flex justify-end gap-3 pt-2">
            <Button variant="secondary" onClick={onCancel}>
                Cancel
            </Button>
            <Button 
                variant="danger" 
                onClick={handleSubmit} 
                isLoading={isLoading} 
                disabled={!notes}
            >
                <Send size={14} /> Confirm & Complete
            </Button>
        </div>
    </div>
  );
};
