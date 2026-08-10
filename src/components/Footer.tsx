/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useUI } from '../context/UIContext';

export default function Footer() {
  const [utcTime, setUtcTime] = useState<string>('');
  const { openContact } = useUI();

  useEffect(() => {
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
              © {new Date().getFullYear()} Zachary Ongeri. AI Native Software Developer // Agentic & LLM Systems.<br />
              <span className="font-mono text-[10px] text-brand-accent tracking-widest uppercase font-bold mt-1.5 block">
                Nairobi, Kenya (UTC+3) // Remote with EU, US & APAC Overlap.
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
              SYS_TIME: <span className="text-brand-dark font-medium">{utcTime || 'SYS_ACTIVE'} UTC</span>
            </p>
          </div>
        </div>

        {/* Right Navigation & External Links */}
        <div className="col-span-12 md:col-span-6 flex flex-col justify-between items-start md:items-end gap-8" id="footer-links">
          <div className="flex flex-wrap gap-x-12 gap-y-4" id="footer-nav-menu">
            <Link
              to="/#selected-builds"
              className="font-sans text-xs uppercase tracking-wider text-brand-muted hover:text-brand-dark transition-colors duration-200"
            >
              Builds
            </Link>
            <Link
              to="/projects"
              className="font-sans text-xs uppercase tracking-wider text-brand-muted hover:text-brand-dark transition-colors duration-200"
            >
              Projects
            </Link>
            <Link
              to="/services"
              className="font-sans text-xs uppercase tracking-wider text-brand-muted hover:text-brand-dark transition-colors duration-200"
            >
              Services
            </Link>
            <Link
              to="/about"
              className="font-sans text-xs uppercase tracking-wider text-brand-muted hover:text-brand-dark transition-colors duration-200"
            >
              Build Log
            </Link>
            <button
              onClick={openContact}
              className="font-sans text-xs uppercase tracking-wider text-brand-muted hover:text-brand-dark transition-colors duration-200 cursor-pointer"
            >
              Contact
            </button>
          </div>

          <div className="flex flex-wrap gap-x-8 gap-y-4 md:text-right" id="footer-external-links">
            <a
              href="https://linkedin.com/in/zachary-ongeri-253593231"
              target="_blank"
              rel="noopener noreferrer"
              className="font-sans text-sm text-brand-muted hover:text-brand-dark transition-colors duration-200 inline-block hover:-translate-y-0.5 transition-transform"
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/zacharyongeri"
              target="_blank"
              rel="noopener noreferrer"
              className="font-sans text-sm text-brand-muted hover:text-brand-dark transition-colors duration-200 inline-block hover:-translate-y-0.5 transition-transform"
            >
              GitHub
            </a>
            <a
              href="mailto:zacharyongeri121@gmail.com"
              className="font-sans text-sm text-brand-muted hover:text-brand-dark transition-colors duration-200 inline-block hover:-translate-y-0.5 transition-transform"
            >
              zacharyongeri121@gmail.com
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
