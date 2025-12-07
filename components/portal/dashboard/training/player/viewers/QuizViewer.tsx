
import React, { useState } from 'react';
import { Lesson } from '../../../../../../data/types';
import { CheckCircle, XCircle, RefreshCw, ChevronRight, HelpCircle } from 'lucide-react';

export const QuizViewer = ({ lesson, onQuizComplete }: { lesson: Lesson; onQuizComplete: () => void; }) => {
    const [status, setStatus] = useState<'not-started' | 'in-progress' | 'finished'>('not-started');
    const [currentQ, setCurrentQ] = useState(0);
    const [selected, setSelected] = useState<number | null>(null);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
    const [score, setScore] = useState(0);

    const questions = lesson.quizData || [];

    const handleAnswer = () => {
        if (selected === null) return;
        const question = questions[currentQ];
        const correct = selected === question.correctAnswer;
        setIsCorrect(correct);
        if (correct) setScore(s => s + 1);
    };

    const handleNext = () => {
        setIsCorrect(null);
        setSelected(null);
        if (currentQ < questions.length - 1) {
            setCurrentQ(q => q + 1);
        } else {
            setStatus('finished');
            onQuizComplete();
        }
    };
    
    const handleRestart = () => {
        setStatus('in-progress');
        setCurrentQ(0);
        setSelected(null);
        setIsCorrect(null);
        setScore(0);
    }

    if (status === 'not-started') {
        return (
             <div className="bg-white dark:bg-[#1a1625] rounded-2xl shadow-sm border border-gray-200 dark:border-white/5 p-12 flex flex-col items-center justify-center min-h-[400px] text-center">
                <div className="mb-6 w-20 h-20 rounded-full bg-jambo-100 text-jambo-700 dark:bg-jambo-900/30 dark:text-jambo-300 flex items-center justify-center p-5">
                    <HelpCircle size={48} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Knowledge Check</h3>
                <p className="text-gray-500 dark:text-gray-400 max-w-md mb-8">
                    This quiz contains {questions.length} questions to test your understanding.
                </p>
                <button onClick={() => setStatus('in-progress')} className="bg-jambo-600 text-white font-bold py-3 px-8 rounded-xl hover:bg-jambo-700 transition-colors">
                    Start Quiz
                </button>
            </div>
        );
    }

    if (status === 'finished') {
        const pass = (score / questions.length) >= 0.8;
        return (
             <div className="bg-white dark:bg-[#1a1625] rounded-2xl shadow-sm border border-gray-200 dark:border-white/5 p-12 flex flex-col items-center justify-center min-h-[400px] text-center">
                <div className={`mb-6 w-20 h-20 rounded-full flex items-center justify-center p-5 ${pass ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'}`}>
                   {pass ? <CheckCircle size={48} /> : <XCircle size={48} />}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{pass ? 'Quiz Passed!' : 'Needs Review'}</h3>
                <p className="text-gray-500 dark:text-gray-400 mb-4">You scored</p>
                <p className="text-5xl font-bold text-gray-900 dark:text-white mb-8">{score} / {questions.length}</p>
                <button onClick={handleRestart} className="flex items-center gap-2 text-sm text-gray-500 hover:text-jambo-600 dark:hover:text-jambo-400 font-bold transition-colors">
                    <RefreshCw size={14} /> Retake Quiz
                </button>
            </div>
        );
    }

    // This is the 'in-progress' view
    if (questions.length === 0) {
        return (
             <div className="bg-white dark:bg-[#1a1625] rounded-2xl shadow-sm border border-gray-200 dark:border-white/5 p-12 flex flex-col items-center justify-center min-h-[400px] text-center">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Quiz Not Available</h3>
                <p className="text-gray-500 dark:text-gray-400">The content for this quiz is currently being prepared.</p>
            </div>
        )
    }

    const question = questions[currentQ];
    
    return (
        <div className="bg-white dark:bg-[#1a1625] rounded-2xl shadow-sm border border-gray-200 dark:border-white/5 p-8 md:p-12">
            <p className="text-xs font-bold text-jambo-600 dark:text-jambo-400 uppercase tracking-widest mb-2">Question {currentQ + 1} of {questions.length}</p>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-8">{question.question}</h3>
            
            <div className="space-y-3 mb-8">
                {question.options.map((opt, i) => {
                    const isSelected = selected === i;
                    const isCorrectAnswer = i === question.correctAnswer;
                    let stateClass = '';
                    if (isCorrect !== null) { // Answer submitted
                        if (isCorrectAnswer) stateClass = 'bg-green-50 border-green-400 text-green-800 dark:bg-green-900/20 dark:border-green-700 dark:text-white';
                        else if (isSelected) stateClass = 'bg-red-50 border-red-400 text-red-800 dark:bg-red-900/20 dark:border-red-700 dark:text-white';
                    } else if (isSelected) { // Selected but not submitted
                        stateClass = 'bg-jambo-50 border-jambo-400 dark:bg-jambo-900/20 dark:border-jambo-700';
                    }

                    return (
                        <button 
                            key={i} 
                            disabled={isCorrect !== null}
                            onClick={() => setSelected(i)}
                            className={`w-full text-left p-4 rounded-lg border-2 transition-all flex items-center gap-4 ${stateClass || 'border-gray-200 dark:border-white/10 hover:border-jambo-300 hover:bg-jambo-50/50 dark:hover:bg-jambo-900/10'}`}
                        >
                            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 ${isSelected || isCorrect !== null ? 'border-transparent' : 'border-gray-300'}`}>
                                {isCorrect !== null && isCorrectAnswer && <CheckCircle className="text-green-600" size={24} />}
                                {isCorrect !== null && !isCorrectAnswer && isSelected && <XCircle className="text-red-600" size={24} />}
                            </div>
                            <span className="font-medium text-gray-800 dark:text-gray-200">{opt}</span>
                        </button>
                    )
                })}
            </div>

            {isCorrect !== null ? (
                <div className="text-center p-4 rounded-lg bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10">
                    <p className={`font-bold mb-2 ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>{isCorrect ? 'Correct!' : 'Incorrect'}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{question.explanation}</p>
                    <button onClick={handleNext} className="bg-jambo-600 text-white font-bold py-2 px-6 rounded-lg">Next <ChevronRight className="inline" size={16} /></button>
                </div>
            ) : (
                <button onClick={handleAnswer} disabled={selected === null} className="w-full bg-jambo-600 text-white font-bold py-3 rounded-lg disabled:opacity-50">Submit Answer</button>
            )}
        </div>
    );
};
