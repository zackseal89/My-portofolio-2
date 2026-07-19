/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { CaseStudy, Service, Project, Experience, SkillCategory } from './types';

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'regwatch',
    number: '01',
    title: 'RegWatch (Flagship Product)',
    subtitle: 'Moving Kenyan regulatory compliance from manual tracking to instant, access-controlled semantic insight.',
    category: 'AI SaaS / RAG Platform',
    description: 'A regulatory intelligence platform built inside MNL Advocates LLP, covering CBK and ODPC jurisdiction. A full RAG pipeline sits behind a three-role row-level security model, so one client never sees another client\'s filings by accident, by design rather than by policy.',
    metricValue: 'LIVE SUMMIT',
    metricLabel: 'Working SaaS System',
    duration: 'Ongoing',
    role: 'AI Associate & Product Builder',
    technologies: ['Next.js 14', 'Supabase (pgvector + RLS)', 'Voyage AI Embeddings', 'Anthropic Claude API', 'Vercel Edge Functions'],
    challenge: 'Legal and compliance teams tracked CBK and ODPC regulatory change by hand, with no reliable way to guarantee that one client\'s filings never surfaced in another client\'s results.',
    solution: 'Designed a RAG pipeline with a strict three-role row-level security model, so document ingestion, vector search, and Claude-generated compliance answers are scoped correctly by construction, not by convention.',
    workflowSteps: [
      { title: 'Document Ingestion', description: 'Triggers on incoming regulatory gazettes and client filings, tagged to the correct role scope on entry.', status: 'completed' },
      { title: 'Voyage Semantic Chunking', description: 'Splits text dynamically and encodes chunks using Voyage AI models.', status: 'completed' },
      { title: 'RLS-Scoped Vector Query', description: 'Calculates cosine distance against Supabase pgvector, filtered first by row-level security, not after.', status: 'active' },
      { title: 'Claude Compliance Synthesis', description: 'Synthesizes insight responses cross-referenced with verifiable document citations, never crossing a role boundary.', status: 'pending' }
    ]
  },
  {
    id: 'forma',
    number: '02',
    title: 'FORMA',
    subtitle: 'A comfort-first shapewear brand built around how Nairobi\'s corporate women actually fit, not an imported size chart.',
    category: 'DTC Brand / Ecommerce Systems',
    description: 'The long-horizon compounding bet. Supplier sourcing locked to S-Shaper, OEKO-TEX certified at a 100-unit MOQ, sizing rebuilt around East African hip proportions, and a full brand identity designed before a single unit ships.',
    metricValue: 'PRE-LAUNCH',
    metricLabel: 'Supply Chain & Brand Locked',
    duration: 'Continuous',
    role: 'Founder & Brand Architect',
    technologies: ['Shopify', 'S-Shaper Supplier Sourcing', 'Brand Identity System', 'Cormorant Garamond / DM Sans'],
    challenge: 'Shapewear sold into the Kenyan market is sized for bodies it was never designed around, leaving corporate women choosing between imported charts that fit no one well.',
    solution: 'Vetted and locked an OEKO-TEX certified supplier at a sane minimum order quantity, rebuilt the fit model around East African hip proportions, and designed a full brand system (obsidian, cream, terracotta, nude) before writing a line of storefront code.',
    workflowSteps: [
      { title: 'Supplier Lock', description: 'Vetted and locked S-Shaper as manufacturing partner: OEKO-TEX certified, 100-unit minimum order.', status: 'completed' },
      { title: 'Sizing Model Rebuild', description: 'Re-anchored the fit model to East African hip proportions instead of an inherited size chart.', status: 'completed' },
      { title: 'Brand Identity System', description: 'Built the full visual system (obsidian / cream / terracotta / nude, Cormorant Garamond + DM Sans) ahead of launch.', status: 'active' },
      { title: 'Storefront & Launch', description: 'Shopify build and go-to-market sequencing, positioned as the long-term center of gravity once cashflow allows.', status: 'pending' }
    ]
  },
  {
    id: 'whatsapp-sme-agents',
    number: '03',
    title: 'Freelance Automation Engine',
    subtitle: 'Shopify builds, AI chatbots, and lead automation for SME clients, sourced through Fiverr, Upwork, and Whop.',
    category: 'Freelance / Ecommerce Automation',
    description: 'The near-term cashflow engine, deliberately kept separate from legal tech positioning. Vertical AI agents for clinics, dealerships, and hosts answer WhatsApp inquiries and qualify leads in under 30 seconds, backed by a weekly automated lead-gen sweep across Kenyan and US ecommerce markets.',
    metricValue: '30 SEC',
    metricLabel: 'Average Auto Reply Speed',
    duration: 'Ongoing',
    role: 'Freelance AI Systems Engineer',
    technologies: ['WhatsApp Business API', 'Claude API', 'Shopify', 'Cowork Lead-Gen Automation'],
    challenge: 'SME clients need Shopify builds and AI automation, but blending that positioning with regulatory or legal-tech work muddies both lanes and confuses prospective clients.',
    solution: 'Kept freelance positioning strictly to Shopify, ecommerce automation, and AI chatbots, while a weekly automated sweep surfaces new leads across Kenyan and US markets without manual prospecting.',
    workflowSteps: [
      { title: 'Meta Webhook Hookup', description: 'Processes incoming WhatsApp Business API events for each client in real time.', status: 'completed' },
      { title: 'Prompt Scaffolding', description: 'Controls model responses to strictly follow each client\'s business rules without hallucinating policy.', status: 'completed' },
      { title: 'Booking & Calendar Bridge', description: 'Checks live timeslots and confirms reservations directly inside the WhatsApp thread.', status: 'active' },
      { title: 'Weekly Lead-Gen Sweep', description: 'An automated Cowork run surfaces new prospective clients across Kenyan and US ecommerce markets every week.', status: 'pending' }
    ]
  },
  {
    id: 'mnl-advocates',
    number: '04',
    title: 'MNL Advocates LLP: Infrastructure & Event Ops',
    subtitle: 'Headless web architecture, SEO rebuild, and live event operations for a leading Nairobi law firm.',
    category: 'Web Architecture / Event Systems',
    description: 'Migrated MNL\'s digital infrastructure to a headless WordPress, Next.js, and Vercel stack, rebuilt SEO and AEO from the ground up, and ran the operational scaffolding for the Africa Leadership Circle, from the Nairobi summit through to the Benin breakfast in Cotonou.',
    metricValue: 'SUB-SEC',
    metricLabel: 'Headless Portal Load Time',
    duration: 'Ongoing',
    role: 'AI & Digital Architect',
    technologies: ['Headless WordPress CMS', 'Next.js', 'Vercel', 'WeasyPrint Document Pipeline', 'SEO / AEO'],
    challenge: 'A respected law firm ran on legacy WordPress with unresolved DNS conflicts, and had no operational system for running multi-day, multi-country leadership events.',
    solution: 'Decoupled the CMS behind a headless Next.js front end on Vercel, rebuilt host records and search visibility from scratch, and built the briefing documents, contact sheets, and WeasyPrint-driven document pipeline that kept the Nairobi summit, and the Cotonou follow-through, from depending on anyone\'s memory.',
    workflowSteps: [
      { title: 'DNS & Hosting Rectification', description: 'Audited and consolidated scattered nameserver records to eliminate routing handoff delays.', status: 'completed' },
      { title: 'Headless Next.js Migration', description: 'Fitted decoupled WordPress JSON feeds to a fast, static-first React front end on Vercel.', status: 'completed' },
      { title: 'SEO / AEO Rebuild', description: 'Rewrote content architecture to be citeable by both search engines and AI assistants.', status: 'completed' },
      { title: 'Africa Leadership Circle Ops', description: 'Built the run-of-show, briefing docs, and WeasyPrint document pipeline for the Nairobi summit and Cotonou breakfast.', status: 'active' }
    ]
  }
];

