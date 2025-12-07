
import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, Briefcase, Users, Wallet, 
  FileText, Shield, Settings, LogOut, ChevronRight, 
  Calendar, List, MessageSquare, PenTool, ChevronDown
} from 'lucide-react';
import { COMPANY_INFO } from '../../data/constants';
import { mockDb } from '../../data/mockDatabase';

interface AdminSidebarProps {
  activeSection: string;
  setActiveSection: (id: string) => void;
  onNavigate: (page: string) => void;
}

interface NavItem {
  id: string;
  label: string;
  icon: any;
  subItems?: { id: string; label: string; icon?: any }[];
  badge?: number;
}

export const AdminSidebar = ({ 
  activeSection, setActiveSection, onNavigate 
}: AdminSidebarProps) => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [unreadCount, setUnreadCount] = useState(0);
  const currentUser = mockDb.auth.getCurrentUser();

  useEffect(() => {
    const parent = navItems.find(item => item.subItems?.some(sub => sub.id === activeSection));
    if (parent) {
      setOpenDropdown(parent.id);
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

  const navItems: NavItem[] = [
    { id: 'dashboard', label: 'Overview', icon: LayoutDashboard },
    { 
      id: 'jobs', 
      label: 'Job Operations', 
      icon: Briefcase,
      subItems: [
        { id: 'jobs-list', label: 'All Jobs', icon: List },
        { id: 'jobs-calendar', label: 'Calendar', icon: Calendar }
      ]
    },
    { id: 'messages', label: 'Messages', icon: MessageSquare, badge: unreadCount },
    { id: 'linguists', label: 'Linguists CRM', icon: Users },
    { id: 'financials', label: 'Invoices & Pay', icon: Wallet },
    { id: 'blog', label: 'Blog Manager', icon: PenTool },
    { id: 'content', label: 'Resources & LMS', icon: FileText },
    { id: 'compliance', label: 'Compliance', icon: Shield },
  ];

  const handleItemClick = (item: NavItem) => {
    if (item.subItems) {
      setOpenDropdown(prev => prev === item.id ? null : item.id);
    } else {
      setActiveSection(item.id);
    }
  };

  return (
    <aside className="hidden lg:flex flex-col w-72 bg-[#841BA0] dark:bg-jambo-950 text-white shadow-2xl relative z-40 border-r border-white/10 h-screen transition-all duration-300">
        
        {/* Background Texture */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none hidden dark:block">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-brand-orange/10 rounded-full blur-[80px]"></div>
        </div>

        {/* Brand Header */}
        <div className="h-20 flex items-center px-6 border-b border-white/10 shrink-0 bg-black/10 backdrop-blur-md">
           <div className="flex items-center gap-3 cursor-pointer w-full group" onClick={() => onNavigate('home')}>
              <div className="h-10 w-10 bg-white rounded-lg flex items-center justify-center p-1 shadow-lg group-hover:scale-105 transition-transform">
                 <img 
                    src={COMPANY_INFO.logoUrl} 
                    alt="Logo" 
                    className="h-full w-full object-contain"
                 />
              </div>
              <div className="flex flex-col">
                  <span className="font-serif font-bold text-lg leading-none tracking-wide">Jambo</span>
                  <span className="text-[10px] text-jambo-200 uppercase tracking-widest font-medium">Admin Portal</span>
              </div>
           </div>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto py-6 px-4 space-y-1 relative custom-scrollbar">
           <p className="px-4 text-[10px] font-bold text-jambo-200/70 uppercase tracking-widest mb-2">Management</p>
           
           {navItems.map((item) => {
             const isActive = activeSection === item.id || activeSection.startsWith(item.id + '-');
             const isOpen = openDropdown === item.id;
             const hasSubItems = !!item.subItems;

             return (
               <div key={item.id} className="mb-1">
                 <button
                   onClick={() => handleItemClick(item)}
                   className={`
                     w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group relative
                     ${isActive && !hasSubItems
                       ? 'bg-white/10 text-white shadow-lg border border-white/10 backdrop-blur-sm' 
                       : 'text-jambo-100 hover:bg-white/5 hover:text-white'
                     }
                   `}
                 >
                   <item.icon size={20} className={isActive ? 'text-brand-orange' : 'text-jambo-300 group-hover:text-white transition-colors'} />
                   <span className="flex-1 text-left">{item.label}</span>
                   
                   {item.badge ? (
                       <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm animate-pulse">{item.badge}</span>
                   ) : null}
                   
                   {hasSubItems && (
                      <ChevronRight size={16} className={`text-jambo-300 transition-transform duration-300 ${isOpen ? 'rotate-90 text-white' : ''}`} />
                   )}
                   
                   {isActive && !hasSubItems && (
                       <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-brand-orange rounded-r-full"></div>
                   )}
                 </button>

                 {/* Sub Menu */}
                 <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-48 opacity-100 mt-1' : 'max-h-0 opacity-0'}`}>
                    <div className="ml-4 pl-4 border-l-2 border-white/10 space-y-1 py-1">
                        {item.subItems?.map(sub => {
                            const isSubActive = activeSection === sub.id;
                            return (
                                <button
                                    key={sub.id}
                                    onClick={() => setActiveSection(sub.id)}
                                    className={`
                                        w-full text-left px-4 py-2 rounded-lg text-sm transition-colors flex items-center gap-2
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

           <div className="my-6 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mx-4"></div>
           
           <p className="px-4 text-[10px] font-bold text-jambo-200/70 uppercase tracking-widest mb-2">System</p>
           <button 
                onClick={() => setActiveSection('settings')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${activeSection === 'settings' ? 'bg-white/10 text-white shadow-lg border border-white/10' : 'text-jambo-100 hover:bg-white/5 hover:text-white'}`}
           >
              <Settings size={20} className={activeSection === 'settings' ? 'text-brand-orange' : 'text-jambo-300'} /> 
              <span>Settings</span>
           </button>
        </div>

        {/* User Footer */}
        <div className="p-4 border-t border-white/10 bg-black/20 backdrop-blur-md relative z-10">
           <div className="flex items-center gap-3 mb-4 px-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-teal to-teal-700 flex items-center justify-center text-xs font-bold text-white border-2 border-white/20 shadow-lg">
                 {currentUser?.firstName?.[0] || 'A'}
              </div>
              <div className="overflow-hidden flex-1">
                 <p className="text-sm font-bold truncate text-white">{currentUser?.firstName} {currentUser?.lastName}</p>
                 <p className="text-[10px] text-brand-teal truncate uppercase tracking-wider font-bold">Administrator</p>
              </div>
           </div>
           <button 
             onClick={() => {
                 mockDb.auth.logout();
                 onNavigate('home');
             }}
             className="w-full flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider text-jambo-200 hover:text-white py-3 hover:bg-white/10 rounded-lg transition-colors border border-transparent hover:border-white/10 group"
           >
             <LogOut size={14} className="group-hover:-translate-x-1 transition-transform" /> Sign Out
           </button>
        </div>
    </aside>
  );
};
