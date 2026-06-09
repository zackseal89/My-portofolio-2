/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { CaseStudy, Service, Project, Experience, SkillCategory } from './types';

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'speed-to-lead',
    number: '01',
    title: 'Autonomous Lead Triage Engine',
    subtitle: 'Shortening customer response time from 3 hours to 14 seconds.',
    category: 'Autonomous Workflows',
    description: 'An AI-powered inbound logic router that parses complex merchant inquiries, classifies purchasing intent, generates custom personalized context-aware replies, and notifies internal teams on specific priority channels.',
    metricValue: '94%',
    metricLabel: 'Lead Response Acceleration',
    duration: '4 Weeks',
    role: 'Principal Systems Architect',
    technologies: ['React', 'Node.js', 'Google Gemini API', 'Vector Search', 'Slack API'],
    challenge: 'A high-growth enterprise SaaS provider struggled with lead drop-offs because manual triage of incoming support tickets and sales inquiries took hours, causing hot prospects to go cold.',
    solution: 'Designed and deployed an agentic intake loop that pulls unassigned queries, uses custom system instructions to extract core needs, assesses lead quality scores, drafts high-precision replies, and instantly forwards routing alerts.',
    workflowSteps: [
      { title: 'Inquiry Ingestion', description: 'Triggers on incoming contact form submission or webhook API call.', status: 'completed' },
      { title: 'Gemini Classification', description: 'Semantic intent grouping, sentiment scoring, and urgency ranking.', status: 'active' },
      { title: 'Response Drafting', description: 'Dynamic drafting based on knowledge base facts & past high-performing replies.', status: 'pending' },
      { title: 'CRM/Slack Notification', description: 'Pushes notification to appropriate representative with drafted context.', status: 'pending' }
    ]
  },
  {
    id: 'aov-optimization',
    number: '02',
    title: 'Custom E-Commerce System AOV Optimizer',
    subtitle: 'Deploying recommendation engines & personalizing checkout flows.',
    category: 'Custom E-Commerce Systems',
    description: 'A headless e-commerce optimization layer that tracks cart contents, real-time user browsing telemetry, and historical order profiles to serve high-intent relevant bundle upsells during payment setup.',
    metricValue: '3.5x',
    metricLabel: 'Checkout Funnel Velocity',
    duration: '6 Weeks',
    role: 'Lead Full-Stack Shopify developer',
    technologies: ['Vite', 'GraphQL', 'NextJs', 'D3.js', 'Node.js', 'Stripe Systems'],
    challenge: 'An editorial luxury apparel brand had high traffic but low checkout basket sizes (AOV), with traditional recommendation widgets clashing with their minimalist and strict visual standards.',
    solution: 'Engineered an elegantly integrated, fast-loading, zero-layout-shift micro-upsell architecture. By predicting cross-sell opportunities with zero aesthetic noise, users were prompted with single-click matching accessories.',
    workflowSteps: [
      { title: 'Cart Analysis', description: 'Inspects items, sizing metadata, and editorial aesthetic collections.', status: 'completed' },
      { title: 'Aesthetic Matching', description: 'Pairs complementary products that respect strict collection guidelines.', status: 'active' },
      { title: 'Frictionless Upsell Offer', description: 'Renders in-checkout micro-inputs without secondary reloading steps.', status: 'pending' },
      { title: 'AOV Re-calculation', description: 'Pushes conversion telemetry directly to the metrics analytics system.', status: 'pending' }
    ]
  },
  {
    id: 'agentic-pipelines',
    number: '03',
    title: 'Automated Intelligence & Agentic AI Pipelines',
    subtitle: 'Replacing repetitive supply chains with self-improving code loops.',
    category: 'Agentic AI Pipelines',
    description: 'An autonomous agentic cluster that scans supplier inventory databases, alerts buyers of low reserves, queries wholesale trade sites to compile price alternatives, drafts email requests, and updates records.',
    metricValue: '120h',
    metricLabel: 'Weekly Manual Hours Saved',
    duration: '8 Weeks',
    role: 'AI Systems Engineer',
    technologies: ['Google Workspace API', 'Express', 'Gemini SDK', 'Cron Scheduler', 'PostgreSQL'],
    challenge: 'A large e-commerce wholesaler spent 40+ hours per week manually auditing inventory reports, contacting suppliers, comparing CSV files, and resolving stock discrepancies inside complex legacy software.',
    solution: 'Formed a self-correcting agent loop that detects discrepancies automatically, searches alternative supplier portals, drafts ready-to-send purchase agreements, and flags high-risk anomalies for human authorization.',
    workflowSteps: [
      { title: 'Database Scanning', description: 'Scans inventory status tables for items falling beneath threshold limits.', status: 'completed' },
      { title: 'Alternative Search', description: 'Queries wholesalers, checks contracts, and aggregates price options.', status: 'completed' },
      { title: 'Auto-Drafting', description: 'Compiles a brief, writes natural-language supply proposals for review.', status: 'active' },
      { title: 'Human-in-the-loop Gate', description: 'Prompts of potential savings while awaiting a single click tap approval.', status: 'pending' }
    ]
  }
];