export const SERVICES: Service[] = [
  {
    id: 'service-1',
    number: '01',
    title: 'Shopify & Ecommerce Systems',
    description: 'Custom Shopify builds and the operational tooling behind them: supplier tracking, sizing and fit models, and inventory dashboards, built by someone who runs their own DTC brand.',
    deliverables: [
      'Bespoke Shopify theme implementations and setups',
      'Supplier sourcing and sizing model design',
      'Notion Founder OS workspace and task operating hubs',
      'Price elasticity analysis calculators and volume monitors'
    ]
  },
  {
    id: 'service-2',
    number: '02',
    title: 'AI Chatbots & Lead Automation',
    description: 'WhatsApp and web-based AI agents that qualify leads, answer inquiries, and book appointments, so a small team stops losing high-intent customers to slow response times.',
    deliverables: [
      'WhatsApp Business API conversational lead agents',
      'Weekly automated lead-gen sweeps across target markets',
      'Prompt scaffolding and guardrails scoped to each client',
      'Calendar and booking system integrations'
    ]
  },
  {
    id: 'service-3',
    number: '03',
    title: 'Brand & Product Systems',
    description: 'Full visual identity systems and sourcing frameworks for DTC brands that want to look, and fit, like they mean it before their first unit ships.',
    deliverables: [
      'Brand identity systems: color, type, and voice',
      'Supplier vetting and MOQ negotiation frameworks',
      'Fit and sizing models built for the actual customer',
      'Launch sequencing and go-to-market planning'
    ]
  },
  {
    id: 'service-4',
    number: '04',
    title: 'Content & Publishing Automation',
    description: "Automated content and social publishing pipelines that keep a brand's presence consistent without a full-time content team behind it.",
    deliverables: [
      'Automated social publishing pipelines (Gemini-driven)',
      'SEO / AEO content architecture audits',
      'Thought-leadership content engines',
      'AI product photography and asset pipelines'
    ]
  }
];

