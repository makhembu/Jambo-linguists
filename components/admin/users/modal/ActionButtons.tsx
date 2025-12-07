
import React from 'react';
import { LogIn, CheckCircle, Ban } from 'lucide-react';
import { User } from '../../../../../data/types';

interface ActionButtonsProps {
  user: User;
  onLoginAsUser: () => void;
  onApprove: () => void;
  onSuspend: () => void;
  processing: boolean;
}

export const ActionButtons = ({ user, onLoginAsUser, onApprove, onSuspend, processing }: ActionButtonsProps) => {
  return (
    <>
      {/* Desktop Actions - Positioned absolutely in parent relative container */}
      <div className="hidden lg:flex flex-col gap-3 items-end absolute top-0 right-0 -mt-20 lg:mt-0 lg:relative">
          <button
              onClick={onLoginAsUser}
              className="w-full px-4 py-2.5 rounded-xl text-xs font-bold bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/10 text-gray-700 dark:text-gray-200 transition-all flex items-center justify-center gap-2 shadow-sm hover:shadow-md"
          >
              <LogIn size={14} /> Login as {user.firstName}
          </button>
          
          <div className="flex gap-2 w-full justify-end">
              {!user.isVerified && (
                  <button 
                      onClick={onApprove}
                      disabled={processing}
                      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl text-xs font-bold shadow-md transition-colors disabled:opacity-70 flex items-center gap-2"
                  >
                      <CheckCircle size={14} /> Approve
                  </button>
              )}
              <button 
                  onClick={onSuspend}
                  disabled={processing}
                  className={`px-4 py-2 rounded-xl text-xs font-bold border transition-colors flex items-center gap-2 ${user.isSuspended 
                      ? 'bg-blue-50 text-blue-600 border-blue-200 hover:bg-blue-100 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800' 
                      : 'bg-white text-red-600 border-red-200 hover:bg-red-50 dark:bg-transparent dark:text-red-400 dark:border-red-800 hover:shadow-sm'
                  }`}
              >
                  <Ban size={14} /> {user.isSuspended ? 'Reactivate' : 'Suspend'}
              </button>
          </div>
      </div>

      {/* Mobile Actions Footer */}
      <div className="lg:hidden pt-8 mt-8 border-t border-gray-100 dark:border-white/5 flex flex-col gap-3">
          <button 
              onClick={onLoginAsUser}
              className="w-full py-3 rounded-xl font-bold border border-gray-200 dark:border-white/20 text-gray-700 dark:text-white flex items-center justify-center gap-2 bg-gray-50 dark:bg-white/5"
          >
              <LogIn size={16} /> Login as {user.firstName}
          </button>
          <div className="grid grid-cols-2 gap-3">
              {!user.isVerified ? (
                  <>
                    <button 
                        onClick={onApprove}
                        disabled={processing}
                        className="bg-green-600 text-white py-3 rounded-xl font-bold shadow-lg disabled:opacity-70 flex items-center justify-center gap-2"
                    >
                        <CheckCircle size={16} /> Approve
                    </button>
                    <button 
                        onClick={onSuspend}
                        disabled={processing}
                        className={`py-3 rounded-xl font-bold border flex items-center justify-center gap-2 ${user.isSuspended ? 'bg-blue-50 text-blue-600 border-blue-200' : 'bg-white text-red-600 border-red-200'}`}
                    >
                        <Ban size={16} /> {user.isSuspended ? 'Reactivate' : 'Suspend'}
                    </button>
                  </>
              ) : (
                 <button 
                    onClick={onSuspend}
                    disabled={processing}
                    className={`col-span-2 py-3 rounded-xl font-bold border flex items-center justify-center gap-2 ${user.isSuspended ? 'bg-blue-50 text-blue-600 border-blue-200' : 'bg-white text-red-600 border-red-200'}`}
                >
                    <Ban size={16} /> {user.isSuspended ? 'Reactivate User' : 'Suspend Account'}
                </button>
              )}
          </div>
      </div>
    </>
  );
};
