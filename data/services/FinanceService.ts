
import { db } from '../store';
import { FinanceStats, Invoice, InvoiceStatus, UserStats } from '../types';
import { NotificationService } from './NotificationService';

export class FinanceService {
    private notifications: NotificationService;

    constructor(notificationService: NotificationService) {
        this.notifications = notificationService;
    }
    
    getInvoices(): Invoice[] {
        if (!db.currentUserId) return [];
        return db.invoices
            .filter(inv => inv.userId === db.currentUserId && !inv.deletedAt)
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }

    createInvoice(invoice: Invoice) {
        db.invoices.unshift(invoice);
        // Notify if it's a real user
        if (invoice.userId && invoice.userId !== 'custom') {
            this.notifications.notifyInvoiceCreated(invoice.userId, invoice.reference);
        }
    }

    // New Method for Editing
    updateInvoice(invoice: Invoice) {
        const idx = db.invoices.findIndex(i => i.id === invoice.id);
        if (idx !== -1) {
            const oldInvoice = db.invoices[idx];
            db.invoices[idx] = { 
                ...invoice, 
                updatedAt: new Date().toISOString() 
            };

            // If updating a paid invoice, notify amendment
            if (oldInvoice.status === 'Paid' && invoice.userId && invoice.userId !== 'custom') {
                this.notifications.notifyInvoiceAmended(invoice.userId, invoice.reference);
            }
        }
    }

    updateInvoiceStatus(id: string, status: InvoiceStatus) {
        const idx = db.invoices.findIndex(i => i.id === id);
        if (idx !== -1) {
            const invoice = db.invoices[idx];
            const now = new Date().toISOString();
            // Create new object reference to trigger React updates
            db.invoices[idx] = { 
                ...invoice, 
                status,
                updatedAt: now
            };

            // Notify on Payment
            if (status === 'Paid' && invoice.userId && invoice.userId !== 'custom') {
                this.notifications.notifyInvoicePaid(invoice.userId, invoice.reference, invoice.amount);
            }

            // Add INVOICE_PAID event to job history
            if (status === 'Paid') {
                const currentUser = db.users.find(u => u.id === db.currentUserId);
                const actorName = currentUser ? `${currentUser.firstName} ${currentUser.lastName}` : 'System';

                for (const item of invoice.items) {
                    if (item.jobId) {
                        const jobIndex = db.jobs.findIndex(j => j.id === item.jobId);
                        if (jobIndex !== -1) {
                            const job = db.jobs[jobIndex];
                            const newHistory = [...(job.history || [])];
                            newHistory.push({
                                id: db.generateId('h'),
                                type: 'INVOICE_PAID',
                                date: now,
                                actorName: actorName,
                                description: `Payment confirmed for Invoice #${invoice.reference}.`
                            });
                            db.jobs[jobIndex] = { 
                                ...job, 
                                history: newHistory,
                                updatedAt: now
                            };
                        }
                    }
                }
            }
        }
    }

    getFinanceStats(): FinanceStats {
        if (!db.currentUserId) return { totalPaid: 0, pendingPayout: 0, nextPayoutDate: 'N/A', invoicesCount: 0 };
        
        const userInvoices = db.invoices.filter(inv => inv.userId === db.currentUserId && !inv.deletedAt);
        
        const totalPaid = userInvoices
            .filter(i => i.status === 'Paid')
            .reduce((sum, i) => sum + i.amount, 0);
            
        const pendingPayout = userInvoices
            .filter(i => i.status === 'Pending')
            .reduce((sum, i) => sum + i.amount, 0);
            
        const nextPayoutDate = pendingPayout > 0 ? '14 Nov 2025' : 'N/A';
        
        return {
            totalPaid,
            pendingPayout,
            nextPayoutDate,
            invoicesCount: userInvoices.length
        };
    }

    getStats(): UserStats {
        if (!db.currentUserId) {
            return {
                earnings: "£0", earningsLabel: "Earnings", earningsTrend: "0%",
                completedJobs: 0, completedJobsSubtext: "No history",
                qualityScore: "0.0/5", qualityScoreSubtext: "No reviews"
            };
        }

        const completed = db.jobs.filter(j => 
            j.linguistId === db.currentUserId && 
            j.status === 'Completed' &&
            !j.deletedAt
        );
        
        // --- KEY UPDATE: Calculate Earnings from PAID INVOICES, not Job Payouts ---
        const userInvoices = db.invoices.filter(inv => inv.userId === db.currentUserId && !inv.deletedAt);
        const totalEarnings = userInvoices
            .filter(inv => inv.status === 'Paid')
            .reduce((sum, inv) => sum + inv.amount, 0);
        
        const ratedJobs = completed.filter(j => j.rating !== undefined);
        const avgRating = ratedJobs.length > 0 
            ? (ratedJobs.reduce((sum, j) => sum + (j.rating || 0), 0) / ratedJobs.length).toFixed(1)
            : "5.0"; 
        
        let lastJobText = "No jobs yet";
        if (completed.length > 0) {
            const sortedCompleted = [...completed].sort((a, b) => 
                new Date(b.completedAt || b.date).getTime() - new Date(a.completedAt || a.date).getTime()
            );
            const lastDate = new Date(sortedCompleted[0].completedAt || sortedCompleted[0].date);
            const diffTime = Math.abs(new Date().getTime() - lastDate.getTime());
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
            lastJobText = `Last job: ${diffDays} day${diffDays === 1 ? '' : 's'} ago`;
        }

        return {
            earnings: `£${totalEarnings.toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 0})}`,
            earningsLabel: "Earnings (Paid)",
            earningsTrend: "+12% this month", 
            completedJobs: completed.length,
            completedJobsSubtext: lastJobText,
            qualityScore: `${avgRating}/5`,
            qualityScoreSubtext: ratedJobs.length > 0 ? `Based on ${ratedJobs.length} reviews` : "New Linguist"
        };
    }
}
