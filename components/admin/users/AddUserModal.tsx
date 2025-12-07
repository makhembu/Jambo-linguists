import React, { useState, useEffect, useMemo } from 'react';
import { X, UserPlus, Mail, User, MapPin, Briefcase, Globe, Loader2, Award, CreditCard, Shield, Image as ImageIcon } from 'lucide-react';
import { mockDb, UserRole } from '../../../data/mockDatabase';
import { Modal } from '../../ui/Modal';
import { Fieldset } from '../jobs/add-job/Fieldset';
import { ImageUploadField } from './add-user/ImageUploadField';

interface AddUserModalProps {
  onClose: () => void;
  onUserAdded: () => void;
}

export const AddUserModal = ({ onClose, onUserAdded }: AddUserModalProps) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    role: 'linguist' as UserRole,
    phone: '',
    location: '',
    headline: '',
    languages: '',
    qualifications: '',
    bankName: '',
    accountNumber: '',
    sortCode: '',
    isVerified: true,
  });
  
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [headerFile, setHeaderFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [headerPreview, setHeaderPreview] = useState<string | null>(null);

  useEffect(() => {
      let objectUrl: string | null = null;
      if (avatarFile) {
          objectUrl = URL.createObjectURL(avatarFile);
          setAvatarPreview(objectUrl);
      }
      return () => { if (objectUrl) URL.revokeObjectURL(objectUrl); };
  }, [avatarFile]);

  useEffect(() => {
      let objectUrl: string | null = null;
      if (headerFile) {
          objectUrl = URL.createObjectURL(headerFile);
          setHeaderPreview(objectUrl);
      }
      return () => { if (objectUrl) URL.revokeObjectURL(objectUrl); };
  }, [headerFile]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { bankName, accountNumber, sortCode, ...restOfData } = formData;
    const finalData = {
        ...restOfData,
        languages: formData.languages.split(',').map(l => l.trim()).filter(Boolean),
        qualifications: formData.qualifications.split(',').map(q => q.trim()).filter(Boolean),
        avatarUrl: avatarPreview,
        headerUrl: headerPreview,
        bankDetails: {
            bankName: bankName,
            accountNumber: accountNumber,
            sortCode: sortCode,
        }
    };

    setTimeout(() => {
        mockDb.adminCreateUser(finalData);
        setLoading(false);
        onUserAdded();
        onClose();
    }, 1000);
  };

  return (
    <Modal isOpen={true} onClose={onClose} size="3xl">
        {/* Header */}
        <div className="p-6 border-b border-gray-100 dark:border-white/5 flex justify-between items-center bg-gray-50/50 dark:bg-white/5">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <UserPlus className="text-jambo-600 dark:text-jambo-400" size={24} />
                Add New User
            </h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-white transition-colors">
                <X size={20} />
            </button>
        </div>

        {/* Form */}
        <div className="p-6 overflow-y-auto custom-scrollbar max-h-[70vh]">
            <form id="addUserForm" onSubmit={handleSubmit} className="space-y-6">
                
                <Fieldset title="Identity" icon={User}>
                    <div className="grid grid-cols-2 gap-4">
                        <input name="firstName" required value={formData.firstName} onChange={e => setFormData({...formData, firstName: e.target.value})} className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-4 py-2.5 text-sm dark:text-white" placeholder="First Name *" />
                        <input name="lastName" required value={formData.lastName} onChange={e => setFormData({...formData, lastName: e.target.value})} className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-4 py-2.5 text-sm dark:text-white" placeholder="Last Name *" />
                    </div>
                    <input type="email" name="email" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-4 py-2.5 text-sm dark:text-white" placeholder="Email Address *" />
                </Fieldset>

                <Fieldset title="Profile Details" icon={Briefcase}>
                    <select name="role" value={formData.role} onChange={e => setFormData({...formData, role: e.target.value as UserRole})} className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-4 py-2.5 text-sm dark:text-white">
                        <option value="linguist">Linguist</option>
                        <option value="admin">Admin</option>
                        <option value="client">Client</option>
                    </select>
                    <input name="headline" value={formData.headline} onChange={e => setFormData({...formData, headline: e.target.value})} className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-4 py-2.5 text-sm dark:text-white" placeholder="Professional Headline (e.g., Swahili Interpreter)" />
                    <div className="grid grid-cols-2 gap-4">
                        <input name="phone" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-4 py-2.5 text-sm dark:text-white" placeholder="Phone Number" />
                        <input name="location" value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-4 py-2.5 text-sm dark:text-white" placeholder="Location (e.g., Leeds, UK)" />
                    </div>
                </Fieldset>

                <Fieldset title="Professional" icon={Award}>
                    <input name="languages" value={formData.languages} onChange={e => setFormData({...formData, languages: e.target.value})} className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-4 py-2.5 text-sm dark:text-white" placeholder="Languages (comma-separated)" />
                    <input name="qualifications" value={formData.qualifications} onChange={e => setFormData({...formData, qualifications: e.target.value})} className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-4 py-2.5 text-sm dark:text-white" placeholder="Qualifications (comma-separated)" />
                </Fieldset>

                 <Fieldset title="Media" icon={ImageIcon}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <ImageUploadField label="Avatar Image" icon={<User size={32}/>} previewUrl={avatarPreview} onFileChange={setAvatarFile} />
                        <ImageUploadField label="Header Image" icon={<ImageIcon size={32}/>} previewUrl={headerPreview} onFileChange={setHeaderFile} />
                    </div>
                </Fieldset>

                <Fieldset title="Financial" icon={CreditCard}>
                    <input name="bankName" value={formData.bankName} onChange={e => setFormData({...formData, bankName: e.target.value})} className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-4 py-2.5 text-sm dark:text-white" placeholder="Bank Name" />
                    <div className="grid grid-cols-2 gap-4">
                        <input name="sortCode" value={formData.sortCode} onChange={e => setFormData({...formData, sortCode: e.target.value})} className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-4 py-2.5 text-sm dark:text-white" placeholder="Sort Code" />
                        <input name="accountNumber" value={formData.accountNumber} onChange={e => setFormData({...formData, accountNumber: e.target.value})} className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-4 py-2.5 text-sm dark:text-white" placeholder="Account Number" />
                    </div>
                </Fieldset>

                <Fieldset title="Status" icon={Shield}>
                    <label className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-white/5 rounded-lg border border-gray-200 dark:border-white/10 cursor-pointer">
                        <input 
                            type="checkbox" 
                            name="isVerified"
                            checked={formData.isVerified}
                            onChange={(e) => setFormData({...formData, isVerified: e.target.checked})}
                            className="h-5 w-5 rounded text-jambo-600 focus:ring-jambo-500 border-gray-300"
                        />
                        <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
                           Mark as Verified
                           <span className="block text-xs text-gray-500">User will be able to accept jobs immediately.</span>
                        </span>
                    </label>
                </Fieldset>
            </form>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-100 dark:border-white/5 bg-gray-50 dark:bg-white/5 flex justify-end gap-3">
            <button 
                type="button"
                onClick={onClose}
                disabled={loading}
                className="px-6 py-2.5 rounded-lg border border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-300 font-bold text-sm hover:bg-white dark:hover:bg-white/5 transition-colors disabled:opacity-50"
            >
                Cancel
            </button>
            <button 
                form="addUserForm"
                type="submit"
                disabled={loading}
                className="px-6 py-2.5 rounded-lg bg-jambo-600 hover:bg-jambo-700 text-white font-bold text-sm shadow-lg flex items-center gap-2 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
            >
                {loading ? <Loader2 size={16} className="animate-spin" /> : <UserPlus size={18} />}
                {loading ? 'Creating...' : 'Create User'}
            </button>
        </div>
    </Modal>
  );
};
