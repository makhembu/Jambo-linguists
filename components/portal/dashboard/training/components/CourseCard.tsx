
import React from 'react';
import { PlayCircle, Clock, BookOpen, CheckCircle } from 'lucide-react';
import { EnrichedCourse } from '../../../../../data/types';
import { Card } from '../../../../ui/Card';

export interface CourseCardProps {
  course: EnrichedCourse;
  onClick: () => void;
}

export const CourseCard: React.FC<CourseCardProps> = ({ course, onClick }) => {
  const isStarted = course.progress && course.progress.status !== 'Not Started';
  const isCompleted = course.progress?.status === 'Completed';
  const progressPercent = course.progress?.progressPercent || 0;

  return (
    <Card 
      onClick={onClick}
      hoverEffect={true}
      className="flex flex-col h-full overflow-hidden group"
    >
      {/* Thumbnail */}
      <div className="relative h-40 overflow-hidden bg-gray-100 dark:bg-white/5">
        <img 
            src={course.thumbnailUrl} 
            alt={course.title}
            className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end">
             <span className="text-[10px] font-bold uppercase tracking-widest text-white bg-black/50 backdrop-blur-md px-2 py-1 rounded-md border border-white/20">
                {course.category}
             </span>
        </div>
        {/* Play Overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/20 backdrop-blur-[2px]">
            <div className="bg-white/20 p-3 rounded-full backdrop-blur-md border border-white/40 shadow-xl">
                 <PlayCircle size={32} className="text-white fill-white" />
            </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col">
         <h3 className="font-serif font-bold text-lg text-gray-900 dark:text-white mb-2 leading-tight group-hover:text-jambo-600 dark:group-hover:text-jambo-400 transition-colors">
            {course.title}
         </h3>
         
         <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400 mb-4">
             <span className="flex items-center gap-1"><Clock size={12} /> {course.duration}</span>
             <span className="flex items-center gap-1"><BookOpen size={12} /> {course.lessonsCount} Lessons</span>
         </div>

         <div className="mt-auto pt-4 border-t border-gray-100 dark:border-white/5">
            {isCompleted ? (
                <div className="flex items-center gap-2 text-green-600 dark:text-green-400 font-bold text-sm">
                    <CheckCircle size={16} /> Completed
                </div>
            ) : isStarted ? (
                <div className="space-y-2">
                    <div className="flex justify-between text-xs font-bold uppercase tracking-wide">
                        <span className="text-jambo-600 dark:text-jambo-400">In Progress</span>
                        <span className="text-gray-500 dark:text-gray-400">{progressPercent}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-gray-100 dark:bg-white/10 rounded-full overflow-hidden">
                        <div 
                           className="h-full bg-jambo-600 dark:bg-jambo-500 rounded-full transition-all duration-500"
                           style={{ width: `${progressPercent}%` }}
                        ></div>
                    </div>
                </div>
            ) : (
                <div className="text-sm font-bold text-gray-400 group-hover:text-jambo-600 dark:group-hover:text-jambo-400 transition-colors flex items-center gap-2">
                    Start Course <PlayCircle size={16} />
                </div>
            )}
         </div>
      </div>
    </Card>
  );
};
