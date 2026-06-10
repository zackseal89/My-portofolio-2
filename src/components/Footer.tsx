/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from 'react';

interface FooterProps {
  onContactClick: () => void;
  onNavigate: (sectionId: string) => void;
  onSignatureClick: () => void;
}

export default function Footer({ onContactClick, onNavigate, onSignatureClick }: FooterProps) {
  const [utcTime, setUtcTime] = useState<string>('2026-06-09 20:10:57');
  const [clickCount, setClickCount] = useState(0);

  const handleSignatureClick = () => {
    setClickCount((prev) => {
      const next = prev + 1;
      if (next >= 3) {
        onSignatureClick();
        return 0;
      }
      return next;
    });
  };

  useEffect(() => {
    if (clickCount > 0) {
      const timeout = setTimeout(() => {
        setClickCount(0);
      }, 1500);
      return () => clearTimeout(timeout);
    }
  }, [clickCount]);

  useEffect(() => {
    // Dynamic real-time UTC clock update to complement the professional precision of Zachary's work
    const timer = setInterval(() => {
      const now = new Date();
      const formatDigit = (num: number) => num.toString().padStart(2, '0');
      
      const yyyy = now.getUTCFullYear();
      const mm = formatDigit(now.getUTCMonth() + 1);
      const dd = formatDigit(now.getUTCDate());
      const hh = formatDigit(now.getUTCHours());
      const min = formatDigit(now.getUTCMinutes());
      const ss = formatDigit(now.getUTCSeconds());
      
      setUtcTime(`${yyyy}-${mm}-${dd} ${hh}:${min}:${ss}`);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <footer className="w-full py-24 bg-brand-bg border-t border-brand-dark/20" id="main-footer">
      <div className="grid grid-cols-12 gap-y-12 md:gap-y-0 px-6 md:px-12 max-w-7xl mx-auto items-stretch">
        
        {/* Left Signature */}
        <div className="col-span-12 md:col-span-6 flex flex-col justify-between gap-6" id="footer-brand-info">
          <div>
            <div className="font-serif text-3xl font-bold tracking-tighter text-brand-dark mb-4 font-black">ZACHARY ONGERI</div>
            <p className="font-sans text-xs text-brand-muted/85 leading-relaxed max-w-sm">
              © {new Date().getFullYear()} Zachary Ongeri. AI Engineer for Marketing & Ecommerce.<br />
              <span 
                onClick={handleSignatureClick}
                className="font-mono text-[10px] text-brand-accent tracking-widest uppercase font-bold mt-1.5 block cursor-pointer select-none"
              >
                Built in Nairobi. Working everywhere.
              </span>
            </p>
          </div>
          
          {/* Live UTC precision block */}
          <div className="flex items-center gap-2" id="footer-time-clock">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-accent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-accent"></span>
            </span>
            <p className="font-mono text-xs text-brand-muted tracking-tight">
              SYS_TIME: <span className="text-brand-dark font-medium">{utcTime} UTC</span>
            </p>
          </div>
        </div>

        {/* Right Navigation & External Links */}
        <div className="col-span-12 md:col-span-6 flex flex-col justify-between items-start md:items-end gap-8" id="footer-links">
          <div className="flex flex-wrap gap-x-12 gap-y-4" id="footer-nav-menu">
            <button 
              onClick={() => onNavigate('work')}
              className="font-sans text-xs uppercase tracking-wider text-brand-muted hover:text-brand-dark transition-colors duration-200"
            >
              Work
            </button>
            <button 
              onClick={() => onNavigate('services')}
              className="font-sans text-xs uppercase tracking-wider text-brand-muted hover:text-brand-dark transition-colors duration-200"
            >
              Services
            </button>
            <button 
              onClick={onContactClick}
              className="font-sans text-xs uppercase tracking-wider text-brand-muted hover:text-brand-dark transition-colors duration-200"
            >
              Contact
            </button>
          </div>

          <div className="flex flex-wrap gap-x-8 gap-y-4 md:text-right" id="footer-external-links">
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="font-sans text-sm text-brand-muted hover:text-brand-dark transition-colors duration-200 inline-block hover:-translate-y-0.5 transition-transform"
            >
              LinkedIn
            </a>
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="font-sans text-sm text-brand-muted hover:text-brand-dark transition-colors duration-200 inline-block hover:-translate-y-0.5 transition-transform"
            >
              GitHub
            </a>
            <a 
              href="https://read.cv" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="font-sans text-sm text-brand-muted hover:text-brand-dark transition-colors duration-200 inline-block hover:-translate-y-0.5 transition-transform"
            >
              Read.cv
            </a>
            <a 
              href="mailto:zacharyongeri121@gmail.com" 
              className="font-sans text-sm text-brand-muted hover:text-brand-dark transition-colors duration-200 inline-block hover:-translate-y-0.5 transition-transform"
            >
              Email
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
