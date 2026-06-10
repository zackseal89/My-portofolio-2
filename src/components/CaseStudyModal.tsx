/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Play, RefreshCw, CheckCircle, ArrowRight, Sparkles, ShoppingBag, Database, ShieldAlert } from 'lucide-react';
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
  // 1. Triage Lead Simulator custom inputs
  const [leadMessage, setLeadMessage] = useState('Hi Zachary, we need to automate our sales qualification on Shopify. We get 200 high-ticket leads daily but manually screen them.');
  // 2. E-comm AOV simulator inputs
  const [cartValue, setCartValue] = useState<number>(120);
  const [selectedUpsell, setSelectedUpsell] = useState<boolean>(false);
  // 3. Automated Intelligence loop inputs
  const [supplyStock, setSupplyStock] = useState<number>(8);

  if (!project) return null;

  const startSimulation = () => {
    setSimulationState('running');
    setSimulationStep(0);
    setLogMessages([]);

    let logs: string[] = [];
    if (project.id === 'regwatch') {
      logs = [
        '📂 INTAKE: New Regulatory Publication (Finance Act Amendment PDF).',
        '🧠 SEGMENTATION: Embedding chunks dynamically via Voyage AI...',
        '📊 DB RECORD: Injecting semantic node indices into Supabase pgvector database.',
        '🔍 COMPLIANCE AUDIT: Pre-computed vector lookup completed successfully.',
        '✍️ GENERATOR: RAG query ready with 100% legal document bibliography citations.'
      ];
    } else if (project.id === 'whatsapp-sme-agents') {
      logs = [
        '💬 INTAKE: Inbound WhatsApp API Text: "I want to schedule a consultation tomorrow at 2 PM."',
        '🧠 CLASSIFICATION: Querying Google Gemini classifier module...',
        '📅 SCHEDULE SYNCRONIZER: Checking calendar slot openings for tomorrow 14:00...',
        '💬 AUTOMATED FEEDBACK: Sending immediate WhatsApp confirmation message reserving the slot.',
        '📈 TELEMETRY: Lead metadata logged securely in client CRM database.'
      ];
    } else if (project.id === 'nairobi-sole') {
      logs = [
        '👟 STOREFRONT CART: Cart item scan: (Nairobi Sole Sneakers, $120).',
        '💡 CROSS-SELL ENGINE: Locating matching shoe accessories from Nairobi supplier warehouse...',
        '🖼️ CUSTOM COMPONENT: Displaying Sneaker Protective Shield add-on check box.',
        '📈 TRANSACTION RESULT: Total Cart Value raised with 100% higher profit margins.'
      ];
    } else {
      // mnl-advocates
      logs = [
        '⚡ NETWORK DNS RESOLUTION: Flushing redundant host records and resolving nameserver conflicts.',
        '⚙️ HEADLESS SCRAPER: Triggering Next.js content engine blog loop crawler.',
        '📄 SEO INDEX: Mapping meta tag headers covers Kenyan finance bill policy.',
        '🚀 LOAD TIME METRICS: Site speed optimized to 0.42 seconds (sub-second headless standard reached).'
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
    }, 900);
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
              CASE {project.number} / {project.category}
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
              <h1 className="font-serif text-3xl md:text-5xl font-bold tracking-tight leading-tight">
                {project.title}
              </h1>
              <p className="font-serif text-xl italic text-brand-muted leading-relaxed max-w-2xl">
                "{project.subtitle}"
              </p>
            </div>

            {/* Quick Details Stats Block */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 py-6 border-y border-brand-dark/15 font-sans">
              <div>
                <p className="text-[10px] uppercase tracking-widest text-brand-muted font-semibold">Impact Metric</p>
                <p className="text-2xl font-bold text-brand-accent mt-1">{project.metricValue}</p>
                <p className="text-xs text-brand-muted mt-0.5">{project.metricLabel}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-brand-muted font-semibold">Duration</p>
                <p className="text-lg font-bold text-brand-dark mt-1">{project.duration}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-brand-muted font-semibold">Your Role</p>
                <p className="text-lg font-bold text-brand-dark mt-1">{project.role}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-brand-muted font-semibold">Tech Employed</p>
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
                    Workflow Sequence
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
                      Interactive sandbox
                    </span>
                  </div>
                  
                  <h4 className="font-serif text-lg font-bold">
                    Pipeline Simulator
                  </h4>
                  <p className="text-xs text-brand-muted mt-1 leading-relaxed">
                    Adjust inputs and run Zachary's actual automation design to watch it process in real time.
                  </p>
                </div>

                {/* Specific Simulator Form Inputs based on Case */}
                <div className="py-4 border-y border-brand-dark/10 space-y-4">
                  {project.id === 'regwatch' && (
                    <div className="space-y-2">
                      <label className="block text-[11px] uppercase tracking-wider text-brand-muted font-bold">
                        Semantic RAG Compliance Query:
                      </label>
                      <input
                        type="text"
                        disabled={simulationState === 'running'}
                        value={leadMessage}
                        onChange={(e) => setLeadMessage(e.target.value)}
                        className="w-full text-xs p-3 bg-brand-surface border border-brand-dark/20 text-brand-dark focus:outline-none focus:border-brand-accent font-sans sharp-edge"
                        placeholder="Type regulatory query..."
                      />
                      <div className="flex flex-wrap gap-1">
                        <button
                          disabled={simulationState === 'running'}
                          onClick={() => setLeadMessage('What are the critical changes regarding virtual assets in the new Finance Act?')}
                          className="text-[9px] bg-brand-surface border border-brand-dark/15 px-2 py-1 text-brand-muted hover:border-brand-accent transition-colors font-sans font-bold"
                        >
                          Probe: Finance Act
                        </button>
                        <button
                          disabled={simulationState === 'running'}
                          onClick={() => setLeadMessage('List all compliance deadlines for corporate tax filing additions.')}
                          className="text-[9px] bg-brand-surface border border-brand-dark/15 px-2 py-1 text-brand-muted hover:border-brand-accent transition-colors font-sans font-bold"
                        >
                          Probe: Filing Deadlines
                        </button>
                      </div>
                    </div>
                  )}

                  {project.id === 'whatsapp-sme-agents' && (
                    <div className="space-y-2">
                      <label className="block text-[11px] uppercase tracking-wider text-brand-muted font-bold">
                        Simulated WhatsApp Client Message:
                      </label>
                      <textarea
                        disabled={simulationState === 'running'}
                        value={leadMessage}
                        onChange={(e) => setLeadMessage(e.target.value)}
                        className="w-full text-xs p-3 bg-brand-surface border border-brand-dark/20 text-brand-dark placeholder-brand-muted focus:outline-none focus:border-brand-accent font-sans sharp-edge resize-none h-20"
                        placeholder="Type standard whatsapp customer message..."
                      />
                      <div className="flex flex-wrap gap-1">
                        <button
                          disabled={simulationState === 'running'}
                          onClick={() => setLeadMessage("Hi, I'd like to book an Airbnb reservation check-in for Friday please.")}
                          className="text-[9px] bg-brand-surface border border-brand-dark/15 px-2 py-1 text-brand-muted hover:border-brand-accent transition-colors font-sans font-bold"
                        >
                          Booking Inbound
                        </button>
                        <button
                          disabled={simulationState === 'running'}
                          onClick={() => setLeadMessage("Are there shoes in size 42 available for immediate delivery in Nairobi?")}
                          className="text-[9px] bg-brand-surface border border-brand-dark/15 px-2 py-1 text-brand-muted hover:border-brand-accent transition-colors font-sans font-bold"
                        >
                          Inventory Check
                        </button>
                      </div>
                    </div>
                  )}

                  {project.id === 'nairobi-sole' && (
                    <div className="space-y-3">
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs font-mono">
                          <span className="text-brand-muted">Standard Sneaker Price:</span>
                          <span className="text-brand-dark font-bold">${cartValue}</span>
                        </div>
                        <input
                          type="range"
                          min="80"
                          max="250"
                          disabled={simulationState === 'running'}
                          value={cartValue}
                          onChange={(e) => setCartValue(Number(e.target.value))}
                          className="w-full accent-brand-accent cursor-pointer bg-brand-dark/15 h-1"
                        />
                      </div>
                      <div className="p-3 bg-brand-surface border border-brand-dark/10 flex items-center justify-between sharp-edge">
                        <div className="flex items-center gap-2">
                          <ShoppingBag size={14} className="text-brand-accent" />
                          <span className="font-sans text-xs font-bold text-brand-dark">Pair Protective Sneaker Shields ($15)</span>
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
                        <span className="text-brand-muted">Target Host records:</span>
                        <span className="font-bold text-green-700">Healthy & Decoupled (Vite static)</span>
                      </div>
                      <p className="text-xs text-brand-muted leading-relaxed font-sans">
                        Removing redundant host routing, separational Next.js cache tuning and setting up Perplexity citation configurations.
                      </p>
                    </div>
                  )}

                  {/* Simulated terminal logs output screen */}
                  <div className="bg-brand-dark text-white p-4 font-mono text-[10px] space-y-1.5 h-36 overflow-y-auto leading-relaxed border border-brand-dark/20 sharp-edge shadow-inner">
                    {logMessages.length === 0 ? (
                      <span className="text-gray-400">⚡ Awaiting system initialization spark.</span>
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
                        <span>PROCESSING_NODE_STEP_{simulationStep}...</span>
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
                      className="flex-1 inline-flex items-center justify-center gap-1.5 bg-brand-dark text-white border border-brand-dark hover:bg-brand-accent hover:border-brand-accent transition-colors duration-300 font-sans text-xs uppercase tracking-widest py-3 font-semibold sharp-edge cursor-pointer"
                    >
                      <Play size={12} fill="white" />
                      Initialize Pipeline
                    </button>
                  )}
                </div>

                {/* Final simulation results report (statically calculated based on inputs) */}
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
                        {project.id === 'regwatch' && (
                          `RegWatch RAG engine processed query: "${leadMessage}". Located exact document match inside Gazette PDF chunk 24. Generated compliant citations with complete legal citations in 0.8s.`
                        )}
                        {project.id === 'whatsapp-sme-agents' && (
                          `WhatsApp Agent successfully matched client intent, queried timeslots, booked the schedule, and responded dynamically in under 30 seconds.`
                        )}
                        {project.id === 'nairobi-sole' && (
                          `Calculated sneaker purchase metrics. Sneaker cart increased from $${cartValue} to $${cartValue + (selectedUpsell ? 15 : 0)} with protective Sneaker Shield upsell option. Expected order-value performance raised.`
                        )}
                        {project.id === 'mnl-advocates' && (
                          "Headless architecture page speed optimized to 0.42s. Legacy routing conflicts fully resolved. Custom SEO schema is live, ensuring elite Perplexity indexing authority."
                        )}
                      </p>
                    </div>
                  </motion.div>
                )}
              </div>

            </div>

            {/* Custom engineering summary bottom line */}
            <div className="pt-6 border-t border-brand-dark/15 flex flex-col md:flex-row justify-between items-center text-xs text-brand-muted gap-4">
              <p className="flex items-center gap-1">
                <Database size={12} />
                <span>Standard compliance: SHA-256 state hashing & persistent logging active.</span>
              </p>
              <p>
                Crafted in premium architecture system frameworks.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
