
import { db } from '../store';
import { Job, JobStatus, RevisionRecord, JobHistoryEvent } from '../types';
import { NotificationService } from './NotificationService';
import { calculateJobPayout } from '../../components/portal/dashboard/jobs/job-helpers';

export class JobService {
    private notifications: NotificationService;

    constructor(notificationService: NotificationService) {
        this.notifications = notificationService;
    }
    
    getAvailableJobs(): Job[] {
        return db.jobs.filter(j => j.status === 'Open' && !j.deletedAt);
    }
    
    getBookedJobs(): Job[] {
        if (!db.currentUserId) return [];
        return db.jobs.filter(j => 
            j.linguistId === db.currentUserId && 
            ['Scheduled', 'In Progress', 'Revision'].includes(j.status) &&
            !j.deletedAt
        );
    }
    
    getJobHistory(): Job[] {
        if (!db.currentUserId) return [];
        return db.jobs.filter(j => 
            j.linguistId === db.currentUserId && 
            ['Completed', 'Cancelled', 'Pending Approval'].includes(j.status) &&
            !j.deletedAt
        );
    }

    getNextAssignment(): Job | null {
        if (!db.currentUserId) return null;
        const booked = db.jobs
            .filter(j => 
                j.linguistId === db.currentUserId && 
                ['Scheduled', 'In Progress'].includes(j.status) &&
                !j.deletedAt
            )
            .sort((a, b) => new Date(a.date + ' ' + (a.time || '00:00')).getTime() - new Date(b.date + ' ' + (b.time || '00:00')).getTime());
        
        return booked.length > 0 ? booked[0] : null;
    }

    // New method to handle self-unassignment
    unassignJob(jobId: string, userId: string): boolean {
        const index = db.jobs.findIndex(j => j.id === jobId);
        if (index !== -1) {
            const job = db.jobs[index];
            
            // Security check: Must be the assigned linguist
            if (job.linguistId !== userId) return false;
            
            // Only allow unassigning if not completed or cancelled
            // Stricter check: Only 'Scheduled' usually implies before work starts
            if (['Completed', 'Cancelled'].includes(job.status)) return false;

            const currentUser = db.users.find(u => u.id === userId);
            const actorName = currentUser ? `${currentUser.firstName} ${currentUser.lastName}` : 'Linguist';
            const now = new Date().toISOString();

            // Add history event
            const newHistory = [...(job.history || []), {
                id: db.generateId('h'),
                type: 'ASSIGNED' as any, // Reusing ASSIGNED type
                date: now,
                actorName: actorName,
                description: 'Linguist unassigned themselves. Job returned to marketplace.'
            }];

            // Reset job
            db.jobs[index] = {
                ...job,
                linguistId: null, // null implies Unassigned/Open
                status: 'Open',
                history: newHistory,
                updatedAt: now
            };
            
            return true;
        }
        return false;
    }

