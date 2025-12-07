
import { Course, CourseProgress } from '../types';

export const initialCourses: Course[] = [
  {
    id: 'c-101',
    title: 'Translation Software Essentials',
    description: 'Master the industry-standard CAT tools. Learn how to manage translation memories, glossaries, and quality assurance checks effectively to boost your productivity and consistency.',
    category: 'Technical',
    duration: '4h 15m',
    lessonsCount: 4,
    thumbnailUrl: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=600',
    instructor: 'Sarah Jenkins',
    instructorRole: 'Senior CAT Tool Trainer',
    allowSelfEnrollment: true,
    learningGoals: [
        'Understand the architecture of Translation Memories',
        'Create and maintain client-specific glossaries',
        'Perform automated QA checks for errors',
        'Export projects for final delivery'
    ],
    status: 'Published',
    settings: {
        visibility: 'Public',
        allowReenrollment: true,
        passingScore: 80,
        autoIssueCertificate: true,
        requirePrerequisites: false,
        prerequisites: [],
        notifications: { onEnroll: true, onComplete: true }
    },
    compliance: { requiredForJobTypes: [], isMandatory: false },
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
    deletedAt: null
  },
  {
    id: 'c-102',
    title: 'Medical Interpreting Basics',
    description: 'A comprehensive guide to interpreting in healthcare settings. Covers common terminology, ethical dilemmas, NHS protocols, and emotional resilience for interpreters.',
    category: 'Language',
    duration: '6h 00m',
    lessonsCount: 3,
    thumbnailUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=600',
    instructor: 'Dr. Amina Abdi',
    instructorRole: 'NHS Consultant & Linguist',
    allowSelfEnrollment: true,
    learningGoals: [
        'Master core cardiology and respiratory terminology',
        'Understand NHS safeguarding protocols',
        'Navigate ethical dilemmas in patient consultations',
        'Techniques for breaking bad news sensitively'
    ],
    status: 'Published',
    settings: {
        visibility: 'Public',
        allowReenrollment: true,
        passingScore: 85,
        autoIssueCertificate: true,
        requirePrerequisites: false,
        prerequisites: [],
        notifications: { onEnroll: true, onComplete: true }
    },
    compliance: { requiredForJobTypes: ['Interpreting'], isMandatory: false },
    createdAt: '2024-01-05T00:00:00Z',
    updatedAt: '2024-01-05T00:00:00Z',
    deletedAt: null
  },
  {
    id: 'c-103',
    title: 'GDPR & Data Compliance',
    description: 'Essential training on data protection for freelance linguists. Understand your responsibilities under UK law and how to handle sensitive client data securely.',
    category: 'Compliance',
    duration: '1h 30m',
    lessonsCount: 3,
    thumbnailUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=600',
    instructor: 'Jambo Compliance Team',
    instructorRole: 'Legal Department',
    allowSelfEnrollment: false,
    learningGoals: [
        'Identify the 7 key principles of GDPR',
        'Securely store and dispose of physical notes',
        'Recognize and report data breaches',
        'Understand your liability as a freelancer'
    ],
    status: 'Published',
    settings: {
        visibility: 'Invite-Only',
        allowReenrollment: false,
        passingScore: 100,
        autoIssueCertificate: true,
        requirePrerequisites: false,
        prerequisites: [],
        notifications: { onEnroll: true, onComplete: false }
    },
    compliance: { requiredForJobTypes: [], mandatoryRefreshMonths: 12, isMandatory: true },
    createdAt: '2023-12-01T00:00:00Z',
    updatedAt: '2023-12-01T00:00:00Z',
    deletedAt: null
  },
  {
    id: 'c-restricted',
    title: 'Advanced Legal Interpreting (Restricted)',
    description: 'Specialized module for DPSI holders only. Requires manual approval from the admin team.',
    category: 'Technical',
    duration: '10h 00m',
    lessonsCount: 5,
    thumbnailUrl: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=600',
    instructor: 'Legal Dept',
    instructorRole: 'Head of Compliance',
    allowSelfEnrollment: false,
    learningGoals: ['Courtroom etiquette', 'Legal terminology', 'Impartiality in high-stakes cases'],
    status: 'Published',
    settings: {
        visibility: 'Public',
        allowReenrollment: false,
        passingScore: 90,
        autoIssueCertificate: false,
        requirePrerequisites: true,
        prerequisites: ['c-103'],
        notifications: { onEnroll: true, onComplete: true }
    },
    compliance: { requiredForJobTypes: ['Interpreting'], isMandatory: false },
    createdAt: '2024-02-01T00:00:00Z',
    updatedAt: '2024-02-01T00:00:00Z',
    deletedAt: null
  }
];

export const initialProgress: CourseProgress[] = [
    {
        userId: 'u-123456',
        courseId: 'c-103', // GDPR
        status: 'Completed',
        progressPercent: 100,
        lessonsCompletedIds: ['l-103-1', 'l-103-2', 'l-103-3'],
        lastAccessedAt: '2024-09-15T10:00:00Z',
        enrollmentDate: '2024-09-01T09:00:00Z',
        completedAt: '2024-09-15T11:30:00Z',
        certificateId: 'cert-initial-1',
        history: [
            { date: '2024-09-01T09:00:00Z', action: 'Enrolled' },
            { date: '2024-09-15T11:30:00Z', action: 'Course Completed' }
        ]
    }
];