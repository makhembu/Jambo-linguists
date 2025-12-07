
import React, { useState } from 'react';
import { Search, UserPlus } from 'lucide-react';
import { mockDb, User } from '../../../data/mockDatabase';
import { AddUserModal } from './AddUserModal';
import { UserProfileModal } from './UserProfileModal';
import { UserCard } from './UserCard';
import { Button } from '../../ui/Button';
import { Input } from '../../ui/Input';
import { TabsList, TabsTrigger } from '../../ui/Tabs';

type UserViewType = 'active' | 'pending' | 'removed';

interface AdminUsersProps {
    onNavigate: (page: string) => void;
}

export const AdminUsers = ({ onNavigate }: AdminUsersProps) => {
  const [users, setUsers] = useState<User[]>(mockDb.getAllUsers());
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<UserViewType>('active');
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const refreshData = () => {
      setUsers(mockDb.getAllUsers());
  };

  const filteredUsers = users.filter(user => {
      // 1. Tab Logic
      if (activeTab === 'active') {
          if (!user.isVerified || user.isSuspended) return false;
      } else if (activeTab === 'pending') {
          if (user.isVerified || user.isSuspended) return false;
      } else if (activeTab === 'removed') {
          if (!user.isSuspended) return false;
      }

      // 2. Search Logic
      const term = searchTerm.toLowerCase();
      return (
        user.firstName.toLowerCase().includes(term) || 
        user.lastName.toLowerCase().includes(term) ||
        user.email.toLowerCase().includes(term) ||
        (user.role && user.role.toLowerCase().includes(term))
      );
  });

  const toggleVerification = (userId: string, isVerified: boolean) => {
      mockDb.adminUpdateUserVerification(userId, isVerified);
      refreshData();
  };

  const toggleSuspension = (userId: string, isSuspended: boolean) => {
      mockDb.adminSuspendUser(userId, isSuspended);
      refreshData();
  };

  return (
    <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between gap-4">
            <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Directory</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">Manage company users, linguists, and clients.</p>
            </div>
            <Button 
                onClick={() => setIsAddUserOpen(true)}
                leftIcon={<UserPlus size={18} />}
            >
                Add User
            </Button>
        </div>

        {/* Tab Navigation */}
        <TabsList>
            <TabsTrigger active={activeTab === 'active'} onClick={() => setActiveTab('active')}>Active Users</TabsTrigger>
            <TabsTrigger active={activeTab === 'pending'} onClick={() => setActiveTab('pending')}>Pending Approval</TabsTrigger>
            <TabsTrigger active={activeTab === 'removed'} onClick={() => setActiveTab('removed')}>Suspended</TabsTrigger>
        </TabsList>

        {/* Filters */}
        <div className="bg-white dark:bg-[#13111c] p-4 rounded-xl shadow-sm border border-gray-200 dark:border-white/5 flex gap-4">
            <div className="relative flex-1">
                <Input 
                    placeholder="Search by Name, Email, Role..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    leftIcon={<Search size={16} />}
                />
            </div>
        </div>

        {/* Directory Grid */}
        {filteredUsers.length === 0 ? (
            <div className="py-12 text-center bg-white dark:bg-[#13111c] rounded-xl border border-dashed border-gray-200 dark:border-white/10">
                <div className="inline-flex p-4 rounded-full bg-gray-50 dark:bg-white/5 text-gray-400 mb-3">
                    <Search size={24} />
                </div>
                <p className="text-gray-500 dark:text-gray-400">No users found in this section.</p>
            </div>
        ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredUsers.map(user => (
                    <UserCard 
                        key={user.id}
                        user={user}
                        activeTab={activeTab}
                        onToggleSuspension={toggleSuspension}
                        onToggleVerification={toggleVerification}
                        onViewProfile={setSelectedUser}
                    />
                ))}
            </div>
        )}

        {/* Modals */}
        {isAddUserOpen && (
            <AddUserModal 
                onClose={() => setIsAddUserOpen(false)} 
                onUserAdded={refreshData}
            />
        )}

        {selectedUser && (
            <UserProfileModal 
                user={selectedUser} 
                onClose={() => setSelectedUser(null)} 
                onUpdate={refreshData}
                onNavigate={onNavigate}
            />
        )}
    </div>
  );
};
