/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Check, Globe, GraduationCap, Clock, MapPin } from 'lucide-react';
import { EXPERIENCES, SKILL_CATEGORIES } from '../data';
import zacharyPortrait from '../assets/images/zachary-portrait.jpg';
import BuildLog from '../components/BuildLog';

const DOMAINS_SHIPPED = [
  'Legal and regulatory compliance',
  'Apparel and direct to consumer retail',
  'Healthcare clinics',
  'Vehicle dealerships',
  'Short stay hospitality',
  'Professional services'
];

export default function AboutPage() {
  return (
    <>
      <section
        className="py-32 md:py-40 px-6 md:px-12 w-full max-w-7xl mx-auto"
        id="about"
      >
        <div className="grid grid-cols-12 gap-y-12 lg:gap-12 pb-16">

          {/* Bio Portrait Column */}
          <div className="col-span-12 lg:col-span-4 flex flex-col items-center lg:items-start gap-6">
            <div className="relative aspect-square w-full max-w-[340px] bg-white border border-brand-dark p-3.5 sharp-edge shadow-sm group hover:border-brand-accent transition-colors duration-300">
              <img
                src={zacharyPortrait}
                alt="Portrait of Zachary Ongeri"
                className="w-full h-full object-cover grayscale brightness-95 group-hover:grayscale-0 transition-all duration-700 sharp-edge"
              />
              <div className="absolute -bottom-3 -right-3 bg-brand-dark text-brand-bg px-2.5 py-1 font-mono text-[8px] uppercase tracking-widest leading-none sharp-edge border border-brand-accent animate-pulse">
                ONE_PERSON_WHOLE_SURFACE
              </div>
            </div>

            {/* Availability & Education Card */}
            <div className="w-full max-w-[340px] p-5 border border-brand-dark/15 bg-brand-surface sharp-edge space-y-4 font-sans text-xs">
              <div className="flex items-start gap-2.5 border-b border-brand-dark/10 pb-3">
                <MapPin size={14} className="text-brand-accent shrink-0 mt-0.5" />
                <div>
                  <span className="font-mono text-[9px] uppercase font-bold text-brand-muted block">LOCATION</span>
                  <span className="font-bold text-brand-dark">Nairobi, Kenya (UTC+3)</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5 border-b border-brand-dark/10 pb-3">
                <Clock size={14} className="text-brand-accent shrink-0 mt-0.5" />
                <div>
                  <span className="font-mono text-[9px] uppercase font-bold text-brand-muted block">AVAILABILITY</span>
                  <span className="text-brand-dark leading-relaxed">
                    Remote from Nairobi, UTC+3. Overlap held open for European, United States and Asia Pacific working hours.
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <GraduationCap size={14} className="text-brand-accent shrink-0 mt-0.5" />
                <div>
                  <span className="font-mono text-[9px] uppercase font-bold text-brand-muted block">EDUCATION</span>
                  <span className="font-bold text-brand-dark">University of Nairobi</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bio Text Column */}
          <div className="col-span-12 md:col-span-6 lg:col-span-4 space-y-6">
            <span className="font-sans text-xs uppercase tracking-[0.2em] font-extrabold text-brand-accent block">
              AI NATIVE SOFTWARE DEVELOPER
            </span>
            <h2 className="font-serif text-3xl md:text-5xl font-bold tracking-tight text-brand-dark leading-tight">
              About Zachary Ongeri
            </h2>
            <div className="space-y-4 font-sans text-sm text-[#52525b] leading-relaxed">
              <p>
                I take products from an empty repository to something a business runs on. Retrieval systems and agents, storefronts I design as well as build, and the infrastructure underneath both.
              </p>
              <p>
                Founder operator rather than agency, so I have carried the cost of my own bad architecture decisions. Every line of code should move a balance sheet number. If it does not cut cost or raise transaction value, it is clutter.
              </p>
              <p>
                <strong>How I Work:</strong> One person, whole surface. I do not hand a design to a developer or a spec to an agency. Identity, data model, application and deployment get decided together, which is why the seams do not show. If a project needs a team, I will say so instead of stretching.
              </p>
            </div>

            {/* Domains Shipped In */}
            <div className="pt-4 border-t border-brand-dark/10 space-y-3">
              <span className="font-mono text-[9px] uppercase tracking-widest text-[#71717a] block font-bold">
                DOMAINS SHIPPED IN
              </span>
              <div className="grid grid-cols-2 gap-2 font-sans text-xs text-brand-dark font-medium">
                {DOMAINS_SHIPPED.map((domain, dIdx) => (
                  <div key={dIdx} className="flex items-center gap-1.5">
                    <span className="h-1 w-1 bg-brand-accent shrink-0" />
                    <span>{domain}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Core Capability list matrices */}
          <div className="col-span-12 md:col-span-6 lg:col-span-4 flex flex-col justify-between">
            <div className="border border-brand-dark p-6 bg-white sharp-edge relative h-full flex flex-col justify-between">
              <div>
                <div className="absolute top-2 right-2 font-mono text-[8px] text-brand-dark/30">STACK_MATRIX_0x1</div>
                <h3 className="font-serif text-lg font-bold text-brand-dark uppercase tracking-wide border-b border-brand-dark pb-4 mb-6">
                  Technical Stack
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
            Professional Experience & Track Record
          </h3>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {EXPERIENCES.map((exp) => (
              <div
                key={exp.id}
                className="p-6 border border-brand-dark/15 hover:border-brand-accent bg-brand-surface/50 group transition-all duration-300 sharp-edge"
                id={`experience-card-${exp.id}`}
              >
                <div className="flex justify-between items-baseline mb-4">
                  <span className="font-mono text-[10px] uppercase font-bold text-brand-accent bg-brand-accent/5 px-2.5 py-1 sharp-edge">
                    {exp.period}
                  </span>
                  <span className="font-sans text-[10px] font-bold text-brand-muted uppercase tracking-wider">{exp.company}</span>
                </div>

                <h4 className="font-serif text-xl font-bold text-brand-dark group-hover:text-brand-accent transition-colors duration-300 pb-3 border-b border-brand-dark/10 mb-4">
                  {exp.role}
                </h4>

                <p className="font-sans text-xs text-brand-muted italic leading-relaxed mb-4">
                  {exp.description}
                </p>

                <ul className="space-y-2.5">
                  {exp.bulletPoints.map((pt, ptIdx) => (
                    <li key={ptIdx} className="flex items-start gap-2 text-xs text-brand-muted leading-relaxed font-sans">
                      <Check size={11} className="text-brand-accent shrink-0 mt-0.5" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EMBEDDED BUILD LOG SECTION */}
      <BuildLog />
    </>
  );
}
