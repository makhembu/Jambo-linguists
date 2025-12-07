
import React, { useState } from 'react';
import { mockDb, SystemSettings } from '../../../data/mockDatabase';
import { Switch } from '../../ui/Switch';
import { Briefcase, Settings2, Users } from 'lucide-react';
import { Card } from '../../ui/Card';

export const MarketplaceSettingsTab = () => {
  const [settings, setSettings] = useState<SystemSettings>(mockDb.getSettings());

  const handleChange = (key: keyof SystemSettings, value: any) => {
      const newSettings = { ...settings, [key]: value };
      setSettings(newSettings);
      mockDb.updateSettings({ [key]: value });
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        
        {/* Access & Workflow */}
        <Card className="p-6 h-fit">
            <div className="flex items-center gap-3 mb-6 border-b border-gray-100 dark:border-white/5 pb-4">
                <div className="p-2 bg-teal-100 dark:bg-teal-900/30 text-teal-600 rounded-lg">
                    <Briefcase size={20} />
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white">Workflow & Access</h3>
            </div>
            
            <div className="space-y-6">
                <div className="flex items-center justify-between gap-4">
                    <div>
                        <p className="font-bold text-sm text-gray-800 dark:text-gray-200">Marketplace Enabled</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            Linguists can browse 'Open' jobs. If disabled, only Admins can assign jobs.
                        </p>
                    </div>
                    <Switch checked={settings.marketplaceEnabled} onChange={(v) => handleChange('marketplaceEnabled', v)} />
                </div>

                <div className="flex items-center justify-between gap-4">
                    <div>
                        <p className="font-bold text-sm text-gray-800 dark:text-gray-200">Require Training Compliance</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            Linguists must complete mandatory training (e.g., GDPR) before viewing jobs.
                        </p>
                    </div>
                    <Switch checked={settings.jobAccessRequiresTraining} onChange={(v) => handleChange('jobAccessRequiresTraining', v)} />
                </div>

                <div className="flex items-center justify-between gap-4">
                    <div>
                        <p className="font-bold text-sm text-gray-800 dark:text-gray-200">Allow Self-Cancellation</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            Linguists can cancel accepted jobs >48h before start time.
                        </p>
                    </div>
                    <Switch checked={settings.allowLinguistCancellation} onChange={(v) => handleChange('allowLinguistCancellation', v)} />
                </div>
            </div>
        </Card>

        {/* Automation */}
        <Card className="p-6 h-fit">
            <div className="flex items-center gap-3 mb-6 border-b border-gray-100 dark:border-white/5 pb-4">
                <div className="p-2 bg-orange-100 dark:bg-orange-900/30 text-orange-600 rounded-lg">
                    <Settings2 size={20} />
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white">Automation Rules</h3>
            </div>
            
            <div className="space-y-6">
                <div>
                    <label className="font-bold text-sm text-gray-800 dark:text-gray-200 block mb-2">Auto-Assignment Logic</label>
                    <select 
                        value={settings.autoAssignment} 
                        onChange={(e) => handleChange('autoAssignment', e.target.value)}
                        className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-4 py-2 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-jambo-600"
                    >
                        <option value="none">Manual Approval (Default)</option>
                        <option value="first-come">First Come, First Served</option>
                        <option value="rating">Highest Rating Priority</option>
                    </select>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                        Determines how 'Open' jobs are filled when a linguist claims them. 'Manual' creates a request for Admin review.
                    </p>
                </div>
            </div>
        </Card>
    </div>
  );
};
