
import { Lesson } from '../types';

export const initialLessons: Lesson[] = [
  // C-101 Lessons (Translation Software)
  {
    id: 'l-101-1',
    courseId: 'c-101',
    module: 'Getting Started',
    title: 'Introduction to CAT Tools',
    type: 'Video',
    duration: '15 min',
    orderIndex: 0,
    contentUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', // Mock Video
    description: 'Understanding what Computer-Assisted Translation tools are and why they are essential for modern linguists.',
    transcript: "Welcome to this introductory module on CAT tools. In this lesson, we will explore the fundamental difference between machine translation and computer-assisted translation. Many linguists fear that technology will replace them, but in reality, CAT tools are designed to empower you...",
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
    deletedAt: null
  },
  {
    id: 'l-101-2',
    courseId: 'c-101',
    module: 'Getting Started',
    title: 'Setting up Translation Memories',
    type: 'Slide',
    duration: '30 min',
    orderIndex: 1,
    description: 'A step-by-step visual guide on creating and maintaining TMs to ensure consistency across projects.',
    contentUrl: 'https://bungoma.go.ke/wp-content/uploads/2021/04/StaffPerformanceAppraisal-JG-Hbelow.pdf',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
    deletedAt: null
  },
  {
    id: 'l-101-3',
    courseId: 'c-101',
    module: 'Core Skills',
    title: 'Terminology Management',
    type: 'Document',
    duration: '45 min',
    orderIndex: 2,
    description: 'Read the best practices guide for building client-specific glossaries.',
    contentUrl: 'https://bungoma.go.ke/wp-content/uploads/2021/04/StaffPerformanceAppraisal-JG-Hbelow.pdf',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
    deletedAt: null
  },
  {
    id: 'l-101-4',
    courseId: 'c-101',
    module: 'Assessment',
    title: 'Final Assessment: Software',
    type: 'Quiz',
    duration: '20 min',
    orderIndex: 3,
    description: 'Test your knowledge on CAT tools and file management.',
    quizData: [
      {
        question: "What does 'CAT' stand for in 'CAT tool'?",
        options: [
          "Computer-Assisted Translation",
          "Computer-Aided Technology",
          "Creative Authoring Tool",
          "Contextual Analysis Template"
        ],
        correctAnswer: 0,
        explanation: "'CAT' stands for Computer-Assisted Translation. These tools help linguists by leveraging translation memories and glossaries."
      },
      {
        question: "What is the primary purpose of a Translation Memory (TM)?",
        options: [
          "To automatically translate the entire document.",
          "To store previously translated segments for reuse.",
          "To check for spelling and grammar errors.",
          "To format the final document."
        ],
        correctAnswer: 1,
        explanation: "A Translation Memory (TM) stores source and target language pairs, allowing translators to reuse previous work for consistency and speed."
      }
    ],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
    deletedAt: null
  },

  // C-102 Lessons (Medical)
  {
    id: 'l-102-1',
    courseId: 'c-102',
    module: 'Foundations',
    title: 'Anatomy & Physiology 101',
    type: 'Video',
    duration: '45 min',
    orderIndex: 0,
    contentUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    description: 'Overview of major body systems relevant to interpreting.',
    transcript: "In medical interpreting, accuracy is a matter of life and death. Today we start with the Cardiovascular system. The heart is a muscular organ...",
    createdAt: '2024-01-05T00:00:00Z',
    updatedAt: '2024-01-05T00:00:00Z',
    deletedAt: null
  },
  {
    id: 'l-102-2',
    courseId: 'c-102',
    module: 'Foundations',
    title: 'NHS Protocols for Interpreters',
    type: 'Document',
    duration: '30 min',
    orderIndex: 1,
    description: 'Standard Operating Procedures for working within NHS Trusts.',
    contentUrl: 'https://bungoma.go.ke/wp-content/uploads/2021/04/StaffPerformanceAppraisal-JG-Hbelow.pdf',
    createdAt: '2024-01-05T00:00:00Z',
    updatedAt: '2024-01-05T00:00:00Z',
    deletedAt: null
  },
  {
     id: 'l-102-3',
     courseId: 'c-102',
     module: 'Advanced Scenarios',
     title: 'Ethics: Breaking Bad News',
     type: 'Video',
     duration: '20 min',
     orderIndex: 2,
     description: 'How to maintain professional boundaries and emotional stability during difficult consultations.',
     contentUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
     transcript: "Delivering bad news is never easy, but as an interpreter, your role is to convey the clinician's words exactly, including the tone and empathy...",
     createdAt: '2024-01-05T00:00:00Z',
     updatedAt: '2024-01-05T00:00:00Z',
     deletedAt: null
  },

  // C-103 Lessons (GDPR)
  {
    id: 'l-103-1',
    courseId: 'c-103',
    module: 'Core Principles',
    title: 'Principles of Data Protection',
    type: 'Video',
    duration: '20 min',
    orderIndex: 0,
    description: 'The 7 key principles of GDPR.',
    contentUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    createdAt: '2023-12-01T00:00:00Z',
    updatedAt: '2023-12-01T00:00:00Z',
    deletedAt: null
  },
  {
    id: 'l-103-2',
    courseId: 'c-103',
    module: 'Core Principles',
    title: 'Handling Printed Documents',
    type: 'Slide',
    duration: '15 min',
    orderIndex: 1,
    description: 'Secure disposal and storage of physical notes.',
    contentUrl: 'https://bungoma.go.ke/wp-content/uploads/2021/04/StaffPerformanceAppraisal-JG-Hbelow.pdf',
    createdAt: '2023-12-01T00:00:00Z',
    updatedAt: '2023-12-01T00:00:00Z',
    deletedAt: null
  },
  {
    id: 'l-103-3',
    courseId: 'c-103',
    module: 'Final Quiz',
    title: 'GDPR Certification Quiz',
    type: 'Quiz',
    duration: '15 min',
    orderIndex: 2,
    description: 'Pass score: 80%.',
    quizData: [
      {
        question: "What does GDPR stand for?",
        options: [
          "General Data Protection Regulation",
          "Global Data Privacy Regulation",
          "General Document Processing Rules",
          "Government Data Protection Registry"
        ],
        correctAnswer: 0,
        explanation: "GDPR stands for General Data Protection Regulation, a key data privacy regulation in the EU and UK."
      },
      {
        question: "Under GDPR, when must you report a data breach to the supervisory authority?",
        options: [
          "Within one week",
          "Within 72 hours",
          "Within one month",
          "Immediately, without any delay"
        ],
        correctAnswer: 1,
        explanation: "A notifiable breach has to be reported to the relevant supervisory authority within 72 hours of the organisation becoming aware of it."
      },
      {
        question: "Which of the following is considered 'personal data' under GDPR?",
        options: [
          "A person's name",
          "An email address",
          "An IP address",
          "All of the above"
        ],
        correctAnswer: 3,
        explanation: "Personal data is any information that relates to an identified or identifiable individual, which includes names, email addresses, and even technical data like IP addresses."
      }
    ],
    createdAt: '2023-12-01T00:00:00Z',
    updatedAt: '2023-12-01T00:00:00Z',
    deletedAt: null
  }
];
