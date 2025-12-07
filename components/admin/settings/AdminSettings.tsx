
import React, { useState } from 'react';
import { Settings, Shield, Sliders, BookOpen, Briefcase, Wallet, Search, Mail } from 'lucide-react';
import { TabsList, TabsTrigger } from '../../ui/Tabs';
import { SettingsTab } from './SettingsTab';
import { AdminManagementTab } from './AdminManagementTab';
import { LMSSettingsTab } from './LMSSettingsTab';
import { MarketplaceSettingsTab } from './MarketplaceSettingsTab';
import { FinanceSettingsTab } from './FinanceSettingsTab';
import { SeoSettingsTab } from './SeoSettingsTab';
import { EmailSettingsTab } from './EmailSettingsTab';

export const AdminSettings = () => {
  const [activeTab, setActiveTab] = useState<'config' | 'seo' | 'email' | 'lms' | 'marketplace' | 'finance' | 'admins'>('config');

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">System Settings</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">Configure global platform rules, LMS policies, and administrative access.</p>
      </div>

      <div className="bg-white dark:bg-[#13111c] rounded-xl shadow-sm border border-gray-200 dark:border-white/5 overflow-hidden">
        <TabsList className="px-6 pt-2 overflow-x-auto no-scrollbar">
            <TabsTrigger 
                active={activeTab === 'config'} 
                onClick={() => setActiveTab('config')}
                icon={<Sliders size={16} />}
            >
                General
            </TabsTrigger>
            <TabsTrigger 
                active={activeTab === 'email'} 
                onClick={() => setActiveTab('email')}
                icon={<Mail size={16} />}
            >
                Email
            </TabsTrigger>
            <TabsTrigger 
                active={activeTab === 'seo'} 
                onClick={() => setActiveTab('seo')}
                icon={<Search size={16} />}
            >
                SEO
            </TabsTrigger>
            <TabsTrigger 
                active={activeTab === 'lms'} 
                onClick={() => setActiveTab('lms')}
                icon={<BookOpen size={16} />}
            >
                LMS
            </TabsTrigger>
            <TabsTrigger 
                active={activeTab === 'marketplace'} 
                onClick={() => setActiveTab('marketplace')}
                icon={<Briefcase size={16} />}
            >
                Marketplace
            </TabsTrigger>
            <TabsTrigger 
                active={activeTab === 'finance'} 
                onClick={() => setActiveTab('finance')}
                icon={<Wallet size={16} />}
            >
                Finance
            </TabsTrigger>
            <TabsTrigger 
                active={activeTab === 'admins'} 
                onClick={() => setActiveTab('admins')}
                icon={<Shield size={16} />}
            >
                Admins
            </TabsTrigger>
        </TabsList>

        <div className="p-6 bg-gray-50 dark:bg-black/10">
            {activeTab === 'config' && <SettingsTab />}
            {activeTab === 'email' && <EmailSettingsTab />}
            {activeTab === 'seo' && <SeoSettingsTab />}
            {activeTab === 'lms' && <LMSSettingsTab />}
            {activeTab === 'marketplace' && <MarketplaceSettingsTab />}
            {activeTab === 'finance' && <FinanceSettingsTab />}
            {activeTab === 'admins' && <AdminManagementTab />}
        </div>
      </div>
    </div>
  );
};
