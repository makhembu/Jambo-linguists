
import React, { useState } from 'react';
import { mockDb, User } from '../../../data/mockDatabase';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../../ui/Table';
import { Button } from '../../ui/Button';
import { UserPlus, Trash2, ShieldCheck, Mail } from 'lucide-react';
import { AddUserModal } from '../users/AddUserModal';

export const AdminManagementTab = () => {
  const [admins, setAdmins] = useState<User[]>(mockDb.getAllUsers().filter(u => u.role === 'admin'));
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const currentUser = mockDb.auth.getCurrentUser();

  const refreshAdmins = () => {
      setAdmins(mockDb.getAllUsers().filter(u => u.role === 'admin'));
  };

  const handleDemote = (adminId: string) => {
      if (adminId === currentUser?.id) {
          alert("You cannot remove your own admin privileges.");
          return;
      }
      if (confirm("Are you sure you want to remove admin privileges from this user? They will become a standard linguist.")) {
          mockDb.adminUpdateUser(adminId, { role: 'linguist' });
          refreshAdmins();
      }
  };

  return (
    <div className="space-y-6">
        <div className="flex justify-between items-center bg-white dark:bg-[#1a1625] p-6 rounded-xl border border-gray-200 dark:border-white/5 shadow-sm">
            <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Administrator Accounts</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Manage who has access to the Admin Portal.</p>
            </div>
            <Button onClick={() => setIsAddModalOpen(true)} leftIcon={<UserPlus size={18} />}>
                Add New Admin
            </Button>
        </div>

        <div className="bg-white dark:bg-[#1a1625] rounded-xl border border-gray-200 dark:border-white/5 overflow-hidden">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>User</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Last Active</TableHead>
                        <TableHead align="right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {admins.map(admin => (
                        <TableRow key={admin.id}>
                            <TableCell>
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-jambo-100 dark:bg-jambo-900/30 text-jambo-700 dark:text-jambo-300 flex items-center justify-center text-xs font-bold border border-jambo-200 dark:border-jambo-800">
                                        {admin.avatarUrl ? <img src={admin.avatarUrl} className="w-full h-full object-cover rounded-full"/> : admin.firstName[0]}
                                    </div>
                                    <span className="font-bold text-gray-900 dark:text-white">{admin.firstName} {admin.lastName}</span>
                                </div>
                            </TableCell>
                            <TableCell>
                                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300 text-sm">
                                    <Mail size={14} className="text-gray-400" /> {admin.email}
                                </div>
                            </TableCell>
                            <TableCell>
                                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-purple-100 text-purple-700 border border-purple-200 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-800">
                                    <ShieldCheck size={12} /> Admin
                                </span>
                            </TableCell>
                            <TableCell>
                                <span className="text-gray-500 text-xs">Today</span>
                            </TableCell>
                            <TableCell align="right">
                                {admin.id !== currentUser?.id && (
                                    <button 
                                        onClick={() => handleDemote(admin.id)}
                                        className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 p-2 rounded-lg transition-colors"
                                        title="Remove Admin Access"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                )}
                                {admin.id === currentUser?.id && (
                                    <span className="text-xs text-gray-400 italic mr-2">Current User</span>
                                )}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>

        {isAddModalOpen && (
            <AddUserModal 
                onClose={() => setIsAddModalOpen(false)}
                onUserAdded={refreshAdmins}
            />
        )}
    </div>
  );
};
