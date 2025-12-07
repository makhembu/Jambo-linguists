import React from 'react';
import { Lesson } from '@/data/types';
import { VideoViewer, DocumentViewer, QuizViewer } from './viewers';

interface LessonContentProps {
  lesson: Lesson;
  onComplete: () => void;
  lessonNumber: number;
  totalLessons: number;
}

export const LessonContent = ({ lesson, onComplete, lessonNumber, totalLessons }: LessonContentProps) => {
  
  const renderContent = () => {
    switch(lesson.type) {
      case 'Video':
        return <VideoViewer lesson={lesson} />;
      case 'Document':
      case 'Slide':
        return <DocumentViewer lesson={lesson} />;
      case 'Quiz':
        return <QuizViewer lesson={lesson} onQuizComplete={onComplete} />;
      default:
        return <div className="p-12 text-center text-gray-500">Lesson content not available.</div>;
    }
  }
  
  return (
    <div className="w-full max-w-full lg:max-w-4xl lg:mx-auto p-4 sm:p-6 md:p-10">
       <div className="flex items-center gap-2 text-xs font-bold text-jambo-600 dark:text-jambo-400 uppercase tracking-widest mb-4">
           <span className="bg-jambo-50 dark:bg-jambo-900/30 px-2 py-1 rounded">{lesson.type}</span>
           <span>•</span>
           <span>{lesson.duration}</span>
           <span className="hidden sm:inline">•</span>
           <span className="hidden sm:inline text-gray-400">Lesson {lessonNumber} of {totalLessons}</span>
       </div>

       <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 dark:text-white mb-6 leading-tight">
           {lesson.title}
       </h2>

       <div className="animate-in fade-in duration-500">
         {renderContent()}
       </div>
    </div>
  );
};