/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import { CASE_STUDIES } from '../data';
import { useUI } from '../context/UIContext';
import zacharyPortrait from '../assets/images/zachary-portrait.jpg';

export default function HomePage() {
  const { openContact, openCaseStudy } = useUI();

  const scrollToCaseStudies = () => {
    document.getElementById('strategic-impact')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <>
      {/* HERO SECTION */}
      <section
        className="pt-40 md:pt-48 pb-20 md:pb-32 px-6 md:px-12 w-full max-w-7xl mx-auto"
        id="hero"
      >
        <div className="grid grid-cols-12 gap-8 items-center">
          <div className="col-span-12 lg:col-span-8">

            {/* Core tag indicator */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 mb-6 border border-brand-accent/30 bg-brand-accent/5 px-3.5 py-1.5 sharp-edge"
              id="hero-tag"
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-brand-accent animate-pulse"></span>
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] font-extrabold text-brand-accent">
                SYSTEMS BUILDER // OPERATOR // ALLOCATOR IN TRAINING
              </span>
            </motion.div>

            {/* Title Header matching original layout text */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif text-4xl sm:text-5xl md:text-[52px] lg:text-[58px] font-bold text-brand-dark leading-[1.12] tracking-tighter mb-8 max-w-5xl"
              id="hero-headline"
            >
              I build the systems that turn chaos into something repeatable, across legal compliance, ecommerce, and capital.
            </motion.h1>

            {/* Paragraph describing vision */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="font-sans text-base sm:text-lg text-brand-muted leading-relaxed mb-12 max-w-3xl"
              id="hero-subtitle"
            >
              Founder-operator, not an agency. I run RegWatch inside a law firm, build FORMA from the sourcing layer up, and trade my own capital, so I build for clients the way I build for myself.
            </motion.p>

            {/* View Case studies triggers */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-wrap gap-4 items-center"
            >
              <button
                onClick={scrollToCaseStudies}
                className="bg-brand-dark text-white border border-brand-dark hover:bg-brand-accent hover:border-brand-accent px-8 py-4.5 font-sans text-xs uppercase tracking-[0.16em] font-extrabold transition-all duration-300 sharp-edge tracking-widest cursor-pointer hover:shadow-lg active:scale-95"
                id="hero-case-studies-btn"
              >
                View Case Studies
              </button>
              <button
                onClick={openContact}
                className="bg-transparent text-brand-dark border border-brand-dark px-8 py-4.5 font-sans text-xs uppercase tracking-[0.16em] font-extrabold transition-all duration-300 sharp-edge tracking-widest hover:bg-brand-dark hover:text-white cursor-pointer active:scale-95 animate-pulse hover:animate-none"
                id="hero-contact-btn"
              >
                Book Systems Audit
              </button>
            </motion.div>

          </div>

          {/* Cloud-shaped Bio Portrait right column */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 25 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="col-span-12 lg:col-span-4 flex justify-center lg:justify-end items-center relative py-6"
            id="hero-cloudy-portrait"
          >
            {/* Background decorative matrix/lines for Geometric Balance */}
            <div className="absolute inset-0 max-w-[340px] max-h-[340px] mx-auto lg:mr-0 pointer-events-none opacity-20" style={{ backgroundImage: 'radial-gradient(#121212 1px, transparent 0)', backgroundSize: '16px 16px' }} />

            {/* Spinning geometric balance alignment rings */}
            <div className="absolute w-[360px] h-[360px] rounded-full border border-dashed border-brand-dark/15 animate-[spin_40s_linear_infinite] hidden md:block" />
            <div className="absolute w-[320px] h-[320px] rounded-full border border-brand-dark/10 hidden md:block" />

            {/* The cloudy portrait body */}
            <div className="relative w-72 h-72 sm:w-80 sm:h-80 mx-auto lg:mr-0">

              {/* Layer 1: Elegant background solid shape offset slightly */}
              <div className="absolute inset-0 bg-brand-dark/5 rounded-[60%_40%_70%_30%_/_50%_60%_40%_50%] animate-[pulse_4s_ease-in-out_infinite] scale-105" />

              {/* Layer 2: A thin border organic shape rotating slowly */}
              <div className="absolute inset-0 border border-brand-dark rounded-[40%_60%_30%_70%_/_60%_50%_60%_40%] animate-[spin_25s_linear_infinite] opacity-60" />

              {/* Layer 3: The actual image masked inside a fluid organic cloud shape */}
              <div
                className="absolute inset-0 overflow-hidden rounded-[60%_40%_70%_30%_/_50%_60%_40%_50%] border-2 border-brand-dark shadow-md bg-white transition-all duration-[1000ms] ease-out hover:rounded-[50%_50%_40%_60%_/_60%_40%_60%_40%] group cursor-pointer"
              >
                <img
                  src={zacharyPortrait}
                  alt="Zachary Ongeri - Profile Portrait"
                  className="w-full h-full object-cover scale-105 group-hover:scale-110 group-hover:rotate-1 transition-all duration-700"
                />
                {/* Subtle scanline / dot texture overlay */}
                <div className="absolute inset-0 bg-brand-dark/[0.02] pointer-events-none mix-blend-overlay" />
              </div>

              {/* Technical dynamic callout pill */}
              <div className="absolute -bottom-2 right-4 bg-brand-dark text-brand-bg px-3 py-1 font-mono text-[9px] uppercase tracking-widest leading-none sharp-edge border border-brand-accent shadow-sm z-10">
                SYSTEM_INTEGRA_0x0
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* STRATEGIC IMPACT SECTION: The Why & Systematic Optimization columns */}
      <section
        className="py-24 md:py-32 px-6 md:px-12 w-full max-w-7xl mx-auto border-t border-brand-dark/15"
        id="strategic-impact"
      >
        <div className="grid grid-cols-12 gap-8">

          {/* Section Tag */}
          <div className="col-span-12 mb-16">
            <span className="font-sans text-xs uppercase tracking-[0.2em] font-extrabold text-brand-accent block mb-3">
              Strategic Impact
            </span>
            <h2 className="font-serif text-3xl md:text-5xl font-bold tracking-tight text-brand-dark">
              Systematic Optimization
            </h2>
            <p className="font-sans text-sm text-brand-muted mt-2 max-w-lg">
              Click any core optimization construct below to load the live pipeline simulation node sandbox.
            </p>
          </div>

          {/* Three Pillar Columns mapped to cases for unified UX */}
          {CASE_STUDIES.map((study) => (
            <motion.div
              key={study.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10% 0px' }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => openCaseStudy(study.id)}
              className="col-span-12 md:col-span-4 flex flex-col gap-6 group hover:border-brand-accent/40 border border-transparent p-4 md:p-6 transition-all duration-300 sharp-edge cursor-pointer select-none bg-brand-dark/[0.02]"
              id={`pillar-${study.id}`}
            >
              {/* Visual Number Indicator */}
              <div className="flex justify-between items-center text-brand-accent/80">
                <span className="font-serif text-2xl font-bold text-brand-accent group-hover:text-brand-dark transition-colors duration-300">
                  {study.number}
                </span>
                <ArrowUpRight className="opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300 shrink-0" size={16} />
              </div>

              {/* Pillar Heading with sharp rule line */}
              <div className="space-y-4">
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-brand-dark border-b border-brand-dark pb-4 group-hover:border-brand-accent transition-colors duration-300 min-h-[64px] flex items-end">
                  {study.title}
                </h3>

                {/* Detailed Description */}
                <p className="font-sans text-sm text-brand-muted leading-relaxed">
                  {study.description}
                </p>
              </div>

              {/* Staggered indicators showing tech specs inside the card */}
              <div className="pt-4 mt-auto flex flex-wrap gap-1">
                {study.technologies.slice(0, 3).map((tech, idx) => (
                  <span
                    key={idx}
                    className="font-mono text-[9px] uppercase tracking-wide px-2 py-0.5 border border-brand-dark/10 text-brand-muted bg-brand-surface sharp-edge"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="font-sans text-xs uppercase tracking-wider font-extrabold text-brand-accent inline-flex items-center gap-1 mt-2">
                <span>Enter sandbox</span>
                <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.div>
          ))}

        </div>
      </section>

      {/* TRUST AND QUOTE BLOCK */}
      <section className="py-24 md:py-32 px-6 md:px-12 w-full max-w-7xl mx-auto border-t border-brand-dark/15 text-center">
        <div className="max-w-2xl mx-auto space-y-6">
          <span className="font-sans text-[10px] uppercase tracking-[0.25em] font-extrabold text-brand-accent">
            Core Client Directive
          </span>
          <blockquote className="font-serif text-2xl md:text-3xl font-bold italic tracking-tight text-brand-dark leading-snug">
            "Every line of software code should optimize a balance sheet metric. If it doesn't reduce cost or drive transaction magnitude, it is obsolete clutter."
          </blockquote>
          <p className="font-mono text-[11px] text-brand-muted uppercase">
            // ZACHARY, Principal Architect
          </p>
        </div>
      </section>
    </>
  );
}
