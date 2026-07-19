/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { CornerDownRight } from 'lucide-react';
import { SERVICES } from '../data';
import { useUI } from '../context/UIContext';

export default function ServicesPage() {
  const { openContact } = useUI();

  return (
    <section
      className="py-32 md:py-40 px-6 md:px-12 w-full max-w-7xl mx-auto"
      id="services"
    >
      <div className="grid grid-cols-12 gap-8">

        {/* Header Column Block */}
        <div className="col-span-12 lg:col-span-4 space-y-4">
          <span className="font-sans text-xs uppercase tracking-[0.2em] font-extrabold text-brand-accent block">
            Expertise Capabilities
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold tracking-tight text-brand-dark leading-tight">
            Architectural Services
          </h2>
          <p className="font-sans text-sm text-brand-muted leading-relaxed max-w-sm">
            Engineering custom integrations that replace traditional unformatted data inputs with hyper-structured, clean metrics.
          </p>
          <div className="pt-4">
            <button
              onClick={openContact}
              className="font-sans text-[11px] uppercase tracking-widest font-extrabold pb-1 border-b border-brand-dark hover:border-brand-accent text-brand-dark hover:text-brand-accent transition-colors cursor-pointer"
            >
              Retrieve pricing matrices &rarr;
            </button>
          </div>
        </div>

        {/* List columns */}
        <div className="col-span-12 lg:col-span-8 space-y-6">
          {SERVICES.map((serv) => (
            <div
              key={serv.id}
              className="p-6 md:p-8 border border-brand-dark/10 bg-brand-surface/60 hover:border-brand-dark hover:bg-brand-surface transition-all duration-300 sharp-edge"
              id={`service-${serv.id}`}
            >
              <div className="flex flex-col md:flex-row justify-between items-start gap-4 md:gap-8">
                <div className="flex gap-4">
                  <span className="font-serif text-lg font-bold text-brand-accent bg-brand-accent/5 h-8 w-8 flex items-center justify-center shrink-0">
                    {serv.number}
                  </span>
                  <div className="space-y-2">
                    <h3 className="font-serif text-xl font-bold text-brand-dark">{serv.title}</h3>
                    <p className="font-sans text-sm text-brand-muted leading-relaxed">{serv.description}</p>

                    {/* Custom neat deliverables toggle */}
                    <div className="pt-4 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">
                      {serv.deliverables.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-2 font-sans text-xs text-brand-muted">
                          <CornerDownRight size={10} className="text-brand-accent shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
