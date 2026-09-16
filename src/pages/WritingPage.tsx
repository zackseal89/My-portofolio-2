/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { PenLine, ArrowRight, ExternalLink } from 'lucide-react';
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
            Writing &amp; Technical Essays
          </h2>
          <p className="font-sans text-sm md:text-base text-brand-muted mt-4 max-w-2xl leading-relaxed">
            Technical architecture notes, production agent blueprints, unit economics diagnostics, and essays on software engineering under extreme ambiguity. Every piece is written in local Markdown and published directly via Git commit.
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
            return (
              <motion.div
                key={piece.slug}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-10% 0px' }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                <Link
                  to={`/writing/${piece.slug}`}
                  className="flex flex-col justify-between border border-brand-dark/15 bg-brand-surface hover:border-brand-dark transition-all duration-300 p-6 sharp-edge shadow-sm h-full group select-none cursor-pointer"
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

                    <p className="font-sans text-xs text-brand-muted leading-relaxed border-t border-brand-dark/10 pt-4 line-clamp-3">
                      {piece.blurb}
                    </p>
                  </div>

                  <div className="flex items-center justify-between mt-6 pt-4 border-t border-brand-dark/10 font-mono text-[10px] uppercase tracking-wider font-bold text-brand-accent">
                    <span className="flex items-center gap-1">
                      <span>Read Article</span>
                      <ArrowRight size={11} className="group-hover:translate-x-1 transition-transform" />
                    </span>
                    {piece.url && (
                      <span
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          window.open(piece.url, '_blank', 'noopener,noreferrer');
                        }}
                        className="text-brand-muted hover:text-brand-dark flex items-center gap-1 transition-colors px-1.5 py-0.5 border border-brand-dark/10 bg-brand-bg sharp-edge"
                        title="View on original venue"
                      >
                        <span>{piece.venue?.includes('LinkedIn') ? 'LinkedIn' : 'External'}</span>
                        <ExternalLink size={9} />
                      </span>
                    )}
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      )}
    </section>
  );
}