export const SERVICES: Service[] = [
  {
    id: 'service-1',
    number: '01',
    title: 'Autonomous Workflow Design',
    description: 'Eliminating repetitive back-office and marketing tasks with intelligent multi-agent systems that connect your existing platforms seamlessly.',
    deliverables: [
      'Tailored Agent Architectures',
      'Integration with CRMs (Salesforce, HubSpot)',
      'Automated email & chat triage systems',
      'Custom Slack / Teams Command Hubs'
    ]
  },
  {
    id: 'service-2',
    number: '02',
    title: 'High-Conversion E-Commerce Dev',
    description: 'Building custom head-turning storefronts and checkout workflows optimized for maximum basket value, fast loading times, and zero customer friction.',
    deliverables: [
      'Headless Shopify / Custom storefront architectural systems',
      'One-click Stripe & custom payment checkouts',
      'Sophisticated upsell & bundling flow integrations',
      'High-end visual layout implementations'
    ]
  },
  {
    id: 'service-3',
    number: '03',
    title: 'Agentic GenAI Integration',
    description: 'Deep, reliable integration of large language models directly into your business core, focusing on deterministic outcomes, precise search, and secure execution.',
    deliverables: [
      'Gemini API server-side routing',
      'Retrieval Augmented Generation (RAG) system modules',
      'High-confidence semantic parsers',
      'Human-in-the-loop review guardrails'
    ]
  }
];

export const PROJECTS: Project[] = [
  {
    id: 'headless-checkout-engine',
    number: '01',
    title: 'Omnichannel Headless Checkout Engine',
    subtitle: 'Low-latency Stripe checkout optimizing checkout speed & cart-level sales conversion.',
    description: 'A high-performance custom billing system built to replace heavy visual widgets with pristine micro-actions. Features live telemetry parsing, single-click payment logic routing, and instantaneous currency recalculations on the fly.',
    technologies: ['Vite', 'GraphQL', 'Next.js', 'Stripe Payments', 'D3.js'],
    liveUrl: 'https://ais-pre-2dh3i6sdmzuqats6vbzd2o-24581161265.europe-west2.run.app',
    repoUrl: 'https://github.com/zacharyongeri/headless-checkout',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'gemini-knowledge-rag',
    number: '02',
    title: 'Multi-Agent Knowledge Retrieval Cluster',
    subtitle: 'Decentralized document parser & prompt cluster utilizing server-side Gemini engines.',
    description: 'An autonomous pipeline capable of ingesting scattered CSV, JSON, and text resources dynamically. Evaluates content semantic structures, builds clean topic vectors, and offers high-fidelity contextual chat streams.',
    technologies: ['Google GenAI SDK', 'VectorDB', 'Express', 'TypeScript', 'Node.js'],
    liveUrl: 'https://ais-pre-2dh3i6sdmzuqats6vbzd2o-24581161265.europe-west2.run.app',
    repoUrl: 'https://github.com/zacharyongeri/gemini-rag-agent',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'solana-arbitrage-node',
    number: '03',
    title: 'Solana Autonomous Arbitrage Node',
    subtitle: 'Lightning-fast automated trade logic engine executing complex graph traversals.',
    description: 'A dedicated multi-agent script cluster that analyzes pool states, resolves cross-exchange pricing differentials in milliseconds, formats raw binary data payloads, and commits optimized arbitrage transaction sets.',
    technologies: ['Rust', 'Node.js', 'WebSockets', 'PostgreSQL', 'D3.js'],
    liveUrl: 'https://ais-pre-2dh3i6sdmzuqats6vbzd2o-24581161265.europe-west2.run.app',
    repoUrl: 'https://github.com/zacharyongeri/solana-arb-agent',
    image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=600&auto=format&fit=crop'
  }
];

