
import React, { useState } from 'react';
import { mockDb, SystemSettings } from '../../../data/mockDatabase';
import { Switch } from '../../ui/Switch';
import { CreditCard, PoundSterling } from 'lucide-react';
import { Card } from '../../ui/Card';

export const FinanceSettingsTab = () => {
  const [settings, setSettings] = useState<SystemSettings>(mockDb.getSettings());

  const handleChange = (key: keyof SystemSettings, value: any) => {
      const newSettings = { ...settings, [key]: value };
      setSettings(newSettings);
      mockDb.updateSettings({ [key]: value });
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <Card className="p-6 h-fit">
            <div className="flex items-center gap-3 mb-6 border-b border-gray-100 dark:border-white/5 pb-4">
                <div className="p-2 bg-green-100 dark:bg-green-900/30 text-green-600 rounded-lg">
                    <CreditCard size={20} />
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white">Invoicing & VAT</h3>
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

        <Card className="p-6 h-fit">
            <div className="flex items-center gap-3 mb-6 border-b border-gray-100 dark:border-white/5 pb-4">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-lg">
                    <PoundSterling size={20} />
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white">Payout Rules</h3>
            </div>
            
            <div className="space-y-6">
                <div className="flex items-center justify-between gap-4">
                    <div>
                        <p className="font-bold text-sm text-gray-800 dark:text-gray-200">Min. Payout Threshold (£)</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Minimum accrued balance required for automated payout run.</p>
                    </div>
                    <input 
                        type="number" 
                        value={settings.minPayoutThreshold}
                        onChange={(e) => handleChange('minPayoutThreshold', parseFloat(e.target.value))}
                        className="w-20 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-3 py-1.5 text-sm text-right focus:outline-none focus:ring-2 focus:ring-jambo-600"
                    />
                </div>

                <div className="flex items-center justify-between gap-4">
                    <div>
                        <p className="font-bold text-sm text-gray-800 dark:text-gray-200">Payment Release Delay (Days)</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Days to hold funds after invoice approval before release.</p>
                    </div>
                    <input 
                        type="number" 
                        value={settings.paymentReleaseDelay}
                        onChange={(e) => handleChange('paymentReleaseDelay', parseFloat(e.target.value))}
                        className="w-20 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-3 py-1.5 text-sm text-right focus:outline-none focus:ring-2 focus:ring-jambo-600"
                    />
                </div>

                <div className="flex items-center justify-between gap-4">
                    <div>
                        <p className="font-bold text-sm text-gray-800 dark:text-gray-200">Platform Fee (%)</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Percentage deducted from linguist payout.</p>
                    </div>
                    <input 
                        type="number" 
                        value={settings.platformFeePercent}
                        onChange={(e) => handleChange('platformFeePercent', parseFloat(e.target.value))}
                        className="w-20 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-3 py-1.5 text-sm text-right focus:outline-none focus:ring-2 focus:ring-jambo-600"
                    />
                </div>
            </div>
        </Card>
    </div>
  );
};
