/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Clock, Calendar, ArrowLeft, Share2, Check, ExternalLink } from 'lucide-react';
import { ReactNode } from 'react';
import { loadWritingPieces } from '../lib/writing';
import NotFoundPage from './NotFoundPage';

function renderInline(text: string): ReactNode {
  // Regex to split on markdown inline tokens:
  // [text](url), **bold**, `code`, *italic*
  const tokenRegex = /(\[[^\]]+\]\([^)]+\)|\*\*[^*]+\*\*|`[^`]+`|\*[^*]+\*)/g;
  const parts = text.split(tokenRegex);

  return parts.map((part, i) => {
    if (!part) return null;

    // Link: [text](url)
    const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (linkMatch) {
      return (
        <a
          key={i}
          href={linkMatch[2]}
          target="_blank"
          rel="noopener noreferrer"
          className="text-brand-accent underline underline-offset-2 hover:text-brand-dark transition-colors font-medium"
        >
          {linkMatch[1]}
        </a>
      );
    }

    // Bold: **text**
    if (part.startsWith('**') && part.endsWith('**') && part.length >= 4) {
      return (
        <strong key={i} className="font-semibold text-brand-dark">
          {part.slice(2, -2)}
        </strong>
      );
    }

    // Code: `code`
    if (part.startsWith('`') && part.endsWith('`') && part.length >= 2) {
      return (
        <code
          key={i}
          className="px-1.5 py-0.5 font-mono text-xs bg-brand-dark/10 text-brand-dark sharp-edge border border-brand-dark/15"
        >
          {part.slice(1, -1)}
        </code>
      );
    }

    // Italic: *text*
    if (part.startsWith('*') && part.endsWith('*') && part.length >= 2) {
      return (
        <em key={i} className="italic text-brand-dark/95">
          {part.slice(1, -1)}
        </em>
      );
    }

    return part;
  });
}

type MarkdownBlock =
  | { type: 'hr' }
  | { type: 'h1'; text: string }
  | { type: 'h2'; text: string }
  | { type: 'h3'; text: string }
  | { type: 'h4'; text: string }
  | { type: 'code'; lang: string; code: string }
  | { type: 'image'; alt: string; src: string }
  | { type: 'table'; headers: string[]; rows: string[][] }
  | { type: 'blockquote'; text: string }
  | { type: 'list'; ordered: boolean; items: string[] }
  | { type: 'p'; text: string };

function parseMarkdownBlocks(rawContent: string): MarkdownBlock[] {
  const lines = rawContent.split(/\r?\n/);
  const blocks: MarkdownBlock[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();

    if (!trimmed) {
      i++;
      continue;
    }

    // Code block
    if (trimmed.startsWith('```')) {
      const lang = trimmed.slice(3).trim();
      const codeLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i].trim().startsWith('```')) {
        codeLines.push(lines[i]);
        i++;
      }
      if (i < lines.length) i++; // consume closing ```
      blocks.push({ type: 'code', lang, code: codeLines.join('\n') });
      continue;
    }

    // Horizontal rule
    if (trimmed === '---' || trimmed === '***' || trimmed === '___') {
      blocks.push({ type: 'hr' });
      i++;
      continue;
    }

    // Headers
    if (trimmed.startsWith('# ')) {
      blocks.push({ type: 'h1', text: trimmed.slice(2).trim() });
      i++;
      continue;
    }
    if (trimmed.startsWith('## ')) {
      blocks.push({ type: 'h2', text: trimmed.slice(3).trim() });
      i++;
      continue;
    }
    if (trimmed.startsWith('### ')) {
      blocks.push({ type: 'h3', text: trimmed.slice(4).trim() });
      i++;
      continue;
    }
    if (trimmed.startsWith('#### ')) {
      blocks.push({ type: 'h4', text: trimmed.slice(5).trim() });
      i++;
      continue;
    }

    // Standalone Image
    const imgMatch = trimmed.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
    if (imgMatch) {
      blocks.push({ type: 'image', alt: imgMatch[1], src: imgMatch[2] });
      i++;
      continue;
    }

    // Table
    if (trimmed.startsWith('|')) {
      const tableLines: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith('|')) {
        tableLines.push(lines[i].trim());
        i++;
      }
      if (tableLines.length >= 2) {
        const parseRow = (l: string) =>
          l.replace(/^\|/, '').replace(/\|$/, '').split('|').map((c) => c.trim());
        const headers = parseRow(tableLines[0]);
        const isDelimiter = (l: string) => /^\|?\s*:?-+:?\s*(\|?\s*:?-+:?\s*)+\|?$/.test(l);
        const startIdx = isDelimiter(tableLines[1]) ? 2 : 1;
        const rows = tableLines.slice(startIdx).map(parseRow);
        blocks.push({ type: 'table', headers, rows });
      }
      continue;
    }

    // Blockquote
    if (trimmed.startsWith('>')) {
      const bqLines: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith('>')) {
        bqLines.push(lines[i].trim().replace(/^>\s?/, ''));
        i++;
      }
      blocks.push({ type: 'blockquote', text: bqLines.join(' ') });
      continue;
    }

    // List: unordered (- or *) or ordered (1.)
    const isUnordered = /^[-*]\s+/.test(trimmed);
    const isOrdered = /^\d+\.\s+/.test(trimmed);
    if (isUnordered || isOrdered) {
      const ordered = isOrdered;
      const items: string[] = [];
      while (i < lines.length) {
        const cur = lines[i].trim();
        if (!cur) break;
        const match = ordered ? cur.match(/^\d+\.\s+(.*)$/) : cur.match(/^[-*]\s+(.*)$/);
        if (match) {
          items.push(match[1]);
          i++;
        } else if (items.length > 0 && (lines[i].startsWith('  ') || lines[i].startsWith('\t'))) {
          items[items.length - 1] += ' ' + cur;
          i++;
        } else {
          break;
        }
      }
      blocks.push({ type: 'list', ordered, items });
      continue;
    }

    // Paragraph: collect lines until blank line or special block starts
    const pLines: string[] = [];
    while (i < lines.length) {
      const cur = lines[i].trim();
      if (!cur) break;
      if (
        cur.startsWith('```') ||
        cur === '---' ||
        cur === '***' ||
        cur.startsWith('#') ||
        cur.startsWith('![') ||
        cur.startsWith('|') ||
        cur.startsWith('>') ||
        /^[-*]\s+/.test(cur) ||
        /^\d+\.\s+/.test(cur)
      ) {
        if (pLines.length > 0) break;
      }
      pLines.push(cur);
      i++;
    }
    if (pLines.length > 0) {
      blocks.push({ type: 'p', text: pLines.join(' ') });
    }
  }

  return blocks;
}

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

  const parsedBlocks = article.content ? parseMarkdownBlocks(article.content) : [];

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
              <span>Original on {article.venue || 'Publication'}</span>
              <ExternalLink size={11} />
            </a>
          )}
        </div>
      </div>

      {/* Markdown Body Renderer */}
      <div className="space-y-6 text-sm md:text-base leading-relaxed text-brand-dark/90 font-sans">
        {parsedBlocks.length > 0 ? (
          parsedBlocks.map((block, idx) => {
            switch (block.type) {
              case 'hr':
                return <hr key={idx} className="my-8 border-brand-dark/15" />;

              case 'h1':
                return (
                  <h1 key={idx} className="font-serif text-2xl md:text-3xl font-bold text-brand-dark pt-6 pb-2 leading-tight">
                    {renderInline(block.text)}
                  </h1>
                );

              case 'h2':
                return (
                  <h2 key={idx} className="font-serif text-xl md:text-2xl font-bold text-brand-dark pt-6 pb-2 border-b border-brand-dark/10 leading-snug">
                    {renderInline(block.text)}
                  </h2>
                );

              case 'h3':
                return (
                  <h3 key={idx} className="font-serif text-lg font-bold text-brand-dark pt-4 pb-1 leading-snug">
                    {renderInline(block.text)}
                  </h3>
                );

              case 'h4':
                return (
                  <h4 key={idx} className="font-serif text-base font-bold text-brand-dark pt-3 pb-1">
                    {renderInline(block.text)}
                  </h4>
                );

              case 'image':
                return (
                  <figure key={idx} className="my-8 space-y-2">
                    <div className="overflow-hidden border border-brand-dark/15 bg-brand-surface sharp-edge shadow-sm">
                      <img
                        src={block.src}
                        alt={block.alt}
                        className="w-full h-auto object-cover"
                        loading="lazy"
                      />
                    </div>
                    {block.alt && (
                      <figcaption className="font-mono text-[10px] uppercase tracking-wider text-brand-muted text-center">
                        // {block.alt}
                      </figcaption>
                    )}
                  </figure>
                );

              case 'table':
                return (
                  <div key={idx} className="my-8 overflow-x-auto border border-brand-dark/15 bg-brand-surface sharp-edge shadow-sm">
                    <table className="w-full text-left font-sans text-xs md:text-sm border-collapse">
                      <thead className="bg-brand-dark/5 border-b border-brand-dark/15">
                        <tr>
                          {block.headers.map((cell, cIdx) => (
                            <th key={cIdx} className="p-3.5 font-mono text-[11px] uppercase tracking-wider font-bold text-brand-dark whitespace-nowrap">
                              {renderInline(cell)}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-brand-dark/10">
                        {block.rows.map((row, rIdx) => (
                          <tr key={rIdx} className="hover:bg-brand-dark/[0.02] transition-colors">
                            {row.map((cell, cIdx) => (
                              <td key={cIdx} className="p-3.5 text-brand-dark/90 leading-relaxed">
                                {renderInline(cell)}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                );

              case 'blockquote':
                return (
                  <blockquote key={idx} className="font-serif text-base md:text-lg italic border-l-2 border-brand-accent pl-4 py-2 my-4 bg-brand-accent/5 text-brand-dark">
                    {renderInline(block.text.replace(/^"/, '').replace(/"$/, ''))}
                  </blockquote>
                );

              case 'code':
                return (
                  <div key={idx} className="my-6 border border-brand-dark/20 sharp-edge overflow-hidden shadow-sm">
                    {block.lang && (
                      <div className="px-4 py-1.5 bg-brand-dark/95 text-brand-bg/70 border-b border-brand-bg/10 font-mono text-[10px] uppercase tracking-wider flex justify-between items-center">
                        <span>{block.lang}</span>
                        <span className="text-[9px] opacity-60">RAW // CODE</span>
                      </div>
                    )}
                    <pre className="p-4 bg-brand-dark text-brand-bg font-mono text-xs overflow-x-auto leading-relaxed">
                      <code>{block.code}</code>
                    </pre>
                  </div>
                );

              case 'list': {
                const Tag = block.ordered ? 'ol' : 'ul';
                return (
                  <Tag
                    key={idx}
                    className={`space-y-2 pl-6 font-sans text-sm md:text-base leading-relaxed ${
                      block.ordered ? 'list-decimal' : 'list-disc'
                    }`}
                  >
                    {block.items.map((item, itemIdx) => (
                      <li key={itemIdx} className="leading-relaxed">
                        {renderInline(item)}
                      </li>
                    ))}
                  </Tag>
                );
              }

              case 'p':
              default:
                return (
                  <p key={idx} className="leading-relaxed">
                    {renderInline(block.text)}
                  </p>
                );
            }
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
