'use client';
import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  LayoutDashboard, Briefcase, MessageSquare, Wallet, Menu, 
  Users, FileText, Shield, PenTool, Settings, LogOut, X 
} from 'lucide-react';
import { mockDb } from '@/data/mockDatabase';

interface AdminBottomNavProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export const AdminBottomNav = ({ activeSection, setActiveSection }: AdminBottomNavProps) => {
  const router = useRouter();
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const menuRef = useRef<HTMLDivElement>(null);
  const currentUser = mockDb.auth.getCurrentUser();

  useEffect(() => {
    const updateUnread = () => {
        if (currentUser) {
            setUnreadCount(mockDb.getGlobalUnreadCount(currentUser.id));
        }
    };
    updateUnread();
    const unsubscribe = mockDb.subscribe(updateUnread);
    return unsubscribe;
  }, [currentUser]);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMoreMenu(false);
      }
    };
    if (showMoreMenu) {
        document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showMoreMenu]);

  const handleNav = (id: string) => {
      setActiveSection(id);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setShowMoreMenu(false);
  };

  const handleLogout = () => {
      mockDb.auth.logout();
      router.push('/');
  };

  const mainItems = [
    { id: 'dashboard', label: 'Overview', icon: LayoutDashboard },
    { id: 'jobs', label: 'Jobs', icon: Briefcase, match: ['jobs', 'jobs-list', 'jobs-calendar'] },
    { id: 'messages', label: 'Messages', icon: MessageSquare, badge: unreadCount },
    { id: 'financials', label: 'Finance', icon: Wallet },
  ];

  const moreItems = [
      { id: 'linguists', label: 'Linguists', icon: Users },
      { id: 'blog', label: 'Blog', icon: PenTool },
      { id: 'content', label: 'LMS & Resources', icon: FileText },
      { id: 'compliance', label: 'Compliance', icon: Shield },
      { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <>
        {/* Expandable Menu Overlay */}
        {showMoreMenu && (
            <div className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-sm animate-in fade-in duration-200">
                <div 
                    ref={menuRef}
                    className="absolute bottom-20 right-4 left-4 bg-white dark:bg-[#1a1625] rounded-2xl shadow-2xl border border-gray-200 dark:border-white/10 overflow-hidden animate-in slide-in-from-bottom-10 duration-300"
                >
                    <div className="p-4 grid grid-cols-2 gap-3">
                        {moreItems.map(item => (
                            <button
                                key={item.id}
                                onClick={() => handleNav(item.id)}
                                className={`flex items-center gap-3 p-3 rounded-xl transition-colors ${
                                    activeSection === item.id 
                                    ? 'bg-jambo-50 dark:bg-jambo-900/20 text-jambo-700 dark:text-jambo-300 border border-jambo-100 dark:border-jambo-800' 
                                    : 'bg-gray-50 dark:bg-white/5 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-white/10'
                                }`}
                            >
                                <item.icon size={18} />
                                <span className="font-bold text-sm">{item.label}</span>
                            </button>
                        ))}
                    </div>
                    <div className="p-4 border-t border-gray-100 dark:border-white/5 bg-gray-50/50 dark:bg-black/20">
                        <button 
                            onClick={handleLogout}
                            className="w-full flex items-center justify-center gap-2 text-red-600 dark:text-red-400 font-bold text-sm py-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors"
                        >
                            <LogOut size={16} /> Sign Out
                        </button>
                    </div>
                </div>
            </div>
        )}

        {/* Fixed Bottom Bar */}
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-[#1a1625] border-t border-gray-200 dark:border-white/5 lg:hidden shadow-[0_-4px_20px_-5px_rgba(0,0,0,0.1)] pb-safe safe-area-bottom select-none">
            <div className="flex justify-around items-center h-16 px-1">
                {mainItems.map((item) => {
                    const isActive = activeSection === item.id || (item.match && item.match.includes(activeSection));
                    
                    return (
                        <button
                            key={item.id}
                            onClick={() => handleNav(item.id)}
                            className={`relative flex flex-col items-center justify-center w-full h-full space-y-1 transition-all duration-200 active:scale-95 outline-none ${
                                isActive 
                                ? 'text-jambo-600 dark:text-jambo-400' 
                                : 'text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300'
                            }`}
                        >
                            <div className={`relative p-1 rounded-xl transition-all ${isActive ? 'bg-jambo-50 dark:bg-white/10 translate-y-[-2px]' : ''}`}>
                                <item.icon size={isActive ? 24 : 22} strokeWidth={isActive ? 2.5 : 2} />
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
                    );
                })}

                {/* More Button */}
                <button
                    onClick={() => setShowMoreMenu(!showMoreMenu)}
                    className={`relative flex flex-col items-center justify-center w-full h-full space-y-1 transition-all duration-200 active:scale-95 outline-none ${
                        showMoreMenu 
                        ? 'text-jambo-600 dark:text-jambo-400' 
                        : 'text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300'
                    }`}
                >
                    <div className={`relative p-1 rounded-xl transition-all ${showMoreMenu ? 'bg-jambo-50 dark:bg-white/10 translate-y-[-2px]' : ''}`}>
                        {showMoreMenu ? <X size={24} /> : <Menu size={22} />}
                    </div>
                    <span className={`text-[10px] font-medium leading-none ${showMoreMenu ? 'font-bold' : ''}`}>
                        {showMoreMenu ? 'Close' : 'More'}
                    </span>
                </button>
            </div>
        </div>
    </>
  );
};
