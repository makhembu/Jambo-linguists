
import React from 'react';
import { Mail, Phone, Ban, CheckCircle, RefreshCw, Eye } from 'lucide-react';
import { User } from '../../../data/mockDatabase';

export interface UserCardProps {
  user: User;
  activeTab: 'active' | 'pending' | 'removed';
  onToggleSuspension: (id: string, isSuspended: boolean) => void;
  onToggleVerification: (id: string, isVerified: boolean) => void;
  onViewProfile: (user: User) => void;
}

export const UserCard: React.FC<UserCardProps> = ({ user, activeTab, onToggleSuspension, onToggleVerification, onViewProfile }) => {
  return (
    <div className="bg-white dark:bg-[#13111c] rounded-xl border border-gray-200 dark:border-white/5 p-6 shadow-sm hover:shadow-md transition-all group relative overflow-hidden flex flex-col h-full">
        
        {/* Status Stripe */}
        {activeTab === 'removed' && <div className="absolute top-0 left-0 w-1 h-full bg-red-500"></div>}
        {activeTab === 'pending' && <div className="absolute top-0 left-0 w-1 h-full bg-orange-500"></div>}
        {activeTab === 'active' && <div className="absolute top-0 left-0 w-1 h-full bg-green-500"></div>}

        <div className="flex items-start justify-between mb-4 pl-2">
            <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-white/10 overflow-hidden flex items-center justify-center text-gray-500 font-bold text-lg border border-white dark:border-white/10 shadow-sm">
                    {user.avatarUrl ? <img src={user.avatarUrl} className="w-full h-full object-cover" alt={user.firstName}/> : user.firstName.charAt(0)}
                </div>
                <div>
                    <h4 className="font-bold text-gray-900 dark:text-white leading-tight truncate max-w-[150px]">{user.firstName} {user.lastName}</h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 truncate max-w-[150px]">{user.location || 'Unknown Location'}</p>
                    <span className="inline-block mt-1 text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-300">
                        {user.role}
                    </span>
                </div>
            </div>
            
            {/* Quick Actions based on Tab */}
            <div className="flex gap-2">
                {activeTab === 'active' && (
                    <button 
                        onClick={(e) => { e.stopPropagation(); onToggleSuspension(user.id, true); }}
                        className="p-2 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                        title="Suspend User"
                    >
                        <Ban size={18} />
                    </button>
                )}
                {activeTab === 'pending' && (
                    <button 
                        onClick={(e) => { e.stopPropagation(); onToggleVerification(user.id, true); }}
                        className="p-2 rounded-lg text-green-600 bg-green-50 dark:bg-green-900/20 hover:bg-green-100 transition-colors"
                        title="Approve Verification"
                    >
                        <CheckCircle size={18} />
                    </button>
                )}
                {activeTab === 'removed' && (
                    <button 
                        onClick={(e) => { e.stopPropagation(); onToggleSuspension(user.id, false); }}
                        className="p-2 rounded-lg text-blue-600 bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 transition-colors"
                        title="Reactivate User"
                    >
                        <RefreshCw size={18} />
                    </button>
                )}
            </div>
        </div>

        <div className="space-y-3 mb-6 pl-2 flex-grow">
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 truncate">
                <Mail size={14} className="text-gray-400 shrink-0" /> <span className="truncate">{user.email}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <Phone size={14} className="text-gray-400 shrink-0" /> {user.phone || 'N/A'}
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
                {user.languages && user.languages.length > 0 ? (
                    user.languages.slice(0, 3).map((lang, i) => (
                        <span key={i} className="text-[10px] font-bold bg-jambo-50 dark:bg-jambo-900/20 text-jambo-700 dark:text-jambo-300 px-2 py-1 rounded">
                            {lang}
                        </span>
                    ))
                ) : (
                    <span className="text-[10px] text-gray-400 italic">No languages listed</span>
                )}
                {user.languages && user.languages.length > 3 && (
                    <span className="text-[10px] text-gray-400">+{user.languages.length - 3}</span>
                )}
            </div>
        </div>

        <div className="pt-4 border-t border-gray-100 dark:border-white/5 flex justify-between items-center pl-2">
            <div className="text-[10px] text-gray-400">
                Joined {new Date(user.createdAt).toLocaleDateString()}
            </div>
            <button 
                onClick={() => onViewProfile(user)}
                className="text-xs font-bold text-blue-600 hover:text-blue-700 hover:underline flex items-center gap-1"
            >
                <Eye size={12} /> View Details
            </button>
        </div>
    </div>
  );
};
