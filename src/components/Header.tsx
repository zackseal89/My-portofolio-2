/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useUI } from '../context/UIContext';

const JUMP_LINKS = [
  { id: 'builds', label: '01 BUILDS' },
  { id: 'method', label: '02 METHOD' },
  { id: 'decisions', label: '03 DECISIONS' },
  { id: 'stack', label: '04 STACK' },
  { id: 'writing', label: '05 WRITING' },
  { id: 'contact', label: '06 CONTACT' },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { openContact, theme, toggleTheme } = useUI();
  const navigate = useNavigate();

  const scrollToSection = (id: string) => {
    setMobileOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      navigate('/');
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  };

  return (
    <motion.nav
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 w-full z-40 bg-brand-bg/90 backdrop-blur-md border-b border-brand-dark/10 transition-colors duration-300"
      id="main-nav"
    >
      <div className="flex justify-between items-center px-4 md:px-12 py-4.5 w-full max-w-7xl mx-auto">
        {/* Brand Logo */}
        <button
          onClick={() => scrollToSection('hero')}
          className="font-serif text-xl md:text-2xl font-bold tracking-tighter text-brand-dark cursor-pointer transition-transform duration-300 hover:scale-[1.02] flex items-center gap-2"
          id="nav-logo"
        >
          <span>ZACHARY ONGERI</span>
          <span className="font-mono text-[9px] uppercase tracking-widest px-2 py-0.5 border border-brand-accent/30 bg-brand-accent/5 text-brand-accent sharp-edge font-normal hidden sm:inline-block">
            BUILDER
          </span>
        </button>

        {/* Minimalist Section Jump Bar (ADHD-friendly scannability) */}
        <div className="hidden lg:flex items-center gap-2 bg-brand-surface/60 border border-brand-dark/10 p-1 sharp-edge">
          {JUMP_LINKS.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => scrollToSection(id)}
              className="font-mono text-[10px] tracking-wider px-3 py-1.5 text-brand-muted hover:text-brand-dark hover:bg-brand-dark/5 transition-all sharp-edge cursor-pointer"
            >
              {label}
            </button>
          ))}
        </div>

        {/* Action Controls (Theme Switcher + Quick Contact) */}
        <div className="flex items-center gap-2.5">
          {/* Theme Switcher */}
          <button
            onClick={toggleTheme}
            className="p-2 border border-brand-dark/20 hover:border-brand-accent text-brand-dark hover:text-brand-accent bg-transparent transition-all duration-300 sharp-edge cursor-pointer flex items-center justify-center"
            id="theme-toggle-btn"
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? (
              <Sun size={15} className="text-amber-400" />
            ) : (
              <Moon size={15} className="text-brand-dark" />
            )}
          </button>

          {/* Quick Contact Button */}
          <button
            onClick={openContact}
            className="font-sans text-[11px] uppercase tracking-widest font-extrabold px-4 py-2 border border-brand-dark text-brand-dark hover:bg-brand-dark hover:text-brand-bg bg-transparent transition-all duration-300 sharp-edge cursor-pointer hidden sm:inline-flex"
            id="nav-cta-btn"
          >
            Audit
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex lg:hidden p-2 text-brand-dark hover:text-brand-accent transition-colors cursor-pointer"
            id="nav-mobile-menu-btn"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 bg-brand-dark/40 backdrop-blur-sm z-30 lg:hidden"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 240 }}
              className="fixed top-0 right-0 h-full w-72 bg-brand-bg border-l border-brand-dark/15 z-40 lg:hidden flex flex-col p-8 pt-24"
              id="mobile-nav-drawer"
            >
              <div className="flex flex-col gap-4">
                {JUMP_LINKS.map(({ id, label }) => (
                  <button
                    key={id}
                    onClick={() => scrollToSection(id)}
                    className="font-mono text-xs uppercase tracking-widest text-left text-brand-dark hover:text-brand-accent transition-colors border-b border-brand-dark/10 pb-3"
                  >
                    {label}
                  </button>
                ))}
              </div>

              <div className="mt-auto space-y-3">
                <button
                  onClick={toggleTheme}
                  className="w-full flex items-center justify-center gap-2 font-sans text-xs uppercase tracking-widest font-bold py-3 border border-brand-dark/20 text-brand-dark sharp-edge"
                >
                  {theme === 'dark' ? <Sun size={14} className="text-amber-400" /> : <Moon size={14} />}
                  <span>{theme === 'dark' ? 'Light' : 'Dark'} Mode</span>
                </button>

                <button
                  onClick={() => { openContact(); setMobileOpen(false); }}
                  className="w-full font-sans text-xs uppercase tracking-widest font-extrabold py-3 border border-brand-dark bg-brand-dark text-brand-bg sharp-edge"
                >
                  Systems Audit
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
