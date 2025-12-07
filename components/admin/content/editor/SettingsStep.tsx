
import React, { useState, useEffect } from 'react';
import { Course } from '@/data/types';
import { mockDb } from '@/data/mockDatabase';
import { Switch } from '../../../ui/Switch';
import { Settings, Lock, Bell, Award, BookOpen, GraduationCap } from 'lucide-react';
import { Fieldset } from '../../jobs/add-job/Fieldset';

interface SettingsStepProps {
  data: Partial<Course>;
  onChange: (data: Partial<Course>) => void;
}

export const SettingsStep = ({ data, onChange }: SettingsStepProps) => {
  const [allCourses, setAllCourses] = useState<Course[]>([]);
  const settings = data.settings || {
      visibility: 'Hidden',
      allowReenrollment: false,
      requirePrerequisites: false,
      prerequisites: [],
      passingScore: 80,
      autoIssueCertificate: true,
      notifications: {}
  };

  useEffect(() => {
      // Fetch courses for prerequisites, excluding self if exists
      setAllCourses(mockDb.getCourses().filter(c => c.id !== data.id));
  }, [data.id]);

  const updateSetting = (key: string, value: any) => {
      onChange({
          settings: {
              ...settings,
              [key]: value
          }
      });
  };

  const updateNotification = (key: string, value: boolean) => {
      onChange({
          settings: {
              ...settings,
              notifications: {
                  ...settings.notifications,
                  [key]: value
              }
          }
      });
  };

  const togglePrerequisite = (courseId: string) => {
      const current = settings.prerequisites || [];
      const updated = current.includes(courseId)
          ? current.filter(id => id !== courseId)
          : [...current, courseId];
      updateSetting('prerequisites', updated);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-in fade-in duration-300 pb-12">
        <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">Local Configuration</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Settings specific to this course module.</p>
        </div>

        <Fieldset title="Access & Enrollment" icon={Lock}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-xs font-bold uppercase text-gray-500 mb-2">Visibility</label>
                    <select 
                        value={settings.visibility}
                        onChange={(e) => updateSetting('visibility', e.target.value)}
                        className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-jambo-600 transition-all"
                    >
                        <option value="Public">Public</option>
                        <option value="Invite-Only">Invite-Only</option>
                        <option value="Hidden">Hidden (Draft)</option>
                    </select>
                </div>
                <div>
                    <label className="block text-xs font-bold uppercase text-gray-500 mb-2">Max Enrollments</label>
                    <input 
                        type="number"
                        value={settings.maxEnrollment || ''}
                        onChange={(e) => updateSetting('maxEnrollment', e.target.value ? parseInt(e.target.value) : undefined)}
                        placeholder="Unlimited"
                        className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-jambo-600 transition-all"
                    />
                </div>
            </div>

            <div className="flex items-center justify-between gap-4 p-3 rounded-lg border border-gray-100 dark:border-white/5 bg-gray-50/50 dark:bg-white/5">
                <div>
                    <p className="font-bold text-sm text-gray-800 dark:text-gray-200">Allow Re-enrollment</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">User can retake course after completion.</p>
                </div>
                <Switch checked={settings.allowReenrollment} onChange={(v) => updateSetting('allowReenrollment', v)} />
            </div>
        </Fieldset>

        <Fieldset title="Prerequisites" icon={BookOpen}>
            <div className="flex items-center justify-between gap-4 mb-4">
                <div>
                    <p className="font-bold text-sm text-gray-800 dark:text-gray-200">Require Prerequisites</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">User must complete specific courses before enrolling.</p>
                </div>
                <Switch checked={!!settings.requirePrerequisites} onChange={(v) => updateSetting('requirePrerequisites', v)} />
            </div>

            {settings.requirePrerequisites && (
                <div className="bg-gray-50 dark:bg-white/5 rounded-xl border border-gray-200 dark:border-white/10 p-4 max-h-60 overflow-y-auto custom-scrollbar">
                    {allCourses.length === 0 ? (
                        <p className="text-sm text-gray-400 italic">No other courses available.</p>
                    ) : (
                        allCourses.map(c => (
                            <label key={c.id} className="flex items-center gap-3 p-2 hover:bg-gray-100 dark:hover:bg-white/5 rounded-lg cursor-pointer transition-colors">
                                <input 
                                    type="checkbox"
                                    checked={settings.prerequisites?.includes(c.id) || false}
                                    onChange={() => togglePrerequisite(c.id)}
                                    className="rounded text-jambo-600 focus:ring-jambo-500 w-4 h-4"
                                />
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{c.title}</span>
                            </label>
                        ))
                    )}
                </div>
            )}
        </Fieldset>

        <Fieldset title="Assessment Rules" icon={GraduationCap}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
                <div>
                    <label className="block text-xs font-bold uppercase text-gray-500 mb-2">Passing Score (%)</label>
                    <input 
                        type="number"
                        min="0"
                        max="100"
                        value={settings.passingScore}
                        onChange={(e) => updateSetting('passingScore', parseInt(e.target.value))}
                        className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-jambo-600 transition-all font-mono"
                    />
                </div>
                <div className="flex items-center justify-between gap-4 p-3 rounded-lg border border-gray-100 dark:border-white/5 bg-gray-50/50 dark:bg-white/5 h-fit">
                    <div>
                        <p className="font-bold text-sm text-gray-800 dark:text-gray-200">Auto-issue Certificate</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Generate PDF upon passing.</p>
                    </div>
                    <Switch checked={settings.autoIssueCertificate} onChange={(v) => updateSetting('autoIssueCertificate', v)} />
                </div>
            </div>
        </Fieldset>

        <Fieldset title="Notifications" icon={Bell}>
            <div className="space-y-3">
                {[
                    { key: 'onLessonPublish', label: 'New Lesson Published', desc: 'Notify enrolled users when new content is added.' },
                    { key: 'onAssignmentGraded', label: 'Assignment Graded', desc: 'Notify user when instructor grades a submission.' },
                    { key: 'onComplete', label: 'Completion Achieved', desc: 'Notify user and admins upon course completion.' },
                    { key: 'onEnroll', label: 'New Enrollment', desc: 'Notify instructor when a user enrolls.' },
                ].map(item => (
                    <div key={item.key} className="flex items-center justify-between gap-4 p-2">
                        <div>
                            <p className="font-bold text-sm text-gray-800 dark:text-gray-200">{item.label}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">{item.desc}</p>
                        </div>
                        <Switch 
                            checked={!!settings.notifications?.[item.key as keyof typeof settings.notifications]} 
                            onChange={(v) => updateNotification(item.key, v)} 
                        />
                    </div>
                ))}
            </div>
        </Fieldset>
    </div>
  );
};
