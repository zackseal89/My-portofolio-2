/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Check } from 'lucide-react';
import { EXPERIENCES, SKILL_CATEGORIES } from '../data';
import zacharyPortrait from '../assets/images/zachary-portrait.jpg';

export default function AboutPage() {
  return (
    <section
      className="py-32 md:py-40 px-6 md:px-12 w-full max-w-7xl mx-auto"
      id="about"
    >
      <div className="grid grid-cols-12 gap-y-12 lg:gap-12 pb-16">

        {/* Bio Portrait Column */}
        <div className="col-span-12 lg:col-span-4 flex justify-center lg:justify-start items-start">
          <div className="relative aspect-square w-full max-w-[340px] bg-white border border-brand-dark p-3.5 sharp-edge shadow-sm group hover:border-brand-accent transition-colors duration-300">
            <img
              src={zacharyPortrait}
              alt="Portrait of Zachary Ongeri"
              className="w-full h-full object-cover grayscale brightness-95 group-hover:grayscale-0 transition-all duration-700 sharp-edge"
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
              Zachary Ongeri is not a legal tech person, an ecommerce founder, or a trader. He builds systems, technical, financial, and operational, that convert chaos into something repeatable. The vertical changes. The instinct to systematize does not.
            </p>
            <p>
              By day, he is the AI Associate at MNL Advocates LLP in Nairobi, where he built RegWatch: a regulatory intelligence platform covering CBK and ODPC jurisdiction, secured by a three-role row-level security model, alongside a headless infrastructure migration and full event operations for the Africa Leadership Circle.
            </p>
            <p>
              Outside the firm, he is building FORMA, a comfort-first shapewear brand sized for East African bodies, funded by a freelance practice doing Shopify builds and AI automation for SME clients, and sharpened by a disciplined NSE and forex trading practice that treats capital with the same rigor as code.
            </p>
          </div>

          {/* Little detail badge metadata */}
          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-brand-dark/10">
            <div>
              <span className="font-mono text-[9px] uppercase tracking-widest text-[#71717a] block font-bold">Location / Context</span>
              <span className="font-sans text-xs font-bold text-brand-dark">Nairobi, Kenya (Active Global)</span>
            </div>
            <div>
              <span className="font-mono text-[9px] uppercase tracking-widest text-[#71717a] block font-bold">Long-Horizon Bet</span>
              <span className="font-sans text-xs font-bold text-brand-dark">FORMA</span>
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
  );
}
