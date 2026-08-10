/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Cpu, Search, ShoppingBag, ArrowRight, CheckCircle2, Clock, ChevronDown, ChevronUp } from 'lucide-react';
import { BUILD_DECISIONS, AGENT_BUILD_STEPS, ENGAGEMENT_SHAPES, SPRINT_WEEKS } from '../data';
import { useUI } from '../context/UIContext';

export default function BuildLog() {
  const [activeTab, setActiveTab] = useState<'decisions' | 'agent-method' | 'sprint-workflow'>('decisions');
  const [expandedDecisionId, setExpandedDecisionId] = useState<string>(BUILD_DECISIONS[0].id);
  const { openContact } = useUI();

  return (
    <section className="py-20 md:py-28 px-6 md:px-12 w-full max-w-7xl mx-auto border-t border-brand-dark/15" id="decisions">
      {/* Header */}
      <div className="space-y-4 mb-10">
        <div className="inline-flex items-center gap-2 border border-brand-accent/30 bg-brand-accent/5 px-3 py-1 sharp-edge">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] font-bold text-brand-accent">
            // 03 BUILD LOG & METHODOLOGY
          </span>
        </div>
        <h2 className="font-serif text-3xl md:text-5xl font-bold tracking-tight text-brand-dark">
          Architectural Decisions & Method
        </h2>
        <p className="font-sans text-xs md:text-sm text-brand-muted max-w-xl leading-relaxed">
          How I think before writing a line of code. No fluff, no unverified assumptions.
        </p>
      </div>

      {/* Navigation Tabs */}
      <div className="flex flex-wrap gap-2 mb-10 border-b border-brand-dark/15 pb-4" id="build-log-tabs">
        <button
          onClick={() => setActiveTab('decisions')}
          className={`px-4 py-2 font-mono text-xs tracking-wider sharp-edge transition-all cursor-pointer ${
            activeTab === 'decisions'
              ? 'bg-brand-dark text-brand-bg border border-brand-dark'
              : 'bg-brand-surface text-brand-muted hover:text-brand-dark border border-brand-dark/10'
          }`}
        >
          [01] Decisions & Rationale
        </button>
        <button
          onClick={() => setActiveTab('agent-method')}
          className={`px-4 py-2 font-mono text-xs tracking-wider sharp-edge transition-all cursor-pointer ${
            activeTab === 'agent-method'
              ? 'bg-brand-dark text-brand-bg border border-brand-dark'
              : 'bg-brand-surface text-brand-muted hover:text-brand-dark border border-brand-dark/10'
          }`}
        >
          [02] 5-Step Agent Blueprint
        </button>
        <button
          onClick={() => setActiveTab('sprint-workflow')}
          className={`px-4 py-2 font-mono text-xs tracking-wider sharp-edge transition-all cursor-pointer ${
            activeTab === 'sprint-workflow'
              ? 'bg-brand-dark text-brand-bg border border-brand-dark'
              : 'bg-brand-surface text-brand-muted hover:text-brand-dark border border-brand-dark/10'
          }`}
        >
          [03] Build Sprint & Shapes
        </button>
      </div>

      {/* TAB 1: DECISIONS (ADHD-friendly single-focus accordion) */}
      {activeTab === 'decisions' && (
        <div className="space-y-4">
          {BUILD_DECISIONS.map((decision) => {
            const isExpanded = expandedDecisionId === decision.id;
            return (
              <div
                key={decision.id}
                className={`border transition-all duration-300 sharp-edge ${
                  isExpanded
                    ? 'border-brand-dark bg-brand-surface shadow-sm'
                    : 'border-brand-dark/15 bg-brand-surface/50 hover:border-brand-dark/40'
                }`}
                id={`decision-accordion-${decision.id}`}
              >
                <div
                  onClick={() => setExpandedDecisionId(isExpanded ? '' : decision.id)}
                  className="p-5 md:p-6 flex items-center justify-between cursor-pointer select-none"
                >
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-xs font-bold px-2 py-0.5 border border-brand-accent/30 bg-brand-accent/5 text-brand-accent sharp-edge">
                      {decision.number}
                    </span>
                    <h3 className="font-serif text-lg md:text-xl font-bold text-brand-dark">
                      {decision.title}
                    </h3>
                  </div>
                  <div className="p-1 text-brand-muted">
                    {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </div>
                </div>

                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-5 md:px-6 pb-6 pt-2 border-t border-brand-dark/10 space-y-4"
                  >
                    <blockquote className="font-serif text-sm italic border-l-2 border-brand-accent pl-4 py-1 text-brand-muted bg-brand-accent/5">
                      "{decision.quote}"
                    </blockquote>
                    <p className="font-sans text-xs md:text-sm text-brand-muted leading-relaxed">
                      {decision.rationale}
                    </p>
                  </motion.div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* TAB 2: AGENT BLUEPRINT */}
      {activeTab === 'agent-method' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {AGENT_BUILD_STEPS.map((step) => (
              <div
                key={step.stepNumber}
                className="p-5 border border-brand-dark/15 bg-brand-surface sharp-edge flex flex-col justify-between space-y-4"
              >
                <div className="font-mono text-xs font-bold text-brand-accent border-b border-brand-dark/10 pb-2">
                  STEP 0{step.stepNumber}
                </div>
                <h4 className="font-serif text-sm font-bold text-brand-dark">
                  {step.title}
                </h4>
                <p className="font-sans text-xs text-brand-muted leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>

          <div className="p-5 border border-brand-accent/30 bg-brand-accent/5 sharp-edge flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="font-sans text-xs text-brand-dark font-medium">
              Narrow agents beat general assistants in production. Every agent has a verified human handoff boundary.
            </p>
            <button
              onClick={openContact}
              className="bg-brand-dark text-brand-bg px-5 py-2.5 font-sans text-xs uppercase tracking-widest font-extrabold sharp-edge cursor-pointer"
            >
              Deploy Agent
            </button>
          </div>
        </div>
      )}

      {/* TAB 3: ENGAGEMENT SHAPES & SPRINT TIMELINE */}
      {activeTab === 'sprint-workflow' && (
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {ENGAGEMENT_SHAPES.map((shape) => (
              <div
                key={shape.id}
                className="p-6 border border-brand-dark/15 bg-brand-surface sharp-edge space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <span className="font-mono text-[9px] uppercase tracking-widest text-brand-accent font-bold">
                    SHAPE
                  </span>
                  <h3 className="font-serif text-xl font-bold text-brand-dark">{shape.title}</h3>
                  <p className="font-sans text-xs text-brand-muted leading-relaxed">{shape.description}</p>
                </div>
                <button
                  onClick={openContact}
                  className="w-full py-2.5 border border-brand-dark text-brand-dark hover:bg-brand-dark hover:text-brand-bg font-mono text-xs uppercase tracking-wider sharp-edge cursor-pointer transition-colors"
                >
                  Select &rarr;
                </button>
              </div>
            ))}
          </div>

          {/* 6-Week Sprint */}
          <div className="p-6 border border-brand-dark bg-brand-surface sharp-edge space-y-4">
            <h3 className="font-serif text-xl font-bold text-brand-dark border-b border-brand-dark/10 pb-3">
              How A 6-Week Build Sprint Runs
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {SPRINT_WEEKS.map((week, idx) => (
                <div key={idx} className="p-4 border border-brand-dark/10 bg-brand-bg/40 sharp-edge space-y-2">
                  <span className="font-mono text-[10px] uppercase font-bold text-brand-accent">{week.phase}</span>
                  <h4 className="font-serif text-sm font-bold text-brand-dark">{week.title}</h4>
                  <p className="font-sans text-xs text-brand-muted leading-relaxed">{week.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
