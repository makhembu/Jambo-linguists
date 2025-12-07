





import React, { useState, useMemo } from 'react';
import { mockDb, User, CourseProgress } from '@/data/mockDatabase';
import { ChevronLeft, Edit2, Users, CheckCircle, Clock, BarChart3, Search, PlayCircle, FileText, HelpCircle, LayoutTemplate, X, Calendar } from 'lucide-react';
import { Button } from '../../ui/Button';
import { StatCard } from '../../ui/StatCard';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../../ui/Table';
import { Badge } from '../../ui/Badge';
import { Input } from '../../ui/Input';
import { LearnerDetailModal } from './LearnerDetailModal';

interface CourseAdminViewProps {
  courseId: string;
  onBack: () => void;
  onEdit: () => void;
}

export const CourseAdminView = ({ courseId, onBack, onEdit }: CourseAdminViewProps) => {
  const [activeTab, setActiveTab] = useState<'learners' | 'curriculum'>('learners');
  const [learnerSearch, setLearnerSearch] = useState('');
  const [selectedLearner, setSelectedLearner] = useState<{ progress: CourseProgress, user: Partial<User> } | null>(null);
  
  // Use state to force re-render on data updates
  const [refreshKey, setRefreshKey] = useState(0);

  const course = mockDb.getCourse(courseId);
  const lessons = mockDb.getLessons(courseId);
  const allUsers = mockDb.getAllUsers();
  
  // Get real progress data from DB
  const courseProgress = useMemo(() => mockDb.getCourseProgress(courseId), [courseId, refreshKey]);

  // Calculate Stats
  const totalEnrolled = courseProgress.length;
  const activeLearners = courseProgress.filter(p => p.status === 'In Progress').length;
  const completedLearners = courseProgress.filter(p => p.status === 'Completed').length;
  const completionRate = totalEnrolled > 0 ? Math.round((completedLearners / totalEnrolled) * 100) : 0;

  // Enrich progress with User details
  const learners = useMemo(() => {
      return courseProgress.map(p => {
          const user = allUsers.find(u => u.id === p.userId);
          return {
              progress: p,
              user: user || { id: p.userId, firstName: 'Unknown', lastName: 'User', email: 'N/A', avatarUrl: null } as Partial<User>
          };
      }).filter(l => 
          `${l.user.firstName} ${l.user.lastName}`.toLowerCase().includes(learnerSearch.toLowerCase()) ||
          (l.user.email && l.user.email.toLowerCase().includes(learnerSearch.toLowerCase()))
      );
  }, [courseProgress, allUsers, learnerSearch]);

  const getLessonIcon = (type: string) => {
      switch(type) {
          case 'Video': return PlayCircle;
          case 'Document': return FileText;
          case 'Slide': return LayoutTemplate;
          case 'Quiz': return HelpCircle;
          default: return FileText;
      }
  };

  const refreshData = () => {
      setRefreshKey(prev => prev + 1);
      // If modal is open, refresh selected learner data
      if (selectedLearner) {
          const updatedProgress = mockDb.getCourseProgress(courseId).find(p => p.userId === selectedLearner.user.id);
          if (updatedProgress) {
              setSelectedLearner({ ...selectedLearner, progress: updatedProgress });
          }
      }
  };

  if (!course) return <div>Course not found</div>;

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-200 dark:border-white/10 pb-6">
            <div className="flex items-center gap-4">
                <button 
                    onClick={onBack}
                    className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-white/10 text-gray-500 dark:text-gray-400 transition-colors"
                >
                    <ChevronLeft size={24} />
                </button>
                <div>
                    <div className="flex items-center gap-3 mb-1">
                        <Badge variant="brand">{course.category}</Badge>
                        {totalEnrolled === 0 && <span className="text-xs text-gray-400 italic">Draft / No Enrollments</span>}
                    </div>
                    <h2 className="text-2xl font-serif font-bold text-gray-900 dark:text-white">{course.title}</h2>
                </div>
            </div>
            <div className="flex items-center gap-3">
                <Button variant="secondary" onClick={onEdit}>
                    <Edit2 size={16} /> Edit Content
                </Button>
            </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard 
                title="Total Enrolled"
                value={totalEnrolled.toString()}
                subtext="Linguists"
                icon={Users}
                variant="brand"
            />
            <StatCard 
                title="Active Learners"
                value={activeLearners.toString()}
                subtext="In Progress"
                icon={Clock}
                variant="info"
            />
            <StatCard 
                title="Completion Rate"
                value={`${completionRate}%`}
                subtext={`${completedLearners} certificates issued`}
                icon={CheckCircle}
                variant="success"
            />
            <StatCard 
                title="Content Volume"
                value={lessons.length.toString()}
                subtext={`Lessons (${course.duration})`}
                icon={BarChart3}
                variant="neutral"
            />
        </div>

        {/* Tabs */}
        <div className="bg-white dark:bg-[#13111c] rounded-xl border border-gray-200 dark:border-white/5 shadow-sm overflow-hidden">
            <div className="border-b border-gray-200 dark:border-white/5 flex">
                <button 
                    onClick={() => setActiveTab('learners')}
                    className={`px-6 py-4 text-sm font-bold border-b-2 transition-colors flex items-center gap-2 ${activeTab === 'learners' ? 'border-jambo-600 text-jambo-600 dark:text-white' : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400'}`}
                >
                    <Users size={16} /> Learners
                </button>
                <button 
                    onClick={() => setActiveTab('curriculum')}
                    className={`px-6 py-4 text-sm font-bold border-b-2 transition-colors flex items-center gap-2 ${activeTab === 'curriculum' ? 'border-jambo-600 text-jambo-600 dark:text-white' : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400'}`}
                >
                    <FileText size={16} /> Curriculum Preview
                </button>
            </div>

            <div className="p-6">
                {activeTab === 'learners' && (
                    <div className="space-y-4 animate-in fade-in duration-300">
                        <div className="max-w-md">
                            <Input 
                                leftIcon={<Search size={16}/>} 
                                placeholder="Search learners..." 
                                value={learnerSearch}
                                onChange={(e) => setLearnerSearch(e.target.value)}
                            />
                        </div>

                        <div className="rounded-lg border border-gray-200 dark:border-white/10 overflow-hidden">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Linguist</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Progress</TableHead>
                                        <TableHead>Last Accessed</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {learners.length === 0 ? (
                                        <TableRow>
                                            <TableCell className="text-center py-8 text-gray-500">No learners found.</TableCell>
                                            <TableCell />
                                            <TableCell />
                                            <TableCell />
                                        </TableRow>
                                    ) : (
                                        learners.map(l => (
                                            <TableRow key={l.progress.userId} onClick={() => setSelectedLearner(l)} className="cursor-pointer">
                                                <TableCell>
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-white/10 flex items-center justify-center text-xs font-bold text-gray-600 dark:text-gray-300 overflow-hidden">
                                                            {l.user.avatarUrl ? <img src={l.user.avatarUrl} className="w-full h-full object-cover" /> : l.user.firstName?.[0]}
                                                        </div>
                                                        <div>
                                                            <div className="font-bold text-gray-900 dark:text-white text-sm">{l.user.firstName} {l.user.lastName}</div>
                                                            <div className="text-xs text-gray-500">{l.user.email}</div>
                                                        </div>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <Badge variant={l.progress.status === 'Completed' ? 'success' : 'info'}>{l.progress.status}</Badge>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="w-32">
                                                        <div className="flex justify-between text-[10px] font-bold text-gray-500 mb-1">
                                                            <span>{l.progress.progressPercent}%</span>
                                                        </div>
                                                        <div className="h-1.5 w-full bg-gray-100 dark:bg-white/10 rounded-full overflow-hidden">
                                                            <div className="h-full bg-green-500 rounded-full" style={{ width: `${l.progress.progressPercent}%` }}></div>
                                                        </div>
                                                    </div>
                                                </TableCell>
                                                <TableCell className="text-gray-500 text-sm">
                                                    {l.progress.lastAccessedAt ? new Date(l.progress.lastAccessedAt).toLocaleDateString() : 'Never'}
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                    </div>
                )}

                {activeTab === 'curriculum' && (
                    <div className="space-y-3 animate-in fade-in duration-300 max-w-3xl">
                        {lessons.length === 0 ? (
                            <p className="text-gray-500 italic">No lessons added to this course yet.</p>
                        ) : (
                            lessons.map((lesson, idx) => {
                                const Icon = getLessonIcon(lesson.type);
                                return (
                                    <div key={lesson.id} className="flex items-center gap-4 p-4 rounded-lg bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5">
                                        <div className="text-gray-400 font-mono text-sm w-6">{idx + 1}</div>
                                        <div className={`p-2 rounded-lg ${lesson.type === 'Quiz' ? 'bg-orange-100 text-orange-600' : 'bg-blue-100 text-blue-600'}`}>
                                            <Icon size={18} />
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="font-bold text-gray-900 dark:text-white text-sm">{lesson.title}</h4>
                                            <div className="flex items-center gap-3 text-xs text-gray-500 mt-0.5">
                                                <span className="uppercase tracking-wider">{lesson.type}</span>
                                                <span>•</span>
                                                <span>{lesson.duration}</span>
                                                {lesson.module && (
                                                    <>
                                                        <span>•</span>
                                                        <span className="bg-gray-200 dark:bg-white/10 px-1.5 rounded text-[10px]">{lesson.module}</span>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        )}
                    </div>
                )}
            </div>
        </div>

        {/* Detailed Learner Modal */}
        {selectedLearner && (
            <LearnerDetailModal 
                learner={selectedLearner}
                course={course}
                onClose={() => setSelectedLearner(null)}
                onUpdate={refreshData}
            />
        )}
    </div>
  );
};