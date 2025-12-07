
import React from 'react';
import { Calendar, MapPin, Clock, ChevronRight, Briefcase, AlertTriangle } from 'lucide-react';
import { Job } from '@/data/mockDatabase';
import { IconBox } from '../../../ui/IconBox';

// Helper function to get deadline status
const getDeadlineInfo = (jobDate: string, jobTime?: string) => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    const jobDateTime = new Date(jobDate);

    if (jobTime) {
        // Simple time parser for "HH:MM AM/PM"
        const timeParts = jobTime.match(/(\d+):(\d+)\s?(AM|PM)/i);
        if (timeParts) {
            let hours = parseInt(timeParts[1], 10);
            const minutes = parseInt(timeParts[2], 10);
            const period = timeParts[3].toUpperCase();

            if (period === 'PM' && hours < 12) {
                hours += 12;
            }
            if (period === 'AM' && hours === 12) { // Midnight case
                hours = 0;
            }
            jobDateTime.setHours(hours, minutes, 0, 0);
        }
    } else {
        // If no time, assume end of day for comparison purposes
        jobDateTime.setHours(23, 59, 59, 999);
    }
    
    const jobDay = new Date(jobDateTime.getFullYear(), jobDateTime.getMonth(), jobDateTime.getDate());

    if (jobDateTime < now) {
        return { text: 'Overdue', color: 'text-red-400 dark:text-red-500', Icon: AlertTriangle };
    }
    if (jobDay.getTime() === today.getTime()) {
        return { text: 'Due Today', color: 'text-orange-400 dark:text-orange-300', Icon: Clock };
    }
    return { text: 'Date & Time', color: 'text-jambo-200', Icon: Calendar }; // Default/Upcoming
};


export const NextAssignmentWidget = ({ job, onClick }: { job: Job | null, onClick: (section: string, jobId?: string) => void }) => {
  if (!job) {
     return (
        <div className="bg-gradient-to-br from-jambo-600 to-jambo-800 dark:from-jambo-950 dark:to-jambo-900 rounded-2xl p-8 text-white shadow-xl flex items-center justify-center min-h-[280px] relative overflow-hidden group transition-colors duration-300">
           {/* Texture */}
           <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 pointer-events-none"></div>
           
           <div className="text-center opacity-80 relative z-10 flex flex-col items-center">
              <div className="mb-4">
                 <IconBox icon={Briefcase} variant="glass" size="lg" />
              </div>
              <h3 className="text-xl font-bold font-serif">No Upcoming Assignments</h3>
              <p className="text-sm mt-2 text-jambo-200">Check the marketplace to find new work.</p>
           </div>
        </div>
     );
  }
  
  const deadlineInfo = getDeadlineInfo(job.date, job.time);
  const DeadlineIcon = deadlineInfo.Icon;

  return (
    <div className="bg-jambo-600 dark:bg-jambo-950 rounded-2xl p-8 text-white shadow-xl relative overflow-hidden group transition-colors duration-300">
      {/* Texture & Background Effects */}
      <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 pointer-events-none"></div>
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-40 h-40 bg-brand-orange/20 rounded-full blur-2xl translate-y-1/2 -translate-x-1/3"></div>
      
      <div className="relative z-10 flex justify-between items-start mb-6">
          <div>
              <div className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold uppercase tracking-widest mb-2 border border-white/20">
                  Next Assignment
              </div>
              <h3 className="text-2xl font-bold truncate pr-4 font-serif">{job.title}</h3>
          </div>
          <IconBox icon={Calendar} variant="glass" size="md" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 relative z-10 mb-8">
          <div>
              <p className={`text-xs uppercase font-bold mb-1 flex items-center gap-1.5 ${deadlineInfo.color}`}>
                <DeadlineIcon size={14} /> 
                {deadlineInfo.text}
              </p>
              <p className="font-medium text-sm md:text-base truncate">
                {new Date(job.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
                {job.time ? `, ${job.time}` : ''}
              </p>
          </div>
          <div>
              <p className="text-jambo-200 text-xs uppercase font-bold mb-1 flex items-center gap-1.5"><MapPin size={14}/> Location</p>
              <p className="font-medium truncate text-sm md:text-base">
                {job.location.split(',')[0]}
              </p>
          </div>
          <div>
              <p className="text-jambo-200 text-xs uppercase font-bold mb-1">Ref ID</p>
              <p className="font-mono text-sm md:text-base">#{job.id}</p>
          </div>
      </div>

      <div className="relative z-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center gap-4">
          <button 
            onClick={() => onClick('jobs-bookings', job.id)}
            className="w-full sm:w-auto flex-grow bg-white text-jambo-900 font-bold px-6 py-3 rounded-xl shadow-lg hover:bg-jambo-50 transition-colors flex items-center justify-center gap-2 whitespace-nowrap"
          >
              View Details <ChevronRight size={16} />
          </button>
          <button className="w-full sm:w-auto flex-shrink-0 px-6 py-3 bg-white/10 border border-white/30 rounded-xl font-bold hover:bg-white/20 transition-colors whitespace-nowrap">
              Get Directions
          </button>
      </div>
    </div>
  );
};
