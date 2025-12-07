
import React from 'react';
import { Invoice } from '@/data/types';

export const PreviewSummary = ({ invoice }: { invoice: Invoice }) => {
  const hasVat = invoice.vatRate && invoice.vatRate > 0;
  const subtotal = invoice.subtotal || (hasVat ? invoice.amount / (1 + (invoice.vatRate! / 100)) : invoice.amount);
  const vatAmount = invoice.amount - subtotal;

  return (
    <div className="mt-8 flex justify-end">
        <div className="w-full max-w-xs space-y-2">
            <div className="flex justify-between text-gray-600 dark:text-gray-300">
                <span>Subtotal</span>
                <span>£{subtotal.toFixed(2)}</span>
            </div>
            {hasVat && (
                <div className="flex justify-between text-gray-600 dark:text-gray-300">
                    <span>VAT ({invoice.vatRate}%)</span>
                    <span>£{vatAmount.toFixed(2)}</span>
                </div>
            )}
            <div className="h-px bg-gray-200 dark:bg-white/10"></div>
            <div className="flex justify-between font-bold text-xl text-gray-900 dark:text-white">
                <span>Total Due</span>
                <span>£{invoice.amount.toFixed(2)}</span>
            </div>
        </div>
    </div>
  );
};
