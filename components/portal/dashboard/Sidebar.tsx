
import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, Briefcase, GraduationCap, PoundSterling, User, 
  LogOut, ChevronRight, MessageSquare, Book, Calendar, List
} from 'lucide-react';
import { mockDb } from '@/data/mockDatabase';
import { COMPANY_INFO } from '@/data/constants';

interface MenuItem {
  id: string;
  label: string;
  icon: any;
  subItems?: { id: string; label: string; icon?: any }[];
  badge?: number;
}

export const menuItems: MenuItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { 
    id: 'jobs', label: 'Job Center', icon: Briefcase,
    subItems: [
      { id: 'jobs-available', label: 'Marketplace', icon: List },
      { id: 'jobs-bookings', label: 'My Bookings', icon: Calendar },
      { id: 'jobs-history', label: 'Work History', icon: List },
      { id: 'jobs-calendar', label: 'Schedule', icon: Calendar },
    ]
  },
  { id: 'messages', label: 'Messages', icon: MessageSquare },
  { 
    id: 'training', label: 'Training LMS', icon: GraduationCap,
    subItems: [
      { id: 'training-modules', label: 'All Modules' },
      { id: 'training-ongoing', label: 'In Progress' },
      { id: 'training-certificates', label: 'Certificates' },
    ]
  },
  { id: 'resources', label: 'Resource Library', icon: Book },
  { id: 'finance', label: 'Finance & Invoices', icon: PoundSterling },
  { id: 'profile', label: 'My Profile', icon: User },
];

interface SidebarProps {
  activeSection: string;
  setActiveSection: (id: string) => void;
  onNavigate: (page: string) => void;
  onLogout: () => void;
}

