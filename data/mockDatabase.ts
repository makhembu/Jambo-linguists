
import { AuthService } from './services/AuthService';
import { JobService } from './services/JobService';
import { AdminService } from './services/AdminService';
import { TrainingService } from './services/TrainingService';
import { FinanceService } from './services/FinanceService';
import { NotificationService } from './services/NotificationService'; 
import { CertificateService } from './services/CertificateService';
import { LmsAdminService } from './services/LmsAdminService';
import { MessageService } from './services/MessageService';
import { BlogService } from './services/BlogService';
import { AiWritingService } from './services/AiWritingService';
import { db } from './store';
import { JobStatus, BlogPost, Resource } from './types';

// Re-export types
export * from './types';

// Initialize Core Services
const notificationService = new NotificationService();
const authService = new AuthService();
const jobService = new JobService(notificationService);
const adminService = new AdminService(notificationService);
const certificateService = new CertificateService(notificationService);
const lmsAdminService = new LmsAdminService(notificationService, certificateService);
const trainingService = new TrainingService(notificationService);
const financeService = new FinanceService(notificationService);
const messageService = new MessageService(notificationService);
const blogService = new BlogService();
const aiWritingService = new AiWritingService();

// --- OBSERVER PATTERN FOR DATA REFRESH ---
const listeners: (() => void)[] = [];

const notifyListeners = () => {
    listeners.forEach(l => l());
};

const subscribe = (listener: () => void) => {
    listeners.push(listener);
    return () => {
        const index = listeners.indexOf(listener);
        if (index > -1) listeners.splice(index, 1);
    };
};

/**
 * DATABASE SERVICE LAYER
 * Acts as the ORM / API Interface.
 */
