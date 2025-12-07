import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ChevronLeft, Menu } from 'lucide-react';
import { EnrichedCourse, Lesson, mockDb } from '@/data/mockDatabase';
import { PlayerSidebar } from './player/PlayerSidebar';
import { LessonContent } from './player/LessonContent';
import { CourseCertificate } from './player/CourseCertificate';
import { PlayerFooter } from './player/PlayerFooter'; // Import the new footer

interface CoursePlayerProps {
  courseId: string;
  onClose: () => void;
}

export const CoursePlayer = ({ courseId, onClose }: CoursePlayerProps) => {
  const [course, setCourse] = useState<EnrichedCourse | undefined>(undefined);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [currentLesson, setCurrentLesson] = useState<Lesson | undefined>(undefined);
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 1024);
  const [isCompletedView, setIsCompletedView] = useState(false);

  useEffect(() => {
    const c = mockDb.getCourse(courseId);
    const l = mockDb.getLessons(courseId);
    setCourse(c);
    setLessons(l);

    if (c && l.length > 0) {
        let startLessonId = c.progress?.lastAccessedLessonId;
        if (!startLessonId && c.progress?.lessonsCompletedIds) {
             const firstUnfinished = l.find(lsn => !c.progress?.lessonsCompletedIds.includes(lsn.id));
             startLessonId = firstUnfinished?.id;
        }
        const startLesson = l.find(lsn => lsn.id === startLessonId) || l[0];
        setCurrentLesson(startLesson);
    }
  }, [courseId]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'unset'; };
  }, []);

  const handleLessonSelect = (lesson: Lesson) => {
    setCurrentLesson(lesson);
    setIsCompletedView(false);
    if (window.innerWidth < 1024) setSidebarOpen(false);
  };

  const handleMarkLessonComplete = () => {
    if (!course || !currentLesson || course.progress?.lessonsCompletedIds.includes(currentLesson.id)) return;
    mockDb.completeLesson(course.id, currentLesson.id);
    setCourse(mockDb.getCourse(courseId)); // Re-fetch to update state
  };

  const handleNextLesson = () => {
      if (!currentLesson) return;
      const currentIndex = lessons.findIndex(l => l.id === currentLesson.id);
      if (currentIndex < lessons.length - 1) {
          setCurrentLesson(lessons[currentIndex + 1]);
      } else {
          setIsCompletedView(true);
      }
  };

  const handlePreviousLesson = () => {
      if (!currentLesson) return;
      const currentIndex = lessons.findIndex(l => l.id === currentLesson.id);
      if (currentIndex > 0) {
          setCurrentLesson(lessons[currentIndex - 1]);
      }
  };

  if (!course || !currentLesson) return null;

  const currentIndex = lessons.findIndex(l => l.id === currentLesson.id);
  const totalLessons = lessons.length;
  const isFirstLesson = currentIndex === 0;
  const isLastLesson = currentIndex === lessons.length - 1;
  const isCompleted = course.progress?.lessonsCompletedIds.includes(currentLesson.id) || false;

  const content = (
    <div className="fixed inset-0 z-[100] bg-gray-100 dark:bg-[#0f0a15] flex flex-col h-screen w-screen overflow-hidden animate-in fade-in duration-300">
        <header className="relative h-16 bg-white dark:bg-[#1a1625] border-b border-gray-200 dark:border-white/5 flex items-center justify-between px-4 shrink-0 shadow-sm z-20">
            <div className="flex items-center gap-4 min-w-0">
                <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-white/10 rounded-lg text-gray-600 dark:text-gray-300 transition-colors flex items-center gap-2">
                    <ChevronLeft size={20} />
                    <span className="font-bold text-sm hidden md:inline">Back to Dashboard</span>
                </button>
                <div className="h-6 w-px bg-gray-200 dark:bg-white/10 hidden md:block"></div>
                <div className="flex-1 min-w-0">
                  <h1 className="font-serif font-bold text-gray-900 dark:text-white truncate text-base md:text-lg">{course.title}</h1>
                  <p className="text-xs font-bold text-jambo-600 dark:text-jambo-400 md:hidden">
                      {course.progress?.progressPercent || 0}% Complete
                  </p>
                </div>
            </div>
            <div className="flex items-center gap-4">
                 <div className="hidden md:flex flex-col items-end w-48">
                    <div className="flex justify-between w-full text-xs font-bold uppercase tracking-wide mb-1">
                        <span className="text-gray-500 dark:text-gray-400">Progress</span>
                        <span className="text-jambo-600 dark:text-jambo-400">{course.progress?.progressPercent || 0}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-gray-200 dark:bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-jambo-600 dark:bg-jambo-500 transition-all duration-500" style={{ width: `${course.progress?.progressPercent || 0}%` }}></div>
                    </div>
                 </div>
                 <button 
                   onClick={() => setSidebarOpen(!sidebarOpen)}
                   className="lg:hidden p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/10 rounded-lg"
                 >
                    <Menu size={24} />
                 </button>
            </div>
            
            {/* Mobile Progress Bar */}
            <div className="absolute bottom-[-1px] left-0 w-full h-0.5 bg-gray-200 dark:bg-white/10 md:hidden">
                <div 
                    className="h-full bg-jambo-600 dark:bg-jambo-500 transition-all duration-500" 
                    style={{ width: `${course.progress?.progressPercent || 0}%` }}
                ></div>
            </div>
        </header>

        <div className="flex flex-1 overflow-hidden relative">
            <main className="flex-1 overflow-y-auto custom-scrollbar bg-gray-50 dark:bg-black/20 flex flex-col relative pb-24">
                {isCompletedView ? (
                    <CourseCertificate course={course} onBack={() => setIsCompletedView(false)} />
                ) : (
                    <LessonContent 
                        lesson={currentLesson} 
                        onComplete={handleMarkLessonComplete}
                        lessonNumber={currentIndex + 1}
                        totalLessons={totalLessons}
                    />
                )}
            </main>

            <div className={`
                fixed inset-y-0 right-0 w-80 bg-white dark:bg-[#1a1625] border-l border-gray-200 dark:border-white/5 transform transition-transform duration-300 z-30 pt-16 lg:pt-0 lg:static lg:transform-none shadow-xl lg:shadow-none flex flex-col
                ${sidebarOpen ? 'translate-x-0' : 'translate-x-full'}
            `}>
                <PlayerSidebar 
                    lessons={lessons} 
                    currentLessonId={currentLesson?.id} 
                    completedLessonIds={course.progress?.lessonsCompletedIds || []}
                    onSelect={handleLessonSelect}
                />
            </div>
            
            {sidebarOpen && (
                <div 
                  className="absolute inset-0 bg-black/50 z-20 lg:hidden"
                  onClick={() => setSidebarOpen(false)}
                ></div>
            )}
        </div>
        
        {!isCompletedView && (
            <PlayerFooter 
                onMarkComplete={handleMarkLessonComplete}
                onNext={handleNextLesson}
                onPrevious={handlePreviousLesson}
                isCompleted={isCompleted}
                isFirstLesson={isFirstLesson}
                isLastLesson={isLastLesson}
                nextLessonTitle={isLastLesson ? '' : lessons[currentIndex + 1]?.title}
                previousLessonTitle={isFirstLesson ? '' : lessons[currentIndex - 1]?.title}
            />
        )}
    </div>
  );

  return createPortal(content, document.body);
};