
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

const ThemeContext = createContext({ isDark: false, toggleTheme: (event?: React.MouseEvent) => {} });

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }: { children?: React.ReactNode }) => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check local storage or system preference
    const stored = localStorage.getItem('theme');
    if (stored === 'dark' || (!stored && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDark(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = (event?: React.MouseEvent) => {
    const hasViewTransition = () => 'startViewTransition' in document;

    if (!hasViewTransition()) {
        // Fallback for older browsers
        setIsDark(prev => {
            const next = !prev;
            if (next) {
                document.documentElement.classList.add('dark');
                localStorage.setItem('theme', 'dark');
            } else {
                document.documentElement.classList.remove('dark');
                localStorage.setItem('theme', 'light');
            }
            return next;
        });
        return;
    }

    const x = event?.clientX ?? window.innerWidth / 2;
    const y = event?.clientY ?? window.innerHeight / 2;
    
    document.documentElement.style.setProperty('--x', `${x}px`);
    document.documentElement.style.setProperty('--y', `${y}px`);

    // Using `as any` to avoid TS errors for this new API
    const transition = (document as any).startViewTransition(() => {
        setIsDark(prev => {
            const next = !prev;
            if (next) {
                document.documentElement.classList.add('dark');
                localStorage.setItem('theme', 'dark');
            } else {
                document.documentElement.classList.remove('dark');
                localStorage.setItem('theme', 'light');
            }
            return next;
        });
    });

    transition.finished.then(() => {
        document.documentElement.style.removeProperty('--x');
        document.documentElement.style.removeProperty('--y');
    });
  };

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const ThemeToggle = ({ className = '', lightModeClass = 'bg-gray-100 text-gray-600 hover:bg-gray-200' }: { className?: string, lightModeClass?: string }) => {
  const { isDark, toggleTheme } = useTheme();
  return (
    <button 
      onClick={(e) => toggleTheme(e)}
      className={`p-2 rounded-full transition-all duration-300 ${isDark ? 'bg-white/10 text-yellow-300 hover:bg-white/20' : lightModeClass} ${className}`}
      aria-label="Toggle Dark Mode"
    >
      {isDark ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
};
