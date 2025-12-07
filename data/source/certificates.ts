
import { Certificate } from '../types';

export const initialCertificates: Certificate[] = [
    {
        id: 'cert-initial-1',
        userId: 'u-123456', // Linah
        courseId: 'c-103',  // GDPR
        issueDate: '2024-09-15T11:30:00Z',
        status: 'Active',
        verificationCode: 'a1b2-c3d4-e5f6-g7h8',
        createdAt: '2024-09-15T11:30:00Z',
        updatedAt: '2024-09-15T11:30:00Z',
        deletedAt: null
    }
];
