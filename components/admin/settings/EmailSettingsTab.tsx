
import React, { useState } from 'react';
import { EmailConfigForm } from './email/EmailConfigForm';
import { EmailTemplateEditor } from './email/EmailTemplateEditor';
import { EmailLogsTable } from './email/EmailLogsTable';
import { Card } from '../../ui/Card';
import { Settings, FileText, Activity } from 'lucide-react';

export const EmailSettingsTab = () => {
  const [view, setView] = useState<'config' | 'templates' | 'logs'>('config');

  return (
    <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        {/* Sub-Navigation */}
        <div className="xl:col-span-1 space-y-2">
            <button 
                onClick={() => setView('config')}
                className={`w-full text-left px-4 py-3 rounded-xl font-bold text-sm flex items-center gap-3 transition-colors ${view === 'config' ? 'bg-jambo-600 text-white shadow-md' : 'bg-white dark:bg-white/5 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/10'}`}
            >
                <Settings size={18} /> Configuration
            </button>
            <button 
                onClick={() => setView('templates')}
                className={`w-full text-left px-4 py-3 rounded-xl font-bold text-sm flex items-center gap-3 transition-colors ${view === 'templates' ? 'bg-jambo-600 text-white shadow-md' : 'bg-white dark:bg-white/5 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/10'}`}
            >
                <FileText size={18} /> Templates
            </button>
            <button 
                onClick={() => setView('logs')}
                className={`w-full text-left px-4 py-3 rounded-xl font-bold text-sm flex items-center gap-3 transition-colors ${view === 'logs' ? 'bg-jambo-600 text-white shadow-md' : 'bg-white dark:bg-white/5 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/10'}`}
            >
                <Activity size={18} /> Logs
            </button>
        </div>

        {/* Content */}
        <div className="xl:col-span-3">
            {view === 'config' && (
                <Card className="p-6 bg-white dark:bg-[#13111c]">
                    <div className="mb-6 pb-4 border-b border-gray-100 dark:border-white/5">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">SMTP Configuration</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Configure outbound email settings for notifications.</p>
                    </div>
                    <EmailConfigForm />
                </Card>
            )}

            {view === 'templates' && (
                <Card className="p-6 bg-white dark:bg-[#13111c]">
                    <div className="mb-6 pb-4 border-b border-gray-100 dark:border-white/5">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">Email Templates</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Customize the subject and body of automated emails.</p>
                    </div>
                    <EmailTemplateEditor />
                </Card>
            )}

            {view === 'logs' && (
                <Card className="p-0 bg-white dark:bg-[#13111c] overflow-hidden">
                    <div className="p-6 pb-4 border-b border-gray-100 dark:border-white/5">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">Email Audit Log</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">History of all system-generated emails.</p>
                    </div>
                    <EmailLogsTable />
                </Card>
            )}
        </div>
    </div>
  );
};
