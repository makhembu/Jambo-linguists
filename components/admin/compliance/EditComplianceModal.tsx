
import React, { useState } from 'react';
import { Modal } from '../../ui/Modal';
import { ComplianceDocument } from '../../../data/types';
import { Save, Loader2, X } from 'lucide-react';
import { Button } from '../../ui/Button';
import { mockDb } from '../../../data/mockDatabase';

interface EditComplianceModalProps {
    doc: ComplianceDocument;
    onClose: () => void;
    onSave: () => void;
}

export const EditComplianceModal = ({ doc, onClose, onSave }: EditComplianceModalProps) => {
    const [title, setTitle] = useState(doc.title);
    const [content, setContent] = useState(doc.content);
    const [isLoading, setIsLoading] = useState(false);

    const handleSave = () => {
        setIsLoading(true);
        setTimeout(() => {
            mockDb.adminUpdateComplianceDoc(doc.id, content, title);
            setIsLoading(false);
            onSave();
            onClose();
        }, 800);
    };

    return (
        <Modal isOpen={true} onClose={onClose} size="4xl">
            <div className="flex flex-col h-[85vh] bg-white dark:bg-[#1a1625]">
                {/* Header */}
                <div className="p-6 border-b border-gray-100 dark:border-white/5 flex justify-between items-center bg-gray-50/50 dark:bg-white/5">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                        Edit Compliance Document
                    </h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-white transition-colors">
                        <X size={20} />
                    </button>
                </div>

                {/* Body */}
                <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-6">
                    <div>
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2 block">Document Title</label>
                        <input 
                            value={title} 
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-4 py-3 text-gray-900 dark:text-white focus:ring-2 focus:ring-jambo-600 outline-none font-bold"
                        />
                    </div>

                    <div className="flex-1 flex flex-col h-full">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2 block">
                            Content (HTML Supported)
                        </label>
                        <div className="relative flex-1">
                            <textarea
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                className="w-full h-[400px] bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg p-4 text-sm font-mono text-gray-800 dark:text-gray-300 focus:ring-2 focus:ring-jambo-600 outline-none custom-scrollbar resize-none"
                                placeholder="Enter document content here..."
                            />
                            <p className="text-[10px] text-gray-400 mt-2">
                                Tip: You can use basic HTML tags like &lt;h4&gt;, &lt;p&gt;, &lt;strong&gt;, and &lt;ul&gt; for formatting.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-gray-100 dark:border-white/5 bg-gray-50 dark:bg-white/5 flex justify-end gap-3">
                    <Button variant="secondary" onClick={onClose} disabled={isLoading}>
                        Cancel
                    </Button>
                    <Button 
                        variant="primary" 
                        onClick={handleSave} 
                        isLoading={isLoading}
                    >
                        <Save size={16} /> Save Changes
                    </Button>
                </div>
            </div>
        </Modal>
    );
};