export const mockDb = {
  subscribe,

  auth: {
      init: () => authService.init(),
      getCurrentUser: () => authService.getCurrentUser(),
      login: (email: string, password?: string) => {
          const res = authService.login(email, password);
          notifyListeners();
          return res;
      },
      register: (data: any) => {
          const res = authService.register(data);
          notifyListeners();
          return res;
      },
      logout: () => {
          authService.logout();
          notifyListeners();
      },
      updateProfile: (data: any) => {
          authService.updateProfile(data);
          notifyListeners();
      }
  },

  // Job Service
  getAvailableJobs: () => jobService.getAvailableJobs(),
  getBookedJobs: () => jobService.getBookedJobs(),
  getJobHistory: () => jobService.getJobHistory(),
  getNextAssignment: () => jobService.getNextAssignment(),
  updateJobStatus: (id: string, status: JobStatus, extraData?: any) => { 
      jobService.updateJobStatus(id, status, extraData); 
      notifyListeners(); 
  },
  unassignJob: (jobId: string) => {
      const user = authService.getCurrentUser();
      if (!user) return false;
      const res = jobService.unassignJob(jobId, user.id);
      if (res) notifyListeners();
      return res;
  },

  // Admin Service
  getAllJobs: () => adminService.getAllJobs(),
  getAllUsers: () => adminService.getAllUsers(),
  getAllInvoices: () => adminService.getAllInvoices(),
  getJobsByUser: (userId: string) => adminService.getJobsByUser(userId),
  getInvoicesByUser: (userId: string) => adminService.getInvoicesByUser(userId),
  getSettings: () => adminService.getSettings(),
  updateSettings: (s: any) => { adminService.updateSettings(s); notifyListeners(); },
  getComplianceDocs: () => adminService.getComplianceDocs(),
  adminUpdateComplianceDoc: (id: string, content: string, title?: string) => { adminService.updateComplianceDoc(id, content, title); notifyListeners(); },
  
  // Admin Resources
  adminCreateResource: (res: Partial<Resource>) => { const r = adminService.createResource(res); notifyListeners(); return r; },
  adminUpdateResource: (id: string, updates: Partial<Resource>) => { adminService.updateResource(id, updates); notifyListeners(); },
  adminDeleteResource: (id: string) => { adminService.deleteResource(id); notifyListeners(); },

  // Admin Email Settings
  get emailTemplates() { return db.emailTemplates; },
  get emailLogs() { return db.emailLogs; },
  adminUpdateEmailTemplate: (id: string, updates: any) => { 
      adminService.updateEmailTemplate(id, updates); 
      notifyListeners(); 
  },
  sendTestEmail: (userId: string) => {
      notificationService.sendEmail(userId, 'MESSAGE_RECEIVED', {
          senderName: 'System Test',
          context: 'SMTP Check',
          preview: 'This is a test email to verify configuration.'
      });
  },

  // LMS Admin (Delegated)
  adminSaveCourse: (c: any, l: any) => { const r = lmsAdminService.saveCourse(c, l); notifyListeners(); return r; },
  adminDeleteCourse: (id: string) => { lmsAdminService.deleteCourse(id); notifyListeners(); },
  adminEnrollUser: (cid: string, uid: string) => { lmsAdminService.enrollUser(cid, uid); notifyListeners(); },
  adminRemoveUser: (cid: string, uid: string) => { lmsAdminService.removeUser(cid, uid); notifyListeners(); },
  adminUpdateLearnerProgress: (cid: string, uid: string, u: any) => { lmsAdminService.updateLearnerProgress(cid, uid, u); notifyListeners(); },
  adminUpdateCourseSettings: (cid: string, u: any) => { lmsAdminService.updateCourseSettings(cid, u); notifyListeners(); },
  
  // Admin User/Job Ops
  adminApproveJobSubmission: (jid: string) => { const r = adminService.approveJobSubmission(jid); notifyListeners(); return r; },
  adminForceCompleteJob: (jid: string, notes: string) => { const r = adminService.adminForceCompleteJob(jid, notes); notifyListeners(); return r; },
  adminCreateUser: (u: any) => { const r = adminService.createUser(u); notifyListeners(); return r; },
  adminUpdateUser: (uid: string, d: any) => { const r = adminService.updateUser(uid, d); notifyListeners(); return r; },
  adminUpdateUserVerification: (uid: string, v: boolean) => { adminService.updateUserVerification(uid, v); notifyListeners(); },
  adminSuspendUser: (uid: string, s: boolean) => { adminService.suspendUser(uid, s); notifyListeners(); },
  adminCreateJob: (j: any) => { const r = adminService.createJob(j); notifyListeners(); return r; },
  adminUpdateJobDetails: (jid: string, u: any, nf: any, ka: any) => { const r = adminService.updateJobDetails(jid, u, nf, ka); notifyListeners(); return r; },
  adminAssignJob: (jid: string, uid: string | null) => { adminService.assignJob(jid, uid); notifyListeners(); },
  getLoginHistoryForUser: (uid: string) => adminService.getLoginHistoryForUser(uid),
  adminLogImpersonation: (aid: string, uid: string) => { adminService.logImpersonation(aid, uid); notifyListeners(); },

  // Training Service
  getCourses: () => trainingService.getCourses(),
  getCourse: (id: string) => trainingService.getCourse(id),
  getLessons: (id: string) => trainingService.getLessons(id),
  getCourseProgress: (id: string) => trainingService.getCourseProgress(id),
  enrollCourse: (id: string) => { const res = trainingService.enrollCourse(id); notifyListeners(); return res; },
  completeLesson: (cid: string, lid: string) => { trainingService.completeLesson(cid, lid); notifyListeners(); },
  checkCompliance: (ids?: string[]) => trainingService.checkCompliance(ids),
  getCertificates: () => trainingService.getCertificates(),

  // Certificate Service (Admin Access)
  adminIssueCertificate: (uid: string, cid: string) => { certificateService.issueCertificate(uid, cid); notifyListeners(); },
  adminRevokeCertificate: (certId: string) => { certificateService.revokeCertificate(certId); notifyListeners(); },
  getCertificate: (id: string) => certificateService.getCertificate(id),

  // Finance Service
  getInvoices: () => financeService.getInvoices(),
  createInvoice: (i: any) => { financeService.createInvoice(i); notifyListeners(); },
  updateInvoice: (i: any) => { financeService.updateInvoice(i); notifyListeners(); },
  updateInvoiceStatus: (id: string, s: any) => { financeService.updateInvoiceStatus(id, s); notifyListeners(); },
  getFinanceStats: () => financeService.getFinanceStats(),
  getStats: () => financeService.getStats(),

  // Message Service
  getConversations: (uid: string) => messageService.getConversations(uid),
  getThread: (uid: string, pid: string, jid?: string) => messageService.getThread(uid, pid, jid),
  sendMessage: (sid: string, rid: string, content: string, jid?: string) => { const m = messageService.sendMessage(sid, rid, content, jid); notifyListeners(); return m; },
  markAsRead: (uid: string, pid: string, jid?: string) => { messageService.markAsRead(uid, pid, jid); notifyListeners(); },
  getGlobalUnreadCount: (uid: string) => messageService.getGlobalUnreadCount(uid),

  // Blog Service
  getAllBlogs: (includeDrafts?: boolean) => blogService.getAllBlogs(includeDrafts),
  getBlogBySlug: (slug: string) => blogService.getBlogBySlug(slug),
  createBlog: (data: Partial<BlogPost>) => { const b = blogService.createBlog(data); notifyListeners(); return b; },
  updateBlog: (id: string, data: Partial<BlogPost>) => { const b = blogService.updateBlog(id, data); notifyListeners(); return b; },
  deleteBlog: (id: string) => { blogService.deleteBlog(id); notifyListeners(); },
  searchBlogs: (query: string) => blogService.searchBlogs(query),

  // AI Services
  ai: aiWritingService,

  // Notification Service / Direct DB Access
  getNotifications: () => db.notifications.filter(n => n.userId === db.currentUserId).sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime()),
  markNotificationRead: (id: string) => {
      const n = db.notifications.find(item => item.id === id);
      if (n) { 
          n.isRead = true; 
          n.updatedAt = new Date().toISOString(); 
          notifyListeners(); 
      }
  },
  markAllNotificationsRead: () => {
      let updated = false;
      db.notifications.forEach(n => {
          if (n.userId === db.currentUserId && !n.isRead) {
              n.isRead = true;
              n.updatedAt = new Date().toISOString();
              updated = true;
          }
      });
      if (updated) notifyListeners();
  },
  getResources: () => db.resources.filter(r => !r.deletedAt),
};
