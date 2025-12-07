
import React, { useState, useEffect } from 'react';
import { mockDb } from '../../../data/mockDatabase';
import { Course } from '../../../data/types';
import { Plus, Trash2, BookOpen, Clock, Users, Eye } from 'lucide-react';
import { Card } from '../../ui/Card';
import { Button } from '../../ui/Button';
import { Badge } from '../../ui/Badge';

interface CourseListProps {
  onCreate: () => void;
  onView: (id: string) => void;
  onDelete: (id: string) => void;
}

export const CourseList = ({ onCreate, onView, onDelete }: CourseListProps) => {
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    setCourses(mockDb.getCourses());
  }, []);

  const handleDeleteClick = (e: React.MouseEvent, courseId: string) => {
      e.stopPropagation(); // Prevent card click
      if (confirm("Are you sure you want to delete this course? This action cannot be undone and will remove all student progress.")) {
          onDelete(courseId);
      }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Training Library</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">Manage courses, lessons, and quizzes for linguists.</p>
        </div>
        <Button onClick={onCreate} leftIcon={<Plus size={18} />}>
          Create New Course
        </Button>
      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
        {courses.map((course) => (
          <Card 
            key={course.id} 
            className="group overflow-hidden flex flex-col h-full hover:border-jambo-400 dark:hover:border-jambo-600 transition-colors cursor-pointer"
            onClick={() => onView(course.id)}
          >
            <div className="relative h-48 overflow-hidden bg-gray-100 dark:bg-white/5">
              <img 
                src={course.thumbnailUrl} 
                alt={course.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute top-3 right-3">
                 <Badge variant="brand">{course.category}</Badge>
              </div>
              
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="bg-white/20 backdrop-blur-md text-white px-4 py-2 rounded-full font-bold text-sm flex items-center gap-2 border border-white/30">
                      <Eye size={16} /> View Admin Details
                  </span>
              </div>
            </div>
            
            <div className="p-5 flex-1 flex flex-col">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-1">{course.title}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mb-4 flex-grow">{course.description}</p>
              
              <div className="flex items-center gap-4 text-xs text-gray-400 font-medium mb-6">
                 <span className="flex items-center gap-1"><BookOpen size={14} /> {course.lessonsCount} Lessons</span>
                 <span className="flex items-center gap-1"><Clock size={14} /> {course.duration}</span>
              </div>

              <div className="flex items-center gap-2 pt-4 border-t border-gray-100 dark:border-white/5">
                 <button 
                    onClick={(e) => { e.stopPropagation(); onView(course.id); }}
                    className="flex-1 py-2 text-sm font-bold text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 rounded-lg flex items-center justify-center gap-2 transition-colors"
                 >
                    <Users size={16} /> Manage
                 </button>
                 <button 
                    onClick={(e) => handleDeleteClick(e, course.id)}
                    className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                    title="Delete Course"
                 >
                    <Trash2 size={18} />
                 </button>
              </div>
            </div>
          </Card>
        ))}
      </div>
      
      {courses.length === 0 && (
          <div className="text-center py-20 border border-dashed border-gray-200 dark:border-white/10 rounded-xl bg-gray-50/50 dark:bg-white/5">
              <p className="text-gray-400 font-medium">No courses available. Create your first module to get started.</p>
          </div>
      )}
    </div>
  );
};
