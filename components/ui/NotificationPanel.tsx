
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Bell, CheckCircle, Briefcase, Shield, GraduationCap, X, Check, MessageSquare } from 'lucide-react';
import { mockDb, Notification } from '../../data/mockDatabase';

interface NotificationPanelProps {
  onNavigate: (sectionId: string) => void;
}

export const NotificationPanel = ({ onNavigate }: NotificationPanelProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const panelRef = useRef<HTMLDivElement>(null);

  const fetchNotifications = () => {
      setNotifications(mockDb.getNotifications());
  };

  useEffect(() => {
      fetchNotifications();
      const unsubscribe = mockDb.subscribe(() => {
          fetchNotifications();
      });
      return unsubscribe;
  }, []);

  const unreadCount = useMemo(() => notifications.filter(n => !n.isRead).length, [notifications]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
        document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const getIcon = (type: string) => {
    switch (type) {
      case 'check': return CheckCircle;
      case 'briefcase': return Briefcase;
      case 'shield': return Shield;
      case 'message': return MessageSquare;
      case 'grad': return GraduationCap;
      default: return Briefcase;
    }
  };

  const handleNotificationClick = (notification: Notification) => {
    mockDb.markNotificationRead(notification.id);
    setIsOpen(false);
    if (notification.linkTo) {
      onNavigate(notification.linkTo);
    }
  };

  const handleMarkAllRead = () => {
    mockDb.markAllNotificationsRead();
  };

  return (
    <div className="relative" ref={panelRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-gray-400 hover:text-jambo-600 dark:hover:text-jambo-400 transition-colors rounded-full hover:bg-gray-100 dark:hover:bg-white/5"
        aria-label="Notifications"
      >
        <Bell size={20} />
        {unreadCount > 0 && (
          <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-brand-orange rounded-full border-2 border-white dark:border-[#1a1625] animate-pulse"></span>
        )}
      </button>

      {isOpen && (
        <>
            {/* Mobile Backdrop (to close on click outside) */}
            <div 
                className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden"
                onClick={() => setIsOpen(false)}
            />

            {/* Panel Container (Responsive: Full screen mobile / Dropdown desktop) */}
            <div className={`
                fixed inset-x-0 top-0 bottom-0 z-50 bg-white dark:bg-[#1a1625] flex flex-col shadow-2xl
                lg:absolute lg:inset-auto lg:top-full lg:right-0 lg:w-96 lg:h-auto lg:max-h-[600px] lg:rounded-2xl lg:mt-3 lg:border lg:border-gray-200 lg:dark:border-white/10
                animate-in slide-in-from-top-4 duration-300 ease-out origin-top-right
            `}>
                {/* Header */}
                <div className="flex items-center justify-between p-4 sm:p-5 border-b border-gray-100 dark:border-white/10 bg-gray-50/80 dark:bg-white/5 backdrop-blur-sm shrink-0">
                    <div>
                        <h4 className="font-serif font-bold text-xl text-gray-900 dark:text-white">Notifications</h4>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                            You have <span className="font-bold text-jambo-600 dark:text-jambo-400">{unreadCount}</span> unread messages
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        {unreadCount > 0 && (
                            <button 
                                onClick={handleMarkAllRead} 
                                className="p-2 text-jambo-600 dark:text-jambo-400 hover:bg-jambo-50 dark:hover:bg-jambo-900/20 rounded-lg transition-colors"
                                title="Mark all as read"
                            >
                                <Check size={20} />
                            </button>
                        )}
                        <button 
                            onClick={() => setIsOpen(false)}
                            className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/10 rounded-lg transition-colors"
                        >
                            <X size={24} />
                        </button>
                    </div>
                </div>

                {/* List Content */}
                <div className="flex-1 overflow-y-auto custom-scrollbar bg-white dark:bg-[#1a1625]">
                    {notifications.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full py-12 text-center px-6">
                            <div className="w-16 h-16 bg-gray-100 dark:bg-white/5 rounded-full flex items-center justify-center mb-4 text-gray-300 dark:text-gray-600">
                                <Bell size={32} />
                            </div>
                            <p className="text-gray-900 dark:text-white font-bold mb-1">All caught up!</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">No new notifications at the moment.</p>
                        </div>
                    ) : (
                        <div className="divide-y divide-gray-100 dark:divide-white/5">
                            {notifications.map(notif => {
                                const Icon = getIcon(notif.iconType);
                                return (
                                    <div
                                        key={notif.id}
                                        onClick={() => handleNotificationClick(notif)}
                                        className={`
                                            flex gap-4 p-4 cursor-pointer transition-all active:scale-[0.99]
                                            ${notif.isRead 
                                                ? 'bg-white dark:bg-[#1a1625] hover:bg-gray-50 dark:hover:bg-white/5' 
                                                : 'bg-jambo-50/40 dark:bg-jambo-900/10 hover:bg-jambo-50/70 dark:hover:bg-jambo-900/20'}
                                        `}
                                    >
                                        <div className={`w-10 h-10 rounded-full ${notif.bg} ${notif.color} flex items-center justify-center shrink-0 mt-1 shadow-sm`}>
                                            <Icon size={18} />
                                        </div>
                                        
                                        <div className="flex-1 min-w-0">
                                            <div className="flex justify-between items-start gap-2 mb-1">
                                                <p className={`text-sm font-bold leading-tight ${notif.isRead ? 'text-gray-700 dark:text-gray-300' : 'text-gray-900 dark:text-white'}`}>
                                                    {notif.title}
                                                </p>
                                                {!notif.isRead && (
                                                    <span className="w-2 h-2 bg-brand-orange rounded-full shrink-0 mt-1.5"></span>
                                                )}
                                            </div>
                                            <p className={`text-xs leading-relaxed line-clamp-2 ${notif.isRead ? 'text-gray-500 dark:text-gray-500' : 'text-gray-600 dark:text-gray-300'}`}>
                                                {notif.message}
                                            </p>
                                            <p className="text-[10px] text-gray-400 mt-2 font-medium">
                                                {notif.time}
                                            </p>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    )}
                </div>
                
                {/* Mobile Footer Area (Safe Area) */}
                <div className="lg:hidden h-safe-bottom bg-white dark:bg-[#1a1625]"></div>
            </div>
        </>
      )}
    </div>
  );
};
