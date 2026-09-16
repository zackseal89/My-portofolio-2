/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { CaseStudy, Service, Project, Experience, SkillCategory, BuildDecision, AgentBuildStep, EngagementShape, SprintWeek, Book } from './types';

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'oreos',
    number: '01',
    title: 'OREoS (Flagship Product)',
    subtitle: 'The marketing workspace that already knows your business - live at oreos.online.',
    category: 'Agentic & LLM Systems',
    description: 'Architected and shipped a multi-tenant marketing workspace grounded in live store context. Connects store URLs to autonomously extract brand voice, catalog SKUs, and media into persistent workspace context. Features a tool-calling AI Copilot with server-enforced human approval gates (toolApproval: user-approval), Postgres RLS multi-tenant isolation, and isolated PostProxy OAuth publishing queues for Instagram, TikTok, LinkedIn, and X.',
    metricValue: 'ZERO-LEAK',
    metricLabel: 'Postgres RLS & Server-Enforced Approval',
    duration: 'Founder Build // Live in Production',
    role: 'Founder & Full-Stack Systems Architect',
    technologies: ['Next.js 14', 'PostgreSQL (Supabase RLS)', 'PostProxy OAuth Gateway', 'Multi-Tenant Context Grounding', 'Claude / LLM Tool Calling', 'Tailwind CSS'],
    challenge: 'Founders and merchants waste hours repeatedly briefing generic AI chatbots from scratch with every prompt, while unverified autonomous AI tools risk brand reputation through uncontrolled, hallucinated social publishing.',
    solution: 'Built a one-person codebase shipped daily: crawls store URLs to extract typography, palette, SKUs, and inventory into isolated Postgres RLS workspaces in under 2 minutes. Decoupled AI generation from live scheduling using an explicit human review card gate, backed by PostProxy OAuth token isolation.',
    workflowSteps: [
      { title: 'Brand & Catalog Grounding', description: 'Autonomous crawler extracts store palette, typography, voice guidelines, and live SKU inventory in under 2 minutes with zero manual entry.', status: 'completed' },
      { title: 'Multi-Tenant Postgres RLS', description: 'Database-level Row Level Security policies enforce workspace isolation at query execution; short-lived signed URLs for workspace media.', status: 'completed' },
      { title: 'AI Copilot & Approval Gate', description: 'AI studio drafts platform-native posts with strict server-enforced toolApproval: { schedulePost: "user-approval" } gates before scheduling.', status: 'completed' },
      { title: 'PostProxy OAuth Gateway', description: 'Token-isolated dispatch pipeline delivering verified campaigns to Instagram, TikTok, LinkedIn, and X without storing passwords.', status: 'completed' }
    ]
  },
  {
    id: 'regwatch',
    number: '02',
    title: 'RegWatch Compliance SaaS',
    subtitle: 'Multi-tenant regulatory intelligence platform built inside MNL Advocates LLP.',
    category: 'Agentic & LLM Systems',
    description: 'A full retrieval pipeline end-to-end: Voyage AI embeddings, Supabase pgvector store, Next.js 14 application layer, covering Central Bank of Kenya (CBK) and Data Protection Commissioner (ODPC) filings. Isolation sits in Postgres row-level security policies rather than application logic.',
    metricValue: 'LIVE PLATFORM',
    metricLabel: 'CBK & ODPC Filings Coverage',
    duration: 'Ongoing',
    role: 'AI Associate & Product Builder',
    technologies: ['Next.js 14', 'Supabase (pgvector + RLS)', 'Voyage AI Embeddings', 'Anthropic Claude API', 'Vercel Edge Functions'],
    challenge: 'Legal and compliance teams tracked CBK and ODPC regulatory changes by hand, with no reliable guarantee that one client\'s filings would never surface in another client\'s results.',
    solution: 'Engineered a full retrieval pipeline with a strict three-role row-level security model. Ingestion, chunking, embedding, ranking, auth, and front-end deployment were owned end-to-end so security policies fail closed at the database layer.',
    workflowSteps: [
      { title: 'Document Ingestion', description: 'Triggers on incoming regulatory gazettes and client filings, tagged to the correct role scope on entry.', status: 'completed' },
      { title: 'Voyage Semantic Chunking', description: 'Splits text dynamically and encodes chunks using Voyage AI embeddings.', status: 'completed' },
      { title: 'RLS-Scoped Vector Query', description: 'Calculates cosine distance against Supabase pgvector, filtered first by row-level security policies.', status: 'active' },
      { title: 'Claude Compliance Synthesis', description: 'Synthesizes compliance answers cross-referenced with verifiable document citations without crossing role boundaries.', status: 'pending' }
    ]
  },
  {
    id: 'vertical-agents',
    number: '03',
    title: 'Vertical AI Agents',
    subtitle: 'Production conversational agents across Kenyan and United States markets.',
    category: 'Agentic & LLM Systems',
    description: 'Conversational agents on the WhatsApp Business API and Claude API that answer inbound enquiries and qualify leads in under 30 seconds, with immediate handoff to a human when out of depth. Built narrow for clinics, dealerships, and short stay hosts.',
    metricValue: '< 30 SEC',
    metricLabel: 'Inbound Lead Qualification',
    duration: 'Production Deployments',
    role: 'AI Systems Engineer',
    technologies: ['WhatsApp Business API', 'Claude API', 'Node.js', 'PostgreSQL', 'Webhooks', 'Scheduled Jobs'],
    challenge: 'General-purpose assistants frequently fail in production by hallucinating details or failing to know when to hand off to a human operator.',
    solution: 'Built narrow, vertical agents (booking for hosts, triage for clinics, stock & finance for dealerships) that can be rigorously tested, corrected, and trusted by business owners.',
    workflowSteps: [
      { title: 'Meta Webhook Ingestion', description: 'Processes real-time inbound WhatsApp Business API messages within milliseconds.', status: 'completed' },
      { title: 'Intent & Constraint Check', description: 'Evaluates inquiry type against strict prompt guardrails and vertical domain rules.', status: 'completed' },
      { title: 'Database / API Lookup', description: 'Queries live availability, triage criteria, or inventory stock levels.', status: 'active' },
      { title: 'Human Handoff Trigger', description: 'Gracefully transfers thread to a human operator when confidence falls below threshold.', status: 'pending' }
    ]
  },
  {
    id: 'forma',
    number: '04',
    title: 'FORMA',
    subtitle: 'Direct-to-consumer apparel brand, founded and built from the sourcing layer up.',
    category: 'Ecommerce, Design Through Build',
    description: 'Owned the full stack of the business: supplier sourcing locked to S-Shaper (OEKO-TEX certified, 100-unit MOQ), sizing rebuilt around East African body proportions, plus a complete visual identity system and Shopify storefront built before the first unit shipped.',
    metricValue: '100 MOQ',
    metricLabel: 'Sourcing & Identity System Locked',
    duration: 'Founder Build',
    role: 'Founder & Brand Architect',
    technologies: ['Shopify', 'S-Shaper Supplier Sourcing', 'Brand Identity System', 'Cormorant Garamond / DM Sans'],
    challenge: 'Imported shapewear uses size charts unsuited for East African proportions, built on top of fragmented supplier sourcing decisions.',
    solution: 'Locked manufacturing with S-Shaper at OEKO-TEX certification, rebuilt fit models around East African hip proportions, and built identity, information architecture, product data model, and Shopify conversion path as one system.',
    workflowSteps: [
      { title: 'Supplier Lock', description: 'Vetted S-Shaper as manufacturing partner: OEKO-TEX certified, 100-unit minimum order quantity.', status: 'completed' },
      { title: 'Sizing Model Rebuild', description: 'Re-anchored fit model to East African hip proportions instead of an inherited chart.', status: 'completed' },
      { title: 'Visual Identity System', description: 'Built complete visual system (obsidian, cream, terracotta, nude) ahead of storefront launch.', status: 'active' },
      { title: 'Shopify Storefront Launch', description: 'Deploying custom Shopify storefront treating identity, data model, and checkout as one surface.', status: 'pending' }
    ]
  },
  {
    id: 'naisole',
    number: '05',
    title: 'Naisole',
    subtitle: 'Custom Shopify storefront designed and built end-to-end.',
    category: 'Ecommerce, Design Through Build',
    description: 'Store designed and developed end-to-end: category, theme, and customisation detail to launch outcome. Identity, information architecture, product data model, and conversion path treated as one system rather than four handoffs.',
    metricValue: 'END-TO-END',
    metricLabel: 'Single-System Commerce Build',
    duration: 'Completed Build',
    role: 'Ecommerce Architect & Designer',
    technologies: ['Shopify Liquid / React', 'Tailwind / Custom CSS', 'Product Data Modelling', 'Conversion UX'],
    challenge: 'Small merchants suffer when design, data modeling, storefront code, and checkout optimization are handed off between four separate agencies.',
    solution: 'Executed the whole surface as a single operator: brand identity, storefront code, product schema structure, and conversion rate optimization delivered seamlessly.',
    workflowSteps: [
      { title: 'Information Architecture', description: 'Structured category taxonomy and product metadata schemas.', status: 'completed' },
      { title: 'Bespoke Theme Build', description: 'Custom Shopify storefront theme implementation focused on fast visual rendering.', status: 'completed' },
      { title: 'Conversion Path Optimization', description: 'Unified cart, checkout, and upsell touchpoints into a frictionless flow.', status: 'active' },
      { title: 'Launch Outcome QA', description: 'Post-launch metrics tracking and Search Console index verification.', status: 'pending' }
    ]
  },
  {
    id: 'mnl-advocates',
    number: '06',
    title: 'MNL Advocates LLP Migration',
    subtitle: 'Headless rebuild and search rearchitecture for a top Nairobi law firm.',
    category: 'Web Infrastructure & Search',
    description: 'Migrated web presence to a headless stack: WordPress as CMS, Next.js front end, Vercel edge delivery. Architecture, build, redirect mapping, cutover, and post-launch QA were all mine. Rebuilt SEO and AEO from the ground up so practice areas read cleanly to answer engines as well as crawlers.',
    metricValue: 'SUB-SEC',
    metricLabel: 'Headless Edge Delivery Load Time',
    duration: 'Deployed Architecture',
    role: 'Digital Architect',
    technologies: ['Headless WordPress CMS', 'Next.js 14', 'Vercel Edge Network', 'SEO / AEO Entity Structuring', 'Schema.org'],
    challenge: 'Legacy WordPress monolith with DNS issues, slow load times, and practice areas invisible to generative AI answer engines.',
    solution: 'Decoupled the CMS behind Next.js on Vercel edge infrastructure, mapped practice areas as structured entities for AEO (Answer Engine Optimization), and ran cutover with zero downtime.',
    workflowSteps: [
      { title: 'DNS & Infrastructure Audit', description: 'Consolidated scattered records and established clean Vercel edge routing.', status: 'completed' },
      { title: 'Headless Next.js Build', description: 'Connected decoupled WordPress GraphQL/REST feeds to static-first Next.js pages.', status: 'completed' },
      { title: 'AEO / SEO Rearchitecture', description: 'Structured firm practice areas as entity nodes for AI answer engines and search crawlers.', status: 'completed' },
      { title: 'Africa Leadership Circle Ops', description: 'Built event operational scaffolding, briefing docs, and document pipelines for Nairobi and Benin summits.', status: 'active' }
    ]
  }
];

