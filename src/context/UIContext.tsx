/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { createContext, useContext, useState, ReactNode } from 'react';
import { CASE_STUDIES } from '../data';
import { CaseStudy } from '../types';

interface UIContextValue {
  isContactOpen: boolean;
  openContact: () => void;
  closeContact: () => void;
  selectedCaseStudy: CaseStudy | null;
  openCaseStudy: (id: string) => void;
  closeCaseStudy: () => void;
}

const UIContext = createContext<UIContextValue | null>(null);

export function UIProvider({ children }: { children: ReactNode }) {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<CaseStudy | null>(null);

  const openCaseStudy = (id: string) => {
    const study = CASE_STUDIES.find((s) => s.id === id);
    if (study) setSelectedCaseStudy(study);
  };

  const value: UIContextValue = {
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
