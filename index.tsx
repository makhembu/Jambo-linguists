
import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/global.css';

// Import Components
import { CustomCursor } from './components/CustomCursor';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ThemeProvider } from './components/Theme';

// Import Pages
import { HomePage } from './pages/Home';
import { AboutPage } from './pages/About';
import { ServicesPage } from './pages/Services';
import { PortalPage } from './pages/Portal';
import { AdminPage } from './pages/Admin';
import { BlogPage } from './pages/Blog';

// Import DB for Auth Init
import { mockDb } from './data/mockDatabase';

const App = () => {
  // Simple state-based router
  const [currentPage, setCurrentPage] = useState('home');
  const [blogSlug, setBlogSlug] = useState<string | null>(null);

  // Initialize Auth persistence
  useEffect(() => {
    mockDb.auth.init();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  // Global handler to prevent on-screen keyboards from blocking input fields
  useEffect(() => {
    const handleFocus = (event: FocusEvent) => {
      const target = event.target as HTMLElement;
      // Check if the event target is an input or textarea
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
        // A short delay is necessary to allow the keyboard to animate into view
        setTimeout(() => {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'center', // Scrolls the element to the center of the viewport
          });
        }, 300);
      }
    };

    // Use event capturing to catch focus events on any element in the document
    document.addEventListener('focus', handleFocus, true);

    // Cleanup listener on component unmount
    return () => {
      document.removeEventListener('focus', handleFocus, true);
    };
  }, []); // Empty dependency array ensures this runs only once on mount

  // Check for admin/blog query/hash
  useEffect(() => {
    if (window.location.hash === '#admin') {
      setCurrentPage('admin');
    }
    const params = new URLSearchParams(window.location.search);
    const slug = params.get('slug');
    if (slug) {
        setBlogSlug(slug);
        setCurrentPage('blog');
    }
  }, []);

  // Update URL for blog navigation without reload
  const handleNavigation = (page: string) => {
      if (page === 'blog') {
          setBlogSlug(null);
          // Removed pushState to prevent SecurityError in sandboxed environments
      }
      setCurrentPage(page);
  };

  const handleBlogNavigate = (slug: string) => {
      setBlogSlug(slug);
      // Removed pushState to prevent SecurityError in sandboxed environments
  }

  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col bg-white dark:bg-jambo-950 transition-colors duration-300 relative selection:bg-brand-orange selection:text-white">
        
        {/* Global Dark Mode Texture Background */}
        <div className="fixed inset-0 w-full h-full pointer-events-none hidden dark:block z-0">
           {/* Cube Pattern */}
           <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.07]"></div>
           
           {/* Ambient Glows */}
           <div className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] bg-jambo-600/20 rounded-full blur-[120px]"></div>
           <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-brand-orange/10 rounded-full blur-[100px]"></div>
        </div>

        <CustomCursor />
        
        {/* Navbar is hidden on Portal & Admin to allow internal layouts to take control */}
        {currentPage !== 'portal' && currentPage !== 'admin' && <Navbar onNavigate={handleNavigation} currentPage={currentPage} />}
        
        <main className="flex-grow relative z-10">
          {/* Page Transition Wrapper */}
          <div 
            key={currentPage} 
            className={(currentPage === 'portal' || currentPage === 'admin') ? '' : "animate-in fade-in slide-in-from-bottom-8 duration-700 ease-out"}
          >
            {currentPage === 'home' && <HomePage onNavigate={handleNavigation} />}
            {currentPage === 'about' && <AboutPage />}
            {currentPage === 'services' && <ServicesPage />}
            {currentPage === 'blog' && <BlogPage initialSlug={blogSlug} onNavigate={handleNavigation} />}
            {currentPage === 'portal' && <PortalPage onNavigate={handleNavigation} />}
            {currentPage === 'admin' && <AdminPage onNavigate={handleNavigation} />}
          </div>
        </main>

        {/* Hide standard footer on Portal/Admin pages */}
        {currentPage !== 'portal' && currentPage !== 'admin' && <Footer onNavigate={handleNavigation} />}
      </div>
    </ThemeProvider>
  );
};

const root = createRoot(document.getElementById('root')!);
root.render(<App />);
