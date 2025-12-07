
import React, { useState } from 'react';
import { Book, FileText, Download, Search, Shield, Globe, File, ExternalLink } from 'lucide-react';
import { mockDb } from '../../../../data/mockDatabase';
import { IconBox, IconBoxVariant } from '../../../ui/IconBox';
import { Card } from '../../../ui/Card';

export const ResourceLibrary = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const resources = mockDb.getResources();

  const filteredResources = resources.filter(r => 
    r.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    r.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getIcon = (category: string): { icon: any, variant: IconBoxVariant } => {
      switch(category) {
          case 'Legal': return { icon: Shield, variant: 'orange' };
          case 'Medical': return { icon: FileText, variant: 'teal' };
          case 'General': return { icon: Globe, variant: 'info' };
          case 'Compliance': return { icon: Shield, variant: 'danger' };
          default: return { icon: File, variant: 'neutral' };
      }
  };

  return (
    <div className="animate-in fade-in duration-500 pb-12">
        <div className="mb-6 md:mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
                <h2 className="text-2xl md:text-4xl font-serif font-bold text-jambo-950 dark:text-white mb-2">Resource Library</h2>
                <p className="text-gray-500 dark:text-gray-400 text-sm md:text-lg">Essential documents, glossaries, and guidelines for your assignments.</p>
            </div>
            
            <div className="relative w-full md:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <input 
                    type="text" 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search resources..."
                    className="w-full bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-jambo-600 dark:focus:border-jambo-400 transition-colors"
                />
            </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.map((res) => {
                const { icon: Icon, variant } = getIcon(res.category);
                return (
                    <Card key={res.id} className="p-6 flex flex-col h-full group" hoverEffect={true}>
                        <div className="flex items-start justify-between mb-4">
                            <IconBox icon={Icon} variant={variant} size="lg" />
                            <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 bg-gray-50 dark:bg-white/5 px-2 py-1 rounded border border-gray-100 dark:border-white/5">
                                {res.category}
                            </span>
                        </div>
                        
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-jambo-600 dark:group-hover:text-jambo-400 transition-colors">
                            {res.title}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 flex-grow">
                            {res.description}
                        </p>

                        <a 
                            href={res.url} 
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-auto w-full bg-gray-50 dark:bg-white/5 hover:bg-gray-100 dark:hover:bg-white/10 border border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-200 font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition-colors text-sm"
                        >
                            {res.type === 'link' ? <ExternalLink size={16} /> : <Download size={16} />}
                            {res.type === 'link' ? 'Open Link' : 'Download PDF'}
                        </a>
                    </Card>
                );
            })}
        </div>
        
        {filteredResources.length === 0 && (
            <div className="text-center py-20 text-gray-400">
                <p>No resources found matching "{searchTerm}"</p>
            </div>
        )}
    </div>
  );
};
