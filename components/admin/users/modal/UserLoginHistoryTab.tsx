
import React from 'react';
import { mockDb } from '@/data/mockDatabase';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../../../ui/Table';

export const UserLoginHistoryTab = ({ userId }: { userId: string }) => {
    const history = mockDb.getLoginHistoryForUser(userId);
    const allUsers = mockDb.getAllUsers();

    const getImpersonatorName = (adminId: string) => {
        const admin = allUsers.find(u => u.id === adminId);
        return admin ? `${admin.firstName} ${admin.lastName}` : 'Unknown Admin';
    };

    if (history.length === 0) {
        return (
            <div className="text-center py-12 border border-dashed border-gray-200 dark:border-white/10 rounded-xl">
                <p className="text-gray-400">No login history found for this user.</p>
            </div>
        );
    }

    return (
        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Login Activity</h3>
            <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-white/10">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Date & Time</TableHead>
                            <TableHead>Source</TableHead>
                            <TableHead>IP Address</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {history.map(entry => (
                            <TableRow key={entry.id}>
                                <TableCell className="whitespace-nowrap">
                                    <span className="font-medium text-gray-900 dark:text-white">{new Date(entry.timestamp).toLocaleString()}</span>
                                </TableCell>
                                <TableCell>
                                    {entry.source === 'impersonation' ? (
                                        <div>
                                            <p className="font-bold text-purple-600 dark:text-purple-400">Impersonation</p>
                                            <p className="text-xs text-gray-500">by {getImpersonatorName(entry.impersonatorId!)}</p>
                                        </div>
                                    ) : (
                                        <p className="font-medium text-gray-700 dark:text-gray-300">Direct Login</p>
                                    )}
                                </TableCell>
                                <TableCell className="text-gray-600 dark:text-gray-400 font-mono text-xs">
                                    {entry.ipAddress}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};
