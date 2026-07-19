/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { PenLine, ArrowUpRight } from 'lucide-react';
import { loadWritingPieces } from '../lib/writing';

const TYPE_STYLES: Record<string, string> = {
  Essay: 'bg-brand-accent/10 text-brand-dark border-brand-accent/30',
  Article: 'bg-brand-dark/5 text-brand-muted border-brand-dark/10',
  Book: 'bg-green-50 text-green-800 border-green-200',
};

export default function WritingPage() {
  const pieces = loadWritingPieces();

  return (
    <section
      className="py-32 md:py-40 px-6 md:px-12 w-full max-w-7xl mx-auto"
      id="writing"
    >
      {/* Header block */}
      <div className="grid grid-cols-12 gap-8 mb-16">
        <div className="col-span-12 lg:col-span-9">
          <span className="font-sans text-xs uppercase tracking-[0.2em] font-extrabold text-brand-accent block mb-3">
            PUBLISHED WORK
          </span>
          <h2 className="font-serif text-3xl md:text-5xl font-bold tracking-tight text-brand-dark">
            Writing
          </h2>
          <p className="font-sans text-sm md:text-base text-brand-muted mt-4 max-w-2xl leading-relaxed">
            I write essays under the name Shash: strict three-beat form,
            lowercase, no em dashes, Nairobi-specific, published weekly as
            Minor Testimonies. It's a different muscle from shipping RLS
            policies or sizing models, and I've stopped pretending I only
            need one. This page is the unedited record of both.
          </p>
        </div>
      </div>

      {pieces.length === 0 ? (
        <div className="border border-dashed border-brand-dark/20 bg-brand-surface/40 sharp-edge p-12 text-center">
          <PenLine className="mx-auto text-brand-accent mb-4" size={22} />
          <p className="font-mono text-[10px] uppercase tracking-widest text-brand-muted mb-2">
            EMPTY_SET // First piece not yet committed
          </p>
          <p className="font-sans text-sm text-brand-muted max-w-md mx-auto">
            Nothing published here yet. New pieces are added as markdown files
            and go live on the next deploy, no admin panel required.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {pieces.map((piece, idx) => {
            const Wrapper = piece.url ? 'a' : 'div';
            return (
              <motion.div
                key={piece.slug}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-10% 0px' }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                <Wrapper
                  {...(piece.url ? { href: piece.url, target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="flex flex-col justify-between border border-brand-dark/15 bg-brand-surface hover:border-brand-dark transition-all duration-300 p-6 sharp-edge shadow-sm h-full group"
                  id={`writing-card-${piece.slug}`}
                >
                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <span className="font-serif text-xl font-bold text-brand-accent">
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                      <span className={`font-mono text-[8px] uppercase tracking-widest px-2 py-0.5 border sharp-edge font-bold ${TYPE_STYLES[piece.type]}`}>
                        {piece.type}
                      </span>
                    </div>

                    <h3 className="font-serif text-lg font-bold text-brand-dark leading-snug mb-1 group-hover:text-brand-accent transition-colors">
                      {piece.title}
                    </h3>
                    <p className="font-sans text-xs text-brand-muted mb-4">
                      {[piece.venue, piece.date].filter(Boolean).join(' · ')}
                    </p>

                    <p className="font-serif text-sm italic text-[#3f3f3f] leading-relaxed border-t border-brand-dark/10 pt-4">
                      {piece.blurb}
                    </p>
                  </div>

                  {piece.url && (
                    <div className="flex items-center gap-1 mt-6 pt-4 border-t border-brand-dark/10 font-sans text-[10px] uppercase tracking-wider font-extrabold text-brand-accent">
                      <span>Read it</span>
                      <ArrowUpRight size={12} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                  )}
                </Wrapper>
              </motion.div>
            );
          })}
        </div>
      )}
    </section>
  );
}
