
import React, { useRef } from 'react';
import { CheckCircle, Camera } from 'lucide-react';
import { User } from '@/data/types';

interface ProfileIdentityProps {
  user: User;
  isEditing: boolean;
  formData: any;
  setFormData: (data: any) => void;
  onAvatarChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const ProfileIdentity = ({ user, isEditing, formData, setFormData, onAvatarChange }: ProfileIdentityProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const roleColor = 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 border-blue-200 dark:border-blue-800';

  return (
    <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-end mb-8 relative z-10">
        {/* Avatar with heavy border to overlap header */}
        <div className="relative group -mt-12 sm:-mt-16 shrink-0">
            <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-[6px] border-white dark:border-[#1a1625] bg-gray-200 dark:bg-white/10 flex items-center justify-center text-3xl sm:text-4xl font-bold text-gray-500 overflow-hidden shadow-xl">
                {formData.avatarUrl ? (
                    <img src={formData.avatarUrl} className="w-full h-full object-cover" alt="Avatar"/>
                ) : (
                    user.firstName[0]
                )}
            </div>
            
            {/* Avatar Upload Overlay */}
            {isEditing && (
                <button 
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute inset-0 m-1.5 rounded-full bg-black/50 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity"
                >
                    <Camera size={24} />
                </button>
            )}
            <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                accept="image/*" 
                onChange={onAvatarChange} 
            />
        </div>
        
        <div className="flex-1 pb-1 w-full">
            {isEditing ? (
                <div className="space-y-3 mb-2 animate-in fade-in slide-in-from-left-2 duration-300">
                    <div className="flex flex-col sm:flex-row gap-3">
                        <div className="flex-1">
                            <label className="text-[10px] font-bold uppercase text-gray-400 mb-1 block">First Name</label>
                            <input 
                                className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-3 py-2 text-sm font-bold text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-jambo-600 transition-all"
                                value={formData.firstName}
                                onChange={e => setFormData({...formData, firstName: e.target.value})}
                                placeholder="First Name"
                            />
                        </div>
                        <div className="flex-1">
                            <label className="text-[10px] font-bold uppercase text-gray-400 mb-1 block">Last Name</label>
                            <input 
                                className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-3 py-2 text-sm font-bold text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-jambo-600 transition-all"
                                value={formData.lastName}
                                onChange={e => setFormData({...formData, lastName: e.target.value})}
                                placeholder="Last Name"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="text-[10px] font-bold uppercase text-gray-400 mb-1 block">Headline</label>
                        <input 
                            className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-3 py-2 text-xs text-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-jambo-600 transition-all"
                            value={formData.headline}
                            onChange={e => setFormData({...formData, headline: e.target.value})}
                            placeholder="Professional Headline"
                        />
                    </div>
                </div>
            ) : (
                <>
                    <div className="flex flex-wrap items-center gap-3 mb-1">
                        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white leading-tight">
                            {formData.firstName} {formData.lastName}
                        </h2>
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider border ${roleColor}`}>
                            {user.role}
                        </span>
                        {user.isVerified && (
                            <div className="text-green-500 bg-green-50 dark:bg-green-900/20 rounded-full p-1" title="Verified Account">
                                <CheckCircle size={16} className="fill-current" />
                            </div>
                        )}
                    </div>
                    <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">
                        {formData.headline || 'No headline set'}
                    </p>
                </>
            )}
        </div>
    </div>
  );
};
