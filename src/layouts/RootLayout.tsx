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
    <div className="min-h-screen bg-brand-bg text-brand-dark flex flex-col justify-between selection:bg-brand-accent selection:text-white transition-colors duration-400 relative" id="app-root">
      <ScrollManager />

      {/* Tactile grain overlay */}
      <div className="grain-overlay" />

      {/* Structural Grid Lines (Geometric Balance Frame) */}
      <div className="fixed inset-0 pointer-events-none z-30" id="geometric-frame">
        {/* Outer border padding look */}
        <div className="absolute inset-0 border-[8px] md:border-[14px] border-brand-bg transition-colors duration-400" />
        {/* Structural vertical & horizontal gridlines */}
        <div className="absolute top-0 left-8 md:left-14 w-[1px] h-full bg-brand-dark opacity-[0.04]" />
        <div className="absolute top-0 right-8 md:right-14 w-[1px] h-full bg-brand-dark opacity-[0.04]" />
        <div className="absolute top-8 md:top-14 left-0 w-full h-[1px] bg-brand-dark opacity-[0.04]" />
        <div className="absolute bottom-8 md:bottom-14 left-0 w-full h-[1px] bg-brand-dark opacity-[0.04]" />
      </div>

      <Header />

      <main className="flex-1 w-full flex flex-col relative z-10">
        <Outlet />
      </main>

      <Footer />

      <CaseStudyModal project={selectedCaseStudy} onClose={closeCaseStudy} />
      <ContactDialog isOpen={isContactOpen} onClose={closeContact} />
      <AIChatbot />
    </div>
  );
}
