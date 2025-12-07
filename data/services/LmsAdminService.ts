
import { db } from '../store';
import { Course, Lesson, CourseProgress } from '../types';
import { NotificationService } from './NotificationService';
import { CertificateService } from './CertificateService';

export class LmsAdminService {
    private notifications: NotificationService;
    private certificateService: CertificateService;

    constructor(notificationService: NotificationService, certificateService: CertificateService) {
        this.notifications = notificationService;
        this.certificateService = certificateService;
    }

    saveCourse(courseData: Partial<Course>, lessons: Lesson[]): Course {
        const isNew = !courseData.id;
        const courseId = courseData.id || db.generateId('c');
        const now = new Date().toISOString();
        
        const newCourse: Course = {
            id: courseId,
            title: courseData.title || 'Untitled Course',
            description: courseData.description || '',
            category: courseData.category || 'General',
            duration: courseData.duration || '0m',
            lessonsCount: lessons.length,
            thumbnailUrl: courseData.thumbnailUrl || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=600',
            instructor: courseData.instructor || 'Jambo Training',
            instructorRole: courseData.instructorRole || 'Instructor',
            learningGoals: courseData.learningGoals || [],
            allowSelfEnrollment: courseData.allowSelfEnrollment ?? true,
            status: courseData.status || 'Draft',
            settings: courseData.settings || {
                visibility: 'Hidden',
                allowReenrollment: true,
                requirePrerequisites: false,
                prerequisites: [],
                passingScore: 80,
                autoIssueCertificate: true,
                notifications: { onEnroll: true, onComplete: true }
            },
            compliance: courseData.compliance || {
                requiredForJobTypes: [],
                isMandatory: false
            },
            createdAt: courseData.createdAt || now,
            updatedAt: now,
            deletedAt: null
        };

        if (isNew) {
            db.courses.push(newCourse);
        } else {
            const idx = db.courses.findIndex(c => c.id === courseId);
            if (idx !== -1) {
                db.courses[idx] = newCourse;
            }
        }

        // Hard delete existing lessons for simplicity in this mock DB scenario when replacing structure
        // In a real DB, you'd soft delete orphans.
        db.lessons = db.lessons.filter(l => l.courseId !== courseId);
        
        const newLessons = lessons.map((l, index) => ({
            ...l,
            id: l.id.startsWith('temp-') ? db.generateId('l') + index : l.id,
            courseId: courseId,
            orderIndex: index,
            createdAt: l.createdAt || now,
            updatedAt: now,
            deletedAt: null
        }));
        
        db.lessons.push(...newLessons);

        return newCourse;
    }

    deleteCourse(courseId: string) {
        const idx = db.courses.findIndex(c => c.id === courseId);
        if (idx !== -1) {
            // Soft delete the course
            db.courses[idx].deletedAt = new Date().toISOString();
            
            // Soft delete related lessons
            db.lessons.forEach(l => {
                if (l.courseId === courseId) l.deletedAt = new Date().toISOString();
            });
        }
    }

    enrollUser(courseId: string, userId: string) {
        if (db.courseProgress.some(p => p.courseId === courseId && p.userId === userId)) return;

        db.courseProgress.push({
            userId,
            courseId,
            status: 'In Progress',
            progressPercent: 0,
            lessonsCompletedIds: [],
            enrollmentDate: new Date().toISOString(),
            lastAccessedAt: new Date().toISOString(),
            timeSpent: '0m',
            history: [{ date: new Date().toISOString(), action: 'Enrolled by Admin' }]
        });
        
        const course = db.courses.find(c => c.id === courseId);
        this.notifications.notifyAdminAction(
            userId, 
            "Course Enrollment", 
            `You have been enrolled in "${course?.title}" by an administrator.`, 
            "training"
        );
    }

    removeUser(courseId: string, userId: string) {
        db.courseProgress = db.courseProgress.filter(p => !(p.courseId === courseId && p.userId === userId));
    }

    updateLearnerProgress(courseId: string, userId: string, updates: Partial<CourseProgress>) {
        const idx = db.courseProgress.findIndex(p => p.courseId === courseId && p.userId === userId);
        if (idx !== -1) {
            const current = db.courseProgress[idx];
            const newHistory = [...(current.history || [])];
            
            if (updates.status && updates.status !== current.status) {
                newHistory.push({ 
                    date: new Date().toISOString(), 
                    action: `Status changed to ${updates.status} by Admin` 
                });
            }
            
            if (updates.instructorNotes) {
                 newHistory.push({ 
                    date: new Date().toISOString(), 
                    action: `Instructor note added` 
                });
            }

            db.courseProgress[idx] = {
                ...current,
                ...updates,
                history: newHistory,
                completedAt: updates.status === 'Completed' && !current.completedAt ? new Date().toISOString() : current.completedAt
            };

            // Auto-issue certificate if marked completed by admin and course has auto-issue enabled
            if (updates.status === 'Completed' && !current.certificateId) {
                const course = db.courses.find(c => c.id === courseId);
                if (course?.settings.autoIssueCertificate) {
                    this.certificateService.issueCertificate(userId, courseId);
                }
            }
        }
    }

    updateCourseSettings(courseId: string, updates: Partial<Course>) {
        const idx = db.courses.findIndex(c => c.id === courseId);
        if (idx !== -1) {
            db.courses[idx] = { ...db.courses[idx], ...updates, updatedAt: new Date().toISOString() };
        }
    }
}
