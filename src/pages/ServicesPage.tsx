/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { CornerDownRight, CheckCircle2, Clock, ShieldCheck } from 'lucide-react';
import { SERVICES, ENGAGEMENT_SHAPES, SPRINT_WEEKS } from '../data';
import { useUI } from '../context/UIContext';

export default function ServicesPage() {
  const { openContact } = useUI();

  return (
    <section
      className="py-32 md:py-40 px-6 md:px-12 w-full max-w-7xl mx-auto space-y-24"
      id="services"
    >
      {/* SECTION 1: ENGAGEMENT SHAPES */}
      <div className="space-y-12">
        <div className="space-y-4">
          <span className="font-sans text-xs uppercase tracking-[0.2em] font-extrabold text-brand-accent block">
            HOW WE ENGAGE
          </span>
          <h2 className="font-serif text-3xl md:text-5xl font-bold tracking-tight text-brand-dark">
            Engagement Shapes
          </h2>
          <p className="font-sans text-sm text-brand-muted max-w-xl leading-relaxed">
            I do not hand a design to a developer or a spec to an agency. Choose the exact engagement shape that fits your stage and balance sheet goals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {ENGAGEMENT_SHAPES.map((shape) => (
            <div
              key={shape.id}
              className="p-8 border border-brand-dark/20 bg-brand-surface hover:border-brand-dark transition-all duration-300 sharp-edge flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <span className="font-mono text-[10px] uppercase tracking-widest text-brand-accent font-extrabold block">
                  ENGAGEMENT MODEL
                </span>
                <h3 className="font-serif text-2xl font-bold text-brand-dark group-hover:text-brand-accent transition-colors">
                  {shape.title}
                </h3>
                <p className="font-sans text-xs font-bold text-brand-dark italic">
                  {shape.subtitle}
                </p>
                <p className="font-sans text-xs text-brand-muted leading-relaxed">
                  {shape.description}
                </p>

                <div className="pt-4 border-t border-brand-dark/10 space-y-2">
                  <span className="font-mono text-[9px] uppercase tracking-wider text-brand-muted font-bold block">
                    Key Deliverables:
                  </span>
                  {shape.deliverables.map((d, idx) => (
                    <div key={idx} className="flex items-start gap-2 font-sans text-xs text-brand-muted leading-relaxed">
                      <CheckCircle2 size={12} className="text-brand-accent shrink-0 mt-0.5" />
                      <span>{d}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-brand-dark/10">
                <button
                  onClick={openContact}
                  className="w-full py-3 border border-brand-dark text-brand-dark hover:bg-brand-dark hover:text-brand-bg font-sans text-xs uppercase tracking-widest font-extrabold transition-all duration-300 sharp-edge cursor-pointer"
                >
                  Select {shape.title} &rarr;
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 2: HOW A BUILD SPRINT RUNS */}
      <div className="p-8 md:p-12 border border-brand-dark bg-white sharp-edge space-y-8">
        <div className="border-b border-brand-dark/15 pb-6">
          <span className="font-mono text-xs uppercase tracking-widest text-brand-accent font-extrabold block mb-2">
            METHODOLOGY
          </span>
          <h3 className="font-serif text-3xl md:text-4xl font-bold text-brand-dark">
            How A Build Sprint Runs
          </h3>
          <p className="font-sans text-sm text-brand-muted mt-2 max-w-xl">
            A defined product or storefront taken from zero to live in 6 weeks with clear milestones.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SPRINT_WEEKS.map((week, idx) => (
            <div key={idx} className="p-6 border border-brand-dark/10 bg-brand-surface/50 sharp-edge space-y-3">
              <div className="inline-flex items-center gap-1.5 bg-brand-dark text-brand-bg px-3 py-1 font-mono text-[10px] uppercase font-bold sharp-edge">
                <Clock size={10} className="text-brand-accent" />
                <span>{week.phase}</span>
              </div>
              <h4 className="font-serif text-lg font-bold text-brand-dark pt-1">
                {week.title}
              </h4>
              <p className="font-sans text-xs text-brand-muted leading-relaxed">
                {week.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 3: TECHNICAL CAPABILITIES */}
      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-12 lg:col-span-4 space-y-4">
          <span className="font-sans text-xs uppercase tracking-[0.2em] font-extrabold text-brand-accent block">
            TECHNICAL EXCELLENCE
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold tracking-tight text-brand-dark leading-tight">
            Architectural Offerings
          </h2>
          <p className="font-sans text-sm text-brand-muted leading-relaxed max-w-sm">
            Retrieval systems and agents, storefronts designed and built, and the infrastructure underneath both.
          </p>
          <div className="pt-4">
            <button
              onClick={openContact}
              className="font-sans text-[11px] uppercase tracking-widest font-extrabold pb-1 border-b border-brand-dark hover:border-brand-accent text-brand-dark hover:text-brand-accent transition-colors cursor-pointer"
            >
              Book A Systems Audit &rarr;
            </button>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-8 space-y-6">
          {SERVICES.map((serv) => (
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
  );
}