export const BUILD_DECISIONS: BuildDecision[] = [
  {
    id: 'decision-oreos',
    number: '01',
    title: 'Publishing must be strictly decoupled from AI generation.',
    summary: 'Autonomous AI schedules risk brand reputation; server-enforced human approval gates guarantee safety without sacrificing velocity.',
    quote: 'With OREoS, I made human approval an architectural invariant rather than a prompt suggestion. The AI Copilot drafts and formats for each channel, but the publishing queue is gated server-side behind an explicit review card. Nothing touches live social APIs without an authenticated human click.',
    rationale: 'Relying on an LLM to decide when not to post is inherently unsafe. Decoupling generation from dispatch into a staged PostProxy gateway guarantees that even if a model hallucinates, zero unapproved payloads leave the tenant boundary.'
  },
  {
    id: 'decision-1',
    number: '02',
    title: 'Tenant isolation belongs in the database, not the application.',
    summary: 'Data-layer isolation fails closed; application filters are one forgotten where clause away from a breach.',
    quote: 'RegWatch holds filings for competing clients. I put separation in Postgres row level security with three roles rather than filtering in application code. A policy at the data layer fails closed.',
    rationale: 'Application-level tenant filtering relies on developers remembering to append tenant IDs to every SQL or ORM call across every endpoint. Database RLS guarantees that Postgres itself refuses to return unauthorised rows, regardless of application logic bugs.'
  },
  {
    id: 'decision-2',
    number: '03',
    title: 'Narrow agents beat general assistants in production.',
    summary: 'Single-job vertical agents can be benchmarked, corrected, and trusted with actual customers.',
    quote: 'Every agent I have shipped does one job for one vertical. A booking agent for hosts, a triage agent for clinics, a stock and finance agent for dealerships. Narrow scope means you can define what correct looks like, test against it, and hand a business something it can trust.',
    rationale: 'Broad AI assistants drift and hallucinate under real customer pressure. Scoping an agent to a single transactional domain allows every failure case to be written as an automated test executed on prompt updates.'
  },
  {
    id: 'decision-3',
    number: '04',
    title: 'Headless was a search decision before it was a speed decision.',
    summary: 'Control over edge rendering and structured data makes sites legible to AI answer engines.',
    quote: 'Moving MNL to WordPress plus Next.js on Vercel was not about the stack being current. Editors keep an interface they already know, while the front end gains control over rendering, structured data and edge delivery. That control is what makes a site legible to answer engines rather than merely fast.',
    rationale: 'Traditional CMS themes clutter HTML output with plugin bloat. Decoupling allows exact Schema.org entity graph injection, enabling answer engines (Perplexity, ChatGPT, Gemini) to parse and cite firm authority accurately.'
  },
  {
    id: 'decision-4',
    number: '05',
    title: 'In ecommerce, the supply chain is part of the software.',
    summary: 'A storefront built on top of broken product and sizing decisions converts poorly regardless of design.',
    quote: 'With FORMA I locked the supplier, the certification and the MOQ before designing a single screen, and rebuilt sizing around the customer rather than an inherited size chart. A storefront built on top of a broken product decision converts badly no matter how good the build is.',
    rationale: 'Software cannot fix returns caused by inaccurate sizing or unvetted manufacturing. Locking supplier certifications (OEKO-TEX, S-Shaper) and tailoring fit models upfront establishes a foundation that software can scale cleanly.'
  },
  {
    id: 'decision-agentic-coding',
    number: '06',
    title: 'Agentic Coding: The deterministic compiler harness beats prompt engineering.',
    summary: 'Orchestrating Antigravity, Claude Code, and Codex daily requires strict planning-mode boundaries, AST-aware diffing, and zero-tolerance compiler feedback loops.',
    quote: 'I use Antigravity, Claude Code, and Codex every single day, not as conversational chatbots, but as high-throughput, non-deterministic workers inside rigid, deterministic harnesses. The human architect defines invariants, schemas, and verification plans; the agents execute implementation in parallel. When an agent drifts, you do not argue with it in English; you feed it the compiler\'s raw exit code.',
    rationale: 'Prompt engineering alone produces brittle hallucinations. Real leverage comes from harness architecture: compact context windows, AST-aware incremental editing, compiler validation (tsc, Vitest, cargo check), and decoupled subagent delegation. One engineer with an orchestrator harness can ship the surface area of a 10-person squad with higher conceptual integrity.'
  }
];

