/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { Github, ExternalLink, ShieldCheck, Layers, MessageSquareText, LucideIcon } from 'lucide-react';
import { PROJECTS, CASE_STUDIES } from '../data';
import { useUI } from '../context/UIContext';

const PROJECT_ICONS: Record<string, LucideIcon> = {
  'regwatch-platform': ShieldCheck,
  'forma-brand': Layers,
  'freelance-automation': MessageSquareText,
};

const STATUS_STYLES: Record<string, string> = {
  Live: 'bg-green-50 text-green-800 border-green-200',
  'In Development': 'bg-brand-accent/10 text-brand-dark border-brand-accent/30',
  'Client Work': 'bg-brand-dark/5 text-brand-muted border-brand-dark/10',
};

// Metric cards below pull directly from CASE_STUDIES so the numbers shown
// here can never drift from the case study they link to.
const METRIC_CASE_IDS = ['whatsapp-sme-agents', 'mnl-advocates'];

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
              REAL SYSTEMS // NO SCREENSHOTS FAKED
            </span>
            <h2 className="font-serif text-3xl md:text-5xl font-bold tracking-tight text-brand-dark">
              Bespoke Projects
            </h2>
            <p className="font-sans text-sm text-brand-muted mt-2 max-w-lg">
              Three lanes, run in parallel and never blended together: regulatory AI at MNL, a brand being built from the sourcing layer up, and the freelance engine that funds it all.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
                  {/* Code-generated visual panel: no fabricated product screenshots */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden border border-brand-dark/10 mb-6 sharp-edge bg-brand-dark/[0.03] flex items-center justify-center">
                    <div
                      className="absolute inset-0 opacity-[0.08] pointer-events-none"
                      style={{ backgroundImage: 'radial-gradient(#121212 1px, transparent 0)', backgroundSize: '14px 14px' }}
                    />
                    <Icon size={40} className="text-brand-dark/20 group-hover:text-brand-accent/40 transition-colors duration-500" strokeWidth={1.25} />
                    <div className="absolute top-3 left-3 bg-brand-dark text-brand-bg px-2.5 py-1 font-mono text-[9px] uppercase tracking-widest leading-none sharp-edge">
                      NO_{project.number}
                    </div>
                    <div className={`absolute top-3 right-3 font-mono text-[8px] uppercase tracking-widest px-2 py-0.5 border sharp-edge font-bold ${STATUS_STYLES[project.status]}`}>
                      {project.status}
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

                  {/* Actions Links with source/live icons, only rendered when real */}
                  {(project.liveUrl || project.repoUrl) && (
                    <div className="flex items-center gap-4">
                      {project.liveUrl && (
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
                      )}
                      {project.repoUrl && (
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
                      )}
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
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
              The vertical is interchangeable. The instinct to systematize is not. Every line of code, every supplier contract, and every trade thesis gets the same treatment: find the structure, then trust it under pressure.
            </p>

            {/* Statistical dynamic highlight grid, pulled straight from the case studies below */}
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
                      View {study.title} Case
                    </p>
                  </div>
                );
              })}
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
                src="/assets/workspace.png"
                alt="Minimalist designer desk workspace featuring mechanical hardware & technical draft designs."
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
    </>
  );
}