export const EXPERIENCES: Experience[] = [
  {
    id: 'exp-1',
    period: '2024 — Present',
    role: 'Principal AI Systems Architect',
    company: 'RevenueLab Engineering',
    description: 'Pioneered enterprise autonomous intelligence pipelines and secure multi-agent systems.',
    bulletPoints: [
      'Engineered automated inbound logic router with Gemini API processing over 25,000 corporate leads, reducing reply times to under 15 seconds.',
      'Constructed distributed inventory tracking crawlers preventing stock-outs for critical supply components worth $8M+.',
      'Deployed strict server-side vector integrations safeguarding business credential keys behind custom Express proxy layers.'
    ]
  },
  {
    id: 'exp-2',
    period: '2022 — 2024',
    role: 'Senior Full-Stack Shopify Architect',
    company: 'Editorial Brand Studios',
    description: 'Developed highly optimized bespoke checkout apps for premium consumer luxury brands.',
    bulletPoints: [
      'Crafted custom GraphQL storefront modules with single-click payment upsell logic driving Average Order Value increases of 28%.',
      'Refactored legacy template layouts with clean tailwind architectures, yielding a 3.5x reduction in visual layout shifts.',
      'Achieved average sub-second checkout loading times running on distributed micro-frontends.'
    ]
  },
  {
    id: 'exp-3',
    period: '2020 — 2022',
    role: 'AI Integrations & Middleware Specialist',
    company: 'Gemini Solutions Group',
    description: 'Authored communication pipelines connecting legacy databases with agentic large language models.',
    bulletPoints: [
      'Developed high-fidelity semantic parsing routines parsing complex raw incoming merchant webhook files.',
      'Designed chronological cron loops in Node.js analyzing wholesale distributor prices.',
      'Configured secure cloud database architectures utilizing robust state logging constraints.'
    ]
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: 'skills-1',
    category: 'AI & SYSTEM ORCHESTRATION',
    skills: [
      'Google Gemini API SDK',
      'Autonomous Multi-Agent Networks',
      'Vector Databases & Indexing',
      'Prompt Optimization Engineering',
      'Semantic Text-to-SQL Parsing',
      'Human-in-the-Loop Safeguards'
    ]
  },
  {
    id: 'skills-2',
    category: 'FULL-STACK INFRASTRUCTURE',
    skills: [
      'React & Vite SPAs',
      'Express & Node.js Servers',
      'GraphQL & Headless APIs',
      'Drizzle ORM & SQL Dialects',
      'Docker & Containerized Runtimes',
      'WebSockets Real-time Triggers'
    ]
  },
  {
    id: 'skills-3',
    category: 'REVENUE CORE SYSTEMS',
    skills: [
      'Stripe Payment Gateway Suite',
      'Headless Shopify Systems',
      'Dynamic Upsell Implementations',
      'E-Commerce Retention Engines',
      'Telemetry & Metric Dashboards',
      'Cron Scheduled Automations'
    ]
  }
];
