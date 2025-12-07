
import React, { useState, useEffect } from 'react';
import { BlogPost } from '../../../data/types';
import { mockDb } from '../../../data/mockDatabase';
import { Plus, Search, Edit2, Trash2, Eye, Calendar } from 'lucide-react';
import { Button } from '../../ui/Button';
import { Input } from '../../ui/Input';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../../ui/Table';
import { Badge } from '../../ui/Badge';
import { BlogEditor } from './BlogEditor';

interface AdminBlogManagerProps {
    actionRequest?: string | null;
    onActionComplete?: () => void;
}

export const AdminBlogManager = ({ actionRequest, onActionComplete }: AdminBlogManagerProps) => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);

  const refreshData = () => {
      setPosts(mockDb.getAllBlogs(true)); // Include drafts
  };

  useEffect(() => {
      refreshData();
  }, []);

  // Handle external triggers (e.g. from FAB)
  useEffect(() => {
      if (actionRequest === 'create-post') {
          handleCreate();
          if (onActionComplete) onActionComplete();
      }
  }, [actionRequest, onActionComplete]);

  const handleDelete = (id: string, e?: React.MouseEvent) => {
      e?.stopPropagation();
      e?.preventDefault();
      if (confirm('Are you sure you want to delete this post?')) {
          mockDb.deleteBlog(id);
          refreshData();
      }
  };

  const handleEdit = (post: BlogPost, e?: React.MouseEvent) => {
      e?.stopPropagation();
      // e.preventDefault(); // Don't prevent default on main card click to allow natural behavior unless button
      setSelectedPost(post);
      setIsEditorOpen(true);
  };

  const handleCreate = () => {
      setSelectedPost(null);
      setIsEditorOpen(true);
  };

  const handleViewLive = (slug: string, e?: React.MouseEvent) => {
      e?.stopPropagation();
      e?.preventDefault();
      window.open(`/blog?slug=${slug}`, '_blank');
  };

  const filteredPosts = posts.filter(p => 
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      p.slug.includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-20">
        <div className="flex flex-col md:flex-row justify-between gap-4">
            <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Blog Manager</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">Create, edit, and publish content.</p>
            </div>
            <div className="hidden md:block">
                <Button onClick={handleCreate} leftIcon={<Plus size={18} />}>
                    Create Post
                </Button>
            </div>
        </div>

        <div className="bg-white dark:bg-[#13111c] rounded-xl shadow-sm border border-gray-200 dark:border-white/5 overflow-hidden">
            <div className="p-4 border-b border-gray-100 dark:border-white/5">
                <div className="w-full md:max-w-sm">
                    <Input 
                        leftIcon={<Search size={16}/>}
                        placeholder="Search posts..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {/* Mobile View */}
            <div className="md:hidden divide-y divide-gray-100 dark:divide-white/5">
                {filteredPosts.length === 0 ? (
                    <div className="p-8 text-center text-gray-500 text-sm">No posts found.</div>
                ) : (
                    filteredPosts.map(post => {
                        const author = mockDb.getAllUsers().find(u => u.id === post.authorId);
                        return (
                            <div key={post.id} className="p-4 flex flex-col gap-4 active:bg-gray-50 dark:active:bg-white/5 transition-colors" onClick={() => handleEdit(post)}>
                                <div className="flex items-start justify-between">
                                    <div className="flex items-center gap-3 overflow-hidden">
                                        <div className="w-14 h-14 rounded-lg bg-gray-100 dark:bg-white/5 overflow-hidden shrink-0">
                                            <img src={post.coverImage} className="w-full h-full object-cover" alt="Cover" />
                                        </div>
                                        <div className="min-w-0">
                                            <h4 className="font-bold text-gray-900 dark:text-white text-sm truncate leading-tight mb-1">{post.title}</h4>
                                            <p className="text-xs text-gray-500 font-mono truncate">{post.slug}</p>
                                        </div>
                                    </div>
                                    <Badge variant={post.status === 'published' ? 'success' : 'neutral'} className="shrink-0">
                                        {post.status}
                                    </Badge>
                                </div>
                                
                                <div className="flex items-center justify-between text-xs text-gray-500">
                                    <div className="flex items-center gap-2">
                                        <span>{author ? `${author.firstName} ${author.lastName}` : 'Unknown'}</span>
                                        <span>•</span>
                                        <span>{new Date(post.updatedAt).toLocaleDateString()}</span>
                                    </div>
                                </div>

                                <div className="grid grid-cols-3 gap-3 pt-2">
                                    <button 
                                        onClick={(e) => handleViewLive(post.slug, e)}
                                        className="py-3 px-3 bg-gray-50 dark:bg-white/5 text-gray-700 dark:text-gray-200 rounded-lg text-sm font-bold flex items-center justify-center gap-2 hover:bg-gray-100 dark:hover:bg-white/10 active:scale-95 transition-all"
                                    >
                                        <Eye size={18} /> View
                                    </button>
                                    <button 
                                        onClick={(e) => handleEdit(post, e)}
                                        className="py-3 px-3 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-lg text-sm font-bold flex items-center justify-center gap-2 hover:bg-blue-100 dark:hover:bg-blue-900/30 active:scale-95 transition-all"
                                    >
                                        <Edit2 size={18} /> Edit
                                    </button>
                                    <button 
                                        onClick={(e) => handleDelete(post.id, e)}
                                        className="py-3 px-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg text-sm font-bold flex items-center justify-center gap-2 hover:bg-red-100 dark:hover:bg-red-900/30 active:scale-95 transition-all"
                                    >
                                        <Trash2 size={18} /> Delete
                                    </button>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>

            {/* Desktop View */}
            <div className="hidden md:block">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Post Title</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Author</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead align="right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredPosts.length === 0 ? (
                            <TableRow>
                                <TableCell className="text-center py-8 text-gray-500" >No posts found.</TableCell>
                                <TableCell />
                                <TableCell />
                                <TableCell />
                                <TableCell />
                            </TableRow>
                        ) : (
                            filteredPosts.map(post => {
                                const author = mockDb.getAllUsers().find(u => u.id === post.authorId);
                                return (
                                    <TableRow key={post.id} onClick={(e) => handleEdit(post, e)}>
                                        <TableCell>
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-white/5 overflow-hidden shrink-0">
                                                    <img src={post.coverImage} className="w-full h-full object-cover" alt="Cover" />
                                                </div>
                                                <div className="min-w-0">
                                                    <p className="font-bold text-gray-900 dark:text-white truncate max-w-[200px] md:max-w-xs" title={post.title}>{post.title}</p>
                                                    <p className="text-xs text-gray-500 font-mono truncate">{post.slug}</p>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant={post.status === 'published' ? 'success' : 'neutral'}>
                                                {post.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            <span className="text-sm text-gray-600 dark:text-gray-300">{author ? `${author.firstName} ${author.lastName}` : 'Unknown'}</span>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-1 text-xs text-gray-500">
                                                <Calendar size={12} />
                                                {new Date(post.updatedAt).toLocaleDateString()}
                                            </div>
                                        </TableCell>
                                        <TableCell align="right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button 
                                                    onClick={(e) => handleViewLive(post.slug, e)}
                                                    className="p-2 text-gray-400 hover:text-jambo-600 dark:hover:text-white transition-colors"
                                                    title="View Live"
                                                >
                                                    <Eye size={16} />
                                                </button>
                                                <button 
                                                    onClick={(e) => handleEdit(post, e)}
                                                    className="p-2 text-gray-400 hover:text-blue-500 transition-colors"
                                                    title="Edit"
                                                >
                                                    <Edit2 size={16} />
                                                </button>
                                                <button 
                                                    onClick={(e) => handleDelete(post.id, e)}
                                                    className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                                                    title="Delete"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                );
                            })
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>

        {isEditorOpen && (
            <BlogEditor 
                post={selectedPost} 
                onClose={() => setIsEditorOpen(false)} 
                onSave={refreshData}
            />
        )}
    </div>
  );
};
