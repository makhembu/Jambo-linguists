
import { db } from '../store';
import { User } from '../types';

export class AuthService {
    
    // Check if session exists in storage
    init() {
        const storedId = localStorage.getItem('jambo_auth_user');
        if (storedId) {
            const user = db.users.find(u => u.id === storedId && !u.deletedAt && !u.isSuspended);
            if (user) {
                db.currentUserId = user.id;
            } else {
                // Invalid or deleted user in storage
                localStorage.removeItem('jambo_auth_user');
                db.currentUserId = null;
            }
        }
    }

    login(email: string, password?: string): { success: boolean; user?: User; error?: string } {
        const user = db.users.find(u => u.email.toLowerCase() === email.toLowerCase() && !u.deletedAt);
        
        if (!user) {
            return { success: false, error: 'Account not found.' };
        }

        // Check Password (Simulated security - In production use proper hashing like bcrypt)
        if (user.password && user.password !== password) {
            return { success: false, error: 'Invalid credentials.' };
        }

        if (user.isSuspended) {
            return { success: false, error: 'Account has been suspended. Contact support.' };
        }

        // Set Session
        db.currentUserId = user.id;
        localStorage.setItem('jambo_auth_user', user.id);
        
        // Log basic login activity
        db.loginHistory.unshift({
            id: db.generateId('lh'),
            userId: user.id,
            timestamp: new Date().toISOString(),
            ipAddress: '127.0.0.1',
            source: 'direct'
        });

        return { success: true, user };
    }

    register(data: { firstName: string; lastName: string; email: string; phone?: string; password?: string }): { success: boolean; user?: User; error?: string } {
        // Validate inputs
        if (!data.email || !data.password || !data.firstName || !data.lastName) {
            return { success: false, error: 'All fields are required.' };
        }

        // Check if exists
        if (db.users.some(u => u.email.toLowerCase() === data.email.toLowerCase())) {
            return { success: false, error: 'Email already registered.' };
        }

        const now = new Date().toISOString();
        const newUser: User = {
            id: db.generateId('u'),
            email: data.email,
            password: data.password, 
            firstName: data.firstName,
            lastName: data.lastName,
            phone: data.phone,
            location: 'United Kingdom', // Default
            role: 'linguist',
            isVerified: false, // New users need verification
            qualifications: [],
            languages: [], // To be filled in profile
            createdAt: now,
            updatedAt: now,
            deletedAt: null
        };

        db.users.push(newUser);
        
        // Auto-login after register
        db.currentUserId = newUser.id;
        localStorage.setItem('jambo_auth_user', newUser.id);
        
        // Add a welcome notification
        db.notifications.push({
            id: db.generateId('n'),
            userId: newUser.id,
            title: "Welcome to Jambo Portal",
            message: "Please complete your profile to start receiving job offers.",
            time: "Just now",
            isRead: false,
            iconType: 'check',
            bg: 'bg-green-50',
            color: 'text-green-600',
            linkTo: 'profile',
            createdAt: now,
            updatedAt: now,
            deletedAt: null
        });

        return { success: true, user: newUser };
    }

    logout() {
        db.currentUserId = null;
        localStorage.removeItem('jambo_auth_user');
    }

    getCurrentUser(): User | null {
        if (!db.currentUserId) return null;
        return db.users.find(u => u.id === db.currentUserId) || null;
    }

    updateProfile(data: Partial<User>) {
        if (!db.currentUserId) return;
        const idx = db.users.findIndex(u => u.id === db.currentUserId);
        if (idx !== -1) {
            db.users[idx] = { 
                ...db.users[idx], 
                ...data,
                updatedAt: new Date().toISOString()
            };
        }
    }
}
