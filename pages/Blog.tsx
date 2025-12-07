'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { BlogHeader } from '../components/blog/BlogHeader';
import { BlogCard } from '../components/blog/BlogCard';
import { BlogPostView } from '../components/blog/BlogPostView';
import { mockDb } from '@/data/mockDatabase';
import { Search } from 'lucide-react';
import { Input } from '../components/ui/Input';
import { SeoHead } from '../components/seo/SeoHead';

interface BlogPageProps {
  initialSlug?: string | null;
}

export const BlogPage = ({ initialSlug }: BlogPageProps) => {
  const router = useRouter();
  const [currentSlug, setCurrentSlug] = useState<string | null>(initialSlug || null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  
  useEffect(() => {
      window.scrollTo(0, 0);
  }, [currentSlug]);

  const allPosts = mockDb.getAllBlogs();

  const allTags = useMemo(() => {
      const tags = new Set<string>();
      allPosts.forEach(p => p.tags.forEach(t => tags.add(t)));
      return Array.from(tags);
  }, [allPosts]);

  const filteredPosts = useMemo(() => {
      return allPosts.filter(post => {
          const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                                post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
          const matchesTag = selectedTag ? post.tags.includes(selectedTag) : true;
          return matchesSearch && matchesTag;
      });
  }, [allPosts, searchTerm, selectedTag]);

  // SINGLE POST VIEW
  if (currentSlug) {
      const post = mockDb.getBlogBySlug(currentSlug);
      if (post) {
          return (
            <BlogPostView 
                post={post} 
                onBack={() => setCurrentSlug(null)} 
                onNavigate={(slug) => setCurrentSlug(slug)} // internal navigation
            />
          );
      }
  }

  const listSchema = {
    "@type": "CollectionPage",
    "name": "Jambo Linguists Blog",
    "description": "Insights, news, and cultural articles about Swahili interpretation and translation.",
    "url": "https://jambolinguists.com/blog",
    "mainEntity": {
        "@type": "ItemList",
        "itemListElement": filteredPosts.map((post, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "url": `https://jambolinguists.com/blog/${post.slug}`,
            "name": post.title
        }))
    }
  };

  return (
    <>
      <SeoHead 
        title="Blog - Swahili Language Insights & Industry News"
        description="Stay updated with Jambo Linguists. Read articles on medical interpreting, legal translation, Swahili dialects, and cultural competence for UK professionals."
        path="/blog"
        structuredData={listSchema}
      />
      <BlogHeader />

      <main className="max-w-7xl mx-auto px-4 md:px-6 py-12">
          {/* Filters */}
          <div className="flex flex-col-reverse lg:flex-row justify-between items-center gap-6 mb-12">
              <div className="flex flex-wrap items-center gap-2 justify-center lg:justify-start w-full lg:w-auto">
                  <button 
                    onClick={() => setSelectedTag(null)}
                    className={`px-4 py-2 rounded-full text-sm font-bold transition-colors ${!selectedTag ? 'bg-jambo-600 text-white shadow-md' : 'bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/20'}`}
                  >
                      All Posts
                  </button>
                  {allTags.map(tag => (
                      <button 
                        key={tag}
                        onClick={() => setSelectedTag(tag)}
                        className={`px-4 py-2 rounded-full text-sm font-bold transition-colors ${selectedTag === tag ? 'bg-jambo-600 text-white shadow-md' : 'bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/20'}`}
                      >
                          {tag}
                      </button>
                  ))}
              </div>

              <div className="w-full lg:w-80">
                  <Input 
                    leftIcon={<Search size={16} />}
                    placeholder="Search articles..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="rounded-full"
                  />
              </div>
          </div>

          {/* Grid */}
          {filteredPosts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                  {filteredPosts.map(post => (
                      <BlogCard key={post.id} post={post} onClick={setCurrentSlug} />
                  ))}
              </div>
          ) : (
              <div className="text-center py-24 border border-dashed border-gray-200 dark:border-white/10 rounded-2xl">
                  <div className="w-16 h-16 bg-gray-100 dark:bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
                      <Search size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No articles found</h3>
                  <p className="text-gray-500 dark:text-gray-400">Try adjusting your search terms or filters.</p>
                  <button 
                    onClick={() => { setSearchTerm(''); setSelectedTag(null); }}
                    className="mt-6 text-jambo-600 dark:text-jambo-400 font-bold hover:underline"
                  >
                      Clear Filters
                  </button>
              </div>
          )}
      </main>
    </>
  );
};
