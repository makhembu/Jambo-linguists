
import React from 'react';
import { CreditCard, Lock, Edit2 } from 'lucide-react';
import { User } from '@/data/types';
import { IconBox } from '../../../ui/IconBox';

interface BankDetailsCardProps {
  user: User | null;
}

export const BankDetailsCard = ({ user }: BankDetailsCardProps) => {
  if (!user) return null;

  return (
    <div className="bg-gradient-to-b from-gray-900 to-gray-800 dark:from-[#2a2438] dark:to-[#1a1625] rounded-2xl p-6 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-32 bg-white/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
        
        <div className="flex items-center justify-between mb-6 relative z-10">
            <div className="flex items-center gap-3">
                <IconBox icon={CreditCard} variant="glass" size="md" />
                <h3 className="font-bold text-sm uppercase tracking-wide">Payout Account</h3>
            </div>
            <button className="p-2 hover:bg-white/10 rounded-lg transition-colors text-gray-400 hover:text-white">
                <Edit2 size={16} />
            </button>
        </div>

        <div className="space-y-4 relative z-10 mb-8">
            <div>
                <p className="text-xs text-gray-400 font-bold uppercase mb-1">Bank Name</p>
                <p className="text-lg font-medium">{user.bankDetails?.bankName || 'Not Set'}</p>
            </div>
            <div>
                <p className="text-xs text-gray-400 font-bold uppercase mb-1">Account Number</p>
                <p className="text-lg font-mono tracking-wider">{user.bankDetails?.accountNumber || '**** ****'}</p>
            </div>
            <div>
                <p className="text-xs text-gray-400 font-bold uppercase mb-1">Sort Code</p>
                <p className="text-lg font-mono tracking-wider">{user.bankDetails?.sortCode || '**-**-**'}</p>
            </div>
        </div>

        <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3 flex items-start gap-3 relative z-10">
             <Lock size={16} className="text-green-400 shrink-0 mt-0.5" />
             <div>
                <p className="text-xs font-bold text-green-400 mb-0.5">Secure Details</p>
                <p className="text-[10px] text-green-200/70 leading-tight">Your payment information is encrypted and stored securely.</p>
             </div>
        </div>
    </div>
  );
};
