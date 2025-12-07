import React, { useState } from 'react';
import {
  Clock,
  Star,
  AlertTriangle,
  ArrowRight,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

import { mockDb, Job } from '@/data/mockDatabase';
import { AdminJobModal } from '../jobs/AdminJobModal';
import { UserProfileModal } from '../users/UserProfileModal';

interface OngoingJobsWidgetProps {
  onNavigate?: (section: string, filter?: string) => void;
}

export const OngoingJobsWidget = ({ onNavigate }: OngoingJobsWidgetProps) => {
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [selectedLinguistId, setSelectedLinguistId] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(true);

  const jobs = mockDb
    .getAllJobs()
    .filter(j => j.status === 'In Progress' || j.status === 'Scheduled')
    .sort(
      (a, b) =>
        new Date(`${a.date} ${a.time || '00:00'}`).getTime() -
        new Date(`${b.date} ${b.time || '00:00'}`).getTime()
    )
    .slice(0, 5);

  const getUrgency = (job: Job) => {
    const now = new Date();
    const jobTime = new Date(`${job.date} ${job.time || '00:00'}`);
    const diffHrs = (jobTime.getTime() - now.getTime()) / 36e5;

    if (diffHrs < 0)
      return { label: 'Overdue', color: 'text-red-500 bg-red-50 dark:bg-red-900/20' };
    if (diffHrs < 24)
      return { label: 'Due Today', color: 'text-orange-500 bg-orange-50 dark:bg-orange-900/20' };
    return { label: 'Upcoming', color: 'text-blue-500 bg-blue-50 dark:bg-blue-900/20' };
  };

  const getLinguist = (id?: string | null) =>
    id ? mockDb.getAllUsers().find(u => u.id === id) : null;

  const getConfidence = (id: string) => (4 + (id.length % 10) / 10).toFixed(1);

  const handleLinguistClick = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setSelectedLinguistId(id);
  };

  return (
    <>
      <div className="bg-white dark:bg-[#13111c] rounded-xl shadow-sm border border-gray-200 dark:border-white/5 overflow-hidden flex flex-col transition-all">
        <div
          className="p-5 border-b border-gray-100 dark:border-white/5 flex justify-between items-center bg-gray-50/50 dark:bg-white/5 cursor-pointer"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="flex items-center gap-3">
            <h3 className="font-bold text-gray-900 dark:text-white flex items-center gap-2 font-serif">
              <Clock size={18} className="text-purple-500" />
              Ongoing Operations
            </h3>
            <span className="text-[10px] font-bold bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 px-2 py-0.5 rounded-full">
              {jobs.length} Active
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={e => {
                e.stopPropagation();
                onNavigate?.('jobs', 'Scheduled');
              }}
              className="text-xs font-bold text-blue-600 hover:underline px-2 py-1"
            >
              View All
            </button>
            <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors">
              {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>
          </div>
        </div>

        {isExpanded && (
          <div className="animate-in slide-in-from-top-2 duration-300">
            {/* Mobile List */}
            <div className="md:hidden divide-y divide-gray-100 dark:divide-white/5">
              {jobs.map(job => {
                const urgency = getUrgency(job);
                const linguist = getLinguist(job.linguistId);
                const confidence = linguist ? getConfidence(linguist.id) : '0.0';

                return (
                  <div
                    key={job.id}
                    className="p-4 space-y-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-white/5"
                    onClick={() => setSelectedJob(job)}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <span
                          className={`text-[10px] font-bold px-2 py-1 rounded-md flex items-center gap-1 w-fit ${urgency.color}`}
                        >
                          {urgency.label === 'Overdue' && <AlertTriangle size={10} />}
                          {urgency.label}
                        </span>

                        <p className="font-bold text-gray-900 dark:text-white mt-1">{job.title}</p>
                        <p className="text-xs text-gray-500">
                          {job.category} • {job.location}
                        </p>
                      </div>

                      <button className="p-2 text-gray-400">
                        <ArrowRight size={16} />
                      </button>
                    </div>

                    {linguist && (
                      <div
                        onClick={e => handleLinguistClick(e, linguist.id)}
                        className="flex items-center gap-2 p-2 bg-gray-50 dark:bg-white/5 rounded-lg"
                      >
                        <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-white/10 flex items-center justify-center overflow-hidden border border-white dark:border-white/10 text-xs font-bold text-gray-500">
                          {linguist.avatarUrl ? (
                            <img src={linguist.avatarUrl} className="w-full h-full object-cover" />
                          ) : (
                            linguist.firstName[0]
                          )}
                        </div>

                        <div>
                          <p className="font-bold text-gray-800 dark:text-gray-200 text-xs hover:text-jambo-600 hover:underline">
                            {linguist.firstName} {linguist.lastName}
                          </p>
                          <p className="text-[10px] text-orange-500 font-bold flex items-center gap-0.5">
                            <Star size={8} fill="currentColor" /> {confidence} Confidence
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-50 dark:bg-white/5 text-[10px] font-bold text-gray-500 uppercase tracking-wider border-b border-gray-100 dark:border-white/5">
                  <tr>
                    <th className="px-5 py-3">Urgency</th>
                    <th className="px-5 py-3">Job Details</th>
                    <th className="px-5 py-3">Assigned Linguist</th>
                    <th className="px-5 py-3 text-right">Action</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100 dark:divide-white/5">
                  {jobs.map(job => {
                    const urgency = getUrgency(job);
                    const linguist = getLinguist(job.linguistId);
                    const confidence = linguist ? getConfidence(linguist.id) : '0.0';

                    return (
                      <tr
                        key={job.id}
                        className="hover:bg-gray-50 dark:hover:bg-white/5 transition-colors group cursor-pointer"
                        onClick={() => setSelectedJob(job)}
                      >
                        <td className="px-5 py-3 whitespace-nowrap">
                          <span
                            className={`text-[10px] font-bold px-2 py-1 rounded-md flex items-center gap-1 w-fit ${urgency.color}`}
                          >
                            {urgency.label === 'Overdue' && <AlertTriangle size={10} />}
                            {urgency.label}
                          </span>
                          <p className="text-[10px] text-gray-400 mt-1">
                            {job.date} • {job.time}
                          </p>
                        </td>

                        <td className="px-5 py-3 max-w-[200px]">
                          <p className="font-bold text-gray-900 dark:text-white truncate">
                            {job.title}
                          </p>
                          <p className="text-xs text-gray-500 truncate">
                            {job.category} • {job.location}
                          </p>
                        </td>

                        <td className="px-5 py-3">
                          {linguist ? (
                            <div
                              className="flex items-center gap-2"
                              onClick={e => handleLinguistClick(e, linguist.id)}
                            >
                              <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-white/10 flex items-center justify-center overflow-hidden border border-white dark:border-gray-800 shrink-0">
                                {linguist.avatarUrl ? (
                                  <img
                                    src={linguist.avatarUrl}
                                    className="w-full h-full object-cover"
                                    alt={`${linguist.firstName}'s avatar`}
                                  />
                                ) : (
                                  <span className="text-xs font-bold text-gray-500">
                                    {linguist.firstName[0]}
                                  </span>
                                )}
                              </div>

                              <div>
                                <p className="font-bold text-gray-800 dark:text-gray-200 text-xs hover:text-jambo-600 hover:underline">
                                  {linguist.firstName} {linguist.lastName}
                                </p>
                                <p className="text-[10px] text-orange-500 font-bold flex items-center gap-0.5">
                                  <Star size={8} fill="currentColor" /> {confidence} Confidence
                                </p>
                              </div>
                            </div>
                          ) : (
                            <span className="text-xs text-gray-400 italic">Unassigned</span>
                          )}
                        </td>

                        <td className="px-5 py-3 text-right">
                          <button className="p-1.5 rounded-lg bg-gray-100 dark:bg-white/10 text-gray-500 hover:text-jambo-600 dark:hover:text-white transition-colors">
                            <ArrowRight size={16} />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {jobs.length === 0 && (
              <div className="p-8 text-center text-gray-400 text-sm">
                No ongoing operations at this time.
              </div>
            )}
          </div>
        )}
      </div>

      {selectedJob && (
        <AdminJobModal
          job={selectedJob}
          onClose={() => setSelectedJob(null)}
          onUpdate={() => {
            const updated = mockDb.getAllJobs().find(j => j.id === selectedJob.id);
            if (updated) setSelectedJob(updated);
          }}
        />
      )}

      {selectedLinguistId && (
        <UserProfileModal
          user={mockDb.getAllUsers().find(u => u.id === selectedLinguistId)!}
          onClose={() => setSelectedLinguistId(null)}
          onUpdate={() => {}}
          onNavigate={onNavigate}
        />
      )}
    </>
  );
};
