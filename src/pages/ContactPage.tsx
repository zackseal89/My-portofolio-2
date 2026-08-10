/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, FormEvent } from 'react';
import { motion } from 'motion/react';
import { Check, Mail, Linkedin, Compass, Github, Terminal } from 'lucide-react';
import { sendLeadViaMailto } from '../lib/contact';

export default function ContactPage() {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [status, setStatus] = useState<'idle' | 'analyzing' | 'complete'>('idle');
  const [activeStepIndex, setActiveStepIndex] = useState<number>(-1);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setStatus('analyzing');
    setActiveStepIndex(0);

    const intervals = [700, 1600, 2500, 3400];
    intervals.forEach((delay, idx) => {
      setTimeout(() => {
        setActiveStepIndex(idx + 1);
        if (idx === intervals.length - 1) {
          setStatus('complete');
          sendLeadViaMailto({ name, email, message });
        }
      }, delay);
    });
  };

  return (
    <section
      className="py-32 md:py-40 px-6 md:px-12 w-full max-w-7xl mx-auto"
      id="contact"
    >
      <div className="grid grid-cols-12 gap-y-12 lg:gap-12">

        {/* Form Column */}
        <div className="col-span-12 lg:col-span-7 space-y-6">
          <div className="space-y-3">
            <span className="font-sans text-xs uppercase tracking-[0.2em] font-extrabold text-brand-accent block">
              COMMUNICATION INGRESS // SECURE ENVELOPE
            </span>
            <h2 className="font-serif text-3xl md:text-5xl font-bold tracking-tight text-brand-dark">
              Get in Touch
            </h2>
            <p className="font-sans text-sm text-brand-muted max-w-lg">
              Submit your architectural briefs or integration design ideas. This form opens your own email client and sends it straight to Zachary. No database sits between you and him.
            </p>
          </div>

          {status === 'complete' ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-8 border border-brand-dark bg-brand-surface sharp-edge flex flex-col items-center justify-center text-center space-y-4"
              id="contact-form-success"
            >
              <div className="h-12 w-12 rounded-full border border-brand-dark flex items-center justify-center bg-brand-bg text-brand-dark animate-pulse">
                <Check className="text-brand-dark" size={24} />
              </div>
              <h3 className="font-serif text-xl font-bold text-brand-dark uppercase tracking-tight">
                Ingress Transmission Dispatched
              </h3>
              <p className="font-sans text-xs text-brand-muted max-w-md">
                Thank you, <strong className="text-brand-dark">{name}</strong>. Your email client should have opened with the message pre-filled. Send it from there to complete the loop.
              </p>
              <button
                onClick={() => {
                  setStatus('idle');
                  setName('');
                  setEmail('');
                  setMessage('');
                  setActiveStepIndex(-1);
                }}
                className="font-sans text-[10px] uppercase tracking-widest font-bold border border-brand-dark px-6 py-2 hover:bg-brand-dark hover:text-brand-bg transition-colors cursor-pointer sharp-edge"
              >
                Send Another Transmission
              </button>
            </motion.div>
          ) : status === 'analyzing' ? (
            <div className="p-8 border border-brand-dark bg-[#0B0C0E] text-[#a3a3a3] font-mono text-xs space-y-4 sharp-edge" id="contact-form-loading">
              <div className="flex items-center justify-between border-b border-neutral-800 pb-2.5">
                <span className="text-white flex items-center gap-1.5 font-bold uppercase text-[9px] tracking-wider">
                  <Terminal size={11} className="text-mono animate-pulse text-brand-bg" />
                  Zachary Node Router // Ingress Pipeline
                </span>
                <span className="text-[10px] uppercase text-[#a3a3a3]">[PROCESSING]</span>
              </div>

              <div className="space-y-2">
                <p className="text-green-500 font-bold">&gt; Initializing semantic analysis parsing script...</p>

                {activeStepIndex >= 0 && (
                  <p className="text-white animate-pulse">&gt; 📤 Connection established. Ingesting packet payload...</p>
                )}
                {activeStepIndex >= 1 && (
                  <p className="text-yellow-400">&gt; Parsing sender parameter details: [Name: "{name}"]</p>
                )}
                {activeStepIndex >= 2 && (
                  <p className="text-blue-400">&gt; Preparing local mailto: handoff for: "{message.slice(0, 30)}..."</p>
                )}
                {activeStepIndex >= 3 && (
                  <div className="p-3 border border-neutral-800 bg-neutral-900 space-y-1">
                    <p className="text-green-400 font-bold">&gt; STATUS: HANDED TO YOUR EMAIL CLIENT</p>
                    <p className="text-[11px]">Category: Dynamic Integration Construct</p>
                    <p className="text-[11px]">Routing Vector: mailto:zacharyongeri121@gmail.com</p>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2 pt-2 text-[#666]">
                <span className="animate-spin h-3.5 w-3.5 border-2 border-brand-bg border-t-transparent rounded-full" />
                <span className="text-[10px] uppercase tracking-wide">No server involved. Just theatre for a mailto: link.</span>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5" id="onpage-contact-form">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="form-name" className="font-mono text-[9px] uppercase tracking-widest text-brand-muted font-bold">
                    Identifier / Name
                  </label>
                  <input
                    type="text"
                    id="form-name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Liam O'Connor"
                    className="p-3 bg-brand-surface border border-brand-dark/15 hover:border-brand-dark focus:border-brand-dark focus:outline-none focus:ring-1 focus:ring-brand-dark transition-colors text-xs font-sans sharp-edge text-brand-dark"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="form-email" className="font-mono text-[9px] uppercase tracking-widest text-brand-muted font-bold">
                    Direct Email Address
                  </label>
                  <input
                    type="email"
                    id="form-email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="email@organization.co"
                    className="p-3 bg-brand-surface border border-brand-dark/15 hover:border-brand-dark focus:border-brand-dark focus:outline-none focus:ring-1 focus:ring-brand-dark transition-colors text-xs font-sans sharp-edge text-brand-dark"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="form-message" className="font-mono text-[9px] uppercase tracking-widest text-brand-muted font-bold">
                  Integration Brief / Message
                </label>
                <textarea
                  id="form-message"
                  required
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Describe your workflow challenges, custom e-commerce requirements, or API integration specifications..."
                  className="p-3 bg-brand-surface border border-brand-dark/15 hover:border-brand-dark focus:border-brand-dark focus:outline-none focus:ring-1 focus:ring-brand-dark transition-colors text-xs font-sans sharp-edge text-brand-dark resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-brand-dark text-brand-bg border border-brand-dark hover:bg-brand-accent hover:border-brand-accent py-4 font-sans text-xs uppercase tracking-[0.15em] font-extrabold transition-all duration-300 sharp-edge cursor-pointer"
                id="onpage-form-submit-btn"
              >
                Commit Transmission Payload &rarr;
              </button>
            </form>
          )}
        </div>

        {/* Alternates and Networks Column */}
        <div className="col-span-12 lg:col-span-5 flex flex-col justify-between">
          <div className="border border-brand-dark p-6 md:p-8 bg-brand-surface sharp-edge relative space-y-8">
            <div>
              <span className="font-mono text-[9px] uppercase tracking-widest text-brand-muted block mb-3">
                ALTERNATE COMMS DIRECTORY
              </span>
              <h3 className="font-serif text-2xl font-bold text-brand-dark uppercase tracking-tight mb-4">
                Connection Channels
              </h3>
              <p className="font-sans text-xs text-brand-muted leading-relaxed">
                Should you prefer utilizing standard end-to-end mailing clients, direct correspondence channels remain fully active:
              </p>
            </div>

            <a
              href="mailto:zacharyongeri121@gmail.com"
              className="flex items-center gap-4 p-4 border border-brand-dark/10 hover:border-brand-dark bg-brand-bg/30 hover:bg-brand-surface transition-all duration-300 sharp-edge"
              id="direct-email-card"
            >
              <div className="h-10 w-10 border border-brand-dark/10 rounded-full flex items-center justify-center bg-brand-surface text-brand-accent">
                <Mail size={16} />
              </div>
              <div>
                <span className="font-mono text-[8px] uppercase tracking-widest text-brand-muted block leading-none">PRIMARY MAIL</span>
                <span className="font-sans text-sm font-bold text-brand-dark hover:underline underline-offset-4">zacharyongeri121@gmail.com</span>
              </div>
            </a>

            <div className="space-y-4">
              <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-brand-muted block">
                PROFESSIONAL PUBLIC DIRECTORIES
              </span>

              <div className="grid grid-cols-2 gap-3">
                <a
                  href="https://linkedin.com/in/zachary-ongeri-253593231"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 border border-brand-dark/10 hover:border-brand-dark bg-brand-surface hover:bg-brand-dark hover:text-brand-bg flex flex-col items-center justify-center text-center gap-2 transition-all duration-300 sharp-edge group"
                  id="linkedin-profile-link"
                >
                  <Linkedin size={16} className="text-brand-accent group-hover:text-brand-bg transition-colors" />
                  <span className="font-sans text-[10px] uppercase tracking-wide font-black">LinkedIn</span>
                </a>
                <a
                  href="https://github.com/zacharyongeri"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 border border-brand-dark/10 hover:border-brand-dark bg-brand-surface hover:bg-brand-dark hover:text-brand-bg flex flex-col items-center justify-center text-center gap-2 transition-all duration-300 sharp-edge group"
                  id="github-profile-link"
                >
                  <Github size={16} className="text-brand-accent group-hover:text-brand-bg transition-colors" />
                  <span className="font-sans text-[10px] uppercase tracking-wide font-black">GitHub</span>
                </a>
              </div>
            </div>

            <div className="pt-4 border-t border-brand-dark/10 flex items-center justify-between text-[10px] font-mono text-brand-muted">
              <span>NO_BACKEND: CONFIRMED</span>
              <span>MAIL_ROUTE: DIRECT</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
