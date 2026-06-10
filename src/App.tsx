/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, FormEvent } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Sparkles, ArrowUpRight, ArrowRight, CornerDownRight, CheckCircle2, Cpu, Flame, Layers } from 'lucide-react';
import Header from './components/Header';
import Footer from './components/Footer';
import CaseStudyModal from './components/CaseStudyModal';
import ContactDialog from './components/ContactDialog';
import AIChatbot from './components/AIChatbot';
import SystemsHub from './components/SystemsHub';
import { CASE_STUDIES, SERVICES, PROJECTS, EXPERIENCES, SKILL_CATEGORIES } from './data';
import { CaseStudy } from './types';
import { Github, ExternalLink, Mail, Linkedin, Compass, Check, Code, MapPin, AppWindow, GraduationCap, Terminal } from 'lucide-react';
import { initAuth } from './lib/firebase';

export default function App() {
  const [selectedProject, setSelectedProject] = useState<CaseStudy | null>(null);
  const [isContactOpen, setIsContactOpen] = useState<boolean>(false);
  const [isSystemsHubOpen, setIsSystemsHubOpen] = useState<boolean>(false);
  const [activeTab, setActiveTab2] = useState<'work' | 'services' | 'all'>('all');
  const [isAdminVerified, setIsAdminVerified] = useState<boolean>(false);
  
  // Observe auth state for header shortcut link rendering
  useEffect(() => {
    const unsubscribe = initAuth(
      (user) => {
        setIsAdminVerified(user.email === 'zacharyongeri121@gmail.com');
      },
      () => {
        setIsAdminVerified(false);
      }
    );
    return () => unsubscribe();
  }, []);

  // Track currently active section to highlight navigation
  const [activeSection, setActiveSection] = useState<string>('hero');

  // Interactive on-page Contact Form states
  const [onPageName, setOnPageName] = useState<string>('');
  const [onPageEmail, setOnPageEmail] = useState<string>('');
  const [onPageMessage, setOnPageMessage] = useState<string>('');
  const [onPageStatus, setOnPageStatus] = useState<'idle' | 'analyzing' | 'complete'>('idle');
  const [activeStepIndex, setActiveStepIndex] = useState<number>(-1);

  const handleOnPageSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!onPageName || !onPageEmail || !onPageMessage) return;
    
    setOnPageStatus('analyzing');
    setActiveStepIndex(0);
    
    const intervals = [700, 1600, 2500, 3400];
    intervals.forEach((delay, idx) => {
      setTimeout(() => {
        setActiveStepIndex(idx + 1);
        if (idx === intervals.length - 1) {
          setOnPageStatus('complete');
        }
      }, delay);
    });
  };

  // Simple scroll parallax or reveal triggers for the visual images
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY;
      const sections = ['hero', 'strategic-impact', 'projects', 'about', 'scale', 'services', 'contact'];
      
      for (const sect of sections) {
        const el = document.getElementById(sect);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            setActiveSection(sect);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigate = (sectionId: string) => {
    const target = document.getElementById(sectionId === 'work' ? 'strategic-impact' : sectionId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleOpenProject = (id: string) => {
    const proj = CASE_STUDIES.find(p => p.id === id);
    if (proj) {
      setSelectedProject(proj);
    }
  };

  return (
    <div className="min-h-screen bg-brand-bg text-brand-dark flex flex-col justify-between selection:bg-brand-accent selection:text-brand-bg transition-colors duration-300 relative" id="app-root">
      
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

      {/* Header element */}
      <Header 
        onContactClick={() => setIsContactOpen(true)} 
        onSystemsHubClick={() => setIsSystemsHubOpen(true)}
        onNavigate={handleNavigate} 
        showSystemsHub={isAdminVerified}
      />

      {/* Main Container */}
      <main className="flex-1 w-full flex flex-col">
        
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
                  AI + E-COMMERCE SYSTEMS ENGINEER
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
                I build AI agents, agentic workflows, and custom Shopify systems that turn marketing operations into infrastructure.
              </motion.h1>

              {/* Paragraph describing vision */}
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="font-sans text-base sm:text-lg text-brand-muted leading-relaxed mb-12 max-w-3xl"
                id="hero-subtitle"
              >
                Founder-operator, not an agency. I run my own ecommerce brand, so I build for clients the way I build for myself.
              </motion.p>

              {/* View Case studies triggers */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="flex flex-wrap gap-4 items-center"
              >
                <button 
                  onClick={() => handleNavigate('work')}
                  className="bg-brand-dark text-white border border-brand-dark hover:bg-brand-accent hover:border-brand-accent px-8 py-4.5 font-sans text-xs uppercase tracking-[0.16em] font-extrabold transition-all duration-300 sharp-edge tracking-widest cursor-pointer hover:shadow-lg active:scale-95"
                  id="hero-case-studies-btn"
                >
                  View Case Studies
                </button>
                <button 
                  onClick={() => setIsContactOpen(true)}
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
                    src="https://media.licdn.com/dms/image/v2/D4D03AQG2nV9o6P3X2Q/profile-displayphoto-shrink_800_800/B4DZXrNj2zG8Ac-/0/1743407956567?e=1782345600&v=beta&t=UmBQsysCROP2eZ3sUT-b50eA2J-BBBhMGcsJeGWulyU"
                    alt="Zachary Ongeri - Profile Portrait"
                    className="w-full h-full object-cover scale-105 group-hover:scale-110 group-hover:rotate-1 transition-all duration-700"
                    referrerPolicy="no-referrer"
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
                onClick={() => setSelectedProject(study)}
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

        {/* PROJECTS SECTION */}
        <section 
          className="py-24 md:py-32 px-6 md:px-12 w-full max-w-7xl mx-auto border-t border-brand-dark/15" 
          id="projects"
        >
          <div className="grid grid-cols-12 gap-8 mb-16">
            <div className="col-span-12">
              <span className="font-sans text-xs uppercase tracking-[0.2em] font-extrabold text-brand-accent block mb-3">
                CREATIVE CONSTRUCTS // LIVE DEMOS
              </span>
              <h2 className="font-serif text-3xl md:text-5xl font-bold tracking-tight text-brand-dark">
                Bespoke Projects
              </h2>
              <p className="font-sans text-sm text-brand-muted mt-2 max-w-lg">
                Explore custom autonomous software integrations with link access to secure live demos and production source code repositories.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {PROJECTS.map((project) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-10% 0px' }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="border border-brand-dark/15 hover:border-brand-dark hover:bg-brand-dark/[0.01] transition-all duration-300 p-6 bg-brand-surface relative flex flex-col justify-between group sharp-edge shadow-sm h-full"
                id={`project-card-${project.id}`}
              >
                <div>
                  {/* Aspect block for hotlinked preview image */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden border border-brand-dark/10 mb-6 sharp-edge bg-brand-bg">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover grayscale brightness-95 group-hover:grayscale-0 group-hover:scale-[1.04] transition-all duration-[800ms]"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-3 left-3 bg-brand-dark text-brand-bg px-2.5 py-1 font-mono text-[9px] uppercase tracking-widest leading-none sharp-edge">
                      NO_{project.number}
                    </div>
                  </div>

                  {/* Text Header */}
                  <span className="font-mono text-[9px] uppercase tracking-[0.15em] font-bold text-brand-accent block mb-2">
                    {project.subtitle}
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-brand-dark mb-4 group-hover:text-brand-accent transition-colors">
                    {project.title}
                  </h3>
                  <p className="font-sans text-xs text-brand-muted leading-relaxed mb-6">
                    {project.description}
                  </p>
                </div>

                {/* Subfooter containing technology labels & interactive actions */}
                <div className="space-y-6 pt-4 border-t border-brand-dark/10">
                  {/* Technology Chips */}
                  <div className="flex flex-wrap gap-1">
                    {project.technologies.map((tech, idx) => (
                      <span 
                        key={idx}
                        className="font-mono text-[9px] uppercase tracking-wide px-2 py-0.5 border border-brand-dark/10 text-brand-muted bg-brand-bg/40 sharp-edge"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Actions Links with source/live icons */}
                  <div className="flex items-center gap-4">
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-4 border border-brand-dark text-[10px] uppercase tracking-[0.12em] font-extrabold text-brand-dark hover:bg-brand-dark hover:text-white transition-all duration-300 sharp-edge cursor-pointer"
                      id={`project-live-${project.id}`}
                    >
                      <ExternalLink size={11} />
                      <span>Live Demo</span>
                    </a>
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-4 border border-brand-dark/15 text-[10px] uppercase tracking-[0.12em] font-extrabold text-brand-muted hover:border-brand-dark hover:text-brand-dark transition-all duration-300 sharp-edge bg-brand-bg/20 cursor-pointer"
                      id={`project-repo-${project.id}`}
                    >
                      <Github size={11} />
                      <span>Source Code</span>
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ABOUT ME SECTION */}
        <section 
          className="py-24 md:py-32 px-6 md:px-12 w-full max-w-7xl mx-auto border-t border-brand-dark/15" 
          id="about"
        >
          <div className="grid grid-cols-12 gap-y-12 lg:gap-12 pb-16">
            
            {/* Bio Portrait Column */}
            <div className="col-span-12 lg:col-span-4 flex justify-center lg:justify-start items-start">
              <div className="relative aspect-square w-full max-w-[340px] bg-white border border-brand-dark p-3.5 sharp-edge shadow-sm group hover:border-brand-accent transition-colors duration-300">
                <img
                  src="https://media.licdn.com/dms/image/v2/D4D03AQG2nV9o6P3X2Q/profile-displayphoto-shrink_800_800/B4DZXrNj2zG8Ac-/0/1743407956567?e=1782345600&v=beta&t=UmBQsysCROP2eZ3sUT-b50eA2J-BBBhMGcsJeGWulyU"
                  alt="Portrait of Zachary Ongeri"
                  className="w-full h-full object-cover grayscale brightness-95 group-hover:grayscale-0 transition-all duration-700 sharp-edge"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute -bottom-3 -right-3 bg-brand-dark text-brand-bg px-2.5 py-1 font-mono text-[8px] uppercase tracking-widest leading-none sharp-edge border border-brand-accent animate-pulse">
                  BIO_REF_9048
                </div>
              </div>
            </div>

            {/* Bio Text Column */}
            <div className="col-span-12 md:col-span-6 lg:col-span-4 space-y-6">
              <span className="font-sans text-xs uppercase tracking-[0.2em] font-extrabold text-brand-accent block">
                FOUNDER-OPERATOR & BUILDER
              </span>
              <h2 className="font-serif text-3xl md:text-5xl font-bold tracking-tight text-brand-dark leading-tight">
                About Zachary
              </h2>
              <div className="space-y-4 font-sans text-sm text-[#52525b] leading-relaxed">
                <p>
                  Zachary Ongeri is an AI product builder and ecommerce operator based in Nairobi. By day, he serves as the AI Associate at a leading Nairobi law firm, where he built the firm's entire AI and digital infrastructure from the ground up: from a regulatory intelligence SaaS platform (RegWatch) to a headless website architecture and an AI-driven content engine.
                </p>
                <p>
                  Outside the firm, he founded and runs Nairobi Sole, a premier Kenyan sneaker ecommerce brand built on Shopify. He builds practical AI agent systems and automated workflows that make marketing, operational lead flows, and commerce run themselves.
                </p>
              </div>

              {/* Little detail badge metadata */}
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-brand-dark/10">
                <div>
                  <span className="font-mono text-[9px] uppercase tracking-widest text-[#71717a] block font-bold">Location / Context</span>
                  <span className="font-sans text-xs font-bold text-brand-dark">Nairobi, Kenya (Active Global)</span>
                </div>
                <div>
                  <span className="font-mono text-[9px] uppercase tracking-widest text-[#71717a] block font-bold">Ecommerce Venture</span>
                  <span className="font-sans text-xs font-bold text-brand-dark">Nairobi Sole Sneakers</span>
                </div>
              </div>
            </div>

            {/* Core Capability list matrices */}
            <div className="col-span-12 md:col-span-6 lg:col-span-4 flex flex-col justify-between">
              <div className="border border-brand-dark p-6 bg-white sharp-edge relative h-full flex flex-col justify-between">
                <div>
                  {/* Structural corner decorations */}
                  <div className="absolute top-2 right-2 font-mono text-[8px] text-brand-dark/30">CAPABILITY_INDEX</div>
                  <h3 className="font-serif text-lg font-bold text-brand-dark uppercase tracking-wide border-b border-brand-dark pb-4 mb-6">
                    Key Skills & Skill Matrices
                  </h3>

                  <div className="space-y-6">
                    {SKILL_CATEGORIES.map((cat) => (
                      <div key={cat.id} className="space-y-3" id={`skill-cat-${cat.id}`}>
                        <h4 className="font-mono text-[10px] uppercase tracking-widest font-extrabold text-brand-accent">
                          {cat.category}
                        </h4>
                        <div className="grid grid-cols-2 gap-2">
                          {cat.skills.map((skill, sIdx) => (
                            <div key={sIdx} className="flex items-center gap-2 font-sans text-xs text-brand-muted">
                              <span className="h-1.5 w-1.5 bg-brand-dark shrink-0" />
                              <span>{skill}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* TRAJECTORY TIMELINE GRID (RELEVANT EXPERIENCE) */}
          <div className="pt-16 border-t border-brand-dark/10">
            <h3 className="font-serif text-2xl font-bold text-brand-dark uppercase tracking-tight mb-8">
              Professional Trajectory & Experience
            </h3>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {EXPERIENCES.map((exp) => (
                <div 
                  key={exp.id}
                  className="p-6 border border-brand-dark/10 hover:border-brand-accent bg-brand-surface/50 group transition-all duration-300 sharp-edge"
                  id={`experience-card-${exp.id}`}
                >
                  <div className="flex justify-between items-baseline mb-4">
                    <span className="font-mono text-[10px] uppercase font-bold text-brand-accent bg-brand-accent/5 px-2 py-1 sharp-edge">
                      {exp.period}
                    </span>
                    <span className="font-sans text-[10px] font-bold text-brand-muted uppercase tracking-wider">{exp.company}</span>
                  </div>
                  
                  <h4 className="font-serif text-lg font-bold text-brand-dark group-hover:text-brand-accent transition-colors duration-300 pb-3 border-b border-brand-dark/10 mb-4">
                    {exp.role}
                  </h4>
                  
                  <p className="font-sans text-xs text-brand-muted italic leading-relaxed mb-4">
                    {exp.description}
                  </p>

                  <ul className="space-y-2.5">
                    {exp.bulletPoints.map((pt, ptIdx) => (
                      <li key={ptIdx} className="flex items-start gap-2 text-xs text-brand-muted leading-relaxed font-sans">
                        <Check key={ptIdx} size={11} className="text-brand-accent shrink-0 mt-0.5" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* METRICS & CONTEXTUAL WORKSPACE IMAGE SECTION */}
        <section 
          className="py-24 md:py-32 px-6 md:px-12 w-full max-w-7xl mx-auto border-t border-brand-dark/15" 
          id="scale"
        >
          <div className="grid grid-cols-12 gap-y-12 lg:gap-y-0 lg:gap-12 items-center">
            
            {/* Left side info block */}
            <div className="col-span-12 lg:col-span-5 order-2 lg:order-1 flex flex-col justify-center space-y-8">
              
              <div className="space-y-4">
                <span className="font-sans text-[11px] uppercase tracking-[0.2em] font-extrabold text-brand-accent block">
                  SYSTEM CORE PHILOSOPHY
                </span>
                <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-brand-dark leading-tight">
                  Built for scale, designed for clarity.
                </h2>
              </div>

              <p className="font-sans text-base md:text-lg text-brand-muted leading-relaxed">
                My approach fuses rigorous AI systems engineering with the aesthetic principles of high-end editorial design. Every line of code serves a business metric; every pixel serves user trust.
              </p>

              {/* Statistical dynamic highlight grid */}
              <div className="grid grid-cols-2 gap-4">
                
                {/* Metric 1 */}
                <div 
                  onClick={() => handleOpenProject('speed-to-lead')}
                  className="p-6 border border-brand-dark/15 bg-white/70 hover:border-brand-accent transition-all duration-300 sharp-edge cursor-pointer hover:shadow-sm"
                  id="metric-friction"
                >
                  <p className="font-serif text-3xl md:text-4xl font-bold text-brand-dark">94%</p>
                  <p className="font-sans text-[10px] uppercase tracking-wider text-brand-muted mt-2 font-bold leading-tight">
                    Reduction in Friction
                  </p>
                  <p className="font-sans text-[9px] text-brand-accent mt-1 flex items-center gap-0.5">
                    View Speed-to-lead Case
                  </p>
                </div>

                {/* Metric 2 */}
                <div 
                  onClick={() => handleOpenProject('aov-optimization')}
                  className="p-6 border border-brand-dark/15 bg-white/70 hover:border-brand-accent transition-all duration-300 sharp-edge cursor-pointer hover:shadow-sm"
                  id="metric-throughput"
                >
                  <p className="font-serif text-3xl md:text-4xl font-bold text-brand-dark">3.5x</p>
                  <p className="font-sans text-[10px] uppercase tracking-wider text-brand-muted mt-2 font-bold leading-tight">
                    Pipeline Throughput
                  </p>
                  <p className="font-sans text-[9px] text-brand-accent mt-1 flex items-center gap-0.5">
                    View AOV Opt Case
                  </p>
                </div>

              </div>

            </div>

            {/* Right side high-resolution tablet workspace image frame */}
            <div className="col-span-12 lg:col-span-6 lg:col-start-7 order-1 lg:order-2 flex justify-center lg:justify-end">
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-10% 0px' }}
                transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
                className="aspect-square w-full max-w-[500px] border border-brand-dark p-4 relative bg-brand-surface sharp-edge group shadow-sm hover:border-brand-accent transition-colors duration-300"
                id="workspace-diagram-frame"
              >
                <img 
                  className="w-full h-full object-cover grayscale brightness-95 select-none pointer-events-none group-hover:grayscale-0 transition-all duration-[1200ms]"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuD1Crtiv_d5xVYUU23sPfFG5CiWPLeAbAVJ7ROPKkgUuq1BQ7LYJa65K-NezplTWJxIG6wS35KO2PTeN9g5_4Bt_XKMWA0jWK_I6G7hBsk2vd1M6vdUmZHhdnptme6ARKfKIyn47oJT3dh6e9JwsXUcMD5HkkDMsqt2UWPbcRBD1n3ZOndw69WC96Scm9z44lxCZdfI9AZJ7ttArpEHTHXNj5dJZQEa8zT34wSEbFcxKEEbjDrXTptCIe_-d8_sN60b_IFPcIwE34Y" 
                  alt="Minimalist designer desk workspace featuring mechanical hardware & technical draft designs."
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-brand-dark/5 pointer-events-none" />
                
                {/* Diagonal floating banner */}
                <div className="absolute top-8 left-8 bg-brand-dark text-brand-bg px-4 py-2 font-mono text-[9px] uppercase tracking-[0.2em] sharp-edge border border-brand-accent">
                  TECHNICAL CRAFTSMANSHIP
                </div>
              </motion.div>
            </div>

          </div>
        </section>

        {/* DETAILED SERVICES EXPANDER INDEX: Fully supporting Nav link 'SERVICES' */}
        <section 
          className="py-24 md:py-32 px-6 md:px-12 w-full max-w-7xl mx-auto border-t border-brand-dark/15" 
          id="services"
        >
          <div className="grid grid-cols-12 gap-8">
            
            {/* Header Column Block */}
            <div className="col-span-12 lg:col-span-4 space-y-4">
              <span className="font-sans text-xs uppercase tracking-[0.2em] font-extrabold text-brand-accent block">
                Expertise Capabilities
              </span>
              <h2 className="font-serif text-3xl md:text-4xl font-bold tracking-tight text-brand-dark leading-tight">
                Architectural Services
              </h2>
              <p className="font-sans text-sm text-brand-muted leading-relaxed max-w-sm">
                Engineering custom integrations that replace traditional unformatted data inputs with hyper-structured, clean metrics.
              </p>
              <div className="pt-4">
                <button
                  onClick={() => setIsContactOpen(true)}
                  className="font-sans text-[11px] uppercase tracking-widest font-extrabold pb-1 border-b border-brand-dark hover:border-brand-accent text-brand-dark hover:text-brand-accent transition-colors cursor-pointer"
                >
                  Retrieve pricing matrices &rarr;
                </button>
              </div>
            </div>

            {/* List columns */}
            <div className="col-span-12 lg:col-span-8 space-y-6">
              {SERVICES.map((serv, index) => (
                <div 
                  key={serv.id} 
                  className="p-6 md:p-8 border border-brand-dark/10 bg-brand-surface/60 hover:border-brand-dark hover:bg-brand-surface transition-all duration-300 sharp-edge"
                  id={`service-${serv.id}`}
                >
                  <div className="flex flex-col md:flex-row justify-between items-start gap-4 md:gap-8">
                    <div className="flex gap-4">
                      <span className="font-serif text-lg font-bold text-brand-accent bg-brand-accent/5 h-8 w-8 flex items-center justify-center shrink-0">
                        {serv.number}
                      </span>
                      <div className="space-y-2">
                        <h3 className="font-serif text-xl font-bold text-brand-dark">{serv.title}</h3>
                        <p className="font-sans text-sm text-brand-muted leading-relaxed">{serv.description}</p>
                        
                        {/* Custom neat deliverables toggle */}
                        <div className="pt-4 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">
                          {serv.deliverables.map((item, idx) => (
                            <div key={idx} className="flex items-center gap-2 font-sans text-xs text-brand-muted">
                              <CornerDownRight size={10} className="text-brand-accent shrink-0" />
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* CONTACT SECTION */}
        <section 
          className="py-24 md:py-32 px-6 md:px-12 w-full max-w-7xl mx-auto border-t border-brand-dark/15" 
          id="contact"
        >
          <div className="grid grid-cols-12 gap-y-12 lg:gap-12">
            
            {/* Form Column */}
            <div className="col-span-12 lg:col-span-7 space-y-6">
              <div className="space-y-3">
                <span className="font-sans text-xs uppercase tracking-[0.2em] font-extrabold text-brand-accent block">
                  COMMUNICATION INGRESS // SECURE ENVELOPE
                </span>
                <h2 className="font-serif text-3xl md:text-5xl font-bold tracking-tight text-brand-dark">
                  Get in Touch
                </h2>
                <p className="font-sans text-sm text-brand-muted max-w-lg">
                  Submit your architectural briefs or integration design ideas. Inputs are automatically classified with high queue values.
                </p>
              </div>

              {onPageStatus === 'complete' ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-8 border border-brand-dark bg-white sharp-edge flex flex-col items-center justify-center text-center space-y-4"
                  id="contact-form-success"
                >
                  <div className="h-12 w-12 rounded-full border border-brand-dark flex items-center justify-center bg-brand-bg text-brand-dark animate-pulse">
                    <Check className="text-brand-dark" size={24} />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-brand-dark uppercase tracking-tight">
                    Ingress Transmission Dispatched
                  </h3>
                  <p className="font-sans text-xs text-brand-muted max-w-md">
                    Thank you, <strong className="text-brand-dark">{onPageName}</strong>. Your message has been analyzed and written to Zachary's prioritized routing pager interface. Expect response loops shortly.
                  </p>
                  <button
                    onClick={() => {
                      setOnPageStatus('idle');
                      setOnPageName('');
                      setOnPageEmail('');
                      setOnPageMessage('');
                      setActiveStepIndex(-1);
                    }}
                    className="font-sans text-[10px] uppercase tracking-widest font-bold border border-brand-dark px-6 py-2 hover:bg-brand-dark hover:text-white transition-colors cursor-pointer sharp-edge"
                  >
                    Send Another Transmission
                  </button>
                </motion.div>
              ) : onPageStatus === 'analyzing' ? (
                <div className="p-8 border border-brand-dark bg-brand-dark text-[#a3a3a3] font-mono text-xs space-y-4 sharp-edge" id="contact-form-loading">
                  <div className="flex items-center justify-between border-b border-neutral-850 pb-2.5">
                    <span className="text-white flex items-center gap-1.5 font-bold uppercase text-[9px] tracking-wider">
                      <Terminal size={11} className="text-mono animate-pulse text-brand-bg" />
                      Zachary Node Router // Ingress Pipeline
                    </span>
                    <span className="text-[10px] uppercase text-[#a3a3a3]">[PROCESSING]</span>
                  </div>

                  <div className="space-y-2">
                    <p className="text-green-500 font-bold">&gt; Initializing semantic analysis parsing script...</p>
                    
                    {activeStepIndex >= 0 && (
                      <p className="text-white animate-pulse">&gt; 📤 Connection established. Ingesting packet payload...</p>
                    )}
                    {activeStepIndex >= 1 && (
                      <p className="text-yellow-400">&gt; Parsing sender parameter details: [Name: "{onPageName}"]</p>
                    )}
                    {activeStepIndex >= 2 && (
                      <p className="text-blue-400">&gt; Executing Gemini classification on: "{onPageMessage.slice(0, 30)}..."</p>
                    )}
                    {activeStepIndex >= 3 && (
                      <div className="p-3 border border-neutral-800 bg-neutral-900 space-y-1">
                        <p className="text-green-400 font-bold">&gt; STATUS: CLASSIFIED & QUEUED</p>
                        <p className="text-[11px]">Category: Dynamic Integration Construct</p>
                        <p className="text-[11px]">Routing Vector: Pager_Queue_#1</p>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-2 pt-2 text-[#666]">
                    <span className="animate-spin h-3.5 w-3.5 border-2 border-brand-bg border-t-transparent rounded-full" />
                    <span className="text-[10px] uppercase tracking-wide">Syncing distributed memory database...</span>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleOnPageSubmit} className="space-y-5" id="onpage-contact-form">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="form-name" className="font-mono text-[9px] uppercase tracking-widest text-brand-muted font-bold">
                        Identifier / Name
                      </label>
                      <input
                        type="text"
                        id="form-name"
                        required
                        value={onPageName}
                        onChange={(e) => setOnPageName(e.target.value)}
                        placeholder="e.g. Liam O'Connor"
                        className="p-3 bg-white border border-brand-dark/15 hover:border-brand-dark focus:border-brand-dark focus:outline-none focus:ring-1 focus:ring-brand-dark transition-colors text-xs font-sans sharp-edge text-brand-dark"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="form-email" className="font-mono text-[9px] uppercase tracking-widest text-brand-muted font-bold">
                        Direct Email Address
                      </label>
                      <input
                        type="email"
                        id="form-email"
                        required
                        value={onPageEmail}
                        onChange={(e) => setOnPageEmail(e.target.value)}
                        placeholder="email@organization.co"
                        className="p-3 bg-white border border-brand-dark/15 hover:border-brand-dark focus:border-brand-dark focus:outline-none focus:ring-1 focus:ring-brand-dark transition-colors text-xs font-sans sharp-edge text-brand-dark"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="form-message" className="font-mono text-[9px] uppercase tracking-widest text-brand-muted font-bold">
                      Integration Brief / Message
                    </label>
                    <textarea
                      id="form-message"
                      required
                      rows={5}
                      value={onPageMessage}
                      onChange={(e) => setOnPageMessage(e.target.value)}
                      placeholder="Describe your workflow challenges, custom e-commerce requirements, or API integration specifications..."
                      className="p-3 bg-white border border-brand-dark/15 hover:border-brand-dark focus:border-brand-dark focus:outline-none focus:ring-1 focus:ring-brand-dark transition-colors text-xs font-sans sharp-edge text-brand-dark resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-brand-dark text-white border border-brand-dark hover:bg-brand-accent hover:border-brand-accent py-4 font-sans text-xs uppercase tracking-[0.15em] font-extrabold transition-all duration-300 sharp-edge cursor-pointer"
                    id="onpage-form-submit-btn"
                  >
                    Commit Transmission Payload &rarr;
                  </button>
                </form>
              )}
            </div>

            {/* Alternates and Networks Column */}
            <div className="col-span-12 lg:col-span-5 flex flex-col justify-between">
              <div className="border border-brand-dark p-6 md:p-8 bg-white sharp-edge relative space-y-8">
                <div>
                  <span className="font-mono text-[9px] uppercase tracking-widest text-brand-muted block mb-3">
                    ALTERNATE COMMS DIRECTORY
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-brand-dark uppercase tracking-tight mb-4">
                    Connection Channels
                  </h3>
                  <p className="font-sans text-xs text-brand-muted leading-relaxed">
                    Should you prefer utilizing standard end-to-end mailing clients, direct correspondence channels remain fully active:
                  </p>
                </div>

                {/* Highly readable mail badge */}
                <a 
                  href="mailto:zacharyongeri121@gmail.com"
                  className="flex items-center gap-4 p-4 border border-brand-dark/10 hover:border-brand-dark bg-brand-bg/30 hover:bg-brand-surface transition-all duration-300 sharp-edge"
                  id="direct-email-card"
                >
                  <div className="h-10 w-10 border border-brand-dark/10 rounded-full flex items-center justify-center bg-white text-brand-accent">
                    <Mail size={16} />
                  </div>
                  <div>
                    <span className="font-mono text-[8px] uppercase tracking-widest text-brand-muted block leading-none">PRIMARY MAIL</span>
                    <span className="font-sans text-sm font-bold text-brand-dark hover:underline underline-offset-4">zacharyongeri121@gmail.com</span>
                  </div>
                </a>

                {/* Professional Social Media Profile Grid */}
                <div className="space-y-4">
                  <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-brand-muted block">
                    PROFESSIONAL PUBLIC DIRECTORIES
                  </span>
                  
                  <div className="grid grid-cols-3 gap-3">
                    <a
                      href="https://linkedin.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-4 border border-brand-dark/10 hover:border-brand-dark bg-brand-surface hover:bg-brand-dark hover:text-white flex flex-col items-center justify-center text-center gap-2 transition-all duration-300 sharp-edge group"
                      id="linkedin-profile-link"
                    >
                      <Linkedin size={16} className="text-brand-accent group-hover:text-white transition-colors" />
                      <span className="font-sans text-[10px] uppercase tracking-wide font-black">LinkedIn</span>
                    </a>
                    <a
                      href="https://github.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-4 border border-brand-dark/10 hover:border-brand-dark bg-brand-surface hover:bg-brand-dark hover:text-white flex flex-col items-center justify-center text-center gap-2 transition-all duration-300 sharp-edge group"
                      id="github-profile-link"
                    >
                      <Github size={16} className="text-brand-accent group-hover:text-white transition-colors" />
                      <span className="font-sans text-[10px] uppercase tracking-wide font-black">GitHub</span>
                    </a>
                    <a
                      href="https://read.cv/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-4 border border-brand-dark/10 hover:border-brand-dark bg-brand-surface hover:bg-brand-dark hover:text-white flex flex-col items-center justify-center text-center gap-2 transition-all duration-300 sharp-edge group"
                      id="readcv-profile-link"
                    >
                      <Compass size={16} className="text-brand-accent group-hover:text-white transition-colors" />
                      <span className="font-sans text-[10px] uppercase tracking-wide font-black">Read.cv</span>
                    </a>
                  </div>
                </div>

                {/* Location metadata display */}
                <div className="pt-4 border-t border-brand-dark/10 flex items-center justify-between text-[10px] font-mono text-zinc-400">
                  <span>SECURE_SESSION: ACTIVE</span>
                  <span>IP_ROUTING: PASS</span>
                </div>
              </div>
            </div>

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
              // ZACHARY — Principal Architect
            </p>
          </div>
        </section>

      </main>

      {/* Footer Element */}
      <Footer 
        onContactClick={() => setIsContactOpen(true)} 
        onNavigate={handleNavigate} 
        onSignatureClick={() => setIsSystemsHubOpen(true)}
      />

      {/* Case Study Sandbox Modal */}
      <CaseStudyModal 
        project={selectedProject} 
        onClose={() => setSelectedProject(null)} 
      />

      {/* Contact dialog Drawer form */}
      <ContactDialog 
        isOpen={isContactOpen} 
        onClose={() => setIsContactOpen(false)} 
      />

      {/* Systems Lead and Google Calendar Hub */}
      <SystemsHub 
        isOpen={isSystemsHubOpen} 
        onClose={() => setIsSystemsHubOpen(false)} 
      />

      {/* Aesthetic AI Chatbot Liaison */}
      <AIChatbot />

    </div>
  );
}
