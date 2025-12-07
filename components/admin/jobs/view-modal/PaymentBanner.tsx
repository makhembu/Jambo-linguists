

import React from 'react';
import { CheckCircle, Clock } from 'lucide-react';
import { Invoice } from '@/data/types';

interface PaymentBannerProps {
    existingInvoice: Invoice | undefined;
    onReview: () => void;
}

export const PaymentBanner = ({ existingInvoice, onReview }: PaymentBannerProps) => {
    if (!existingInvoice) return null;
    
    const isPaid = existingInvoice.status === 'Paid';

    return (
        <div className={`border rounded-xl p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6 animate-in fade-in duration-300 ${isPaid ? 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800' : 'bg-orange-50 border-orange-200 dark:bg-orange-900/20 dark:border-orange-800'}`}>
            <div className="flex items-center gap-3">
                <div className={`p-2 rounded-full ${isPaid ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-600'}`}>
                    {isPaid ? <CheckCircle size={20}/> : <Clock size={20}/>}
                </div>
                <div>
                    <h4 className={`font-bold text-sm ${isPaid ? 'text-green-800 dark:text-green-200' : 'text-orange-800 dark:text-orange-200'}`}>
                        {isPaid ? 'Payment Complete' : 'Payment Pending'}
                    </h4>
                    <p className={`text-xs opacity-80 ${isPaid ? 'text-green-700 dark:text-green-300' : 'text-orange-700 dark:text-orange-300'}`}>
                        {`Invoice #${existingInvoice.reference}`}
                    </p>
                </div>
            </div>
            <button 
                onClick={onReview}
                className={`w-full sm:w-auto text-xs font-bold px-4 py-2 rounded-lg shadow-sm hover:opacity-80 transition-opacity border ${isPaid ? 'bg-white text-green-700 border-green-200' : 'bg-white text-orange-700 border-orange-200'}`}
            >
                {isPaid ? 'View Receipt' : 'Review & Pay'}
            </button>
        </div>
    );
};
