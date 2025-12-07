
import React from 'react';
import { BlogPost } from '@/data/types';
import { mockDb } from '@/data/mockDatabase';
import { Calendar, User, ArrowLeft, Share2, Tag, ArrowRight } from 'lucide-react';
import { Button } from '../ui/Button';
import { BlogCard } from './BlogCard';
import { SeoHead } from '../seo/SeoHead';
import { COMPANY_INFO } from '@/data/constants';

interface BlogPostViewProps {
  post: BlogPost;
  onBack: () => void;
  onNavigate: (slug: string) => void;
}

export const BlogPostView = ({ post, onBack, onNavigate }: BlogPostViewProps) => {
  const author = mockDb.getAllUsers().find(u => u.id === post.authorId);
  const relatedPosts = mockDb.getAllBlogs().filter(p => p.id !== post.id).slice(0, 3);

  // Generate Rich Schema for Blog Post
  const articleSchema = {
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.excerpt,
    "image": post.coverImage,
    "author": {
      "@type": "Person",
      "name": author ? `${author.firstName} ${author.lastName}` : "Jambo Linguists Team",
      "url": "https://jambolinguists.com/about"
    },
    "publisher": {
      "@type": "Organization",
      "name": COMPANY_INFO.name,
      "logo": {
        "@type": "ImageObject",
        "url": COMPANY_INFO.logoUrl
      }
    },
    "datePublished": post.publishedAt || post.createdAt,
    "dateModified": post.updatedAt,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://jambolinguists.com/blog/${post.slug}`
    }
  };

  const breadcrumbSchema = {
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://jambolinguists.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Blog",
        "item": "https://jambolinguists.com/blog"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": post.title,
        "item": `https://jambolinguists.com/blog/${post.slug}`
      }
    ]
  };

  // Function to process newlines in content for basic formatting
  const renderContent = (content: string) => {
      return content.split('\n').map((line, idx) => {
          if (line.startsWith('### ')) return <h3 key={idx} className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4 font-serif">{line.replace('### ', '')}</h3>;
          if (line.startsWith('## ')) return <h2 key={idx} className="text-3xl font-bold text-gray-900 dark:text-white mt-10 mb-5 font-serif">{line.replace('## ', '')}</h2>;
          if (line.startsWith('* ')) return <li key={idx} className="ml-6 list-disc text-gray-700 dark:text-gray-300 mb-2">{line.replace('* ', '')}</li>;
          if (line.trim().length === 0) return <br key={idx} />;
          // Simple bold handling
          const boldParts = line.split('**');
          if (boldParts.length > 1) {
              return (
                  <p key={idx} className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                      {boldParts.map((part, i) => (i % 2 === 1 ? <strong key={i} className="font-bold text-gray-900 dark:text-white">{part}</strong> : part))}
                  </p>
              );
          }
          return <p key={idx} className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-4">{line}</p>;
      });
  };

  return (
    <>
      <SeoHead 
        seo={post.seo} 
        title={post.title} 
        description={post.excerpt} 
        type="article"
        image={post.coverImage}
        path={`/blog/${post.slug}`} 
        structuredData={[articleSchema, breadcrumbSchema]}
      />

      <div className="bg-white dark:bg-[#0f0a15] min-h-screen animate-in fade-in duration-500">
        
        {/* Nav */}
        <div className="sticky top-0 z-30 bg-white/80 dark:bg-[#0f0a15]/80 backdrop-blur-md border-b border-gray-100 dark:border-white/5 py-4">
            <div className="max-w-4xl mx-auto px-6 flex justify-between items-center">
                <button 
                    onClick={onBack}
                    className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-jambo-600 dark:hover:text-jambo-400 transition-colors"
                >
                    <ArrowLeft size={18} /> Back to Blog
                </button>
                <div className="flex gap-2">
                    <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/5 text-gray-500 transition-colors" title="Share">
                        <Share2 size={18} />
                    </button>
                </div>
            </div>
        </div>

        <article className="max-w-4xl mx-auto px-6 py-12">
            {/* Header */}
            <div className="text-center mb-10">
                <div className="flex flex-wrap justify-center gap-2 mb-6">
                    {post.tags.map(tag => (
                        <span key={tag} className="bg-jambo-50 dark:bg-jambo-900/20 text-jambo-700 dark:text-jambo-300 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
                            {tag}
                        </span>
                    ))}
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                    {post.title}
                </h1>
                <div className="flex items-center justify-center gap-6 text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-white/10 flex items-center justify-center overflow-hidden">
                            {author?.avatarUrl ? <img src={author.avatarUrl} className="w-full h-full object-cover"/> : <User size={16} />}
                        </div>
                        <span className="font-bold text-gray-900 dark:text-white">{author ? `${author.firstName} ${author.lastName}` : 'Jambo Team'}</span>
                    </div>
                    <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                    <div className="flex items-center gap-2">
                        <Calendar size={16} />
                        <span>{new Date(post.publishedAt || post.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                    </div>
                </div>
            </div>

            {/* Hero Image */}
            <div className="w-full aspect-video rounded-2xl overflow-hidden shadow-2xl mb-12 bg-gray-100 dark:bg-white/5">
                <img 
                    src={post.coverImage} 
                    alt={post.title} 
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Content */}
            <div className="prose prose-lg dark:prose-invert max-w-none mx-auto border-b border-gray-100 dark:border-white/5 pb-12 mb-12">
                {renderContent(post.content)}
            </div>

            {/* Footer */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
                <div>
                    <h4 className="font-bold text-gray-900 dark:text-white mb-2">Tags</h4>
                    <div className="flex flex-wrap gap-2">
                        {post.tags.map(tag => (
                            <div key={tag} className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
                                <Tag size={14} /> {tag}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="flex gap-4">
                    <Button variant="secondary" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                        Read Top
                    </Button>
                </div>
            </div>
        </article>

        {/* Read Next */}
        <section className="bg-gray-50 dark:bg-[#13111c] py-16 px-6 border-t border-gray-100 dark:border-white/5">
            <div className="max-w-7xl mx-auto">
                <h3 className="text-2xl font-serif font-bold text-gray-900 dark:text-white mb-8 flex items-center gap-2">
                    Read Next <ArrowRight size={20} className="text-jambo-600" />
                </h3>
                <div className="grid md:grid-cols-3 gap-8">
                    {relatedPosts.map(p => (
                        <BlogCard key={p.id} post={p} onClick={onNavigate} />
                    ))}
                </div>
            </div>
        </section>
    </div>
    </>
  );
};
