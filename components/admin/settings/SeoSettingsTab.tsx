
import React, { useState, useMemo } from 'react';
import { mockDb, SystemSettings } from '../../../data/mockDatabase';
import { COMPANY_INFO } from '../../../data/constants';
import { Card } from '../../ui/Card';
import { Button } from '../../ui/Button';
import { Sparkles, Globe, Search, Code, Loader2, Save, Smartphone, Monitor, Info, FileText, Download } from 'lucide-react';

export const SeoSettingsTab = () => {
  const [settings, setSettings] = useState<SystemSettings>(mockDb.getSettings());
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [previewMode, setPreviewMode] = useState<'mobile' | 'desktop'>('desktop');

  const handleUpdate = (key: keyof typeof settings.seo, value: any) => {
      setSettings(prev => ({
          ...prev,
          seo: { ...prev.seo, [key]: value }
      }));
  };

  const handleSave = () => {
      setIsSaving(true);
      setTimeout(() => {
          mockDb.updateSettings({ seo: settings.seo });
          setIsSaving(false);
      }, 800);
  };

  const handleAiGenerate = async () => {
      setIsGenerating(true);
      const generated = await mockDb.ai.generateSiteSeo(COMPANY_INFO);
      if (generated.siteTitle) {
          setSettings(prev => ({
              ...prev,
              seo: {
                  ...prev.seo,
                  ...generated
              }
          }));
      }
      setIsGenerating(false);
  };

  // Parse Structure Data to extract Contact Info for Preview
  const extractedContact = useMemo(() => {
      try {
          const data = JSON.parse(settings.seo.structuredData || '{}');
          // Handle both array (graph) or single object
          const org = Array.isArray(data) ? data.find(i => i['@type'] === 'Organization' || i['@type'] === 'LocalBusiness') : data;
          
          if (!org) return { phone: COMPANY_INFO.phone, email: COMPANY_INFO.email };

          const contactPoint = Array.isArray(org.contactPoint) ? org.contactPoint[0] : org.contactPoint;
          
          return {
              phone: contactPoint?.telephone || org.telephone || COMPANY_INFO.phone,
              email: contactPoint?.email || org.email || COMPANY_INFO.email
          };
      } catch (e) {
          return { phone: COMPANY_INFO.phone, email: COMPANY_INFO.email };
      }
  }, [settings.seo.structuredData]);

  const generateSitemap = () => {
      const baseUrl = "https://jambolinguists.com";
      const pages = ['', 'about', 'services', 'blog'];
      const blogs = mockDb.getAllBlogs().filter(p => p.status === 'published');
      
      let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
      
      // Static Pages
      pages.forEach(p => {
          xml += `  <url>\n    <loc>${baseUrl}/${p}</loc>\n    <changefreq>weekly</changefreq>\n    <priority>${p === '' ? '1.0' : '0.8'}</priority>\n  </url>\n`;
      });

      // Blogs
      blogs.forEach(b => {
          xml += `  <url>\n    <loc>${baseUrl}/blog/${b.slug}</loc>\n    <lastmod>${new Date(b.updatedAt).toISOString().split('T')[0]}</lastmod>\n    <priority>0.6</priority>\n  </url>\n`;
      });

      xml += `</urlset>`;
      return xml;
  };

  const handleDownloadSitemap = () => {
      const xml = generateSitemap();
      const blob = new Blob([xml], { type: 'application/xml' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'sitemap.xml';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
  };

  const generateRobotsTxt = () => {
      return `User-agent: *\nAllow: /\nDisallow: /portal/\nDisallow: /admin/\n\nSitemap: https://jambolinguists.com/sitemap.xml`;
  };

  return (
    <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Global SEO & Metadata</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Configure how Jambo Linguists appears in search results.</p>
            </div>
            <div className="flex gap-3">
                <Button 
                    variant="outline" 
                    onClick={handleAiGenerate} 
                    isLoading={isGenerating}
                    className="border-jambo-600 text-jambo-600 hover:bg-jambo-50 dark:hover:bg-jambo-900/20"
                >
                    <Sparkles size={16} /> AI Auto-Generate
                </Button>
                <Button onClick={handleSave} isLoading={isSaving}>
                    <Save size={16} /> Save Changes
                </Button>
            </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            
            {/* Preview Section */}
            <div className="space-y-6 order-1 xl:order-2">
                <Card className="p-6 bg-gray-50 dark:bg-[#1a1625]">
                    <div className="flex justify-between items-center mb-6 border-b border-gray-200 dark:border-white/5 pb-4">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-orange-100 dark:bg-orange-900/30 text-orange-600 rounded-lg">
                                <Search size={20} />
                            </div>
                            <h3 className="font-bold text-gray-900 dark:text-white">Live Search Preview</h3>
                        </div>
                        <div className="flex gap-2 bg-white dark:bg-white/5 p-1 rounded-lg border border-gray-200 dark:border-white/10">
                            <button 
                                onClick={() => setPreviewMode('mobile')}
                                className={`p-1.5 rounded ${previewMode === 'mobile' ? 'bg-gray-100 dark:bg-white/20 text-jambo-600 dark:text-white shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
                                title="Mobile View"
                            >
                                <Smartphone size={16} />
                            </button>
                            <button 
                                onClick={() => setPreviewMode('desktop')}
                                className={`p-1.5 rounded ${previewMode === 'desktop' ? 'bg-gray-100 dark:bg-white/20 text-jambo-600 dark:text-white shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
                                title="Desktop View"
                            >
                                <Monitor size={16} />
                            </button>
                        </div>
                    </div>

                    <div className="flex justify-center">
                        <div className={`bg-white p-4 rounded-lg shadow-sm border border-gray-100 w-full transition-all duration-300 ${previewMode === 'mobile' ? 'max-w-[375px]' : 'max-w-full'}`}>
                            {/* Main Result */}
                            <div className="flex items-center gap-3 mb-2">
                                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center overflow-hidden border border-gray-200">
                                    <img src={COMPANY_INFO.logoUrl} alt="Logo" className="w-full h-full object-cover" />
                                </div>
                                <div className="flex flex-col text-xs leading-tight">
                                    <span className="text-[#202124] font-medium">{COMPANY_INFO.name}</span>
                                    <span className="text-[#5f6368]">https://jambolinguists.com</span>
                                </div>
                            </div>
                            <h3 className="text-[#1a0dab] text-xl font-normal hover:underline cursor-pointer truncate font-sans mb-1">
                                {settings.seo.siteTitle}
                            </h3>
                            <p className="text-[#4d5156] text-sm leading-snug mb-4">
                                {settings.seo.siteDescription || 'No description provided.'}
                            </p>
                            
                            {/* Sitelinks Simulation */}
                            <div className={`grid gap-x-4 gap-y-4 ${previewMode === 'mobile' ? 'grid-cols-1' : 'grid-cols-2 ml-4'}`}>
                                <div>
                                    <h4 className="text-[#1a0dab] text-sm font-medium hover:underline cursor-pointer">Contact Us</h4>
                                    <p className="text-xs text-[#4d5156] mt-0.5 line-clamp-2">
                                        {extractedContact.email} {extractedContact.phone} <br/>
                                        Get in touch with our team for immediate assistance.
                                    </p>
                                </div>
                                <div>
                                    <h4 className="text-[#1a0dab] text-sm font-medium hover:underline cursor-pointer">About Us</h4>
                                    <p className="text-xs text--[#4d5156] mt-0.5 line-clamp-2">
                                        The Founding Director. Linah is a language professional working...
                                    </p>
                                </div>
                                <div className="hidden sm:block">
                                    <h4 className="text-[#1a0dab] text-sm font-medium hover:underline cursor-pointer">Services</h4>
                                    <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">
                                        Professional Interpreting, Translation, and Transcription services.
                                    </p>
                                </div>
                                <div className="hidden sm:block">
                                    <h4 className="text-[#1a0dab] text-sm font-medium hover:underline cursor-pointer">Swahili Language</h4>
                                    <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">
                                        Learn about our specialization in East African dialects.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="mt-4 flex items-start gap-2 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-blue-800 dark:text-blue-200 text-xs border border-blue-100 dark:border-blue-900/30">
                        <Info size={16} className="shrink-0 mt-0.5" />
                        <p>
                            <strong>Preview Note:</strong> The "Contact Us" snippet above is generated using the phone and email detected in your Structured Data configuration. This helps verify that Google can see your contact info even without a dedicated page.
                        </p>
                    </div>
                </Card>

                {/* Sitemap & Robots Preview */}
                <Card className="p-6">
                    <div className="flex items-center gap-3 mb-6 border-b border-gray-100 dark:border-white/5 pb-4">
                        <div className="p-2 bg-teal-100 dark:bg-teal-900/30 text-teal-600 rounded-lg">
                            <FileText size={20} />
                        </div>
                        <h3 className="font-bold text-gray-900 dark:text-white">Crawling Rules</h3>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <label className="text-xs font-bold text-gray-500 mb-2 block">Robots.txt Preview</label>
                            <div className="bg-gray-900 p-3 rounded-lg border border-gray-800 h-32 overflow-auto mb-2">
                                <pre className="text-xs text-green-400 font-mono">{generateRobotsTxt()}</pre>
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <label className="text-xs font-bold text-gray-500 block">Sitemap.xml Preview</label>
                                <button onClick={handleDownloadSitemap} className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1">
                                    <Download size={12} /> Download
                                </button>
                            </div>
                            <div className="bg-gray-900 p-3 rounded-lg border border-gray-800 h-32 overflow-auto">
                                <pre className="text-xs text-blue-300 font-mono whitespace-pre-wrap">{generateSitemap()}</pre>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>

            {/* Config Section */}
            <div className="space-y-6 order-2 xl:order-1">
                <Card className="p-6">
                    <div className="flex items-center gap-3 mb-6 border-b border-gray-100 dark:border-white/5 pb-4">
                        <div className="p-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-lg">
                            <Globe size={20} />
                        </div>
                        <h3 className="font-bold text-gray-900 dark:text-white">Site Metadata</h3>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <label className="block text-xs font-bold uppercase text-gray-500 mb-2">Global Site Title</label>
                            <input 
                                value={settings.seo.siteTitle}
                                onChange={(e) => handleUpdate('siteTitle', e.target.value)}
                                className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-jambo-600 transition-all"
                                placeholder="Jambo Linguists"
                            />
                            <p className="text-xs text-gray-400 mt-1">Used as default title suffix.</p>
                        </div>

                        <div>
                            <label className="block text-xs font-bold uppercase text-gray-500 mb-2">Default Meta Description</label>
                            <textarea 
                                value={settings.seo.siteDescription}
                                onChange={(e) => handleUpdate('siteDescription', e.target.value)}
                                rows={3}
                                className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-jambo-600 transition-all resize-none"
                                placeholder="A brief description of the company..."
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-bold uppercase text-gray-500 mb-2">Global Keywords</label>
                            <input 
                                value={settings.seo.defaultKeywords.join(', ')}
                                onChange={(e) => handleUpdate('defaultKeywords', e.target.value.split(',').map(s => s.trim()))}
                                className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-jambo-600 transition-all"
                                placeholder="Swahili, Interpreting, ..."
                            />
                        </div>
                    </div>
                </Card>

                {/* Structured Data / Contact SEO */}
                <Card className="p-6 flex flex-col">
                    <div className="flex items-center gap-3 mb-6 border-b border-gray-100 dark:border-white/5 pb-4">
                        <div className="p-2 bg-purple-100 dark:bg-purple-900/30 text-purple-600 rounded-lg">
                            <Code size={20} />
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-900 dark:text-white">Structured Data (JSON-LD)</h3>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Essential for Contact & Business info in search.</p>
                        </div>
                    </div>

                    <div className="flex-1 flex flex-col">
                        <div className="bg-gray-900 rounded-xl p-4 flex-1 font-mono text-xs text-green-400 overflow-auto custom-scrollbar relative border border-gray-800 min-h-[300px]">
                            <textarea 
                                value={settings.seo.structuredData}
                                onChange={(e) => handleUpdate('structuredData', e.target.value)}
                                className="w-full h-full bg-transparent border-none focus:ring-0 outline-none resize-none"
                                spellCheck={false}
                            />
                        </div>
                        <div className="mt-4 bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-200 dark:border-yellow-800 p-3 rounded-lg">
                            <p className="text-xs text-yellow-800 dark:text-yellow-200">
                                <strong>Note:</strong> This JSON-LD script is automatically injected into the <code>&lt;head&gt;</code> of every page. It ensures search engines can find your phone number and address from the footer.
                            </p>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    </div>
  );
};
