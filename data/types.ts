
// ==========================================
// ENUMS & CONSTANTS (Postgres ENUM types)
// ==========================================

export type JobCategory = 'Interpreting' | 'Translation' | 'Transcription';
export type JobType = 'Face-to-Face' | 'Video' | 'Telephone' | 'Document' | 'Audio/Video';
export type JobStatus = 'Open' | 'Scheduled' | 'In Progress' | 'Completed' | 'Cancelled' | 'Pending Approval' | 'Revision';
export type UserRole = 'linguist' | 'admin' | 'client';
export type InvoiceStatus = 'Paid' | 'Pending' | 'Overdue' | 'Draft';
export type CourseStatus = 'Not Started' | 'In Progress' | 'Completed' | 'Failed';
export type LessonType = 'Video' | 'Document' | 'Slide' | 'Quiz';
export type JobEventType = 'CREATED' | 'ASSIGNED' | 'SUBMITTED' | 'REVISION_REQUESTED' | 'RESUBMITTED' | 'APPROVED' | 'CANCELLED' | 'INVOICE_PENDING' | 'INVOICE_PAID';

// ==========================================
// BASE ENTITY (Audit Trail)
// ==========================================

export interface BaseEntity {
    id: string;
    createdAt: string; // ISO 8601
    updatedAt: string; // ISO 8601
    deletedAt?: string | null; // ISO 8601 (Soft Delete)
}

// ==========================================
// SEO & CONTENT
// ==========================================

export interface SeoConfig {
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string[];
    canonicalUrl?: string;
    ogImage?: string;
    noIndex?: boolean;
    structuredData?: string; // JSON-LD string
    readabilityScore?: number;
}

export interface GlobalSeoSettings {
    siteTitle: string;
    siteDescription: string;
    defaultKeywords: string[];
    structuredData: string; // Global JSON-LD (Organization, ContactPoint)
}

// ==========================================
// EMAIL & NOTIFICATIONS
// ==========================================

export interface EmailSettings {
    enabled: boolean;
    smtpHost: string;
    smtpPort: number;
    smtpUser: string;
    smtpPass: string; 
    security: 'STARTTLS' | 'SSL/TLS' | 'NONE';
    fromName: string;
    fromEmail: string;
}

export interface EmailTemplate {
    id: string; // e.g. 'JOB_ASSIGNED'
    name: string;
    subject: string;
    body: string; // HTML support
    variables: string[]; // List of available placeholders for UI hints
}

export interface EmailLog {
    id: string;
    recipientEmail: string;
    templateId: string;
    subject: string;
    status: 'Sent' | 'Failed';
    sentAt: string;
    error?: string;
}

// ==========================================
// SYSTEM SETTINGS
// ==========================================

export interface SystemSettings {
    // User Management
    registrationsOpen: boolean;
    requireManualVerification: boolean;
    
    // Operations
    marketplaceEnabled: boolean;
    maintenanceMode: boolean;
    
    // LMS Settings
    globalSelfEnrollment: boolean; // Master switch
    allowInstructorCourseCreation: boolean;
    requirePrerequisites: boolean;
    
    // Job Marketplace Settings
    jobAccessRequiresTraining: boolean;
    autoAssignment: 'none' | 'rating' | 'first-come';
    allowLinguistCancellation: boolean;
    
    // Finance Settings
    defaultVatRate: number;
    autoInvoiceGeneration: boolean;
    minPayoutThreshold: number;
    paymentReleaseDelay: number; // Days
    platformFeePercent: number;

    // SEO Settings
    seo: GlobalSeoSettings;

    // Email Settings
    email: EmailSettings;
}

// ==========================================
// TABLE SCHEMAS
// ==========================================

export interface NotificationPreferences {
    emailUpdates: boolean;
    jobAlerts: boolean;
    courseReminders: boolean;
    marketing: boolean;
}

/**
 * Table: users
 */
export interface User extends BaseEntity {
  email: string;
  password?: string; // Simulated Hash       
  firstName: string;       
  lastName: string;        
  phone?: string;          
  location?: string;       
  headline?: string;       
  role: UserRole;          
  avatarUrl?: string;      
  headerUrl?: string;      
  
  qualifications?: string[]; 
  languages?: string[];      
  isVerified: boolean;       
  isSuspended?: boolean;     

  bankDetails?: {
    bankName: string;
    accountNumber: string; 
    sortCode?: string;
  };

  notificationPreferences?: NotificationPreferences;
}

export interface JobHistoryEvent {
  id: string;
  type: JobEventType;
  date: string;
  actorName: string; 
  description?: string; 
  attachment?: string; 
}

export interface RevisionRecord {
  date: string;
  feedback: string;
  file?: string;
}

export interface Job extends BaseEntity {
  linguistId?: string | null; 
  clientId?: string;       
  postedBy?: string;       
  
  category: JobCategory;   
  type: JobType;           
  status: JobStatus;       
  title: string;           
  description: string;     
  
  date: string;            
  time?: string;           
  deadlineTime?: string;   
  finishTime?: string;     
  duration?: string;       
  wordCount?: number;      
  location: string;        
  distance?: number;       
  
  languagePair: string;    
  rate: string;            
  isUrgent: boolean;       
  
  hourlyRate?: number;
  mileageRate?: number;
  travelHours?: number;
  travelRate?: number;
  wordRate?: number;
  minuteRate?: number;
  fixedRate?: number;

  requiredCourseIds?: string[]; 

