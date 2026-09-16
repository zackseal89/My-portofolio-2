/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { Github, ExternalLink, ShieldCheck, Layers, MessageSquareText, ShoppingBag, Globe, LucideIcon, Sparkles } from 'lucide-react';
import { PROJECTS, CASE_STUDIES } from '../data';
import { useUI } from '../context/UIContext';

const PROJECT_ICONS: Record<string, LucideIcon> = {
  'oreos-platform': Sparkles,
  'regwatch-platform': ShieldCheck,
  'vertical-agents': MessageSquareText,
  'forma-brand': Layers,
  'naisole-storefront': ShoppingBag,
  'mnl-advocates-migration': Globe,
};

const STATUS_STYLES: Record<string, string> = {
  Live: 'bg-green-50 text-green-800 border-green-200',
  'In Development': 'bg-brand-accent/10 text-brand-dark border-brand-accent/30',
  'Client Work': 'bg-brand-dark/5 text-brand-muted border-brand-dark/10',
};

const METRIC_CASE_IDS = ['oreos', 'vertical-agents'];

export default function ProjectsPage() {
  const { openCaseStudy } = useUI();

  return (
    <>
      {/* PROJECTS SECTION */}
      <section
        className="py-32 md:py-40 px-6 md:px-12 w-full max-w-7xl mx-auto"
        id="projects"
      >
        <div className="grid grid-cols-12 gap-8 mb-16">
          <div className="col-span-12">
            <span className="font-sans text-xs uppercase tracking-[0.2em] font-extrabold text-brand-accent block mb-3">
              PRODUCTION BUILDS // FULL STACK INFRASTRUCTURE
            </span>
            <h2 className="font-serif text-3xl md:text-5xl font-bold tracking-tight text-brand-dark">
              Selected Projects & Systems
            </h2>
            <p className="font-sans text-sm text-brand-muted mt-2 max-w-xl">
              Retrieval systems and agents, storefronts designed as well as built, and the infrastructure underneath both. Founder operator carrying the cost of bad architecture decisions.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PROJECTS.map((project) => {
            const Icon = PROJECT_ICONS[project.id] ?? Layers;
            return (
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
                  {/* Card Visual Hero Thumbnail */}
                  <div className="relative aspect-video w-full bg-white border border-brand-dark/10 mb-6 flex items-center justify-center overflow-hidden sharp-edge">
                    {project.id === 'oreos-platform' ? (
                      <img
                        src="/assets/images/oreos-platform-hero.png"
                        alt="OREoS AI Marketing OS Interface Preview"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : project.id === 'cognitive-engine' ? (
                      <img
                        src="/assets/images/cognitive-engine-architecture.jpg"
                        alt="Cognitive Engine Architecture Preview"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : project.id === 'neural-search' ? (
                      <img
                        src="/assets/images/neural-search-architecture.jpg"
                        alt="Neural Search Hybrid Vector Engine Dashboard"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : project.id === 'forma' ? (
                      <img
                        src="/assets/images/forma-generative-pipeline.png"
                        alt="FORMA Generative UI Design System Preview"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <>
                        <div
                          className="absolute inset-0 opacity-10"
                          style={{ backgroundImage: 'radial-gradient(#121212 1px, transparent 0)', backgroundSize: '14px 14px' }}
                        />
                        <Icon size={40} className="text-brand-dark/20 group-hover:text-brand-accent/40 transition-colors duration-500" strokeWidth={1.25} />
                      </>
                    )}
                    <div className="absolute top-3 left-3 bg-brand-dark text-brand-bg px-2.5 py-1 font-mono text-[9px] uppercase tracking-widest leading-none sharp-edge z-10">
                      NO_{project.number}
                    </div>
                    <div className={`absolute top-3 right-3 font-mono text-[8px] uppercase tracking-widest px-2 py-0.5 border sharp-edge font-bold z-10 ${STATUS_STYLES[project.status]}`}>
                      {project.status}
                    </div>
                  </div>

                  {/* Text Header */}
                  <span className="font-mono text-[9px] uppercase tracking-[0.15em] font-bold text-brand-accent block mb-2">
                    {project.category || 'Production System'}
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-brand-dark mb-3 group-hover:text-brand-accent transition-colors">
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

                  {/* Actions Links */}
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => {
                        const caseId = project.id.replace('-platform', '').replace('-storefront', '').replace('-migration', '').replace('-brand', '');
                        openCaseStudy(caseId === 'vertical' ? 'vertical-agents' : caseId);
                      }}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-4 border border-brand-dark text-[10px] uppercase tracking-[0.12em] font-extrabold text-brand-dark hover:bg-brand-dark hover:text-brand-bg transition-all duration-300 sharp-edge cursor-pointer"
                      id={`project-case-${project.id}`}
                    >
                      <span>System Architecture &rarr;</span>
                    </button>
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center p-2.5 border border-brand-dark/20 text-brand-dark hover:border-brand-accent hover:text-brand-accent transition-colors sharp-edge"
                        title="Live Link"
                      >
                        <ExternalLink size={12} />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* METRICS & CONTEXTUAL WORKSPACE SECTION */}
      <section
        className="py-24 md:py-32 px-6 md:px-12 w-full max-w-7xl mx-auto border-t border-brand-dark/15"
        id="scale"
      >
        <div className="grid grid-cols-12 gap-y-12 lg:gap-y-0 lg:gap-12 items-center">

          {/* Left side info block */}
          <div className="col-span-12 lg:col-span-5 order-2 lg:order-1 flex flex-col justify-center space-y-8">

            <div className="space-y-4">
              <span className="font-sans text-[11px] uppercase tracking-[0.2em] font-extrabold text-brand-accent block">
                CORE OPERATING PRINCIPLE
              </span>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-brand-dark leading-tight">
                Built for scale, designed for legibility.
              </h2>
            </div>

            <p className="font-sans text-base md:text-lg text-brand-muted leading-relaxed">
              Every line of code should move a balance sheet number. If it does not cut cost or raise transaction value, it is clutter.
            </p>

            {/* Statistical dynamic highlight grid */}
            <div className="grid grid-cols-2 gap-4">
              {METRIC_CASE_IDS.map((id) => {
                const study = CASE_STUDIES.find((s) => s.id === id);
                if (!study) return null;
                return (
                  <div
                    key={id}
                    onClick={() => openCaseStudy(id)}
                    className="p-6 border border-brand-dark/15 bg-white/70 hover:border-brand-accent transition-all duration-300 sharp-edge cursor-pointer hover:shadow-sm"
                    id={`metric-${id}`}
                  >
                    <p className="font-serif text-3xl md:text-4xl font-bold text-brand-dark">{study.metricValue}</p>
                    <p className="font-sans text-[10px] uppercase tracking-wider text-brand-muted mt-2 font-bold leading-tight">
                      {study.metricLabel}
                    </p>
                    <p className="font-sans text-[9px] text-brand-accent mt-1 flex items-center gap-0.5">
                      View Architecture &rarr;
                    </p>
                  </div>
                );
              })}
            </div>

          </div>

          {/* Right side workspace image frame */}
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
                src="/assets/workspace.png"
                alt="Workspace layout"
              />
              <div className="absolute inset-0 bg-brand-dark/5 pointer-events-none" />

              <div className="absolute top-8 left-8 bg-brand-dark text-brand-bg px-4 py-2 font-mono text-[9px] uppercase tracking-[0.2em] sharp-edge border border-brand-accent">
                TECHNICAL CRAFTSMANSHIP
              </div>
            </motion.div>
          </div>

        </div>
      </section>
    </>
  );
}
