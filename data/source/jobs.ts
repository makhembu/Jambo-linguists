
import { Job } from '../types';

const MOCK_USER_ID = 'u-123456'; // Linah's ID
const ADMIN_ID = 'u-admin-001';
const CLIENT_ID = 'u-client-001';

const now = new Date().toISOString();

/**
 * SQL Table: jobs
 */
export const initialJobs: Job[] = [
    // --- FUTURE JOBS (REQUESTED) ---
    {
        id: 'JL-FUTURE-01',
        linguistId: MOCK_USER_ID,
        postedBy: ADMIN_ID,
        category: 'Interpreting',
        type: 'Face-to-Face',
        status: 'Scheduled',
        title: 'Christmas Day Emergency Cover',
        description: 'On-call interpreting for emergency A&E admissions. High priority cover required for potential trauma cases.',
        date: '2025-12-25',
        time: '08:00 AM',
        finishTime: '04:00 PM',
        duration: '8h 00m',
        location: 'Leeds General Infirmary, A&E',
        languagePair: 'English <> Swahili',
        rate: '£60/hr (Holiday Rate)',
        isUrgent: true,
        distance: 5,
        hourlyRate: 60,
        mileageRate: 0.45,
        travelHours: 0.5,
        travelRate: 15,
        createdAt: '2025-10-01T09:00:00Z',
        updatedAt: '2025-10-01T10:30:00Z',
        deletedAt: null,
        history: [
            { id: 'h1', type: 'CREATED', date: '2025-10-01T09:00:00Z', actorName: 'Jambo Admin', description: 'Job created in system' },
            { id: 'h1_1', type: 'ASSIGNED', date: '2025-10-01T09:05:00Z', actorName: 'Jambo Admin', description: 'Marked as urgent priority' },
            { id: 'h2', type: 'ASSIGNED', date: '2025-10-01T10:30:00Z', actorName: 'Jambo Admin', description: 'Assigned to Linah Makembu' }
        ]
    },
    {
        id: 'JL-FUTURE-02',
        linguistId: MOCK_USER_ID,
        postedBy: ADMIN_ID,
        category: 'Translation',
        type: 'Document',
        status: 'Scheduled',
        title: 'End of Year Legal Report',
        description: 'Translation of annual summary for corporate client. Requires formatting to match original.',
        date: '2025-12-12',
        deadlineTime: '17:00',
        duration: '5 days',
        wordCount: 5000,
        location: 'Remote',
        languagePair: 'English > Swahili',
        rate: '12p/word',
        isUrgent: false,
        distance: 0,
        wordRate: 0.12,
        createdAt: '2025-10-05T14:00:00Z',
        updatedAt: '2025-10-06T09:15:00Z',
        deletedAt: null,
        attachments: [
            { name: 'Legal_Report_2024_Source.pdf', type: 'file', url: '#' },
            { name: 'Style_Guide_v3.docx', type: 'file', url: '#' }
        ],
        history: [
            { id: 'h3', type: 'CREATED', date: '2025-10-05T14:00:00Z', actorName: 'Jambo Admin' },
            { id: 'h4', type: 'ASSIGNED', date: '2025-10-06T09:15:00Z', actorName: 'Jambo Admin', description: 'Assigned to Linah Makembu' }
        ]
    },
    {
        id: 'JL-FUTURE-03',
        linguistId: null, // Open
        postedBy: ADMIN_ID,
        category: 'Interpreting',
        type: 'Video',
        status: 'Open',
        title: 'International Conference: Health Equity',
        description: 'Simultaneous interpreting for a breakout session on East African public health initiatives.',
        date: '2025-11-15',
        time: '09:00 AM',
        finishTime: '05:00 PM',
        duration: '8h 00m',
        location: 'Remote (Zoom)',
        languagePair: 'English <> Swahili',
        rate: '£350/day',
        isUrgent: false,
        distance: 0,
        fixedRate: 350,
        createdAt: '2025-10-10T11:00:00Z',
        updatedAt: '2025-10-10T11:00:00Z',
        deletedAt: null,
        history: [
            { id: 'h5', type: 'CREATED', date: '2025-10-10T11:00:00Z', actorName: 'Jambo Admin' }
        ]
    },
    
    // --- AVAILABLE JOBS (Open - No Linguist Assigned) ---
    {
      id: 'JL-1001',
      linguistId: null, // Open
      postedBy: CLIENT_ID,
      category: 'Interpreting',
      type: 'Face-to-Face',
      status: 'Open',
      title: 'Medical Consultation Interpreting',
      description: 'Face-to-face interpreting required for a pre-op assessment at Leeds General Infirmary. Patient speaks Swahili. Terminology will focus on cardiology.',
      date: '2025-10-24',
      time: '09:30 AM',
      finishTime: '12:00 PM',
      duration: '2h 30m',
      location: 'Leeds General Infirmary, Clarendon Wing',
      languagePair: 'English <> Swahili',
      rate: '£30/hr',
      isUrgent: true,
      distance: 2.4,
      hourlyRate: 30,
      mileageRate: 0.45,
      travelHours: 1,
      travelRate: 15,
      requiredCourseIds: ['c-102'], // REQUIRES MEDICAL COURSE (which user hasn't finished)
      createdAt: '2025-10-20T09:00:00Z',
      updatedAt: '2025-10-20T09:00:00Z',
      deletedAt: null,
      attachments: [{
          name: 'Patient_Notes_Redacted.pdf',
          type: 'file',
          url: '#'
      }],
      history: [
          { id: 'h8', type: 'CREATED', date: '2025-10-20T09:00:00Z', actorName: 'NHS Trust', description: 'Request received from LGI Portal' }
      ]
    },
    {
      id: 'JL-1002',
      linguistId: null, // Open
      postedBy: ADMIN_ID,
      category: 'Interpreting',
      type: 'Face-to-Face',
      status: 'Open',
      title: 'Magistrates Court Hearing',
      description: 'Court interpreter needed for a plea hearing. Must be familiar with UK legal terminology and court protocols. Smart dress code required.',
      date: '2025-10-25',
      time: '02:00 PM',
      finishTime: '05:00 PM',
      duration: '3h 00m',
      location: 'Bradford Magistrates Court',
      languagePair: 'English <> Swahili',
      rate: '£32/hr',
      isUrgent: false,
      distance: 8.1,
      hourlyRate: 32,
      mileageRate: 0.45,
      travelHours: 1.5,
      travelRate: 15,
      requiredCourseIds: ['c-103'], // REQUIRES GDPR (User HAS done this)
      createdAt: '2025-10-21T10:00:00Z',
      updatedAt: '2025-10-21T10:00:00Z',
      deletedAt: null,
      attachments: [{
          name: 'Case_Listing_Brief.pdf',
          type: 'file',
          url: '#'
      }],
      history: [
          { id: 'h9', type: 'CREATED', date: '2025-10-21T10:00:00Z', actorName: 'Jambo Admin' }
      ]
    },
    {
      id: 'JL-1003',
      linguistId: null, // Open
      postedBy: CLIENT_ID,
      category: 'Translation',
      type: 'Document',
      status: 'Open',
      title: 'Legal Contract Translation',
      description: 'Translate a tenancy agreement document from English to Swahili. Accuracy and legal terminology are critical. Document length is approx 2,500 words.',
      date: '2025-10-28',
      deadlineTime: '17:00',
      duration: 'Est. 6 hours',
      wordCount: 2500,
      location: 'Remote (Document Download)',
      languagePair: 'English > Swahili',
      rate: '10p/word',
      isUrgent: false,
      distance: 0,
      wordRate: 0.10,
      createdAt: '2025-10-22T11:30:00Z',
      updatedAt: '2025-10-22T11:30:00Z',
      deletedAt: null,
      attachments: [{
          name: 'Tenancy_Agreement_Draft.docx',
          type: 'file',
          url: '#'
      }],
      history: [
          { id: 'h10', type: 'CREATED', date: '2025-10-22T11:30:00Z', actorName: 'Client Portal' }
      ]
    },
    
    // --- BOOKED / ACTIVE JOBS (Assigned to Linah) ---
    {
      id: 'JL-2001',
      linguistId: MOCK_USER_ID, // Assigned
      postedBy: ADMIN_ID,
      category: 'Interpreting',
      type: 'Face-to-Face',
      status: 'Scheduled',
      title: 'School Parent Evening',
      description: 'Interpret for parents of a Year 8 student. General academic progress discussion.',
      date: '2025-10-29',
      time: '04:00 PM',
      finishTime: '05:00 PM',
      duration: '1h 00m',
      location: 'Allerton High School, Leeds',
      languagePair: 'English <> Swahili',
      rate: '£28/hr',
      isUrgent: false,
      distance: 4.5,
      hourlyRate: 28,
      mileageRate: 0.45,
      travelHours: 0.5,
      travelRate: 15,
      createdAt: '2025-10-20T10:00:00Z',
      updatedAt: '2025-10-21T09:00:00Z',
      deletedAt: null,
      history: [
          { id: 'h13', type: 'CREATED', date: '2025-10-20T10:00:00Z', actorName: 'Jambo Admin' },
          { id: 'h14', type: 'ASSIGNED', date: '2025-10-21T09:00:00Z', actorName: 'Linah Makembu', description: 'Claimed via portal' }
      ]
    },
    {
      id: 'JL-2002',
      linguistId: MOCK_USER_ID,
      postedBy: CLIENT_ID,
      category: 'Translation',
      type: 'Document',
      status: 'In Progress',
      title: 'NHS Information Leaflet',
      description: 'Translation of "Living with Diabetes" pamphlet. Simple, accessible language required.',
      date: '2025-10-30',
      duration: 'Est. 3 hours',
      wordCount: 1500,
      location: 'Remote',
      languagePair: 'English > Swahili',
      rate: '11p/word',
      wordRate: 0.11,
      isUrgent: false,
      distance: 0,
      createdAt: '2025-10-25T11:00:00Z',
      updatedAt: '2025-10-26T14:30:00Z',
      deletedAt: null,
      attachments: [{
          name: 'Diabetes_Info_Leaflet_EN.pdf',
          type: 'file',
          url: '#'
      }],
      history: [
          { id: 'h15', type: 'CREATED', date: '2025-10-25T11:00:00Z', actorName: 'NHS Trust' },
          { id: 'h16', type: 'ASSIGNED', date: '2025-10-26T14:30:00Z', actorName: 'Linah Makembu' }
      ]
    },
    {
      id: 'JL-2003',
      linguistId: MOCK_USER_ID,
      postedBy: ADMIN_ID,
      category: 'Translation',
      type: 'Document',
      status: 'Revision',
      title: 'Marketing Flyer Review',
      description: 'Client has requested minor tone adjustments to the "Summer Campaign" translation.',
      date: '2025-10-22',
      duration: '30 mins',
      wordCount: 400,
      location: 'Remote',
      languagePair: 'English > Swahili',
      rate: '£25 Fixed',
      fixedRate: 25,
      isUrgent: true,
      distance: 0,
      revisionFeedback: 'Please make the tone more formal in the second paragraph.',
      revisionFile: 'Marked_Flyer.pdf',
      createdAt: '2025-10-18T09:00:00Z',
      updatedAt: '2025-10-21T09:30:00Z',
      deletedAt: null,
      attachments: [{
          name: 'Summer_Campaign_Flyer_v1.pdf',
          type: 'file',
          url: '#'
      }],
      history: [
          { id: 'h17', type: 'CREATED', date: '2025-10-18T09:00:00Z', actorName: 'Jambo Admin' },
          { id: 'h18', type: 'ASSIGNED', date: '2025-10-18T10:00:00Z', actorName: 'Linah Makembu' },
          { id: 'h19', type: 'SUBMITTED', date: '2025-10-20T16:00:00Z', actorName: 'Linah Makembu', description: 'Draft 1 completed', attachment: 'Flyer_Draft_v1.docx' },
          { id: 'h20', type: 'REVISION_REQUESTED', date: '2025-10-21T09:30:00Z', actorName: 'Jambo Admin', description: 'Please make the tone more formal in the second paragraph.', attachment: 'Marked_Flyer.pdf' }
      ]
    },

    // --- HISTORY (Completed/Cancelled/Pending - Assigned to Linah) ---
    
    // MISSING JOB ADDED: Links to Invoice #INV-2024-001 (£850)
    {
      id: 'JL-3006',
      linguistId: MOCK_USER_ID,
      postedBy: CLIENT_ID,
      category: 'Translation',
      type: 'Document',
      status: 'Completed',
      title: 'Employee Handbook Translation',
      description: 'Full translation of HR handbook for manufacturing staff. 8,500 words.',
      date: '2024-09-25',
      deadlineTime: '17:00',
      duration: '2 weeks',
      wordCount: 8500,
      location: 'Remote',
      languagePair: 'English > Swahili',
      rate: '10p/word',
      wordRate: 0.10,
      isUrgent: false,
      completedAt: '2024-09-29T16:00:00',
      completionNotes: 'Delivered final PDF and DOCX versions via portal.',
      totalPayout: 850.00,
      rating: 5,
      createdAt: '2024-09-10T09:00:00Z',
      updatedAt: '2024-09-30T09:00:00Z',
      deletedAt: null,
      history: [
          { id: 'h_3006_1', type: 'CREATED', date: '2024-09-10T09:00:00Z', actorName: 'NHS Trust' },
          { id: 'h_3006_2', type: 'ASSIGNED', date: '2024-09-11T10:00:00Z', actorName: 'Linah Makembu' },
          { id: 'h_3006_3', type: 'SUBMITTED', date: '2024-09-29T16:00:00Z', actorName: 'Linah Makembu', description: 'Files uploaded.' },
          { id: 'h_3006_4', type: 'APPROVED', date: '2024-09-30T09:00:00Z', actorName: 'Jambo Admin' }
      ]
    },

    // Links to Invoice #INV-2024-002 (£60 part)
    {
      id: 'JL-3001',
      linguistId: MOCK_USER_ID,
      postedBy: ADMIN_ID,
      category: 'Interpreting',
      type: 'Video',
      status: 'Completed',
      title: 'Asylum Interview Prep',
      description: 'Video session preparing client for substantive interview.',
      date: '2024-10-15',
      time: '10:00 AM',
      finishTime: '12:00 PM',
      duration: '2h 00m',
      location: 'Remote',
      languagePair: 'English <> Swahili',
      rate: '£30/hr',
      isUrgent: false,
      hourlyRate: 30,
      completedAt: '2024-10-15T12:05:00',
      completionNotes: 'Session went smoothly. Connection was stable.',
      totalPayout: 60.00,
      rating: 5,
      createdAt: '2024-10-10T10:00:00Z',
      updatedAt: '2024-10-15T14:00:00Z',
      deletedAt: null,
      history: [
          { id: 'h21', type: 'CREATED', date: '2024-10-10T10:00:00Z', actorName: 'Jambo Admin' },
          { id: 'h22', type: 'ASSIGNED', date: '2024-10-11T09:00:00Z', actorName: 'Linah Makembu' },
          { id: 'h23', type: 'SUBMITTED', date: '2024-10-15T12:05:00Z', actorName: 'Linah Makembu', description: 'Session went smoothly.' },
          { id: 'h24', type: 'APPROVED', date: '2024-10-15T14:00:00Z', actorName: 'Jambo Admin', description: 'Verified duration' }
      ]
    },

    // Links to Invoice #INV-2024-002 (£240 part)
    {
      id: 'JL-3002',
      linguistId: MOCK_USER_ID,
      postedBy: ADMIN_ID,
      category: 'Transcription',
      type: 'Audio/Video',
      status: 'Completed',
      title: 'Focus Group Recording',
      description: 'Market research focus group transcription.',
      date: '2024-10-10',
      duration: '60 mins audio',
      location: 'Remote',
      languagePair: 'Swahili > English',
      rate: '£4.00/min',
      minuteRate: 4.00,
      isUrgent: false,
      completedAt: '2024-10-11T09:00:00',
      completionNotes: 'Delivered .docx file via portal.',
      totalPayout: 240.00,
      rating: 5,
      createdAt: '2024-10-05T10:00:00Z',
      updatedAt: '2024-10-11T11:00:00Z',
      deletedAt: null,
      history: [
          { id: 'h25', type: 'CREATED', date: '2024-10-05T10:00:00Z', actorName: 'Jambo Admin' },
          { id: 'h26', type: 'ASSIGNED', date: '2024-10-06T09:00:00Z', actorName: 'Linah Makembu' },
          { id: 'h27', type: 'SUBMITTED', date: '2024-10-11T09:00:00Z', actorName: 'Linah Makembu', description: 'File uploaded.', attachment: 'Focus_Group_Transcript.docx' },
          { id: 'h28', type: 'APPROVED', date: '2024-10-11T11:00:00Z', actorName: 'Jambo Admin' }
      ]
    },

    {
      id: 'JL-3003',
      linguistId: MOCK_USER_ID,
      postedBy: ADMIN_ID,
      category: 'Interpreting',
      type: 'Face-to-Face',
      status: 'Cancelled',
      title: 'Community Center Visit',
      description: 'Cancelled by client 24h in advance.',
      date: '2024-10-05',
      time: '01:00 PM',
      finishTime: '02:30 PM',
      duration: '1h 30m',
      location: 'Leeds City Center',
      languagePair: 'English <> Swahili',
      rate: '£25/hr',
      isUrgent: false,
      distance: 1.2,
      hourlyRate: 25,
      mileageRate: 0.45,
      travelHours: 0.5,
      travelRate: 15,
      createdAt: '2024-10-01T10:00:00Z',
      updatedAt: '2024-10-04T10:00:00Z',
      deletedAt: null,
      history: [
          { id: 'h29', type: 'CREATED', date: '2024-10-01T10:00:00Z', actorName: 'Jambo Admin' },
          { id: 'h30', type: 'ASSIGNED', date: '2024-10-02T09:00:00Z', actorName: 'Linah Makembu' },
          { id: 'h31', type: 'CANCELLED', date: '2024-10-04T10:00:00Z', actorName: 'Jambo Admin', description: 'Client cancelled meeting.' }
      ]
    },

    // Links to Invoice #INV-2024-003 (£35 part - PENDING)
    {
      id: 'JL-3004',
      linguistId: MOCK_USER_ID,
      postedBy: ADMIN_ID,
      category: 'Translation',
      type: 'Document',
      status: 'Pending Approval',
      title: 'Birth Certificate Translation',
      description: 'Certified translation of a Tanzanian birth certificate.',
      date: '2025-10-20',
      duration: '1 hour',
      wordCount: 200,
      location: 'Remote',
      languagePair: 'Swahili > English',
      rate: '£35 (Fixed)',
      fixedRate: 35,
      isUrgent: false,
      completedAt: '2025-10-20T14:30:00',
      completionNotes: 'Uploaded certified PDF.',
      completionFile: 'Certified_Translation_JL3004.pdf',
      totalPayout: 35.00,
      createdAt: '2025-10-18T10:00:00Z',
      updatedAt: '2025-10-20T14:30:00Z',
      deletedAt: null,
      attachments: [{
          name: 'Birth_Certificate_Tanzania_Scan.pdf',
          type: 'file',
          url: '#'
      }],
      history: [
          { id: 'h32', type: 'CREATED', date: '2025-10-18T10:00:00Z', actorName: 'Jambo Admin' },
          { id: 'h33', type: 'ASSIGNED', date: '2025-10-18T11:00:00Z', actorName: 'Linah Makembu' },
          { id: 'h34', type: 'SUBMITTED', date: '2025-10-20T14:30:00Z', actorName: 'Linah Makembu', description: 'Uploaded certified PDF.', attachment: 'Certified_Translation_JL3004.pdf' }
      ]
    }
];
