/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <section className="flex-1 flex items-center justify-center py-32 px-6 md:px-12 w-full max-w-3xl mx-auto text-center">
      <div className="space-y-6">
        <span className="font-mono text-xs uppercase tracking-[0.25em] font-extrabold text-brand-accent block">
          404 // ROUTE_UNRESOLVED
        </span>
        <h1 className="font-serif text-4xl md:text-6xl font-bold tracking-tight text-brand-dark">
          This page doesn't exist.
        </h1>
        <p className="font-sans text-sm md:text-base text-brand-muted leading-relaxed max-w-lg mx-auto">
          Neither, arguably, does inherent meaning. But the rest of this site is
          considerably better sourced than that sentence, so let's get you back to it.
        </p>
        <div className="pt-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-brand-dark text-brand-bg border border-brand-dark hover:bg-brand-accent hover:border-brand-accent px-8 py-4 font-sans text-xs uppercase tracking-[0.16em] font-extrabold transition-all duration-300 sharp-edge cursor-pointer"
          >
            Return to Home
          </Link>
        </div>
      </div>
    </section>
  );
}
