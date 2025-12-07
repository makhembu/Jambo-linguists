
import React from 'react';
import { Shield, Ban } from 'lucide-react';
import { User } from '../../../../../data/types';

export const StatusBanners = ({ user }: { user: User }) => {
  return (
    <div className="space-y-4 mb-8">
        {!user.isVerified && !user.isSuspended && (
            <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 p-4 rounded-xl flex gap-4 text-orange-800 dark:text-orange-200 animate-in slide-in-from-top-2">
                <div className="bg-orange-100 dark:bg-orange-900/40 p-2 rounded-lg h-fit">
                    <Shield size={20} className="shrink-0" />
                </div>
                <div>
                    <h4 className="font-bold text-sm">Verification Pending</h4>
                    <p className="text-xs opacity-90 mt-1 leading-relaxed">This user needs admin approval before they can accept assignments. Review their documents and details below.</p>
                </div>
            </div>
        )}

        {user.isSuspended && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-4 rounded-xl flex gap-4 text-red-800 dark:text-red-200 animate-in slide-in-from-top-2">
                <div className="bg-red-100 dark:bg-red-900/40 p-2 rounded-lg h-fit">
                    <Ban size={20} className="shrink-0" />
                </div>
                <div>
                    <h4 className="font-bold text-sm">Account Suspended</h4>
                    <p className="text-xs opacity-90 mt-1 leading-relaxed">Access to the portal has been revoked for this user. Reactivate to restore access.</p>
                </div>
            </div>
        )}
    </div>
  );
};
