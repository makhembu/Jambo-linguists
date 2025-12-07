
import React from 'react';
import { Job, Invoice } from '@/data/types';
import { mockDb } from '@/data/mockDatabase';
import { Star, AlertCircle } from 'lucide-react';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../../../ui/Table';
import { Badge } from '../../../ui/Badge';

interface AdminJobsTableProps {
    jobs: Job[];
    invoices: Invoice[];
    onJobSelect: (job: Job) => void;
    onLinguistSelect: (e: React.MouseEvent, linguistId: string) => void;
    getStatusColor: (status: string) => string;
}

export const AdminJobsTable = ({ jobs, invoices, onJobSelect, onLinguistSelect, getStatusColor }: AdminJobsTableProps) => {
    // Mock score generator
    const getConfidence = (id: string) => (4 + (id.length % 10) / 10).toFixed(1);

    const getRateDisplay = (job: Job) => {
        if (job.totalPayout) return `£${job.totalPayout.toFixed(2)}`;
        
        if (job.category === 'Translation' && job.wordRate !== undefined) {
            return `${(job.wordRate * 100).toString()}p/word`; 
        }
        if (job.category === 'Interpreting' && job.hourlyRate) {
            return `£${job.hourlyRate.toFixed(2)}/hr`;
        }
        if (job.category === 'Transcription' && job.minuteRate) {
            return `£${job.minuteRate.toFixed(2)}/min`;
        }
        if (job.fixedRate) {
            return `£${job.fixedRate.toFixed(2)} Fixed`;
        }
        return job.rate;
    };

    const getBadgeVariant = (status: string) => {
        switch (status) {
            case 'Completed': return 'success';
            case 'Pending Approval': return 'warning';
            case 'Scheduled': 
            case 'In Progress': return 'info';
            case 'Cancelled': return 'neutral';
            default: return 'brand';
        }
    };

    return (
        <div className="hidden md:block">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Ref ID</TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Linguist</TableHead>
                        <TableHead>Financials</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {jobs.map(job => {
                        const invoice = invoices.find(i => i.items.some(item => item.jobId === job.id));
                        const linguist = job.linguistId ? mockDb.getAllUsers().find(u => u.id === job.linguistId) : null;
                        return (
                            <TableRow key={job.id} onClick={() => onJobSelect(job)}>
                                <TableCell className="font-mono text-xs text-gray-500">
                                    {job.id}
                                </TableCell>
                                <TableCell className="font-medium text-gray-900 dark:text-white max-w-[200px]">
                                    <div className="truncate">{job.title}</div>
                                    <span className="block text-xs text-gray-500 font-normal">{job.category}</span>
                                </TableCell>
                                <TableCell>
                                    <Badge variant={getBadgeVariant(job.status)}>
                                        {job.status}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-gray-600 dark:text-gray-400">
                                    {new Date(job.date).toLocaleDateString()}
                                </TableCell>
                                <TableCell>
                                    {linguist ? (
                                        <div onClick={(e) => onLinguistSelect(e, linguist.id)} className="flex items-center gap-2 group cursor-pointer">
                                            <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-white/10 flex items-center justify-center overflow-hidden border-2 border-white dark:border-gray-800 shrink-0">
                                                {linguist.avatarUrl ? (
                                                    <img src={linguist.avatarUrl} className="w-full h-full object-cover" alt={`${linguist.firstName}'s avatar`} />
                                                ) : (
                                                    <span className="text-xs font-bold text-gray-500">{linguist.firstName[0]}{linguist.lastName[0]}</span>
                                                )}
                                            </div>
                                            <div className="min-w-0">
                                                <p className="font-bold text-gray-900 dark:text-white text-sm truncate group-hover:text-jambo-600 dark:group-hover:text-jambo-400 transition-colors">
                                                    {linguist.firstName} {linguist.lastName}
                                                </p>
                                                <p className="text-[10px] text-orange-500 font-bold flex items-center gap-0.5">
                                                    <Star size={10} fill="currentColor" /> {getConfidence(linguist.id)} Confidence
                                                </p>
                                            </div>
                                        </div>
                                    ) : (
                                        <span className="text-orange-500 text-xs italic">Unassigned</span>
                                    )}
                                </TableCell>
                                <TableCell className="font-bold text-gray-900 dark:text-white">
                                    {job.status === 'Completed' && invoice?.status !== 'Paid' ? (
                                        <div className="flex flex-col">
                                            <span className="text-orange-600 text-xs flex items-center gap-1"><AlertCircle size={10}/> Payment Due</span>
                                            <span className="text-[10px] text-gray-400">Inv: {invoice?.reference}</span>
                                        </div>
                                    ) : (
                                        <span>{getRateDisplay(job)}</span>
                                    )}
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </div>
    );
};
