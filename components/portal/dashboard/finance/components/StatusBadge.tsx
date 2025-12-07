
import React from 'react';

export const StatusBadge = ({ status }: { status: string }) => {
    const statusColors: Record<string, string> = {
      'Paid': 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800',
      'Pending': 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400 border-orange-200 dark:border-orange-800',
      'Overdue': 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800',
      'Draft': 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400 border-gray-200 dark:border-gray-700',
  };
  
  // Default to Draft if status unknown
  const colorClass = statusColors[status] || statusColors['Draft'];

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-bold border ${colorClass}`}>
      {status}
    </span>
  );
};
