
import React, { useRef } from 'react';
import { FileText } from 'lucide-react';
import { mockDb } from '@/data/mockDatabase';

interface TermsDocumentProps {
  onScrollBottom: () => void;
}

export const TermsDocument = ({ onScrollBottom }: TermsDocumentProps) => {
  const contentRef = useRef<HTMLDivElement>(null);
  // Fetch the dynamic content from the database
  const conductDoc = mockDb.getComplianceDocs().find(d => d.type === 'conduct');
  const lastUpdated = conductDoc ? new Date(conductDoc.lastUpdated).toLocaleDateString('en-GB', { month: 'short', year: 'numeric' }) : 'Oct 2024';

  const handleScroll = () => {
    if (contentRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = contentRef.current;
      // Allow a small buffer (50px)
      if (scrollTop + clientHeight >= scrollHeight - 50) {
        onScrollBottom();
      }
    }
  };

  return (
    <div className="md:col-span-2 bg-white rounded-xl shadow-xl shadow-jambo-900/5 border border-jambo-100 overflow-hidden flex flex-col h-[600px] ring-1 ring-black/5">
       <div className="bg-gradient-to-r from-jambo-50 to-white border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
          <span className="font-bold text-jambo-900 flex items-center gap-2"><FileText size={16} className="text-jambo-600"/> {conductDoc?.title || 'Code of Conduct'}</span>
          <span className="text-xs text-jambo-400 font-medium uppercase tracking-wide">Last Updated: {lastUpdated}</span>
       </div>
       <div 
         ref={contentRef}
         onScroll={handleScroll}
         className="p-8 overflow-y-auto flex-grow prose prose-sm max-w-none text-gray-600 leading-relaxed custom-scrollbar relative"
       >
         {conductDoc ? (
             <div dangerouslySetInnerHTML={{ __html: conductDoc.content }} />
         ) : (
             <p className="text-center text-gray-400">Content unavailable.</p>
         )}

         <div className="h-20"></div>
         <p className="text-center text-sm text-gray-400 italic mb-4">-- End of Document --</p>
       </div>
    </div>
  );
};