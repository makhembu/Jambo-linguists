
import { db } from '../store';
import { Message, Conversation } from '../types';
import { NotificationService } from './NotificationService';

export class MessageService {
    private notifications: NotificationService;

    constructor(notificationService: NotificationService) {
        this.notifications = notificationService;
    }

    getAllMessages(): Message[] {
        return db.messages;
    }

    getConversations(userId: string): Conversation[] {
        const userMessages = db.messages.filter(m => m.senderId === userId || m.recipientId === userId && !m.deletedAt);
        
        // Group by Peer + Job Context
        const groups: Record<string, Message[]> = {};
        
        userMessages.forEach(msg => {
            const peerId = msg.senderId === userId ? msg.recipientId : msg.senderId;
            const jobIdKey = msg.jobId || 'dm'; // Group null jobIds together as 'dm'
            const key = `${peerId}_${jobIdKey}`;
            
            if (!groups[key]) groups[key] = [];
            groups[key].push(msg);
        });

        // Convert groups to Conversation objects
        const conversations: Conversation[] = Object.keys(groups).map(key => {
            const msgs = groups[key].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()); // Newest first
            const lastMessage = msgs[0];
            const peerId = lastMessage.senderId === userId ? lastMessage.recipientId : lastMessage.senderId;
            const unreadCount = msgs.filter(m => m.recipientId === userId && !m.isRead).length;
            
            const peer = db.users.find(u => u.id === peerId);
            const job = lastMessage.jobId ? db.jobs.find(j => j.id === lastMessage.jobId) : undefined;

            return {
                peerId,
                jobId: lastMessage.jobId,
                lastMessage,
                unreadCount,
                peer,
                job
            };
        });

        return conversations.sort((a, b) => new Date(b.lastMessage.createdAt).getTime() - new Date(a.lastMessage.createdAt).getTime());
    }

    getThread(userId: string, peerId: string, jobId?: string): Message[] {
        return db.messages
            .filter(m => 
                (m.senderId === userId && m.recipientId === peerId || m.senderId === peerId && m.recipientId === userId) &&
                m.jobId === (jobId || undefined) &&
                !m.deletedAt
            )
            .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()); // Oldest first for chat view
    }

    sendMessage(senderId: string, recipientId: string, content: string, jobId?: string): Message {
        const now = new Date().toISOString();
        const newMessage: Message = {
            id: db.generateId('m'),
            senderId,
            recipientId,
            content,
            jobId,
            isRead: false,
            createdAt: now,
            updatedAt: now,
            deletedAt: null
        };
        db.messages.push(newMessage);
        
        // Notify Recipient (Email)
        const sender = db.users.find(u => u.id === senderId);
        const senderName = sender ? `${sender.firstName} ${sender.lastName}` : 'System';
        
        this.notifications.notifyMessageReceived(recipientId, senderName, content, jobId);
        
        return newMessage;
    }

    markAsRead(userId: string, peerId: string, jobId?: string) {
        let updated = false;
        db.messages.forEach(m => {
            if (m.recipientId === userId && m.senderId === peerId && m.jobId === (jobId || undefined) && !m.isRead) {
                m.isRead = true;
                m.readAt = new Date().toISOString();
                updated = true;
            }
        });
    }

    getGlobalUnreadCount(userId: string): number {
        return db.messages.filter(m => m.recipientId === userId && !m.isRead && !m.deletedAt).length;
    }
}
