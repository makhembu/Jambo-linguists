
import React, { useState } from 'react';
import { mockDb } from '../../../../data/mockDatabase';
import { TrainingFilterBar } from './components/TrainingFilterBar';
import { CourseCard } from './components/CourseCard';
import { CourseListItem } from './components/CourseListItem';
import { BookOpen } from 'lucide-react';
import { CoursePlayer } from './CoursePlayer';
import { CourseOverview } from './CourseOverview';

export const TrainingModules = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const [refresh, setRefresh] = useState(0); // Dummy state to force re-render on enrollment

  // Fetch courses (re-runs when refresh changes)
  const allCourses = mockDb.getCourses();
  
  // Filter Logic
  const filteredCourses = allCourses.filter(c => 
     c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
     c.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const ongoingCourses = filteredCourses.filter(c => c.progress?.status === 'In Progress');
  const otherCourses = filteredCourses.filter(c => c.progress?.status !== 'In Progress');

  // VIEW LOGIC
  if (selectedCourseId) {
      const selectedCourse = allCourses.find(c => c.id === selectedCourseId);
      
      // If course is found AND has progress (Started/Enrolled) -> Show Player
      if (selectedCourse && selectedCourse.progress && selectedCourse.progress.status !== 'Not Started') {
          return <CoursePlayer courseId={selectedCourseId} onClose={() => setSelectedCourseId(null)} />;
      }
      
      // Otherwise -> Show Enrollment/Overview Page
      return (
        <CourseOverview 
            courseId={selectedCourseId} 
            onBack={() => setSelectedCourseId(null)}
            onEnroll={() => {
                // Trigger re-render to fetch new 'progress' state from DB
                setRefresh(prev => prev + 1);
                // Player will naturally render on next pass because progress will exist
            }} 
        />
      );
  }

  return (
    <div className="animate-in fade-in duration-500 pb-12">
        <div className="mb-6 md:mb-8">
            <h2 className="text-2xl md:text-4xl font-serif font-bold text-jambo-950 dark:text-white mb-2">Training Modules</h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm md:text-lg">Enhance your skills with our specialized linguistic courses.</p>
        </div>

        <TrainingFilterBar 
            searchTerm={searchTerm} 
            setSearchTerm={setSearchTerm} 
            viewMode={viewMode} 
            setViewMode={setViewMode} 
        />

        {/* SECTION 1: ONGOING (If any) */}
        {ongoingCourses.length > 0 && (
            <div className="mb-10">
                <div className="flex items-center gap-2 mb-4">
                    <BookOpen size={20} className="text-jambo-600 dark:text-jambo-400" />
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">Continue Learning</h3>
                </div>
                <div className={viewMode === 'grid' ? "grid md:grid-cols-2 xl:grid-cols-3 gap-6" : "flex flex-col gap-3"}>
                    {ongoingCourses.map(course => (
                        viewMode === 'grid' 
                          ? <CourseCard key={course.id} course={course} onClick={() => setSelectedCourseId(course.id)} />
                          : <CourseListItem key={course.id} course={course} onClick={() => setSelectedCourseId(course.id)} />
                    ))}
                </div>
            </div>
        )}

        {/* SECTION 2: ALL COURSES (Not Started / Completed) */}
        <div>
            <div className="flex items-center gap-2 mb-4">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">All Courses</h3>
                <span className="text-sm text-gray-400 font-medium bg-gray-100 dark:bg-white/10 px-2 py-0.5 rounded-full">{otherCourses.length}</span>
            </div>
            
            {otherCourses.length === 0 && ongoingCourses.length === 0 ? (
                <div className="text-center py-20 border border-dashed border-gray-200 dark:border-white/10 rounded-xl">
                    <p className="text-gray-400">No modules found matching "{searchTerm}"</p>
                </div>
            ) : (
                <div className={viewMode === 'grid' ? "grid md:grid-cols-2 xl:grid-cols-3 gap-6" : "flex flex-col gap-3"}>
                    {otherCourses.map(course => (
                        viewMode === 'grid' 
                          ? <CourseCard key={course.id} course={course} onClick={() => setSelectedCourseId(course.id)} />
                          : <CourseListItem key={course.id} course={course} onClick={() => setSelectedCourseId(course.id)} />
                    ))}
                </div>
            )}
        </div>
    </div>
  );
};
