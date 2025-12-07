
import { Job, User, Notification, Course, CourseProgress, Lesson, Resource, Invoice, LoginHistoryEntry, ComplianceDocument, SystemSettings, Certificate, Message, BlogPost, EmailTemplate, EmailLog } from './types';
import { initialJobs } from './source/jobs';
import { initialUsers } from './source/users';
import { initialNotifications } from './source/notifications';
import { initialCourses, initialProgress } from './source/courses';
import { initialLessons } from './source/lessons';
import { initialResources } from './source/resources';
import { initialInvoices } from './source/invoices';
import { initialLoginHistory } from './source/loginHistory';
import { initialComplianceDocs } from './source/compliance';
import { initialCertificates } from './source/certificates';
import { initialMessages } from './source/messages';
import { initialBlogPosts } from './source/blogPosts';
import { COMPANY_INFO } from './constants';

export class DataStore {
    public jobs: Job[] = [...initialJobs];
    public users: User[] = [...initialUsers];
    public notifications: Notification[] = [...initialNotifications];
    public courses: Course[] = [...initialCourses];
    public courseProgress: CourseProgress[] = [...initialProgress];
    public lessons: Lesson[] = [...initialLessons];
    public certificates: Certificate[] = [...initialCertificates];
    public resources: Resource[] = [...initialResources];
    public invoices: Invoice[] = [...initialInvoices];
    public loginHistory: LoginHistoryEntry[] = [...initialLoginHistory];
    public complianceDocs: ComplianceDocument[] = [...initialComplianceDocs];
    public messages: Message[] = [...initialMessages];
    public blogPosts: BlogPost[] = [...initialBlogPosts];
    
    // New: Email Storage
    public emailTemplates: EmailTemplate[] = [
        {
            id: 'JOB_ASSIGNED',
            name: 'Job Assigned',
            subject: 'New Assignment: {{jobTitle}}',
            body: 'Dear {{firstName}},\n\nYou have been assigned a new job:\n\nTitle: {{jobTitle}}\nDate: {{date}}\nLocation: {{location}}\n\nPlease log in to the portal to view full details.\n\nBest regards,\nJambo Linguists',
            variables: ['firstName', 'jobTitle', 'date', 'location', 'jobId']
        },
        {
            id: 'JOB_COMPLETED_PENDING',
            name: 'Job Pending Approval',
            subject: 'Job Completed: {{jobTitle}}',
            body: 'Admin,\n\n{{firstName}} {{lastName}} has submitted completion details for Job #{{jobId}}.\n\nStatus: Pending Approval\n\nCheck the admin portal to review.',
            variables: ['firstName', 'lastName', 'jobTitle', 'jobId']
        },
        {
            id: 'JOB_APPROVED',
            name: 'Job Approved',
            subject: 'Work Approved: {{jobTitle}}',
            body: 'Dear {{firstName}},\n\nYour submission for "{{jobTitle}}" has been approved. An invoice has been generated automatically.\n\nRef: {{jobId}}\n\nBest,\nJambo Team',
            variables: ['firstName', 'jobTitle', 'jobId']
        },
        {
            id: 'COURSE_COMPLETED',
            name: 'Course Completed',
            subject: 'Course Completed: {{courseTitle}}',
            body: 'Congratulations {{firstName}}!\n\nYou have successfully completed the training module "{{courseTitle}}".\n\nVisit your dashboard to view your progress.',
            variables: ['firstName', 'courseTitle']
        },
        {
            id: 'CERTIFICATE_ISSUED',
            name: 'Certificate Issued',
            subject: 'Certificate Issued: {{courseTitle}}',
            body: 'Dear {{firstName}},\n\nA new certificate for "{{courseTitle}}" has been issued to your profile.\n\nCertificate ID: {{certId}}\n\nYou can download it from the Training section.',
            variables: ['firstName', 'courseTitle', 'certId']
        },
        {
            id: 'INVOICE_PAID',
            name: 'Invoice Paid',
            subject: 'Payment Confirmation: {{invoiceRef}}',
            body: 'Dear {{firstName}},\n\nThis email confirms that payment for Invoice #{{invoiceRef}} has been processed.\n\nAmount: £{{amount}}\n\nThank you for your hard work.',
            variables: ['firstName', 'invoiceRef', 'amount']
        },
        {
            id: 'MESSAGE_RECEIVED',
            name: 'New Message',
            subject: 'New Message from {{senderName}}',
            body: 'Hello {{firstName}},\n\nYou have received a new message from {{senderName}} regarding {{context}}.\n\n"{{preview}}..."\n\nLog in to reply.',
            variables: ['firstName', 'senderName', 'context', 'preview']
        }
    ];
    public emailLogs: EmailLog[] = [];

    // System Settings Default State
    public settings: SystemSettings = {
        // General
        registrationsOpen: true,
        requireManualVerification: true,
        maintenanceMode: false,
        
        // Operations
        marketplaceEnabled: true,
        autoAssignment: 'none',
        allowLinguistCancellation: true,
        jobAccessRequiresTraining: false,

        // LMS
        globalSelfEnrollment: true,
        allowInstructorCourseCreation: false,
        requirePrerequisites: true,
        
        // Finance
        defaultVatRate: 20,
        autoInvoiceGeneration: true,
        minPayoutThreshold: 50,
        paymentReleaseDelay: 14,
        platformFeePercent: 0,

        // SEO Defaults
        seo: {
            siteTitle: COMPANY_INFO.name,
            siteDescription: "Leading provider of Swahili interpretation and translation services in the UK.",
            defaultKeywords: ["Swahili Interpreter", "Translation Services", "UK", "Medical Interpreting", "Legal Translation"],
            structuredData: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Organization",
                "name": COMPANY_INFO.name,
                "url": "https://jambolinguists.com",
                "logo": COMPANY_INFO.logoUrl,
                "contactPoint": {
                    "@type": "ContactPoint",
                    "telephone": COMPANY_INFO.phone,
                    "contactType": "customer service",
                    "email": COMPANY_INFO.email
                },
                "address": {
                    "@type": "PostalAddress",
                    "streetAddress": "First Floor, Radley House, Richardshaw Rd",
                    "addressLocality": "Pudsey",
                    "postalCode": "LS28 6LE",
                    "addressCountry": "UK"
                }
            }, null, 2)
        },

        // Email Defaults
        email: {
            enabled: true,
            smtpHost: 'smtp.example.com',
            smtpPort: 587,
            smtpUser: 'notifications@jambolinguists.com',
            smtpPass: '',
            security: 'STARTTLS',
            fromName: 'Jambo Linguists',
            fromEmail: 'noreply@jambolinguists.com'
        }
    };
    
    public currentUserId: string | null = null;

    public generateId(prefix: string): string {
        return `${prefix}-${Date.now()}`;
    }
}

export const db = new DataStore();
