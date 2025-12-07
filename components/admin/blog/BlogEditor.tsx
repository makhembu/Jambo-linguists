
import React, { useState, useEffect } from 'react';
import { BlogPost, SeoConfig } from '@/data/types';
import { mockDb } from '@/data/mockDatabase';
import { Save, X, Image as ImageIcon, Sparkles, PenTool, Search } from 'lucide-react';
import { Button } from '../../ui/Button';
import { Modal } from '../../ui/Modal';
import { ImageUploadField } from '../users/add-user/ImageUploadField';
import { SeoPanel } from './SeoPanel';
import { AiAnalysisPanel } from './AiAnalysisPanel';
import { ContentAnalysis } from '@/data/services/AiWritingService';

interface BlogEditorProps {
  post: BlogPost | null;
  onClose: () => void;
  onSave: () => void;
}

export const BlogEditor = ({ post, onClose, onSave }: BlogEditorProps) => {
  const [activeTab, setActiveTab] = useState<'content' | 'seo'>('content');
  const [formData, setFormData] = useState<Partial<BlogPost>>({
      title: '',
      slug: '',
      excerpt: '',
      content: '',
      coverImage: '',
      tags: [],
      status: 'draft',
      seo: {
          noIndex: false,
          keywords: []
      }
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState<ContentAnalysis | null>(null);
  
  const [tagInput, setTagInput] = useState('');
  
  // Image handling
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
      if (post) {
          setFormData({ ...post, seo: post.seo || { noIndex: false, keywords: [] } });
          setPreviewUrl(post.coverImage);
      }
  }, [post]);

  // Auto-generate slug
  useEffect(() => {
      if (!post && formData.title) {
          const slug = formData.title
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, '-')
              .replace(/(^-|-$)+/g, '');
          setFormData(prev => ({ ...prev, slug }));
      }
  }, [formData.title, post]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleTagKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ',') {
          e.preventDefault();
          const newTag = tagInput.trim();
          if (newTag && !formData.tags?.includes(newTag)) {
              setFormData(prev => ({ ...prev, tags: [...(prev.tags || []), newTag] }));
          }
          setTagInput('');
      }
  };

  const removeTag = (tagToRemove: string) => {
      setFormData(prev => ({ ...prev, tags: prev.tags?.filter(t => t !== tagToRemove) }));
  };

  const handleImageChange = (file: File) => {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      setFormData(prev => ({ ...prev, coverImage: url })); 
  };

  const handleSeoChange = (seo: SeoConfig) => {
      setFormData(prev => ({ ...prev, seo }));
  };

  const handleAiAnalyze = async () => {
      if (!formData.content) return;
      setIsAiLoading(true);
      const analysis = await mockDb.ai.analyzeContent(formData.content);
      setAiAnalysis(analysis);
      setIsAiLoading(false);
  };

  const handleAiSeoGen = async () => {
      if (!formData.content || !formData.title) return;
      setIsAiLoading(true);
      const seoData = await mockDb.ai.generateSeoData(formData.content, formData.title);
      setFormData(prev => ({
          ...prev,
          seo: { ...prev.seo, ...seoData }
      }));
      setIsAiLoading(false);
      setActiveTab('seo'); // Switch to SEO tab to show result
  };

  const handleSubmit = () => {
      if (!formData.title || !formData.content) {
          alert('Title and Content are required.');
          return;
      }

      setIsLoading(true);
      setTimeout(() => {
          if (post) {
              mockDb.updateBlog(post.id, formData);
          } else {
              mockDb.createBlog(formData);
          }
          setIsLoading(false);
          onSave();
          onClose();
      }, 800);
  };

  return (
    <Modal isOpen={true} onClose={onClose} size="full" className="h-full lg:h-[95vh]">
        <div className="flex flex-col h-full bg-white dark:bg-[#1a1625]">
            {/* Header */}
            <div className="p-4 border-b border-gray-100 dark:border-white/5 flex flex-col sm:flex-row justify-between items-start sm:items-center bg-gray-50/50 dark:bg-white/5 gap-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full sm:w-auto">
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white shrink-0">
                        {post ? 'Edit Post' : 'New Post'}
                    </h2>
                    <div className="flex bg-gray-200 dark:bg-white/10 p-1 rounded-lg w-full sm:w-auto">
                        <button 
                            onClick={() => setActiveTab('content')}
                            className={`flex-1 sm:flex-none px-4 py-1.5 rounded-md text-xs font-bold transition-all flex items-center justify-center gap-2 ${activeTab === 'content' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                        >
                            <PenTool size={14} /> Content
                        </button>
                        <button 
                            onClick={() => setActiveTab('seo')}
                            className={`flex-1 sm:flex-none px-4 py-1.5 rounded-md text-xs font-bold transition-all flex items-center justify-center gap-2 ${activeTab === 'seo' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                        >
                            <Search size={14} /> SEO
                        </button>
                    </div>
                </div>
                <div className="flex gap-2 w-full sm:w-auto justify-end">
                    <Button variant="ghost" onClick={onClose} className="p-2"><X size={20} /></Button>
                    <Button variant="primary" onClick={handleSubmit} isLoading={isLoading} className="text-xs px-4">
                        <Save size={16} /> Save
                    </Button>
                </div>
            </div>

            {/* Body */}
            <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
                {/* Main Edit Area */}
                <div className="flex-1 overflow-y-auto custom-scrollbar p-4 lg:p-6 lg:border-r border-gray-100 dark:border-white/5">
                    {activeTab === 'content' ? (
                        <div className="max-w-4xl mx-auto space-y-6">
                            <div>
                                <input 
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    className="w-full text-3xl lg:text-4xl font-serif font-bold text-gray-900 dark:text-white bg-transparent border-none focus:ring-0 placeholder:text-gray-300"
                                    placeholder="Enter Post Title..."
                                />
                            </div>
                            <div className="h-full min-h-[400px]">
                                <textarea 
                                    name="content"
                                    value={formData.content}
                                    onChange={handleChange}
                                    className="w-full h-full min-h-[400px] lg:h-[600px] bg-transparent border-none resize-none text-base lg:text-lg leading-relaxed text-gray-800 dark:text-gray-200 focus:ring-0 placeholder:text-gray-300 font-mono"
                                    placeholder="Start writing your story... (Markdown supported)"
                                />
                            </div>
                        </div>
                    ) : (
                        <div className="max-w-2xl mx-auto">
                            <SeoPanel 
                                seoData={formData.seo!} 
                                onChange={handleSeoChange} 
                            />
                        </div>
                    )}
                </div>

                {/* Right Sidebar (Settings & AI) */}
                <div className="w-full lg:w-80 bg-gray-50/50 dark:bg-black/10 overflow-y-auto custom-scrollbar p-4 space-y-6 border-t lg:border-t-0 lg:border-l border-gray-100 dark:border-white/5 shrink-0 h-[40vh] lg:h-auto">
                    
                    {activeTab === 'content' && (
                        <AiAnalysisPanel 
                            analysis={aiAnalysis} 
                            isLoading={isAiLoading}
                            onAnalyze={handleAiAnalyze}
                            onGenerateSeo={handleAiSeoGen}
                        />
                    )}

                    <div className="space-y-4">
                        <h4 className="text-xs font-bold uppercase text-gray-400">Settings</h4>
                        
                        <div className="bg-white dark:bg-white/5 p-3 rounded-lg border border-gray-200 dark:border-white/10">
                            <label className="block text-xs font-bold uppercase text-gray-500 mb-2">Slug</label>
                            <input 
                                name="slug"
                                value={formData.slug}
                                onChange={handleChange}
                                className="w-full bg-transparent text-sm font-mono text-gray-600 dark:text-gray-300 focus:outline-none"
                            />
                        </div>

                        <div className="bg-white dark:bg-white/5 p-3 rounded-lg border border-gray-200 dark:border-white/10">
                            <label className="block text-xs font-bold uppercase text-gray-500 mb-2">Publish Status</label>
                            <select 
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                                className="w-full bg-transparent text-sm focus:outline-none"
                            >
                                <option value="draft">Draft</option>
                                <option value="published">Published</option>
                            </select>
                        </div>

                        <div className="bg-white dark:bg-white/5 p-3 rounded-lg border border-gray-200 dark:border-white/10">
                            <label className="block text-xs font-bold uppercase text-gray-500 mb-2">Featured Image</label>
                            <ImageUploadField 
                                label=""
                                icon={<ImageIcon size={20} />}
                                previewUrl={previewUrl}
                                onFileChange={handleImageChange}
                            />
                        </div>

                        <div className="bg-white dark:bg-white/5 p-3 rounded-lg border border-gray-200 dark:border-white/10">
                            <label className="block text-xs font-bold uppercase text-gray-500 mb-2">Excerpt</label>
                            <textarea 
                                name="excerpt"
                                value={formData.excerpt}
                                onChange={handleChange}
                                rows={3}
                                className="w-full bg-transparent text-sm resize-none focus:outline-none"
                                placeholder="Short summary..."
                            />
                        </div>

                        <div className="bg-white dark:bg-white/5 p-3 rounded-lg border border-gray-200 dark:border-white/10">
                            <label className="block text-xs font-bold uppercase text-gray-500 mb-2">Tags</label>
                            <div className="flex flex-wrap gap-2 mb-2">
                                {formData.tags?.map(tag => (
                                    <span key={tag} className="bg-gray-100 dark:bg-white/10 px-2 py-1 rounded text-xs flex items-center gap-1">
                                        {tag}
                                        <button onClick={() => removeTag(tag)} className="hover:text-red-500"><X size={10}/></button>
                                    </span>
                                ))}
                            </div>
                            <input 
                                value={tagInput}
                                onChange={(e) => setTagInput(e.target.value)}
                                onKeyDown={handleTagKeyDown}
                                className="w-full bg-transparent text-sm outline-none"
                                placeholder="Add tag..."
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </Modal>
  );
};
