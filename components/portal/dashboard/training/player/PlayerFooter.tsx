import React from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export const PlayerFooter = ({ 
    onMarkComplete, onNext, onPrevious, 
    isCompleted, isFirstLesson, isLastLesson, 
    nextLessonTitle, previousLessonTitle 
}: any) => (
    <div className="fixed bottom-0 left-0 right-0 z-30 bg-white dark:bg-[#1a1625] border-t border-gray-200 dark:border-white/5 shadow-[0_-5px_20px_-5px_rgba(0,0,0,0.05)] p-3 safe-area-bottom">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            {/* Previous Button - Now always visible */}
            <button
                onClick={onPrevious}
                disabled={isFirstLesson}
                className="flex items-center gap-2 text-sm font-bold text-gray-500 dark:text-gray-400 hover:text-jambo-600 dark:hover:text-jambo-400 disabled:opacity-40 disabled:cursor-not-allowed transition-colors p-3 rounded-lg"
            >
                <ArrowLeft size={16} />
                <div className="text-left hidden md:block">
                    <span>Previous</span>
                    <span className="block text-xs font-normal text-gray-400 truncate max-w-[150px]">{previousLessonTitle}</span>
                </div>
            </button>

            {/* Mark as Complete (Center) */}
            <label className={`flex items-center gap-3 p-3 rounded-lg transition-all ${isCompleted ? 'cursor-default' : 'cursor-pointer hover:bg-gray-100 dark:hover:bg-white/10'}`}>
                <div className="relative flex items-center">
                    <input 
                        type="checkbox" 
                        checked={isCompleted}
                        onChange={() => { if (!isCompleted) onMarkComplete(); }}
                        className="peer h-6 w-6 opacity-0 absolute cursor-pointer" 
                        disabled={isCompleted}
                    />
                    <div className="w-6 h-6 border-2 border-gray-300 dark:border-gray-500 rounded-md peer-checked:bg-jambo-600 dark:peer-checked:bg-jambo-500 peer-checked:border-jambo-600 dark:peer-checked:border-jambo-500 transition-colors flex items-center justify-center">
                        <svg className="w-4 h-4 text-white opacity-0 peer-checked:opacity-100 transition-opacity" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                    </div>
                </div>
                <span className={`font-bold transition-colors text-sm md:text-base ${isCompleted ? 'text-jambo-600 dark:text-jambo-400' : 'text-gray-600 dark:text-gray-300'}`}>
                    Mark as Complete
                </span>
            </label>

            {/* Next Button */}
            <button 
                onClick={onNext}
                disabled={!isCompleted}
                className="flex items-center gap-2 text-sm font-bold p-3 rounded-lg text-white bg-jambo-600 hover:bg-jambo-700 disabled:bg-gray-300 dark:disabled:bg-gray-600 disabled:text-gray-500 dark:disabled:text-gray-400 disabled:shadow-none disabled:cursor-not-allowed transition-all"
            >
                <div className="text-right hidden md:block">
                    <span>{isLastLesson ? 'Finish Course' : 'Next'}</span>
                    {!isLastLesson && <span className="block text-xs font-normal text-white/70 truncate max-w-[150px]">{nextLessonTitle}</span>}
                </div>
                 <span className="md:hidden">{isLastLesson ? 'Finish' : 'Next'}</span>
                <ArrowRight size={16} />
            </button>
        </div>
    </div>
);