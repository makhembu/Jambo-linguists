
import React from 'react';
import { Calendar, User } from 'lucide-react';
import { BlogPost, User as UserType } from '@/data/types';
import { mockDb } from '@/data/mockDatabase';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';

export interface BlogCardProps {
  post: BlogPost;
  onClick: (slug: string) => void;
}

export const BlogCard: React.FC<BlogCardProps> = ({ post, onClick }) => {
  const author = mockDb.getAllUsers().find(u => u.id === post.authorId);
  
  return (
    <Card 
      onClick={() => onClick(post.slug)}
      className="flex flex-col h-full overflow-hidden group cursor-pointer hover:border-jambo-400 dark:hover:border-jambo-600 transition-colors"
      hoverEffect={true}
    >
      <div className="relative h-56 overflow-hidden bg-gray-100 dark:bg-white/5">
        <img 
            src={post.coverImage} 
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60"></div>
        <div className="absolute top-4 left-4 flex flex-wrap gap-2">
            {post.tags.slice(0, 2).map(tag => (
                <span key={tag} className="text-[10px] font-bold uppercase tracking-widest text-white bg-black/40 backdrop-blur-md px-2 py-1 rounded border border-white/20">
                    {tag}
                </span>
            ))}
        </div>
      </div>

      <div className="p-6 flex-1 flex flex-col">
         <h3 className="font-serif font-bold text-xl text-gray-900 dark:text-white mb-3 leading-tight group-hover:text-jambo-600 dark:group-hover:text-jambo-400 transition-colors line-clamp-2">
            {post.title}
         </h3>
         
         <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3 mb-6 flex-grow font-light leading-relaxed">
             {post.excerpt}
         </p>

         <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-white/5 text-xs text-gray-500 dark:text-gray-400">
             <div className="flex items-center gap-2">
                 <div className="w-6 h-6 rounded-full bg-jambo-100 flex items-center justify-center overflow-hidden">
                     {author?.avatarUrl ? <img src={author.avatarUrl} className="w-full h-full object-cover"/> : <User size={14} />}
                 </div>
                 <span className="font-medium">{author ? `${author.firstName} ${author.lastName}` : 'Jambo Team'}</span>
             </div>
             <div className="flex items-center gap-1.5">
                 <Calendar size={12} />
                 <span>{new Date(post.publishedAt || post.createdAt).toLocaleDateString()}</span>
             </div>
         </div>
      </div>
    </Card>
  );
};
