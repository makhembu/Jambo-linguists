
import React, { useState, useEffect } from 'react';
import { Briefcase, Calendar, FileText, PoundSterling, Save } from 'lucide-react';
import { Job } from '../../../../../data/types';
import { calculateJobPayout } from '../../../portal/dashboard/jobs/job-helpers';
import { Button } from '../../../ui/Button';
import { Fieldset } from '../add-job/Fieldset';
import { CoreDetailsForm } from '../add-job/CoreDetailsForm';
import { LogisticsForm } from '../add-job/LogisticsForm';
import { DocumentsForm } from '../add-job/DocumentsForm';
import { FinancialsForm } from './FinancialsForm';

interface AdminJobEditFormProps {
  job: Job;
  onSave: (updatedData: Partial<Job>, newFiles: File[], keptAttachments: any[]) => void;
  onCancel: () => void;
  isSaving: boolean;
}

export const AdminJobEditForm = ({ job, onSave, onCancel, isSaving }: AdminJobEditFormProps) => {
  // --- Local Form State ---
  const [formData, setFormData] = useState<Partial<Job>>({});
  const [newFiles, setNewFiles] = useState<File[]>([]);
  const [keptAttachments, setKeptAttachments] = useState<any[]>([]);
  const [estimatedTotal, setEstimatedTotal] = useState(0);

  // Initialize state from prop
  useEffect(() => {
    setFormData({ ...job });
    setNewFiles([]);
    setKeptAttachments(job.attachments || []);
  }, [job]);

  // Recalculate financial totals dynamically
  useEffect(() => {
    const tempJob = { ...job, ...formData } as Job;
    setEstimatedTotal(calculateJobPayout(tempJob));
  }, [formData, job]);

  // --- Handlers ---

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
        const { checked } = e.target as HTMLInputElement;
        setFormData(prev => ({...prev, [name]: checked }));
    } else {
        setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
        setNewFiles(prev => [...prev, ...Array.from(event.target.files!)]);
    }
  };

  const handleRemoveNewFile = (index: number) => {
    setNewFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
      // Inject calculated rate string before saving
      const finalData = {
          ...formData,
          rate: `£${estimatedTotal.toFixed(2)}`
      };
      onSave(finalData, newFiles, keptAttachments);
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
        <div className="bg-orange-50 dark:bg-orange-900/10 p-3 rounded-lg border border-orange-100 dark:border-orange-800 text-xs text-orange-800 dark:text-orange-200">
            <strong>Editing Mode:</strong> Changes will be logged in the audit trail.
        </div>

        <Fieldset title="Core Details" icon={Briefcase}>
            <CoreDetailsForm 
                formData={formData} 
                setFormData={setFormData} 
                handleInputChange={handleInputChange} 
            />
        </Fieldset>
        
        <Fieldset title="Logistics & Schedule" icon={Calendar}>
            <LogisticsForm 
                formData={formData} 
                handleInputChange={handleInputChange} 
            />
        </Fieldset>

        <Fieldset title="Job Documents" icon={FileText}>
            {keptAttachments.length > 0 && (
                <div className="mb-4">
                    <p className="text-xs font-bold text-gray-400 uppercase mb-2">Current Attachments</p>
                    <div className="space-y-2">
                        {keptAttachments.map((f, i) => (
                            <div key={i} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-white/5 rounded-lg border border-gray-200 dark:border-white/10">
                                <div className="flex items-center gap-2 overflow-hidden">
                                    <FileText size={14} className="text-jambo-600 dark:text-jambo-400 shrink-0" />
                                    <span className="text-sm text-gray-600 dark:text-gray-300 truncate">{f.name}</span>
                                </div>
                                <button 
                                    type="button"
                                    onClick={() => setKeptAttachments(prev => prev.filter((_, idx) => idx !== i))}
                                    className="text-gray-400 hover:text-red-500 p-1 transition-colors"
                                >
                                    &times;
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}
            <p className="text-xs font-bold text-gray-400 uppercase mb-2">Add New Files</p>
            <DocumentsForm 
                files={newFiles} 
                onFileChange={handleFileChange} 
                onRemoveFile={handleRemoveNewFile} 
            />
        </Fieldset>

        <Fieldset title="Financials" icon={PoundSterling}>
            <FinancialsForm 
                job={job}
                isEditing={true}
                formData={formData} 
                setFormData={setFormData}
            />
        </Fieldset>

        <div className="flex gap-3 pt-4 border-t border-gray-200 dark:border-white/10 sticky bottom-0 bg-white dark:bg-[#1a1625] pb-2 z-10">
            <Button variant="secondary" onClick={onCancel} className="flex-1">
                Cancel
            </Button>
            <Button variant="primary" onClick={handleSubmit} isLoading={isSaving} className="flex-[2]">
                <Save size={16} /> Save Changes
            </Button>
        </div>
    </div>
  );
};
