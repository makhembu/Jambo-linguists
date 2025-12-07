
import React, { useState } from 'react';
import { Award, Download, Calendar, Loader2 } from 'lucide-react';
import { EnrichedCourse } from '@/data/types';
import { mockDb } from '@/data/mockDatabase';
import { generateCertificatePDF } from '../pdf/CertificateGenerator';
import { Card } from '../../../../ui/Card';

export interface CertificateCardProps {
  course: EnrichedCourse;
}

export const CertificateCard: React.FC<CertificateCardProps> = ({ course }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const user = mockDb.auth.getCurrentUser();

  const completedDate = course.progress?.completedAt 
    ? new Date(course.progress.completedAt).toLocaleDateString('en-GB') 
    : 'Unknown';

  const handleDownload = async () => {
    if (isGenerating || !user) return;
    setIsGenerating(true);
    try {
      await generateCertificatePDF(course, user);
    } catch (e) {
      console.error("CertificateCard: Failed to generate certificate PDF:", e);
      alert("Failed to generate certificate. Please check console for details.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Card className="p-6 flex flex-col md:flex-row gap-6 items-center group" hoverEffect={true}>
       {/* Icon Side */}
       <div className="group-hover:scale-105 transition-transform">
          <div className="w-24 h-24 rounded-xl flex items-center justify-center bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400 border border-yellow-200 dark:border-yellow-800">
             <Award size={48} />
          </div>
       </div>

       {/* Content */}
       <div className="flex-1 text-center md:text-left">
          <h3 className="text-xl font-serif font-bold text-gray-900 dark:text-white mb-2">{course.title} Certificate</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 max-w-lg">
             Issued to certify the successful completion of the {course.category} training module containing {course.lessonsCount} lessons.
          </p>
          
          <div className="flex items-center justify-center md:justify-start gap-4 text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500">
             <span className="flex items-center gap-1.5"><Calendar size={14}/> Issued: {completedDate}</span>
             <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
             <span>ID: {course.progress?.courseId.toUpperCase()}</span>
          </div>
       </div>

       {/* Action */}
       <button 
          onClick={handleDownload}
          disabled={isGenerating}
          className="shrink-0 bg-gray-100 dark:bg-white/5 hover:bg-jambo-50 dark:hover:bg-white/10 text-gray-700 dark:text-gray-300 hover:text-jambo-600 dark:hover:text-jambo-400 font-bold px-6 py-3 rounded-xl border border-gray-200 dark:border-white/10 transition-colors flex items-center gap-2 disabled:opacity-60"
        >
           {isGenerating ? <Loader2 size={18} className="animate-spin" /> : <Download size={18} />} 
           {isGenerating ? 'Generating...' : 'Download'}
       </button>
    </Card>
  );
};