    updateJobStatus(id: string, status: JobStatus, extraData?: Partial<Job> & { notes?: string, file?: string }) {
        const index = db.jobs.findIndex(j => j.id === id);
        if (index !== -1 && !db.jobs[index].deletedAt) {
            const job = db.jobs[index];
            const oldStatus = job.status;
            const currentUser = db.users.find(u => u.id === db.currentUserId);
            const actorName = currentUser ? `${currentUser.firstName} ${currentUser.lastName}` : 'System Admin';
            
            // --- SECURITY CHECK ---
            // If user is a linguist, prevent them from Cancelling a job directly or changing details they shouldn't.
            // They should use "Unassign" instead of "Cancel".
            if (currentUser?.role === 'linguist' && status === 'Cancelled') {
                console.warn("Linguists cannot cancel jobs directly. Use unassign.");
                return; 
            }

            // --- HISTORY EVENT GENERATION ---
            const newHistory: JobHistoryEvent[] = [...(job.history || [])];
            const now = new Date().toISOString();

            // 1. Cancellation (High Priority Check)
            if (status === 'Cancelled') {
                newHistory.push({
                    id: db.generateId('h'),
                    type: 'CANCELLED',
                    date: now,
                    actorName: actorName,
                    description: 'Job was cancelled.'
                });
            }
            // 2. User Completes / Re-submits Work
            else if (status === 'Pending Approval') {
                const isResubmission = oldStatus === 'Revision';
                newHistory.push({
                    id: db.generateId('h'),
                    type: isResubmission ? 'RESUBMITTED' : 'SUBMITTED',
                    date: now,
                    actorName: actorName,
                    description: extraData?.notes || (isResubmission ? 'Revised work submitted.' : 'Work submitted for review.'),
                    attachment: extraData?.file
                });
            } 
            // 3. Admin Requests Revision
            else if (status === 'Revision') {
                newHistory.push({
                    id: db.generateId('h'),
                    type: 'REVISION_REQUESTED',
                    date: now,
                    actorName: actorName,
                    description: extraData?.revisionFeedback,
                    attachment: extraData?.revisionFile
                });
            } 
            // 4. Admin Approves (Enters Payment Process)
            else if (status === 'Completed' && oldStatus !== 'Completed') {
                newHistory.push({
                    id: db.generateId('h'),
                    type: 'APPROVED',
                    date: now,
                    actorName: actorName,
                    description: 'Work approved. Payment queued.'
                });
            } 
            // 5. Job Assignment / Marketplace Claim
            else if (status === 'Scheduled' && oldStatus === 'Open') {
                newHistory.push({
                    id: db.generateId('h'),
                    type: 'ASSIGNED',
                    date: now,
                    actorName: actorName,
                    description: currentUser?.role === 'linguist' ? 'Job claimed from marketplace.' : 'Job assigned by admin.'
                });
            } 

            // Handle legacy Revision History for compatibility
            let revisionHistory = job.revisionHistory || [];
            if (status === 'Revision' && extraData?.revisionFeedback) {
                const newRecord: RevisionRecord = {
                    date: now,
                    feedback: extraData.revisionFeedback,
                    file: extraData.revisionFile
                };
                revisionHistory = [newRecord, ...revisionHistory];
            }

            const updates: Partial<Job> = { 
                status,
                updatedAt: now,
                // Handle linguist submission data
                ...(extraData?.notes && { completionNotes: extraData.notes }),
                ...(extraData?.file && { completionFile: extraData.file }),
                
                // Handle Admin Revision/Approval fields passed in extraData
                ...extraData,
                revisionHistory,
                history: newHistory,

                // Set completion timestamp if moving to Pending Approval or Completed
                ...(status === 'Pending Approval' || status === 'Completed' ? { completedAt: now } : {})
            };

            // Assign to current user if accepting Open job
            if (status === 'Scheduled' && job.status === 'Open' && currentUser && currentUser.role === 'linguist') {
                updates.linguistId = currentUser.id;
            }

            // Apply updates
            const updatedJob = { ...job, ...updates };
            
            // Auto-calculate total payout if approving/completing and not set
            if (status === 'Completed' && !updatedJob.totalPayout) {
                updatedJob.totalPayout = calculateJobPayout(updatedJob);
            }

            db.jobs[index] = updatedJob;
            
            // --- Notification Triggers ---
            if (updatedJob.linguistId) {
                // Notify Linguist: Job Approved (Payment Pending)
                if (oldStatus === 'Pending Approval' && status === 'Completed') {
                    this.notifications.notifyJobApproved(updatedJob.linguistId, updatedJob.title, updatedJob.id);
                }
                // Notify Linguist: Revision Requested
                if (status === 'Revision') {
                    this.notifications.notifyJobRevision(updatedJob.linguistId, updatedJob.title, updates.revisionFeedback || "Action required.");
                }
                // Notify Linguist: Job Assigned (Self Claim)
                if (status === 'Scheduled' && oldStatus === 'Open' && currentUser?.role === 'linguist') {
                    this.notifications.notifyJobAssigned(updatedJob.linguistId, updatedJob);
                }
            }

            // Notify Admins: Job Pending Approval
            if (status === 'Pending Approval') {
                // Fixed: Now calling dedicated method which sends emails
                if (updatedJob.linguistId) {
                    this.notifications.notifyJobCompletedPending({
                        id: updatedJob.id,
                        title: updatedJob.title,
                        linguistId: updatedJob.linguistId
                    });
                }
            }
        }
    }
}
