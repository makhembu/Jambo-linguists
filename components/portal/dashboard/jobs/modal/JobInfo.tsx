
import React, { useMemo } from 'react';
import { Calendar, PoundSterling, Globe, Clock, FileText, MapPin, CheckCircle, Briefcase, AlertTriangle, Download, Loader2, UploadCloud } from 'lucide-react';
import { Job } from '@/data/mockDatabase';
import { JobResources } from './JobResources';
import { getInterpretingJobPayoutDetails } from '../job-helpers';


const RateBreakdown = ({ job }: { job: Job }) => {
    const details = getInterpretingJobPayoutDetails(job);
    if (!details) return null;

    return (
      <div className="mt-6">
        <h3 className="text-sm md:text-lg font-bold text-gray-900 dark:text-white mb-3 font-serif">Rate Breakdown</h3>
        <div className="space-y-3 bg-gray-50 dark:bg-white/5 p-4 rounded-xl border border-gray-100 dark:border-white/5">
          {details.sessionPay > 0 && (
              <div className="flex justify-between items-center text-xs md:text-sm">
                <span className="text-gray-600 dark:text-gray-300">Session ({details.hours.toFixed(2)} hrs @ £{job.hourlyRate?.toFixed(2)}/hr)</span>
                <span className="font-mono font-medium text-gray-800 dark:text-gray-200">£{details.sessionPay.toFixed(2)}</span>
              </div>
          )}
          {details.mileagePay > 0 && (
              <div className="flex justify-between items-center text-xs md:text-sm">
                <span className="text-gray-600 dark:text-gray-300">Mileage ({job.distance} mi @ £{job.mileageRate?.toFixed(2)}/mi)</span>
                <span className="font-mono font-medium text-gray-800 dark:text-gray-200">£{details.mileagePay.toFixed(2)}</span>
              </div>
          )}
          {details.travelPay > 0 && (
              <div className="flex justify-between items-center text-xs md:text-sm">
                <span className="text-gray-600 dark:text-gray-300">Travel ({job.travelHours} hrs @ £{job.travelRate?.toFixed(2)}/hr)</span>
                <span className="font-mono font-medium text-gray-800 dark:text-gray-200">£{details.travelPay.toFixed(2)}</span>
              </div>
          )}
          <div className="pt-2 border-t border-gray-200 dark:border-white/10 mt-2 flex justify-between items-center">
             <span className="font-bold text-gray-800 dark:text-white text-sm md:text-base">Estimated Total</span>
             <span className="font-bold font-mono text-jambo-600 dark:text-jambo-400 text-base md:text-lg">£{details.total.toFixed(2)}</span>
          </div>
        </div>
      </div>
    );
};

interface JobInfoProps {
  job: Job;
  isHistory: boolean;
  isAvailable: boolean;
}

