
import React, { useState, useEffect } from 'react';
import { mockDb } from '@/data/mockDatabase';
import { Course, Lesson } from '@/data/types';
import { EditorSidebar } from './editor/EditorSidebar';
import { BasicInfoStep } from './editor/BasicInfoStep';
import { CurriculumStep } from './editor/CurriculumStep';
import { SettingsStep } from './editor/SettingsStep';
import { Save, X, Eye } from 'lucide-react';
import { Button } from '../../ui/Button';

interface CourseEditorProps {
  courseId: string | null;
  onSave: () => void;
  onCancel: () => void;
}

export const CourseEditor = ({ courseId, onSave, onCancel }: CourseEditorProps) => {
  const [activeStep, setActiveStep] = useState<'info' | 'curriculum' | 'settings'>('info');
  const [isSaving, setIsSaving] = useState(false);

  // --- COURSE STATE ---
  const [courseData, setCourseData] = useState<Partial<Course>>({
      title: '',
      description: '',
      category: 'General',
      duration: '0m',
      instructor: 'Jambo Training',
      learningGoals: [],
      thumbnailUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=600',
      settings: {
          visibility: 'Hidden',
          allowReenrollment: true,
          passingScore: 80,
          autoIssueCertificate: true,
          notifications: { onEnroll: true, onComplete: true }
      }
  });

  // --- LESSONS STATE ---
  const [lessons, setLessons] = useState<Lesson[]>([]);

  // Load existing data if editing
  useEffect(() => {
      if (courseId) {
          const course = mockDb.getCourse(courseId);
          const courseLessons = mockDb.getLessons(courseId);
          if (course) setCourseData(course);
          if (courseLessons) setLessons(courseLessons);
      }
  }, [courseId]);

  const handleSaveCourse = () => {
      // Basic Validation
      if (!courseData.title) {
          alert('Course title is required.');
          return;
      }
      
      setIsSaving(true);
      setTimeout(() => {
          mockDb.adminSaveCourse(courseData, lessons);
          setIsSaving(false);
          onSave();
      }, 1000);
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-[#1a1625] rounded-xl shadow-xl overflow-hidden border border-gray-200 dark:border-white/5 animate-in fade-in slide-in-from-bottom-4 duration-300">
        
        {/* HEADER */}
        <div className="h-16 border-b border-gray-100 dark:border-white/5 flex items-center justify-between px-4 md:px-6 bg-gray-50/50 dark:bg-white/5 shrink-0">
            <h2 className="text-base md:text-lg font-bold text-gray-900 dark:text-white truncate pr-2">
                {courseId ? `Editing: ${courseData.title}` : 'Create New Course'}
            </h2>
            <div className="flex items-center gap-2 shrink-0">
                <Button variant="ghost" size="sm" onClick={(e) => { e.preventDefault(); onCancel(); }} className="hidden sm:flex">
                    <X size={16} /> Cancel
                </Button>
                <button onClick={(e) => { e.preventDefault(); onCancel(); }} className="sm:hidden p-2 text-gray-500 hover:bg-gray-100 rounded-lg">
                    <X size={20} />
                </button>
                <Button variant="primary" size="sm" onClick={handleSaveCourse} isLoading={isSaving}>
                    <Save size={16} /> <span className="hidden sm:inline">Save Course</span><span className="sm:hidden">Save</span>
                </Button>
            </div>
        </div>

        {/* MAIN BODY */}
        <div className="flex flex-col lg:flex-row flex-1 overflow-hidden">
            {/* Sidebar / Top Navigation */}
            <div className="w-full lg:w-64 border-b lg:border-b-0 lg:border-r border-gray-100 dark:border-white/5 bg-gray-50 dark:bg-[#13111c] shrink-0">
                <EditorSidebar activeStep={activeStep} onChangeStep={setActiveStep} />
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto custom-scrollbar p-4 md:p-8 bg-white dark:bg-[#1a1625]">
                {activeStep === 'info' && (
                    <BasicInfoStep 
                        data={courseData} 
                        onChange={(d) => setCourseData(prev => ({...prev, ...d}))} 
                    />
                )}
                {activeStep === 'curriculum' && (
                    <CurriculumStep 
                        lessons={lessons} 
                        setLessons={setLessons} 
                    />
                )}
                {activeStep === 'settings' && (
                    <SettingsStep 
                        data={courseData}
                        onChange={(d) => setCourseData(prev => ({...prev, ...d}))}
                    />
                )}
            </div>
        </div>
    </div>
  );
};