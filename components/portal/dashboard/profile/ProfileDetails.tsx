
import React from 'react';
import { Mail, Phone, MapPin, Calendar, Clock, Globe, GraduationCap, Award, Lock, CreditCard } from 'lucide-react';
import { User } from '@/data/types';
import { StatusBanners } from '../../../admin/users/modal/StatusBanners';

interface ProfileDetailsProps {
  user: User;
  isEditing: boolean;
  formData: any;
  setFormData: (data: any) => void;
}

export const ProfileDetails = ({ user, isEditing, formData, setFormData }: ProfileDetailsProps) => {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
        <StatusBanners user={user} />
        
        <div className="grid md:grid-cols-2 gap-6">
            {/* Contact Details Card */}
            <div className="bg-gray-50 dark:bg-white/5 rounded-xl p-5 border border-gray-100 dark:border-white/5 h-full">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest border-b border-gray-200 dark:border-white/10 pb-3 mb-4">Contact Information</h3>
                <div className="space-y-4">
                    <div className="group">
                        <div className="flex items-center gap-2 mb-1.5">
                            <Mail size={14} className="text-jambo-600 dark:text-jambo-400" />
                            <label className="text-[10px] font-bold text-gray-500 uppercase">Email Address</label>
                        </div>
                        {isEditing ? (
                            <input 
                                className="w-full bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-3 py-2 text-sm text-gray-900 dark:text-white focus:outline-none focus:border-jambo-500 transition-colors"
                                value={formData.email}
                                onChange={e => setFormData({...formData, email: e.target.value})}
                            />
                        ) : (
                            <div className="text-sm font-medium text-gray-800 dark:text-gray-200 break-all select-all">{user.email}</div>
                        )}
                    </div>

                    <div className="group">
                        <div className="flex items-center gap-2 mb-1.5">
                            <Phone size={14} className="text-jambo-600 dark:text-jambo-400" />
                            <label className="text-[10px] font-bold text-gray-500 uppercase">Phone Number</label>
                        </div>
                        {isEditing ? (
                            <input 
                                className="w-full bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-3 py-2 text-sm text-gray-900 dark:text-white focus:outline-none focus:border-jambo-500 transition-colors"
                                value={formData.phone}
                                onChange={e => setFormData({...formData, phone: e.target.value})}
                                placeholder="+44..."
                            />
                        ) : (
                            <div className="text-sm font-medium text-gray-800 dark:text-gray-200 select-all">{formData.phone || 'N/A'}</div>
                        )}
                    </div>

                    <div className="group">
                        <div className="flex items-center gap-2 mb-1.5">
                            <MapPin size={14} className="text-jambo-600 dark:text-jambo-400" />
                            <label className="text-[10px] font-bold text-gray-500 uppercase">Location</label>
                        </div>
                        {isEditing ? (
                            <input 
                                className="w-full bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-3 py-2 text-sm text-gray-900 dark:text-white focus:outline-none focus:border-jambo-500 transition-colors"
                                value={formData.location}
                                onChange={e => setFormData({...formData, location: e.target.value})}
                                placeholder="City, Country"
                            />
                        ) : (
                            <div className="text-sm font-medium text-gray-800 dark:text-gray-200">{formData.location || 'Unknown'}</div>
                        )}
                    </div>

                    <div className="pt-2 border-t border-gray-200 dark:border-white/10 mt-2 grid grid-cols-2 gap-4">
                        <div>
                            <div className="flex items-center gap-1.5 mb-1">
                                <Calendar size={12} className="text-gray-400" />
                                <span className="text-[10px] font-bold text-gray-400 uppercase">Joined</span>
                            </div>
                            <span className="text-xs text-gray-600 dark:text-gray-300">{new Date(user.createdAt).toLocaleDateString()}</span>
                        </div>
                        <div>
                            <div className="flex items-center gap-1.5 mb-1">
                                <Clock size={12} className="text-gray-400" />
                                <span className="text-[10px] font-bold text-gray-400 uppercase">Last Active</span>
                            </div>
                            <span className="text-xs text-gray-600 dark:text-gray-300">Today</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Professional Details Card */}
            <div className="bg-white dark:bg-[#1a1625] rounded-xl p-5 border border-gray-200 dark:border-white/10 shadow-sm h-full">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100 dark:border-white/5 pb-3 mb-4">Professional Profile</h3>
                
                <div className="space-y-6">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <Globe size={14} className="text-brand-teal" />
                            <label className="text-[10px] font-bold text-gray-500 uppercase">Languages</label>
                        </div>
                        {isEditing ? (
                             <input 
                                className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-3 py-2 text-sm text-gray-900 dark:text-white focus:outline-none focus:border-brand-teal transition-colors"
                                value={formData.languages}
                                onChange={e => setFormData({...formData, languages: e.target.value})}
                                placeholder="Comma separated (e.g. English, Swahili)"
                            />
                        ) : (
                            <div className="flex flex-wrap gap-2">
                                {user.languages && user.languages.length > 0 ? (
                                    user.languages.map(lang => (
                                        <span key={lang} className="bg-teal-50 dark:bg-teal-900/20 border border-teal-100 dark:border-teal-800 px-3 py-1 rounded-full text-xs font-bold text-teal-700 dark:text-teal-300">
                                            {lang}
                                        </span>
                                    ))
                                ) : (
                                    <span className="text-sm text-gray-400 italic">No languages listed</span>
                                )}
                            </div>
                        )}
                    </div>

                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <GraduationCap size={14} className="text-brand-teal" />
                            <label className="text-[10px] font-bold text-gray-500 uppercase">Qualifications</label>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {user.qualifications && user.qualifications.length > 0 ? (
                                user.qualifications.map(qual => (
                                    <span key={qual} className="bg-gray-100 dark:bg-white/10 px-3 py-1 rounded-full text-xs font-bold text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-white/10 flex items-center gap-1">
                                        <Award size={10} className="text-orange-500" /> {qual}
                                    </span>
                                ))
                            ) : (
                                <span className="text-sm text-gray-400 italic">No qualifications listed</span>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* Bank & Security */}
        {isEditing && (
            <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gray-50 dark:bg-white/5 rounded-xl p-5 border border-gray-200 dark:border-white/10">
                    <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest border-b border-gray-200 dark:border-white/10 pb-3 mb-4 flex items-center gap-2">
                        <CreditCard size={14} /> Banking Details
                    </h3>
                    <div className="space-y-4">
                        <div>
                            <label className="text-[10px] font-bold text-gray-400 uppercase mb-1 block">Bank Name</label>
                            <input 
                                className="w-full bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-jambo-500"
                                value={formData.bankName}
                                onChange={e => setFormData({...formData, bankName: e.target.value})}
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-[10px] font-bold text-gray-400 uppercase mb-1 block">Sort Code</label>
                                <input 
                                    className="w-full bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-jambo-500"
                                    value={formData.sortCode}
                                    onChange={e => setFormData({...formData, sortCode: e.target.value})}
                                />
                            </div>
                            <div>
                                <label className="text-[10px] font-bold text-gray-400 uppercase mb-1 block">Account No</label>
                                <input 
                                    className="w-full bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-jambo-500"
                                    value={formData.accountNumber}
                                    onChange={e => setFormData({...formData, accountNumber: e.target.value})}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-orange-50 dark:bg-orange-900/10 rounded-xl p-5 border border-orange-200 dark:border-orange-800">
                    <h3 className="text-xs font-bold text-orange-700 dark:text-orange-300 uppercase tracking-widest border-b border-orange-200 dark:border-orange-800 pb-3 mb-4 flex items-center gap-2">
                        <Lock size={14} /> Security
                    </h3>
                    <div>
                        <label className="text-[10px] font-bold text-gray-500 uppercase mb-1 block">New Password</label>
                        <input 
                            type="password"
                            className="w-full bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-3 py-2 text-sm text-gray-900 dark:text-white focus:outline-none focus:border-orange-500 transition-colors"
                            value={formData.password || ''}
                            onChange={e => setFormData({...formData, password: e.target.value})}
                            placeholder="Leave blank to keep unchanged"
                        />
                    </div>
                </div>
            </div>
        )}
    </div>
  );
};