export const AGENT_BUILD_STEPS: AgentBuildStep[] = [
  {
    stepNumber: 1,
    title: 'Study Real Conversations First',
    description: 'Find the conversation that already happens and read a hundred real customer messages before writing a single prompt or line of code.'
  },
  {
    stepNumber: 2,
    title: 'Define Narrow Job & Handoff Boundaries',
    description: 'Define the narrow job and the exact point where the agent must hand off thread control to a human operator.'
  },
  {
    stepNumber: 3,
    title: 'Build Retrieval Before Personality',
    description: 'Build retrieval infrastructure before tweaking tone. Wrong facts in a friendly voice are worse than no agent at all.'
  },
  {
    stepNumber: 4,
    title: 'Write Failure Cases as Automated Tests',
    description: 'Write failure cases as automated tests, then execute them every single time a system prompt or context changes.'
  },
  {
    stepNumber: 5,
    title: 'Ship Single-Channel & Measure Handoff Rate',
    description: 'Ship to one channel, measure the human handoff rate, and only widen agent scope once the handoff rate falls.'
  }
];

export const ENGAGEMENT_SHAPES: EngagementShape[] = [
  {
    id: 'shape-build-sprint',
    title: 'Build Sprint',
    subtitle: 'From nothing to live software in fixed milestones',
    description: 'A defined product, RAG system, or storefront taken from zero to live deployment with fixed scope, timeline, and deliverables.',
    deliverables: [
      'Fixed-scope product architecture & data model',
      'End-to-end engineering, front end, and edge deployment',
      'Written documentation your internal team can operate',
      'Event-tracking and production QA handoff'
    ]
  },
  {
    id: 'shape-system-audit',
    title: 'System Audit',
    subtitle: 'A diagnostic review of stack & manual bottlenecks',
    description: 'A comprehensive evaluation of an existing software stack, search visibility surface, and manual operational steps.',
    deliverables: [
      'Full technical debt & search visibility diagnostic',
      'Identification of uncosted weekly manual workflows',
      'Prioritised engineering roadmap you can execute without me',
      'Architecture recommendations for database isolation & AI readiness'
    ]
  },
  {
    id: 'shape-retained-build',
    title: 'Retained Build',
    subtitle: 'Technical direction & ongoing infrastructure ownership',
    description: 'Ongoing technical leadership and engineering ownership for growing teams without an in-house lead engineer.',
    deliverables: [
      'Continuous feature engineering & deployment oversight',
      'AI pipeline evaluations & prompt regression testing',
      'Infrastructure monitoring, RLS policy audits, and edge tuning',
      'Direct strategic alignment on balance-sheet moving software'
    ]
  }
];

