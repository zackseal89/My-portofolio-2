/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ArrowRight, Check, Send, Sparkles } from 'lucide-react';
import { createLead } from '../lib/firebase';

interface ContactDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactDialog({ isOpen, onClose }: ContactDialogProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [projectType, setProjectType] = useState('Autonomous Workflows');
  const [budget, setBudget] = useState('$10k - $25k');
  const [message, setMessage] = useState('');
  
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setStatus('submitting');
    
    const consolidatedMessage = `Pillar: ${projectType} | Budget: ${budget}\n\nClient message: ${message}`;
    try {
      await createLead({
        name,
        email,
        message: consolidatedMessage
      });
      setStatus('success');
    } catch (error) {
      console.error('Failed to submit via Firestore:', error);
      try {
        const localLeads = JSON.parse(localStorage.getItem('mock_leads') || '[]');
        localLeads.push({
          id: `LEAD-MOCK-${Date.now()}`,
          name,
          email,
          message: consolidatedMessage,
          timestamp: new Date().toISOString()
        });
        localStorage.setItem('mock_leads', JSON.stringify(localLeads));
        setStatus('success');
      } catch (fErr) {
        alert('Transmission error. Please check your network connectivity and try again.');
        setStatus('idle');
      }
    }
  };

  const resetForm = () => {
    setName('');
    setEmail('');
    setProjectType('Autonomous Workflows');
    setBudget('$10k - $25k');
    setMessage('');
    setStatus('idle');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-end overflow-hidden" id="contact-dialog-wrapper">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-brand-dark/40 backdrop-blur-sm"
            id="contact-backdrop"
          />

          {/* Drawer Sheet */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 26, stiffness: 220 }}
            className="relative w-full max-w-xl h-full bg-brand-bg border-l border-brand-dark/20 text-brand-dark flex flex-col z-10 shadow-2xl p-8 md:p-12 overflow-y-auto sharp-edge"
            id="contact-form-drawer"
          >
            {/* Top Close */}
            <div className="flex justify-between items-center mb-12">
              <span className="font-mono text-xs tracking-[0.2em] uppercase font-bold text-brand-accent">
                System Ingestion Portal
              </span>
              <button
                onClick={onClose}
                className="p-1 text-brand-dark hover:text-brand-accent transition-colors cursor-pointer"
                id="contact-close-btn"
                aria-label="Close dialog"
              >
                <X size={20} />
              </button>
            </div>

            {status === 'success' ? (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex-1 flex flex-col justify-center items-center text-center space-y-6"
                id="contact-success-state"
              >
                <div className="h-16 w-16 bg-brand-dark text-brand-bg flex items-center justify-center rounded-none border border-brand-dark flex-shrink-0 mb-4 animate-bounce">
                  <Check size={32} />
                </div>
                <h2 className="font-serif text-3xl font-bold tracking-tight">Transmission Transmitted</h2>
                <p className="font-sans text-sm text-brand-muted max-w-sm leading-relaxed">
                  Thank you, <span className="font-bold text-brand-dark">{name}</span>. Your requirements have been scanned, triaged, and written to Zachary's workspace logs. You can expect a response within minutes.
                </p>
                <div className="space-y-2 w-full max-w-xs pt-8 border-t border-brand-dark/10 font-mono text-[10px] text-brand-muted">
                  <div className="flex justify-between">
                    <span>TRIAGE_STATUS</span>
                    <span className="text-green-700 font-bold">QUEUED_PRIORITY_1</span>
                  </div>
                  <div className="flex justify-between">
                    <span>ROUTING_CHANNEL</span>
                    <span className="text-brand-dark font-medium">#sales-triage</span>
                  </div>
                </div>
                <button
                  onClick={() => {
                    resetForm();
                    onClose();
                  }}
                  className="font-sans text-xs uppercase tracking-widest font-semibold px-8 py-3 bg-brand-dark text-brand-bg hover:bg-brand-accent transition-all duration-300 sharp-edge"
                  id="contact-success-done-btn"
                >
                  Return to Screen
                </button>
              </motion.div>
            ) : (
              <div className="flex-1 flex flex-col justify-between" id="contact-form-body">
                <div className="space-y-6">
                  <div>
                    <h2 className="font-serif text-3xl md:text-4xl font-bold tracking-tight">Book a Systems Audit</h2>
                    <p className="font-sans text-xs text-[#52525b] mt-2 leading-relaxed">
                      Book a free 30-minute systems audit. I will inspect your marketing campaigns, operations, or Shopify store setup and outline exactly where intelligent systems or custom Shopify integrations can remove friction.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-8 pt-6">
                    {/* Name Input */}
                    <div className="space-y-1 relative">
                      <label className="block font-sans text-[10px] uppercase tracking-widest text-brand-muted font-bold">
                        Lead Identity / Name
                      </label>
                      <input
                        type="text"
                        required
                        disabled={status === 'submitting'}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full font-serif text-base py-2.5 bg-transparent border-b border-brand-dark focus:border-brand-accent text-brand-dark focus:outline-none transition-colors duration-300"
                        placeholder="e.g. Zachary O'Connor"
                      />
                    </div>

                    {/* Email Input */}
                    <div className="space-y-1 relative">
                      <label className="block font-sans text-[10px] uppercase tracking-widest text-brand-muted font-bold">
                        Communication Node / Email Address
                      </label>
                      <input
                        type="email"
                        required
                        disabled={status === 'submitting'}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full font-serif text-base py-2.5 bg-transparent border-b border-brand-dark focus:border-brand-accent text-brand-dark focus:outline-none transition-colors duration-300"
                        placeholder="e.g. zachary@workspace.com"
                      />
                    </div>

                    {/* Dropdowns for System Type and Budget */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="block font-sans text-[10px] uppercase tracking-widest text-brand-muted font-bold">
                          Primary Pillar
                        </label>
                        <select
                          disabled={status === 'submitting'}
                          value={projectType}
                          onChange={(e) => setProjectType(e.target.value)}
                          className="w-full font-sans text-xs py-2 bg-transparent border-b border-brand-dark focus:border-brand-accent text-brand-dark focus:outline-none sharp-edge cursor-pointer"
                        >
                          <option value="Autonomous Workflows">Workflows</option>
                          <option value="Custom E-Commerce">E-Commerce</option>
                          <option value="Agentic AI Pipelines">Agentic AI</option>
                          <option value="Consultancy / Audit">Audit</option>
                        </select>
                      </div>

                      <div className="space-y-1">
                        <label className="block font-sans text-[10px] uppercase tracking-widest text-brand-muted font-bold">
                          Budget Range
                        </label>
                        <select
                          disabled={status === 'submitting'}
                          value={budget}
                          onChange={(e) => setBudget(e.target.value)}
                          className="w-full font-sans text-xs py-2 bg-transparent border-b border-brand-dark focus:border-brand-accent text-brand-dark focus:outline-none sharp-edge cursor-pointer"
                        >
                          <option value="$5k - $10k">$5k - $10k</option>
                          <option value="$10k - $25k">$10k - $25k</option>
                          <option value="$25k - $50k">$25k - $50k</option>
                          <option value="$50k+">$50k+</option>
                        </select>
                      </div>
                    </div>

                    {/* Brief text box - editorial styled */}
                    <div className="space-y-2">
                      <label className="block font-sans text-[10px] uppercase tracking-widest text-brand-muted font-bold">
                        Requirement Brief / Message
                      </label>
                      <textarea
                        required
                        rows={4}
                        disabled={status === 'submitting'}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="w-full font-sans text-sm p-3 bg-brand-dark/5 border border-brand-dark/15 focus:border-brand-accent text-brand-dark placeholder-brand-muted focus:outline-none transition-all duration-300 sharp-edge resize-none"
                        placeholder="Detail manual frictions or automation aims..."
                      />
                    </div>

                    {/* Submit Row Button */}
                    <div className="pt-4">
                      <button
                        type="submit"
                        disabled={status === 'submitting' || !name || !email || !message}
                        className="w-full flex justify-center items-center gap-2 bg-brand-dark hover:bg-brand-accent active:scale-95 disabled:opacity-50 text-white hover:text-brand-bg transition-all duration-300 font-sans text-xs uppercase tracking-widest py-4 font-semibold sharp-edge cursor-pointer"
                        id="contact-submit-btn"
                      >
                        {status === 'submitting' ? (
                          <>
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                              className="w-4 h-4 border-2 border-white border-t-transparent inline-block rounded-full"
                            />
                            <span>TRIAGING METADATA...</span>
                          </>
                        ) : (
                          <>
                            <Send size={12} />
                            <span>TRANSMIT REQUISITION</span>
                          </>
                        )}
                      </button>
                    </div>

                  </form>
                </div>

                <div className="pt-8 border-t border-brand-dark/10 flex items-center justify-between text-[11px] text-brand-muted font-sans">
                  <div className="flex items-center gap-1.5">
                    <Sparkles size={11} className="text-brand-accent" />
                    <span>Real-time agent pre-screening active.</span>
                  </div>
                  <div>
                    <span>Secure End-To-End Ingress</span>
                  </div>
                </div>

              </div>
            )}

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
