
import React, { useState, useEffect } from 'react';
import { ShieldCheck, Edit, Clock, FileText, BookOpen, Shield } from 'lucide-react';
import { mockDb, ComplianceDocument } from '../../../data/mockDatabase';
import { EditComplianceModal } from './EditComplianceModal';
import { ResourceManager } from './resources/ResourceManager';
import { Card } from '../../ui/Card';
import { Badge } from '../../ui/Badge';
import { TabsList, TabsTrigger } from '../../ui/Tabs';

export const AdminCompliance = () => {
    const [activeTab, setActiveTab] = useState<'policies' | 'resources'>('policies');
    const [docs, setDocs] = useState<ComplianceDocument[]>([]);
    const [selectedDoc, setSelectedDoc] = useState<ComplianceDocument | null>(null);

    const refreshData = () => {
        setDocs(mockDb.getComplianceDocs());
    };

    useEffect(() => {
        refreshData();
    }, []);

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex justify-between items-end">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Compliance & Resources</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Manage legal agreements, policies, and the resource library for linguists.</p>
                </div>
            </div>

            <div className="bg-white dark:bg-[#13111c] rounded-xl shadow-sm border border-gray-200 dark:border-white/5 overflow-hidden">
                <TabsList className="px-6 pt-2 overflow-x-auto no-scrollbar">
                    <TabsTrigger 
                        active={activeTab === 'policies'} 
                        onClick={() => setActiveTab('policies')}
                        icon={<Shield size={16} />}
                    >
                        Policies & Agreements
                    </TabsTrigger>
                    <TabsTrigger 
                        active={activeTab === 'resources'} 
                        onClick={() => setActiveTab('resources')}
                        icon={<BookOpen size={16} />}
                    >
                        Resource Library
                    </TabsTrigger>
                </TabsList>

                <div className="p-6 bg-gray-50 dark:bg-black/10">
                    {activeTab === 'policies' && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {docs.map(doc => (
                                    <Card key={doc.id} className="p-6 flex flex-col h-full group hover:border-jambo-200 dark:hover:border-jambo-800 transition-colors">
                                        <div className="flex justify-between items-start mb-4">
                                            <div className="p-3 bg-jambo-100 dark:bg-jambo-900/30 rounded-xl text-jambo-700 dark:text-jambo-300">
                                                <FileText size={24} />
                                            </div>
                                            <Badge variant="neutral" className="text-[10px]">
                                                {doc.type.toUpperCase()}
                                            </Badge>
                                        </div>

                                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{doc.title}</h3>
                                        
                                        <div className="flex-1 bg-gray-50 dark:bg-white/5 rounded-lg p-4 mb-6 border border-gray-100 dark:border-white/5 relative overflow-hidden">
                                            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-50 dark:to-[#1e1b24] pointer-events-none"></div>
                                            <div className="text-xs text-gray-500 dark:text-gray-400 font-mono line-clamp-4 leading-relaxed opacity-70">
                                                {doc.content.replace(/<[^>]*>?/gm, '')}
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-white/5">
                                            <div className="flex items-center gap-2 text-xs text-gray-400">
                                                <Clock size={12} />
                                                Updated: {new Date(doc.lastUpdated).toLocaleDateString()}
                                            </div>
                                            <button 
                                                onClick={() => setSelectedDoc(doc)}
                                                className="flex items-center gap-2 text-sm font-bold text-jambo-600 hover:text-jambo-700 dark:text-jambo-400 dark:hover:text-jambo-300 transition-colors bg-jambo-50 dark:bg-jambo-900/20 px-4 py-2 rounded-lg"
                                            >
                                                <Edit size={14} /> Edit Content
                                            </button>
                                        </div>
                                    </Card>
                                ))}
                            </div>

                            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-900/50 rounded-xl p-4 flex gap-4 text-blue-800 dark:text-blue-200">
                                <ShieldCheck size={20} className="shrink-0 mt-0.5" />
                                <div>
                                    <h4 className="font-bold text-sm">System Note</h4>
                                    <p className="text-xs opacity-90 mt-1">
                                        Changes made here are reflected immediately in the Linguist Onboarding Portal and the "Terms" section of their dashboard.
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'resources' && (
                        <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                            <ResourceManager />
                        </div>
                    )}
                </div>
            </div>

            {selectedDoc && (
                <EditComplianceModal 
                    doc={selectedDoc} 
                    onClose={() => setSelectedDoc(null)} 
                    onSave={refreshData} 
                />
            )}
        </div>
    );
};