export const SPRINT_WEEKS: SprintWeek[] = [
  {
    phase: 'WEEK 01 / DEFINE',
    title: 'Commercial Outcome Stated as a Number',
    description: 'The commercial outcome stated as a number, not a feature list. Data model, integration surface, and the key metric agreed in writing before code exists.'
  },
  {
    phase: 'WEEK 02 – 05 / BUILD',
    title: 'Working Software Delivered Weekly',
    description: 'Working software in front of you every week rather than a big reveal at the end. Real data early, because demo data hides every problem worth finding.'
  },
  {
    phase: 'WEEK 06 / HAND OVER',
    title: 'Deployment, Event Tracking & Documentation',
    description: 'Deployment, tracking wired to real events, and written documentation your team can run. If you need me afterwards, it should be for the next build, not to keep this one alive.'
  }
];

export const SERVICES: Service[] = [
  {
    id: 'service-1',
    number: '01',
    title: 'Agentic & LLM Systems',
    description: 'Production-grade RAG pipelines and narrow vertical AI agents built with strict database isolation, automated prompt evaluations, and sub-30-second response latency.',
    deliverables: [
      'RegWatch-grade semantic RAG pipelines (Voyage AI + Supabase pgvector)',
      'Postgres Row Level Security (RLS) multi-tenant data isolation models',
      'WhatsApp Business API & Claude API vertical conversational agents',
      'Automated prompt regression testing & human handoff triggers'
    ]
  },
  {
    id: 'service-2',
    number: '02',
    title: 'Ecommerce: Design Through Build',
    description: 'Custom Shopify storefronts and supply chain systems designed and built end-to-end as one surface: supplier vetting, sizing models, and conversion UX.',
    deliverables: [
      'Bespoke Shopify Liquid & Next.js storefront implementations',
      'Supplier sourcing, MOQ negotiation, and sizing model architecture',
      'Product data modeling, information architecture, and taxonomy',
      'Conversion path optimization and upsell pipeline engineering'
    ]
  },
  {
    id: 'service-3',
    number: '03',
    title: 'Web Infrastructure & Search (SEO / AEO)',
    description: 'Headless migrations that decouple CMS backends behind Next.js on Vercel edge infrastructure, structuring practice areas and brand entities so site content reads cleanly to AI answer engines.',
    deliverables: [
      'Headless WordPress to Next.js / Vercel edge network migrations',
      'Answer Engine Optimization (AEO) & Schema.org entity structuring',
      'DNS resolution, zero-downtime cutover, and 301 redirect mapping',
      'Core Web Vitals sub-second page performance optimization'
    ]
  },
  {
    id: 'service-4',
    number: '04',
    title: 'Productivity & Operating Systems',
    description: 'Internal operational tooling built alongside client work: lead capture routing, automated sourcing sweeps, and event ops scaffolding.',
    deliverables: [
      'Automated lead generation sweeps across targeted markets',
      'WeasyPrint document generation pipelines for executive briefs',
      'Event ops scaffolding (run-of-show, briefing documents, contact routing)',
      'Operational task operating hubs and automated workflow scripts'
    ]
  }
];

