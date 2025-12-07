
import React, { useState, useEffect } from 'react';
import { Resource } from '../../../../data/types';
import { mockDb } from '../../../../data/mockDatabase';
import { Plus, Edit2, Trash2, ExternalLink, FileText, Link, Download } from 'lucide-react';
import { Card } from '../../../ui/Card';
import { Badge } from '../../../ui/Badge';
import { Button } from '../../../ui/Button';
import { ResourceModal } from './ResourceModal';

export const ResourceManager = () => {
    const [resources, setResources] = useState<Resource[]>([]);
    const [selectedResource, setSelectedResource] = useState<Resource | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const refreshData = () => {
        setResources(mockDb.getResources());
    };

    useEffect(() => {
        refreshData();
    }, []);

    const handleDelete = (id: string) => {
        if (confirm('Are you sure you want to delete this resource?')) {
            mockDb.adminDeleteResource(id);
            refreshData();
        }
    };

    const handleSave = (data: Partial<Resource>) => {
        if (selectedResource) {
            mockDb.adminUpdateResource(selectedResource.id, data);
        } else {
            mockDb.adminCreateResource(data);
        }
        refreshData();
    };

    const openAddModal = () => {
        setSelectedResource(null);
        setIsModalOpen(true);
    };

    const openEditModal = (res: Resource) => {
        setSelectedResource(res);
        setIsModalOpen(true);
    };

    const getIcon = (type: string) => {
        return type === 'pdf' ? <FileText size={20} /> : <Link size={20} />;
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-end">
                <Button onClick={openAddModal} leftIcon={<Plus size={18} />}>
                    Add Resource
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {resources.map(res => (
                    <Card key={res.id} className="p-5 flex flex-col h-full group hover:border-jambo-200 dark:hover:border-jambo-800 transition-colors">
                        <div className="flex justify-between items-start mb-4">
                            <div className={`p-3 rounded-xl ${res.type === 'pdf' ? 'bg-red-50 text-red-600 dark:bg-red-900/20' : 'bg-blue-50 text-blue-600 dark:bg-blue-900/20'}`}>
                                {getIcon(res.type)}
                            </div>
                            <Badge variant="neutral" className="text-[10px]">
                                {res.category.toUpperCase()}
                            </Badge>
                        </div>

                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-1" title={res.title}>{res.title}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 flex-grow line-clamp-2">
                            {res.description}
                        </p>

                        <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-white/5">
                            <a 
                                href={res.url}
                                target="_blank"
                                rel="noreferrer"
                                className="text-xs font-bold text-jambo-600 hover:text-jambo-700 dark:text-jambo-400 dark:hover:text-jambo-300 flex items-center gap-1"
                            >
                                {res.type === 'pdf' ? <Download size={14} /> : <ExternalLink size={14} />}
                                {res.type === 'pdf' ? 'Download' : 'Open Link'}
                            </a>
                            <div className="flex gap-2">
                                <button 
                                    onClick={() => openEditModal(res)}
                                    className="p-1.5 text-gray-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded transition-colors"
                                >
                                    <Edit2 size={16} />
                                </button>
                                <button 
                                    onClick={() => handleDelete(res.id)}
                                    className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>

            {resources.length === 0 && (
                <div className="text-center py-20 border border-dashed border-gray-200 dark:border-white/10 rounded-xl">
                    <p className="text-gray-400 font-medium">No resources found.</p>
                    <button onClick={openAddModal} className="text-jambo-600 font-bold hover:underline mt-2">Add your first resource</button>
                </div>
            )}

            {isModalOpen && (
                <ResourceModal 
                    resource={selectedResource}
                    onClose={() => setIsModalOpen(false)}
                    onSave={handleSave}
                />
            )}
        </div>
    );
};
