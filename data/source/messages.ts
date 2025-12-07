
import { Message } from '../types';

const LINGUIST_ID = 'u-123456';
const ADMIN_ID = 'u-admin-001';
const CLIENT_ID = 'u-client-001';

const createMsg = (id: string, senderId: string, recipientId: string, content: string, timeOffsetMinutes: number, jobId?: string, isRead = true): Message => ({
    id,
    senderId,
    recipientId,
    content,
    jobId,
    isRead,
    readAt: isRead ? new Date(Date.now() - (timeOffsetMinutes - 5) * 60000).toISOString() : null,
    createdAt: new Date(Date.now() - timeOffsetMinutes * 60000).toISOString(),
    updatedAt: new Date(Date.now() - timeOffsetMinutes * 60000).toISOString(),
    deletedAt: null
});

export const initialMessages: Message[] = [
    // Thread 1: Job JL-2003 (Revision) - Admin <-> Linguist
    createMsg('m1', ADMIN_ID, LINGUIST_ID, "Hi Linah, could you please review the feedback on the marketing flyer?", 1440, 'JL-2003'),
    createMsg('m2', LINGUIST_ID, ADMIN_ID, "Sure, I see the notes about tone. Working on it now.", 1400, 'JL-2003'),
    createMsg('m3', ADMIN_ID, LINGUIST_ID, "Great, thanks. Client needs it by EOD tomorrow.", 1390, 'JL-2003'),
    createMsg('m4', LINGUIST_ID, ADMIN_ID, "Understood. I will upload the revised version shortly.", 60, 'JL-2003', false), // Unread by admin

    // Thread 2: Job JL-1001 (Open) - Client <-> Linguist
    createMsg('m5', CLIENT_ID, LINGUIST_ID, "Hello, regarding the medical appointment next week, is there parking on site?", 300, 'JL-1001'),
    createMsg('m6', LINGUIST_ID, CLIENT_ID, "Hi, yes there is a multi-story car park at the Clarendon Wing entrance.", 280, 'JL-1001'),
    createMsg('m7', CLIENT_ID, LINGUIST_ID, "Perfect, thank you. See you then.", 10, 'JL-1001', false), // Unread by linguist

    // Thread 3: DM - Admin <-> Linguist
    createMsg('m8', ADMIN_ID, LINGUIST_ID, "Just a reminder to upload your renewed DBS certificate.", 2880),
    createMsg('m9', LINGUIST_ID, ADMIN_ID, "Uploaded it yesterday! Can you check?", 2800),
    createMsg('m10', ADMIN_ID, LINGUIST_ID, "Got it. Verified and approved. Thanks!", 2750),
];
