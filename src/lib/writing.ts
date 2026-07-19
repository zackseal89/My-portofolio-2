/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { WritingPiece } from '../types';

// Every .md file in src/content/writing/ becomes a card on the Writing page.
// This runs at build time (Vite's import.meta.glob), so there is still no
// backend and no database: adding a piece means adding a file and redeploying.
const files = import.meta.glob('../content/writing/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>;

interface ParsedMarkdown {
  data: Record<string, string>;
  body: string;
}

function parseFrontmatter(raw: string): ParsedMarkdown {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) return { data: {}, body: raw.trim() };

  const [, frontmatter, body] = match;
  const data: Record<string, string> = {};
  frontmatter.split('\n').forEach((line) => {
    const idx = line.indexOf(':');
    if (idx === -1) return;
    const key = line.slice(0, idx).trim();
    const value = line.slice(idx + 1).trim();
    if (key) data[key] = value;
  });
  return { data, body: body.trim() };
}

const VALID_TYPES: WritingPiece['type'][] = ['Essay', 'Article', 'Book'];

export function loadWritingPieces(): WritingPiece[] {
  const pieces: WritingPiece[] = [];

  for (const path in files) {
    if (path.toLowerCase().endsWith('readme.md')) continue;

    const { data, body } = parseFrontmatter(files[path]);
    if (!data.title) continue; // not a real piece, skip silently

    const slug = path.split('/').pop()?.replace(/\.md$/, '') ?? path;
    const type = VALID_TYPES.includes(data.type as WritingPiece['type'])
      ? (data.type as WritingPiece['type'])
      : 'Essay';

    pieces.push({
      slug,
      title: data.title,
      type,
      venue: data.venue || '',
      date: data.date || '',
      url: data.url || undefined,
      blurb: body,
    });
  }

  return pieces.sort((a, b) => (a.date < b.date ? 1 : -1));
}
