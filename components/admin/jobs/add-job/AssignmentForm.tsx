
import React, { useMemo } from 'react';
import { User as UserIcon, Globe } from 'lucide-react';
import { User } from '../../../../data/types';
import { LinguistSelector } from '../modal/LinguistSelector';

interface AssignmentFormProps {
    assignmentType: 'open' | 'assigned';
    setAssignmentType: (type: 'open' | 'assigned') => void;
    formData: any;
    setFormData: (fn: (prev: any) => any) => void;
    allLinguists: User[];
}

export const AssignmentForm = ({ assignmentType, setAssignmentType, formData, setFormData, allLinguists }: AssignmentFormProps) => {
    const currentLinguist = useMemo(() => allLinguists.find(u => u.id === formData.linguistId), [formData.linguistId, allLinguists]);

    return (
        <>
            <div className="flex gap-2 rounded-lg bg-gray-100 dark:bg-white/5 p-1">
                <button type="button" onClick={() => { setAssignmentType('open'); setFormData(prev => ({...prev, linguistId: null})); }} className={`flex-1 py-2 text-sm font-bold rounded-md transition-colors flex items-center justify-center gap-2 ${assignmentType === 'open' ? 'bg-white dark:bg-jambo-900/50 shadow text-jambo-700 dark:text-white' : 'text-gray-500 hover:bg-white/50 dark:hover:bg-black/10'}`}>
                    <Globe size={14} /> Open Marketplace
                </button>
                <button type="button" onClick={() => setAssignmentType('assigned')} className={`flex-1 py-2 text-sm font-bold rounded-md transition-colors flex items-center justify-center gap-2 ${assignmentType === 'assigned' ? 'bg-white dark:bg-jambo-900/50 shadow text-jambo-700 dark:text-white' : 'text-gray-500 hover:bg-white/50 dark:hover:bg-black/10'}`}>
                    <UserIcon size={14} /> Assign Linguist
                </button>
            </div>
             {assignmentType === 'assigned' && (
                <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                   <LinguistSelector
                        allLinguists={allLinguists}
                        currentLinguist={currentLinguist}
                        onSelect={(userId) => setFormData(prev => ({...prev, linguistId: userId }))}
                   />
                </div>
            )}
        </>
    )
}
