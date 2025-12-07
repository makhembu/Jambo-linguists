import React, { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight, Clock, MapPin, Calendar as CalendarIcon, Briefcase, User, Users, Filter, X } from 'lucide-react';
import { mockDb, Job } from '@/data/mockDatabase';
import { AdminJobModal } from './AdminJobModal';
import { Toast, ToastType } from '../../portal/dashboard/Toast';
import { Badge } from '../../ui/Badge';

export const AdminJobsCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState<Date>(new Date());
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isMobileAgendaOpen, setIsMobileAgendaOpen] = useState(false);
  
  const [toast, setToast] = useState<{ visible: boolean; message: string; type: ToastType }>({
    visible: false,
    message: '',
    type: 'success'
  });

  const showToast = (message: string, type: ToastType = 'success') => {
    setToast({ visible: true, message, type });
  };

  // Fetch ALL jobs for admin view
  const allJobs = mockDb.getAllJobs();
  const allUsers = mockDb.getAllUsers();

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
      // If mobile, jump to today in drawer? Or just select.
      if (window.innerWidth < 1280) setIsMobileAgendaOpen(true);
  };

  const handleDayClick = (date: Date) => {
      setSelectedDay(date);
      // Open drawer on mobile/tablet (xl breakpoint is where layout shifts)
      if (window.innerWidth < 1280) {
          setIsMobileAgendaOpen(true);
      }
  };

  // Get jobs for a specific date
  const getJobsForDate = (date: Date) => {
    return allJobs.filter(job => {
      const jobDate = new Date(job.date);
      return (
        jobDate.getDate() === date.getDate() &&
        jobDate.getMonth() === date.getMonth() &&
        jobDate.getFullYear() === date.getFullYear()
      );
    });
  };

  const selectedDayJobs = selectedDay ? getJobsForDate(selectedDay) : [];

  const getLinguistName = (id?: string | null) => {
      if (!id) return null;
      const user = allUsers.find(u => u.id === id);
      return user ? `${user.firstName} ${user.lastName}` : 'Unknown';
  };

  const getStatusColor = (status: string) => {
      switch(status) {
          case 'Open': return 'bg-green-500';
          case 'Scheduled': return 'bg-blue-500';
          case 'In Progress': return 'bg-purple-500 animate-pulse';
          case 'Pending Approval': return 'bg-orange-500';
          case 'Revision': return 'bg-red-500';
          case 'Completed': return 'bg-gray-500';
          case 'Cancelled': return 'bg-gray-300';
          default: return 'bg-gray-400';
      }
  };

  // Reusable Job List Component
  const AgendaList = ({ jobs }: { jobs: Job[] }) => (
    <div className="space-y-3">
        {jobs.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10 text-gray-400 text-center">
                <Briefcase size={32} className="mb-3 opacity-20" />
                <p className="text-sm">No jobs scheduled.</p>
            </div>
        ) : (
            jobs.map(job => {
                const linguistName = getLinguistName(job.linguistId);
                return (
                    <div 
                        key={job.id} 
                        onClick={() => setSelectedJob(job)}
                        className="group p-4 rounded-xl border border-gray-100 dark:border-white/5 hover:border-jambo-300 dark:hover:border-jambo-600 bg-white dark:bg-white/5 hover:bg-gray-50 dark:hover:bg-white/10 transition-all cursor-pointer relative overflow-hidden shadow-sm"
                    >
                        <div className={`absolute left-0 top-0 bottom-0 w-1 ${getStatusColor(job.status)}`}></div>
                        
                        <div className="flex justify-between items-start mb-2 pl-2">
                            <Badge variant="neutral" className="text-[10px]">{job.status}</Badge>
                            <span className="text-xs font-bold text-gray-500 flex items-center gap-1">
                                <Clock size={12} /> {job.time || 'All Day'}
                            </span>
                        </div>
                        
                        <div className="pl-2">
                            <h4 className="font-bold text-gray-900 dark:text-white text-sm mb-1 line-clamp-1 group-hover:text-jambo-600 dark:group-hover:text-jambo-400 transition-colors">
                                {job.title}
                            </h4>
                            
                            <div className="space-y-1.5 mt-2">
                                <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                                    <MapPin size={12} className="shrink-0" /> 
                                    <span className="truncate">{job.location.split(',')[0]}</span>
                                </div>
                                <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-white/10 p-1.5 rounded-lg border border-gray-100 dark:border-white/5">
                                    {linguistName ? (
                                        <>
                                            <User size={12} className="text-jambo-600 dark:text-jambo-400 shrink-0" />
                                            <span className="font-bold text-gray-700 dark:text-gray-300 truncate">{linguistName}</span>
                                        </>
                                    ) : (
                                        <>
                                            <Users size={12} className="text-gray-400 shrink-0" />
                                            <span className="italic text-gray-400">Unassigned</span>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })
        )}
    </div>
  );

  return (
    <div className="space-y-6 h-full flex flex-col">
      <Toast 
        message={toast.message} 
        type={toast.type} 
        isVisible={toast.visible} 
        onClose={() => setToast(prev => ({ ...prev, visible: false }))} 
      />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 shrink-0">
        <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <CalendarIcon className="text-jambo-600 dark:text-jambo-400" /> 
                Calendar
            </h2>
        </div>
        
        <div className="flex items-center justify-between md:justify-end gap-3 bg-white dark:bg-[#13111c] p-1.5 rounded-xl shadow-sm border border-gray-200 dark:border-white/5 w-full md:w-auto">
            <button onClick={prevMonth} className="p-2 hover:bg-gray-100 dark:hover:bg-white/10 rounded-lg transition-colors">
                <ChevronLeft size={20} className="text-gray-600 dark:text-gray-300"/>
            </button>
            <div className="text-center min-w-[120px]">
                <h3 className="font-bold text-gray-900 dark:text-white text-base md:text-lg">
                    {currentDate.toLocaleString('default', { month: 'short', year: 'numeric' })}
                </h3>
            </div>
            <button onClick={nextMonth} className="p-2 hover:bg-gray-100 dark:hover:bg-white/10 rounded-lg transition-colors">
                <ChevronRight size={20} className="text-gray-600 dark:text-gray-300"/>
            </button>
            <div className="w-px h-6 bg-gray-200 dark:bg-white/10 mx-1 hidden md:block"></div>
            <button onClick={goToday} className="text-xs md:text-sm font-bold text-jambo-600 dark:text-jambo-400 hover:bg-jambo-50 dark:hover:bg-jambo-900/20 px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap">
                Today
            </button>
        </div>
      </div>

      <div className="grid xl:grid-cols-4 gap-6 flex-1 min-h-0">
         
         {/* Calendar Grid */}
         <div className="xl:col-span-3 bg-white dark:bg-[#13111c] rounded-2xl shadow-sm border border-gray-200 dark:border-white/5 p-2 md:p-6 flex flex-col h-full overflow-hidden">
            {/* Weekday Headers */}
            <div className="grid grid-cols-7 mb-2 border-b border-gray-100 dark:border-white/5 pb-2">
                {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => (
                    <div key={i} className="text-center text-[10px] md:text-xs font-bold text-gray-400 uppercase">
                        {day}
                    </div>
                ))}
            </div>
            
            {/* Days Grid */}
            <div className="grid grid-cols-7 gap-px md:gap-1 lg:gap-2 flex-1 auto-rows-fr">
                {days.map((date, i) => {
                    if (!date) return <div key={`empty-${i}`} className="bg-transparent"></div>;
                    
                    const dayJobs = getJobsForDate(date);
                    const isToday = new Date().toDateString() === date.toDateString();
                    const isSelected = selectedDay?.toDateString() === date.toDateString();
                    
                    return (
                        <div 
                            key={i}
                            onClick={() => handleDayClick(date)}
                            className={`
                                rounded-lg md:rounded-xl border p-1 md:p-2 cursor-pointer transition-all flex flex-col gap-1 h-full min-h-[60px] md:min-h-[100px]
                                ${isSelected 
                                    ? 'border-jambo-600 bg-jambo-50 dark:bg-jambo-900/20 dark:border-jambo-500 ring-1 ring-jambo-600 z-10' 
                                    : 'border-gray-100 dark:border-white/5 bg-white dark:bg-white/5 hover:border-gray-300 dark:hover:border-white/20'
                                }
                            `}
                        >
                            <div className="flex justify-center md:justify-between items-center">
                                <span className={`text-xs md:text-sm font-bold w-6 h-6 rounded-full flex items-center justify-center ${isToday ? 'bg-brand-orange text-white' : 'text-gray-700 dark:text-gray-300'}`}>
                                    {date.getDate()}
                                </span>
                                <span className="hidden md:inline text-[10px] text-gray-400 font-medium">
                                    {dayJobs.length > 0 ? `${dayJobs.length} Jobs` : ''}
                                </span>
                            </div>
                            
                            {/* MOBILE DOTS INDICATOR (Visible on small screens) */}
                            <div className="flex xl:hidden flex-wrap justify-center gap-1 mt-1 content-start h-full">
                                {dayJobs.slice(0, 5).map(job => (
                                    <div key={job.id} className={`w-1.5 h-1.5 rounded-full ${getStatusColor(job.status)}`}></div>
                                ))}
                                {dayJobs.length > 5 && <span className="text-[8px] text-gray-400 leading-none self-center">+</span>}
                            </div>

                            {/* DESKTOP LIST (Visible on xl screens) */}
                            <div className="hidden xl:flex flex-col gap-1 mt-1 overflow-y-auto custom-scrollbar flex-1">
                                {dayJobs.slice(0, 3).map(job => (
                                    <div 
                                        key={job.id} 
                                        className="flex items-center gap-1.5 px-1.5 py-1 rounded bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5 hover:border-jambo-200 dark:hover:border-jambo-700 transition-colors group"
                                    >
                                        <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${getStatusColor(job.status)}`}></div>
                                        <span className="text-[10px] text-gray-600 dark:text-gray-300 truncate font-medium group-hover:text-jambo-600 dark:group-hover:text-jambo-400">
                                            {job.time || 'All Day'} - {getLinguistName(job.linguistId) || 'Unassigned'}
                                        </span>
                                    </div>
                                ))}
                                {dayJobs.length > 3 && (
                                    <div className="text-[9px] text-gray-400 text-center font-bold">+ {dayJobs.length - 3} more</div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
         </div>

         {/* Desktop Side Panel: Daily Agenda (Visible only on XL) */}
         <div className="hidden xl:flex xl:col-span-1 flex-col h-full bg-white dark:bg-[#13111c] rounded-2xl shadow-sm border border-gray-200 dark:border-white/5 overflow-hidden">
            <div className="p-5 border-b border-gray-100 dark:border-white/5 bg-gray-50/50 dark:bg-white/5">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white font-serif">
                    {selectedDay.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'short' })}
                </h3>
                <div className="flex justify-between items-center mt-2">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        {selectedDayJobs.length} Assignment{selectedDayJobs.length !== 1 ? 's' : ''}
                    </p>
                </div>
            </div>
            <div className="flex-1 overflow-y-auto custom-scrollbar p-4">
                <AgendaList jobs={selectedDayJobs} />
            </div>
         </div>
      </div>

      {/* MOBILE AGENDA BOTTOM SHEET (Drawer) */}
      {isMobileAgendaOpen && (
        <div className="fixed inset-0 z-50 xl:hidden flex flex-col justify-end">
            <div 
                className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
                onClick={() => setIsMobileAgendaOpen(false)}
            ></div>
            <div className="bg-white dark:bg-[#1a1625] w-full rounded-t-3xl shadow-2xl relative z-10 flex flex-col max-h-[85vh] animate-in slide-in-from-bottom-full duration-300">
                
                {/* Drag Handle */}
                <div className="w-full flex justify-center pt-3 pb-1" onClick={() => setIsMobileAgendaOpen(false)}>
                    <div className="w-12 h-1.5 bg-gray-300 dark:bg-white/20 rounded-full"></div>
                </div>

                <div className="p-6 border-b border-gray-100 dark:border-white/5 flex justify-between items-center">
                    <div>
                        <h3 className="text-2xl font-serif font-bold text-gray-900 dark:text-white">
                            {selectedDay.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'short' })}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                            {selectedDayJobs.length} Assignment{selectedDayJobs.length !== 1 ? 's' : ''}
                        </p>
                    </div>
                    <button 
                        onClick={() => setIsMobileAgendaOpen(false)}
                        className="p-2 bg-gray-100 dark:bg-white/10 rounded-full text-gray-500 dark:text-gray-300"
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto custom-scrollbar p-4 pb-8 bg-gray-50 dark:bg-black/20">
                    <AgendaList jobs={selectedDayJobs} />
                </div>
            </div>
        </div>
      )}

      {selectedJob && (
        <AdminJobModal 
            job={selectedJob} 
            onClose={() => setSelectedJob(null)}
            onUpdate={(msg) => {
                if(msg) showToast(msg, 'success');
                const updatedJob = mockDb.getAllJobs().find(j => j.id === selectedJob?.id);
                if (updatedJob) {
                    setSelectedJob(updatedJob);
                }
            }}
        />
      )}
    </div>
  );
};
