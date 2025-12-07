
import { db } from '../store';
import { Job, User, Invoice, LoginHistoryEntry, JobHistoryEvent, ComplianceDocument, SystemSettings, Resource, EmailTemplate, EmailSettings } from '../types';
import { NotificationService } from './NotificationService';
import { calculateJobPayout } from '../../components/portal/dashboard/jobs/job-helpers';

export class AdminService {
    private notifications: NotificationService;

    constructor(notificationService: NotificationService) {
        this.notifications = notificationService;
    }
    
    getAllJobs(): Job[] {
        // Filter out soft-deleted jobs unless explicitly requested (for now, hiding them)
        return [...db.jobs].filter(j => !j.deletedAt).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }

    getAllUsers(): User[] {
        return [...db.users].filter(u => !u.deletedAt).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }

    getAllInvoices(): Invoice[] {
        return [...db.invoices].filter(i => !i.deletedAt);
    }

    getJobsByUser(userId: string): Job[] {
        return db.jobs.filter(j => j.linguistId === userId && !j.deletedAt).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }

    getInvoicesByUser(userId: string): Invoice[] {
        return db.invoices.filter(i => i.userId === userId && !i.deletedAt).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }

    // --- SYSTEM SETTINGS ---
    getSettings(): SystemSettings {
        return { ...db.settings };
    }

    updateSettings(newSettings: Partial<SystemSettings>): SystemSettings {
        db.settings = { ...db.settings, ...newSettings };
        return db.settings;
    }

    // --- COMPLIANCE ---
    getComplianceDocs(): ComplianceDocument[] {
        return [...db.complianceDocs].filter(d => !d.deletedAt);
    }

    updateComplianceDoc(id: string, content: string, title?: string) {
        const idx = db.complianceDocs.findIndex(d => d.id === id);
        if (idx !== -1) {
            db.complianceDocs[idx] = {
                ...db.complianceDocs[idx],
                content,
                title: title || db.complianceDocs[idx].title,
                lastUpdated: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            };
        }
    }

    // --- RESOURCES ---
    createResource(resource: Partial<Resource>): Resource {
        const newResource: Resource = {
            id: db.generateId('res'),
            title: resource.title || 'New Resource',
            description: resource.description || '',
            category: resource.category || 'General',
            type: resource.type || 'link',
            url: resource.url || '#',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            deletedAt: null
        };
        db.resources.unshift(newResource);
        return newResource;
    }

    updateResource(id: string, updates: Partial<Resource>) {
        const idx = db.resources.findIndex(r => r.id === id);
        if(idx !== -1) {
            db.resources[idx] = { ...db.resources[idx], ...updates, updatedAt: new Date().toISOString() };
        }
    }

    deleteResource(id: string) {
        const idx = db.resources.findIndex(r => r.id === id);
        if (idx !== -1) {
            db.resources[idx].deletedAt = new Date().toISOString();
        }
    }

    // --- EMAIL ---
    updateEmailTemplate(id: string, updates: Partial<EmailTemplate>) {
        const idx = db.emailTemplates.findIndex(t => t.id === id);
        if (idx !== -1) {
            db.emailTemplates[idx] = { ...db.emailTemplates[idx], ...updates };
        }
    }

    getEmailLogs() {
        return [...db.emailLogs].sort((a, b) => new Date(b.sentAt).getTime() - new Date(a.sentAt).getTime());
    }

    // --- JOBS & FINANCE ---

    approveJobSubmission(jobId: string): Invoice {
        const jobIndex = db.jobs.findIndex(j => j.id === jobId);
        if (jobIndex === -1) throw new Error('Job not found');
        const job = db.jobs[jobIndex];
    
        const currentUser = db.users.find(u => u.id === db.currentUserId);
    
        const now = new Date().toISOString();
        const newInvoice: Invoice = {
            id: `inv-${Date.now()}`,
            userId: job.linguistId || 'unknown',
            reference: `INV-${job.id}`,
            date: now,
            dueDate: new Date(Date.now() + 14 * 86400000).toISOString(),
            amount: job.totalPayout || calculateJobPayout(job) || 0,
            status: 'Pending',
            items: [ { description: `${job.category}: ${job.title}`, amount: job.totalPayout || calculateJobPayout(job) || 0, jobId: job.id } ],
            createdAt: now,
            updatedAt: now,
            deletedAt: null
        };
        db.invoices.unshift(newInvoice);
        if (newInvoice.userId && newInvoice.userId !== 'custom') {
            this.notifications.notifyInvoiceCreated(newInvoice.userId, newInvoice.reference);
        }
        
        const newHistory = [...(job.history || [])];
        const actorName = currentUser ? `${currentUser.firstName} ${currentUser.lastName}` : 'System Admin';
        newHistory.push({ id: db.generateId('h'), type: 'APPROVED', date: now, actorName, description: 'Work approved by admin.' });
        newHistory.push({ id: db.generateId('h'), type: 'INVOICE_PENDING', date: now, actorName, description: `Invoice #${newInvoice.reference} generated.` });
    
        db.jobs[jobIndex] = {
            ...job,
            status: 'Completed',
            history: newHistory,
            completedAt: now,
            updatedAt: now
        };
        
        // Notify Linguist
        if (job.linguistId) {
            this.notifications.notifyJobApproved(job.linguistId, job.title, job.id);
        }

        return newInvoice;
    }