export const PROJECTS: Project[] = [
  {
    id: 'oreos-platform',
    number: '01',
    title: 'OREoS',
    subtitle: 'The marketing workspace that already knows your business.',
    category: 'Agentic & LLM Systems',
    description: 'Autonomous catalog ingestion, cross-channel AI studio, and verified publishing behind tenant-isolated database row security. One-person codebase shipped daily.',
    technologies: ['Next.js 14', 'PostgreSQL (Supabase RLS)', 'LLM Tool Calling', 'PostProxy OAuth', 'Vercel', 'Tailwind CSS'],
    status: 'Live',
    liveUrl: 'https://oreos.online'
  },
  {
    id: 'regwatch-platform',
    number: '02',
    title: 'RegWatch Compliance SaaS',
    subtitle: 'Multi-tenant regulatory intelligence platform covering CBK & ODPC filings.',
    category: 'Agentic & LLM Systems',
    description: 'Built inside MNL Advocates LLP to turn regulatory gazettes into instant, access-controlled semantic insight. Full retrieval pipeline (Voyage AI + Supabase pgvector) secured by a three-role row-level security model so client filings never cross boundaries.',
    technologies: ['Next.js 14', 'Supabase (pgvector + RLS)', 'Voyage AI Embeddings', 'Anthropic Claude API', 'Vercel'],
    status: 'Live',
    liveUrl: 'https://my-portfolio-2-peach-two.vercel.app',
    repoUrl: 'https://github.com/zacharyongeri/regwatch-rag'
  },
  {
    id: 'vertical-agents',
    number: '03',
    title: 'Vertical AI Agents for SME Operators',
    subtitle: 'Production WhatsApp and Claude API agents for clinics, dealerships, and hosts.',
    category: 'Agentic & LLM Systems',
    description: 'Deployed across Kenyan and US markets. Qualifies inbound leads in under 30 seconds with automatic handoff to human operators when out of depth. Narrowly scoped to booking, triage, or stock queries.',
    technologies: ['WhatsApp Business API', 'Claude API', 'Node.js', 'PostgreSQL', 'Webhooks'],
    status: 'Live'
  },
  {
    id: 'forma-brand',
    number: '04',
    title: 'FORMA',
    subtitle: 'DTC apparel brand founded and built from the sourcing layer up.',
    category: 'Ecommerce, Design Through Build',
    description: 'Supplier sourcing locked to S-Shaper (OEKO-TEX certified, 100-unit MOQ), sizing model rebuilt around East African hip proportions, plus full identity system (obsidian, cream, terracotta, nude) and Shopify storefront built before the first unit shipped.',
    technologies: ['Shopify', 'S-Shaper Sourcing', 'Brand Identity System', 'Cormorant Garamond / DM Sans'],
    status: 'In Development'
  },
  {
    id: 'naisole-storefront',
    number: '05',
    title: 'Naisole Storefront',
    subtitle: 'Shopify storefront, design and build executed as a single system.',
    category: 'Ecommerce, Design Through Build',
    description: 'Store designed and developed end-to-end: identity, information architecture, product data model, and conversion path treated as one system rather than four handoffs.',
    technologies: ['Shopify Liquid', 'React', 'Tailwind CSS', 'Conversion UX'],
    status: 'Live'
  },
  {
    id: 'mnl-advocates-migration',
    number: '06',
    title: 'MNL Advocates LLP Platform Migration',
    subtitle: 'Headless rebuild and search rearchitecture for top Nairobi firm.',
    category: 'Web Infrastructure & Search',
    description: 'Migrated web presence to WordPress CMS + Next.js front end on Vercel edge delivery. Rebuilt SEO and AEO from the ground up, structuring practice areas as entities legible to answer engines and search crawlers.',
    technologies: ['Headless WordPress', 'Next.js 14', 'Vercel Edge Network', 'SEO / AEO Entity Schema'],
    status: 'Live'
  }
];

