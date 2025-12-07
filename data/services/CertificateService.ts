
import { db } from '../store';
import { Certificate, Course, User } from '../types';
import { NotificationService } from './NotificationService';

export class CertificateService {
    private notifications: NotificationService;

    constructor(notificationService: NotificationService) {
        this.notifications = notificationService;
    }

    issueCertificate(userId: string, courseId: string, templateId?: string): Certificate {
        const now = new Date().toISOString();
        
        // 1. Create Certificate Record
        const newCert: Certificate = {
            id: db.generateId('cert'),
            userId,
            courseId,
            issueDate: now,
            status: 'Active',
            verificationCode: crypto.randomUUID(),
            templateId,
            createdAt: now,
            updatedAt: now,
            deletedAt: null
        };
        db.certificates.push(newCert);

        // 2. Link to Course Progress
        const progressIdx = db.courseProgress.findIndex(p => p.userId === userId && p.courseId === courseId);
        if (progressIdx !== -1) {
            db.courseProgress[progressIdx] = {
                ...db.courseProgress[progressIdx],
                certificateId: newCert.id,
                status: 'Completed',
                completedAt: newCert.issueDate
            };
        }

        // 3. Notify User
        const course = db.courses.find(c => c.id === courseId);
        if (course) {
            this.notifications.notifyCertificateIssued(userId, course.title, newCert.id);
        }

        return newCert;
    }

    revokeCertificate(certificateId: string): void {
        const idx = db.certificates.findIndex(c => c.id === certificateId);
        if (idx !== -1) {
            db.certificates[idx].status = 'Revoked';
            db.certificates[idx].updatedAt = new Date().toISOString();
            
            // Unlink from progress but keep completion status? 
            // Often revocation means they are no longer certified, but they *did* finish the course.
            // We'll leave the progress as is, but the certificate is invalid.
        }
    }

    reissueCertificate(certificateId: string): Certificate | null {
        const oldCert = db.certificates.find(c => c.id === certificateId);
        if (!oldCert) return null;

        // Revoke old
        this.revokeCertificate(certificateId);

        // Issue new
        return this.issueCertificate(oldCert.userId, oldCert.courseId, oldCert.templateId);
    }

    getCertificate(id: string): Certificate | undefined {
        return db.certificates.find(c => c.id === id && !c.deletedAt);
    }

    getUserCertificates(userId: string): Certificate[] {
        return db.certificates.filter(c => c.userId === userId && !c.deletedAt);
    }
}
