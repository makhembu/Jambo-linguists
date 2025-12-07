
import React from 'react';
import { Lock } from 'lucide-react';
import { LinguistSelector } from './LinguistSelector';
import { User } from '@/data/types';

interface LinguistAssignmentProps {
  linguist: User | null | undefined;
  allLinguists: User[];
  isLocked: boolean;
  onAssign: (id: string | null) => void;
}

export const LinguistAssignment = ({ linguist, allLinguists, isLocked, onAssign }: LinguistAssignmentProps) => {
  return (
    <div className="space-y-1">
        <span className="text-xs font-bold uppercase text-gray-500 flex items-center gap-2">
            Assigned Linguist
            {isLocked && <Lock size={12} className="text-gray-400" />}
        </span>
        <LinguistSelector 
            allLinguists={allLinguists}
            currentLinguist={linguist}
            onSelect={onAssign}
            disabled={isLocked}
        />
    </div>
  );
};