export const JobInfo = ({ job, isHistory, isAvailable }: JobInfoProps) => {
  const payoutDetails = getInterpretingJobPayoutDetails(job);
  
  const rateDisplay = (job.category === 'Translation' && job.wordRate) 
    ? `${(job.wordRate * 100).toFixed(0)}p/word` 
    : job.rate;

  // Split files logic into distinct groups
  const { originalFiles, submittedFiles, revisionFiles } = useMemo(() => {
      const originals = (job.attachments || []).map(f => ({
          name: f.name,
          type: f.type,
          url: f.url,
          source: 'Instruction',
          date: job.date
      }));

      // Add any CREATED history attachments to originals
      (job.history || []).forEach(h => {
          if (h.type === 'CREATED' && h.attachment) {
              originals.push({
                  name: h.attachment,
                  type: 'file',
                  url: '#',
                  source: 'Instruction',
                  date: h.date
              });
          }
      });

      const submitted: any[] = [];
      const revisions: any[] = [];

      (job.history || []).forEach(h => {
          if (h.attachment) {
              const fileItem = {
                  name: h.attachment,
                  type: 'file' as const,
                  url: '#',
                  source: '',
                  date: h.date
              };

              if (h.type === 'SUBMITTED' || h.type === 'RESUBMITTED') {
                  fileItem.source = 'Delivery';
                  submitted.push(fileItem);
              } else if (h.type === 'REVISION_REQUESTED') {
                  fileItem.source = 'Revision Markup';
                  revisions.push(fileItem);
              }
          }
      });

      return {
          originalFiles: originals.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
          submittedFiles: submitted.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
          revisionFiles: revisions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      };
  }, [job]);

  return (
    <div className="p-5 md:p-8 space-y-6 md:space-y-8 animate-in fade-in slide-in-from-left-4 duration-300">
      
      {/* Status Banners */}
      {job.status === 'Revision' && (
          <div className="bg-amber-50 dark:bg-amber-900/20 border-l-4 border-amber-500 p-4 md:p-6 rounded-r-xl shadow-sm">
              <h3 className="font-bold text-amber-800 dark:text-amber-200 flex items-center gap-2 mb-2 text-lg">
                  <AlertTriangle size={20} /> Revision Requested
              </h3>
              <p className="text-amber-900 dark:text-amber-100 text-sm mb-4 leading-relaxed">
                  {job.revisionFeedback || "Please review the job details and resubmit."}
              </p>
              {job.revisionFile && (
                  <button className="bg-white dark:bg-amber-900/40 text-amber-800 dark:text-amber-200 px-4 py-2 rounded-lg text-xs font-bold border border-amber-200 dark:border-amber-800 flex items-center gap-2 hover:bg-amber-100 transition-colors">
                      <Download size={14} /> Download Mark-up: {job.revisionFile}
                  </button>
              )}
          </div>
      )}

      {job.status === 'Pending Approval' && (
          <div className="bg-indigo-50 dark:bg-indigo-900/20 border-l-4 border-indigo-500 p-4 md:p-6 rounded-r-xl shadow-sm flex items-start gap-4">
              <div className="p-2 bg-indigo-100 dark:bg-indigo-900/40 rounded-full text-indigo-600 dark:text-indigo-400">
                  <Loader2 size={24} className="animate-spin" />
              </div>
              <div>
                  <h3 className="font-bold text-indigo-900 dark:text-indigo-200 text-lg mb-1">Pending Approval</h3>
                  <p className="text-indigo-800 dark:text-indigo-300 text-sm leading-relaxed">
                      Your completion details have been submitted. An administrator will review your work shortly.
                  </p>
              </div>
          </div>
      )}

      {/* Key Details Grid */}
      <div className="grid grid-cols-2 gap-4 md:gap-6 p-4 md:p-6 bg-gray-50 dark:bg-white/5 rounded-xl border border-gray-100 dark:border-white/5">
        <div className="space-y-1">
          <p className="text-[10px] md:text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wide flex items-center gap-1"><Calendar size={12}/> Date & Time</p>
          <p className="text-base md:text-lg font-bold text-gray-900 dark:text-gray-100 leading-tight">
            {new Date(job.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
            {job.time && `, ${job.time}`}
          </p>
        </div>
        
        <div className="space-y-1">
          <p className="text-[10px] md:text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wide flex items-center gap-1">
             <PoundSterling size={12}/> {payoutDetails ? 'Est. Payout' : 'Rate'}
          </p>
          <p className="text-base md:text-lg font-bold text-jambo-600 dark:text-jambo-400 leading-tight">
            {payoutDetails ? `£${payoutDetails.total.toFixed(2)}` : rateDisplay}
          </p>
        </div>

        <div className="space-y-1">
          <p className="text-[10px] md:text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wide flex items-center gap-1"><Globe size={12}/> Language Pair</p>
          <p className="text-base md:text-lg font-bold text-gray-900 dark:text-gray-100 leading-tight">{job.languagePair}</p>
        </div>

        <div className="space-y-1">
          <p className="text-[10px] md:text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wide flex items-center gap-1">
            {job.category === 'Translation' ? <FileText size={12}/> : (job.category === 'Interpreting' ? <Briefcase size={12} /> : <Clock size={12}/>)} 
            {job.category === 'Translation' ? 'Volume' : 'Type'}
          </p>
          <p className="text-base md:text-lg font-bold text-gray-900 dark:text-gray-100 leading-tight">
            {job.category === 'Translation' ? `${job.wordCount?.toLocaleString()} wds` : job.type}
          </p>
        </div>
      </div>

      <div>
        <h3 className="text-sm md:text-lg font-bold text-gray-900 dark:text-white mb-2 md:mb-3 font-serif">Description & Requirements</h3>
        <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 leading-relaxed font-light">
          {job.description}
        </p>
        
        <div className="mt-4 md:mt-6 space-y-3">
          <div className="flex items-start gap-3">
            <MapPin className="text-gray-400 dark:text-gray-500 shrink-0 mt-0.5 md:mt-1" size={16} />
            <div>
              <p className="font-bold text-gray-900 dark:text-white text-xs md:text-sm">Location / Context</p>
              <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base leading-snug">{job.location}</p>
            </div>
          </div>
           {job.duration && (
            <div className="flex items-start gap-3">
                <Clock className="text-gray-400 dark:text-gray-500 shrink-0 mt-0.5 md:mt-1" size={16} />
                <div>
                  <p className="font-bold text-gray-900 dark:text-white text-xs md:text-sm">Duration</p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base leading-snug">{job.duration}</p>
                </div>
            </div>
           )}
        </div>

         {payoutDetails && <RateBreakdown job={job} />}

      </div>

      {/* 1. Original Instructions (Always show if present, possibly locked) */}
      <JobResources 
        files={originalFiles} 
        isLocked={isAvailable} 
        title="Job Instructions & Resources"
        icon={FileText}
      />

      {/* 2. Revisions (Only if present, unlocked) */}
      {revisionFiles.length > 0 && !isAvailable && (
         <JobResources 
            files={revisionFiles}
            isLocked={false}
            title="Revision Requests"
            icon={AlertTriangle}
         />
      )}

      {/* 3. User Submissions (Only if present, unlocked) */}
      {submittedFiles.length > 0 && !isAvailable && (
         <JobResources 
            files={submittedFiles}
            isLocked={false}
            title="My Deliverables"
            icon={UploadCloud}
         />
      )}
      
      {/* Completion Details Summary */}
      {isHistory && job.completedAt && (
        <div className="mt-8 pt-8 border-t border-gray-100 dark:border-white/10">
          <h4 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2 text-sm md:text-base">
            <CheckCircle size={18} className="text-green-600 dark:text-green-500"/> Completion Summary
          </h4>
          <div className="bg-gray-50 dark:bg-white/5 rounded-xl p-4 md:p-6 border border-gray-200 dark:border-white/10">
            <div className="flex justify-between items-start mb-2">
                <span className="text-xs font-bold uppercase text-gray-400 tracking-wider">Submitted On</span>
                <span className="text-xs font-mono text-gray-500">{new Date(job.completedAt).toLocaleString()}</span>
            </div>
            {job.completionNotes ? (
                <div>
                    <span className="text-xs font-bold uppercase text-gray-400 tracking-wider block mb-1">Notes</span>
                    <p className="text-gray-800 dark:text-gray-200 italic text-sm md:text-base leading-relaxed">"{job.completionNotes}"</p>
                </div>
            ) : (
                <p className="text-sm text-gray-400 italic">No completion notes provided.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
