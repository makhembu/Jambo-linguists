
import React, { useState, useEffect } from 'react';
import { Modal } from '../../../ui/Modal';
import { Resource } from '@/data/types';
import { Button } from '../../../ui/Button';
import { Save, Link, FileText, X } from 'lucide-react';

interface ResourceModalProps {
    resource?: Resource | null;
    onClose: () => void;
    onSave: (data: Partial<Resource>) => void;
}

export const ResourceModal = ({ resource, onClose, onSave }: ResourceModalProps) => {
    const [formData, setFormData] = useState<Partial<Resource>>({
        title: '',
        description: '',
        category: 'General',
        type: 'link',
        url: ''
    });
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (resource) {
            setFormData(resource);
        }
    }, [resource]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate network delay
        setTimeout(() => {
            onSave(formData);
            setIsLoading(false);
            onClose();
        }, 500);
    };

    return (
        <Modal isOpen={true} onClose={onClose} size="lg">
            <form onSubmit={handleSubmit} className="flex flex-col h-full bg-white dark:bg-[#1a1625]">
                {/* Header */}
                <div className="p-6 border-b border-gray-100 dark:border-white/5 flex justify-between items-center bg-gray-50/50 dark:bg-white/5">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                        {resource ? 'Edit Resource' : 'Add Resource'}
                    </h2>
                    <button type="button" onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-white transition-colors">
                        <X size={20} />
                    </button>
                </div>

                {/* Body */}
                <div className="p-6 space-y-6">
                    <div>
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2 block">Title</label>
                        <input 
                            required
                            value={formData.title}
                            onChange={(e) => setFormData({...formData, title: e.target.value})}
                            className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-4 py-3 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-jambo-600"
                            placeholder="e.g. Employee Handbook 2024"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2 block">Category</label>
                            <select 
                                value={formData.category}
                                onChange={(e) => setFormData({...formData, category: e.target.value as any})}
                                className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-4 py-3 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-jambo-600 appearance-none"
                            >
                                <option value="General">General</option>
                                <option value="Legal">Legal</option>
                                <option value="Medical">Medical</option>
                                <option value="Compliance">Compliance</option>
                            </select>
                        </div>
                        <div>
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2 block">Type</label>
                            <div className="flex bg-gray-50 dark:bg-white/5 rounded-lg p-1 border border-gray-200 dark:border-white/10">
                                <button
                                    type="button"
                                    onClick={() => setFormData({...formData, type: 'link'})}
                                    className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-md text-sm font-bold transition-colors ${formData.type === 'link' ? 'bg-white dark:bg-white/10 text-jambo-600 dark:text-white shadow-sm' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}
                                >
                                    <Link size={14} /> Link
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setFormData({...formData, type: 'pdf'})}
                                    className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-md text-sm font-bold transition-colors ${formData.type === 'pdf' ? 'bg-white dark:bg-white/10 text-jambo-600 dark:text-white shadow-sm' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}
                                >
                                    <FileText size={14} /> PDF
                                </button>
                            </div>
                        </div>
                    </div>

                    <div>
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2 block">
                            {formData.type === 'link' ? 'Resource URL' : 'File URL'}
                        </label>
                        <input 
                            required
                            value={formData.url}
                            onChange={(e) => setFormData({...formData, url: e.target.value})}
                            className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-4 py-3 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-jambo-600"
                            placeholder="https://..."
                        />
                        {formData.type === 'pdf' && (
                            <p className="text-xs text-gray-400 mt-2">
                                * For demo purposes, paste a direct link to a PDF. In production, this would be a file upload.
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2 block">Description</label>
                        <textarea 
                            rows={3}
                            value={formData.description}
                            onChange={(e) => setFormData({...formData, description: e.target.value})}
                            className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-4 py-3 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-jambo-600 resize-none"
                            placeholder="Brief description of the resource..."
                        />
                    </div>
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-gray-100 dark:border-white/5 bg-gray-50 dark:bg-white/5 flex justify-end gap-3">
                    <Button variant="secondary" onClick={onClose} disabled={isLoading} type="button">
                        Cancel
                    </Button>
                    <Button 
                        variant="primary" 
                        type="submit"
                        isLoading={isLoading}
                    >
                        <Save size={16} /> Save Resource
                    </Button>
                </div>
            </form>
        </Modal>
    );
};
