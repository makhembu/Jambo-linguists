
import React, { useState } from 'react';
import { mockDb, SystemSettings } from '../../../data/mockDatabase';
import { Switch } from '../../ui/Switch';
import { BookOpen, GraduationCap, Lock } from 'lucide-react';
import { Card } from '../../ui/Card';

export const LMSSettingsTab = () => {
  const [settings, setSettings] = useState<SystemSettings>(mockDb.getSettings());

  const handleChange = (key: keyof SystemSettings, value: any) => {
      const newSettings = { ...settings, [key]: value };
      setSettings(newSettings);
      mockDb.updateSettings({ [key]: value });
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        
        {/* Enrollment Rules */}
        <Card className="p-6 h-fit">
            <div className="flex items-center gap-3 mb-6 border-b border-gray-100 dark:border-white/5 pb-4">
                <div className="p-2 bg-purple-100 dark:bg-purple-900/30 text-purple-600 rounded-lg">
                    <BookOpen size={20} />
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white">Enrollment Configuration</h3>
            </div>
            
            <div className="space-y-6">
                <div className="flex items-center justify-between gap-4">
                    <div>
                        <p className="font-bold text-sm text-gray-800 dark:text-gray-200">Global Self-Enrollment</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            Master switch. If OFF, linguists cannot enroll in ANY course, regardless of course-level settings.
                        </p>
                    </div>
                    <Switch checked={settings.globalSelfEnrollment} onChange={(v) => handleChange('globalSelfEnrollment', v)} />
                </div>
                
                <div className="flex items-center justify-between gap-4">
                    <div>
                        <p className="font-bold text-sm text-gray-800 dark:text-gray-200">Require Prerequisites</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Enforce course dependencies (if defined) before allowing enrollment.</p>
                    </div>
                    <Switch checked={settings.requirePrerequisites} onChange={(v) => handleChange('requirePrerequisites', v)} />
                </div>
            </div>
        </Card>

        {/* Instructor & Access */}
        <Card className="p-6 h-fit">
            <div className="flex items-center gap-3 mb-6 border-b border-gray-100 dark:border-white/5 pb-4">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-lg">
                    <GraduationCap size={20} />
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white">Instructor Privileges</h3>
            </div>
            
            <div className="space-y-6">
                <div className="flex items-center justify-between gap-4">
                    <div>
                        <p className="font-bold text-sm text-gray-800 dark:text-gray-200">Instructor Course Creation</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Allow users with 'Trainer' or 'Instructor' role to draft new courses without Admin approval.</p>
                    </div>
                    <Switch checked={settings.allowInstructorCourseCreation} onChange={(v) => handleChange('allowInstructorCourseCreation', v)} />
                </div>
                
                <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 flex gap-3 text-yellow-800 dark:text-yellow-200">
                    <Lock size={18} className="shrink-0 mt-0.5" />
                    <div>
                        <p className="font-bold text-xs">Note on Deletion</p>
                        <p className="text-xs opacity-90 mt-1">For security, only Super Admins can permanently delete courses with active enrollments.</p>
                    </div>
                </div>
            </div>
        </Card>
    </div>
  );
};
