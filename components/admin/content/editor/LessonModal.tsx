
import React, { useState, useEffect } from 'react';
import { Lesson, LessonType } from '@/data/types';
import { Modal } from '../../../ui/Modal';
import { Button } from '../../../ui/Button';
import { PlayCircle, FileText, LayoutTemplate, HelpCircle, X, CheckCircle, Lock } from 'lucide-react';
import { QuizBuilder } from './QuizBuilder';

interface LessonModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (lesson: Lesson) => void;
  initialData: Lesson | null;
  defaultModule: string;
}

export const LessonModal = ({ isOpen, onClose, onSave, initialData, defaultModule }: LessonModalProps) => {
  const [lessonData, setLessonData] = useState<Partial<Lesson>>({
      title: '',
      module: defaultModule,
      type: 'Video',
      duration: '',
      contentUrl: '',
      description: '',
      transcript: '',
      quizData: []
  });

  useEffect(() => {
      if (initialData) {
          setLessonData(initialData);
      } else {
          // Generate a temp ID for key purposes and ensure module is set
          setLessonData(prev => ({ 
              ...prev, 
              id: `temp-${Date.now()}`,
              module: defaultModule // Enforce parent module
          }));
      }
  }, [initialData, defaultModule]);

  const handleChange = (field: keyof Lesson, value: any) => {
      setLessonData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
      if (!lessonData.title) {
          alert("Title is required");
          return;
      }
      onSave(lessonData as Lesson);
  };

  const types: { id: LessonType, icon: any, label: string }[] = [
      { id: 'Video', icon: PlayCircle, label: 'Video Lesson' },
      { id: 'Document', icon: FileText, label: 'PDF Document' },
      { id: 'Slide', icon: LayoutTemplate, label: 'Slide Deck' },
      { id: 'Quiz', icon: HelpCircle, label: 'Quiz' },
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="4xl" showCloseButton>
        <div className="flex flex-col h-[85vh] bg-white dark:bg-[#1a1625]">
            <div className="p-4 md:p-6 border-b border-gray-100 dark:border-white/5 bg-gray-50/50 dark:bg-white/5 flex justify-between items-center shrink-0">
                <div>
                    <h2 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white">
                        {initialData ? 'Edit Lesson' : 'Add New Lesson'}
                    </h2>
                    <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                        Adding to: <span className="font-bold text-jambo-600 dark:text-jambo-400 bg-jambo-50 dark:bg-white/10 px-1.5 py-0.5 rounded truncate max-w-[200px]">{defaultModule}</span>
                    </p>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar p-4 md:p-6 space-y-6">
                
                {/* Type Selection */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                    {types.map(t => (
                        <button
                            key={t.id}
                            onClick={() => handleChange('type', t.id)}
                            className={`p-3 md:p-4 rounded-xl border flex flex-col items-center gap-2 md:gap-3 transition-all relative overflow-hidden ${
                                lessonData.type === t.id 
                                ? 'bg-jambo-50 border-jambo-600 text-jambo-700 dark:bg-jambo-900/30 dark:text-jambo-300 dark:border-jambo-500 shadow-sm' 
                                : 'bg-white dark:bg-white/5 border-gray-200 dark:border-white/10 text-gray-500 hover:bg-gray-50 dark:hover:bg-white/10'
                            }`}
                        >
                            <t.icon size={20} className="md:w-6 md:h-6" />
                            <span className="text-[10px] md:text-xs font-bold uppercase tracking-wide text-center">{t.label}</span>
                            {lessonData.type === t.id && (
                                <div className="absolute top-2 right-2 text-jambo-600 dark:text-jambo-400">
                                    <CheckCircle size={14} className="fill-current text-white dark:text-black" />
                                </div>
                            )}
                        </button>
                    ))}
                </div>

                {/* Common Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    <div>
                        <label className="text-xs font-bold text-gray-500 uppercase mb-2 block">Lesson Title</label>
                        <input 
                            className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-4 py-2.5 text-sm dark:text-white focus:outline-none focus:ring-2 focus:ring-jambo-600"
                            value={lessonData.title}
                            onChange={(e) => handleChange('title', e.target.value)}
                            placeholder="e.g. Introduction to Key Concepts"
                            autoFocus
                        />
                    </div>
                    <div>
                        <label className="text-xs font-bold text-gray-500 uppercase mb-2 block flex items-center gap-1">
                            Module <Lock size={12} className="text-gray-400" />
                        </label>
                        <input 
                            className="w-full bg-gray-100 dark:bg-black/20 border border-transparent rounded-lg px-4 py-2.5 text-sm text-gray-500 dark:text-gray-400 cursor-not-allowed"
                            value={defaultModule}
                            readOnly
                            title="Module is managed in the curriculum view"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    <div>
                        <label className="text-xs font-bold text-gray-500 uppercase mb-2 block">Duration</label>
                        <input 
                            className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-4 py-2.5 text-sm dark:text-white focus:outline-none focus:ring-2 focus:ring-jambo-600"
                            value={lessonData.duration}
                            onChange={(e) => handleChange('duration', e.target.value)}
                            placeholder="e.g. 15 min"
                        />
                    </div>
                    <div>
                        {lessonData.type !== 'Quiz' && (
                            <>
                                <label className="text-xs font-bold text-gray-500 uppercase mb-2 block">Content URL</label>
                                <input 
                                    className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-4 py-2.5 text-sm dark:text-white focus:outline-none focus:ring-2 focus:ring-jambo-600"
                                    value={lessonData.contentUrl || ''}
                                    onChange={(e) => handleChange('contentUrl', e.target.value)}
                                    placeholder={lessonData.type === 'Video' ? "https://example.com/video.mp4" : "https://example.com/doc.pdf"}
                                />
                            </>
                        )}
                    </div>
                </div>

                <div>
                    <label className="text-xs font-bold text-gray-500 uppercase mb-2 block">Description / Instructions</label>
                    <textarea 
                        className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-4 py-2.5 text-sm dark:text-white focus:outline-none focus:ring-2 focus:ring-jambo-600"
                        rows={3}
                        value={lessonData.description || ''}
                        onChange={(e) => handleChange('description', e.target.value)}
                    />
                </div>

                {/* Specific Fields */}
                {lessonData.type === 'Video' && (
                    <div>
                        <label className="text-xs font-bold text-gray-500 uppercase mb-2 block">Transcript</label>
                        <textarea 
                            className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-4 py-2.5 text-sm dark:text-white focus:outline-none focus:ring-2 focus:ring-jambo-600"
                            rows={6}
                            value={lessonData.transcript || ''}
                            onChange={(e) => handleChange('transcript', e.target.value)}
                            placeholder="Paste video transcript here..."
                        />
                    </div>
                )}

                {lessonData.type === 'Quiz' && (
                    <QuizBuilder 
                        questions={lessonData.quizData || []}
                        onChange={(qs) => handleChange('quizData', qs)}
                    />
                )}

            </div>

            <div className="p-4 md:p-6 border-t border-gray-100 dark:border-white/5 bg-gray-50 dark:bg-white/5 flex justify-end gap-3 shrink-0">
                <Button variant="secondary" onClick={onClose}>Cancel</Button>
                <Button variant="primary" onClick={handleSave}>Save Lesson</Button>
            </div>
        </div>
    </Modal>
  );
};
