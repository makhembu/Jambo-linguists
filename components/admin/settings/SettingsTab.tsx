
import React, { useState, useEffect } from 'react';
import { mockDb, SystemSettings } from '@/data/mockDatabase';
import { Switch } from '../../ui/Switch';
import { UserPlus, ShieldAlert, ShoppingBag, CreditCard, BookOpen, AlertTriangle } from 'lucide-react';
import { Card } from '../../ui/Card';

export const SettingsTab = () => {
  const [settings, setSettings] = useState<SystemSettings>(mockDb.getSettings());
  const [hasChanges, setHasChanges] = useState(false);

  const handleChange = (key: keyof SystemSettings, value: any) => {
      const newSettings = { ...settings, [key]: value };
      setSettings(newSettings);
      setHasChanges(true);
      // Auto-save logic can be implemented here, or explicit save button.
      // For immediate feedback UX, let's auto-save to mockDb
      mockDb.updateSettings({ [key]: value });
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        
        {/* User Registration & Onboarding */}
        <Card className="p-6 h-fit">
            <div className="flex items-center gap-3 mb-6 border-b border-gray-100 dark:border-white/5 pb-4">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-lg">
                    <UserPlus size={20} />
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white">Registration & Access</h3>
            </div>
            
            <div className="space-y-6">
                <div className="flex items-center justify-between gap-4">
                    <div>
                        <p className="font-bold text-sm text-gray-800 dark:text-gray-200">Allow New Registrations</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">If disabled, the sign-up page will reject new users.</p>
                    </div>
                    <Switch checked={settings.registrationsOpen} onChange={(v) => handleChange('registrationsOpen', v)} />
                </div>
                
                <div className="flex items-center justify-between gap-4">
                    <div>
                        <p className="font-bold text-sm text-gray-800 dark:text-gray-200">Manual Verification Required</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">New accounts must be approved by an admin before accessing jobs.</p>
                    </div>
                    <Switch checked={settings.requireManualVerification} onChange={(v) => handleChange('requireManualVerification', v)} />
                </div>
            </div>
        </Card>

        {/* Marketplace & Operations */}
        <Card className="p-6 h-fit">
            <div className="flex items-center gap-3 mb-6 border-b border-gray-100 dark:border-white/5 pb-4">
                <div className="p-2 bg-purple-100 dark:bg-purple-900/30 text-purple-600 rounded-lg">
                    <ShoppingBag size={20} />
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white">Marketplace Operations</h3>
            </div>
            
            <div className="space-y-6">
                <div className="flex items-center justify-between gap-4">
                    <div>
                        <p className="font-bold text-sm text-gray-800 dark:text-gray-200">Marketplace Enabled</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Linguists can browse and claim 'Open' jobs. If disabled, only Admins can assign jobs.</p>
                    </div>
                    <Switch checked={settings.marketplaceEnabled} onChange={(v) => handleChange('marketplaceEnabled', v)} />
                </div>

                <div className="flex items-center justify-between gap-4">
                    <div>
                        <p className="font-bold text-sm text-gray-800 dark:text-gray-200">System Maintenance Mode</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Shows a maintenance screen to all non-admin users.</p>
                    </div>
                    <Switch checked={settings.maintenanceMode} onChange={(v) => handleChange('maintenanceMode', v)} />
                </div>
            </div>
        </Card>

        {/* Finance Configuration */}
        <Card className="p-6 h-fit">
            <div className="flex items-center gap-3 mb-6 border-b border-gray-100 dark:border-white/5 pb-4">
                <div className="p-2 bg-green-100 dark:bg-green-900/30 text-green-600 rounded-lg">
                    <CreditCard size={20} />
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white">Finance Defaults</h3>
            </div>
            
            <div className="space-y-6">
                <div className="flex items-center justify-between gap-4">
                    <div>
                        <p className="font-bold text-sm text-gray-800 dark:text-gray-200">Auto-Generate Invoices</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Automatically create draft invoices upon job completion.</p>
                    </div>
                    <Switch checked={settings.autoInvoiceGeneration} onChange={(v) => handleChange('autoInvoiceGeneration', v)} />
                </div>

                <div className="flex items-center justify-between gap-4">
                    <div>
                        <p className="font-bold text-sm text-gray-800 dark:text-gray-200">Default VAT Rate (%)</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Applied to all new generated invoices.</p>
                    </div>
                    <input 
                        type="number" 
                        value={settings.defaultVatRate}
                        onChange={(e) => handleChange('defaultVatRate', parseFloat(e.target.value))}
                        className="w-20 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-3 py-1.5 text-sm text-right focus:outline-none focus:ring-2 focus:ring-jambo-600"
                    />
                </div>
            </div>
        </Card>

        {/* LMS / Training */}
        <Card className="p-6 h-fit">
            <div className="flex items-center gap-3 mb-6 border-b border-gray-100 dark:border-white/5 pb-4">
                <div className="p-2 bg-orange-100 dark:bg-orange-900/30 text-orange-600 rounded-lg">
                    <BookOpen size={20} />
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white">Learning Management (LMS)</h3>
            </div>
            
            <div className="space-y-6">
                <div className="flex items-center justify-between gap-4">
                    <div>
                        <p className="font-bold text-sm text-gray-800 dark:text-gray-200">Instructor Course Creation</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Allow users with 'Trainer' role to add new courses without Admin approval.</p>
                    </div>
                    <Switch checked={settings.allowInstructorCourseCreation} onChange={(v) => handleChange('allowInstructorCourseCreation', v)} />
                </div>
            </div>
        </Card>

    </div>
  );
};
