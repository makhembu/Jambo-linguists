
import React from 'react';
import { CheckCircle, Lock, Link, File, Download, UploadCloud, LucideIcon } from 'lucide-react';

interface FileItem {
    name: string;
    type: 'file' | 'link';
    url: string;
    source: string; // 'Instruction', 'Delivery', 'Revision Markup', 'History'
    date: string;
}

interface JobResourcesProps {
  files: FileItem[];
  isLocked: boolean;
  title?: string;
  icon?: LucideIcon;
}

export const JobResources = ({ files, isLocked, title = "Files & Resources", icon: Icon = CheckCircle }: JobResourcesProps) => {
  if (!files || files.length === 0) return null;

  return (
    <div className={`rounded-xl border-2 transition-all overflow-hidden mt-6 ${
      !isLocked 
        ? 'border-gray-200 bg-white dark:bg-white/5 dark:border-white/10' 
        : 'border-gray-200 bg-gray-50 dark:bg-white/5 dark:border-white/10'
    }`}>
      <div className={`p-4 flex items-center justify-between border-b ${
        !isLocked 
          ? 'border-gray-100 bg-gray-50/50 dark:bg-white/5 dark:border-white/5' 
          : 'border-gray-100 bg-white/50 dark:bg-white/5 dark:border-white/5'
      }`}>
        <h4 className="font-bold text-gray-800 dark:text-gray-200 flex items-center gap-2 text-sm md:text-base">
          {!isLocked ? <Icon size={18} className="text-jambo-600 dark:text-jambo-400"/> : <Lock size={18} className="text-gray-400 dark:text-gray-500"/>}
          {title} ({files.length})
        </h4>
        {isLocked && <span className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-400 bg-gray-200 dark:bg-white/10 px-2 py-1 rounded">Locked</span>}
      </div>
      
      <div className="p-4 md:p-6 space-y-4">
        {files.map((file, index) => {
            const isDelivery = file.source === 'Delivery';
            const isInstruction = file.source === 'Instruction';
            const isRevision = file.source === 'Revision Markup';

            let iconBg = 'bg-gray-100 text-gray-600 dark:bg-white/10 dark:text-gray-400';
            if (!isLocked) {
                if (isDelivery) iconBg = 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400';
                else if (isRevision) iconBg = 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400';
                else if (isInstruction) iconBg = 'bg-jambo-50 text-jambo-600 dark:bg-jambo-900/30 dark:text-jambo-400';
            }

            return (
                <div key={index} className="flex flex-col sm:flex-row items-center gap-4 border-b border-gray-100 dark:border-white/5 last:border-0 pb-4 last:pb-0">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center shrink-0 ${iconBg}`}>
                        {file.type === 'link' ? <Link size={20} /> : (isDelivery ? <UploadCloud size={20}/> : <File size={20} />)}
                    </div>
                    
                    <div className="flex-grow text-center sm:text-left">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-1">
                            <span className={`text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded w-fit mx-auto sm:mx-0 ${
                                isDelivery ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300' :
                                isRevision ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300' :
                                'bg-gray-100 text-gray-600 dark:bg-white/10 dark:text-gray-400'
                            }`}>
                                {file.source}
                            </span>
                            <span className="text-[10px] text-gray-400">{new Date(file.date).toLocaleDateString()}</span>
                        </div>
                        <p className={`font-bold text-sm md:text-base ${!isLocked ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'}`}>
                            {!isLocked ? file.name : 'Resource Hidden'}
                        </p>
                    </div>

                    {!isLocked ? (
                        <button className="bg-white border border-gray-200 dark:bg-white/5 dark:border-white/10 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-white/10 px-4 py-2 rounded-lg font-bold text-xs md:text-sm flex items-center gap-2 transition-all w-full sm:w-auto justify-center shadow-sm">
                            {file.type === 'file' ? <Download size={14} /> : <Link size={14} />}
                            {file.type === 'file' ? 'Download' : 'Open'}
                        </button>
                    ) : (
                        <div className="px-4 py-2 bg-gray-100 dark:bg-white/5 text-gray-400 dark:text-gray-500 rounded-lg text-xs md:text-sm font-bold border border-gray-200 dark:border-white/10 cursor-not-allowed w-full sm:w-auto text-center">
                            Locked
                        </div>
                    )}
                </div>
            );
        })}
      </div>
    </div>
  );
};
