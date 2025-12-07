import React from 'react';
import { Invoice } from '@/data/types';
import { ArrowRightCircle } from 'lucide-react';

export const PreviewItems = ({ items, onViewJob }: { items: Invoice['items'], onViewJob?: (jobId: string) => void }) => (
  <div className="overflow-x-auto">
    <table className="w-full text-left">
      <thead>
        <tr className="border-b border-gray-200 dark:border-white/10">
          <th className="p-3 text-xs font-bold uppercase text-gray-500 dark:text-gray-400">Description</th>
          <th className="p-3 text-xs font-bold uppercase text-gray-500 dark:text-gray-400 text-center">Qty</th>
          <th className="p-3 text-xs font-bold uppercase text-gray-500 dark:text-gray-400 text-right">Rate</th>
          <th className="p-3 text-xs font-bold uppercase text-gray-500 dark:text-gray-400 text-right">Amount</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item, index) => (
          <tr key={index} className="border-b border-gray-100 dark:border-white/5">
            <td className="p-3">
                <p className="font-medium text-gray-800 dark:text-gray-200">{item.description}</p>
                {item.jobId && (
                  <p 
                    onClick={() => onViewJob && item.jobId && onViewJob(item.jobId)}
                    className={`text-xs mt-0.5 flex items-center gap-1 ${onViewJob ? 'text-jambo-600 dark:text-jambo-400 cursor-pointer hover:underline' : 'text-gray-500 dark:text-gray-400'}`}
                  >
                    Job Ref: {item.jobId} {onViewJob && <ArrowRightCircle size={10} />}
                  </p>
                )}
            </td>
            <td className="p-3 text-center text-gray-600 dark:text-gray-400">{item.quantity || '-'}</td>
            <td className="p-3 text-right text-gray-600 dark:text-gray-400">{item.rate ? `£${item.rate.toFixed(2)}` : '-'}</td>
            <td className="p-3 font-mono text-right text-gray-700 dark:text-gray-300">£{item.amount.toFixed(2)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);