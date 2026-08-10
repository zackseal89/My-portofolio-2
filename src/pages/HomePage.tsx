/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowUpRight, ArrowRight, Check, Mail, Linkedin, Github, Globe, ExternalLink, Terminal, Sparkles, BookOpen } from 'lucide-react';
import { CASE_STUDIES, PROJECTS, EXPERIENCES, SKILL_CATEGORIES, BUILD_DECISIONS } from '../data';
import { useUI } from '../context/UIContext';
import zacharyPortrait from '../assets/images/zachary-portrait.jpg';
import BuildLog from '../components/BuildLog';
import { loadWritingPieces } from '../lib/writing';
import { sendLeadViaMailto } from '../lib/contact';
import { WritingPiece } from '../types';

interface HomePageProps {
  anchor?: string;
}

export default function HomePage({ anchor }: HomePageProps) {
  const { openContact, openCaseStudy } = useUI();
  const navigate = useNavigate();
  const writingPieces = loadWritingPieces();

  // Contact form state
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMsg, setContactMsg] = useState('');
  const [contactSent, setContactSent] = useState(false);

  useEffect(() => {
    if (anchor) {
      setTimeout(() => {
        document.getElementById(anchor)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 150);
    }
  }, [anchor]);

  const handleContactSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!contactName || !contactEmail || !contactMsg) return;
    sendLeadViaMailto({ name: contactName, email: contactEmail, message: contactMsg });
    setContactSent(true);
  };

  const handleArticleClick = (piece: WritingPiece) => {
    if (piece.url) {
      window.open(piece.url, '_blank', 'noopener,noreferrer');
    } else {
      navigate(`/writing/${piece.slug}`);
    }
  };

  return (
    <div className="w-full flex flex-col items-center">
      {/* 00 HERO SECTION: Quiet, Confident, Understated */}
      <section
        className="pt-36 md:pt-44 pb-20 md:pb-28 px-6 md:px-12 w-full max-w-7xl mx-auto"
        id="hero"
      >
        <div className="grid grid-cols-12 gap-8 items-center">
          <div className="col-span-12 lg:col-span-8 space-y-6">

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 border border-brand-accent/30 bg-brand-accent/5 px-3 py-1.5 sharp-edge"
              id="hero-tag"
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-brand-accent animate-pulse"></span>
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] font-bold text-brand-accent">
                AI NATIVE SOFTWARE DEVELOPER // AGENTIC & LLM SYSTEMS
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-bold text-brand-dark leading-[1.12] tracking-tighter max-w-4xl"
              id="hero-headline"
            >
              I take products from an empty repository to something a business runs on.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="font-sans text-sm sm:text-base text-brand-muted leading-relaxed max-w-2xl"
              id="hero-subtitle"
            >
              Retrieval systems and agents, storefronts I design as well as build, and the infrastructure underneath both. Founder operator rather than agency, carrying the cost of my own bad architecture decisions. Every line of code should move a balance sheet number.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="flex flex-wrap gap-3 pt-2"
            >
              <button
                onClick={() => document.getElementById('builds')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-brand-dark text-brand-bg border border-brand-dark hover:bg-brand-accent hover:border-brand-accent px-6 py-3.5 font-mono text-xs uppercase tracking-wider font-bold sharp-edge cursor-pointer transition-colors"
                id="hero-case-studies-btn"
              >
                [01] Selected Builds
              </button>
              <button
                onClick={openContact}
                className="bg-transparent text-brand-dark border border-brand-dark px-6 py-3.5 font-mono text-xs uppercase tracking-wider font-bold sharp-edge hover:bg-brand-dark hover:text-brand-bg cursor-pointer transition-colors"
                id="hero-contact-btn"
              >
                [02] Systems Audit
              </button>
            </motion.div>

          </div>

          {/* Profile Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="col-span-12 lg:col-span-4 flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-[320px] bg-brand-surface border border-brand-dark/20 p-4 sharp-edge shadow-sm space-y-4">
              <div className="aspect-square w-full overflow-hidden border border-brand-dark/10 sharp-edge">
                <img
                  src={zacharyPortrait}
                  alt="Zachary Ongeri"
                  className="w-full h-full object-cover grayscale brightness-95 hover:grayscale-0 transition-all duration-700"
                />
              </div>

              <div className="space-y-2 font-sans text-xs">
                <div className="flex justify-between items-center border-b border-brand-dark/10 pb-2">
                  <span className="font-mono text-[9px] uppercase tracking-wider text-brand-muted">LOCATION</span>
                  <span className="font-bold text-brand-dark">Nairobi, Kenya (UTC+3)</span>
                </div>
                <div className="flex justify-between items-center border-b border-brand-dark/10 pb-2">
                  <span className="font-mono text-[9px] uppercase tracking-wider text-brand-muted">EDUCATION</span>
                  <span className="font-bold text-brand-dark">University of Nairobi</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-mono text-[9px] uppercase tracking-wider text-brand-muted">AVAILABILITY</span>
                  <span className="font-bold text-brand-accent">EU / US / APAC Overlap</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 01 SELECTED BUILDS SECTION */}
      <section
        className="py-20 md:py-28 px-6 md:px-12 w-full max-w-7xl mx-auto border-t border-brand-dark/15"
        id="builds"
      >
        <div className="space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 border border-brand-accent/30 bg-brand-accent/5 px-3 py-1 sharp-edge">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] font-bold text-brand-accent">
              // 01 SELECTED BUILDS
            </span>
          </div>
          <h2 className="font-serif text-3xl md:text-5xl font-bold tracking-tight text-brand-dark">
            Production Architectures
          </h2>
          <p className="font-sans text-xs md:text-sm text-brand-muted max-w-xl leading-relaxed">
            Click any build below to launch the live system architecture sandbox.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CASE_STUDIES.map((study) => (
            <motion.div
              key={study.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              onClick={() => openCaseStudy(study.id)}
              className="p-6 border border-brand-dark/15 bg-brand-surface hover:border-brand-accent transition-all duration-300 sharp-edge cursor-pointer select-none space-y-4 flex flex-col justify-between group"
            >
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="font-serif text-xl font-bold text-brand-accent">
                    {study.number}
                  </span>
                  <span className="font-mono text-[9px] uppercase tracking-wider px-2 py-0.5 border border-brand-dark/10 text-brand-muted sharp-edge">
                    {study.category}
                  </span>
                </div>

                <h3 className="font-serif text-xl font-bold text-brand-dark group-hover:text-brand-accent transition-colors border-b border-brand-dark/10 pb-3">
                  {study.title}
                </h3>

                <p className="font-sans text-xs text-brand-muted leading-relaxed">
                  {study.description}
                </p>
              </div>

              <div className="pt-4 border-t border-brand-dark/10 flex justify-between items-center">
                <span className="font-mono text-[9px] uppercase tracking-wide text-brand-muted">
                  {study.metricValue}
                </span>
                <span className="font-mono text-[10px] uppercase font-bold text-brand-accent flex items-center gap-1">
                  <span>Sandbox</span>
                  <ArrowRight size={10} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 02 & 03 BUILD LOG & METHODOLOGY */}
      <BuildLog />

      {/* 04 TECHNICAL STACK & DOMAINS SHIPPED */}
      <section
        className="py-20 md:py-28 px-6 md:px-12 w-full max-w-7xl mx-auto border-t border-brand-dark/15"
        id="stack"
      >
        <div className="space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 border border-brand-accent/30 bg-brand-accent/5 px-3 py-1 sharp-edge">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] font-bold text-brand-accent">
              // 04 TECHNICAL STACK
            </span>
          </div>
          <h2 className="font-serif text-3xl md:text-5xl font-bold tracking-tight text-brand-dark">
            Stack & Domains Shipped In
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SKILL_CATEGORIES.map((cat) => (
            <div key={cat.id} className="p-6 border border-brand-dark/15 bg-brand-surface sharp-edge space-y-4">
              <h3 className="font-mono text-xs uppercase tracking-widest font-bold text-brand-accent border-b border-brand-dark/10 pb-3">
                {cat.category}
              </h3>
              <div className="space-y-2 font-sans text-xs text-brand-muted">
                {cat.skills.map((skill, sIdx) => (
                  <div key={sIdx} className="flex items-center gap-2">
                    <span className="h-1 w-1 bg-brand-dark shrink-0" />
                    <span>{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 05 WRITING & ARTICLES (Git-as-CMS markdown loader) */}
      <section
        className="py-20 md:py-28 px-6 md:px-12 w-full max-w-7xl mx-auto border-t border-brand-dark/15"
        id="writing"
      >
        <div className="space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 border border-brand-accent/30 bg-brand-accent/5 px-3 py-1 sharp-edge">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] font-bold text-brand-accent">
              // 05 WRITING & ARTICLES
            </span>
          </div>
          <h2 className="font-serif text-3xl md:text-5xl font-bold tracking-tight text-brand-dark">
            Technical Articles & Essays
          </h2>
          <p className="font-sans text-xs md:text-sm text-brand-muted max-w-xl leading-relaxed">
            Written in local Markdown and published directly via Git commit (`src/content/writing/*.md`). Click any piece to read natively on-site.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {writingPieces.map((piece, idx) => (
            <div
              key={piece.slug}
              onClick={() => handleArticleClick(piece)}
              className="p-6 border border-brand-dark/15 bg-brand-surface hover:border-brand-accent transition-all duration-300 sharp-edge space-y-4 flex flex-col justify-between cursor-pointer select-none group"
            >
              <div className="space-y-3">
                <div className="flex justify-between items-center font-mono text-[9px] uppercase font-bold">
                  <span className="px-2 py-0.5 border border-brand-accent/30 bg-brand-accent/5 text-brand-accent sharp-edge">
                    {piece.category || piece.type}
                  </span>
                  <span className="text-brand-muted">{piece.readTime || '3 min read'}</span>
                </div>

                <h3 className="font-serif text-lg font-bold text-brand-dark group-hover:text-brand-accent transition-colors border-b border-brand-dark/10 pb-3">
                  {piece.title}
                </h3>

                <p className="font-sans text-xs text-brand-muted leading-relaxed line-clamp-3">
                  {piece.blurb}
                </p>
              </div>

              <div className="pt-4 border-t border-brand-dark/10 flex justify-between items-center font-mono text-[10px] font-bold text-brand-accent">
                <span>Read Article</span>
                {piece.url ? <ExternalLink size={11} /> : <BookOpen size={11} className="group-hover:translate-x-0.5 transition-transform" />}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 06 DIRECT INGRESS CONTACT */}
      <section
        className="py-20 md:py-28 px-6 md:px-12 w-full max-w-7xl mx-auto border-t border-brand-dark/15"
        id="contact"
      >
        <div className="grid grid-cols-12 gap-8 items-start">
          <div className="col-span-12 lg:col-span-6 space-y-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 border border-brand-accent/30 bg-brand-accent/5 px-3 py-1 sharp-edge">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] font-bold text-brand-accent">
                  // 06 DIRECT INGRESS
                </span>
              </div>
              <h2 className="font-serif text-3xl md:text-5xl font-bold tracking-tight text-brand-dark">
                Get in Touch
              </h2>
              <p className="font-sans text-xs md:text-sm text-brand-muted max-w-md leading-relaxed">
                Book a 30-minute systems audit or discuss a build sprint. Opens your default email client directly to Zachary.
              </p>
            </div>

            <div className="p-6 border border-brand-dark/15 bg-brand-surface sharp-edge space-y-4">
              <div className="flex items-center gap-3">
                <Mail size={16} className="text-brand-accent" />
                <a href="mailto:zacharyongeri121@gmail.com" className="font-sans text-sm font-bold text-brand-dark hover:underline">
                  zacharyongeri121@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Linkedin size={16} className="text-brand-accent" />
                <a href="https://linkedin.com/in/zachary-ongeri-253593231" target="_blank" rel="noreferrer" className="font-sans text-sm font-bold text-brand-dark hover:underline">
                  LinkedIn Profile
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Github size={16} className="text-brand-accent" />
                <a href="https://github.com/zacharyongeri" target="_blank" rel="noreferrer" className="font-sans text-sm font-bold text-brand-dark hover:underline">
                  GitHub
                </a>
              </div>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-6">
            <div className="p-6 md:p-8 border border-brand-dark bg-brand-surface sharp-edge space-y-4">
              <h3 className="font-serif text-xl font-bold text-brand-dark border-b border-brand-dark/10 pb-3">
                Quick Requisition Brief
              </h3>

              {contactSent ? (
                <div className="p-4 bg-brand-accent/10 border border-brand-accent text-brand-dark font-sans text-xs sharp-edge">
                  ✅ Mailto link triggered in your browser. Send there to complete.
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-4 font-sans text-xs">
                  <div className="space-y-1">
                    <label className="font-mono text-[9px] uppercase font-bold text-brand-muted">Name *</label>
                    <input
                      type="text"
                      required
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      placeholder="Your name"
                      className="w-full p-2.5 bg-brand-bg border border-brand-dark/15 text-brand-dark sharp-edge focus:border-brand-accent focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-mono text-[9px] uppercase font-bold text-brand-muted">Email *</label>
                    <input
                      type="email"
                      required
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      placeholder="email@organization.co"
                      className="w-full p-2.5 bg-brand-bg border border-brand-dark/15 text-brand-dark sharp-edge focus:border-brand-accent focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-mono text-[9px] uppercase font-bold text-brand-muted">Brief *</label>
                    <textarea
                      rows={3}
                      required
                      value={contactMsg}
                      onChange={(e) => setContactMsg(e.target.value)}
                      placeholder="Describe system goals..."
                      className="w-full p-2.5 bg-brand-bg border border-brand-dark/15 text-brand-dark sharp-edge focus:border-brand-accent focus:outline-none resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3 bg-brand-dark text-brand-bg hover:bg-brand-accent hover:text-brand-dark font-mono text-xs uppercase tracking-widest font-bold sharp-edge transition-colors cursor-pointer"
                  >
                    Transmit Requisition &rarr;
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