export const Sidebar = ({ 
  activeSection, 
  setActiveSection, 
  onNavigate, 
  onLogout 
}: SidebarProps) => {
  const currentUser = mockDb.auth.getCurrentUser();
  const initials = currentUser ? ((currentUser.firstName?.[0] || '') + (currentUser.lastName?.[0] || '')).toUpperCase() : 'JL';
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const activeParent = menuItems.find(item => item.subItems && (activeSection.startsWith(item.id) || item.subItems.some(sub => sub.id === activeSection)));
    if (activeParent) {
        setOpenDropdown(activeParent.id);
    }
  }, [activeSection]);

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

  const displayItems = menuItems.map(item => {
      if (item.id === 'messages') {
          return { ...item, badge: unreadCount };
      }
      return item;
  });

  const handleMainMenuClick = (item: MenuItem) => {
    if (item.subItems) {
        setOpenDropdown(prev => (prev === item.id ? null : item.id));
    } else {
        setActiveSection(item.id);
    }
  };

  return (
    <aside className="hidden lg:flex flex-col w-72 bg-[#841BA0] dark:bg-jambo-950 text-white relative z-30 shadow-2xl overflow-hidden transition-all duration-300 h-full border-r border-white/10">
         
         {/* Texture BG */}
         <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none hidden dark:block">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-brand-orange/20 rounded-full blur-[50px]"></div>
         </div>

         <div className="h-20 flex items-center px-6 border-b border-white/10 shrink-0 bg-black/10 backdrop-blur-md">
             <div className="flex items-center gap-3 cursor-pointer w-full group" onClick={() => onNavigate('home')}>
                <div className="h-10 w-10 bg-white rounded-lg flex items-center justify-center p-1 shadow-md group-hover:scale-105 transition-transform">
                    <img 
                      src={COMPANY_INFO.logoUrl} 
                      alt={COMPANY_INFO.name} 
                      className="h-full w-full object-contain" 
                    />
                </div>
                <div className="flex flex-col">
                    <span className="font-serif font-bold text-lg leading-none tracking-wide">Jambo</span>
                    <span className="text-[10px] text-jambo-200 uppercase tracking-widest font-medium">Linguist Portal</span>
                </div>
             </div>
         </div>

         <div className="flex-1 overflow-y-auto py-6 px-4 space-y-1 custom-scrollbar relative z-10">
            <div className="mb-2 px-4 text-[10px] font-bold text-jambo-200/70 uppercase tracking-widest">Main Menu</div>
            {displayItems.map((item) => {
                const isActiveParent = activeSection.startsWith(item.id) || (item.subItems && item.subItems.some(s => s.id === activeSection));
                const isOpen = openDropdown === item.id;

                return (
                    <div key={item.id} className="mb-1">
                        <button 
                            onClick={() => handleMainMenuClick(item)}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group relative
                                ${isActiveParent
                                    ? 'bg-white/10 text-white shadow-lg border border-white/10 backdrop-blur-sm' 
                                    : 'text-jambo-100 hover:bg-white/5 hover:text-white'
                                }
                            `}
                        >
                            <item.icon size={20} className={isActiveParent ? 'text-brand-orange' : 'text-jambo-300 group-hover:text-white transition-colors'} />
                            <span className="font-medium flex-1 text-left text-sm">{item.label}</span>
                            
                            {item.badge ? (
                                <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm mr-2 animate-pulse">{item.badge}</span>
                            ) : null}
                            
                            {item.subItems && (
                                <ChevronRight size={16} className={`text-jambo-300 transition-transform duration-300 ${isOpen ? 'rotate-90 text-white' : ''}`} />
                            )}

                            {isActiveParent && !item.subItems && (
                                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-brand-orange rounded-r-full"></div>
                            )}
                        </button>
                        
                        <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-64 opacity-100 mt-1' : 'max-h-0 opacity-0'}`}>
                            <div className="ml-4 pl-4 border-l-2 border-white/10 space-y-1 py-1">
                                {item.subItems?.map(sub => {
                                    const isSubActive = activeSection === sub.id;
                                    return (
                                        <button 
                                            key={sub.id}
                                            onClick={() => setActiveSection(sub.id)}
                                            className={`w-full text-left px-4 py-2 text-sm rounded-lg transition-colors flex items-center gap-2
                                                ${isSubActive 
                                                    ? 'text-white font-bold bg-white/10 shadow-sm' 
                                                    : 'text-jambo-200 hover:text-white hover:bg-white/5'
                                                }
                                            `}
                                        >
                                            {sub.icon && <sub.icon size={14} className={isSubActive ? 'text-brand-orange' : 'opacity-70'} />}
                                            {sub.label}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                );
            })}
         </div>

         <div className="p-4 border-t border-white/10 bg-black/20 backdrop-blur-md relative z-10">
            {currentUser && (
                <div className="flex items-center gap-3 mb-4 px-2">
                    <div className="w-10 h-10 rounded-full bg-brand-orange flex items-center justify-center font-bold text-white shadow-md border-2 border-white/20 overflow-hidden">
                        {currentUser.avatarUrl ? <img src={currentUser.avatarUrl} className="w-full h-full object-cover"/> : initials}
                    </div>
                    <div className="overflow-hidden">
                        <p className="text-sm font-bold text-white truncate">{currentUser.firstName} {currentUser.lastName}</p>
                        <p className="text-[10px] text-jambo-200 truncate uppercase tracking-wider font-bold">{currentUser.role === 'linguist' ? 'Verified Linguist' : 'User'}</p>
                    </div>
                </div>
            )}
            <button 
                onClick={() => { mockDb.auth.logout(); onLogout(); }}
                className="w-full flex items-center justify-center gap-2 text-xs uppercase tracking-widest font-bold text-jambo-200 hover:text-white py-3 hover:bg-white/10 rounded-lg transition-colors border border-transparent hover:border-white/10 group"
            >
                <LogOut size={14} className="group-hover:-translate-x-1 transition-transform" /> Sign Out
            </button>
         </div>
    </aside>
  );
};
