
import React, { useState } from 'react';
import { Invoice } from '../../../../data/types';
import { InvoiceRow } from './InvoiceRow';
import { Filter, Search } from 'lucide-react';
import { Input } from '../../../ui/Input';

interface InvoiceListProps {
  invoices: Invoice[];
  onInvoiceSelect: (invoice: Invoice) => void; // Add this prop
}

export const InvoiceList = ({ invoices, onInvoiceSelect }: InvoiceListProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const filteredInvoices = invoices.filter(inv => {
      const matchesStatus = statusFilter === 'All' || inv.status === statusFilter;
      const matchesSearch = searchTerm === '' ||
          inv.reference.toLowerCase().includes(searchTerm.toLowerCase()) || 
          inv.amount.toString().includes(searchTerm);
      return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-2">
            <h3 className="text-lg font-serif font-bold text-gray-900 dark:text-white">Recent Invoices</h3>
            
            <div className="flex items-center gap-3 w-full sm:w-auto">
                <div className="relative flex-grow sm:flex-grow-0 w-full sm:w-64">
                    <Input 
                        placeholder="Search ref, amount..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        leftIcon={<Search size={14} />}
                    />
                </div>
                <div className="relative">
                  <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="w-full sm:w-36 appearance-none bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-200 text-sm font-medium rounded-lg pl-9 pr-8 py-2.5 focus:outline-none focus:ring-1 focus:ring-jambo-600 focus:border-jambo-600 transition-colors cursor-pointer"
                  >
                      <option value="All">All Statuses</option>
                      <option value="Paid">Paid</option>
                      <option value="Pending">Pending</option>
                      <option value="Overdue">Overdue</option>
                  </select>
                  <Filter size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
            </div>
        </div>

        {filteredInvoices.length === 0 ? (
            <div className="text-center py-12 bg-white dark:bg-[#1a1625] rounded-xl border border-dashed border-gray-200 dark:border-white/10">
                <p className="text-gray-400">No invoices found matching your criteria.</p>
            </div>
        ) : (
            <div className="flex flex-col gap-3">
                {filteredInvoices.map(inv => (
                    <InvoiceRow 
                      key={inv.id} 
                      invoice={inv} 
                      onSelect={() => onInvoiceSelect(inv)} 
                    />
                ))}
            </div>
        )}
    </div>
  );
};
