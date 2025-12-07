



import React from 'react';
import { Course } from '../../../../data/types';
import { mockDb } from '../../../../data/mockDatabase';
import { ImageUploadField } from '../../users/add-user/ImageUploadField';
import { Image as ImageIcon, Info, Lock } from 'lucide-react';
import { Switch } from '../../../ui/Switch';

interface BasicInfoStepProps {
  data: Partial<Course>;
  onChange: (data: Partial<Course>) => void;
}

export const BasicInfoStep = ({ data, onChange }: BasicInfoStepProps) => {
  const globalSettings = mockDb.getSettings();
  const globalEnrollEnabled = globalSettings.globalSelfEnrollment;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      onChange({ [name]: value });
  };

  const handleGoalsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      // Split by newlines to create array
      const goals = e.target.value.split('\n').filter(s => s.trim() !== '');
      onChange({ learningGoals: goals });
  };

  const handleImageChange = (file: File) => {
      const url = URL.createObjectURL(file);
      onChange({ thumbnailUrl: url });
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in duration-300">
        <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">Course Details</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">The basic information displayed on the course card.</p>
        </div>

        <div className="space-y-6">
            <div>
                <label className="block text-xs font-bold uppercase text-gray-500 mb-2">Course Title</label>
                <input 
                    name="title"
                    value={data.title}
                    onChange={handleInputChange}
                    className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 font-bold text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-jambo-600 transition-all"
                    placeholder="e.g. Advanced Medical Interpreting"
                />
            </div>

            {/* Self Enrollment Toggle */}
            <div className={`p-4 rounded-xl border flex items-center justify-between gap-4 ${!globalEnrollEnabled ? 'bg-gray-100 dark:bg-white/5 border-gray-200 dark:border-white/5 opacity-75' : 'bg-blue-50 dark:bg-blue-900/10 border-blue-100 dark:border-blue-800'}`}>
                <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                        <p className="font-bold text-sm text-gray-900 dark:text-white">Allow Self-Enrollment</p>
                        {!globalEnrollEnabled && <Lock size={14} className="text-gray-400" />}
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                        {globalEnrollEnabled 
                            ? "Linguists can join this course from their dashboard without approval." 
                            : "Globally disabled in System Settings. Admins must manually enroll users."}
                    </p>
                </div>
                <Switch 
                    checked={data.allowSelfEnrollment || false} 
                    onChange={(v) => onChange({ allowSelfEnrollment: v })} 
                    disabled={!globalEnrollEnabled}
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-xs font-bold uppercase text-gray-500 mb-2">Category</label>
                    <select 
                        name="category"
                        value={data.category}
                        onChange={handleInputChange}
                        className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-jambo-600 transition-all"
                    >
                        <option value="General">General</option>
                        <option value="Technical">Technical</option>
                        <option value="Language">Language</option>
                        <option value="Soft Skills">Soft Skills</option>
                        <option value="Compliance">Compliance</option>
                    </select>
                </div>
                <div>
                    <label className="block text-xs font-bold uppercase text-gray-500 mb-2">Estimated Duration</label>
                    <input 
                        name="duration"
                        value={data.duration}
                        onChange={handleInputChange}
                        className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-jambo-600 transition-all"
                        placeholder="e.g. 2h 30m"
                    />
                </div>
            </div>

            <div>
                <label className="block text-xs font-bold uppercase text-gray-500 mb-2">Description</label>
                <textarea 
                    name="description"
                    value={data.description}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-jambo-600 transition-all resize-none"
                    placeholder="A brief overview of what this course covers..."
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-xs font-bold uppercase text-gray-500 mb-2">Instructor Name</label>
                    <input 
                        name="instructor"
                        value={data.instructor}
                        onChange={handleInputChange}
                        className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-jambo-600 transition-all"
                    />
                </div>
                <div>
                    <label className="block text-xs font-bold uppercase text-gray-500 mb-2">Instructor Role</label>
                    <input 
                        name="instructorRole"
                        value={data.instructorRole}
                        onChange={handleInputChange}
                        className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-jambo-600 transition-all"
                    />
                </div>
            </div>

            <div>
                <label className="block text-xs font-bold uppercase text-gray-500 mb-2">Learning Goals (One per line)</label>
                <textarea 
                    defaultValue={data.learningGoals?.join('\n')}
                    onBlur={handleGoalsChange}
                    rows={4}
                    className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-jambo-600 transition-all resize-none"
                    placeholder="Understand the basics of...&#10;Identify key terms..."
                />
            </div>

            <div className="pt-6 border-t border-gray-100 dark:border-white/5">
                <ImageUploadField 
                    label="Course Thumbnail" 
                    icon={<ImageIcon size={32} />} 
                    previewUrl={data.thumbnailUrl || null} 
                    onFileChange={handleImageChange} 
                />
            </div>
        </div>
    </div>
  );
};