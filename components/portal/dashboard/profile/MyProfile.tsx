
import React, { useState } from 'react';
import { User, Briefcase, Wallet, History, Settings, BookOpen, GraduationCap, ArrowRight, LogOut } from 'lucide-react';
import { mockDb } from '../../../../data/mockDatabase';
import { ProfileHeader } from './ProfileHeader';
import { ProfileIdentity } from './ProfileIdentity';
import { ProfileDetails } from './ProfileDetails';
import { UserJobsTab } from '../../../admin/users/modal/UserJobsTab';
import { UserFinanceTab } from '../../../admin/users/modal/UserFinanceTab';
import { UserLoginHistoryTab } from '../../../admin/users/modal/UserLoginHistoryTab';
import { ProfileSettings } from './ProfileSettings';

interface MyProfileProps {
    navigateToSection?: (section: string) => void;
    onLogout?: () => void;
}

export const MyProfile = ({ navigateToSection, onLogout }: MyProfileProps) => {
  const user = mockDb.auth.getCurrentUser();
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'jobs' | 'finance' | 'history' | 'settings'>('overview');
  const [processing, setProcessing] = useState(false);

  // Initial State from DB
  const [formData, setFormData] = useState({
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      phone: user?.phone || '',
      location: user?.location || '',
      email: user?.email || '',
      headline: user?.headline || 'Professional Linguist',
      languages: user?.languages?.join(', ') || '',
      avatarUrl: user?.avatarUrl,
      bankName: user?.bankDetails?.bankName || '',
      accountNumber: user?.bankDetails?.accountNumber || '',
      sortCode: user?.bankDetails?.sortCode || '',
      password: '' // For security update
  });

  if (!user) return <div className="p-8 text-center text-gray-500">Loading profile...</div>;

  const handleSave = () => {
      setProcessing(true);
      setTimeout(() => {
          mockDb.auth.updateProfile({
              firstName: formData.firstName,
              lastName: formData.lastName,
              phone: formData.phone,
              location: formData.location,
              email: formData.email,
              headline: formData.headline,
              languages: formData.languages.split(',').map(s => s.trim()).filter(Boolean), 
              avatarUrl: formData.avatarUrl,
              bankDetails: {
                  bankName: formData.bankName,
                  accountNumber: formData.accountNumber,
                  sortCode: formData.sortCode
              }
          });
          setProcessing(false);
          setIsEditing(false);
      }, 800);
  };

  const handleCancel = () => {
      setFormData({
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone || '',
        location: user.location || '',
        email: user.email,
        headline: user.headline || 'Professional Linguist',
        languages: user.languages?.join(', ') || '',
        avatarUrl: user.avatarUrl,
        bankName: user.bankDetails?.bankName || '',
        accountNumber: user.bankDetails?.accountNumber || '',
        sortCode: user.bankDetails?.sortCode || '',
        password: ''
      });
      setIsEditing(false);
  };

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
          const url = URL.createObjectURL(file);
          setFormData(prev => ({ ...prev, avatarUrl: url }));
      }
  };

  const handleLogout = () => {
      mockDb.auth.logout();
      if (onLogout) onLogout();
  };

  return (
    <div className="animate-in fade-in duration-500 pb-12 max-w-[1600px] mx-auto">
        <div className="bg-white dark:bg-[#1a1625] rounded-2xl shadow-sm border border-gray-200 dark:border-white/5 overflow-hidden">
            {/* Header Image & Actions */}
            <ProfileHeader 
                user={user}
                isEditing={isEditing}
                setIsEditing={setIsEditing}
                onSave={handleSave}
                onCancel={handleCancel}
                processing={processing}
            />

            <div className="px-6 pb-8 md:px-10 md:pb-10 relative">
                {/* Identity Section (Avatar + Name) */}
                <ProfileIdentity 
                    user={user}
                    isEditing={isEditing}
                    formData={formData}
                    setFormData={setFormData}
                    onAvatarChange={handleAvatarUpload}
                />

                {/* Mobile Quick Links (Visible only on lg:hidden) */}
                {navigateToSection && (
                    <div className="lg:hidden grid grid-cols-2 gap-3 mb-8">
                        <button 
                            onClick={() => navigateToSection('training')}
                            className="flex items-center gap-3 p-4 rounded-xl bg-purple-50 dark:bg-purple-900/20 border border-purple-100 dark:border-purple-800 text-left transition-transform active:scale-95"
                        >
                            <div className="bg-white dark:bg-white/10 p-2 rounded-lg text-purple-600 dark:text-purple-400">
                                <GraduationCap size={20} />
                            </div>
                            <div>
                                <p className="font-bold text-gray-900 dark:text-white text-sm">Training</p>
                                <p className="text-[10px] text-gray-500 dark:text-gray-400">Courses & Certificates</p>
                            </div>
                        </button>
                        <button 
                            onClick={() => navigateToSection('resources')}
                            className="flex items-center gap-3 p-4 rounded-xl bg-teal-50 dark:bg-teal-900/20 border border-teal-100 dark:border-teal-800 text-left transition-transform active:scale-95"
                        >
                            <div className="bg-white dark:bg-white/10 p-2 rounded-lg text-brand-teal">
                                <BookOpen size={20} />
                            </div>
                            <div>
                                <p className="font-bold text-gray-900 dark:text-white text-sm">Resources</p>
                                <p className="text-[10px] text-gray-500 dark:text-gray-400">Docs & Guidelines</p>
                            </div>
                        </button>
                    </div>
                )}

                {/* Navigation Tabs */}
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
                    <button 
                        onClick={() => setActiveTab('settings')}
                        className={`px-4 py-3 text-sm font-bold border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap ${activeTab === 'settings' ? 'border-jambo-600 text-jambo-600 dark:text-white dark:border-white' : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'}`}
                    >
                        <Settings size={16} /> Preferences
                    </button>
                </div>

                {/* Tab Content */}
                {activeTab === 'overview' && (
                    <ProfileDetails 
                        user={user}
                        isEditing={isEditing}
                        formData={formData}
                        setFormData={setFormData}
                    />
                )}

                {activeTab === 'jobs' && <UserJobsTab userId={user.id} />}
                
                {activeTab === 'finance' && <UserFinanceTab userId={user.id} />}
                
                {activeTab === 'history' && <UserLoginHistoryTab userId={user.id} />}

                {activeTab === 'settings' && <ProfileSettings />}

                {/* Logout Button (Visible only on lg:hidden, typically mobile/tablet) */}
                <div className="mt-12 pt-8 border-t border-gray-200 dark:border-white/10 lg:hidden">
                    <button 
                        onClick={handleLogout}
                        className="w-full flex items-center justify-center gap-2 py-4 rounded-xl font-bold text-red-600 bg-red-50 dark:bg-red-900/10 hover:bg-red-100 dark:hover:bg-red-900/20 transition-colors"
                    >
                        <LogOut size={20} /> Log Out
                    </button>
                </div>
            </div>
        </div>
    </div>
  );
};
