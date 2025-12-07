
import React from 'react';
import { SeoConfig } from '@/data/types';
import { Globe, Search, Smartphone, Monitor } from 'lucide-react';

interface SeoPanelProps {
    seoData: SeoConfig;
    onChange: (data: SeoConfig) => void;
}

export const SeoPanel = ({ seoData, onChange }: SeoPanelProps) => {
    const [previewMode, setPreviewMode] = React.useState<'mobile' | 'desktop'>('mobile');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        onChange({ ...seoData, [name]: value });
    };

    const handleKeywordsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        onChange({ ...seoData, keywords: val.split(',').map(k => k.trim()) });
    };

    // Limits
    const titleLimit = 60;
    const descLimit = 160;

    return (
        <div className="space-y-8 animate-in fade-in duration-300">
            {/* Live Preview */}
            <div className="bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl p-4">
                <div className="flex justify-between items-center mb-4 border-b border-gray-200 dark:border-white/10 pb-2">
                    <h4 className="font-bold text-gray-700 dark:text-gray-300 flex items-center gap-2 text-sm">
                        <Globe size={16} /> Google Snippet Preview
                    </h4>
                    <div className="flex gap-2">
                        <button 
                            onClick={() => setPreviewMode('mobile')}
                            className={`p-1.5 rounded ${previewMode === 'mobile' ? 'bg-white shadow text-jambo-600' : 'text-gray-400'}`}
                        >
                            <Smartphone size={16} />
                        </button>
                        <button 
                            onClick={() => setPreviewMode('desktop')}
                            className={`p-1.5 rounded ${previewMode === 'desktop' ? 'bg-white shadow text-jambo-600' : 'text-gray-400'}`}
                        >
                            <Monitor size={16} />
                        </button>
                    </div>
                </div>

                <div className={`bg-white p-4 rounded-lg shadow-sm border border-gray-100 max-w-2xl ${previewMode === 'mobile' ? 'max-w-[375px]' : ''}`}>
                    <div className="flex items-center gap-2 mb-1">
                        <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center text-[10px]">JL</div>
                        <div className="flex flex-col text-xs leading-tight">
                            <span className="text-gray-800 font-medium">Jambo Linguists</span>
                            <span className="text-gray-500">jambolinguists.com › blog</span>
                        </div>
                    </div>
                    <h3 className="text-blue-800 text-xl font-medium hover:underline cursor-pointer truncate">
                        {seoData.metaTitle || 'Page Title'}
                    </h3>
                    <p className="text-gray-600 text-sm mt-1 line-clamp-2">
                        {seoData.metaDescription || 'No description provided. Google will generate one automatically from your content.'}
                    </p>
                </div>
            </div>

            {/* Inputs */}
            <div className="space-y-4">
                <div>
                    <div className="flex justify-between mb-1">
                        <label className="text-xs font-bold uppercase text-gray-500">SEO Title</label>
                        <span className={`text-xs ${(seoData.metaTitle?.length || 0) > titleLimit ? 'text-red-500' : 'text-gray-400'}`}>
                            {seoData.metaTitle?.length || 0} / {titleLimit}
                        </span>
                    </div>
                    <input 
                        name="metaTitle"
                        value={seoData.metaTitle || ''}
                        onChange={handleChange}
                        className="w-full bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-4 py-2.5 text-sm dark:text-white focus:ring-2 focus:ring-jambo-600"
                        placeholder="Optimized Title"
                    />
                    <div className="h-1 w-full bg-gray-100 mt-1 rounded-full overflow-hidden">
                        <div 
                            className={`h-full ${ (seoData.metaTitle?.length || 0) > titleLimit ? 'bg-red-500' : 'bg-green-500'}`} 
                            style={{width: `${Math.min(((seoData.metaTitle?.length || 0)/titleLimit)*100, 100)}%`}}
                        ></div>
                    </div>
                </div>

                <div>
                    <div className="flex justify-between mb-1">
                        <label className="text-xs font-bold uppercase text-gray-500">Meta Description</label>
                        <span className={`text-xs ${(seoData.metaDescription?.length || 0) > descLimit ? 'text-red-500' : 'text-gray-400'}`}>
                            {seoData.metaDescription?.length || 0} / {descLimit}
                        </span>
                    </div>
                    <textarea 
                        name="metaDescription"
                        value={seoData.metaDescription || ''}
                        onChange={handleChange}
                        rows={3}
                        className="w-full bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-4 py-2.5 text-sm dark:text-white focus:ring-2 focus:ring-jambo-600 resize-none"
                        placeholder="A concise summary..."
                    />
                </div>

                <div>
                    <label className="text-xs font-bold uppercase text-gray-500 mb-1 block">Focus Keywords</label>
                    <input 
                        name="keywords"
                        value={seoData.keywords?.join(', ') || ''}
                        onChange={handleKeywordsChange}
                        className="w-full bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-4 py-2.5 text-sm dark:text-white focus:ring-2 focus:ring-jambo-600"
                        placeholder="comma, separated, keywords"
                    />
                </div>

                <div>
                    <label className="text-xs font-bold uppercase text-gray-500 mb-1 block">Canonical URL</label>
                    <input 
                        name="canonicalUrl"
                        value={seoData.canonicalUrl || ''}
                        onChange={handleChange}
                        className="w-full bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-4 py-2.5 text-sm dark:text-white focus:ring-2 focus:ring-jambo-600"
                        placeholder="https://jambolinguists.com/..."
                    />
                </div>

                <div className="flex items-center gap-3 pt-4 border-t border-gray-100 dark:border-white/5">
                    <input 
                        type="checkbox" 
                        checked={seoData.noIndex || false}
                        onChange={(e) => onChange({...seoData, noIndex: e.target.checked})}
                        className="w-4 h-4 text-red-600 rounded focus:ring-red-500"
                    />
                    <label className="text-sm font-bold text-gray-700 dark:text-gray-300">Discourage search engines from indexing this post</label>
                </div>
            </div>
        </div>
    );
};
