/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Clock, Calendar, ArrowLeft, Share2, Check, ExternalLink } from 'lucide-react';
import { loadWritingPieces } from '../lib/writing';
import NotFoundPage from './NotFoundPage';

export default function ArticlePage() {
  const { slug } = useParams<{ slug: string }>();
  const [copied, setCopied] = useState(false);

  const article = loadWritingPieces().find((piece) => piece.slug === slug);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [slug]);

  if (!article) return <NotFoundPage />;

  const shareUrl = window.location.href;

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: article.title,
          text: article.blurb,
          url: shareUrl,
        });
        return;
      } catch (err) {
        // Fallback to clipboard copy
      }
    }
    await navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="w-full max-w-3xl mx-auto px-6 md:px-12 pt-32 md:pt-40 pb-24"
      id={`article-page-${article.slug}`}
    >
      {/* Top Bar */}
      <div className="flex justify-between items-center mb-8 pb-4 border-b border-brand-dark/15">
        <Link
          to="/writing"
          className="flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-brand-muted hover:text-brand-dark transition-colors"
        >
          <ArrowLeft size={14} />
          <span>Back to Articles</span>
        </Link>

        <button
          onClick={handleShare}
          className="p-1.5 text-brand-dark border border-brand-dark/20 hover:border-brand-accent hover:text-brand-accent bg-brand-surface sharp-edge transition-all cursor-pointer flex items-center gap-1.5 font-mono text-[10px] uppercase font-bold"
          title="Share article"
        >
          {copied ? <Check size={12} className="text-green-600" /> : <Share2 size={12} />}
          <span>{copied ? 'Link Copied' : 'Share'}</span>
        </button>
      </div>

      {/* Header Metadata */}
      <div className="space-y-4 border-b border-brand-dark/15 pb-6 mb-8">
        <div className="flex flex-wrap items-center gap-3 font-mono text-[10px] uppercase font-bold">
          <span className="px-2 py-0.5 border border-brand-accent/30 bg-brand-accent/5 text-brand-accent sharp-edge">
            {article.category || article.type}
          </span>
          {article.date && (
            <span className="text-brand-muted flex items-center gap-1">
              <Calendar size={10} />
              {article.date}
            </span>
          )}
          {article.readTime && (
            <span className="text-brand-muted flex items-center gap-1">
              <Clock size={10} />
              {article.readTime}
            </span>
          )}
        </div>

        <h1 className="font-serif text-3xl md:text-5xl font-bold tracking-tight text-brand-dark leading-tight">
          {article.title}
        </h1>

        <div className="flex flex-wrap items-center justify-between gap-2 pt-2">
          <div className="font-mono text-xs text-brand-muted">
            // Published by {article.venue || 'Zachary Ongeri'}
          </div>
          {article.url && (
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase font-bold text-brand-accent hover:underline border border-brand-accent/30 bg-brand-accent/5 px-2.5 py-1 sharp-edge"
            >
              <span>Original on {article.venue || 'LinkedIn'}</span>
              <ExternalLink size={11} />
            </a>
          )}
        </div>
      </div>

      {/* Markdown Body Renderer */}
      <div className="space-y-5 text-sm md:text-base leading-relaxed text-brand-dark/90 font-sans">
        {article.content ? (
          article.content.split('\n\n').map((block, idx) => {
            const trimmed = block.trim();

            // H1 / H2 Headers
            if (trimmed.startsWith('# ')) {
              return <h1 key={idx} className="font-serif text-2xl md:text-3xl font-bold text-brand-dark pt-4 pb-2">{trimmed.slice(2)}</h1>;
            }
            if (trimmed.startsWith('## ')) {
              return <h2 key={idx} className="font-serif text-xl md:text-2xl font-bold text-brand-dark pt-4 pb-2 border-b border-brand-dark/10">{trimmed.slice(3)}</h2>;
            }
            if (trimmed.startsWith('### ')) {
              return <h3 key={idx} className="font-serif text-lg font-bold text-brand-dark pt-3 pb-1">{trimmed.slice(4)}</h3>;
            }

            // Images
            const imageMatch = trimmed.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
            if (imageMatch) {
              const [, alt, src] = imageMatch;
              return (
                <figure key={idx} className="my-8 space-y-2">
                  <div className="overflow-hidden border border-brand-dark/15 bg-brand-surface sharp-edge shadow-sm">
                    <img
                      src={src}
                      alt={alt}
                      className="w-full h-auto object-cover"
                      loading="lazy"
                    />
                  </div>
                  {alt && (
                    <figcaption className="font-mono text-[10px] uppercase tracking-wider text-brand-muted text-center">
                      // {alt}
                    </figcaption>
                  )}
                </figure>
              );
            }

            // Blockquotes
            if (trimmed.startsWith('> ')) {
              return (
                <blockquote key={idx} className="font-serif text-base md:text-lg italic border-l-2 border-brand-accent pl-4 py-2 my-4 bg-brand-accent/5 text-brand-dark">
                  {trimmed.slice(2).replace(/^"/, '').replace(/"$/, '')}
                </blockquote>
              );
            }

            // Code blocks
            if (trimmed.startsWith('```')) {
              const lines = trimmed.split('\n');
              const code = lines.slice(1, -1).join('\n');
              return (
                <pre key={idx} className="p-4 bg-brand-dark text-brand-bg font-mono text-xs overflow-x-auto sharp-edge border border-brand-dark/20 leading-relaxed my-4">
                  <code>{code}</code>
                </pre>
              );
            }

            // Ordered or unordered lists
            if (trimmed.startsWith('- ') || trimmed.match(/^\d+\./)) {
              return (
                <ul key={idx} className="space-y-2 pl-4 list-disc font-sans text-sm">
                  {trimmed.split('\n').map((li, liIdx) => (
                    <li key={liIdx} className="leading-relaxed">
                      {li.replace(/^-\s*/, '').replace(/^\d+\.\s*/, '')}
                    </li>
                  ))}
                </ul>
              );
            }

            // Standard paragraphs
            return (
              <p key={idx} className="leading-relaxed">
                {trimmed}
              </p>
            );
          })
        ) : (
          <p className="font-serif text-base italic text-brand-muted">{article.blurb}</p>
        )}
      </div>

      {/* Bottom Share & Action Bar */}
      <div className="p-6 border border-brand-dark/15 bg-brand-surface sharp-edge flex flex-col sm:flex-row justify-between items-center gap-4 my-8">
        <div className="space-y-1 text-center sm:text-left">
          <span className="font-mono text-[10px] uppercase font-bold text-brand-accent">ENJOYED THIS PIECE?</span>
          <p className="font-sans text-xs text-brand-muted">Share with engineers and infrastructure builders.</p>
        </div>
        <button
          onClick={handleShare}
          className="px-5 py-2.5 bg-brand-dark text-brand-bg hover:bg-brand-accent hover:text-brand-dark font-mono text-xs uppercase tracking-wider font-bold sharp-edge transition-colors cursor-pointer flex items-center gap-2"
        >
          {copied ? <Check size={14} className="text-green-400" /> : <Share2 size={14} />}
          <span>{copied ? 'Link Copied to Clipboard' : 'Share Article'}</span>
        </button>
      </div>

      {/* Article Footer Metadata */}
      <div className="pt-6 border-t border-brand-dark/15 flex justify-between items-center text-xs font-mono text-brand-muted">
        <span>// END OF ARTICLE</span>
        <span>NO_BACKEND // STATIC_MARKDOWN</span>
      </div>
    </motion.article>
  );
}
