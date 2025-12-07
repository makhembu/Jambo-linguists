
import React from 'react';
import { UserCheck, ShieldAlert, CheckCircle } from 'lucide-react';
import { mockDb } from '@/data/mockDatabase';

export const LiveOperationsFeed = () => {
  const users = mockDb.getAllUsers().slice(0, 5); // Get recent 5

  // Helper to format time relative (mocked for simplicity)
  const getTime = (dateStr: string) => {
      const date = new Date(dateStr);
      return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
  };

  return (
    <div className="flex-1 overflow-y-auto p-0">
        <div className="divide-y divide-gray-100 dark:divide-white/5">
            {users.length === 0 ? (
                <div className="p-6 text-center text-gray-400">No recent activity</div>
            ) : (
                users.map((user) => (
                    <div key={user.id} className="p-4 flex items-center gap-3 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors cursor-pointer group">
                        <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-white/10 flex items-center justify-center text-xs font-bold text-gray-500 overflow-hidden">
                            {user.avatarUrl ? <img src={user.avatarUrl} className="w-full h-full object-cover" /> : user.firstName.charAt(0)}
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-center mb-0.5">
                                <p className="text-sm font-bold text-gray-900 dark:text-white truncate group-hover:text-jambo-600 transition-colors">
                                    {user.firstName} {user.lastName}
                                </p>
                                <span className="text-[10px] text-gray-400">{getTime(user.createdAt)}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-xs text-gray-500 truncate max-w-[100px]">{user.languages ? user.languages.join(', ') : 'No Lang'}</span>
                                {user.isVerified ? (
                                    <span className="text-[10px] flex items-center gap-1 text-green-600 bg-green-50 dark:bg-green-900/20 px-1.5 py-0.5 rounded ml-auto">
                                        <UserCheck size={10} /> Verified
                                    </span>
                                ) : (
                                    <span className="text-[10px] flex items-center gap-1 text-orange-600 bg-orange-50 dark:bg-orange-900/20 px-1.5 py-0.5 rounded ml-auto">
                                        <ShieldAlert size={10} /> Pending
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                ))
            )}
            
            <div className="p-4 text-center">
                <button className="w-full py-2 text-xs font-bold border border-dashed border-gray-300 dark:border-white/20 rounded text-gray-500 hover:text-jambo-600 hover:border-jambo-600 transition-colors">
                    + Manually Add Linguist
                </button>
            </div>
        </div>
    </div>
  );
};
