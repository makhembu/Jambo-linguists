
import React, { useState } from 'react';
import { Modal } from '../../ui/Modal';
import { User, CourseProgress, Course, QuizResult, EnrichedCourse } from '../../../data/types';
import { mockDb } from '../../../data/mockDatabase';
import { X, Calendar, Clock, CheckCircle, Award, Ban, FileText, BarChart2, Download, Loader2 } from 'lucide-react';
import { Badge } from '../../ui/Badge';
import { Button } from '../../ui/Button';
import { generateCertificatePDF } from '../../portal/dashboard/training/pdf/CertificateGenerator';

interface LearnerDetailModalProps {
    learner: { progress: CourseProgress; user: Partial<User> };
    course: Course;
    onClose: () => void;
    onUpdate: () => void;
}

export const LearnerDetailModal = ({ learner, course, onClose, onUpdate }: LearnerDetailModalProps) => {
    const [activeTab, setActiveTab] = useState<'timeline' | 'quizzes' | 'certificate'>('timeline');
    const [isLoading, setIsLoading] = useState(false);
    const [isGenerating, setIsGenerating] = useState(false);

    const { progress, user } = learner;
    const certificate = progress.certificateId ? mockDb.getCertificate(progress.certificateId) : null;

    const handleIssueCertificate = () => {
        if (!user.id) return;
        setIsLoading(true);
        setTimeout(() => {
            mockDb.adminIssueCertificate(user.id!, course.id);
            setIsLoading(false);
            onUpdate();
        }, 800);
    };

    const handleRevokeCertificate = () => {
        if (!certificate) return;
        if (!confirm("Are you sure you want to revoke this certificate?")) return;
        setIsLoading(true);
        setTimeout(() => {
            mockDb.adminRevokeCertificate(certificate.id);
            setIsLoading(false);
            onUpdate();
        }, 800);
    };

    const handleDownloadCertificate = async () => {
        if (isGenerating || !user.firstName || !user.lastName) return;
        setIsGenerating(true);
        try {
            // Construct enriched course object expected by generator
            const enrichedCourse: EnrichedCourse = {
                ...course,
                progress: progress
            };
            // Ensure full User object or sufficient partial
            const targetUser = user as User; 
            await generateCertificatePDF(enrichedCourse, targetUser);
        } catch (e) {
            console.error("Failed to download", e);
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <Modal isOpen={true} onClose={onClose} size="3xl">
            <div className="flex flex-col h-[80vh] bg-white dark:bg-[#1a1625]">
                {/* Header */}
                <div className="p-6 border-b border-gray-100 dark:border-white/5 bg-gray-50/50 dark:bg-white/5 flex justify-between items-start">
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-full bg-jambo-100 dark:bg-jambo-900/30 text-jambo-700 flex items-center justify-center text-2xl font-bold border-2 border-white dark:border-white/10 shadow-sm overflow-hidden">
                            {user.avatarUrl ? <img src={user.avatarUrl} className="w-full h-full object-cover"/> : user.firstName?.[0]}
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white">{user.firstName} {user.lastName}</h2>
                            <p className="text-sm text-gray-500">{user.email}</p>
                            <div className="flex items-center gap-2 mt-2">
                                <Badge variant={progress.status === 'Completed' ? 'success' : 'info'}>{progress.status}</Badge>
                                <span className="text-xs text-gray-400">•</span>
                                <span className="text-xs text-gray-500 font-medium">{progress.progressPercent}% Complete</span>
                            </div>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-white rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition-colors">
                        <X size={20} />
                    </button>
                </div>

                {/* Tabs */}
                <div className="flex border-b border-gray-200 dark:border-white/5 px-6">
                    <button 
                        onClick={() => setActiveTab('timeline')}
                        className={`px-4 py-3 text-sm font-bold border-b-2 transition-colors flex items-center gap-2 ${activeTab === 'timeline' ? 'border-jambo-600 text-jambo-600 dark:text-white' : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400'}`}
                    >
                        <Clock size={16} /> Timeline
                    </button>
                    <button 
                        onClick={() => setActiveTab('quizzes')}
                        className={`px-4 py-3 text-sm font-bold border-b-2 transition-colors flex items-center gap-2 ${activeTab === 'quizzes' ? 'border-jambo-600 text-jambo-600 dark:text-white' : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400'}`}
                    >
                        <BarChart2 size={16} /> Quiz Results
                    </button>
                    <button 
                        onClick={() => setActiveTab('certificate')}
                        className={`px-4 py-3 text-sm font-bold border-b-2 transition-colors flex items-center gap-2 ${activeTab === 'certificate' ? 'border-jambo-600 text-jambo-600 dark:text-white' : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400'}`}
                    >
                        <Award size={16} /> Certificate
                    </button>
                </div>

                {/* Body */}
                <div className="flex-1 overflow-y-auto custom-scrollbar p-6 bg-gray-50 dark:bg-black/10">
                    
                    {activeTab === 'timeline' && (
                        <div className="space-y-6">
                            <div className="grid grid-cols-2 gap-4 mb-4">
                                <div className="bg-white dark:bg-white/5 p-4 rounded-xl border border-gray-200 dark:border-white/10">
                                    <p className="text-xs font-bold text-gray-400 uppercase mb-1">Enrolled</p>
                                    <p className="font-medium text-gray-900 dark:text-white flex items-center gap-2">
                                        <Calendar size={14} className="text-jambo-600" />
                                        {new Date(progress.enrollmentDate).toLocaleString()}
                                    </p>
                                </div>
                                <div className="bg-white dark:bg-white/5 p-4 rounded-xl border border-gray-200 dark:border-white/10">
                                    <p className="text-xs font-bold text-gray-400 uppercase mb-1">Last Active</p>
                                    <p className="font-medium text-gray-900 dark:text-white flex items-center gap-2">
                                        <Clock size={14} className="text-orange-500" />
                                        {progress.lastAccessedAt ? new Date(progress.lastAccessedAt).toLocaleString() : 'Never'}
                                    </p>
                                </div>
                            </div>

                            <div className="bg-white dark:bg-white/5 rounded-xl border border-gray-200 dark:border-white/10 p-6">
                                <h4 className="font-bold text-gray-900 dark:text-white mb-4">Activity Log</h4>
                                <div className="relative border-l-2 border-gray-100 dark:border-white/5 ml-3 space-y-6">
                                    {progress.history?.map((h, i) => (
                                        <div key={i} className="relative pl-6">
                                            <div className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-gray-300 dark:bg-gray-600 border-2 border-white dark:border-[#1a1625]"></div>
                                            <p className="text-sm font-medium text-gray-800 dark:text-gray-200">{h.action}</p>
                                            <p className="text-xs text-gray-400 mt-0.5">{new Date(h.date).toLocaleString()}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'quizzes' && (
                        <div className="space-y-4">
                            {progress.quizResults && progress.quizResults.length > 0 ? (
                                progress.quizResults.map((res, i) => (
                                    <div key={i} className="bg-white dark:bg-white/5 p-4 rounded-xl border border-gray-200 dark:border-white/10 flex justify-between items-center">
                                        <div>
                                            <h4 className="font-bold text-gray-900 dark:text-white text-sm">Lesson Assessment</h4>
                                            <p className="text-xs text-gray-500">{new Date(res.date).toLocaleDateString()}</p>
                                        </div>
                                        <div className="text-right">
                                            <span className={`inline-block px-2 py-1 rounded text-xs font-bold mb-1 ${res.passed ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                                {res.passed ? 'Passed' : 'Failed'}
                                            </span>
                                            <p className="text-sm font-mono text-gray-700 dark:text-gray-300">
                                                {res.score} / {res.totalQuestions}
                                            </p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-12 text-gray-400 bg-white dark:bg-white/5 rounded-xl border border-dashed border-gray-200 dark:border-white/10">
                                    No quiz data recorded.
                                </div>
                            )}
                        </div>
                    )}

                    {activeTab === 'certificate' && (
                        <div className="space-y-6">
                            {certificate ? (
                                <div className="bg-white dark:bg-white/5 p-6 rounded-xl border border-gray-200 dark:border-white/10">
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className={`p-3 rounded-full ${certificate.status === 'Active' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                                            <Award size={32} />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-lg text-gray-900 dark:text-white">
                                                {certificate.status === 'Active' ? 'Certificate Issued' : 'Certificate Revoked'}
                                            </h3>
                                            <p className="text-sm text-gray-500 font-mono">ID: {certificate.id}</p>
                                        </div>
                                        <div className="ml-auto">
                                            <Badge variant={certificate.status === 'Active' ? 'success' : 'danger'}>{certificate.status}</Badge>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                                        <div>
                                            <span className="text-gray-400 block text-xs uppercase font-bold">Issue Date</span>
                                            <span className="font-medium dark:text-gray-200">{new Date(certificate.issueDate).toLocaleDateString()}</span>
                                        </div>
                                        <div>
                                            <span className="text-gray-400 block text-xs uppercase font-bold">Verification Code</span>
                                            <span className="font-mono text-xs dark:text-gray-200">{certificate.verificationCode}</span>
                                        </div>
                                    </div>

                                    {certificate.status === 'Active' && (
                                        <div className="flex gap-3">
                                            <Button 
                                                variant="secondary" 
                                                onClick={handleDownloadCertificate} 
                                                isLoading={isGenerating} 
                                                className="flex-1"
                                                leftIcon={<Download size={16} />}
                                            >
                                                Download PDF
                                            </Button>
                                            <Button 
                                                variant="danger" 
                                                onClick={handleRevokeCertificate} 
                                                isLoading={isLoading} 
                                                className="flex-1"
                                                leftIcon={<Ban size={16} />}
                                            >
                                                Revoke
                                            </Button>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="text-center py-12 bg-white dark:bg-white/5 rounded-xl border border-dashed border-gray-200 dark:border-white/10">
                                    <Award size={48} className="mx-auto text-gray-300 mb-4" />
                                    <h3 className="font-bold text-gray-900 dark:text-white mb-2">No Certificate Issued</h3>
                                    <p className="text-sm text-gray-500 mb-6">The learner has not yet received a certificate for this course.</p>
                                    
                                    <Button onClick={handleIssueCertificate} isLoading={isLoading} disabled={progress.status !== 'Completed'}>
                                        <CheckCircle size={16} /> Issue Certificate Manually
                                    </Button>
                                    {progress.status !== 'Completed' && (
                                        <p className="text-xs text-orange-500 mt-2">User must complete the course first.</p>
                                    )}
                                </div>
                            )}
                        </div>
                    )}

                </div>
            </div>
        </Modal>
    );
};
