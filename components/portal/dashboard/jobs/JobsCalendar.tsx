
import React, { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight, Clock, MapPin, Calendar as CalendarIcon, Briefcase } from 'lucide-react';
import { mockDb, Job } from '../../../../data/mockDatabase';
import { JobDetailsModal } from './JobDetailsModal';
import { ToastType } from '../Toast';

interface JobsCalendarProps {
  navigateToSection: (section: string, jobId?: string) => void;
  showToast: (msg: string, type: ToastType) => void;
}

export const JobsCalendar = ({ navigateToSection, showToast }: JobsCalendarProps) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);

  // Fetch all jobs relevant to the user (Booked + History)
  const allUserJobs = useMemo(() => {
    return [...mockDb.getBookedJobs(), ...mockDb.getJobHistory()];
  }, []);

  // Calendar Logic
  const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay(); // 0 = Sun

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);
  
  // Adjust for Monday start (0=Sun -> 6, 1=Mon -> 0)
  const startOffset = firstDay === 0 ? 6 : firstDay - 1;

  const days = [];
  // Previous month padding
  for (let i = 0; i < startOffset; i++) {
    days.push(null);
  }
  // Current month days
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(new Date(year, month, i));
  }

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));
  const goToday = () => {
      const now = new Date();
      setCurrentDate(now);
      setSelectedDay(new Date(now.getFullYear(), now.getMonth(), now.getDate()));
  };

  // Get jobs for a specific date
  const getJobsForDate = (date: Date) => {
    return allUserJobs.filter(job => {
      const jobDate = new Date(job.date);
      return (
        jobDate.getDate() === date.getDate() &&
        jobDate.getMonth() === date.getMonth() &&
        jobDate.getFullYear() === date.getFullYear()
      );
    });
  };

  const selectedDayJobs = selectedDay ? getJobsForDate(selectedDay) : [];

  return (
    <div className="animate-in fade-in duration-500 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 md:mb-8 gap-4">
        <div>
            <h2 className="text-2xl md:text-4xl font-serif font-bold text-jambo-950 dark:text-white mb-2">Schedule</h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm md:text-lg">Plan your upcoming assignments.</p>
        </div>
        
        <div className="flex items-center gap-4 bg-white dark:bg-[#1a1625] p-2 rounded-xl shadow-sm border border-gray-200 dark:border-white/10">
            <button onClick={prevMonth} className="p-2 hover:bg-gray-100 dark:hover:bg-white/10 rounded-lg transition-colors">
                <ChevronLeft size={20} className="text-gray-600 dark:text-gray-300"/>
            </button>
            <div className="text-center min-w-[140px]">
                <h3 className="font-bold text-gray-900 dark:text-white text-lg">
                    {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
                </h3>
            </div>
            <button onClick={nextMonth} className="p-2 hover:bg-gray-100 dark:hover:bg-white/10 rounded-lg transition-colors">
                <ChevronRight size={20} className="text-gray-600 dark:text-gray-300"/>
            </button>
            <div className="w-px h-6 bg-gray-200 dark:bg-white/10 mx-2"></div>
            <button onClick={goToday} className="text-sm font-bold text-jambo-600 dark:text-jambo-400 hover:underline px-2">
                Today
            </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8 h-full">
         
         {/* Calendar Grid */}
         <div className="lg:col-span-2 bg-white dark:bg-[#1a1625] rounded-2xl shadow-lg border border-gray-200 dark:border-white/5 p-6">
            {/* Weekday Headers */}
            <div className="grid grid-cols-7 mb-4">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                    <div key={day} className="text-center text-xs font-bold text-gray-400 uppercase tracking-widest py-2">
                        {day}
                    </div>
                ))}
            </div>
            
            {/* Days Grid */}
            <div className="grid grid-cols-7 gap-2">
                {days.map((date, i) => {
                    if (!date) return <div key={`empty-${i}`} className="aspect-square bg-transparent"></div>;
                    
                    const dayJobs = getJobsForDate(date);
                    const isToday = new Date().toDateString() === date.toDateString();
                    const isSelected = selectedDay?.toDateString() === date.toDateString();
                    
                    return (
                        <div 
                            key={i}
                            onClick={() => setSelectedDay(date)}
                            className={`aspect-square rounded-xl border p-2 relative cursor-pointer transition-all hover:shadow-md flex flex-col justify-between group
                                ${isSelected 
                                    ? 'border-jambo-600 bg-jambo-50 dark:bg-jambo-900/20 dark:border-jambo-500 ring-1 ring-jambo-600' 
                                    : 'border-gray-100 dark:border-white/5 bg-gray-50/50 dark:bg-white/5 hover:border-gray-300 dark:hover:border-white/20'
                                }
                            `}
                        >
                            <span className={`text-sm font-bold ${isToday ? 'bg-brand-orange text-white w-6 h-6 rounded-full flex items-center justify-center' : 'text-gray-700 dark:text-gray-300'}`}>
                                {date.getDate()}
                            </span>
                            
                            {/* Job Indicators */}
                            <div className="space-y-1 mt-1 overflow-hidden">
                                {dayJobs.slice(0, 3).map(job => (
                                    <div 
                                        key={job.id} 
                                        className={`h-1.5 rounded-full w-full ${
                                            job.status === 'Completed' ? 'bg-green-500' :
                                            job.status === 'Cancelled' ? 'bg-gray-400' :
                                            job.category === 'Translation' ? 'bg-brand-teal' : 'bg-jambo-500'
                                        }`} 
                                    ></div>
                                ))}
                                {dayJobs.length > 3 && (
                                    <div className="text-[9px] text-gray-400 text-right leading-none">+ {dayJobs.length - 3} more</div>
                                )}
                            </div>

                            {/* HOVER TOOLTIP */}
                            {dayJobs.length > 0 && (
                                <div className="absolute bottom-full left-1/2 -translate-x-1/2 pb-2 w-56 hidden group-hover:block z-50 animate-in fade-in slide-in-from-bottom-2 duration-200">
                                    <div className="bg-gray-900 dark:bg-black text-white text-xs rounded-xl p-2 shadow-xl border border-white/10 relative">
                                        <div className="font-bold mb-2 pb-2 border-b border-white/10 text-gray-300 px-2 pt-1">
                                            {date.toLocaleDateString(undefined, { weekday: 'short', day: 'numeric', month: 'short' })}
                                        </div>
                                        <div className="space-y-1">
                                            {dayJobs.map(j => (
                                                <div 
                                                    key={j.id} 
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setSelectedJob(j);
                                                    }}
                                                    className="flex gap-2 items-center p-2 rounded-lg hover:bg-white/10 cursor-pointer transition-colors text-left group/item"
                                                >
                                                    <div className={`w-2 h-2 rounded-full shrink-0 ${
                                                        j.category === 'Translation' ? 'bg-brand-teal' : 'bg-jambo-500'
                                                    }`}></div>
                                                    <div className="min-w-0 flex-1">
                                                        <span className="block font-bold truncate group-hover/item:text-brand-orange transition-colors">{j.title}</span>
                                                        <span className="text-gray-400 text-[10px] block">{j.time || 'All Day'}</span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        {/* Arrow */}
                                        <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-[1px] border-4 border-transparent border-t-gray-900 dark:border-t-black"></div>
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
         </div>

         {/* Side Panel: Day Details */}
         <div className="lg:col-span-1 flex flex-col h-full">
            <div className="bg-white dark:bg-[#1a1625] rounded-2xl shadow-lg border border-gray-200 dark:border-white/5 p-6 flex-grow">
                <div className="border-b border-gray-100 dark:border-white/5 pb-4 mb-4">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white font-serif">
                        {selectedDay ? selectedDay.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' }) : 'Select a date'}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        {selectedDayJobs.length} Assignment{selectedDayJobs.length !== 1 ? 's' : ''}
                    </p>
                </div>

                <div className="space-y-4 overflow-y-auto max-h-[500px] custom-scrollbar pr-2">
                    {selectedDayJobs.length === 0 ? (
                        <div className="text-center py-10 text-gray-400">
                            <CalendarIcon size={32} className="mx-auto mb-3 opacity-50" />
                            <p className="text-sm">No jobs scheduled for this date.</p>
                        </div>
                    ) : (
                        selectedDayJobs.map(job => (
                            <div 
                                key={job.id} 
                                onClick={() => setSelectedJob(job)}
                                className="group p-4 rounded-xl border border-gray-100 dark:border-white/5 hover:border-jambo-200 dark:hover:border-jambo-600 bg-gray-50 dark:bg-white/5 hover:bg-white dark:hover:bg-white/10 transition-all cursor-pointer shadow-sm hover:shadow-md"
                            >
                                <div className="flex justify-between items-start mb-2">
                                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border 
                                        ${job.status === 'Completed' ? 'bg-green-100 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-400' : 
                                          job.status === 'Cancelled' ? 'bg-gray-100 text-gray-500 border-gray-200 dark:bg-gray-800 dark:text-gray-400' :
                                          'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300'}
                                    `}>
                                        {job.status}
                                    </span>
                                    <span className="text-xs font-bold text-gray-500">{job.time || 'Deadline'}</span>
                                </div>
                                <h4 className="font-bold text-gray-900 dark:text-white mb-1 group-hover:text-jambo-600 dark:group-hover:text-jambo-400 transition-colors">{job.title}</h4>
                                <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                                    <Briefcase size={12} /> {job.category}
                                    <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                                    <MapPin size={12} /> {job.location.split(',')[0]}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
         </div>
      </div>

      {selectedJob && (
        <JobDetailsModal 
            job={selectedJob} 
            onClose={() => setSelectedJob(null)}
            onNavigate={navigateToSection}
            showToast={showToast}
        />
      )}
    </div>
  );
};
