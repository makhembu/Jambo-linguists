
import React, { useState } from 'react';
import { Award, Download, ArrowLeft, Loader2 } from 'lucide-react';
import { EnrichedCourse } from '@/data/types';
import { mockDb } from '@/data/mockDatabase';
import { generateCertificatePDF } from '../pdf/CertificateGenerator';

interface CourseCertificateProps {
  course: EnrichedCourse;
  onBack: () => void;
}

export const CourseCertificate = ({ course, onBack }: CourseCertificateProps) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const user = mockDb.auth.getCurrentUser();

  const handleDownload = async () => {
    if (isGenerating || !user) return;
    setIsGenerating(true);
    try {
      await generateCertificatePDF(course, user);
    } catch (e) {
      console.error("CourseCertificate: Failed to generate certificate PDF:", e);
      alert("Failed to generate certificate. Please check console for details.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-full py-20 px-6 text-center animate-in zoom-in duration-500">
        <div className="mb-8 relative">
            <div className="absolute inset-0 border-4 border-yellow-400 dark:border-yellow-600 rounded-full animate-ping opacity-20"></div>
            <div className="w-24 h-24 rounded-full bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400 flex items-center justify-center p-6 border border-yellow-200 dark:border-yellow-800">
                <Award size={48} />
            </div>
        </div>

        <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 dark:text-white mb-4">
            Congratulations!
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-xl mx-auto mb-10 leading-relaxed">
            You have successfully completed <strong>{course.title}</strong>. Your profile has been updated with this qualification.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
            <button 
                onClick={handleDownload}
                disabled={isGenerating}
                className="bg-jambo-600 hover:bg-jambo-700 text-white font-bold py-4 px-8 rounded-xl shadow-lg flex items-center justify-center gap-2 transition-transform hover:scale-105 disabled:opacity-60"
            >
                {isGenerating ? <Loader2 size={20} className="animate-spin" /> : <Download size={20} />}
                {isGenerating ? 'Generating...' : 'Download Certificate'}
            </button>
            <button 
                onClick={onBack}
                className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-700 dark:text-white font-bold py-4 px-8 rounded-xl hover:bg-gray-50 dark:hover:bg-white/10 transition-colors flex items-center justify-center gap-2"
            >
                <ArrowLeft size={20} /> Review Course
            </button>
        </div>
    </div>
  );
};
