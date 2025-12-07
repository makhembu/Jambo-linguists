
import React from 'react';
import { JobCategory, JobType } from '../../../../data/types';
import { LabeledInput } from './LabeledInput';
import { CustomSelect } from '../modal/CustomSelect';

interface CoreDetailsFormProps {
    formData: any;
    setFormData: (fn: (prev: any) => any) => void;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const categoryTypes: Record<JobCategory, JobType[]> = {
    'Interpreting': ['Face-to-Face', 'Video', 'Telephone'],
    'Translation': ['Document'],
    'Transcription': ['Audio/Video'],
};

export const CoreDetailsForm = ({ formData, setFormData, handleInputChange }: CoreDetailsFormProps) => {
    const categoryOptions = Object.keys(categoryTypes).map(cat => ({ value: cat, label: cat }));
    
    // Ensure type options are available for the current category
    const currentCategory = formData.category as JobCategory;
    const typeOptions = categoryTypes[currentCategory] ? categoryTypes[currentCategory].map(type => ({ value: type, label: type })) : [];
    
    return (
        <>
            <LabeledInput label="Job Title" required>
                <input name="title" value={formData.title} onChange={handleInputChange} placeholder="e.g., Medical Consultation Interpreting" required className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-4 py-2.5 text-sm dark:text-white focus:ring-2 focus:ring-jambo-500 outline-none" />
            </LabeledInput>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <LabeledInput label="Category" required>
                    <CustomSelect options={categoryOptions} value={formData.category!} onChange={(val) => setFormData(p => ({...p, category: val as JobCategory}))} />
                </LabeledInput>
                <LabeledInput label="Type" required>
                    <CustomSelect options={typeOptions} value={formData.type!} onChange={(val) => setFormData(p => ({...p, type: val as JobType}))} />
                </LabeledInput>
            </div>
            <LabeledInput label="Language Pair" required>
                <input name="languagePair" value={formData.languagePair} onChange={handleInputChange} placeholder="e.g., English <> Swahili" required className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-4 py-2.5 text-sm dark:text-white focus:ring-2 focus:ring-jambo-500 outline-none" />
            </LabeledInput>
            <LabeledInput label="Description">
                <textarea name="description" value={formData.description} onChange={handleInputChange} placeholder="Job Description & Requirements" rows={3} className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-4 py-2.5 text-sm dark:text-white focus:ring-2 focus:ring-jambo-500 outline-none"></textarea>
            </LabeledInput>
            <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 cursor-pointer"><input type="checkbox" name="isUrgent" checked={formData.isUrgent} onChange={handleInputChange} className="h-4 w-4 rounded text-jambo-600 focus:ring-jambo-500"/> Mark as Urgent</label>
        </>
    );
};
