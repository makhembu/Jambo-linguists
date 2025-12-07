
import React from 'react';
import { Calendar, PoundSterling } from 'lucide-react';

interface SummarySectionProps {
  reference: string;
  setReference: (s: string) => void;
  issueDate: string;
  setIssueDate: (s: string) => void;
  dueDate: string;
  setDueDate: (s: string) => void;
  subtotal: number;
  vatEnabled: boolean;
  setVatEnabled: (b: boolean) => void;
  vatRate: number;
  setVatRate: (n: number) => void;
  vatAmount: number;
  total: number;
}

export const SummarySection = ({
  reference, setReference, issueDate, setIssueDate, dueDate, setDueDate,
  subtotal, vatEnabled, setVatEnabled, vatRate, setVatRate, vatAmount, total
}: SummarySectionProps) => {
  return (
    <div className="space-y-6">
        {/* Dates */}
        <div className="bg-white dark:bg-[#13111c] p-5 rounded-xl border border-gray-200 dark:border-white/10 shadow-sm">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                <Calendar size={14} /> Invoice Dates
            </h3>
            <div className="space-y-3">
                <div>
                    <label className="text-xs font-bold text-gray-500 mb-1 block">Reference</label>
                    <input 
                        className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-3 py-2 text-sm font-mono dark:text-white"
                        value={reference}
                        onChange={(e) => setReference(e.target.value)}
                    />
                </div>
                <div>
                    <label className="text-xs font-bold text-gray-500 mb-1 block">Issue Date</label>
                    <input 
                        type="date"
                        className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-3 py-2 text-sm dark:text-white"
                        value={issueDate}
                        onChange={(e) => setIssueDate(e.target.value)}
                    />
                </div>
                <div>
                    <label className="text-xs font-bold text-gray-500 mb-1 block">Due Date</label>
                    <input 
                        type="date"
                        className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-3 py-2 text-sm dark:text-white"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                    />
                </div>
            </div>
        </div>

        {/* Totals */}
        <div className="bg-white dark:bg-[#13111c] p-5 rounded-xl border border-gray-200 dark:border-white/10 shadow-sm">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                <PoundSterling size={14} /> Summary
            </h3>
            
            <div className="space-y-3 mb-4">
                <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300">
                    <span>Subtotal</span>
                    <span>£{subtotal.toFixed(2)}</span>
                </div>
                
                <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 cursor-pointer">
                        <input 
                            type="checkbox" 
                            checked={vatEnabled}
                            onChange={(e) => setVatEnabled(e.target.checked)}
                            className="rounded text-jambo-600 focus:ring-jambo-500"
                        />
                        Add VAT
                    </label>
                    {vatEnabled && (
                        <div className="flex items-center gap-1">
                            <input 
                                type="number" 
                                className="w-12 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded px-1 py-0.5 text-xs text-right dark:text-white"
                                value={vatRate}
                                onChange={(e) => setVatRate(Number(e.target.value))}
                            />
                            <span className="text-xs">%</span>
                        </div>
                    )}
                </div>
                
                {vatEnabled && (
                    <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300">
                        <span>VAT Amount</span>
                        <span>£{vatAmount.toFixed(2)}</span>
                    </div>
                )}
            </div>

            <div className="pt-4 border-t border-gray-100 dark:border-white/5 flex justify-between items-end">
                <span className="text-sm font-bold text-gray-900 dark:text-white">Total Due</span>
                <span className="text-2xl font-bold text-jambo-600 dark:text-jambo-400 font-mono">
                    £{total.toFixed(2)}
                </span>
            </div>
        </div>
    </div>
  );
};
