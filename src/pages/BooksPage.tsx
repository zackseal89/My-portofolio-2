/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, Search, Sparkles } from 'lucide-react';
import { BOOKS } from '../data';
import { Book } from '../types';

type BookCategoryFilter = 'All' | 'Systems & Cybernetics' | 'Philosophy & Mind' | 'Risk & Markets' | 'Software Craft';

const CATEGORIES: BookCategoryFilter[] = [
  'All',
  'Systems & Cybernetics',
  'Philosophy & Mind',
  'Risk & Markets',
  'Software Craft'
];

export default function BooksPage() {
  const [selectedCategory, setSelectedCategory] = useState<BookCategoryFilter>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredBooks = BOOKS.filter((book: Book) => {
    const matchesCategory = selectedCategory === 'All' || book.category === selectedCategory;
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      book.title.toLowerCase().includes(query) ||
      book.author.toLowerCase().includes(query) ||
      book.verdict.toLowerCase().includes(query) ||
      book.impactOnCode.toLowerCase().includes(query) ||
      book.keyAxiom.toLowerCase().includes(query);
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="w-full flex flex-col items-center">
      {/* HEADER SECTION */}
      <section className="pt-36 md:pt-44 pb-16 px-6 md:px-12 w-full max-w-7xl mx-auto border-b border-brand-dark/15">
        <div className="grid grid-cols-12 gap-8 items-end">
          <div className="col-span-12 lg:col-span-8 space-y-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 border border-brand-accent/30 bg-brand-accent/5 px-3 py-1.5 sharp-edge"
            >
              <BookOpen size={13} className="text-brand-accent" />
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] font-bold text-brand-accent">
                WORKING CANON // INTELLECTUAL BEDROCK
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-serif text-3xl sm:text-4xl md:text-6xl font-bold text-brand-dark leading-[1.12] tracking-tighter"
            >
              The Reading Canon
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="font-sans text-sm sm:text-base text-brand-muted leading-relaxed max-w-2xl"
            >
              A working notebook, not an ornamental syllabus. Unfiltered verdicts on foundational texts across cybernetics, philosophy of mind, market fat tails, and software complexity that directly dictate how I architect software.
            </motion.p>
          </div>

          {/* Quick telemetry stats block */}
          <div className="col-span-12 lg:col-span-4 flex lg:justify-end">
            <div className="w-full lg:w-auto p-4 border border-brand-dark/15 bg-brand-surface sharp-edge font-mono text-xs space-y-2">
              <div className="flex justify-between gap-6 border-b border-brand-dark/10 pb-2">
                <span className="text-brand-muted uppercase text-[9px] tracking-wider">CANON COUNT</span>
                <span className="font-bold text-brand-dark">{BOOKS.length} Selected Works</span>
              </div>
              <div className="flex justify-between gap-6 border-b border-brand-dark/10 pb-2">
                <span className="text-brand-muted uppercase text-[9px] tracking-wider">DISCIPLINES</span>
                <span className="font-bold text-brand-dark">4 Fundamental Domains</span>
              </div>
              <div className="flex justify-between gap-6">
                <span className="text-brand-muted uppercase text-[9px] tracking-wider">PHILOSOPHY</span>
                <span className="font-bold text-brand-accent">First Principles</span>
              </div>
            </div>
          </div>
        </div>

        {/* EDITORIAL CANON VISUAL HERO */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="mt-10 border border-brand-dark/15 bg-brand-surface p-3 sharp-edge shadow-sm space-y-2"
        >
          <div className="relative aspect-video md:aspect-[21/9] w-full overflow-hidden bg-brand-dark sharp-edge border border-brand-dark/10">
            <img
              src="/assets/images/reading-canon-banner.jpg"
              alt="The Canon // Intellectual Bedrock: Systems Engineering, Cybernetics, Antifragile, Complexity"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-3 right-3 bg-brand-dark/90 text-brand-bg px-2.5 py-1 font-mono text-[9px] uppercase tracking-widest border border-brand-accent/40 sharp-edge">
              FIGURE 01 // INTELLECTUAL_BEDROCK_TOPOLOGY
            </div>
          </div>
          <div className="flex flex-wrap justify-between items-center px-2 py-1 font-mono text-[10px] text-brand-muted uppercase">
            <span>Systems Thinking &bull; Cybernetics &bull; Fat-Tail Probability &bull; Software Complexity</span>
            <span className="text-brand-accent font-bold">&ldquo;Feedback is the means by which systems learn.&rdquo;</span>
          </div>
        </motion.div>

        {/* SEARCH & CATEGORY FILTER BAR */}
        <div className="mt-12 pt-8 border-t border-brand-dark/10 flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`font-mono text-xs uppercase tracking-wider px-3.5 py-2 transition-all sharp-edge cursor-pointer border ${
                  selectedCategory === cat
                    ? 'bg-brand-dark text-brand-bg border-brand-dark font-bold'
                    : 'bg-brand-surface text-brand-muted border-brand-dark/15 hover:border-brand-dark hover:text-brand-dark'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative min-w-[260px] md:w-72">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-muted pointer-events-none" />
            <input
              id="book-search-input"
              name="bookSearch"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search books, authors, axioms..."
              className="w-full pl-9 pr-3 py-2 bg-brand-surface border border-brand-dark/15 text-brand-dark text-xs font-sans sharp-edge focus:border-brand-accent focus:outline-none placeholder:text-brand-muted/60"
            />
          </div>
        </div>
      </section>

      {/* BOOKS GRID */}
      <section className="py-16 md:py-24 px-6 md:px-12 w-full max-w-7xl mx-auto">
        {filteredBooks.length === 0 ? (
          <div className="p-12 text-center border border-brand-dark/15 bg-brand-surface sharp-edge space-y-3">
            <p className="font-serif text-lg text-brand-dark">No entries matched your criteria.</p>
            <p className="font-sans text-xs text-brand-muted">Try switching categories or clearing search keywords.</p>
            <button
              onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
              className="mt-2 inline-block px-4 py-2 border border-brand-dark text-xs font-mono uppercase tracking-wider text-brand-dark hover:bg-brand-dark hover:text-brand-bg sharp-edge transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredBooks.map((book: Book, index: number) => (
                <motion.div
                  key={book.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.4, delay: index * 0.04 }}
                  className="p-8 border border-brand-dark/15 bg-brand-surface hover:border-brand-accent transition-all duration-300 sharp-edge flex flex-col justify-between group space-y-6"
                >
                  <div className="space-y-4">
                    {/* Top Metadata Badges */}
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-brand-dark/10 pb-3">
                      <span className="font-mono text-[9px] uppercase tracking-widest px-2 py-0.5 border border-brand-accent/30 bg-brand-accent/5 text-brand-accent font-bold sharp-edge">
                        {book.category}
                      </span>
                      <div className="flex items-center gap-2 font-mono text-[9px] text-brand-muted">
                        <span>{book.year}</span>
                        <span>•</span>
                        <span className="uppercase font-bold text-brand-dark">{book.status}</span>
                      </div>
                    </div>

                    {/* Book Title & Author */}
                    <div>
                      <h2 className="font-serif text-2xl font-bold text-brand-dark group-hover:text-brand-accent transition-colors leading-tight">
                        {book.title}
                      </h2>
                      <p className="font-mono text-xs text-brand-muted uppercase tracking-wider mt-1 font-semibold">
                        by {book.author}
                      </p>
                    </div>

                    {/* Key Axiom Quote Callout */}
                    <div className="p-4 bg-brand-bg/60 border-l-2 border-brand-accent sharp-edge space-y-1">
                      <span className="font-mono text-[8px] uppercase tracking-[0.2em] font-extrabold text-brand-muted block">
                        OPERATING AXIOM
                      </span>
                      <p className="font-serif text-xs md:text-sm text-brand-dark italic leading-relaxed">
                        "{book.keyAxiom}"
                      </p>
                    </div>

                    {/* The Raw Verdict */}
                    <div className="space-y-1 pt-1">
                      <span className="font-mono text-[9px] uppercase tracking-wider font-extrabold text-brand-muted block">
                        THE UNFILTERED VERDICT
                      </span>
                      <p className="font-sans text-xs text-brand-dark leading-relaxed">
                        {book.verdict}
                      </p>
                    </div>
                  </div>

                  {/* Impact On Code Footer */}
                  <div className="pt-4 border-t border-brand-dark/10 space-y-1">
                    <span className="font-mono text-[9px] uppercase tracking-wider font-extrabold text-brand-accent block flex items-center gap-1">
                      <Sparkles size={10} />
                      DIRECT ARCHITECTURAL IMPACT
                    </span>
                    <p className="font-sans text-xs text-brand-muted leading-relaxed">
                      {book.impactOnCode}
                    </p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </section>

      {/* FOOTER CALLOUT: The Epistemology of Software */}
      <section className="py-16 px-6 md:px-12 w-full max-w-7xl mx-auto border-t border-brand-dark/15">
        <div className="p-8 md:p-12 border border-brand-dark bg-white sharp-edge space-y-6">
          <div className="space-y-2">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] font-extrabold text-brand-accent block">
              // ON READING & SOFTWARE DESIGN
            </span>
            <h3 className="font-serif text-2xl md:text-4xl font-bold text-brand-dark">
              Why an engineer reads outside of tech documentation
            </h3>
          </div>
          <p className="font-sans text-sm text-brand-muted leading-relaxed max-w-3xl">
            Software frameworks change quarterly; the laws of feedback latency, fat-tailed risk, cognitive limits, and human incentives remain constant across centuries. The engineers who build systems that survive are never the ones memorizing syntax - they are the ones reasoning from first principles.
          </p>
          <div className="pt-2">
            <a
              href="/about"
              className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider font-bold text-brand-dark hover:text-brand-accent transition-colors"
            >
              <span>Read Zachary's Operating Philosophy &rarr;</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
