/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';

interface HeaderProps {
  onContactClick: () => void;
  onNavigate: (sectionId: string) => void;
}

export default function Header({ onContactClick, onNavigate }: HeaderProps) {
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
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="font-serif text-2xl md:text-3xl font-bold tracking-tighter text-brand-dark cursor-pointer transition-transform duration-300 hover:scale-[1.02]"
          id="nav-logo"
        >
          ZACHARY
        </button>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-10 lg:gap-14">
          <button 
            onClick={() => onNavigate('work')}
            className="font-sans text-[11px] uppercase tracking-[0.3em] font-semibold text-brand-dark hover:text-brand-accent transition-colors duration-300 cursor-pointer relative"
            id="nav-work-btn"
          >
            Case Studies
          </button>
          <button 
            onClick={() => onNavigate('projects')}
            className="font-sans text-[11px] uppercase tracking-[0.3em] font-semibold text-brand-dark hover:text-brand-accent transition-colors duration-300 cursor-pointer relative"
            id="nav-projects-btn"
          >
            Projects
          </button>
          <button 
            onClick={() => onNavigate('about')}
            className="font-sans text-[11px] uppercase tracking-[0.3em] font-semibold text-brand-dark hover:text-brand-accent transition-colors duration-300 cursor-pointer relative"
            id="nav-about-btn"
          >
            About
          </button>
          <button 
            onClick={() => onNavigate('services')}
            className="font-sans text-[11px] uppercase tracking-[0.3em] font-semibold text-brand-dark hover:text-brand-accent transition-colors duration-300 cursor-pointer relative"
            id="nav-services-btn"
          >
            Services
          </button>
          <button 
            onClick={() => onNavigate('contact')}
            className="font-sans text-[11px] uppercase tracking-[0.3em] font-semibold text-brand-dark hover:text-brand-accent transition-colors duration-300 cursor-pointer relative"
            id="nav-contact-btn"
          >
            Contact
          </button>
        </div>

        {/* CTA Get in Touch Button */}
        <button 
          onClick={onContactClick}
          className="font-sans text-xs uppercase tracking-[0.15em] font-semibold px-5 py-2.5 border border-brand-dark text-brand-dark hover:bg-brand-dark hover:text-brand-bg transition-all duration-300 active:scale-95 cursor-pointer"
          id="nav-cta-btn"
        >
          Get in Touch
        </button>
      </div>
    </motion.nav>
  );
}
