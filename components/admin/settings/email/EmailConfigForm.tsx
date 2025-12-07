
import React, { useState } from 'react';
import { mockDb, SystemSettings } from '@/data/mockDatabase';
import { Switch } from '../../../ui/Switch';
import { Button } from '../../../ui/Button';
import { Save, Send } from 'lucide-react';

export const EmailConfigForm = () => {
  const [settings, setSettings] = useState(mockDb.getSettings().email);
  const [isSaving, setIsSaving] = useState(false);
  const [isTesting, setIsTesting] = useState(false);

  const handleChange = (key: keyof typeof settings, value: any) => {
      setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
      setIsSaving(true);
      setTimeout(() => {
          mockDb.updateSettings({ email: settings });
          setIsSaving(false);
      }, 800);
  };

  const handleTest = () => {
      setIsTesting(true);
      setTimeout(() => {
          const currentUser = mockDb.auth.getCurrentUser();
          if (currentUser) {
              mockDb.sendTestEmail(currentUser.id);
              alert(`Test email sent to ${currentUser.email}. Check logs.`);
          } else {
              alert("No active user to send test email to.");
          }
          setIsTesting(false);
      }, 1000);
  };

  return (
    <div className="space-y-6 max-w-2xl">
        <div className="flex items-center justify-between gap-4 p-4 bg-gray-50 dark:bg-white/5 rounded-xl border border-gray-200 dark:border-white/10">
            <div>
                <p className="font-bold text-gray-900 dark:text-white">Enable Email Notifications</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Master switch for all outgoing system emails.</p>
            </div>
            <Switch checked={settings.enabled} onChange={(v) => handleChange('enabled', v)} />
        </div>

        <div className="grid grid-cols-2 gap-4">
            <div>
                <label className="text-xs font-bold text-gray-500 uppercase mb-2 block">SMTP Host</label>
                <input 
                    value={settings.smtpHost}
                    onChange={(e) => handleChange('smtpHost', e.target.value)}
                    className="w-full bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-4 py-2.5 text-sm dark:text-white"
                />
            </div>
            <div>
                <label className="text-xs font-bold text-gray-500 uppercase mb-2 block">Port</label>
                <input 
                    type="number"
                    value={settings.smtpPort}
                    onChange={(e) => handleChange('smtpPort', parseInt(e.target.value))}
                    className="w-full bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-4 py-2.5 text-sm dark:text-white"
                />
            </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
            <div>
                <label className="text-xs font-bold text-gray-500 uppercase mb-2 block">Username</label>
                <input 
                    value={settings.smtpUser}
                    onChange={(e) => handleChange('smtpUser', e.target.value)}
                    className="w-full bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-4 py-2.5 text-sm dark:text-white"
                />
            </div>
            <div>
                <label className="text-xs font-bold text-gray-500 uppercase mb-2 block">Password</label>
                <input 
                    type="password"
                    value={settings.smtpPass}
                    onChange={(e) => handleChange('smtpPass', e.target.value)}
                    className="w-full bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-4 py-2.5 text-sm dark:text-white"
                    placeholder="••••••••"
                />
            </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
            <div>
                <label className="text-xs font-bold text-gray-500 uppercase mb-2 block">From Name</label>
                <input 
                    value={settings.fromName}
                    onChange={(e) => handleChange('fromName', e.target.value)}
                    className="w-full bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-4 py-2.5 text-sm dark:text-white"
                />
            </div>
            <div>
                <label className="text-xs font-bold text-gray-500 uppercase mb-2 block">From Email</label>
                <input 
                    value={settings.fromEmail}
                    onChange={(e) => handleChange('fromEmail', e.target.value)}
                    className="w-full bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-4 py-2.5 text-sm dark:text-white"
                />
            </div>
        </div>

        <div>
            <label className="text-xs font-bold text-gray-500 uppercase mb-2 block">Security Protocol</label>
            <select 
                value={settings.security}
                onChange={(e) => handleChange('security', e.target.value)}
                className="w-full bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-4 py-2.5 text-sm dark:text-white focus:outline-none focus:ring-2 focus:ring-jambo-600"
            >
                <option value="STARTTLS">STARTTLS</option>
                <option value="SSL/TLS">SSL/TLS</option>
                <option value="NONE">None</option>
            </select>
        </div>

        <div className="flex gap-3 pt-4 border-t border-gray-100 dark:border-white/5">
            <Button onClick={handleSave} isLoading={isSaving} leftIcon={<Save size={16} />}>
                Save Configuration
            </Button>
            <Button variant="secondary" onClick={handleTest} isLoading={isTesting} leftIcon={<Send size={16} />}>
                Test Connection
            </Button>
        </div>
    </div>
  );
};
