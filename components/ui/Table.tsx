import React from 'react';

export const Table = ({ children, className = '' }: { children?: React.ReactNode; className?: string }) => (
  <div className={`w-full overflow-hidden ${className}`}>
    <table className="w-full text-left border-collapse">
      {children}
    </table>
  </div>
);

export const TableHeader = ({ children, className = '' }: { children?: React.ReactNode; className?: string }) => (
  <thead className={`bg-gray-50 dark:bg-white/5 border-b border-gray-200 dark:border-white/5 ${className}`}>
    {children}
  </thead>
);

export const TableBody = ({ children, className = '' }: { children?: React.ReactNode; className?: string }) => (
  <tbody className={`divide-y divide-gray-100 dark:divide-white/5 ${className}`}>
    {children}
  </tbody>
);

export const TableRow: React.FC<{ children?: React.ReactNode; className?: string; onClick?: (e?: any) => void }> = ({ children, className = '', onClick }) => (
  <tr 
    onClick={onClick}
    className={`
      group transition-colors 
      ${onClick ? 'cursor-pointer hover:bg-gray-50 dark:hover:bg-white/5' : ''} 
      ${className}
    `}
  >
    {children}
  </tr>
);

export const TableHead = ({ children, className = '', align = 'left' }: { children?: React.ReactNode; className?: string; align?: 'left' | 'right' | 'center' }) => (
  <th className={`px-6 py-3 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider text-${align} ${className}`}>
    {children}
  </th>
);

export const TableCell = ({ children, className = '', align = 'left' }: { children?: React.ReactNode; className?: string; align?: 'left' | 'right' | 'center' }) => (
  <td className={`px-6 py-4 text-sm text-gray-700 dark:text-gray-200 text-${align} ${className}`}>
    {children}
  </td>
);