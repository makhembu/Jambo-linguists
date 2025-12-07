
import React, { useRef, useState, useEffect } from 'react';
import { LayoutDashboard, Briefcase, MessageSquare, Wallet, User, LogOut } from 'lucide-react';
import { mockDb } from '../../../data/mockDatabase';

interface BottomNavProps {
  activeSection: string;
  onNavigate: (section: string) => void;
  onLogout: () => void;
}

export const BottomNav = ({ activeSection, onNavigate, onLogout }: BottomNavProps) => {
  const unreadCount = mockDb.auth.getCurrentUser() 
    ? mockDb.getGlobalUnreadCount(mockDb.auth.getCurrentUser()!.id) 
    : 0;

  const [showLogout, setShowLogout] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const navItems = [
    { id: 'dashboard', label: 'Home', icon: LayoutDashboard },
    { id: 'jobs-available', label: 'Jobs', icon: Briefcase, match: ['jobs-available', 'jobs-bookings', 'jobs-history', 'jobs-calendar', 'jobs'] },
    { id: 'messages', label: 'Messages', icon: MessageSquare, badge: unreadCount },
    { id: 'finance', label: 'Wallet', icon: Wallet },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  const handlePointerDown = (id: string) => {
    if (id === 'profile') {
      timerRef.current = setTimeout(() => {
        setShowLogout(true);
      }, 600); // 600ms threshold for long press
    }
  };

  const handlePointerUp = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  const handleLogout = () => {
      mockDb.auth.logout();
      onLogout();
      setShowLogout(false);
  };

  // Close logout bubble if clicking elsewhere
  useEffect(() => {
    const handleClickOutside = () => {
      if (showLogout) setShowLogout(false);
    };
    window.addEventListener('click', handleClickOutside);
    return () => window.removeEventListener('click', handleClickOutside);
  }, [showLogout]);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-[#1a1625] border-t border-gray-200 dark:border-white/5 lg:hidden shadow-[0_-4px_20px_-5px_rgba(0,0,0,0.1)] pb-safe safe-area-bottom select-none">
      <div className="flex justify-around items-center h-16 px-1 relative">
        
        {navItems.map((item) => {
          // Check if this item is active (either direct match or part of a group like jobs)
          const isActive = activeSection === item.id || (item.match && item.match.includes(activeSection));
          
          return (
            <div key={item.id} className="relative w-full h-full">
                {/* Logout Bubble - Only for Profile */}
                {item.id === 'profile' && showLogout && (
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 animate-in zoom-in slide-in-from-bottom-2 duration-200 z-[60]">
                        <button 
                            onClick={(e) => { e.stopPropagation(); handleLogout(); }}
                            className="bg-red-600 text-white text-xs font-bold py-2 px-4 rounded-full shadow-lg flex items-center gap-2 whitespace-nowrap active:scale-95 transition-transform"
                        >
                            <LogOut size={12} /> Sign Out
                        </button>
                        {/* Triangle */}
                        <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-red-600"></div>
                    </div>
                )}

                <button
                  onPointerDown={() => handlePointerDown(item.id)}
                  onPointerUp={handlePointerUp}
                  onPointerLeave={handlePointerUp}
                  onClick={() => onNavigate(item.id)}
                  className={`relative flex flex-col items-center justify-center w-full h-full space-y-1 transition-all duration-200 active:scale-95 group outline-none ${
                    isActive 
                      ? 'text-jambo-600 dark:text-jambo-400' 
                      : 'text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300'
                  }`}
                >
                  <div className={`relative p-1 rounded-xl transition-all ${isActive ? 'bg-jambo-50 dark:bg-white/10 translate-y-[-2px]' : 'group-hover:bg-gray-50 dark:group-hover:bg-white/5'}`}>
                    <item.icon size={isActive ? 24 : 22} strokeWidth={isActive ? 2.5 : 2} />
                    
                    {/* Notification Badge */}
                    {item.badge ? (
                      <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white ring-2 ring-white dark:ring-[#1a1625]">
                        {item.badge}
                      </span>
                    ) : null}
                  </div>
                  
                  <span className={`text-[10px] font-medium leading-none ${isActive ? 'font-bold' : ''}`}>
                    {item.label}
                  </span>
                </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
