
import React, { useEffect, useState } from 'react';
import { PoundSterling, Navigation, Briefcase } from 'lucide-react';
import { Job } from '@/data/types';
import { calculateJobPayout } from '../../../portal/dashboard/jobs/job-helpers';

interface FinancialsFormProps {
  job: Job;
  isEditing: boolean;
  formData: Partial<Job>;
  setFormData: (data: Partial<Job>) => void;
}

const Field: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
    <div>
        <label className="text-[10px] font-bold text-gray-500 uppercase">{label}</label>
        <div className="mt-1">{children}</div>
    </div>
);

const Input = (props: React.InputHTMLAttributes<HTMLInputElement>) => (
    <input 
        {...props}
        className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-md px-2 py-1.5 text-sm font-mono text-gray-900 dark:text-white focus:outline-none focus:border-jambo-600 transition-colors"
    />
);

const ReadOnly = ({ value }: { value: string | number }) => (
    <div className="text-sm font-medium text-gray-800 dark:text-gray-200 py-1.5">{value}</div>
);

export const FinancialsForm = ({ job, isEditing, formData, setFormData }: FinancialsFormProps) => {
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const combinedJob = { ...job, ...formData };
    setTotal(calculateJobPayout(combinedJob));
  }, [formData, job]);

  const handleNumericChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value === '' ? undefined : parseFloat(value) });
  };
  
  const handlePenceInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const pence = parseFloat(value);
    setFormData({ ...formData, [name]: isNaN(pence) ? undefined : pence / 100 });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRateTypeChange = (isFixed: boolean) => {
      if (isFixed) {
          setFormData({ ...formData, wordRate: undefined });
      } else {
          setFormData({ ...formData, fixedRate: undefined });
      }
  };

  return (
    <div className="bg-white dark:bg-[#1a1625] rounded-xl p-5 border border-gray-200 dark:border-white/10 shadow-sm mt-6">
        <div className="flex items-center justify-between mb-4 border-b border-gray-100 dark:border-white/5 pb-2">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                <PoundSterling size={14} /> Logistics & Finance
            </h3>
            {isEditing && <span className="text-[10px] text-orange-500 font-bold bg-orange-50 dark:bg-orange-900/20 px-2 py-0.5 rounded">Editing Mode</span>}
        </div>

        {job.category === 'Interpreting' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 items-end">
                <Field label="Hourly Rate (£)">{isEditing ? <Input type="number" step="0.01" name="hourlyRate" value={formData.hourlyRate || ''} onChange={handleNumericChange} /> : <ReadOnly value={`£${job.hourlyRate?.toFixed(2) || '0.00'}`} />}</Field>
                {job.type === 'Face-to-Face' && <>
                    <Field label="Distance (mi)">{isEditing ? <Input type="number" name="distance" value={formData.distance || ''} onChange={handleNumericChange} /> : <ReadOnly value={`${job.distance || 0} mi`} />}</Field>
                    <Field label="Mileage Rate (£)">{isEditing ? <Input type="number" step="0.01" name="mileageRate" value={formData.mileageRate || ''} onChange={handleNumericChange} /> : <ReadOnly value={`£${job.mileageRate?.toFixed(2) || '0.00'}`} />}</Field>
                    <Field label="Travel Time (hrs)">{isEditing ? <Input type="number" step="0.1" name="travelHours" value={formData.travelHours || ''} onChange={handleNumericChange} /> : <ReadOnly value={`${job.travelHours || 0} hrs`} />}</Field>
                </>}
            </div>
        )}

        {job.category === 'Translation' && (
             <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                <Field label="Word Count">{isEditing ? <Input type="number" name="wordCount" value={formData.wordCount || ''} onChange={handleNumericChange} /> : <ReadOnly value={`${job.wordCount?.toLocaleString() || 0} words`} />}</Field>
                <div className="md:col-span-2">
                    {isEditing ? (
                        <div className="flex flex-col gap-4">
                            <div className="flex items-center gap-2 flex-1 w-full">
                                <input type="radio" id="rate_word" name="rateType" checked={!formData.fixedRate} onChange={() => handleRateTypeChange(false)} className="h-4 w-4 text-jambo-600 focus:ring-jambo-500 mt-4 sm:mt-0"/>
                                <label htmlFor="rate_word" className="text-sm flex-1 w-full">
                                    <Field label="Rate per Word (p)">
                                        <Input 
                                            type="number" 
                                            step="0.1" 
                                            name="wordRate" 
                                            value={formData.wordRate !== undefined ? (formData.wordRate * 100) : ''} 
                                            onChange={handlePenceInputChange} 
                                            disabled={!!formData.fixedRate} 
                                        />
                                    </Field>
                                </label>
                            </div>
                            
                            <div className="flex items-center gap-2 flex-1 w-full">
                                <input type="radio" id="rate_fixed" name="rateType" checked={!!formData.fixedRate} onChange={() => handleRateTypeChange(true)} className="h-4 w-4 text-jambo-600 focus:ring-jambo-500 mt-4 sm:mt-0"/>
                                <label htmlFor="rate_fixed" className="text-sm flex-1 w-full">
                                    <Field label="Fixed Total (£)">
                                        <Input type="number" step="10" name="fixedRate" value={formData.fixedRate || ''} onChange={handleNumericChange} disabled={!formData.fixedRate} />
                                    </Field>
                                </label>
                            </div>
                        </div>
                    ) : (
                        <Field label="Rate"><ReadOnly value={job.wordRate ? `${(job.wordRate * 100).toFixed(0)}p/word` : job.rate} /></Field>
                    )}
                </div>
             </div>
        )}
        
        {job.category === 'Transcription' && (
             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 items-end">
                <Field label="Audio Length">{isEditing ? <Input type="text" name="duration" value={formData.duration || ''} onChange={handleInputChange} /> : <ReadOnly value={job.duration || 'N/A'} />}</Field>
                <Field label="Rate per Minute (£)">{isEditing ? <Input type="number" step="0.01" name="minuteRate" value={formData.minuteRate || ''} onChange={handleNumericChange} /> : <ReadOnly value={`£${job.minuteRate?.toFixed(2) || '0.00'}`} />}</Field>
             </div>
        )}

        <div className="mt-4 pt-4 border-t border-gray-100 dark:border-white/5 flex justify-end">
            <div className="bg-gray-50 dark:bg-white/5 p-3 rounded-lg flex items-center gap-4">
                <span className="text-[10px] font-bold text-gray-400 uppercase">Est. Payout</span>
                <div className="text-xl font-bold text-jambo-600 dark:text-jambo-400 font-mono">
                    £{total.toFixed(2)}
                </div>
            </div>
        </div>
    </div>
  );
};
