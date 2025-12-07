
import React from 'react';
import { User } from '../../../../../data/types';
import { CustomSelect } from '../../jobs/modal/CustomSelect';

interface RecipientSectionProps {
  recipientType: 'existing' | 'custom';
  setRecipientType: (type: 'existing' | 'custom') => void;
  selectedUserId: string;
  setSelectedUserId: (id: string) => void;
  customRecipient: { name: string; email: string; address: string };
  setCustomRecipient: (data: { name: string; email: string; address: string }) => void;
  allUsers: User[];
}

export const RecipientSection = ({ 
  recipientType, setRecipientType, 
  selectedUserId, setSelectedUserId, 
  customRecipient, setCustomRecipient, 
  allUsers 
}: RecipientSectionProps) => {
  
  const userOptions = allUsers.map(u => ({
      value: u.id,
      label: `${u.firstName} ${u.lastName} (${u.role})`
  }));

  return (
    <div className="bg-white dark:bg-[#13111c] p-5 rounded-xl border border-gray-200 dark:border-white/10 shadow-sm">
        <div className="flex gap-4 mb-4 border-b border-gray-100 dark:border-white/5 pb-2">
            <button 
                onClick={() => setRecipientType('existing')}
                className={`text-sm font-bold pb-2 border-b-2 transition-colors ${recipientType === 'existing' ? 'text-jambo-600 border-jambo-600' : 'text-gray-500 border-transparent hover:text-gray-700'}`}
            >
                Existing User
            </button>
            <button 
                onClick={() => setRecipientType('custom')}
                className={`text-sm font-bold pb-2 border-b-2 transition-colors ${recipientType === 'custom' ? 'text-jambo-600 border-jambo-600' : 'text-gray-500 border-transparent hover:text-gray-700'}`}
            >
                Custom Details
            </button>
        </div>

        {recipientType === 'existing' ? (
            <div className="space-y-3">
                <label className="text-xs font-bold text-gray-500 uppercase">Select User</label>
                <CustomSelect 
                    options={userOptions}
                    value={selectedUserId}
                    onChange={setSelectedUserId}
                    placeholder="-- Choose User --"
                />
            </div>
        ) : (
            <div className="space-y-3">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="text-xs font-bold text-gray-500 uppercase mb-1 block">Full Name</label>
                        <input 
                            className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-3 py-2 text-sm dark:text-white"
                            value={customRecipient.name}
                            onChange={(e) => setCustomRecipient({...customRecipient, name: e.target.value})}
                            placeholder="Client Name"
                        />
                    </div>
                    <div>
                        <label className="text-xs font-bold text-gray-500 uppercase mb-1 block">Email</label>
                        <input 
                            className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-3 py-2 text-sm dark:text-white"
                            value={customRecipient.email}
                            onChange={(e) => setCustomRecipient({...customRecipient, email: e.target.value})}
                            placeholder="client@example.com"
                        />
                    </div>
                </div>
                <div>
                    <label className="text-xs font-bold text-gray-500 uppercase mb-1 block">Address</label>
                    <input 
                        className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-3 py-2 text-sm dark:text-white"
                        value={customRecipient.address}
                        onChange={(e) => setCustomRecipient({...customRecipient, address: e.target.value})}
                        placeholder="Full Billing Address"
                    />
                </div>
            </div>
        )}
    </div>
  );
};
