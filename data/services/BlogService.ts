
import { db } from '../store';
import { BlogPost } from '../types';

export class BlogService {
    
    getAllBlogs(includeDrafts = false): BlogPost[] {
        let posts = db.blogPosts.filter(p => !p.deletedAt);
        if (!includeDrafts) {
            posts = posts.filter(p => p.status === 'published');
        }
        // Sort by published date descending
        return posts.sort((a, b) => {
            const dateA = a.publishedAt ? new Date(a.publishedAt).getTime() : new Date(a.createdAt).getTime();
            const dateB = b.publishedAt ? new Date(b.publishedAt).getTime() : new Date(b.createdAt).getTime();
            return dateB - dateA;
        });
    }

    getBlogBySlug(slug: string): BlogPost | undefined {
        return db.blogPosts.find(p => p.slug === slug && !p.deletedAt);
    }

    createBlog(data: Partial<BlogPost>): BlogPost {
        const now = new Date().toISOString();
        const currentUser = db.users.find(u => u.id === db.currentUserId);
        
        const newPost: BlogPost = {
            id: db.generateId('blog'),
            title: data.title || 'Untitled Post',
            slug: data.slug || `post-${Date.now()}`,
            excerpt: data.excerpt || '',
            content: data.content || '',
            coverImage: data.coverImage || 'https://images.unsplash.com/photo-1499750310159-525446b095ef?auto=format&fit=crop&q=80&w=1200',
            tags: data.tags || [],
            authorId: currentUser?.id || 'unknown',
            status: data.status || 'draft',
            publishedAt: data.status === 'published' ? now : undefined,
            createdAt: now,
            updatedAt: now,
            deletedAt: null
        };

        db.blogPosts.unshift(newPost);
        return newPost;
    }

    updateBlog(id: string, updates: Partial<BlogPost>): BlogPost | null {
        const idx = db.blogPosts.findIndex(p => p.id === id);
        if (idx !== -1) {
            const current = db.blogPosts[idx];
            const now = new Date().toISOString();
            
            // Handle publishing logic
            let publishedAt = current.publishedAt;
            if (updates.status === 'published' && !current.publishedAt) {
                publishedAt = now;
            }

            db.blogPosts[idx] = {
                ...current,
                ...updates,
                publishedAt,
                updatedAt: now
            };
            return db.blogPosts[idx];
        }
        return null;
    }

    deleteBlog(id: string) {
        const idx = db.blogPosts.findIndex(p => p.id === id);
        if (idx !== -1) {
            db.blogPosts[idx].deletedAt = new Date().toISOString();
        }
    }

    searchBlogs(query: string): BlogPost[] {
        const term = query.toLowerCase();
        return this.getAllBlogs(false).filter(p => 
            p.title.toLowerCase().includes(term) || 
            p.excerpt.toLowerCase().includes(term) ||
            p.tags.some(t => t.toLowerCase().includes(term))
        );
    }
}