export const PROJECTS: Project[] = [
  {
    id: 'regwatch-platform',
    number: '01',
    title: 'RegWatch Compliance SaaS',
    subtitle: 'RAG policy platform taking complex legalese and returning access-controlled, citation-backed answers.',
    description: 'Built inside MNL Advocates LLP to transform how the firm tracks CBK and ODPC regulatory change. Integrates document parsing, semantic chunking, and a three-role row-level security model, so natural-language answers never cross a client boundary.',
    technologies: ['Next.js 14', 'Supabase (pgvector + RLS)', 'Voyage AI Embeddings', 'Anthropic Claude API', 'Vercel'],
    status: 'Live',
    liveUrl: 'https://ais-pre-2dh3i6sdmzuqats6vbzd2o-24581161265.europe-west2.run.app',
    repoUrl: 'https://github.com/zacharyongeri/regwatch-rag'
  },
  {
    id: 'forma-brand',
    number: '02',
    title: 'FORMA',
    subtitle: 'Comfort-first shapewear, sized for East African bodies, built as the long-horizon compounding asset.',
    description: 'Supplier sourcing is locked to S-Shaper (OEKO-TEX certified, 100-unit MOQ), the sizing model is rebuilt around East African hip proportions, and the full brand system, obsidian, cream, terracotta, and nude, is designed. The storefront comes next.',
    technologies: ['Shopify', 'S-Shaper Sourcing', 'Brand Identity System', 'Cormorant Garamond / DM Sans'],
    status: 'In Development'
  },
  {
    id: 'freelance-automation',
    number: '03',
    title: 'Freelance Automation Systems',
    subtitle: 'Shopify builds and AI chatbot automation for SME clients across Kenyan and US ecommerce markets.',
    description: 'Client work sourced through Fiverr, Upwork, and Whop: WhatsApp booking agents, Shopify storefronts, and the weekly automated lead-gen sweep that keeps the pipeline full. Deliberately kept separate from RegWatch and legal-tech positioning.',
    technologies: ['WhatsApp Business API', 'Claude API', 'Shopify', 'Cowork Automation'],
    status: 'Client Work'
  }
];

