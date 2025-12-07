
import React, { useState, useEffect } from 'react';
import { Lesson } from '@/data/types';
import { 
  Plus, Trash2, Edit2, PlayCircle, FileText, HelpCircle, 
  LayoutTemplate, ChevronUp, ChevronDown, FolderPlus
} from 'lucide-react';
import { LessonModal } from './LessonModal';

interface CurriculumStepProps {
  lessons: Lesson[];
  setLessons: React.Dispatch<React.SetStateAction<Lesson[]>>;
}

interface ModuleStructure {
  id: string; // Temporary ID for UI tracking
  title: string;
  lessons: Lesson[];
  isEditingTitle: boolean;
}

export const CurriculumStep = ({ lessons, setLessons }: CurriculumStepProps) => {
  const [structure, setStructure] = useState<ModuleStructure[]>([]);
  const [editingLesson, setEditingLesson] = useState<Lesson | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [targetModuleId, setTargetModuleId] = useState<string | null>(null);

  // Initialize Structure on Mount
  useEffect(() => {
    // Group existing lessons by module string
    const groups: Record<string, Lesson[]> = {};
    const moduleNames: string[] = [];

    // Preserving order based on the first appearance of a module name
    lessons.sort((a, b) => a.orderIndex - b.orderIndex).forEach(l => {
        const modName = l.module || 'General';
        if (!groups[modName]) {
            groups[modName] = [];
            moduleNames.push(modName);
        }
        groups[modName].push(l);
    });

    // If no lessons, start with an initial empty module
    if (moduleNames.length === 0) {
        setStructure([{ id: `mod-${Date.now()}`, title: 'Introduction', lessons: [], isEditingTitle: false }]);
    } else {
        const builtStructure = moduleNames.map((name, index) => ({
            id: `mod-${index}`,
            title: name,
            lessons: groups[name],
            isEditingTitle: false
        }));
        setStructure(builtStructure);
    }
  }, []); // Only run once on mount to parse initial data

  // Sync changes back to parent whenever structure changes
  useEffect(() => {
      const flatList: Lesson[] = [];
      let globalOrder = 0;

      structure.forEach(mod => {
          mod.lessons.forEach(lesson => {
              flatList.push({
                  ...lesson,
                  module: mod.title,
                  orderIndex: globalOrder++
              });
          });
      });
      
      // Update parent state
      if (flatList.length > 0 || structure.length > 0) {
         setLessons(flatList);
      }
  }, [structure]);

  // --- Module Operations ---

  const addModule = () => {
      const newModule: ModuleStructure = {
          id: `mod-${Date.now()}`,
          title: `New Section ${structure.length + 1}`,
          lessons: [],
          isEditingTitle: true
      };
      setStructure([...structure, newModule]);
  };

  const deleteModule = (modId: string) => {
      if (confirm('Delete this section and all its lessons? This cannot be undone.')) {
          setStructure(prev => prev.filter(m => m.id !== modId));
      }
  };

  const moveModule = (index: number, direction: 'up' | 'down') => {
      if (direction === 'up' && index === 0) return;
      if (direction === 'down' && index === structure.length - 1) return;
      
      const newStructure = [...structure];
      const targetIndex = direction === 'up' ? index - 1 : index + 1;
      [newStructure[index], newStructure[targetIndex]] = [newStructure[targetIndex], newStructure[index]];
      setStructure(newStructure);
  };

  const updateModuleTitle = (modId: string, newTitle: string) => {
      setStructure(prev => prev.map(m => m.id === modId ? { ...m, title: newTitle } : m));
  };

  const toggleModuleEdit = (modId: string, isEditing: boolean) => {
      setStructure(prev => prev.map(m => m.id === modId ? { ...m, isEditingTitle: isEditing } : m));
  };

  // --- Lesson Operations ---

  const openAddLessonModal = (modId: string) => {
      setTargetModuleId(modId);
      setEditingLesson(null);
      setIsModalOpen(true);
  };

  const openEditLessonModal = (lesson: Lesson, modId: string) => {
      setTargetModuleId(modId);
      setEditingLesson(lesson);
      setIsModalOpen(true);
  };

  const handleSaveLesson = (lesson: Lesson) => {
      setStructure(prev => prev.map(mod => {
          if (mod.id !== targetModuleId) return mod;

          if (editingLesson) {
              // Edit existing in this module
              return {
                  ...mod,
                  lessons: mod.lessons.map(l => l.id === lesson.id ? lesson : l)
              };
          } else {
              // Add new to this module
              return {
                  ...mod,
                  lessons: [...mod.lessons, lesson]
              };
          }
      }));
      setIsModalOpen(false);
  };

  const deleteLesson = (modId: string, lessonId: string) => {
      if (confirm('Remove this lesson?')) {
          setStructure(prev => prev.map(mod => {
              if (mod.id !== modId) return mod;
              return {
                  ...mod,
                  lessons: mod.lessons.filter(l => l.id !== lessonId)
              };
          }));
      }
  };

  const moveLesson = (modId: string, lessonIndex: number, direction: 'up' | 'down') => {
      setStructure(prev => prev.map(mod => {
          if (mod.id !== modId) return mod;
          if (direction === 'up' && lessonIndex === 0) return mod;
          if (direction === 'down' && lessonIndex === mod.lessons.length - 1) return mod;

          const newLessons = [...mod.lessons];
          const targetIndex = direction === 'up' ? lessonIndex - 1 : lessonIndex + 1;
          [newLessons[lessonIndex], newLessons[targetIndex]] = [newLessons[targetIndex], newLessons[lessonIndex]];
          
          return { ...mod, lessons: newLessons };
      }));
  };

  const getIcon = (type: string) => {
      switch(type) {
          case 'Video': return PlayCircle;
          case 'Quiz': return HelpCircle;
          case 'Slide': return LayoutTemplate;
          default: return FileText;
      }
  };

  // Helper to find title for modal
  const targetModuleTitle = structure.find(m => m.id === targetModuleId)?.title || 'General';

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-300 pb-20">
        <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">Course Curriculum</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Structure your course into modules and lessons.</p>
        </div>

        <div className="space-y-6">
            {structure.map((mod, index) => (
                <div key={mod.id} className="bg-white dark:bg-[#13111c] border border-gray-200 dark:border-white/10 rounded-xl overflow-hidden shadow-sm transition-all hover:shadow-md">
                    
                    {/* Module Header */}
                    <div className="bg-gray-50 dark:bg-white/5 px-4 py-3 border-b border-gray-100 dark:border-white/5">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                            <div className="flex items-start md:items-center gap-3 flex-1 min-w-0">
                                {/* Drag Handles / Sort */}
                                <div className="flex flex-col gap-0.5 mt-1 md:mt-0">
                                    <button onClick={() => moveModule(index, 'up')} disabled={index === 0} className="text-gray-400 hover:text-jambo-600 disabled:opacity-30 p-0.5"><ChevronUp size={14} /></button>
                                    <button onClick={() => moveModule(index, 'down')} disabled={index === structure.length - 1} className="text-gray-400 hover:text-jambo-600 disabled:opacity-30 p-0.5"><ChevronDown size={14} /></button>
                                </div>
                                
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Module {index + 1}</span>
                                    </div>
                                    {mod.isEditingTitle ? (
                                        <input 
                                            autoFocus
                                            value={mod.title}
                                            onChange={(e) => updateModuleTitle(mod.id, e.target.value)}
                                            onBlur={() => toggleModuleEdit(mod.id, false)}
                                            onKeyDown={(e) => e.key === 'Enter' && toggleModuleEdit(mod.id, false)}
                                            className="font-bold text-lg text-gray-900 dark:text-white bg-white dark:bg-black/20 border border-jambo-500 rounded px-2 py-1 w-full"
                                        />
                                    ) : (
                                        <div className="flex items-center gap-2 group cursor-pointer" onClick={() => toggleModuleEdit(mod.id, true)}>
                                            <h4 className="font-bold text-lg text-gray-900 dark:text-white truncate">{mod.title}</h4>
                                            <Edit2 size={12} className="text-gray-400 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity" />
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Module Actions */}
                            <div className="flex items-center gap-2 pt-2 md:pt-0 border-t md:border-t-0 border-gray-100 dark:border-white/5 md:ml-4 justify-end">
                                <button 
                                    onClick={() => openAddLessonModal(mod.id)}
                                    className="text-xs font-bold bg-jambo-600 hover:bg-jambo-700 text-white px-3 py-1.5 rounded-lg flex items-center gap-2 shadow-sm transition-colors"
                                >
                                    <Plus size={14} /> <span className="hidden sm:inline">Add Lesson</span><span className="sm:hidden">Add</span>
                                </button>
                                <button 
                                    onClick={() => deleteModule(mod.id)}
                                    className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                                    title="Delete Module"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Lessons List */}
                    <div className="divide-y divide-gray-100 dark:divide-white/5 bg-white dark:bg-[#1a1625]">
                        {mod.lessons.length === 0 ? (
                            <div className="p-6 md:p-8 text-center border-dashed border-gray-200 dark:border-white/5 m-3 md:m-4 rounded-lg bg-gray-50/50 dark:bg-white/5">
                                <p className="text-sm text-gray-400 font-medium mb-2">This module is empty.</p>
                                <button onClick={() => openAddLessonModal(mod.id)} className="text-sm font-bold text-jambo-600 hover:underline">Add the first lesson</button>
                            </div>
                        ) : (
                            mod.lessons.map((lesson, lIndex) => {
                                const Icon = getIcon(lesson.type);
                                return (
                                    <div key={lesson.id} className="p-3 sm:p-4 flex flex-wrap sm:flex-nowrap items-center gap-3 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors group">
                                        <div className="flex flex-col gap-0.5 shrink-0">
                                            <button onClick={() => moveLesson(mod.id, lIndex, 'up')} disabled={lIndex === 0} className="text-gray-300 hover:text-jambo-600 disabled:opacity-0 p-0.5"><ChevronUp size={12} /></button>
                                            <button onClick={() => moveLesson(mod.id, lIndex, 'down')} disabled={lIndex === mod.lessons.length - 1} className="text-gray-300 hover:text-jambo-600 disabled:opacity-0 p-0.5"><ChevronDown size={12} /></button>
                                        </div>
                                        
                                        <div className={`p-2 rounded-lg shrink-0 ${
                                            lesson.type === 'Quiz' ? 'bg-orange-50 text-orange-600' : 
                                            lesson.type === 'Video' ? 'bg-blue-50 text-blue-600' : 'bg-gray-100 text-gray-600'
                                        }`}>
                                            <Icon size={18} />
                                        </div>

                                        <div className="flex-1 min-w-[150px]">
                                            <p className="text-sm font-bold text-gray-900 dark:text-white truncate max-w-full">{lesson.title}</p>
                                            <div className="flex items-center gap-2 text-xs text-gray-500 mt-0.5">
                                                <span className="uppercase tracking-wider">{lesson.type}</span>
                                                {lesson.duration && <span>• {lesson.duration}</span>}
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-1 ml-auto shrink-0 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                                            <button 
                                                onClick={() => openEditLessonModal(lesson, mod.id)}
                                                className="p-2 text-gray-400 hover:text-jambo-600 hover:bg-jambo-50 dark:hover:bg-white/10 rounded transition-colors"
                                                title="Edit Lesson"
                                            >
                                                <Edit2 size={16} />
                                            </button>
                                            <button 
                                                onClick={() => deleteLesson(mod.id, lesson.id)}
                                                className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors"
                                                title="Delete Lesson"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </div>
                                );
                            })
                        )}
                    </div>
                </div>
            ))}
        </div>

        <button 
            onClick={addModule}
            className="w-full py-4 border-2 border-dashed border-gray-200 dark:border-white/10 rounded-xl text-gray-500 font-bold hover:text-jambo-600 hover:border-jambo-300 dark:hover:border-jambo-700 hover:bg-jambo-50/50 dark:hover:bg-jambo-900/10 transition-all flex items-center justify-center gap-2"
        >
            <FolderPlus size={20} /> Add New Module
        </button>

        {isModalOpen && (
            <LessonModal 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSaveLesson}
                initialData={editingLesson}
                defaultModule={targetModuleTitle}
            />
        )}
    </div>
  );
};
