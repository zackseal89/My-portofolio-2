/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CaseStudyModal from '../components/CaseStudyModal';
import ContactDialog from '../components/ContactDialog';
import AIChatbot from '../components/AIChatbot';
import ScrollManager from '../components/ScrollManager';
import { useUI } from '../context/UIContext';

export default function RootLayout() {
  const { isContactOpen, closeContact, selectedCaseStudy, closeCaseStudy } = useUI();

  return (
    <div className="min-h-screen bg-brand-bg text-brand-dark flex flex-col justify-between selection:bg-brand-accent selection:text-brand-bg transition-colors duration-300 relative" id="app-root">
      <ScrollManager />

      {/* Structural Grid Lines (Geometric Balance Decoration) */}
      <div className="fixed inset-0 pointer-events-none z-30" id="geometric-frame">
        {/* Outer border padding look of the design */}
        <div className="absolute inset-0 border-[12px] md:border-[16px] border-brand-bg" />
        {/* Structural vertical & horizontal gridlines */}
        <div className="absolute top-0 left-10 md:left-16 w-[1px] h-full bg-brand-dark opacity-[0.03]" />
        <div className="absolute top-0 right-10 md:right-16 w-[1px] h-full bg-brand-dark opacity-[0.03]" />
        <div className="absolute top-10 md:top-16 left-0 w-full h-[1px] bg-brand-dark opacity-[0.03]" />
        <div className="absolute bottom-10 md:bottom-16 left-0 w-full h-[1px] bg-brand-dark opacity-[0.03]" />
      </div>

      <Header />

      <main className="flex-1 w-full flex flex-col">
        <Outlet />
      </main>

      <Footer />

      <CaseStudyModal project={selectedCaseStudy} onClose={closeCaseStudy} />
      <ContactDialog isOpen={isContactOpen} onClose={closeContact} />
      <AIChatbot />
    </div>
  );
}
