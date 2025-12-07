import React from 'react';
import { Lock } from 'lucide-react';

interface SecurityDetailsProps {
  isEditing: boolean;
  formData: any;
  setFormData: (data: any) => void;
}

export const SecurityDetails = ({ isEditing, formData, setFormData }: SecurityDetailsProps) => {
    if (!isEditing) return null;

    return (
        <div className="bg-orange-50 dark:bg-orange-900/10 rounded-xl p-5 border border-orange-200 dark:border-orange-800 animate-in fade-in duration-300">
            <h3 className="text-xs font-bold text-orange-700 dark:text-orange-300 uppercase tracking-widest border-b border-orange-200 dark:border-orange-800 pb-3 mb-4">Security</h3>
            <div className="group">
                <div className="flex items-center gap-2 mb-1.5">
                    <Lock size={14} className="text-orange-600" />
                    <label className="text-[10px] font-bold text-gray-500 uppercase">New Password</label>
                </div>
                <input 
                    type="password"
                    className="w-full bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-3 py-2 text-sm text-gray-900 dark:text-white focus:outline-none focus:border-orange-500 transition-colors"
                    value={formData.password || ''}
                    onChange={e => setFormData({...formData, password: e.target.value})}
                    placeholder="Leave blank to keep unchanged"
                />
            </div>
        </div>
    );
};