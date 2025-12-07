import React, { useState } from 'react';
import { mockDb, Job } from '../../../../../data/mockDatabase';
import { Clock, CheckCircle, XCircle, MapPin, Briefcase } from 'lucide-react';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../../../ui/Table';
import { Badge } from '../../../ui/Badge';
import { AdminJobModal } from '../../jobs/AdminJobModal';

export const UserJobsTab = ({ userId }: { userId: string }) => {
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const jobs = mockDb.getJobsByUser(userId);

  if (jobs.length === 0) {
      return (
          <div className="text-center py-12 border border-dashed border-gray-200 dark:border-white/10 rounded-xl">
              <p className="text-gray-400">No job history found for this user.</p>
          </div>
      );
  }

  const getStatusBadge = (status: string) => {
      switch(status) {
          case 'Completed': return <Badge variant="success" icon={<CheckCircle size={10} />}>{status}</Badge>;
          case 'Cancelled': return <Badge variant="danger" icon={<XCircle size={10} />}>{status}</Badge>;
          case 'Scheduled': return <Badge variant="info" icon={<Clock size={10} />}>{status}</Badge>;
          default: return <Badge variant="neutral">{status}</Badge>;
      }
  };

  return (
    <>
      <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Assignment History</h3>
          <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-white/10">
              <Table>
                  <TableHeader>
                      <TableRow>
                          <TableHead>Date</TableHead>
                          <TableHead>Job Details</TableHead>
                          <TableHead>Location</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead align="right">Payout</TableHead>
                      </TableRow>
                  </TableHeader>
                  <TableBody>
                      {jobs.map(job => (
                          <TableRow key={job.id} onClick={() => setSelectedJob(job)}>
                              <TableCell>
                                  <span className="font-medium text-gray-900 dark:text-white">{new Date(job.date).toLocaleDateString()}</span>
                                  <span className="text-gray-500 block text-xs">{job.time}</span>
                              </TableCell>
                              <TableCell>
                                  <p className="font-bold text-gray-900 dark:text-white truncate max-w-[150px]">{job.title}</p>
                                  <p className="text-xs text-gray-500 flex items-center gap-1"><Briefcase size={10}/> {job.category}</p>
                              </TableCell>
                              <TableCell className="text-gray-600 dark:text-gray-400 text-xs">
                                  <div className="flex items-center gap-1"><MapPin size={10}/> {job.location.split(',')[0]}</div>
                              </TableCell>
                              <TableCell>
                                  {getStatusBadge(job.status)}
                              </TableCell>
                              <TableCell align="right" className="font-mono font-bold text-gray-900 dark:text-white">
                                  {job.totalPayout ? `£${job.totalPayout}` : '-'}
                              </TableCell>
                          </TableRow>
                      ))}
                  </TableBody>
              </Table>
          </div>
      </div>
      {selectedJob && (
          <AdminJobModal 
              job={selectedJob}
              onClose={() => setSelectedJob(null)}
              onUpdate={() => {
                  const updatedJob = mockDb.getAllJobs().find(j => j.id === selectedJob?.id);
                  if (updatedJob) {
                    setSelectedJob(updatedJob);
                  }
              }}
          />
      )}
    </>
  );
};
