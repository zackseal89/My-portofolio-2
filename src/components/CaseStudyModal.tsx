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

    if (project.id === 'speed-to-lead') {
      const logs = [
        '🚀 INTAKE: Form submission detected.',
        '🧠 CLASSIFICATION: Querying Gemini API parser...',
        '📊 ASSESSMENT: Category scored as [High Intent Sales / Custom Shopify].',
        '✍️ GEN_AI: Crafting personalized outreach reply...',
        '🔔 ROUTING: Notifying team via high-priority Slack channel #sales-triage.'
      ];
      
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
    } else if (project.id === 'aov-optimization') {
      const logs = [
        '🛒 CART: Inspecting cart contents (Premium Linen Shirt, $120).',
        '💡 RECOMMENDATION: Querying complimentary accessories...',
        '🖼️ STYLING: Selecting "Handcrafted Leather Belt" matching the editorial tone.',
        '💰 DYNAMIC OFFER: Micro-upsell card rendered in payment section.',
        '📈 METRICS: AOV raised dynamically to $185.'
      ];
      
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
    } else {
      // agentic-pipelines
      const logs = [
        '🔍 MONITOR: Inventory scan completed. Alert Level [LOW-STOCK].',
        '🌐 SEARCH: Searching wholesale supplier databases for product "Matte Obsidian Finish"...',
        '🧾 COMPILE: Calculated low price option from Acme Corp ($14.20/unit).',
        '📝 COMPOSE: Generated purchase email draft in Gmail with attached PDF statement.',
        '📬 GATEWAY: Awaiting operator single-click approval to write payment record.'
      ];
      
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
    }
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
                  {project.id === 'speed-to-lead' && (
                    <div className="space-y-2">
                      <label className="block text-[11px] uppercase tracking-wider text-brand-muted font-bold">
                        Simulated Inbound Message:
                      </label>
                      <textarea
                        disabled={simulationState === 'running'}
                        value={leadMessage}
                        onChange={(e) => setLeadMessage(e.target.value)}
                        className="w-full text-xs p-3 bg-brand-surface border border-brand-dark/20 text-brand-dark placeholder-brand-muted focus:outline-none focus:border-brand-accent font-sans sharp-edge resize-none h-24"
                        placeholder="Type lead message..."
                      />
                      <div className="flex flex-wrap gap-1">
                        <button
                          disabled={simulationState === 'running'}
                          onClick={() => setLeadMessage('Hi! Looking to optimize our e-commerce checkout flow. We generate $500k in monthly recurring revenue but our cart abandonment is high.')}
                          className="text-[9px] bg-brand-surface border border-brand-dark/15 px-2 py-1 text-brand-muted hover:border-brand-accent transition-colors font-sans"
                        >
                          Preset 1: Luxury Apparel
                        </button>
                        <button
                          disabled={simulationState === 'running'}
                          onClick={() => setLeadMessage('Spam message alert: Cryptocurrency token launch event promotion details attached inside.')}
                          className="text-[9px] bg-brand-surface border border-brand-dark/15 px-2 py-1 text-brand-muted hover:border-brand-accent transition-colors font-sans"
                        >
                          Preset 2: Automated Spam
                        </button>
                      </div>
                    </div>
                  )}

                  {project.id === 'aov-optimization' && (
                    <div className="space-y-3">
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs font-mono">
                          <span className="text-brand-muted">Current Cart Basket Value:</span>
                          <span className="text-brand-dark font-bold">${cartValue}</span>
                        </div>
                        <input
                          type="range"
                          min="30"
                          max="400"
                          disabled={simulationState === 'running'}
                          value={cartValue}
                          onChange={(e) => setCartValue(Number(e.target.value))}
                          className="w-full accent-brand-accent cursor-pointer bg-brand-dark/15 h-1"
                        />
                      </div>
                      <div className="p-3 bg-brand-surface border border-brand-dark/10 flex items-center justify-between sharp-edge">
                        <div className="flex items-center gap-2">
                          <ShoppingBag size={14} className="text-brand-accent" />
                          <span className="font-sans text-xs font-bold text-brand-dark">Pairing Leather Accessories</span>
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

                  {project.id === 'agentic-pipelines' && (
                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-brand-muted">Obsidian Finish Box Stock:</span>
                        <span className={`font-bold ${supplyStock < 10 ? 'text-red-600' : 'text-green-700'}`}>
                          {supplyStock} Units {supplyStock < 10 && '(Auto-Trigger Alert!)'}
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <button
                          disabled={simulationState === 'running'}
                          onClick={() => setSupplyStock(prev => Math.max(0, prev - 3))}
                          className="flex-1 text-center py-2 bg-brand-surface border border-brand-dark/15 hover:border-red-500 font-mono text-xs text-brand-muted hover:text-brand-dark transition-colors"
                        >
                          - Use 3 Units
                        </button>
                        <button
                          disabled={simulationState === 'running'}
                          onClick={() => setSupplyStock(15)}
                          className="flex-1 text-center py-2 bg-brand-surface border border-brand-dark/15 hover:border-brand-accent font-mono text-xs text-brand-muted hover:text-brand-dark transition-colors"
                        >
                          Restock to 15
                        </button>
                      </div>
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
                      <p className="text-brand-muted mt-1 leading-relaxed">
                        {project.id === 'speed-to-lead' && (
                          leadMessage.toLowerCase().includes('crypto') || leadMessage.toLowerCase().includes('spam')
                            ? 'Lead marked as low priority spam. Archive command triggered automatically, workflow stopped with 100% precision score.'
                            : 'Personalized lead briefing compiled and pushed to #sales-triage with drafted outreach template. Client pipeline response validated.'
                        )}
                        {project.id === 'aov-optimization' && (
                          `Calculated transaction summary. Cart increased from $${cartValue} to $${cartValue + (selectedUpsell ? 65 : 0)} with frictionless accessory add-on. Expected AOV increase of 18.5%.`
                        )}
                        {project.id === 'agentic-pipelines' && (
                          supplyStock < 10 
                            ? 'Inventory dip below threshold triggered wholesale API scanning. Alternate drafts written to purchaser box and recorded in DB logs.'
                            : 'Inventory metrics verified stable. Watcher loops continue scanning at set chronological cron parameters.'
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
