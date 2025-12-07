import React from 'react';
import { CheckCircle, Circle, FileText, LayoutTemplate, HelpCircle, PlayCircle, Lock } from 'lucide-react';
import { Lesson } from '@/data/types';

interface PlayerSidebarProps {
  lessons: Lesson[];
  currentLessonId?: string;
  completedLessonIds: string[];
  onSelect: (lesson: Lesson) => void;
}

const getIcon = (type: string) => {
    switch(type) {
        case 'Video': return PlayCircle;
        case 'Document': return FileText;
        case 'Slide': return LayoutTemplate;
        case 'Quiz': return HelpCircle;
        default: return Circle;
    }
};

export const PlayerSidebar = ({ lessons, currentLessonId, completedLessonIds, onSelect }: PlayerSidebarProps) => {
  
  // Group lessons by module
  const modules = lessons.reduce<Record<string, Lesson[]>>((acc, lesson) => {
      const moduleName = lesson.module || 'Course Content';
      if (!acc[moduleName]) {
          acc[moduleName] = [];
      }
      acc[moduleName].push(lesson);
      return acc;
  }, {});
  
  // Gating Logic: Find the index of the first incomplete quiz.
  // All lessons after this index will be locked.
  let gatingQuizIndex = -1;
  for (let i = 0; i < lessons.length; i++) {
      if (lessons[i].type === 'Quiz' && !completedLessonIds.includes(lessons[i].id)) {
          gatingQuizIndex = i;
          break; 
      }
  }

  return (
    <div className="flex flex-col h-full bg-white dark:bg-[#1a1625]">
        <div className="p-4 border-b border-gray-100 dark:border-white/5 bg-gray-50 dark:bg-white/5">
            <h3 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">Course Syllabus</h3>
        </div>
        
        <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-6">
            {Object.entries(modules).map(([moduleName, moduleLessons]) => (
                <div key={moduleName}>
                    <h4 className="font-bold text-gray-900 dark:text-white mb-4">{moduleName}</h4>
                    <ol className="relative border-l-2 border-gray-200 dark:border-white/10">                  
                        {moduleLessons.map((lesson) => {
                            const lessonIndex = lessons.findIndex(l => l.id === lesson.id);
                            const isLocked = gatingQuizIndex !== -1 && lessonIndex > gatingQuizIndex;
                            const isCompleted = completedLessonIds.includes(lesson.id);
                            const isCurrent = lesson.id === currentLessonId;
                            const TypeIcon = getIcon(lesson.type);

                            return (
                                <li key={lesson.id} className="mb-8 ml-8">            
                                    <button 
                                        onClick={() => !isLocked && onSelect(lesson)}
                                        disabled={isLocked}
                                        className={`absolute -left-[17px] flex items-center justify-center w-8 h-8 rounded-full bg-white dark:bg-gray-800 ring-4 ring-white dark:ring-[#1a1625] transition-opacity ${isLocked ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    >
                                        {isLocked ? (
                                            <Lock size={16} className="text-gray-400" />
                                        ) : isCompleted ? (
                                            <CheckCircle size={24} className="text-green-500 fill-white dark:fill-green-900/30" />
                                        ) : isCurrent ? (
                                            <span className="relative flex h-5 w-5">
                                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-jambo-400 opacity-75"></span>
                                                <span className="relative inline-flex rounded-full h-5 w-5 bg-jambo-500 border-2 border-white"></span>
                                            </span>
                                        ) : (
                                            <Circle size={16} className="text-gray-300 dark:text-gray-600 fill-white dark:fill-gray-700" />
                                        )}
                                    </button>
                                    <div className={`text-left group ${isLocked ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`} onClick={() => !isLocked && onSelect(lesson)}>
                                        <h3 className={`text-sm font-bold ${
                                            isCurrent 
                                                ? 'text-jambo-700 dark:text-jambo-300' 
                                                : isLocked
                                                    ? 'text-gray-500 dark:text-gray-500'
                                                    : 'text-gray-800 dark:text-gray-200 group-hover:text-jambo-600 dark:group-hover:text-jambo-400 transition-colors'
                                        }`}>
                                            {lesson.title}
                                        </h3>
                                        <div className="flex items-center gap-2 text-xs text-gray-400 dark:text-gray-500 mt-1">
                                            <TypeIcon size={12} />
                                            <span>{lesson.duration}</span>
                                        </div>
                                    </div>
                                </li>
                            );
                        })}
                    </ol>
                </div>
            ))}
        </div>
    </div>
  );
};