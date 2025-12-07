'use client';

import React, { useState, useEffect } from 'react';
import { ChevronDown, Menu, X } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { ThemeToggle } from '@/components/Theme';
import { COMPANY_INFO } from '@/data/constants';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname() || '/'; // fallback to '/' if null
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNav = (page: string) => {
    router.push(page);
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isCurrentPage = (page: string) => page === '/' ? pathname === '/' : pathname.startsWith(page);

  return (
    <nav className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 transform-gpu ${
      scrolled || isOpen ? 'bg-jambo-600/95 dark:bg-jambo-950/95 backdrop-blur-md shadow-lg py-2' : 'bg-transparent py-4 md:py-6'
    }`}>
      <div className="max-w-7xl mx-auto px-4 md:px-6 flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <div className="flex items-center gap-3 shrink-0">
          <div 
            onClick={() => handleNav('/')}
            className={`flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-105 origin-left ${
              scrolled ? 'h-10 md:h-12' : 'h-10 md:h-14 lg:h-20'
            }`}
          >
             <img 
              src={COMPANY_INFO.logoUrl} 
              alt={COMPANY_INFO.name} 
              className="h-full w-auto object-contain rounded-lg"
              loading="eager"
            />
          </div>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-2 lg:gap-8">
          {['/', '/about', '/services', '/blog'].map((page) => (
            <button
              key={page}
              onClick={() => handleNav(page)}
              className={`text-[11px] lg:text-sm uppercase tracking-wider font-medium transition-colors relative group py-2 ${
                isCurrentPage(page) ? 'text-white' : 'text-jambo-100 hover:text-white'
              }`}
            >
              {page === '/' ? 'Home' : page.replace('/', '').replace(/^\w/, (c) => c.toUpperCase())}
              {isCurrentPage(page) && <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-white rounded-full"></span>}
            </button>
          ))}

          {/* Portal Button */}
          <button 
            onClick={() => handleNav('/portal')}
            className="text-[10px] lg:text-xs uppercase tracking-widest font-bold border border-brand-orange text-brand-orange px-3 lg:px-4 py-1.5 lg:py-2 rounded-full hover:bg-brand-orange hover:text-white transition-all ml-1 lg:ml-4 whitespace-nowrap"
          >
            Linguist Portal
          </button>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2 md:gap-3 lg:gap-4">
          <ThemeToggle className="hidden md:block" lightModeClass="bg-jambo-700 text-white hover:bg-jambo-800" />

          <div className="flex items-center gap-1.5 lg:gap-2 bg-white/10 hover:bg-white/20 px-2 lg:px-4 py-1.5 lg:py-2 rounded-full transition-all cursor-pointer border border-white/20 backdrop-blur-sm group">
            <span className="text-sm lg:text-lg shadow-sm group-hover:scale-110 transition-transform">🇬🇧</span>
            <span className="text-[10px] lg:text-xs font-bold text-white tracking-widest">EN</span>
            <ChevronDown size={14} className="text-white/80 hidden sm:block" />
          </div>

          {/* Mobile Hamburger */}
          <button 
            className="md:hidden text-white p-2 hover:bg-white/10 rounded-lg transition-colors z-50 relative"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 bg-jambo-600 dark:bg-jambo-950 border-t border-white/10 shadow-2xl p-6 md:hidden animate-in slide-in-from-top-4 fade-in duration-200 h-[calc(100vh-64px)] flex flex-col overflow-y-auto">
          <div className="flex flex-col gap-6 text-center pt-8">
            {['/', '/about', '/services', '/blog'].map((page) => (
              <button
                key={page}
                onClick={() => handleNav(page)}
                className={`uppercase tracking-widest py-2 text-xl font-${page === '/' ? 'medium' : 'light'} ${
                  isCurrentPage(page) ? 'text-white' : 'text-jambo-100 hover:text-white'
                }`}
              >
                {page === '/' ? 'Home' : page.replace('/', '').replace(/^\w/, (c) => c.toUpperCase())}
              </button>
            ))}

            <div className="flex justify-center py-4">
              <ThemeToggle lightModeClass="bg-jambo-700 text-white w-12 h-12 flex items-center justify-center hover:bg-jambo-800" />
            </div>

            <div className="w-16 h-px bg-white/20 mx-auto my-2"></div>

            <button 
              onClick={() => handleNav('/portal')}
              className="text-brand-orange text-xl font-bold border-2 border-brand-orange mx-auto px-8 py-3 rounded-full hover:bg-brand-orange hover:text-white uppercase tracking-widest transition-all mt-4"
            >
               Linguist Portal
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};
