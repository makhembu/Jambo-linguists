
import React, { useState } from 'react';
import { QuizQuestion } from '../../../../data/types';
import { Plus, Trash2, CheckCircle, Circle } from 'lucide-react';

interface QuizBuilderProps {
  questions: QuizQuestion[];
  onChange: (questions: QuizQuestion[]) => void;
}

export const QuizBuilder = ({ questions, onChange }: QuizBuilderProps) => {
  const [activeQIndex, setActiveQIndex] = useState<number | null>(null);

  const addQuestion = () => {
      const newQ: QuizQuestion = {
          question: '',
          options: ['', '', '', ''],
          correctAnswer: 0,
          explanation: ''
      };
      onChange([...questions, newQ]);
      setActiveQIndex(questions.length);
  };

  const updateQuestion = (index: number, field: keyof QuizQuestion, value: any) => {
      const updated = [...questions];
      updated[index] = { ...updated[index], [field]: value };
      onChange(updated);
  };

  const updateOption = (qIndex: number, optIndex: number, text: string) => {
      const updated = [...questions];
      updated[qIndex].options[optIndex] = text;
      onChange(updated);
  };

  const removeQuestion = (index: number) => {
      const updated = questions.filter((_, i) => i !== index);
      onChange(updated);
      if (activeQIndex === index) setActiveQIndex(null);
  };

  return (
    <div className="space-y-6 bg-gray-50 dark:bg-white/5 p-4 md:p-6 rounded-xl border border-gray-200 dark:border-white/10">
        <div className="flex justify-between items-center">
            <h4 className="font-bold text-gray-900 dark:text-white">Quiz Questions</h4>
            <button onClick={addQuestion} className="text-xs font-bold text-jambo-600 hover:text-jambo-700 flex items-center gap-1 bg-white dark:bg-white/10 border border-gray-200 dark:border-white/10 px-3 py-1.5 rounded-lg shadow-sm transition-colors">
                <Plus size={14} /> Add Question
            </button>
        </div>

        {questions.length === 0 ? (
            <p className="text-sm text-gray-400 italic text-center py-4">No questions added yet.</p>
        ) : (
            <div className="space-y-4">
                {questions.map((q, idx) => (
                    <div key={idx} className="bg-white dark:bg-[#1a1625] border border-gray-200 dark:border-white/10 rounded-lg p-4">
                        <div className="flex justify-between items-start mb-4">
                            <h5 className="text-sm font-bold text-gray-500 uppercase">Question {idx + 1}</h5>
                            <button onClick={() => removeQuestion(idx)} className="text-gray-400 hover:text-red-500 transition-colors"><Trash2 size={16}/></button>
                        </div>
                        
                        <div className="space-y-4">
                            <input 
                                className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-4 py-2 text-sm dark:text-white focus:outline-none focus:ring-2 focus:ring-jambo-600 font-bold"
                                placeholder="Enter question text..."
                                value={q.question}
                                onChange={(e) => updateQuestion(idx, 'question', e.target.value)}
                            />

                            <div className="space-y-2 pl-2 md:pl-4 border-l-2 border-gray-100 dark:border-white/5">
                                {q.options.map((opt, optIdx) => (
                                    <div key={optIdx} className="flex items-center gap-3">
                                        <button 
                                            onClick={() => updateQuestion(idx, 'correctAnswer', optIdx)}
                                            className={`shrink-0 ${q.correctAnswer === optIdx ? 'text-green-500' : 'text-gray-300 hover:text-gray-400'}`}
                                            title={q.correctAnswer === optIdx ? "Correct Answer" : "Mark as Correct"}
                                        >
                                            {q.correctAnswer === optIdx ? <CheckCircle size={20} /> : <Circle size={20} />}
                                        </button>
                                        <input 
                                            className="w-full bg-transparent border-b border-gray-200 dark:border-white/10 py-1 text-sm dark:text-white focus:outline-none focus:border-jambo-600"
                                            placeholder={`Option ${optIdx + 1}`}
                                            value={opt}
                                            onChange={(e) => updateOption(idx, optIdx, e.target.value)}
                                        />
                                    </div>
                                ))}
                            </div>

                            <div>
                                <label className="text-xs font-bold text-gray-400 uppercase mb-1 block">Explanation (shown after answer)</label>
                                <textarea 
                                    className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-3 py-2 text-xs dark:text-white focus:outline-none focus:ring-2 focus:ring-jambo-600"
                                    rows={2}
                                    value={q.explanation}
                                    onChange={(e) => updateQuestion(idx, 'explanation', e.target.value)}
                                    placeholder="Explain why this is correct..."
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        )}
    </div>
  );
};
