
import { Invoice } from '../types';

export const initialInvoices: Invoice[] = [
    {
        id: 'inv-001',
        userId: 'u-123456',
        reference: 'INV-2024-001',
        date: '2024-09-30',
        dueDate: '2024-10-14',
        amount: 850.00,
        status: 'Paid',
        items: [
            { description: 'Translation: Employee Handbook', amount: 850.00, jobId: 'JL-3006' }
        ],
        createdAt: '2024-09-30T09:00:00Z',
        updatedAt: '2024-10-02T10:00:00Z',
        deletedAt: null
    },
    {
        id: 'inv-002',
        userId: 'u-123456',
        reference: 'INV-2024-002',
        date: '2024-10-16', // Date after jobs JL-3001 and JL-3002 completed (Oct 10-15)
        dueDate: '2024-10-30',
        amount: 300.00,
        status: 'Paid',
        items: [
            { description: 'Interpreting: Asylum Interview Prep', amount: 60.00, jobId: 'JL-3001' },
            { description: 'Transcription: Focus Group', amount: 240.00, jobId: 'JL-3002' }
        ],
        createdAt: '2024-10-16T09:00:00Z',
        updatedAt: '2024-10-18T11:00:00Z',
        deletedAt: null
    },
    {
        id: 'inv-003',
        userId: 'u-123456',
        reference: 'INV-2024-003',
        date: '2025-10-21', // Future invoice for the Pending job
        dueDate: '2025-11-04',
        amount: 35.00,
        status: 'Pending',
        items: [
             { description: 'Translation: Birth Certificate', amount: 35.00, jobId: 'JL-3004' }
        ],
        createdAt: '2025-10-21T09:00:00Z',
        updatedAt: '2025-10-21T09:00:00Z',
        deletedAt: null
    }
];
