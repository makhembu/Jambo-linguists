
import React from 'react';
import { PlayCircle, Clock, BookOpen, CheckCircle } from 'lucide-react';
import { EnrichedCourse } from '@/data/types';

export interface CourseListItemProps {
  course: EnrichedCourse;
  onClick: () => void;
}

export const CourseListItem: React.FC<CourseListItemProps> = ({ course, onClick }) => {
  const isStarted = course.progress && course.progress.status !== 'Not Started';
  const isCompleted = course.progress?.status === 'Completed';
  const progressPercent = course.progress?.progressPercent || 0;

  return (
    <div 
      onClick={onClick}
      className="group bg-white dark:bg-[#1a1625] rounded-xl border border-gray-100 dark:border-white/5 hover:border-jambo-200 dark:hover:border-jambo-700 p-4 flex gap-4 md:items-center cursor-pointer shadow-sm hover:shadow-lg transition-all"
    >
      <div className="w-20 h-20 md:w-32 md:h-20 rounded-lg overflow-hidden shrink-0 relative bg-gray-100 dark:bg-white/5">
        <img src={course.thumbnailUrl} alt={course.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/20 hidden group-hover:flex items-center justify-center">
             <PlayCircle size={24} className="text-white fill-white/50" />
        </div>
      </div>

      <div className="flex-1 min-w-0">
         <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-jambo-600 dark:text-jambo-400">
               {course.category}
            </span>
            <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
                <span className="flex items-center gap-1"><Clock size={12} /> {course.duration}</span>
                <span className="flex items-center gap-1"><BookOpen size={12} /> {course.lessonsCount} Lessons</span>
            </div>
         </div>
         
         <h3 className="font-bold text-base md:text-lg text-gray-900 dark:text-white truncate group-hover:text-jambo-600 dark:group-hover:text-jambo-400 transition-colors">
            {course.title}
         </h3>
         <p className="text-sm text-gray-500 dark:text-gray-400 truncate hidden md:block">{course.description}</p>
      </div>

      <div className="w-32 shrink-0 flex flex-col justify-center border-l border-gray-100 dark:border-white/5 pl-4">
        {isCompleted ? (
            <div className="flex items-center gap-2 text-green-600 dark:text-green-400 font-bold text-sm">
                <CheckCircle size={16} /> Done
            </div>
        ) : isStarted ? (
            <div className="space-y-1.5">
                <div className="flex justify-between text-[10px] font-bold uppercase tracking-wide">
                    <span className="text-gray-500 dark:text-gray-400">Progress</span>
                    <span className="text-jambo-600 dark:text-jambo-400">{progressPercent}%</span>
                </div>
                <div className="h-1.5 w-full bg-gray-100 dark:bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-jambo-600 dark:bg-jambo-500 rounded-full" style={{ width: `${progressPercent}%` }}></div>
                </div>
            </div>
        ) : (
            <button className="text-sm font-bold text-gray-400 group-hover:text-jambo-600 dark:group-hover:text-jambo-400 text-left">
                Start Course
            </button>
        )}
      </div>
    </div>
  );
};
