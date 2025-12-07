
import { User } from '../types';

/**
 * SQL Table: users
 */
export const initialUsers: User[] = [
    {
        id: 'u-123456',
        email: 'linah@jambolinguists.com',
        password: 'password', // Demo password
        firstName: 'Linah',
        lastName: 'Makembu',
        phone: '+44 7938 065 717',
        location: 'Leeds, UK',
        headline: 'Professional Swahili Interpreter & Translator',
        role: 'linguist',
        avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400',
        headerUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=1200', 
        isVerified: true,
        isSuspended: false,
        qualifications: ['DPSI', 'CIOL Member'],
        languages: ['English', 'Swahili'],
        bankDetails: {
            bankName: 'Barclays',
            accountNumber: '•••• •••• •••• 4289',
            sortCode: '20-00-00'
        },
        createdAt: '2024-01-15T09:00:00Z',
        updatedAt: '2024-10-20T14:30:00Z',
        deletedAt: null,
        notificationPreferences: {
            emailUpdates: true,
            jobAlerts: true,
            courseReminders: true,
            marketing: false
        }
    },
    {
        id: 'u-admin-001',
        email: 'admin@jambolinguists.com',
        password: 'admin', // Demo password
        firstName: 'Jambo',
        lastName: 'Admin',
        location: 'HQ, Pudsey',
        headline: 'System Administrator',
        role: 'admin',
        avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400',
        headerUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200', 
        isVerified: true,
        isSuspended: false,
        createdAt: '2023-11-01T09:00:00Z',
        updatedAt: '2023-11-01T09:00:00Z',
        deletedAt: null,
        notificationPreferences: {
            emailUpdates: true,
            jobAlerts: false,
            courseReminders: false,
            marketing: false
        }
    },
    {
        id: 'u-suspended-001',
        email: 'blocked@example.com',
        password: 'password',
        firstName: 'Sarah',
        lastName: 'Connor',
        location: 'London, UK',
        headline: 'Swahili Translator',
        role: 'linguist',
        avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400',
        headerUrl: 'https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&q=80&w=1200', 
        isVerified: true,
        isSuspended: true, 
        languages: ['English', 'Swahili'],
        createdAt: '2024-05-10T12:00:00Z',
        updatedAt: '2024-09-15T10:00:00Z',
        deletedAt: null,
        notificationPreferences: {
            emailUpdates: false,
            jobAlerts: false,
            courseReminders: false,
            marketing: false
        }
    },
    {
        id: 'u-pending-001',
        email: 'newbie@example.com',
        password: 'password',
        firstName: 'John',
        lastName: 'Doe',
        location: 'Manchester, UK',
        headline: 'Aspiring Interpreter',
        role: 'linguist',
        avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
        headerUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1200', 
        isVerified: false, 
        isSuspended: false,
        languages: ['English', 'French'],
        createdAt: '2025-10-25T09:00:00Z',
        updatedAt: '2025-10-25T09:00:00Z',
        deletedAt: null,
        notificationPreferences: {
            emailUpdates: true,
            jobAlerts: true,
            courseReminders: true,
            marketing: true
        }
    },
    {
        id: 'u-client-001',
        email: 'contact@nhs.uk',
        password: 'password',
        firstName: 'NHS',
        lastName: 'Trust',
        location: 'Leeds Teaching Hospitals',
        headline: 'Booking Coordinator',
        role: 'client',
        avatarUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=400',
        headerUrl: 'https://images.unsplash.com/photo-1538108149393-fbbd8189718c?auto=format&fit=crop&q=80&w=1200', 
        isVerified: true,
        isSuspended: false,
        createdAt: '2024-03-15T09:00:00Z',
        updatedAt: '2024-03-15T09:00:00Z',
        deletedAt: null,
        notificationPreferences: {
            emailUpdates: true,
            jobAlerts: true,
            courseReminders: false,
            marketing: false
        }
    }
];