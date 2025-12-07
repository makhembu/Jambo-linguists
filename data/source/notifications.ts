
import { Notification } from '../types';

const MOCK_USER_ID = 'u-123456';

/**
 * SQL Table: notifications
 */
export const initialNotifications: Notification[] = [
    { 
        id: 'n1', 
        userId: MOCK_USER_ID,
        title: "Invoice #INV-2024-09 Paid", 
        time: "2 hours ago", 
        isRead: false,
        iconType: 'check', 
        color: "text-green-500", 
        bg: "bg-green-50", 
        linkTo: 'jobs-history',
        createdAt: new Date(Date.now() - 7200000).toISOString(),
        updatedAt: new Date(Date.now() - 7200000).toISOString(),
        deletedAt: null
    },
    { 
        id: 'n2', 
        userId: MOCK_USER_ID,
        title: "New Job Available: Legal Interpreting", 
        time: "5 hours ago", 
        isRead: false,
        iconType: 'briefcase', 
        color: "text-brand-orange", 
        bg: "bg-orange-50", 
        linkTo: 'jobs-available',
        createdAt: new Date(Date.now() - 18000000).toISOString(),
        updatedAt: new Date(Date.now() - 18000000).toISOString(),
        deletedAt: null
    },
    { 
        id: 'n3', 
        userId: MOCK_USER_ID,
        title: "DBS Check Verified", 
        time: "1 day ago", 
        isRead: true,
        iconType: 'shield', 
        color: "text-blue-500", 
        bg: "bg-blue-50", 
        linkTo: 'profile',
        createdAt: new Date(Date.now() - 86400000).toISOString(),
        updatedAt: new Date(Date.now() - 86400000).toISOString(),
        deletedAt: null
    },
    { 
        id: 'n4', 
        userId: MOCK_USER_ID,
        title: "New Training Module: GDPR Update", 
        time: "2 days ago", 
        isRead: true,
        iconType: 'grad', 
        color: "text-purple-500", 
        bg: "bg-purple-50", 
        linkTo: 'training',
        createdAt: new Date(Date.now() - 172800000).toISOString(),
        updatedAt: new Date(Date.now() - 172800000).toISOString(),
        deletedAt: null
    },
];
