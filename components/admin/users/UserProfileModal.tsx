
import React, { useState } from 'react';
import { User as UserType } from '../../../data/types';
import { mockDb } from '../../../data/mockDatabase';
import { X, Briefcase, Wallet, User, History } from 'lucide-react';
import { Modal } from '../../ui/Modal';

// Sub-components
import { ModalHeader } from './modal/ModalHeader';
import { IdentitySection } from './modal/IdentitySection';
import { ActionButtons } from './modal/ActionButtons';
import { StatusBanners } from './modal/StatusBanners';
import { ContactDetails } from './modal/ContactDetails';
import { ProfessionalDetails } from './modal/ProfessionalDetails';
import { UserJobsTab } from './modal/UserJobsTab';
import { UserFinanceTab } from './modal/UserFinanceTab';
import { SecurityDetails } from './modal/SecurityDetails';
import { UserLoginHistoryTab } from './modal/UserLoginHistoryTab';

interface UserProfileModalProps {
  user: UserType;
  onClose: () => void;
  onUpdate: () => void;
  onNavigate: (page: string) => void;
}

export const UserProfileModal = ({ user, onClose, onUpdate, onNavigate }: UserProfileModalProps) => {
  const [processing, setProcessing] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'jobs' | 'finance' | 'history'>('overview');
  
  // Local state for editing form
  const [formData, setFormData] = useState({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone || '',
      location: user.location || '',
      headline: user.headline || '',
      role: user.role,
      password: ''
  });

  // Handlers
  const handleApprove = () => {
      setProcessing(true);
      setTimeout(() => {
          mockDb.adminUpdateUserVerification(user.id, true);
          setProcessing(false);
          onUpdate();
      }, 800);
  };

  const handleSuspend = () => {
      const action = user.isSuspended ? 'unsuspend' : 'suspend';
      if (!user.isSuspended && !confirm(`Are you sure you want to ${action} this user? They will lose access immediately.`)) return;
      
      setProcessing(true);
      setTimeout(() => {
          mockDb.adminSuspendUser(user.id, !user.isSuspended);
          setProcessing(false);
          onUpdate();
      }, 800);
  };

  const handleLoginAsUser = () => {
      if(!confirm(`Login as ${user.firstName}? You will be redirected to the portal as this user.`)) return;
      
      const adminUser = mockDb.auth.getCurrentUser();
      if (adminUser) {
          mockDb.adminLogImpersonation(adminUser.id, user.id);
      }

      const res = mockDb.auth.login(user.email);
      if (res.success) {
          onClose();
          onNavigate('portal');
      } else {
          alert('Failed to login as user. Ensure the email is valid.');
      }
  };

  const handleSave = () => {
      setProcessing(true);
      setTimeout(() => {
          // Exclude password from general update if it's empty
          const { password, ...restOfData } = formData;
          const dataToUpdate: Partial<UserType> = { ...restOfData };
          // In a real app, you'd handle password update separately if (password) { ... }
          mockDb.adminUpdateUser(user.id, dataToUpdate);
          
          setProcessing(false);
          setIsEditing(false);
          onUpdate();
      }, 800);
  };

  const handleCancel = () => {
      setIsEditing(false); 
      // Reset form data
      setFormData({ 
          firstName: user.firstName, 
          lastName: user.lastName, 
          email: user.email, 
          phone: user.phone || '', 
          location: user.location || '', 
          headline: user.headline || '', 
          role: user.role,
          password: ''
      });
  };

  return (
    <Modal isOpen={true} onClose={onClose} size="4xl" showCloseButton={true}>
        {/* Scrollable Container including Header */}
        <div className="flex-1 overflow-y-auto custom-scrollbar relative">
            
            {/* Header Image Section */}
            <ModalHeader 
                user={user}
                isEditing={isEditing}
                setIsEditing={setIsEditing}
                onSave={handleSave}
                onCancel={handleCancel}
                processing={processing}
            />

            <div className="px-6 pb-8 md:px-10 md:pb-10 relative">
                <div className="relative">
                    <IdentitySection 
                        user={user}
                        isEditing={isEditing}
                        formData={formData}
                        setFormData={setFormData}
                    />
                    
                    <ActionButtons 
                        user={user}
                        onLoginAsUser={handleLoginAsUser}
                        onApprove={handleApprove}
                        onSuspend={handleSuspend}
                        processing={processing}
                    />
                </div>

                {/* Tabs */}
                <div className="flex border-b border-gray-200 dark:border-white/10 mb-6 overflow-x-auto no-scrollbar">
                    <button 
                        onClick={() => setActiveTab('overview')}
                        className={`px-4 py-3 text-sm font-bold border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap ${activeTab === 'overview' ? 'border-jambo-600 text-jambo-600 dark:text-white dark:border-white' : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'}`}
                    >
                        <User size={16} /> Overview
                    </button>
                    <button 
                        onClick={() => setActiveTab('jobs')}
                        className={`px-4 py-3 text-sm font-bold border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap ${activeTab === 'jobs' ? 'border-jambo-600 text-jambo-600 dark:text-white dark:border-white' : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'}`}
                    >
                        <Briefcase size={16} /> Assignments
                    </button>
                    <button 
                        onClick={() => setActiveTab('finance')}
                        className={`px-4 py-3 text-sm font-bold border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap ${activeTab === 'finance' ? 'border-jambo-600 text-jambo-600 dark:text-white dark:border-white' : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'}`}
                    >
                        <Wallet size={16} /> Finance
                    </button>
                     <button 
                        onClick={() => setActiveTab('history')}
                        className={`px-4 py-3 text-sm font-bold border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap ${activeTab === 'history' ? 'border-jambo-600 text-jambo-600 dark:text-white dark:border-white' : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'}`}
                    >
                        <History size={16} /> Login History
                    </button>
                </div>

                {activeTab === 'overview' && (
                    <div className="animate-in fade-in slide-in-from-bottom-2 duration-300 space-y-6">
                        <StatusBanners user={user} />
                        <div className="grid md:grid-cols-2 gap-6 mt-2">
                            <ContactDetails 
                                user={user} 
                                isEditing={isEditing}
                                formData={formData}
                                setFormData={setFormData}
                            />
                            
                            <ProfessionalDetails 
                                user={user}
                                isEditing={isEditing}
                                formData={formData}
                                setFormData={setFormData}
                            />
                        </div>
                         <SecurityDetails
                            isEditing={isEditing}
                            formData={formData}
                            setFormData={setFormData}
                        />
                    </div>
                )}

                {activeTab === 'jobs' && <UserJobsTab userId={user.id} />}
                
                {activeTab === 'finance' && <UserFinanceTab userId={user.id} />}
                
                {activeTab === 'history' && <UserLoginHistoryTab userId={user.id} />}

            </div>
        </div>
    </Modal>
  );
};
