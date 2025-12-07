import { LoginHistoryEntry } from '../types';

export const initialLoginHistory: LoginHistoryEntry[] = [
    {
        id: 'lh-1',
        userId: 'u-123456',
        timestamp: '2025-10-24T09:00:00Z',
        ipAddress: '81.2.69.142',
        source: 'direct',
    },
    {
        id: 'lh-2',
        userId: 'u-123456',
        timestamp: '2025-10-22T14:30:00Z',
        ipAddress: '192.168.1.10',
        source: 'impersonation',
        impersonatorId: 'u-admin-001'
    }
];