export const EXPERIENCES: Experience[] = [
  {
    id: 'exp-1',
    period: '2024 - Present',
    role: 'AI Associate & Digital Architect',
    company: 'MNL Advocates LLP',
    description: 'Pioneered full-stack regulatory AI software and resolved digital infrastructure from the ground up, alongside running live event operations.',
    bulletPoints: [
      'Pitched and built RegWatch, taking it from concept to a live RAG platform with a three-role row-level security model covering CBK and ODPC jurisdiction.',
      'Migrated the firm to a headless WordPress, Next.js, and Vercel stack, resolving legacy DNS conflicts and rebuilding SEO and AEO from scratch.',
      'Built the run-of-show, briefing documents, and WeasyPrint document pipeline behind the Africa Leadership Circle: the Nairobi summit and the Cotonou breakfast.'
    ]
  },
  {
    id: 'exp-2',
    period: 'Present',
    role: 'Founder & Brand Architect',
    company: 'FORMA',
    description: 'Building a comfort-first shapewear brand for corporate women in Nairobi, from supplier sourcing through brand identity, ahead of launch.',
    bulletPoints: [
      'Vetted and locked S-Shaper as manufacturing partner: OEKO-TEX certified, 100-unit minimum order.',
      'Rebuilt the sizing model around East African hip proportions instead of an inherited chart.',
      'Designed the full brand identity system (obsidian, cream, terracotta, nude) ahead of any paid media spend.'
    ]
  },
  {
    id: 'exp-3',
    period: 'Ongoing',
    role: 'Freelance AI Systems Engineer',
    company: 'Independent / Fiverr, Upwork, Whop',
    description: 'The near-term cashflow engine, positioned strictly around Shopify, ecommerce automation, and AI chatbots, deliberately separate from legal-tech work.',
    bulletPoints: [
      'Delivered productized WhatsApp Business API booking agents for clinics, dealerships, and hosts, driving sub-30-second reply speed.',
      'Run a weekly automated lead-generation sweep across Kenyan and US ecommerce markets.',
      'Maintain Wesscards, a family member\'s card games Shopify store, alongside client engagements.'
    ]
  },
  {
    id: 'exp-4',
    period: 'Ongoing',
    role: 'Independent Trader, Capital Allocator in Training',
    company: 'NSE & Forex Markets',
    description: 'Applying the same systems discipline used in software to capital: find the structure, build a repeatable framework, then execute on discipline rather than instinct.',
    bulletPoints: [
      'Runs a multi-timeframe confluence framework on XAUUSD: moving-average trend filter, support and resistance zones, and reversal signals.',
      'Built position-sizing and risk calculators before building conviction, defining the downside mechanically and letting upside be a discovery.',
      'Tracks a four-pillar research process: CBK signals, government fiscal signals, NSE market signals, and an entrepreneur opportunity radar.'
    ]
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: 'skills-1',
    category: 'AI & RAG ENGINEERING',
    skills: [
      'Claude & Gemini API SDKs',
      'Supabase pgvector + Row-Level Security',
      'WeasyPrint Document Pipelines',
      'Semantic RAG Architecture',
      'Prompt Scaffolding & Guardrails',
      'Headless CMS Integration'
    ]
  },
  {
    id: 'skills-2',
    category: 'COMMERCE & BRAND SYSTEMS',
    skills: [
      'Custom Shopify Development',
      'Supplier Sourcing & Sizing Models',
      'Brand Identity Systems',
      'AI Chatbot & Lead Automation',
      'SEO / AEO Optimization',
      'Notion Founder OS Workspaces'
    ]
  },
  {
    id: 'skills-3',
    category: 'MARKETS & OPERATIONS',
    skills: [
      'NSE & Forex Market Structure',
      'XAUUSD Multi-Timeframe Confluence',
      'Position Sizing & Risk Frameworks',
      'Event Logistics Systems',
      'Capital Allocation Research',
      'Operational Scaffolding (CLAUDE.md, Runbooks)'
    ]
  }
];
