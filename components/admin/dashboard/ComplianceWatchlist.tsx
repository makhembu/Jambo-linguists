
import React from 'react';
import { ShieldAlert, Mail, CheckCircle, AlertTriangle } from 'lucide-react';
import { User } from '@/data/types';

export const ComplianceWatchlist = ({ users }: { users: User[] }) => {
  const pendingUsers = users.filter(u => !u.isVerified && !u.isSuspended);
  const suspendedUsers = users.filter(u => u.isSuspended);

  const items = [
      ...pendingUsers.map(u => ({ type: 'pending' as const, user: u })),
      ...suspendedUsers.map(u => ({ type: 'suspended' as const, user: u }))
  ].slice(0, 5);

  return (
    <div className="bg-white dark:bg-[#13111c] rounded-xl shadow-sm border border-gray-200 dark:border-white/5 p-5">
        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
            <ShieldAlert size={14} className="text-orange-500"/> Compliance Watch
        </h3>
        
        {items.length === 0 ? (
            <div className="text-center py-8 text-gray-400 text-sm flex flex-col items-center">
                <div className="mb-2 w-8 h-8 rounded-full bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border border-green-200 dark:border-green-800 flex items-center justify-center">
                    <CheckCircle size={16} />
                </div>
                All users are compliant.
            </div>
        ) : (
            <div className="space-y-3">
                {items.map((item) => (
                    <div key={item.user.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-white/5 rounded-lg border border-gray-100 dark:border-white/5">
                        <div className="flex items-center gap-3 min-w-0">
                            {item.type === 'suspended' ? (
                                <div className="w-8 h-8 rounded-full bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border border-red-200 dark:border-red-800 flex items-center justify-center shrink-0">
                                    <AlertTriangle size={16} />
                                </div>
                            ) : (
                                <div className="w-8 h-8 rounded-full shrink-0 flex items-center justify-center text-xs font-bold bg-orange-100 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400">
                                    {item.user.firstName.charAt(0)}
                                </div>
                            )}
                            <div className="min-w-0">
                                <p className="text-sm font-bold text-gray-900 dark:text-white truncate">{item.user.firstName} {item.user.lastName}</p>
                                <p className="text-[10px] text-gray-500 dark:text-gray-400">{item.type === 'suspended' ? 'Suspended' : 'Verification Pending'}</p>
                            </div>
                        </div>
                        <button className="text-gray-400 hover:text-jambo-600 dark:hover:text-jambo-400 transition-colors p-1">
                            <Mail size={14} />
                        </button>
                    </div>
                ))}
            </div>
        )}
    </div>
  );
};
