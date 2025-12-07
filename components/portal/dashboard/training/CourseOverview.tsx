
import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ChevronLeft, PlayCircle, Clock, BookOpen, CheckCircle, User, Award, Loader2, Lock, MessageSquare } from 'lucide-react';
import { mockDb, Lesson } from '@/data/mockDatabase';

interface CourseOverviewProps {
  courseId: string;
  onEnroll: () => void;
  onBack: () => void;
}

export const CourseOverview = ({ courseId, onEnroll, onBack }: CourseOverviewProps) => {
  const [isEnrolling, setIsEnrolling] = useState(false);
  const [enrollError, setEnrollError] = useState<string | null>(null);
  
  const course = mockDb.getCourse(courseId);
  const lessons = mockDb.getLessons(courseId);
  const globalSettings = mockDb.getSettings();

  // Determine enrollment capability
  const canSelfEnroll = globalSettings.globalSelfEnrollment && course?.allowSelfEnrollment;
  const isEnrolled = !!course?.progress;

  // Lock body scroll when overview is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleEnrollClick = () => {
    setEnrollError(null);
    setIsEnrolling(true);
    
    setTimeout(() => {
        const result = mockDb.enrollCourse(courseId);
        if (result.success) {
            onEnroll();
        } else {
            setEnrollError(result.message || 'Enrollment failed.');
            setIsEnrolling(false);
        }
    }, 1000);
  };

  if (!course) return null;

  const content = (
    <div className="fixed inset-0 z-[100] bg-gray-50 dark:bg-[#0f0a15] overflow-y-auto custom-scrollbar animate-in fade-in duration-300">
      {/* Header Image Area */}
      <div className="relative h-[300px] md:h-[400px]">
         <div className="absolute inset-0">
            <img src={course.thumbnailUrl} alt={course.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent"></div>
         </div>
         
         <div className="absolute top-6 left-6 z-20">
             <button 
                onClick={onBack}
                className="bg-white/20 hover:bg-white/30 backdrop-blur-md text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-colors border border-white/20"
             >
                <ChevronLeft size={18} /> Back to Library
             </button>
         </div>

         <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 z-20">
             <div className="max-w-5xl mx-auto">
                 <span className="inline-block bg-jambo-600 text-white text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4 shadow-lg">
                    {course.category}
                 </span>
                 <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4 drop-shadow-lg">{course.title}</h1>
                 <div className="flex flex-wrap items-center gap-6 text-gray-200 text-sm font-medium">
                    <span className="flex items-center gap-2"><Clock size={16} /> {course.duration}</span>
                    <span className="flex items-center gap-2"><BookOpen size={16} /> {lessons.length} Lessons</span>
                    <span className="flex items-center gap-2"><Award size={16} /> Certificate Included</span>
                 </div>
             </div>
         </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-12 grid lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
             
             {/* About */}
             <section className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">About This Course</h3>
                <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                   {course.description}
                </p>
             </section>

             {/* Learning Goals */}
             <section className="bg-white dark:bg-white/5 p-8 rounded-2xl border border-gray-100 dark:border-white/5 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500 delay-100">
                 <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">What You'll Learn</h3>
                 <div className="grid md:grid-cols-2 gap-4">
                     {course.learningGoals?.map((goal, i) => (
                         <div key={i} className="flex items-start gap-3">
                             <CheckCircle size={20} className="text-green-500 shrink-0 mt-0.5" />
                             <span className="text-gray-700 dark:text-gray-200">{goal}</span>
                         </div>
                     )) || <p className="text-gray-500">No specific goals listed.</p>}
                 </div>
             </section>

             {/* Syllabus Preview */}
             <section className="animate-in fade-in slide-in-from-bottom-4 duration-500 delay-200">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Course Content</h3>
                <div className="bg-white dark:bg-white/5 rounded-2xl border border-gray-200 dark:border-white/5 divide-y divide-gray-100 dark:divide-white/5 overflow-hidden">
                    {lessons.map((lesson, i) => (
                        <div key={lesson.id} className="p-4 md:p-5 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-white/5 transition-colors group">
                            <div className="flex items-center gap-4">
                                <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-white/10 flex items-center justify-center text-gray-400 font-bold text-sm">
                                    {i + 1}
                                </div>
                                <div>
                                    <p className="font-bold text-gray-900 dark:text-white group-hover:text-jambo-600 dark:group-hover:text-jambo-400 transition-colors">
                                        {lesson.title}
                                    </p>
                                    <p className="text-xs text-gray-500">{lesson.type}</p>
                                </div>
                            </div>
                            <span className="text-xs font-bold text-gray-400 uppercase">{lesson.duration}</span>
                        </div>
                    ))}
                </div>
             </section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
              
              {/* Instructor Notes (if enrolled) */}
              {isEnrolled && course.progress?.instructorNotes && (
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-2xl border border-blue-200 dark:border-blue-800 shadow-lg animate-in fade-in slide-in-from-right-4">
                      <div className="flex items-center gap-2 mb-3 text-blue-800 dark:text-blue-300 font-bold">
                          <MessageSquare size={18} /> Instructor Feedback
                      </div>
                      <p className="text-sm text-blue-900 dark:text-blue-100 italic leading-relaxed">
                          "{course.progress.instructorNotes}"
                      </p>
                  </div>
              )}

              {/* Enrollment Card */}
              <div className="bg-white dark:bg-[#1a1625] p-6 rounded-2xl border border-gray-200 dark:border-white/5 shadow-xl sticky top-6">
                  <div className="mb-6 pb-6 border-b border-gray-100 dark:border-white/5">
                      <span className="text-3xl font-bold text-gray-900 dark:text-white">Free</span>
                      <span className="text-gray-500 ml-2 text-sm line-through">£99.00</span>
                  </div>
                  
                  {isEnrolled ? (
                      <button 
                        onClick={onEnroll} // "Resume" actually just navigates to player via onEnroll prop callback
                        className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-xl shadow-lg transition-all mb-4 flex items-center justify-center gap-2"
                      >
                         <PlayCircle size={20} /> Resume Course
                      </button>
                  ) : (
                      canSelfEnroll ? (
                          <button 
                            onClick={handleEnrollClick}
                            disabled={isEnrolling}
                            className="w-full bg-jambo-600 hover:bg-jambo-700 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-jambo-600/30 transition-all mb-4 flex items-center justify-center gap-2 disabled:opacity-70"
                          >
                             {isEnrolling ? (
                                <>Enrollment in progress <Loader2 className="animate-spin" size={20} /></>
                             ) : (
                                <>Start Learning Now <PlayCircle size={20} /></>
                             )}
                          </button>
                      ) : (
                          <button 
                            disabled
                            className="w-full bg-gray-100 dark:bg-white/10 text-gray-400 dark:text-gray-500 font-bold py-4 rounded-xl mb-4 flex items-center justify-center gap-2 cursor-not-allowed border border-gray-200 dark:border-white/10"
                          >
                             <Lock size={18} /> Enrollment Closed
                          </button>
                      )
                  )}

                  {enrollError && (
                      <div className="mb-4 text-xs font-bold text-red-500 text-center bg-red-50 dark:bg-red-900/20 p-2 rounded border border-red-100 dark:border-red-900/30">
                          {enrollError}
                      </div>
                  )}
                  
                  <p className="text-center text-xs text-gray-500 dark:text-gray-400">
                      Full lifetime access • Certificate of completion
                  </p>
              </div>

              {/* Instructor Card */}
              <div className="bg-gray-50 dark:bg-white/5 p-6 rounded-2xl border border-gray-200 dark:border-white/5 shadow-lg">
                  <h4 className="text-sm font-bold uppercase text-gray-400 mb-4">Instructor</h4>
                  <div className="flex items-center gap-4 mb-3">
                      {course.instructor ? (
                          <div className="w-14 h-14 bg-jambo-200 rounded-full flex items-center justify-center text-jambo-800 font-bold text-xl">
                              {course.instructor.charAt(0)}
                          </div>
                      ) : (
                          <div className="w-12 h-12 rounded-full bg-jambo-100 text-jambo-700 dark:bg-jambo-900/30 dark:text-jambo-300 flex items-center justify-center">
                             <User size={24} />
                          </div>
                      )}
                      <div>
                          <p className="font-bold text-gray-900 dark:text-white">{course.instructor || "Jambo Team"}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">{course.instructorRole || "Language Expert"}</p>
                      </div>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300 italic">
                      "Expertly curated content designed to elevate your linguistic career to the next level."
                  </p>
              </div>
          </div>
      </div>
    </div>
  );

  return createPortal(content, document.body);
};
