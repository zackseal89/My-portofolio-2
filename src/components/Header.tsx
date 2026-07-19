/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { useUI } from '../context/UIContext';

const NAV_LINKS = [
  { label: 'Case Studies', to: '/#strategic-impact' },
  { label: 'Projects', to: '/projects' },
  { label: 'About', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Writing', to: '/writing' },
  { label: 'Contact', to: '/contact' },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { openContact } = useUI();
  const navigate = useNavigate();

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `font-sans text-[11px] uppercase tracking-[0.3em] font-semibold transition-colors duration-300 cursor-pointer relative ${
      isActive ? 'text-brand-accent' : 'text-brand-dark hover:text-brand-accent'
    }`;

  return (
    <motion.nav
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 w-full z-40 bg-brand-bg/90 backdrop-blur-md border-b border-brand-dark/10"
      id="main-nav"
    >
      <div className="flex justify-between items-center px-4 md:px-12 py-5 w-full max-w-7xl mx-auto">
        {/* Brand Logo */}
        <button
          onClick={() => navigate('/')}
          className="font-serif text-2xl md:text-3xl font-bold tracking-tighter text-brand-dark cursor-pointer transition-transform duration-300 hover:scale-[1.02]"
          id="nav-logo"
        >
          ZACHARY
        </button>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-10 lg:gap-14">
          {NAV_LINKS.map(({ label, to }) => (
            <NavLink key={to} to={to} className={navLinkClass} id={`nav-${label.toLowerCase().replace(/\s+/g, '-')}-btn`}>
              {label}
            </NavLink>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex md:hidden p-2 text-brand-dark hover:text-brand-accent transition-colors cursor-pointer"
          id="nav-mobile-menu-btn"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        <div className="flex items-center gap-3">
          {/* CTA Get in Touch Button */}
          <button
            onClick={openContact}
            className="font-sans text-xs uppercase tracking-[0.15em] font-extrabold px-4.5 py-2.5 border border-brand-dark text-brand-dark hover:bg-brand-accent hover:border-brand-accent hover:text-brand-bg bg-transparent transition-all duration-300 active:scale-95 cursor-pointer sharp-edge hidden md:inline-flex"
            id="nav-cta-btn"
          >
            Get in Touch
          </button>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 bg-brand-dark/30 backdrop-blur-sm z-30 md:hidden"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 240 }}
              className="fixed top-0 right-0 h-full w-72 bg-brand-bg border-l border-brand-dark/15 z-40 md:hidden flex flex-col p-8 pt-24"
              id="mobile-nav-drawer"
            >
              <div className="flex flex-col gap-8">
                {NAV_LINKS.map(({ label, to }) => (
                  <Link
                    key={to}
                    to={to}
                    onClick={() => setMobileOpen(false)}
                    className="font-sans text-sm uppercase tracking-[0.25em] font-semibold text-brand-dark hover:text-brand-accent transition-colors text-left border-b border-brand-dark/10 pb-4"
                  >
                    {label}
                  </Link>
                ))}
              </div>
              <div className="mt-auto">
                <button
                  onClick={() => { openContact(); setMobileOpen(false); }}
                  className="w-full font-sans text-xs uppercase tracking-[0.15em] font-extrabold px-6 py-4 border border-brand-dark text-brand-dark hover:bg-brand-dark hover:text-white transition-all duration-300 sharp-edge cursor-pointer mt-8"
                >
                  Get in Touch
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
