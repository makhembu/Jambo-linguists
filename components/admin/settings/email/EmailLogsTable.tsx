
import React, { useState, useEffect } from 'react';
import { mockDb } from '../../../../data/mockDatabase';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../../../ui/Table';
import { Badge } from '../../../ui/Badge';
import { RefreshCw } from 'lucide-react';

export const EmailLogsTable = () => {
  const [logs, setLogs] = useState(mockDb.emailLogs);

  const refresh = () => {
      setLogs([...mockDb.emailLogs]); // Trigger re-render
  };

  // Poll for updates every 5s for demo purposes or just use refresh button
  useEffect(() => {
      const interval = setInterval(refresh, 5000);
      return () => clearInterval(interval);
  }, []);

  if (logs.length === 0) {
      return (
          <div className="p-8 text-center text-gray-400 text-sm">
              No emails have been sent yet.
          </div>
      );
  }

  return (
    <div className="flex flex-col">
        <div className="flex justify-end p-2 bg-gray-50 dark:bg-white/5 border-b border-gray-100 dark:border-white/5">
            <button onClick={refresh} className="text-xs text-gray-500 flex items-center gap-1 hover:text-jambo-600">
                <RefreshCw size={12} /> Refresh
            </button>
        </div>
        <div className="overflow-x-auto">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Time</TableHead>
                        <TableHead>Recipient</TableHead>
                        <TableHead>Template</TableHead>
                        <TableHead>Subject</TableHead>
                        <TableHead>Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {logs.map(log => (
                        <TableRow key={log.id}>
                            <TableCell className="whitespace-nowrap text-gray-500 text-xs">
                                {new Date(log.sentAt).toLocaleString()}
                            </TableCell>
                            <TableCell className="font-medium">{log.recipientEmail}</TableCell>
                            <TableCell>
                                <span className="font-mono text-xs text-gray-500 bg-gray-100 dark:bg-white/10 px-1.5 py-0.5 rounded">
                                    {log.templateId}
                                </span>
                            </TableCell>
                            <TableCell className="max-w-[200px] truncate text-gray-600 dark:text-gray-300">
                                {log.subject}
                            </TableCell>
                            <TableCell>
                                <Badge variant={log.status === 'Sent' ? 'success' : 'danger'}>{log.status}</Badge>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    </div>
  );
};
