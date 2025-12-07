import React, { useState } from 'react';
import { Lesson } from '../../../../../../data/types';

export const VideoViewer = ({ lesson }: { lesson: Lesson }) => {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="space-y-8">
      <div className="relative aspect-[4/3] sm:aspect-video bg-black rounded-2xl shadow-lg overflow-hidden border-2 md:border-4 border-white dark:border-[#1a1625]">
        <video 
            className="w-full h-full object-contain" 
            src={lesson.contentUrl} 
            poster={lesson.contentUrl ? undefined : "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=1000"}
            controls
        >
          Your browser does not support the video tag.
        </video>
      </div>
      
      <div className="bg-white dark:bg-[#1a1625] rounded-2xl border border-gray-200 dark:border-white/5 shadow-sm">
        <div className="flex border-b border-gray-100 dark:border-white/5">
          <button onClick={() => setActiveTab('overview')} className={`px-6 py-3 font-bold text-sm transition-colors ${activeTab === 'overview' ? 'text-jambo-600 dark:text-jambo-400 border-b-2 border-jambo-600' : 'text-gray-500 hover:bg-gray-50 dark:hover:bg-white/5'}`}>Overview</button>
          <button onClick={() => setActiveTab('transcript')} className={`px-6 py-3 font-bold text-sm transition-colors ${activeTab === 'transcript' ? 'text-jambo-600 dark:text-jambo-400 border-b-2 border-jambo-600' : 'text-gray-500 hover:bg-gray-50 dark:hover:bg-white/5'}`}>Transcript</button>
        </div>
        <div className="p-6 prose prose-lg dark:prose-invert max-w-none">
          {activeTab === 'overview' && (
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-base">
              {lesson.description || "In this lesson, we cover the core concepts and practical applications relevant to your daily work as a linguist."}
            </p>
          )}
          {activeTab === 'transcript' && (
            <p className="text-sm text-gray-600 dark:text-gray-300 italic font-serif max-h-48 overflow-y-auto custom-scrollbar">
              {lesson.transcript || "No transcript available for this video."}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};