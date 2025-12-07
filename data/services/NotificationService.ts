
import { db } from '../store';
import { UserRole, EmailLog } from '../types';

export class NotificationService {
    
    private create(userId: string, title: string, message: string, type: 'check' | 'briefcase' | 'shield' | 'grad', link?: string) {
        const now = new Date().toISOString();
        const newNotification = {
            id: db.generateId('n'),
            userId,
            title,
            message,
            time: now, // Using ISO for sorting, UI converts to relative
            isRead: false,
            iconType: type,
            bg: this.getBgColor(type),
            color: this.getColor(type),
            linkTo: link,
            createdAt: now,
            updatedAt: now,
            deletedAt: null
        };
        db.notifications.unshift(newNotification);
    }

    // Helper for colors
    private getBgColor(type: string) {
        switch(type) {
            case 'check': return 'bg-green-50';
            case 'briefcase': return 'bg-blue-50';
            case 'shield': return 'bg-orange-50';
            case 'grad': return 'bg-purple-50';
            default: return 'bg-gray-50';
        }
    }

    private getColor(type: string) {
        switch(type) {
            case 'check': return 'text-green-600';
            case 'briefcase': return 'text-blue-600';
            case 'shield': return 'text-orange-600';
            case 'grad': return 'text-purple-600';
            default: return 'text-gray-600';
        }
    }

    // --- EMAIL SYSTEM ---

    public sendEmail(userId: string, templateId: string, data: Record<string, any>) {
        if (!db.settings.email.enabled) {
            console.log(`[Email] Skipped (Disabled): ${templateId} to ${userId}`);
            return;
        }

        const user = db.users.find(u => u.id === userId);
        if (!user || !user.email) {
            console.warn(`[Email] Failed: User not found or no email for ID ${userId}`);
            return;
        }

        // Check user preferences
        if (user.notificationPreferences && !user.notificationPreferences.emailUpdates) {
             console.log(`[Email] Skipped (User Pref): ${templateId} to ${userId}`);
             return;
        }

        const template = db.emailTemplates.find(t => t.id === templateId);
        if (!template) {
            console.error(`[Email] Template not found: ${templateId}`);
            return;
        }

        // Parse Template
        let subject = template.subject;
        let body = template.body;

        Object.keys(data).forEach(key => {
            const regex = new RegExp(`{{${key}}}`, 'g');
            const value = data[key] !== undefined ? String(data[key]) : '';
            subject = subject.replace(regex, value);
            body = body.replace(regex, value);
        });

        // Add User Context
        subject = subject.replace(/{{firstName}}/g, user.firstName);
        subject = subject.replace(/{{lastName}}/g, user.lastName);
        body = body.replace(/{{firstName}}/g, user.firstName);
        body = body.replace(/{{lastName}}/g, user.lastName);

        // "Send" (Log it)
        const log: EmailLog = {
            id: db.generateId('mail'),
            recipientEmail: user.email,
            templateId: templateId,
            subject: subject,
            status: 'Sent',
            sentAt: new Date().toISOString()
        };

        db.emailLogs.unshift(log);
        console.log(`[Email SENT] To: ${user.email} | Subject: ${subject}`);
    }

    // --- Public Triggers ---

    notifyJobApproved(userId: string, jobTitle: string, jobId: string) {
        this.create(userId, 'Job Approved', `Your submission for "${jobTitle}" has been approved. Payment is pending.`, 'check', `jobs-history`);
        
        this.sendEmail(userId, 'JOB_APPROVED', {
            jobTitle,
            jobId
        });
    }

    notifyJobRevision(userId: string, jobTitle: string, note: string) {
        this.create(userId, 'Revision Requested', `Action required for "${jobTitle}": ${note}`, 'shield', `jobs-bookings`);
        // No specific email template for revision in requirements, but good to have. 
        // Skipping email for strict adherence to requested list, or fallback to generic if needed.
    }

    notifyJobAssigned(userId: string, job: { title: string, date: string, location: string, id: string }) {
        this.create(userId, 'New Assignment', `You have been assigned to "${job.title}".`, 'briefcase', 'jobs-bookings');
        this.sendEmail(userId, 'JOB_ASSIGNED', {
            jobTitle: job.title,
            date: new Date(job.date).toLocaleDateString(),
            location: job.location,
            jobId: job.id
        });
    }

    notifyJobCompletedPending(job: { id: string, title: string, linguistId: string }) {
        // Notify Admins
        const admins = db.users.filter(u => u.role === 'admin' && !u.deletedAt);
        const linguist = db.users.find(u => u.id === job.linguistId);
        
        admins.forEach(admin => {
            this.create(admin.id, 'Approval Required', `Job #${job.id} submitted by ${linguist?.firstName} ${linguist?.lastName}.`, 'briefcase', 'jobs:Pending Approval');
            
            // Send email to admin
            this.sendEmail(admin.id, 'JOB_COMPLETED_PENDING', {
                jobTitle: job.title,
                jobId: job.id,
                firstName: linguist?.firstName || 'Linguist',
                lastName: linguist?.lastName || ''
            });
        });
    }

    notifyInvoicePaid(userId: string, reference: string, amount: number) {
        this.create(userId, 'Payment Received', `Invoice #${reference} has been marked as Paid.`, 'briefcase', 'finance');
        this.sendEmail(userId, 'INVOICE_PAID', {
            invoiceRef: reference,
            amount: amount.toFixed(2)
        });
    }

    notifyInvoiceCreated(userId: string, reference: string) {
        this.create(userId, 'New Invoice', `Invoice #${reference} has been generated.`, 'briefcase', 'finance');
    }

    notifyInvoiceAmended(userId: string, reference: string) {
        this.create(userId, 'Invoice Amended', `Details for invoice #${reference} have been updated by admin.`, 'shield', 'finance');
    }

    notifyAdminAction(userId: string, title: string, message: string, link: string) {
        this.create(userId, title, message, 'briefcase', link);
    }

    notifyCertificateIssued(userId: string, courseTitle: string, certId: string) {
        this.create(userId, 'Certificate Issued', `Congratulations! You earned a certificate for "${courseTitle}".`, 'grad', 'training-certificates');
        this.sendEmail(userId, 'CERTIFICATE_ISSUED', {
            courseTitle,
            certId
        });
    }

    notifyCourseCompleted(userId: string, courseTitle: string) {
        // In-app notification handled in TrainingService usually, adding email here
        this.sendEmail(userId, 'COURSE_COMPLETED', {
            courseTitle
        });
    }

    notifyMessageReceived(userId: string, senderName: string, content: string, jobId?: string) {
        // In-app is handled by real-time hook usually, but we can log notification if offline
        this.sendEmail(userId, 'MESSAGE_RECEIVED', {
            senderName,
            context: jobId ? `Job #${jobId}` : 'Direct Message',
            preview: content.substring(0, 50)
        });
    }
}
