
import React, { useState } from 'react';
import { mockDb } from '@/data/mockDatabase';
import { TrainingFilterBar } from './components/TrainingFilterBar';
import { CourseCard } from './components/CourseCard';
import { CourseListItem } from './components/CourseListItem';
import { Loader2 } from 'lucide-react';
import { CoursePlayer } from './CoursePlayer';

export const TrainingOngoing = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);

  const allCourses = mockDb.getCourses();
  
  // Filter: In Progress ONLY
  const ongoingCourses = allCourses.filter(c => 
     c.progress?.status === 'In Progress' &&
     (c.title.toLowerCase().includes(searchTerm.toLowerCase()) || c.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (selectedCourseId) {
      return <CoursePlayer courseId={selectedCourseId} onClose={() => setSelectedCourseId(null)} />;
  }

  return (
    <div className="animate-in fade-in duration-500 pb-12">
        <div className="mb-6 md:mb-8">
            <h2 className="text-2xl md:text-4xl font-serif font-bold text-jambo-950 dark:text-white mb-2">In Progress</h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm md:text-lg">Jump back into your active learning modules.</p>
        </div>

        <TrainingFilterBar 
            searchTerm={searchTerm} 
            setSearchTerm={setSearchTerm} 
            viewMode={viewMode} 
            setViewMode={setViewMode} 
        />

        {ongoingCourses.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 bg-white dark:bg-[#1a1625] rounded-2xl border border-dashed border-gray-200 dark:border-white/10">
                <div className="w-16 h-16 bg-jambo-50 dark:bg-white/5 rounded-full flex items-center justify-center mb-4">
                    <Loader2 size={32} className="text-jambo-600 dark:text-jambo-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-400 dark:text-gray-500 font-serif">No active courses</h3>
                <p className="text-gray-400 dark:text-gray-600 mt-2">Start a new module from the library.</p>
            </div>
        ) : (
            <div className={viewMode === 'grid' ? "grid md:grid-cols-2 xl:grid-cols-3 gap-6" : "flex flex-col gap-3"}>
                {ongoingCourses.map(course => (
                    viewMode === 'grid' 
                        ? <CourseCard key={course.id} course={course} onClick={() => setSelectedCourseId(course.id)} />
                        : <CourseListItem key={course.id} course={course} onClick={() => setSelectedCourseId(course.id)} />
                ))}
            </div>
        )}
    </div>
  );
};
