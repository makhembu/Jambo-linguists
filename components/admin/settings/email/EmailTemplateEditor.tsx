
import React, { useState } from 'react';
import { mockDb, EmailTemplate } from '../../../../data/mockDatabase';
import { Button } from '../../../ui/Button';
import { Save, RefreshCw } from 'lucide-react';

export const EmailTemplateEditor = () => {
  const [templates, setTemplates] = useState(mockDb.emailTemplates);
  const [selectedId, setSelectedId] = useState(templates[0].id);
  const [isSaving, setIsSaving] = useState(false);

  const selectedTemplate = templates.find(t => t.id === selectedId)!;

  const handleChange = (field: keyof EmailTemplate, value: string) => {
      setTemplates(prev => prev.map(t => 
          t.id === selectedId ? { ...t, [field]: value } : t
      ));
  };

  const handleSave = () => {
      setIsSaving(true);
      setTimeout(() => {
          const t = templates.find(t => t.id === selectedId);
          if (t) mockDb.adminUpdateEmailTemplate(selectedId, t);
          setIsSaving(false);
      }, 800);
  };

  const insertVariable = (variable: string) => {
      const textarea = document.getElementById('templateBody') as HTMLTextAreaElement;
      if (textarea) {
          const start = textarea.selectionStart;
          const end = textarea.selectionEnd;
          const text = selectedTemplate.body;
          const newText = text.substring(0, start) + `{{${variable}}}` + text.substring(end);
          handleChange('body', newText);
      }
  };

  return (
    <div className="flex flex-col lg:flex-row h-[600px] border border-gray-200 dark:border-white/10 rounded-xl overflow-hidden">
        {/* Sidebar List */}
        <div className="w-full lg:w-64 border-b lg:border-b-0 lg:border-r border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-black/20 overflow-y-auto custom-scrollbar">
            {templates.map(t => (
                <button
                    key={t.id}
                    onClick={() => setSelectedId(t.id)}
                    className={`w-full text-left px-4 py-3 text-sm font-medium border-l-4 transition-colors ${
                        selectedId === t.id 
                        ? 'bg-white dark:bg-white/5 border-jambo-600 text-jambo-700 dark:text-white' 
                        : 'border-transparent text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5'
                    }`}
                >
                    {t.name}
                </button>
            ))}
        </div>

        {/* Editor Area */}
        <div className="flex-1 flex flex-col bg-white dark:bg-[#1a1625]">
            <div className="p-6 space-y-4 flex-1 overflow-y-auto">
                <div>
                    <label className="text-xs font-bold text-gray-500 uppercase mb-2 block">Subject Line</label>
                    <input 
                        value={selectedTemplate.subject}
                        onChange={(e) => handleChange('subject', e.target.value)}
                        className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-4 py-2.5 text-sm dark:text-white font-medium"
                    />
                </div>

                <div className="flex-1 flex flex-col h-full">
                    <div className="flex justify-between items-center mb-2">
                        <label className="text-xs font-bold text-gray-500 uppercase block">Email Body</label>
                        <div className="text-xs text-gray-400">Markdown / Text Supported</div>
                    </div>
                    <textarea 
                        id="templateBody"
                        value={selectedTemplate.body}
                        onChange={(e) => handleChange('body', e.target.value)}
                        className="w-full flex-1 min-h-[300px] bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg p-4 text-sm font-mono dark:text-gray-300 resize-none focus:outline-none focus:border-jambo-600"
                    />
                </div>

                {/* Variables Helper */}
                <div className="bg-blue-50 dark:bg-blue-900/10 p-3 rounded-lg border border-blue-100 dark:border-blue-900/30">
                    <p className="text-xs font-bold text-blue-700 dark:text-blue-300 mb-2">Available Variables:</p>
                    <div className="flex flex-wrap gap-2">
                        {selectedTemplate.variables.map(v => (
                            <button 
                                key={v}
                                onClick={() => insertVariable(v)}
                                className="px-2 py-1 bg-white dark:bg-white/10 border border-blue-200 dark:border-blue-800 rounded text-xs text-blue-600 dark:text-blue-200 hover:bg-blue-50 transition-colors"
                            >
                                {`{{${v}}}`}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="p-4 border-t border-gray-100 dark:border-white/5 bg-gray-50 dark:bg-white/5 flex justify-end gap-3">
                <Button variant="secondary" onClick={() => setTemplates(mockDb.emailTemplates)}>
                    <RefreshCw size={16} /> Reset
                </Button>
                <Button onClick={handleSave} isLoading={isSaving} leftIcon={<Save size={16} />}>
                    Save Template
                </Button>
            </div>
        </div>
    </div>
  );
};
