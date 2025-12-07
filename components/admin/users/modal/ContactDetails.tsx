
import React from 'react';
import { Mail, Phone, MapPin, Calendar, Clock } from 'lucide-react';
import { User } from '../../../../../data/types';

interface ContactDetailsProps {
  user: User;
  isEditing: boolean;
  formData: any;
  setFormData: (data: any) => void;
}

export const ContactDetails = ({ user, isEditing, formData, setFormData }: ContactDetailsProps) => {
  return (
    <div className="bg-gray-50 dark:bg-white/5 rounded-xl p-5 border border-gray-100 dark:border-white/5">
        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest border-b border-gray-200 dark:border-white/10 pb-3 mb-4">Contact Information</h3>
        <div className="space-y-4">
            
            {/* Email */}
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

            {/* Phone */}
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
                    <div className="text-sm font-medium text-gray-800 dark:text-gray-200 select-all">{user.phone || 'N/A'}</div>
                )}
            </div>

            {/* Location */}
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
                    <div className="text-sm font-medium text-gray-800 dark:text-gray-200">{user.location || 'Unknown'}</div>
                )}
            </div>

            {/* Meta Dates (Read Only) */}
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
  );
};
