
import React from 'react';
import { LabeledInput } from './LabeledInput';

interface FinancialsFormProps {
    formData: any;
    handleNumericChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handlePenceInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const FinancialsForm = ({ formData, handleNumericChange, handlePenceInputChange, handleInputChange }: FinancialsFormProps) => {
    return (
        <>
            {formData.category === 'Interpreting' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                     <LabeledInput label="Hourly Rate (£)"><input type="number" name="hourlyRate" value={formData.hourlyRate || ''} onChange={handleNumericChange} className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-4 py-2.5 text-sm dark:text-white focus:ring-2 focus:ring-jambo-500 outline-none" /></LabeledInput>
                    {formData.type === 'Face-to-Face' && <>
                        <LabeledInput label="Distance (mi)"><input type="number" name="distance" value={formData.distance || ''} onChange={handleNumericChange} className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-4 py-2.5 text-sm dark:text-white focus:ring-2 focus:ring-jambo-500 outline-none" /></LabeledInput>
                        <LabeledInput label="Mileage Rate (£)"><input type="number" step="0.01" name="mileageRate" value={formData.mileageRate || ''} onChange={handleNumericChange} className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-4 py-2.5 text-sm dark:text-white focus:ring-2 focus:ring-jambo-500 outline-none" /></LabeledInput>
                        <LabeledInput label="Travel Time (hrs)"><input type="number" step="0.1" name="travelHours" value={formData.travelHours || ''} onChange={handleNumericChange} className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-4 py-2.5 text-sm dark:text-white focus:ring-2 focus:ring-jambo-500 outline-none" /></LabeledInput>
                    </>}
                </div>
            )}
            {formData.category === 'Translation' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <LabeledInput label="Word Count"><input type="number" name="wordCount" value={formData.wordCount || ''} onChange={handleNumericChange} className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-4 py-2.5 text-sm dark:text-white focus:ring-2 focus:ring-jambo-500 outline-none" /></LabeledInput>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 border border-gray-200 dark:border-white/10 rounded-lg p-2 bg-gray-50 dark:bg-white/5">
                        <LabeledInput label="Rate/Word (p)"><input type="number" step="0.1" name="wordRate" value={formData.wordRate !== undefined ? (formData.wordRate * 100) : ''} onChange={handlePenceInputChange} placeholder="10" className="w-full bg-white dark:bg-black/10 border-none rounded-md px-2 py-1 text-sm dark:text-white focus:ring-2 focus:ring-jambo-500 outline-none" /></LabeledInput>
                        <LabeledInput label="Fixed Rate (£)"><input type="number" step="10" name="fixedRate" value={formData.fixedRate || ''} onChange={handleNumericChange} placeholder="500" className="w-full bg-white dark:bg-black/10 border-none rounded-md px-2 py-1 text-sm dark:text-white focus:ring-2 focus:ring-jambo-500 outline-none" /></LabeledInput>
                    </div>
                </div>
            )}
            {formData.category === 'Transcription' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <LabeledInput label="Audio/Video Length (mins)"><input type="text" name="duration" value={formData.duration || ''} onChange={handleInputChange} placeholder="e.g. 45" className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-4 py-2.5 text-sm dark:text-white focus:ring-2 focus:ring-jambo-500 outline-none" /></LabeledInput>
                    <LabeledInput label="Rate Per Minute (£)"><input type="number" step="0.1" name="minuteRate" value={formData.minuteRate || ''} onChange={handleNumericChange} placeholder="4.50" className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-4 py-2.5 text-sm dark:text-white focus:ring-2 focus:ring-jambo-500 outline-none" /></LabeledInput>
                </div>
            )}
        </>
    )
}