  attachments?: {
    name: string;
    type: 'file' | 'link';
    url: string;
  }[];

  completionNotes?: string; 
  completionFile?: string;  
  completedAt?: string;     
  
  revisionFeedback?: string; 
  revisionFile?: string;     
  revisionHistory?: RevisionRecord[]; 
  
  history: JobHistoryEvent[];

  adminNotes?: string;       
  
  totalPayout?: number;     
  rating?: number;          
}

export interface Invoice extends BaseEntity {
  userId: string;          
  reference: string;       
  date: string;            
  dueDate: string;         
  amount: number;          
  subtotal?: number;       
  vatRate?: number;        
  status: InvoiceStatus;   
  items: {                 
    description: string;
    amount: number;
    quantity?: number;     
    rate?: number;         
    jobId?: string;
    date?: string;         
  }[];
  customRecipient?: {      
    name: string;
    email?: string;
    address?: string;
  };
  notes?: string;
  downloadUrl?: string;
}

export interface Notification extends BaseEntity {
  userId: string;          
  title: string;           
  message?: string;        
  time: string;            
  isRead: boolean;         
  
  iconType: 'check' | 'briefcase' | 'shield' | 'grad' | 'message'; 
  color: string;           
  bg: string;              
  linkTo?: string;         
}

export interface CourseSettings {
    visibility: 'Public' | 'Invite-Only' | 'Hidden';
    maxEnrollment?: number;
    allowReenrollment: boolean;
    requirePrerequisites?: boolean;
    prerequisites?: string[]; 
    passingScore: number;
    autoIssueCertificate: boolean;
    certificateTemplateId?: string; 
    notifications?: {
        onEnroll?: boolean;
        onComplete?: boolean;
        onLessonPublish?: boolean;
        onAssignmentGraded?: boolean;
    };
}

export interface CourseCompliance {
    requiredForJobTypes: string[]; 
    mandatoryRefreshMonths?: number;
    isMandatory: boolean;
}

export interface Course extends BaseEntity {
  title: string;
  description: string;
  category: 'Technical' | 'Soft Skills' | 'Compliance' | 'Language' | 'General';
  duration: string; 
  lessonsCount: number;
  thumbnailUrl?: string;
  allowSelfEnrollment: boolean; 
  
  status: 'Draft' | 'Published' | 'Archived';
  settings: CourseSettings;
  compliance: CourseCompliance;

  instructor: string;
  instructorRole?: string;
  learningGoals: string[];
}

export interface QuizQuestion {
    question: string;
    options: string[];
    correctAnswer: number; 
    explanation: string;
}

export interface QuizResult {
  lessonId: string;
  score: number;
  totalQuestions: number;
  date: string;
  passed: boolean;
}

export interface Lesson extends BaseEntity {
  courseId: string;
  module: string; 
  title: string;
  type: LessonType;
  duration: string; 
  orderIndex: number;
  contentUrl?: string; 
  description?: string;
  transcript?: string; 
  quizData?: QuizQuestion[];
}

export interface CourseProgress {
  userId: string;
  courseId: string;
  status: CourseStatus;
  progressPercent: number; 
  lessonsCompletedIds: string[]; 
  lastAccessedLessonId?: string;
  lastAccessedAt?: string;
  completedAt?: string;
  enrollmentDate: string; 
  history?: {
      date: string;
      action: string; 
  }[];
  instructorNotes?: string;
  grade?: number;
  timeSpent?: string; 
  certificateId?: string; 
  quizResults?: QuizResult[]; 
}

export interface Certificate extends BaseEntity {
  userId: string;
  courseId: string;
  issueDate: string;
  expiryDate?: string;
  status: 'Active' | 'Revoked' | 'Expired';
  verificationCode: string; 
  templateId?: string; 
}

export interface EnrichedCourse extends Course {
  progress?: CourseProgress; 
}

export interface Resource extends BaseEntity {
    title: string;
    description: string;
    category: 'Legal' | 'Medical' | 'General' | 'Compliance';
    type: 'pdf' | 'link';
    url: string;
}

export interface ComplianceDocument extends BaseEntity {
    title: string;
    type: 'terms' | 'conduct' | 'privacy';
    content: string; 
    lastUpdated: string;
}

/**
 * Table: blog_posts
 */
export interface BlogPost extends BaseEntity {
    title: string;
    slug: string;
    excerpt: string;
    content: string; // Markdown
    coverImage: string;
    tags: string[];
    authorId: string;
    status: 'draft' | 'published';
    publishedAt?: string;
    seo?: SeoConfig; // NEW: SEO configuration
}

export interface UserStats {
  earnings: string;
  earningsLabel: string;
  earningsTrend: string;
  completedJobs: number;
  completedJobsSubtext: string;
  qualityScore: string;
  qualityScoreSubtext: string;
}

export interface FinanceStats {
  totalPaid: number;
  pendingPayout: number;
  nextPayoutDate: string;
  invoicesCount: number;
}

export interface LoginHistoryEntry {
  id: string;              
  userId: string;          
  timestamp: string;       
  ipAddress: string;       
  source: 'direct' | 'impersonation'; 
  impersonatorId?: string; 
}

export interface Message extends BaseEntity {
    senderId: string;
    recipientId: string;
    jobId?: string; 
    content: string;
    isRead: boolean;
    readAt?: string | null;
}

export interface Conversation {
    peerId: string; 
    jobId?: string; 
    lastMessage: Message;
    unreadCount: number;
    peer?: User; 
    job?: Job; 
}