
import React, { useState } from 'react';
import { CourseList } from './CourseList';
import { CourseEditor } from './CourseEditor';
import { CourseAdminView } from './CourseAdminView'; // New Component
import { mockDb } from '@/data/mockDatabase';

export const AdminContent = () => {
  const [view, setView] = useState<'list' | 'editor' | 'details'>('list');
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleCreateNew = () => {
    setSelectedCourseId(null);
    setView('editor');
  };

  const handleViewDetails = (courseId: string) => {
    setSelectedCourseId(courseId);
    setView('details');
  };

  const handleEdit = (courseId: string) => {
    setSelectedCourseId(courseId);
    setView('editor');
  };

  const handleSave = () => {
    // If we were creating new, we might want to go to list or details. 
    // For now, let's go to list if it was a new course, or keep it simple.
    if (!selectedCourseId) {
        setView('list');
    } else {
        setView('details');
    }
    setRefreshTrigger(prev => prev + 1);
  };

  const handleCancelEditor = () => {
    // Directly close the editor without confirmation
    // This satisfies the requirement to just "close the modal"
    if (selectedCourseId) {
        setView('details');
    } else {
        setView('list');
    }
  };

  const handleDelete = (courseId: string) => {
      mockDb.adminDeleteCourse(courseId);
      setRefreshTrigger(prev => prev + 1); // Force re-render of list
      setView('list'); 
  };

  return (
    <div className="h-full flex flex-col" key={refreshTrigger}>
        {view === 'list' && (
            <CourseList 
                onCreate={handleCreateNew} 
                onView={handleViewDetails}
                onDelete={handleDelete}
            />
        )}

        {view === 'details' && selectedCourseId && (
            <CourseAdminView
                courseId={selectedCourseId}
                onBack={() => setView('list')}
                onEdit={() => handleEdit(selectedCourseId)}
            />
        )}

        {view === 'editor' && (
            <CourseEditor 
                courseId={selectedCourseId} 
                onSave={handleSave} 
                onCancel={handleCancelEditor} 
            />
        )}
    </div>
  );
};
