import { motion } from 'motion/react';
import { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';

const NAV_ITEMS = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Education', href: '#education' },
  { label: 'Achievements', href: '#achievements' },
  { label: 'Contact', href: '#contact' },
];

const STORAGE_KEY = 'color-theme';

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    if (typeof window === 'undefined') return 'dark';
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored === 'light' || stored === 'dark' ? stored : 'dark';
  });

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'light') {
      root.classList.add('light');
      root.classList.remove('dark');
    } else {
      root.classList.add('dark');
      root.classList.remove('light');
    }
    localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    setMobileOpen(false);
  };

  const toggleTheme = () => setTheme(t => (t === 'dark' ? 'light' : 'dark'));

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'glass-strong shadow-lg' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Desktop nav items */}
            <div className="hidden lg:flex items-center gap-1 flex-1 justify-center">
              {NAV_ITEMS.map((item, i) => (
                <motion.button
                  key={item.label}
                  onClick={() => scrollTo(item.href)}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07 }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 rounded-lg hover:bg-white/5 transition-colors text-sm text-foreground"
                >
                  {item.label}
                </motion.button>
              ))}
            </div>

            {/* Theme toggle — desktop */}
            <motion.button
              onClick={toggleTheme}
              whileHover={{ scale: 1.1, rotate: 180 }}
              whileTap={{ scale: 0.9 }}
              className="hidden lg:flex p-2 rounded-lg hover:bg-[#2563EB]/10 transition-colors border border-[#1E2A44]"
              aria-label="Toggle theme"
            >
              {theme === 'dark'
                ? <Sun className="w-5 h-5 text-[#3B9EFF]" />
                : <Moon className="w-5 h-5 text-[#3B9EFF]" />}
            </motion.button>

            {/* Mobile buttons */}
            <div className="lg:hidden flex items-center gap-2">
              <motion.button
                onClick={toggleTheme}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 rounded-lg hover:bg-[#2563EB]/10 border border-[#1E2A44]"
                aria-label="Toggle theme"
              >
                {theme === 'dark'
                  ? <Sun className="w-5 h-5 text-[#3B9EFF]" />
                  : <Moon className="w-5 h-5 text-[#3B9EFF]" />}
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setMobileOpen(o => !o)}
                className="p-2 rounded-lg hover:bg-[#2563EB]/10 border border-[#1E2A44]"
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile slide-in menu */}
      <motion.div
        initial={{ opacity: 0, x: '100%' }}
        animate={{ opacity: mobileOpen ? 1 : 0, x: mobileOpen ? 0 : '100%' }}
        transition={{ duration: 0.3 }}
        className="fixed top-20 right-0 bottom-0 w-64 glass-strong z-40 lg:hidden"
      >
        <div className="flex flex-col p-6 gap-2">
          {NAV_ITEMS.map((item, i) => (
            <motion.button
              key={item.label}
              onClick={() => scrollTo(item.href)}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: mobileOpen ? 1 : 0, x: mobileOpen ? 0 : 50 }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ x: 10 }}
              className="px-4 py-3 rounded-lg hover:bg-white/5 transition-colors text-left text-foreground"
            >
              {item.label}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
        />
      )}
    </>
  );
}
