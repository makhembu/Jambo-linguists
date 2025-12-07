
import React from 'react';
import { Sparkles, AlertCircle, CheckCircle, BrainCircuit } from 'lucide-react';
import { ContentAnalysis } from '../../../data/services/AiWritingService';

interface AiAnalysisPanelProps {
    analysis: ContentAnalysis | null;
    isLoading: boolean;
    onAnalyze: () => void;
    onGenerateSeo: () => void;
}

export const AiAnalysisPanel = ({ analysis, isLoading, onAnalyze, onGenerateSeo }: AiAnalysisPanelProps) => {
    
    if (!analysis && !isLoading) {
        return (
            <div className="text-center py-12">
                <div className="bg-jambo-50 dark:bg-jambo-900/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-jambo-600">
                    <Sparkles size={32} />
                </div>
                <h4 className="font-bold text-gray-900 dark:text-white mb-2">AI Content Assistant</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 max-w-xs mx-auto">
                    Get real-time feedback on readability, tone, and SEO optimization.
                </p>
                <div className="flex flex-col gap-3 px-6">
                    <button 
                        onClick={onAnalyze}
                        className="bg-jambo-600 text-white font-bold py-2 rounded-lg hover:bg-jambo-700 transition-colors shadow-lg shadow-jambo-600/20"
                    >
                        Analyze Content
                    </button>
                    <button 
                        onClick={onGenerateSeo}
                        className="bg-white dark:bg-white/10 text-jambo-600 dark:text-jambo-400 border border-jambo-200 dark:border-white/10 font-bold py-2 rounded-lg hover:bg-jambo-50 dark:hover:bg-white/20 transition-colors flex items-center justify-center gap-2"
                    >
                        <BrainCircuit size={16} /> Auto-Generate SEO
                    </button>
                </div>
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-jambo-600 animate-pulse">
                <Sparkles size={48} className="mb-4" />
                <p className="font-bold">Analyzing your masterpiece...</p>
            </div>
        );
    }

    return (
        <div className="space-y-6 animate-in fade-in duration-300">
            {/* Score Card */}
            <div className="bg-gradient-to-br from-jambo-600 to-jambo-800 rounded-xl p-6 text-white text-center shadow-lg relative overflow-hidden">
                <div className="relative z-10">
                    <p className="text-xs font-bold uppercase tracking-widest opacity-80 mb-2">Content Score</p>
                    <div className="text-5xl font-serif font-bold mb-2">{analysis?.score || 0}<span className="text-2xl opacity-60">/100</span></div>
                    <div className="inline-block px-3 py-1 bg-white/20 rounded-full text-xs font-bold backdrop-blur-md">
                        {analysis?.readabilityLevel || 'Unknown'} Level
                    </div>
                </div>
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
            </div>

            {/* Tone */}
            <div className="bg-gray-50 dark:bg-white/5 p-4 rounded-xl border border-gray-200 dark:border-white/10">
                <h5 className="text-xs font-bold uppercase text-gray-500 mb-2">Detected Tone</h5>
                <p className="text-sm font-medium text-gray-800 dark:text-gray-200 capitalize">{analysis?.tone || 'Neutral'}</p>
            </div>

            {/* Suggestions */}
            <div>
                <h5 className="text-xs font-bold uppercase text-gray-500 mb-3">Improvements</h5>
                <div className="space-y-2">
                    {analysis?.suggestions.map((suggestion, idx) => (
                        <div key={idx} className="flex gap-3 p-3 bg-white dark:bg-white/5 border border-gray-100 dark:border-white/5 rounded-lg text-sm">
                            <AlertCircle size={16} className="text-orange-500 shrink-0 mt-0.5" />
                            <span className="text-gray-700 dark:text-gray-300">{suggestion}</span>
                        </div>
                    ))}
                    {analysis?.suggestions.length === 0 && (
                        <div className="flex gap-3 p-3 bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-900/30 rounded-lg text-sm">
                            <CheckCircle size={16} className="text-green-500 shrink-0 mt-0.5" />
                            <span className="text-green-800 dark:text-green-200">No issues found. Great job!</span>
                        </div>
                    )}
                </div>
            </div>

            <div className="pt-4 border-t border-gray-100 dark:border-white/5 flex gap-2">
                <button onClick={onAnalyze} className="flex-1 text-xs font-bold text-gray-500 hover:text-jambo-600 transition-colors">
                    Re-Analyze
                </button>
            </div>
        </div>
    );
};
