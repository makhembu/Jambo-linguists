
import React, { useState } from 'react';
import { Bell, Briefcase, Mail, BookOpen } from 'lucide-react';
import { mockDb } from '../../../../data/mockDatabase';
import { Switch } from '../../../../components/ui/Switch';
import { NotificationPreferences } from '../../../../data/types';

export const ProfileSettings = () => {
  const user = mockDb.auth.getCurrentUser();
  const [prefs, setPrefs] = useState<NotificationPreferences>(user?.notificationPreferences || {
      emailUpdates: true,
      jobAlerts: true,
      courseReminders: true,
      marketing: false
  });

  const handleToggle = (key: keyof NotificationPreferences, value: boolean) => {
      const newPrefs = { ...prefs, [key]: value };
      setPrefs(newPrefs);
      mockDb.auth.updateProfile({ notificationPreferences: newPrefs });
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
        <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Notification Preferences</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Manage how and when you receive updates from Jambo Portal.</p>
        </div>

        <div className="bg-white dark:bg-white/5 rounded-xl border border-gray-200 dark:border-white/10 overflow-hidden divide-y divide-gray-100 dark:divide-white/5">
            <div className="p-4 sm:p-6 flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-blue-50 dark:bg-blue-900/20 text-blue-600 rounded-full">
                        <Mail size={20} />
                    </div>
                    <div>
                        <p className="font-bold text-gray-900 dark:text-white text-sm">Email Updates</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Receive critical system emails and support responses.</p>
                    </div>
                </div>
                <Switch checked={prefs.emailUpdates} onChange={(v) => handleToggle('emailUpdates', v)} />
            </div>

            <div className="p-4 sm:p-6 flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-teal-50 dark:bg-teal-900/20 text-brand-teal rounded-full">
                        <Briefcase size={20} />
                    </div>
                    <div>
                        <p className="font-bold text-gray-900 dark:text-white text-sm">Job Alerts</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Notify me when new assignments match my profile.</p>
                    </div>
                </div>
                <Switch checked={prefs.jobAlerts} onChange={(v) => handleToggle('jobAlerts', v)} />
            </div>

            <div className="p-4 sm:p-6 flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-purple-50 dark:bg-purple-900/20 text-jambo-600 rounded-full">
                        <BookOpen size={20} />
                    </div>
                    <div>
                        <p className="font-bold text-gray-900 dark:text-white text-sm">LMS & Training</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Reminders for course deadlines and certificate availability.</p>
                    </div>
                </div>
                <Switch checked={prefs.courseReminders} onChange={(v) => handleToggle('courseReminders', v)} />
            </div>

            <div className="p-4 sm:p-6 flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-orange-50 dark:bg-orange-900/20 text-brand-orange rounded-full">
                        <Bell size={20} />
                    </div>
                    <div>
                        <p className="font-bold text-gray-900 dark:text-white text-sm">Marketing & News</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Stay updated with Jambo news and community events.</p>
                    </div>
                </div>
                <Switch checked={prefs.marketing} onChange={(v) => handleToggle('marketing', v)} />
            </div>
        </div>
    </div>
  );
};