export const EXPERIENCES: Experience[] = [
  {
    id: 'exp-oreos',
    period: 'Founder Build // Live in Production',
    role: 'Founder & Full-Stack Systems Architect',
    company: 'OREoS (oreos.online)',
    description: 'Architecting and operating an autonomous marketing workspace that grounds AI campaigns in live merchant store data with human-in-the-loop publishing.',
    bulletPoints: [
      'Engineered autonomous website and catalog ingestion engine that indexes brand voice, typography, color palettes, and live SKU inventory in under two minutes.',
      'Implemented strict multi-tenant isolation at the Postgres query execution layer via Row-Level Security (RLS) and isolated PostProxy OAuth credential gateway.',
      'Designed server-enforced tool approval architecture (toolApproval: user-approval), preventing unreviewed AI drafts from reaching live social APIs across Instagram, TikTok, LinkedIn, and X.'
    ]
  },
  {
    id: 'exp-1',
    period: 'Present',
    role: 'AI Associate & Product Builder',
    company: 'MNL Advocates LLP',
    description: 'Pioneering full-stack regulatory AI software, headless web infrastructure, and live event operations for a premier Nairobi law firm.',
    bulletPoints: [
      'Pitched, designed, and built RegWatch: end-to-end retrieval pipeline covering Central Bank of Kenya (CBK) and ODPC filings with a three-role Postgres RLS isolation model.',
      'Migrated the firm to a headless WordPress, Next.js, and Vercel stack, rebuilding SEO and AEO from scratch so practice areas read cleanly to search crawlers and AI answer engines.',
      'Owned the operational scaffolding, briefing documents, and WeasyPrint document generation pipeline for the Africa Leadership Circle across the Nairobi summit and Benin breakfast in Cotonou.'
    ]
  },
  {
    id: 'exp-2',
    period: 'Founder Build',
    role: 'Founder & Brand Architect',
    company: 'FORMA',
    description: 'Building a direct-to-consumer apparel brand from the sourcing layer up, designing the full stack of the business before launch.',
    bulletPoints: [
      'Vetted and locked S-Shaper as manufacturing partner with OEKO-TEX certification and a 100-unit minimum order quantity.',
      'Rebuilt sizing models around East African hip body proportions rather than using an inherited size chart.',
      'Designed the full visual identity system (obsidian, cream, terracotta, nude) and Shopify storefront architecture.'
    ]
  },
  {
    id: 'exp-3',
    period: 'Production Deployments',
    role: 'AI Systems & Ecommerce Architect',
    company: 'Vertical AI Agents & Independent Builds',
    description: 'Building narrow AI agents and custom Shopify storefronts for clients across Kenyan and United States markets.',
    bulletPoints: [
      'Deployed conversational agents on WhatsApp Business API and Claude API that qualify inbound leads in under 30 seconds with automatic human handoff.',
      'Designed and developed the Naisole Shopify storefront end-to-end, treating identity, product data model, and conversion path as one system.',
      'Operated internal lead capture routing and automated scheduled lead generation sweeps across targeted ecommerce markets.'
    ]
  },
  {
    id: 'exp-4',
    period: 'Education & Location',
    role: 'AI Native Software Developer',
    company: 'University of Nairobi (Education) // Nairobi, Kenya',
    description: 'Operating remote from Nairobi, UTC+3, holding overlap open for European, United States, and Asia Pacific working hours.',
    bulletPoints: [
      'Education: University of Nairobi.',
      'Domains shipped in: Autonomous marketing workspaces (OREoS), legal and regulatory compliance (RegWatch), DTC apparel & ecommerce (FORMA / Naisole), healthcare clinics, vehicle dealerships, short stay hospitality, professional services.',
      'Stack mastery: Next.js 14, React, TypeScript, Claude API, Voyage AI, Supabase pgvector, Postgres RLS, PostProxy OAuth, Tailwind, Vercel, Shopify.',
      'Agentic Orchestration: Daily expert-level orchestration of Google Antigravity, Claude Code, and OpenAI Codex inside deterministic compiler harnesses for whole-surface engineering.'
    ]
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: 'skills-1',
    category: 'AI & AGENTIC SYSTEMS',
    skills: [
      'Agentic Coding (Antigravity, Claude Code, Codex)',
      'Multi-Agent Harness Orchestration',
      'Claude API & Gemini SDKs',
      'Voyage AI Embeddings',
      'Supabase pgvector & RLS',
      'RAG Pipeline Architecture',
      'Deterministic Evals & AST Linters'
    ]
  },
  {
    id: 'skills-2',
    category: 'APPLICATION & BACKEND',
    skills: [
      'Next.js 14 App Router',
      'React & TypeScript',
      'Node.js & Async Tooling',
      'Supabase & PostgreSQL',
      'Row Level Security (RLS)',
      'Tailwind CSS'
    ]
  },
  {
    id: 'skills-3',
    category: 'COMMERCE & INFRASTRUCTURE',
    skills: [
      'Custom Shopify Storefronts',
      'Product Data Modelling',
      'Supplier Sourcing & Sizing',
      'Vercel Edge Network',
      'Headless WordPress CMS',
      'Core Web Vitals & GA4'
    ]
  },
  {
    id: 'skills-4',
    category: 'SEARCH & INTEGRATIONS',
    skills: [
      'Answer Engine Opt. (AEO)',
      'Schema.org Entity Graphs',
      'Search Console Optimization',
      'WhatsApp Business API',
      'Webhooks & Event Triggers',
      'Scheduled Sourcing Sweeps'
    ]
  }
];

