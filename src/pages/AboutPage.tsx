/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Check, Compass, Clock, MapPin, BookOpen, ShieldCheck, Cpu, Scale, ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { EXPERIENCES, SKILL_CATEGORIES } from '../data';
import zacharyPortrait from '../assets/images/zachary-portrait.jpg';
import BuildLog from '../components/BuildLog';

const DOMAINS_SHIPPED = [
  'Autonomous marketing workspaces (OREoS)',
  'Legal and regulatory compliance (RegWatch)',
  'Apparel & direct-to-consumer retail (FORMA)',
  'Healthcare clinics',
  'Vehicle dealerships',
  'Short stay hospitality',
  'Professional services'
];

const OPERATING_AXIOMS = [
  {
    tag: '0x1_AXIOM // DETERMINISM_OVER_HYPE',
    title: 'First Principles Over Framework Conventions',
    icon: Cpu,
    body: 'Frameworks are ephemeral abstractions; compute physics, state machines, and relational schemas are permanent. I design systems from primitive data flows first, keeping boundary layers thin and deterministic. When AI models produce non-deterministic tokens, the surrounding harness must be 100% deterministic.',
    marginalia: 'Gall\'s Law: A complex system that works is invariably found to have evolved from a simple system that worked.'
  },
  {
    tag: '0x2_LEVERAGE // ZERO_MOCK_SYNDROME',
    title: 'Asymmetry of Risk & Skin in the Game',
    icon: ShieldCheck,
    body: 'Never build what you wouldn\'t operate. Products like OREoS (oreos.online) are built not as hypothetical Figma prototypes or hackathon toys, but as live, revenue-seeking infrastructure running against real APIs, real database locks, and real business failure modes. When architecture fails, the founder carries the pager.',
    marginalia: 'Taleb\'s Antifragile: Convex payoffs with strictly bounded downside. Fail closed at the database layer, never in application memory.'
  },
  {
    tag: '0x3_PHYSICS // SOVEREIGN_COMPUTE',
    title: 'The Physics of Sovereign Compute & Decoupled Loops',
    icon: Scale,
    body: 'Decouple critical loops from single-vendor lock-in. Grounding agents in local SQLite/DuckDB vector caches, orchestrating state across edge runtimes, and treating LLMs as swappable reasoning engines rather than architectural backbones ensures extreme resilience and low unit economics.',
    marginalia: 'Heidegger\'s Gestell: Sovereign compute is energy physics and geopolitical territory, not a rented cloud billing abstraction.'
  },
  {
    tag: '0x4_HARNESS // AGENTIC_FORCE_MULTIPLIER',
    title: 'Orchestrating Autonomous Coding Agents',
    icon: Sparkles,
    body: 'I write software daily with Google Antigravity, Claude Code, and OpenAI Codex. The secret to agentic speed without hallucination is harness design: never let an agent write code without an explicit implementation plan, bounded line slices, and a deterministic compiler loop (tsc, Vitest, AST linters) acting as its sensory organs.',
    marginalia: 'Brooks\' Mythical Man-Month: Conceptual integrity preserved. One architect orchestrating multi-agent loops ships the surface of a 10-person team.'
  }
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

            {/* Availability & Philosophy Card */}
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
                <Compass size={14} className="text-brand-accent shrink-0 mt-0.5" />
                <div>
                  <span className="font-mono text-[9px] uppercase font-bold text-brand-muted block">PHILOSOPHY</span>
                  <span className="font-bold text-brand-dark">First Principles Over Convention</span>
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
              <p>
                <strong>Agentic Orchestration:</strong> Daily expert-level practitioner of Google Antigravity, Claude Code, and OpenAI Codex. I treat autonomous agents not as conversational chatbots, but as high-throughput, non-deterministic workers operating inside rigid, deterministic compiler harnesses (TypeScript strict mode, Vitest, AST linters). The human architect defines invariants and audits diffs; agents execute parallel implementation.
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

        {/* PHILOSOPHY OF OPERATING & WORKING AXIOMS */}
        <div className="pt-20 border-t border-brand-dark/10 space-y-10" id="philosophy">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 border border-brand-accent/30 bg-brand-accent/5 px-3 py-1 sharp-edge">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] font-bold text-brand-accent">
                // PHILOSOPHY OF OPERATING
              </span>
            </div>
            <h3 className="font-serif text-2xl md:text-4xl font-bold text-brand-dark tracking-tight">
              Working Axioms & Cognitive Models
            </h3>
            <p className="font-sans text-xs md:text-sm text-brand-muted max-w-2xl leading-relaxed">
              Software engineering under ambiguity requires principles that survive hype cycles. These four axioms govern how I evaluate architectural trade-offs, security boundaries, agent orchestration, and product survival.
            </p>
          </div>

          {/* THE INVERTED PYRAMID OF PROOF SCHEMATIC */}
          <div className="border border-brand-dark/15 bg-brand-surface p-3 sharp-edge shadow-sm space-y-2">
            <div className="relative aspect-video w-full overflow-hidden bg-brand-dark sharp-edge border border-brand-dark/10">
              <img
                src="/assets/images/inverted-pyramid-schematic.png"
                alt="The Inverted Pyramid of Proof: Systems Engineering in the Age of AI"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-3 right-3 bg-brand-dark/90 text-brand-bg px-2.5 py-1 font-mono text-[9px] uppercase tracking-widest border border-brand-accent/40 sharp-edge">
                FIGURE 01 // INVERTED_PYRAMID_OF_PROOF
              </div>
            </div>
            <div className="flex flex-wrap justify-between items-center px-2 py-1 font-mono text-[10px] text-brand-muted uppercase">
              <span>Layer 01: Production Telemetry &rarr; Layer 02: Deterministic Compilers &rarr; Layer 03: Probabilistic Models</span>
              <span className="text-brand-accent font-bold">&ldquo;Intelligence is a tool. Proof is a system.&rdquo;</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {OPERATING_AXIOMS.map((axiom, idx) => {
              const Icon = axiom.icon;
              return (
                <div
                  key={idx}
                  className="p-6 border border-brand-dark/15 bg-brand-surface sharp-edge space-y-4 flex flex-col justify-between group hover:border-brand-accent transition-colors duration-300"
                >
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="font-mono text-[9px] uppercase tracking-wider text-brand-accent font-bold px-2 py-0.5 border border-brand-accent/20 bg-brand-accent/5 sharp-edge">
                        {axiom.tag}
                      </span>
                      <Icon size={16} className="text-brand-muted group-hover:text-brand-accent transition-colors" />
                    </div>

                    <h4 className="font-serif text-lg font-bold text-brand-dark group-hover:text-brand-accent transition-colors border-b border-brand-dark/10 pb-3">
                      {axiom.title}
                    </h4>

                    <p className="font-sans text-xs text-brand-muted leading-relaxed">
                      {axiom.body}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-brand-dark/10 font-mono text-[10px] text-brand-dark/70 italic leading-snug">
                    &ldquo;{axiom.marginalia}&rdquo;
                  </div>
                </div>
              );
            })}
          </div>

          {/* ESSAY BANNER: Orchestrating Autonomous Coding Agents */}
          <div className="p-6 border border-brand-accent/30 bg-brand-accent/5 sharp-edge flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="font-mono text-[9px] uppercase tracking-widest font-bold text-brand-accent block">
                FEATURED TECHNICAL ESSAY
              </span>
              <h4 className="font-serif text-lg font-bold text-brand-dark">
                Orchestrating Autonomous Coding Agents: Lessons from Daily Production with Antigravity, Claude Code, and Codex
              </h4>
              <p className="font-sans text-xs text-brand-muted">
                Why naive prompt-and-pray fails, how compiler harnesses act as sensory organs, and the 5 rules for 10x engineering.
              </p>
            </div>
            <Link
              to="/writing/orchestrating-ai-coding-agents"
              className="inline-flex items-center gap-2 bg-brand-dark text-brand-bg hover:bg-brand-accent hover:text-brand-dark px-4 py-2.5 font-mono text-xs uppercase tracking-wider font-bold sharp-edge transition-colors shrink-0"
            >
              <span>Read Essay</span>
              <ArrowRight size={12} />
            </Link>
          </div>
        </div>

        {/* INTELLECTUAL CANON CALLOUT */}
        <div className="mt-16 p-8 border border-brand-dark bg-brand-surface sharp-edge flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 shadow-sm">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2 font-mono text-[10px] uppercase font-bold text-brand-accent">
              <BookOpen size={14} />
              <span>THE READING ROOM // INTELLECTUAL CANON</span>
            </div>
            <h4 className="font-serif text-2xl font-bold text-brand-dark">
              12 Foundational Texts That Direct My Architecture
            </h4>
            <p className="font-sans text-xs text-brand-muted leading-relaxed">
              From Meadows&apos; stocks and flows to Taleb&apos;s convex payoffs, Gall&apos;s Law, and Ousterhout&apos;s deep modules. Read my unfiltered verdicts and direct code impact notes.
            </p>
          </div>

          <Link
            to="/books"
            className="inline-flex items-center gap-2 bg-brand-dark text-brand-bg hover:bg-brand-accent hover:text-brand-dark px-6 py-3.5 font-mono text-xs uppercase tracking-widest font-bold sharp-edge transition-colors shrink-0"
            id="about-explore-canon-btn"
          >
            <span>Explore The Canon</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        {/* TRAJECTORY TIMELINE GRID (RELEVANT EXPERIENCE) */}
        <div className="pt-20 border-t border-brand-dark/10 mt-20">
          <h3 className="font-serif text-2xl md:text-3xl font-bold text-brand-dark uppercase tracking-tight mb-8">
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

        {/* COLOPHON SECTION */}
        <div className="pt-20 border-t border-brand-dark/10 mt-20 space-y-6">
          <div className="space-y-2">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] font-bold text-brand-accent">
              // COLOPHON & CONSTRAINTS
            </span>
            <h3 className="font-serif text-2xl font-bold text-brand-dark">
              How This Site Is Engineered
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 font-sans text-xs text-brand-muted">
            <div className="p-4 border border-brand-dark/10 bg-brand-surface sharp-edge space-y-2">
              <span className="font-mono text-[9px] uppercase font-bold text-brand-dark block">TYPOGRAPHY</span>
              <p className="leading-relaxed">
                Playfair Display (editorial serif headlines), Inter (neutral sans body), and JetBrains Mono (telemetry and code).
              </p>
            </div>
            <div className="p-4 border border-brand-dark/10 bg-brand-surface sharp-edge space-y-2">
              <span className="font-mono text-[9px] uppercase font-bold text-brand-dark block">RUNTIME STACK</span>
              <p className="leading-relaxed">
                React 19, Vite 6, Tailwind CSS v4, and Framer Motion. Zero server-side runtime dependencies.
              </p>
            </div>
            <div className="p-4 border border-brand-dark/10 bg-brand-surface sharp-edge space-y-2">
              <span className="font-mono text-[9px] uppercase font-bold text-brand-dark block">PRIVACY INVARIANT</span>
              <p className="leading-relaxed">
                Zero third-party trackers, zero marketing cookies, zero telemetry beacons. What you read stays on your device.
              </p>
            </div>
            <div className="p-4 border border-brand-dark/10 bg-brand-surface sharp-edge space-y-2">
              <span className="font-mono text-[9px] uppercase font-bold text-brand-dark block">EDGE DELIVERY</span>
              <p className="leading-relaxed">
                Static build pre-compiled and served across global edge points with sub-50ms TTFB and SVG analog grain overlays.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* EMBEDDED BUILD LOG SECTION */}
      <BuildLog />
    </>
  );
}
