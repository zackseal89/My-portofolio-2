/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CASE_STUDIES } from '../data';
import { CaseStudy } from '../types';

export type Theme = 'dark' | 'light';

interface UIContextValue {
  theme: Theme;
  toggleTheme: () => void;
  isContactOpen: boolean;
  openContact: () => void;
  closeContact: () => void;
  selectedCaseStudy: CaseStudy | null;
  openCaseStudy: (id: string) => void;
  closeCaseStudy: () => void;
}

const UIContext = createContext<UIContextValue | null>(null);

export function UIProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('portfolio_theme');
    if (saved === 'dark' || saved === 'light') return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  const [isContactOpen, setIsContactOpen] = useState(false);
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<CaseStudy | null>(null);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('portfolio_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const openCaseStudy = (id: string) => {
    const study = CASE_STUDIES.find((s) => s.id === id);
    if (study) setSelectedCaseStudy(study);
  };

  const value: UIContextValue = {
    theme,
    toggleTheme,
    isContactOpen,
    openContact: () => setIsContactOpen(true),
    closeContact: () => setIsContactOpen(false),
    selectedCaseStudy,
    openCaseStudy,
    closeCaseStudy: () => setSelectedCaseStudy(null),
  };

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
}

export function useUI(): UIContextValue {
  const ctx = useContext(UIContext);
  if (!ctx) throw new Error('useUI must be used within a UIProvider');
  return ctx;
}
