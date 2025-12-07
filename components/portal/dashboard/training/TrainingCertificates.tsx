
import React from 'react';
import { mockDb } from '@/data/mockDatabase';
import { CertificateCard } from './components/CertificateCard';
import { Award } from 'lucide-react';

export const TrainingCertificates = () => {
  const certificates = mockDb.getCertificates();

  return (
    <div className="animate-in fade-in duration-500 pb-12">
        <div className="mb-6 md:mb-8">
            <h2 className="text-2xl md:text-4xl font-serif font-bold text-jambo-950 dark:text-white mb-2">My Certificates</h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm md:text-lg">View and download your earned credentials.</p>
        </div>

        {certificates.length === 0 ? (
             <div className="flex flex-col items-center justify-center py-24 bg-white dark:bg-[#1a1625] rounded-2xl border border-dashed border-gray-200 dark:border-white/10 text-center">
                <div className="w-20 h-20 bg-gray-100 dark:bg-white/5 rounded-full flex items-center justify-center mb-6">
                    <Award size={32} className="text-gray-300 dark:text-gray-500" />
                </div>
                <h3 className="text-xl font-bold text-gray-400 dark:text-gray-500 font-serif">No certificates yet</h3>
                <p className="text-gray-400 dark:text-gray-600 mt-2 max-w-sm">Complete training modules to earn recognized certificates for your profile.</p>
            </div>
        ) : (
            <div className="space-y-4">
                {certificates.map(course => (
                    <CertificateCard key={course.id} course={course} />
                ))}
            </div>
        )}
    </div>
  );
};