    adminForceCompleteJob(jobId: string, notes: string): Job {
        const jobIndex = db.jobs.findIndex(j => j.id === jobId);
        if (jobIndex === -1) throw new Error('Job not found');
        const job = db.jobs[jobIndex];

        const currentUser = db.users.find(u => u.id === db.currentUserId);
        const actorName = currentUser ? `${currentUser.firstName} ${currentUser.lastName}` : 'System Admin';
        const now = new Date().toISOString();

        const newHistory = [...(job.history || [])];
        
        // Log the takeover
        newHistory.push({ 
            id: db.generateId('h'), 
            type: 'APPROVED', 
            date: now, 
            actorName, 
            description: `Admin Override: Job completed internally. Reassigned from ${job.linguistId} to Admin (${currentUser?.id}).` 
        });

        const updatedJob: Job = {
            ...job,
            status: 'Completed',
            linguistId: currentUser?.id || 'u-admin-001', // Reassign to admin
            completionNotes: notes,
            completedAt: now,
            updatedAt: now,
            history: newHistory,
            // Calculate payout but it won't be invoiced to the original linguist
            totalPayout: job.totalPayout || calculateJobPayout(job)
        };

        db.jobs[jobIndex] = updatedJob;
        return updatedJob;
    }

    createUser(userData: Partial<User>): User {
        const now = new Date().toISOString();
        const newUser: User = {
            id: db.generateId('u'),
            email: userData.email || '',
            firstName: userData.firstName || '',
            lastName: userData.lastName || '',
            role: userData.role || 'linguist',
            isVerified: true, 
            isSuspended: false,
            createdAt: now,
            updatedAt: now,
            deletedAt: null,
            location: userData.location || '',
            headline: userData.headline || 'New Member',
            languages: userData.languages || [],
            qualifications: [],
            ...userData
        };
        db.users.unshift(newUser);
        return newUser;
    }

    updateUser(userId: string, data: Partial<User>): User | null {
        const idx = db.users.findIndex(u => u.id === userId);
        if (idx !== -1) {
            db.users[idx] = { ...db.users[idx], ...data, updatedAt: new Date().toISOString() };
            return db.users[idx];
        }
        return null;
    }

    updateUserVerification(userId: string, isVerified: boolean) {
        const idx = db.users.findIndex(u => u.id === userId);
        if (idx !== -1) {
            db.users[idx].isVerified = isVerified;
            if (isVerified) db.users[idx].isSuspended = false;
            db.users[idx].updatedAt = new Date().toISOString();
        }
    }

    suspendUser(userId: string, isSuspended: boolean) {
        const idx = db.users.findIndex(u => u.id === userId);
        if (idx !== -1) {
            db.users[idx].isSuspended = isSuspended;
            db.users[idx].updatedAt = new Date().toISOString();
        }
    }

    createJob(jobData: Partial<Job>): Job {
        const currentUser = db.users.find(u => u.id === db.currentUserId);
        const creatorName = currentUser ? `${currentUser.firstName} ${currentUser.lastName}` : 'System Admin';
        const now = new Date().toISOString();

        const initialHistory: JobHistoryEvent[] = [
            {
                id: db.generateId('h'),
                type: 'CREATED',
                date: now,
                actorName: creatorName,
                description: 'Job created via Admin Portal'
            }
        ];

        if (jobData.linguistId) {
            const linguist = db.users.find(u => u.id === jobData.linguistId);
            const name = linguist ? `${linguist.firstName} ${linguist.lastName}` : 'Linguist';
            initialHistory.push({
                id: db.generateId('h'),
                type: 'ASSIGNED',
                date: now,
                actorName: creatorName,
                description: `Directly assigned to ${name}`
            });
        }

        const newJob: Job = {
            id: `JL-${Date.now()}`,
            category: 'Interpreting',
            type: 'Video',
            status: 'Open',
            title: 'New Job',
            description: '',
            date: new Date().toISOString().split('T')[0],
            location: 'Remote',
            languagePair: '',
            rate: '',
            isUrgent: false,
            attachments: [],
            history: initialHistory,
            createdAt: now,
            updatedAt: now,
            deletedAt: null,
            ...jobData
        };

        if (newJob.linguistId) {
            newJob.status = 'Scheduled';
            // Notify Assigned
            this.notifications.notifyJobAssigned(newJob.linguistId, newJob);
        }

        db.jobs.unshift(newJob);
        return newJob;
    }

