/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Play, RefreshCw, CheckCircle, Sparkles, ShoppingBag, Database, ExternalLink } from 'lucide-react';
import { CaseStudy } from '../types';

interface CaseStudyModalProps {
  project: CaseStudy | null;
  onClose: () => void;
}

export default function CaseStudyModal({ project, onClose }: CaseStudyModalProps) {
  const [simulationState, setSimulationState] = useState<'idle' | 'running' | 'completed'>('idle');
  const [simulationStep, setSimulationStep] = useState<number>(0);
  const [logMessages, setLogMessages] = useState<string[]>([]);
  
  // Simulation inputs
  const [queryInput, setQueryInput] = useState('What are the latest Central Bank of Kenya filings on digital asset compliance?');
  const [cartValue, setCartValue] = useState<number>(100);
  const [selectedUpsell, setSelectedUpsell] = useState<boolean>(false);
  const [oreosStoreUrl, setOreosStoreUrl] = useState<string>('https://oreos.online');
  const [oreosApprovalGate, setOreosApprovalGate] = useState<boolean>(true);

  if (!project) return null;

  const startSimulation = () => {
    setSimulationState('running');
    setSimulationStep(0);
    setLogMessages([]);

    let logs: string[] = [];
    if (project.id === 'oreos') {
      logs = [
        `🌐 GROUNDING INGEST: Crawling ${oreosStoreUrl || 'https://oreos.online'} - palette, typography & voice rules parsed.`,
        '📦 CATALOG SYNC: 100% SKU inventory & metadata synced into tenant-isolated Postgres RLS.',
        '🤖 COPILOT DRAFT: Platform-native campaign generated for Instagram, TikTok, LinkedIn & X.',
        oreosApprovalGate
          ? '🛡️ TOOL APPROVAL GATE: toolApproval: { schedulePost: "user-approval" } - awaiting human click.'
          : '⚠️ BYPASS WARNING: Direct publish mode triggered.',
        '🚀 POSTPROXY DISPATCH: Human approval verified. Queued to social APIs via isolated OAuth gateway.'
      ];
    } else if (project.id === 'regwatch') {
      logs = [
        '📂 INTAKE: Central Bank of Kenya (CBK) & ODPC filing stream.',
        '🧠 CHUNKING: Voyage AI semantic vector encoding initialized.',
        '🛡️ RLS FILTER: Scoping Supabase pgvector queries via 3-role security model.',
        '🔍 DB EXECUTION: Row-level policy enforced; isolated client space confirmed.',
        '✍️ CLAUDE SYNTHESIS: Answer generated with 100% legal document citations.'
      ];
    } else if (project.id === 'vertical-agents') {
      logs = [
        '💬 INBOUND WEBHOOK: WhatsApp API message received from clinic patient / host guest.',
        '🧠 INTENT EVALUATION: Evaluating narrow vertical domain rules & safety prompt bounds.',
        '📅 AVAILABILITY CHECK: Querying PostgreSQL booking calendar / stock index...',
        '💬 RESPONSE GENERATION: Sub-30-second qualified response formatted.',
        '🤝 HANDOFF AUDIT: Confidence threshold passed (no human escalation required).'
      ];
    } else if (project.id === 'forma') {
      logs = [
        '🧵 SUPPLIER LOCK: S-Shaper manufacturing OEKO-TEX certification verified.',
        '📐 SIZING REBUILD: East African hip proportion fit parameters mapped.',
        '🎨 IDENTITY SYSTEM: Obsidian / cream / terracotta / nude palette rendering.',
        '📊 PRODUCTION RUN: 100-unit MOQ floor & unit economics calculated.'
      ];
    } else if (project.id === 'naisole') {
      logs = [
        '🛍️ STOREFRONT INGEST: Single-system Shopify theme compilation.',
        '📦 DATA SCHEMA: Product category taxonomy and metadata schemas bound.',
        '⚡ RENDER SPEED: Custom Liquid & React checkout components assembled.',
        '📈 CONVERSION PATH: Fused identity, IA, and checkout path into zero-friction flow.'
      ];
    } else {
      // mnl-advocates
      logs = [
        '🌐 HEADLESS ARCHITECTURE: Decoupled WordPress CMS behind Next.js 14.',
        '🚀 EDGE DELIVERY: Deploying static-first routes on Vercel edge network.',
        '🔍 AEO & SEO ENGINE: Injecting Schema.org entity graphs for answer engines.',
        '⚡ PERFORMANCE METRICS: Sub-second load time and clean crawler indexing confirmed.'
      ];
    }

    let step = 0;
    const interval = setInterval(() => {
      setLogMessages(prev => [...prev, logs[step]]);
      setSimulationStep(step + 1);
      step += 1;
      if (step >= logs.length) {
        clearInterval(interval);
        setSimulationState('completed');
      }
    }, 850);
  };

  const resetSimulation = () => {
    setSimulationState('idle');
    setSimulationStep(0);
    setLogMessages([]);
    setSelectedUpsell(false);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-end overflow-hidden" id={`modal-${project.id}`}>
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-brand-dark/40 backdrop-blur-sm"
          id="modal-backdrop"
        />

        {/* Modal Sheet panel */}
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 220 }}
          className="relative w-full max-w-4xl h-full bg-brand-bg border-l border-brand-dark/20 text-brand-dark flex flex-col z-10 shadow-2xl overflow-y-auto sharp-edge"
          id="modal-content"
        >
          {/* Top Bar Header */}
          <div className="sticky top-0 bg-brand-bg/90 backdrop-blur-md z-20 flex justify-between items-center py-6 px-8 border-b border-brand-dark/15">
            <span className="font-mono text-xs tracking-[0.2em] uppercase font-bold text-brand-accent">
              SELECTED BUILD {project.number} // {project.category}
            </span>
            <button
              onClick={onClose}
              className="p-1 text-brand-dark hover:text-brand-accent transition-colors cursor-pointer"
              id="modal-close-btn"
              aria-label="Close modal"
            >
              <X size={20} />
            </button>
          </div>

          <div className="flex-1 p-8 md:p-12 space-y-12">
            {/* Project Title Block */}
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <h1 className="font-serif text-3xl md:text-5xl font-bold tracking-tight leading-tight">
                  {project.title}
                </h1>
                {project.id === 'oreos' && (
                  <a
                    href="https://oreos.online"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-brand-dark text-brand-bg hover:bg-brand-accent hover:text-brand-dark transition-colors font-mono text-xs uppercase tracking-wider font-bold sharp-edge"
                  >
                    <span>Visit Live Site (oreos.online)</span>
                    <ExternalLink size={12} />
                  </a>
                )}
              </div>
              <p className="font-serif text-xl italic text-brand-muted leading-relaxed max-w-2xl">
                "{project.subtitle}"
              </p>
            </div>

            {/* OREoS Visual Showcase Banner */}
            {project.id === 'oreos' && (
              <div className="space-y-2 border border-brand-dark/15 bg-brand-surface p-2.5 sharp-edge shadow-sm">
                <div className="relative overflow-hidden aspect-video w-full bg-brand-dark sharp-edge">
                  <img
                    src="/assets/images/oreos-platform-hero.png"
                    alt="OREoS AI Marketing OS Interface Preview"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-2 right-2 bg-brand-dark/90 text-brand-bg px-2.5 py-1 font-mono text-[9px] uppercase tracking-widest border border-brand-accent/40 sharp-edge">
                    FIGURE 01 // LIVE_PRODUCTION_SURFACE
                  </div>
                </div>
                <div className="flex flex-wrap justify-between items-center px-2 py-1 font-mono text-[10px] text-brand-muted uppercase">
                  <span>Turn Any Product Into High-Converting Campaigns</span>
                  <span className="text-brand-accent font-bold">100% Brand-Grounded Multi-Channel Engine</span>
                </div>
              </div>
            )}

            {/* Cognitive Engine Visual Showcase Banner */}
            {project.id === 'cognitive-engine' && (
              <div className="space-y-2 border border-brand-dark/15 bg-brand-surface p-2.5 sharp-edge shadow-sm">
                <div className="relative overflow-hidden aspect-video w-full bg-brand-dark sharp-edge">
                  <img
                    src="/assets/images/cognitive-engine-architecture.jpg"
                    alt="Cognitive Engine RAG Knowledge Graph & Pipeline Interface"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-2 right-2 bg-brand-dark/90 text-brand-bg px-2.5 py-1 font-mono text-[9px] uppercase tracking-widest border border-brand-accent/40 sharp-edge">
                    FIGURE 01 // KNOWLEDGE_GRAPH_TOPOLOGY
                  </div>
                </div>
                <div className="flex flex-wrap justify-between items-center px-2 py-1 font-mono text-[10px] text-brand-muted uppercase">
                  <span>Deep Web Synthesis & Vector Space Manifolds</span>
                  <span className="text-brand-accent font-bold">Deterministic JSON Schema Validator</span>
                </div>
              </div>
            )}

            {/* Neural Search Visual Showcase Banner */}
            {project.id === 'neural-search' && (
              <div className="space-y-2 border border-brand-dark/15 bg-brand-surface p-2.5 sharp-edge shadow-sm">
                <div className="relative overflow-hidden aspect-video w-full bg-brand-dark sharp-edge">
                  <img
                    src="/assets/images/neural-search-architecture.jpg"
                    alt="Neural Search Hybrid Vector Engine Dashboard"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-2 right-2 bg-brand-dark/90 text-brand-bg px-2.5 py-1 font-mono text-[9px] uppercase tracking-widest border border-brand-accent/40 sharp-edge">
                    FIGURE 01 // VECTOR_SPACE_TOPOLOGY & SPARSE_INDEX
                  </div>
                </div>
                <div className="flex flex-wrap justify-between items-center px-2 py-1 font-mono text-[10px] text-brand-muted uppercase">
                  <span>1536D Dense Vectors + BM25 Sparse Inverted Index</span>
                  <span className="text-brand-accent font-bold">P99 &lt; 12ms // 42,000 QPS Throughput</span>
                </div>
              </div>
            )}

            {/* FORMA Visual Showcase Banner */}
            {project.id === 'forma' && (
              <div className="space-y-2 border border-brand-dark/15 bg-brand-surface p-2.5 sharp-edge shadow-sm">
                <div className="relative overflow-hidden aspect-video w-full bg-brand-dark sharp-edge">
                  <img
                    src="/assets/images/forma-generative-pipeline.png"
                    alt="FORMA Generative UI Design System Preview"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-2 right-2 bg-brand-dark/90 text-brand-bg px-2.5 py-1 font-mono text-[9px] uppercase tracking-widest border border-brand-accent/40 sharp-edge">
                    FIGURE 01 // GENERATIVE_COMPONENT_PIPELINE
                  </div>
                </div>
                <div className="flex flex-wrap justify-between items-center px-2 py-1 font-mono text-[10px] text-brand-muted uppercase">
                  <span>Prompt to AST &rarr; Wireframe Decomposition &rarr; Production React</span>
                  <span className="text-brand-accent font-bold">Sub-Second Realtime Render</span>
                </div>
              </div>
            )}

            {/* Quick Details Stats Block */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 py-6 border-y border-brand-dark/15 font-sans">
              <div>
                <p className="text-[10px] uppercase tracking-widest text-brand-muted font-semibold">Impact Metric</p>
                <p className="text-2xl font-bold text-brand-accent mt-1">{project.metricValue}</p>
                <p className="text-xs text-brand-muted mt-0.5">{project.metricLabel}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-brand-muted font-semibold">Duration / Type</p>
                <p className="text-lg font-bold text-brand-dark mt-1">{project.duration}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-brand-muted font-semibold">Role</p>
                <p className="text-lg font-bold text-brand-dark mt-1">{project.role}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-brand-muted font-semibold">Stack</p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {project.technologies.slice(0, 3).map((t, idx) => (
                    <span key={idx} className="bg-brand-dark/5 text-[10px] px-1.5 py-0.5 text-brand-muted font-mono">{t}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Main grid split: Challenge/Solution & Interactive simulator */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Challenge / Solution Narrative Column */}
              <div className="lg:col-span-7 space-y-8 pr-0 lg:pr-4">
                <div className="space-y-3">
                  <h3 className="font-sans text-xs uppercase tracking-[0.2em] font-extrabold text-brand-dark">
                    The Challenge
                  </h3>
                  <p className="font-sans text-sm text-brand-muted leading-relaxed">
                    {project.challenge}
                  </p>
                </div>

                <div className="space-y-3">
                  <h3 className="font-sans text-xs uppercase tracking-[0.2em] font-extrabold text-brand-dark">
                    The Architecture
                  </h3>
                  <p className="font-sans text-sm text-brand-muted leading-relaxed">
                    {project.solution}
                  </p>
                </div>

                {/* Grid Workflow Steps timeline list */}
                <div className="space-y-4">
                  <h3 className="font-sans text-xs uppercase tracking-[0.2em] font-extrabold text-brand-dark">
                    Execution Steps
                  </h3>
                  <div className="space-y-3">
                    {project.workflowSteps.map((step, idx) => (
                      <div 
                        key={idx} 
                        className="flex gap-4 p-4 items-start border border-brand-dark/10 bg-brand-surface sharp-edge"
                      >
                        <span className="font-serif text-sm font-bold text-brand-accent bg-brand-accent/10 h-6 w-6 flex items-center justify-center">
                          {idx + 1}
                        </span>
                        <div>
                          <p className="font-sans font-bold text-sm text-brand-dark">{step.title}</p>
                          <p className="font-sans text-xs text-brand-muted mt-1 leading-relaxed">{step.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* LIVE SIMULATOR: Right column */}
              <div className="lg:col-span-5 bg-brand-dark/5 p-6 border border-brand-dark/15 flex flex-col justify-between sharp-edge space-y-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles size={16} className="text-brand-accent animate-pulse" />
                    <span className="font-sans text-[11px] uppercase tracking-widest font-extrabold text-brand-dark">
                      Interactive Architecture Sandbox
                    </span>
                  </div>
                  
                  <h4 className="font-serif text-lg font-bold">
                    Pipeline Simulator
                  </h4>
                  <p className="text-xs text-brand-muted mt-1 leading-relaxed">
                    Test how this system processes data and enforces architectural constraints in real time.
                  </p>
                </div>

                {/* Specific Simulator Form Inputs based on Case */}
                <div className="py-4 border-y border-brand-dark/10 space-y-4">
                  {project.id === 'oreos' && (
                    <div className="space-y-3 font-sans">
                      <div className="space-y-1">
                        <label className="block text-[11px] uppercase tracking-wider text-brand-muted font-bold font-mono">
                          Store Grounding URL:
                        </label>
                        <input
                          type="text"
                          disabled={simulationState === 'running'}
                          value={oreosStoreUrl}
                          onChange={(e) => setOreosStoreUrl(e.target.value)}
                          placeholder="https://yourstore.com"
                          className="w-full text-xs p-2.5 bg-brand-surface border border-brand-dark/20 text-brand-dark focus:outline-none focus:border-brand-accent font-mono sharp-edge"
                        />
                        <p className="text-[10px] text-brand-muted font-sans">
                          Autonomous crawler extracts typography, palette tokens, SKU catalog, and brand voice.
                        </p>
                      </div>
                      <div className="p-3 bg-brand-surface border border-brand-dark/10 flex items-center justify-between sharp-edge">
                        <div className="flex items-center gap-2">
                          <Sparkles size={14} className="text-brand-accent shrink-0" />
                          <div>
                            <span className="font-mono text-xs font-bold text-brand-dark block">Server Tool Approval Gate</span>
                            <span className="text-[9px] text-brand-muted block font-mono">toolApproval: &#123; schedulePost: "user-approval" &#125;</span>
                          </div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            disabled={simulationState === 'running'}
                            checked={oreosApprovalGate}
                            onChange={(e) => setOreosApprovalGate(e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-8 h-4 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-brand-accent"></div>
                        </label>
                      </div>
                    </div>
                  )}

                  {(project.id === 'regwatch' || project.id === 'vertical-agents') && (
                    <div className="space-y-2">
                      <label className="block text-[11px] uppercase tracking-wider text-brand-muted font-bold">
                        {project.id === 'regwatch' ? 'CBK / ODPC Compliance Query:' : 'Inbound Client WhatsApp Message:'}
                      </label>
                      <input
                        type="text"
                        disabled={simulationState === 'running'}
                        value={queryInput}
                        onChange={(e) => setQueryInput(e.target.value)}
                        className="w-full text-xs p-3 bg-brand-surface border border-brand-dark/20 text-brand-dark focus:outline-none focus:border-brand-accent font-sans sharp-edge"
                      />
                    </div>
                  )}

                  {(project.id === 'forma' || project.id === 'naisole') && (
                    <div className="space-y-3">
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs font-mono">
                          <span className="text-brand-muted">Production / Order Quantity:</span>
                          <span className="text-brand-dark font-bold">{cartValue} units</span>
                        </div>
                        <input
                          type="range"
                          min="100"
                          max="500"
                          step="50"
                          disabled={simulationState === 'running'}
                          value={cartValue}
                          onChange={(e) => setCartValue(Number(e.target.value))}
                          className="w-full accent-brand-accent cursor-pointer bg-brand-dark/15 h-1"
                        />
                        <p className="text-[9px] text-brand-muted font-mono">
                          {project.id === 'forma' ? "S-Shaper OEKO-TEX 100 MOQ Floor." : "Single-system inventory scale test."}
                        </p>
                      </div>
                      <div className="p-3 bg-brand-surface border border-brand-dark/10 flex items-center justify-between sharp-edge">
                        <div className="flex items-center gap-2">
                          <ShoppingBag size={14} className="text-brand-accent" />
                          <span className="font-sans text-xs font-bold text-brand-dark">Custom Packaging Add-on</span>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            disabled={simulationState === 'running'}
                            checked={selectedUpsell}
                            onChange={(e) => setSelectedUpsell(e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-8 h-4 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-brand-accent"></div>
                        </label>
                      </div>
                    </div>
                  )}

                  {project.id === 'mnl-advocates' && (
                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-brand-muted">Headless Edge Network:</span>
                        <span className="font-bold text-green-700">Vercel Edge + Next.js 14</span>
                      </div>
                      <p className="text-xs text-brand-muted leading-relaxed font-sans">
                        Schema.org practice area entity graphs enabled for Perplexity, ChatGPT, and Google Search crawlers.
                      </p>
                    </div>
                  )}

                  {/* Simulated terminal logs output screen */}
                  <div className="bg-brand-dark text-brand-bg p-4 font-mono text-[10px] space-y-1.5 h-36 overflow-y-auto leading-relaxed border border-brand-dark/20 sharp-edge shadow-inner">
                    {logMessages.length === 0 ? (
                      <span className="text-gray-400">⚡ Click Initialize Pipeline to execute system simulation.</span>
                    ) : (
                      logMessages.map((msg, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, x: -5 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3 }}
                          className="border-b border-brand-surface/10 pb-1 last:border-0"
                        >
                          {msg}
                        </motion.div>
                      ))
                    )}
                    {simulationState === 'running' && (
                      <div className="flex items-center gap-1 text-xs text-brand-gold animate-pulse mt-2">
                        <RefreshCw size={10} className="animate-spin" />
                        <span>EXECUTE_STEP_{simulationStep}...</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Action CTA simulator triggers */}
                <div className="flex gap-2">
                  {simulationState !== 'idle' ? (
                    <button
                      onClick={resetSimulation}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 bg-brand-surface hover:bg-brand-dark hover:text-brand-bg transition-colors duration-200 border border-brand-dark text-brand-dark font-sans text-xs uppercase tracking-wider py-3 font-semibold sharp-edge cursor-pointer"
                    >
                      <RefreshCw size={12} />
                      Reset Sandbox
                    </button>
                  ) : (
                    <button
                      onClick={startSimulation}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 bg-brand-dark text-brand-bg border border-brand-dark hover:bg-brand-accent hover:border-brand-accent transition-colors duration-300 font-sans text-xs uppercase tracking-widest py-3 font-semibold sharp-edge cursor-pointer"
                    >
                      <Play size={12} fill="white" />
                      Initialize Pipeline
                    </button>
                  )}
                </div>

                {/* Final simulation results report */}
                {simulationState === 'completed' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-brand-surface border border-brand-accent bg-brand-accent/5 flex items-start gap-3 sharp-edge"
                  >
                    <CheckCircle className="text-brand-accent shrink-0 mt-0.5" size={16} />
                    <div className="text-xs">
                      <p className="font-bold text-brand-dark">Execution Successful</p>
                      <p className="text-[#27272a] mt-1 leading-relaxed font-sans text-xs">
                        System constraints verified. Every line of code moves a balance-sheet metric.
                      </p>
                    </div>
                  </motion.div>
                )}
              </div>

            </div>

            <div className="pt-6 border-t border-brand-dark/15 flex flex-col md:flex-row justify-between items-center text-xs text-brand-muted gap-4">
              <p className="flex items-center gap-1">
                <Database size={12} />
                <span>Production Security: DB-level RLS policies & fail-closed execution.</span>
              </p>
              <p>
                Architected by Zachary Ongeri.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