export const BOOKS: Book[] = [
  {
    id: 'book-1',
    title: 'Thinking in Systems: A Primer',
    author: 'Donella H. Meadows',
    year: 2008,
    category: 'Systems & Cybernetics',
    verdict: 'The definitive text on stocks, flows, and delay. Most software engineers fail because they optimize individual components rather than observing feedback latency.',
    impactOnCode: 'Directly dictates OREoS\'s decoupled human approval queue: feedback delay is an architectural invariant that stabilizes the system rather than latency to artificially remove.',
    keyAxiom: 'You cannot understand or govern a system by optimizing the parts in isolation.',
    status: 'Foundational'
  },
  {
    id: 'book-2',
    title: 'Systemantics: The Systems Bible',
    author: 'John Gall',
    year: 1975,
    category: 'Systems & Cybernetics',
    verdict: 'Gall\'s Law is the most unforgiving axiom in computer science: a complex system that works is invariably found to have evolved from a simple system that worked.',
    impactOnCode: 'Why I refuse to build all-in-one general AI assistants. I ship narrow vertical agents (1 channel, 1 transaction) and only widen surface area once handoff rates fall below 5%.',
    keyAxiom: 'A complex system designed from scratch never works and cannot be patched up to make it work.',
    status: 'Deep Re-read'
  },
  {
    id: 'book-3',
    title: 'Antifragile: Things That Gain from Disorder',
    author: 'Nassim Nicholas Taleb',
    year: 2012,
    category: 'Risk & Markets',
    verdict: 'The antidote to fragile corporate engineering. Systems must not merely resist shock; they must possess convex payoffs with bounded downside.',
    impactOnCode: 'Why data-layer isolation lives at Postgres RLS instead of application logic: application filters have fragile downside risk; database RLS policies fail closed.',
    keyAxiom: 'Wind extinguishes a candle and energizes fire. You want to be the fire and wish for the wind.',
    status: 'Foundational'
  },
  {
    id: 'book-4',
    title: 'The Question Concerning Technology',
    author: 'Martin Heidegger',
    year: 1954,
    category: 'Philosophy & Mind',
    verdict: 'Heidegger foresaw that technology is not a neutral collection of machines, but an ontological framing (Gestell) that turns nature and human attention into standing reserve.',
    impactOnCode: 'Informed my writing on Kenya\'s 2026 AI Policy: sovereign compute is geopolitical territory and energy physics, not a cloud subscription abstraction.',
    keyAxiom: 'Technology is an ordering of reality, not merely an instrument.',
    status: 'Deep Re-read'
  },
  {
    id: 'book-5',
    title: 'A Philosophy of Software Design',
    author: 'John Ousterhout',
    year: 2018,
    category: 'Software Craft',
    verdict: 'The sharpest contemporary guide to software complexity. Deep modules (simple interface, powerful internal mechanics) crush shallow layered abstractions.',
    impactOnCode: 'Guides every TypeScript module and domain interface: expose narrow, self-evident APIs while keeping internal state machines deep and unified.',
    keyAxiom: 'Complexity is incremental: it is caused by obscure dependencies and cognitive clutter.',
    status: 'Foundational'
  },
  {
    id: 'book-6',
    title: 'High Output Management',
    author: 'Andrew S. Grove',
    year: 1983,
    category: 'Software Craft',
    verdict: 'Grove treats engineering organizations and software systems as black-box manufacturing lines governed by limiting steps, output indicators, and managerial leverage.',
    impactOnCode: 'Every line of code is measured by leverage: does it remove an uncosted weekly manual bottleneck, or is it decorative vanity?',
    keyAxiom: 'A builder\'s output is the output of the entire operating surface under their influence.',
    status: 'Deep Re-read'
  },
  {
    id: 'book-7',
    title: 'The Mind\'s I: Fantasies on Self & Soul',
    author: 'Douglas Hofstadter & Daniel Dennett',
    year: 1981,
    category: 'Philosophy & Mind',
    verdict: 'An extraordinary dissection of consciousness, recursion, and identity. Anticipated the philosophical hazards of statistical semantic mimicry decades before modern LLMs.',
    impactOnCode: 'Why I never confuse fluent conversational syntax with semantic reasoning. Vector retrieval grounded in hard legal filings must always precede voice tone.',
    keyAxiom: 'Syntax does not equal semantics; conversational fluency is not reasoning.',
    status: 'Foundational'
  },
  {
    id: 'book-8',
    title: 'Poor Charlie\'s Almanack',
    author: 'Charles T. Munger',
    year: 2005,
    category: 'Risk & Markets',
    verdict: 'The gold standard for multidisciplinary mental models and cognitive bias inversion. The best way to achieve reliability is by relentlessly avoiding stupidity.',
    impactOnCode: 'Before writing architecture: list every failure mode (hallucinations, sizing returns, query leaks, DNS timeouts), then design backward from total elimination.',
    keyAxiom: 'Invert, always invert: turn a situation backward to see where disaster hides.',
    status: 'Foundational'
  },
  {
    id: 'book-9',
    title: 'The Mythical Man-Month',
    author: 'Frederick P. Brooks Jr.',
    year: 1975,
    category: 'Software Craft',
    verdict: 'Conceptual integrity is the single most critical factor in software success. One architect holding the whole surface outperforms fragmented committees.',
    impactOnCode: 'The philosophical anchor of "One Person, Whole Surface": identity, data model, checkout path, and server routing designed together leave zero seam friction.',
    keyAxiom: 'Conceptual integrity is the most important consideration in system design.',
    status: 'Foundational'
  },
  {
    id: 'book-10',
    title: 'The Misbehavior of Markets',
    author: 'Benoît B. Mandelbrot',
    year: 2004,
    category: 'Risk & Markets',
    verdict: 'Completely demolishes mild Gaussian bell-curve assumptions in networked phenomena. Fat tails, power laws, and bursty clustering rule real-world traffic.',
    impactOnCode: 'Directly shapes webhook ingestion pipelines and rate limiters: engineer for clustered power-law bursts rather than smooth averages.',
    keyAxiom: 'Extreme variance is the structural norm, not the statistical exception.',
    status: 'Deep Re-read'
  },
  {
    id: 'book-11',
    title: 'Meditations',
    author: 'Marcus Aurelius',
    year: 180,
    category: 'Philosophy & Mind',
    verdict: 'A personal notebook on radical accountability and emotional composure under pressure. Focus exclusively on variables within your locus of architectural control.',
    impactOnCode: 'Failsafe error boundaries and graceful degradation: systems must expect upstream provider crashes and handle them with calm, deterministic state recovery.',
    keyAxiom: 'The impediment to action advances action. What stands in the way becomes the way.',
    status: 'Deep Re-read'
  },
  {
    id: 'book-12',
    title: 'The Design of Everyday Things',
    author: 'Don Norman',
    year: 1988,
    category: 'Systems & Cybernetics',
    verdict: 'A rigorous thesis on affordances, signifiers, and feedback loops. If an operator commits a catastrophic blunder, the system\'s affordance model is to blame.',
    impactOnCode: 'Why destructive social dispatches in OREoS cannot be triggered via implicit prompts. The interface requires an unambiguous, authenticated review card affordance.',
    keyAxiom: 'Rule out human catastrophe by eliminating ambiguous system affordances.',
    status: 'Reference'
  }
];