    updateJobDetails(
        jobId: string, 
        updates: Partial<Job>, 
        newFiles: {name: string, type: 'file' | 'link', url: string}[],
        keptAttachments?: {name: string, type: 'file' | 'link', url: string}[]
    ) {
        const index = db.jobs.findIndex(j => j.id === jobId);
        if (index !== -1) {
            const oldJob = db.jobs[index];
            const currentUser = db.users.find(u => u.id === db.currentUserId);
            const actorName = currentUser ? `${currentUser.firstName} ${currentUser.lastName}` : 'Admin';
            const now = new Date().toISOString();
            
            const changes: string[] = [];
            
            // Compare significant fields
            if (updates.title && updates.title !== oldJob.title) changes.push('Title');
            if (updates.date && updates.date !== oldJob.date) changes.push(`Date (${oldJob.date} -> ${updates.date})`);
            if (updates.time && updates.time !== oldJob.time) changes.push('Time');
            if (updates.location && updates.location !== oldJob.location) changes.push('Location');
            if (updates.rate && updates.rate !== oldJob.rate) changes.push('Financials');
            if (updates.description && updates.description !== oldJob.description) changes.push('Description');

            // Handle Attachments
            let finalAttachments = oldJob.attachments || [];
            
            if (keptAttachments !== undefined) {
                const removedCount = (oldJob.attachments?.length || 0) - keptAttachments.length;
                if (removedCount > 0) {
                    changes.push(`${removedCount} file(s) removed`);
                }
                finalAttachments = [...keptAttachments];
            }

            if (newFiles.length > 0) {
                changes.push(`${newFiles.length} file(s) added`);
                finalAttachments = [...finalAttachments, ...newFiles];
            }

            const newHistory = [...oldJob.history];
            
            if (changes.length > 0) {
                newHistory.push({
                    id: db.generateId('h'),
                    type: 'CREATED', // Using CREATED as generic 'System/Admin Update' type
                    date: now,
                    actorName: actorName,
                    description: `Job Updated: ${changes.join(', ')}`
                });
            }

            db.jobs[index] = {
                ...oldJob,
                ...updates,
                attachments: finalAttachments,
                history: newHistory,
                updatedAt: now
            };
            
            return db.jobs[index];
        }
        return null;
    }

    assignJob(jobId: string, linguistId: string | null) {
        const index = db.jobs.findIndex(j => j.id === jobId);
        if (index !== -1) {
            const currentUser = db.users.find(u => u.id === db.currentUserId);
            const actorName = currentUser ? `${currentUser.firstName} ${currentUser.lastName}` : 'Admin';
            const oldLinguistId = db.jobs[index].linguistId;
            const now = new Date().toISOString();

            // Only add history if changing assignment
            if (oldLinguistId !== linguistId) {
                const newHistory = [...(db.jobs[index].history || [])];
                
                if (linguistId) {
                    const linguist = db.users.find(u => u.id === linguistId);
                    const name = linguist ? `${linguist.firstName} ${linguist.lastName}` : 'Linguist';
                    newHistory.push({
                        id: db.generateId('h'),
                        type: 'ASSIGNED',
                        date: now,
                        actorName: actorName,
                        description: `Assigned to ${name}`
                    });
                } else {
                    newHistory.push({
                        id: db.generateId('h'),
                        type: 'ASSIGNED',
                        date: now,
                        actorName: actorName,
                        description: `Unassigned (Moved to Open Marketplace)`
                    });
                }

                db.jobs[index] = { 
                    ...db.jobs[index], 
                    linguistId, 
                    status: linguistId ? 'Scheduled' : 'Open', // Auto update status
                    history: newHistory,
                    updatedAt: now
                };

                // Notify Assigned
                if (linguistId) {
                    this.notifications.notifyJobAssigned(linguistId, db.jobs[index]);
                }
            }
        }
    }

    getLoginHistoryForUser(userId: string): LoginHistoryEntry[] {
        return db.loginHistory
            .filter(entry => entry.userId === userId)
            .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    }

    logImpersonation(adminId: string, targetUserId: string) {
        const newEntry: LoginHistoryEntry = {
            id: db.generateId('lh'),
            userId: targetUserId,
            timestamp: new Date().toISOString(),
            ipAddress: '127.0.0.1', 
            source: 'impersonation',
            impersonatorId: adminId
        };
        db.loginHistory.unshift(newEntry);
    }
}
