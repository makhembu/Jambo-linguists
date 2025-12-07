import React from 'react';
import { Eye, Download, CheckCircle, FileText, Loader2 } from 'lucide-react';
import { Invoice } from '@/data/types';
import { mockDb } from '@/data/mockDatabase';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../../ui/Table';
import { Badge } from '../../ui/Badge';
import { generateInvoicePDF } from '../../portal/dashboard/finance/pdfGenerator';

interface AdminInvoiceTableProps {
  invoices: Invoice[];
  onView: (invoice: Invoice) => void;
  onMarkPaid: (invoiceId: string) => void;
  onUserSelect: (userId: string) => void;
}

export const AdminInvoiceTable = ({ invoices, onView, onMarkPaid, onUserSelect }: AdminInvoiceTableProps) => {
  const users = mockDb.getAllUsers();
  const [downloadingId, setDownloadingId] = React.useState<string | null>(null);

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'Paid': return 'success';
      case 'Pending': return 'warning';
      case 'Overdue': return 'danger';
      default: return 'neutral';
    }
  };

  const handleDownload = async (e: React.MouseEvent, invoice: Invoice, user: any) => {
      e.stopPropagation();
      setDownloadingId(invoice.id);
      try {
          await generateInvoicePDF(invoice, user);
      } finally {
          setDownloadingId(null);
      }
  }

  return (
    <div className="bg-white dark:bg-[#13111c] rounded-xl shadow-sm border border-gray-200 dark:border-white/5 overflow-hidden">
      {/* Mobile Card View (Hidden on Tablet+) */}
      <div className="md:hidden divide-y divide-gray-100 dark:divide-white/5">
        {invoices.map((inv) => {
          const user = users.find(u => u.id === inv.userId);
          return (
            <div key={inv.id} className="p-4 flex flex-col gap-3 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors" onClick={() => onView(inv)}>
              <div className="flex justify-between items-start">
                <div>
                  <Badge variant={getStatusVariant(inv.status)}>{inv.status}</Badge>
                  <h4 className="font-bold text-gray-900 dark:text-white mt-2">{inv.reference}</h4>
                  <p className="text-xs text-gray-500">{new Date(inv.date).toLocaleDateString()}</p>
                </div>
                <div className="text-right">
                  <p className="font-mono font-bold text-gray-900 dark:text-white">£{inv.amount.toFixed(2)}</p>
                  <p className="text-[10px] text-gray-400 mt-1">Due: {new Date(inv.dueDate).toLocaleDateString()}</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between border-t border-gray-100 dark:border-white/5 pt-3">
                <div className="flex items-center gap-2">
                   {user && (
                     <div 
                        className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-white/10 p-1 rounded transition-colors"
                        onClick={(e) => { e.stopPropagation(); onUserSelect(user.id); }}
                     >
                        <div className="w-6 h-6 rounded-full bg-gray-200 dark:bg-white/10 flex items-center justify-center text-[10px] font-bold overflow-hidden">
                           {user.avatarUrl ? <img src={user.avatarUrl} className="w-full h-full object-cover"/> : user.firstName[0]}
                        </div>
                        <span className="text-xs font-bold text-gray-700 dark:text-gray-300 hover:text-jambo-600 dark:hover:text-jambo-400">{user.firstName} {user.lastName}</span>
                     </div>
                   )}
                </div>
                <div className="flex gap-2">
                   {inv.status !== 'Paid' && (
                      <button 
                        onClick={(e) => { e.stopPropagation(); onMarkPaid(inv.id); }}
                        className="p-1.5 bg-green-50 text-green-600 rounded border border-green-100 dark:bg-green-900/20 dark:border-green-800"
                      >
                        <CheckCircle size={16} />
                      </button>
                   )}
                   <button className="p-1.5 text-gray-400"><Eye size={16} /></button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Reference</TableHead>
              <TableHead>Issued To</TableHead>
              <TableHead>Dates</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead align="right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices.map((inv) => {
              const user = users.find(u => u.id === inv.userId);
              return (
                <TableRow key={inv.id} onClick={() => onView(inv)}>
                  <TableCell>
                    <span className="font-mono text-xs font-bold text-gray-900 dark:text-white">{inv.reference}</span>
                    <span className="block text-[10px] text-gray-400">{inv.items.length} Line Item{inv.items.length !== 1 ? 's' : ''}</span>
                  </TableCell>
                  <TableCell>
                    {user ? (
                      <div 
                        className="flex items-center gap-3 p-1 -ml-1 rounded hover:bg-white dark:hover:bg-white/10 transition-colors cursor-pointer w-fit"
                        onClick={(e) => { e.stopPropagation(); onUserSelect(user.id); }}
                        title="View Profile"
                      >
                        <div className="w-8 h-8 rounded-full bg-jambo-100 dark:bg-jambo-900/30 text-jambo-700 dark:text-jambo-300 flex items-center justify-center text-xs font-bold border border-jambo-200 dark:border-jambo-800/50">
                          {user.avatarUrl ? <img src={user.avatarUrl} className="w-full h-full object-cover rounded-full"/> : user.firstName[0]}
                        </div>
                        <div>
                          <p className="font-bold text-gray-900 dark:text-white leading-none hover:text-jambo-600 dark:hover:text-jambo-400 transition-colors">{user.firstName} {user.lastName}</p>
                          <p className="text-[10px] text-gray-500 dark:text-gray-400 mt-0.5">{user.email}</p>
                        </div>
                      </div>
                    ) : (
                      <span className="text-gray-400 italic">Unknown User</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="text-xs text-gray-600 dark:text-gray-400 space-y-0.5">
                      <p><span className="text-gray-400 w-10 inline-block">Issued:</span> {new Date(inv.date).toLocaleDateString()}</p>
                      <p><span className="text-gray-400 w-10 inline-block">Due:</span> {new Date(inv.dueDate).toLocaleDateString()}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="font-mono font-bold text-gray-900 dark:text-white">£{inv.amount.toFixed(2)}</span>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStatusVariant(inv.status)}>{inv.status}</Badge>
                  </TableCell>
                  <TableCell align="right">
                    <div className="flex items-center justify-end gap-2">
                        {inv.status !== 'Paid' && (
                            <button 
                                onClick={(e) => { e.stopPropagation(); onMarkPaid(inv.id); }}
                                className="text-xs font-bold text-green-600 hover:text-green-700 hover:underline bg-green-50 dark:bg-green-900/20 px-3 py-1.5 rounded-lg border border-green-100 dark:border-green-900/30 flex items-center gap-1 transition-colors"
                            >
                                <CheckCircle size={12} /> Pay
                            </button>
                        )}
                        <button onClick={(e) => handleDownload(e, inv, user)} className="p-2 text-gray-400 hover:text-jambo-600 dark:hover:text-white transition-colors">
                            {downloadingId === inv.id ? <Loader2 size={16} className="animate-spin" /> : <Download size={16} />}
                        </button>
                        <button className="p-2 text-gray-400 hover:text-jambo-600 dark:hover:text-white transition-colors">
                            <Eye size={16} />
                        </button>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};