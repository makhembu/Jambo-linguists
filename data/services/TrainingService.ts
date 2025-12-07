
import { db } from '../store';
import { EnrichedCourse, Lesson, CourseProgress } from '../types';
import { NotificationService } from './NotificationService';

export class TrainingService {
    private notifications: NotificationService;

    constructor(notificationService: NotificationService) {
        this.notifications = notificationService;
    }
    
    getCourses(): EnrichedCourse[] {
        return db.courses
            .filter(c => !c.deletedAt)
            .map(course => {
                const progress = db.currentUserId 
                    ? db.courseProgress.find(p => p.userId === db.currentUserId && p.courseId === course.id)
                    : undefined;
                return { ...course, progress };
            });
    }

    getCourse(courseId: string): EnrichedCourse | undefined {
        const course = db.courses.find(c => c.id === courseId && !c.deletedAt);
        if (!course) return undefined;
        
        const progress = db.currentUserId
            ? db.courseProgress.find(p => p.userId === db.currentUserId && p.courseId === courseId)
            : undefined;
        
        return { ...course, progress };
    }

    getLessons(courseId: string): Lesson[] {
        return db.lessons
            .filter(l => l.courseId === courseId && !l.deletedAt)
            .sort((a, b) => a.orderIndex - b.orderIndex);
    }

    getCourseProgress(courseId: string): CourseProgress[] {
        return db.courseProgress.filter(p => p.courseId === courseId);
    }

    enrollCourse(courseId: string): { success: boolean, message?: string } {
        if (!db.currentUserId) return { success: false, message: 'User not logged in' };
        
        // 1. Check Global Settings
        if (!db.settings.globalSelfEnrollment) {
            return { success: false, message: 'Self-enrollment is currently disabled by administrators.' };
        }

        const course = db.courses.find(c => c.id === courseId && !c.deletedAt);
        if (!course) return { success: false, message: 'Course not found' };

        // 2. Check Course Settings
        if (!course.allowSelfEnrollment) {
            return { success: false, message: 'This course requires manual approval to enroll.' };
        }

        // 3. Check Prerequisites
        if (db.settings.requirePrerequisites && course.settings.prerequisites && course.settings.prerequisites.length > 0) {
            const userCompletedIds = db.courseProgress
                .filter(p => p.userId === db.currentUserId && p.status === 'Completed')
                .map(p => p.courseId);
            
            const missingPrereqs = course.settings.prerequisites.filter(id => !userCompletedIds.includes(id));
            if (missingPrereqs.length > 0) {
                return { success: false, message: 'You have not completed the required prerequisites for this course.' };
            }
        }
        
        // Check if already exists to prevent dupes
        const exists = db.courseProgress.find(p => p.userId === db.currentUserId && p.courseId === courseId);
        if (exists) return { success: true, message: 'Already enrolled.' };

        // Create initial progress record
        db.courseProgress.push({
            userId: db.currentUserId,
            courseId: courseId,
            status: 'In Progress',
            progressPercent: 0,
            lessonsCompletedIds: [],
            lastAccessedAt: new Date().toISOString(),
            enrollmentDate: new Date().toISOString(),
            history: [{ date: new Date().toISOString(), action: 'Enrolled in course' }]
        });

        return { success: true, message: 'Enrolled successfully.' };
    }

    completeLesson(courseId: string, lessonId: string) {
        if (!db.currentUserId) return;
        
        // Find or create progress record
        let progress = db.courseProgress.find(p => p.userId === db.currentUserId && p.courseId === courseId);
        
        if (!progress) {
            progress = {
                userId: db.currentUserId,
                courseId: courseId,
                status: 'In Progress',
                progressPercent: 0,
                lessonsCompletedIds: [],
                lastAccessedAt: new Date().toISOString(),
                enrollmentDate: new Date().toISOString(),
                history: [{ date: new Date().toISOString(), action: 'Started course via lesson access' }]
            };
            db.courseProgress.push(progress);
        }

        // Update last accessed
        progress.lastAccessedLessonId = lessonId;
        progress.lastAccessedAt = new Date().toISOString();

        // Mark lesson complete if not already
        if (!progress.lessonsCompletedIds.includes(lessonId)) {
            progress.lessonsCompletedIds.push(lessonId);
            const lessonTitle = db.lessons.find(l => l.id === lessonId)?.title || 'Lesson';
            progress.history = [...(progress.history || []), { date: new Date().toISOString(), action: `Completed ${lessonTitle}` }];
        }

        // Calculate percent
        const totalLessons = db.lessons.filter(l => l.courseId === courseId && !l.deletedAt).length;
        if (totalLessons > 0) {
            progress.progressPercent = Math.round((progress.lessonsCompletedIds.length / totalLessons) * 100);
        }

        // Check if course complete
        if (progress.progressPercent === 100 && progress.status !== 'Completed') {
            progress.status = 'Completed';
            progress.completedAt = new Date().toISOString();
            progress.history = [...(progress.history || []), { date: new Date().toISOString(), action: 'Course Completed' }];
            
            const course = db.courses.find(c => c.id === courseId);
            
            // Notification System
            const hasNotif = db.notifications.some(n => n.title.includes(`Course Completed: ${course?.title}`));
            if(!hasNotif) {
                const now = new Date().toISOString();
                db.notifications.unshift({
                    id: db.generateId('n'),
                    userId: db.currentUserId,
                    title: `Course Completed: ${course?.title}`,
                    time: "Just now",
                    isRead: false,
                    iconType: 'grad',
                    bg: 'bg-yellow-50',
                    color: 'text-yellow-600',
                    linkTo: 'training-certificates',
                    createdAt: now,
                    updatedAt: now,
                    deletedAt: null
                });
                
                // --- NEW: Send Email ---
                if (course) {
                    this.notifications.notifyCourseCompleted(db.currentUserId, course.title);
                }
            }
        }
    }

    checkCompliance(requiredCourseIds?: string[]): { compliant: boolean; missingCourses: string[] } {
        if (!requiredCourseIds || requiredCourseIds.length === 0) return { compliant: true, missingCourses: [] };
        if (!db.currentUserId) return { compliant: false, missingCourses: requiredCourseIds };

        const userProgress = db.courseProgress.filter(p => p.userId === db.currentUserId && p.status === 'Completed');
        const completedIds = userProgress.map(p => p.courseId);
        
        const missing = requiredCourseIds.filter(id => !completedIds.includes(id));
        const missingTitles = missing.map(id => db.courses.find(c => c.id === id)?.title || id);

        return {
            compliant: missing.length === 0,
            missingCourses: missingTitles
        };
    }

    getCertificates(): EnrichedCourse[] {
        if (!db.currentUserId) return [];
        
        // Find certificates belonging to current user that are Active
        const userCertificates = db.certificates.filter(cert => 
            cert.userId === db.currentUserId && cert.status === 'Active' && !cert.deletedAt
        );
        
        // Map these certificates back to their courses
        return userCertificates.map(cert => {
            const course = db.courses.find(c => c.id === cert.courseId && !c.deletedAt);
            if (!course) return null;
            
            const progress = db.courseProgress.find(p => p.userId === db.currentUserId && p.courseId === cert.courseId);
            
            return {
                ...course,
                progress: progress ? { ...progress, certificateId: cert.id } : undefined
            };
        }).filter(c => c !== null) as EnrichedCourse[];
    }
}
