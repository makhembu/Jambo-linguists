
import React, { useState, useEffect, useMemo } from 'react';
import { X, Plus, Loader2, Briefcase, Calendar, PoundSterling, User, FileText } from 'lucide-react';
import { mockDb, Job } from '@/data/mockDatabase';
import { calculateJobPayout } from '../../portal/dashboard/jobs/job-helpers';
import { Fieldset } from './add-job/Fieldset';
import { CoreDetailsForm } from './add-job/CoreDetailsForm';
import { LogisticsForm } from './add-job/LogisticsForm';
import { DocumentsForm } from './add-job/DocumentsForm';
import { FinancialsForm } from './add-job/FinancialsForm';
import { AssignmentForm } from './add-job/AssignmentForm';
import { Modal } from '../../ui/Modal';

interface AddJobModalProps {
  onClose: () => void;
  onJobAdded: (newJob: Job) => void;
}

export const AddJobModal = ({ onClose, onJobAdded }: AddJobModalProps) => {
    const [loading, setLoading] = useState(false);
    const [assignmentType, setAssignmentType] = useState<'open' | 'assigned'>('open');
    const [files, setFiles] = useState<File[]>([]);
    const [estimatedTotal, setEstimatedTotal] = useState(0);
    const currentUser = mockDb.auth.getCurrentUser();

    const [formData, setFormData] = useState<Partial<Job>>({
        title: '',
        category: 'Interpreting',
        type: 'Face-to-Face',
        languagePair: 'English <> Swahili',
        date: new Date().toISOString().split('T')[0],
        time: '09:00',
        location: '',
        description: '',
        isUrgent: false,
        linguistId: null,
        postedBy: currentUser?.id, // Set current user as poster
        rate: '',
        hourlyRate: 30,
        mileageRate: 0.45,
        wordRate: 0.10,
        minuteRate: 4.50,
    });
    
    const allLinguists = useMemo(() => mockDb.getAllUsers().filter(u => u.role === 'linguist' && u.isVerified && !u.isSuspended), []);

    useEffect(() => {
        const jobForCalc: Job = {
            id: '', status: 'Open', title: '', description: '', date: '', location: '', languagePair: '', rate: '', isUrgent: false,
            history: [],
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            deletedAt: null,
            ...formData,
            category: formData.category || 'Interpreting',
            type: formData.type || 'Face-to-Face',
        };
        setEstimatedTotal(calculateJobPayout(jobForCalc));
    }, [formData]);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setFiles(prev => [...prev, ...Array.from(event.target.files!)]);
        }
    };

    const handleRemoveFile = (index: number) => {
        setFiles(prev => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        const attachments = files.map(file => ({ name: file.name, type: 'file' as const, url: '#' }));
        const finalData = {
            ...formData, 
            rate: `£${estimatedTotal.toFixed(2)}`,
            postedBy: currentUser?.id // Ensure postedBy is set even if state was reset
        };
        setTimeout(() => {
            const newJob = mockDb.adminCreateJob({ ...finalData, attachments });
            setLoading(false);
            onJobAdded(newJob);
        }, 1000);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        if (type === 'checkbox') {
            const { checked } = e.target as HTMLInputElement;
            setFormData(prev => ({...prev, [name]: checked }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleNumericChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value === '' ? undefined : parseFloat(value) }));
    };

    const handlePenceInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const pence = parseFloat(value);
        setFormData(prev => ({ ...prev, [name]: isNaN(pence) ? undefined : pence / 100 }));
    };
    
    return (
        <Modal isOpen={true} onClose={onClose} size="3xl">
            <header className="p-6 border-b border-gray-100 dark:border-white/5 flex justify-between items-center bg-gray-50/50 dark:bg-white/5">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                    <Plus className="text-jambo-600 dark:text-jambo-400" size={24} /> Create New Job
                </h2>
                <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-white transition-colors"><X size={20} /></button>
            </header>

            <div className="p-6 overflow-y-auto custom-scrollbar">
                <form id="addJobForm" onSubmit={handleSubmit} className="space-y-6">
                    <Fieldset title="Core Details" icon={Briefcase}>
                        <CoreDetailsForm formData={formData} setFormData={setFormData} handleInputChange={handleInputChange} />
                    </Fieldset>
                    
                    <Fieldset title="Logistics & Schedule" icon={Calendar}>
                            <LogisticsForm formData={formData} handleInputChange={handleInputChange} />
                    </Fieldset>

                    <Fieldset title="Job Documents" icon={FileText}>
                        <DocumentsForm files={files} onFileChange={handleFileChange} onRemoveFile={handleRemoveFile} />
                    </Fieldset>

                    <Fieldset title="Financials" icon={PoundSterling}>
                        <FinancialsForm formData={formData} handleNumericChange={handleNumericChange} handlePenceInputChange={handlePenceInputChange} handleInputChange={handleInputChange} />
                    </Fieldset>
                    
                    <Fieldset title="Assignment" icon={User}>
                        <AssignmentForm assignmentType={assignmentType} setAssignmentType={setAssignmentType} formData={formData} setFormData={setFormData} allLinguists={allLinguists} />
                    </Fieldset>
                </form>
            </div>
            
            <footer className="p-6 border-t border-gray-100 dark:border-white/5 bg-gray-50 dark:bg-white/5 flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="w-full sm:w-auto text-center sm:text-left">
                    <span className="text-xs font-bold text-gray-400 uppercase">Est. Total Payout</span>
                    <p className="text-2xl font-bold text-jambo-600 dark:text-jambo-400 font-mono">
                        £{estimatedTotal.toFixed(2)}
                    </p>
                </div>
                <div className="flex gap-3 w-full sm:w-auto">
                    <button type="button" onClick={onClose} disabled={loading} className="flex-1 sm:flex-none px-6 py-2.5 rounded-lg border border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-300 font-bold text-sm hover:bg-white dark:hover:bg-white/5 transition-colors disabled:opacity-50">Cancel</button>
                    <button form="addJobForm" type="submit" disabled={loading} className="flex-1 sm:flex-none justify-center px-6 py-2.5 rounded-lg bg-jambo-600 hover:bg-jambo-700 text-white font-bold text-sm shadow-lg flex items-center gap-2 transition-all disabled:opacity-70">
                        {loading ? <Loader2 size={16} className="animate-spin" /> : <Plus size={18} />}
                        {loading ? 'Creating Job...' : 'Create Job'}
                    </button>
                </div>
            </footer>
        </Modal>
    );
};