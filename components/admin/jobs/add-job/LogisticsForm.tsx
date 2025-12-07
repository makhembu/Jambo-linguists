
import React from 'react';
import { LabeledInput } from './LabeledInput';

interface LogisticsFormProps {
    formData: any;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const LogisticsForm = ({ formData, handleInputChange }: LogisticsFormProps) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <LabeledInput label="Date" required>
                <input type="date" name="date" value={formData.date} onChange={handleInputChange} required className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-4 py-2.5 text-sm dark:text-white focus:ring-2 focus:ring-jambo-500 outline-none" />
            </LabeledInput>
            {formData.category === 'Interpreting' ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <LabeledInput label="Start Time"><input type="time" name="time" value={formData.time} onChange={handleInputChange} className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-4 py-2.5 text-sm dark:text-white focus:ring-2 focus:ring-jambo-500 outline-none" /></LabeledInput>
                    <LabeledInput label="Duration"><input type="text" name="duration" value={formData.duration || ''} onChange={handleInputChange} placeholder="e.g. 2h 30m" className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-4 py-2.5 text-sm dark:text-white focus:ring-2 focus:ring-jambo-500 outline-none" /></LabeledInput>
                </div>
            ) : (
                <LabeledInput label="Deadline Time" name="deadlineTime">
                    <input type="time" name="deadlineTime" value={formData.deadlineTime || ''} onChange={handleInputChange} className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-4 py-2.5 text-sm dark:text-white focus:ring-2 focus:ring-jambo-500 outline-none" />
                </LabeledInput>
            )}
             <div className="md:col-span-2">
                <LabeledInput label="Location / Context" required>
                    <input name="location" value={formData.location} onChange={handleInputChange} placeholder={formData.type === 'Face-to-Face' ? 'Full Address' : 'e.g. Remote, Zoom Call'} required className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-4 py-2.5 text-sm dark:text-white focus:ring-2 focus:ring-jambo-500 outline-none" />
                </LabeledInput>
            </div>
        </div>
    )
}