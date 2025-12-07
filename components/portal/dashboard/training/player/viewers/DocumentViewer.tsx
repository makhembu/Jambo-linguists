
import React from 'react';
import { Lesson } from '@/data/types';
import { Download, ExternalLink, FileText, AlertTriangle, Maximize2 } from 'lucide-react';

export const DocumentViewer = ({ lesson }: { lesson: Lesson }) => {
  const hasValidUrl = lesson.contentUrl && lesson.contentUrl.startsWith('http');
  const isPdf = lesson.contentUrl?.toLowerCase().endsWith('.pdf');

  // Google Docs Viewer URL
  const viewerUrl = isPdf 
    ? `https://docs.google.com/viewer?url=${encodeURIComponent(lesson.contentUrl || '')}&embedded=true`
    : lesson.contentUrl;

  return (
    <div className="bg-white dark:bg-[#1a1625] rounded-2xl shadow-sm border border-gray-200 dark:border-white/5 overflow-hidden flex flex-col h-[75vh] min-h-[500px]">
      <div className="p-4 flex items-center justify-between border-b border-gray-100 dark:border-white/5 bg-gray-50/50 dark:bg-white/5 shrink-0">
        <div className="flex items-center gap-3 overflow-hidden">
            <div className="bg-jambo-100 dark:bg-white/10 p-2 rounded-lg shrink-0">
                <FileText size={18} className="text-jambo-700 dark:text-gray-200"/>
            </div>
            <span className="text-sm font-bold text-gray-700 dark:text-gray-200 truncate">{lesson.title}</span>
        </div>
        
        {hasValidUrl && (
          <div className="flex items-center gap-2 shrink-0">
            <a 
              href={lesson.contentUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hidden sm:flex text-gray-500 hover:text-jambo-600 dark:hover:text-jambo-400 px-3 py-2 rounded-lg text-xs font-bold transition-colors items-center gap-2"
              title="Open Original"
            >
              <Maximize2 size={14} /> Open Full
            </a>
            <a 
              href={lesson.contentUrl} 
              download={isPdf ? lesson.title : undefined}
              target="_blank" 
              rel="noopener noreferrer" 
              className="bg-jambo-600 text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-jambo-700 transition-colors flex items-center gap-2" 
              title="Download / Open Original"
            >
              <Download size={14} /> <span className="hidden sm:inline">Download</span>
            </a>
          </div>
        )}
      </div>
      
      <div className="flex-1 bg-gray-100 dark:bg-black/20 relative">
        {hasValidUrl ? (
           <iframe 
             src={viewerUrl} 
             className="w-full h-full border-none"
             title="Document Viewer"
             loading="lazy"
             allowFullScreen
           >
             {/* Fallback content only shown if iframe is strictly blocked by browser */}
             <div className="flex flex-col items-center justify-center h-full p-8 text-center bg-white dark:bg-[#1a1625]">
               <div className="mb-4 w-16 h-16 rounded-xl bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400 flex items-center justify-center p-4">
                  <FileText size={32} />
               </div>
               <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2">Preview Unavailable</h3>
               <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-md text-sm">
                  The document could not be loaded inline. Please open it in a new tab.
               </p>
               <a 
                  href={lesson.contentUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-6 py-3 rounded-lg font-bold hover:opacity-90 transition-opacity flex items-center gap-2"
               >
                  <ExternalLink size={18} /> Open in New Tab
               </a>
             </div>
           </iframe>
        ) : (
           <div className="w-full h-full flex flex-col items-center justify-center text-center p-8">
             <div className="mb-4 w-16 h-16 rounded-xl bg-gray-100 text-gray-600 dark:bg-white/10 dark:text-gray-400 flex items-center justify-center p-4">
               <AlertTriangle size={32} />
             </div>
             <h3 className="font-bold text-lg text-gray-700 dark:text-gray-200">Content Not Available</h3>
          </div>
        )}
      </div>
    </div>
  );
};
