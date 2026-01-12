// src/components/Header.tsx
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { schoolInfo } from '../data/schoolInfo';
import Logo from './Logo';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState<'light'|'dark'>(() => 'light');

  // Initialize theme from localStorage or system preference (one-time)
  useEffect(() => {
    const saved = localStorage.getItem('theme');
    if (saved === 'light' || saved === 'dark') {
      setTheme(saved);
      return;
    }
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark');
    }
  }, []);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (theme === 'dark') document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    if (isMobileMenuOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isMobileMenuOpen]);

  // Ref for the desktop search form (used to detect outside clicks)
  const searchFormRef = useRef<HTMLFormElement | null>(null);

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (searchFormRef.current && !searchFormRef.current.contains(e.target as Node)) {
        setSearchResults([]);
      }
    };
    document.addEventListener('click', onClickOutside);
    return () => document.removeEventListener('click', onClickOutside);
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => {
      const next = prev === 'light' ? 'dark' : 'light';
      // Immediately apply class and persist so the UI updates without waiting for effects
      if (next === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      localStorage.setItem('theme', next);
      // Debugging: log current state
      // eslint-disable-next-line no-console
      console.debug('Theme toggled to', next, 'dark class present?', document.documentElement.classList.contains('dark'));
      return next;
    });
  };
  const toggleMobileMenu = () => setIsMobileMenuOpen(prev => !prev);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    const q = searchQuery.trim();
    if (!q) return;

    // Fake smart results – in real app use Fuse.js or backend
    const results = [
      `Information about "${q}" in About Us`,
      `"${q}" programs available in our Classes`,
      `Contact us about "${q}" via WhatsApp`,
      `Location & hours related to "${q}"`,
    ].slice(0, 3); // keep it short & clean

    setSearchResults(results);
    // keep the query so user can refine it
    // Do NOT close mobile menu – let users see results
  };

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 dark:bg-gray-950/95 backdrop-blur-sm shadow-sm'
            : 'bg-white dark:bg-gray-950 shadow-md'
        }`}
      >
        <div className="px-5 py-4 flex items-center justify-between max-w-7xl mx-auto">
          {/* Logo */}
          <a href="#" aria-label={`${schoolInfo.name} - Home`} className="inline-flex items-center gap-3">
            <Logo />
            <span className="sr-only">{schoolInfo.name}</span>
          </a>

          {/* Desktop Nav + Search + Theme */}
          <div className="hidden md:flex items-center space-x-8">
            <nav className="flex items-center space-x-8">
              {schoolInfo.navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
                >
                  {item.label}
                </a>
              ))}
            </nav>

            {/* Desktop Search */}
            <form ref={searchFormRef} onSubmit={handleSearch} className="relative">
              <input
                type="search"
                value={searchQuery}
                onKeyDown={(e) => { if (e.key === 'Escape') { setSearchResults([]); setSearchQuery(''); } }}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search school info..."
                className="pl-10 pr-4 py-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
                aria-label="Search"
              />
              <button
                type="submit"
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400"
                aria-label="Submit search"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>

              {searchResults.length > 0 && (
                <div className="absolute left-0 mt-2 w-64 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-3 shadow-lg z-50">
                  <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">Quick results</h4>
                  <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                    {searchResults.map((result, i) => (
                      <li key={i} className="truncate">• {result}</li>
                    ))}
                  </ul>
                </div>
              )}
            </form>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              aria-pressed={theme === 'dark'}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
              {theme === 'light' ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              ) : (
                <svg className="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              )}
            </button>
          </div>

          {/* Mobile Controls */}
          <div className="md:hidden flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
              {theme === 'light' ? '🌙' : '☀️'}
            </button>
            <button
              onClick={toggleMobileMenu}
              className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Toggle navigation menu"
              aria-expanded={isMobileMenuOpen}
            >
              <svg className="w-6 h-6 text-gray-900 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu with Search Results */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 w-4/5 max-w-sm bg-white dark:bg-gray-950 shadow-2xl z-50 md:hidden"
            role="dialog"
            aria-modal="true"
            aria-labelledby="mobile-menu-title"
          >
            <div className="flex flex-col h-full p-6 overflow-y-auto">
              <div className="flex justify-between items-center mb-8">
                <h3 id="mobile-menu-title" className="text-xl font-bold text-gray-900 dark:text-white">
                  Menu
                </h3>
                <button
                  onClick={toggleMobileMenu}
                  className="focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
                  aria-label="Close menu"
                >
                  <svg className="w-8 h-8 text-gray-900 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Mobile Search + Results */}
              <form onSubmit={handleSearch} className="mb-6">
                <div className="relative">
                  <input
                    ref={searchInputRef}
                    type="search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search..."
                    className="w-full pl-10 pr-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    aria-label="Search school information"
                  />
                  <button
                    type="submit"
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400"
                    aria-label="Submit search"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </button>
                </div>
              </form>

              {/* Search Results */}
              {searchResults.length > 0 && (
                <div className="mb-8 p-4 bg-blue-50 dark:bg-blue-950/40 rounded-xl border border-blue-100 dark:border-blue-900/50">
                  <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-3">
                    Quick Results for "{searchQuery}"
                  </h4>
                  <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                    {searchResults.map((result, i) => (
                      <li key={i}>• {result}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Navigation */}
              <nav className="flex flex-col space-y-6 text-lg">
                {schoolInfo.navItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="text-gray-800 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-2 py-1"
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      setSearchResults([]); // clear results on nav click
                    }}
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>


    </>
  );
};

export default Header;