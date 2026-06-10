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
    subtitle: 'Moving regulatory compliance from manual tracking to instant semantic RAG insights.',
    category: 'AI SaaS / RAG Platform',
    description: 'A regulatory intelligence platform with a full RAG pipeline: document ingestion, semantic chunking and embedding, vector search, and AI-generated compliance insights. Built end-to-end as a working product and demonstrated at a flagship industry summit.',
    metricValue: 'LIVE SUMMIT',
    metricLabel: 'Working SaaS System',
    duration: '6 Weeks',
    role: 'AI Associate & Product Builder',
    technologies: ['Next.js 14', 'Supabase (pgvector)', 'Voyage AI Embeddings', 'Anthropic Claude API', 'Vercel Edge Functions'],
    challenge: 'Legal and compliance teams in East Africa track complex regulatory change manually — a process that is slow, highly error-prone, and expensive.',
    solution: 'Designed and engineered an automated web software portal that ingests legislative PDFs, generates precision embeddings, stores index vectors, and allows natural-language compliance querying with complete text audits.',
    workflowSteps: [
      { title: 'Document Ingestion', description: 'Triggers on incoming regulatory gazettes or custom legislative pdf files in backend pipelines.', status: 'completed' },
      { title: 'Voyage Semantic Chunking', description: 'Splits text dynamically and encodes chunks using Voyage AI models.', status: 'completed' },
      { title: 'Vector Query Routing', description: 'Calculates floating cosine distance against Supabase pgvector datasets on live lookups.', status: 'active' },
      { title: 'Claude Compliance Synthesis', description: 'Synthesizes bulletproof insight responses cross-referenced with true document citations.', status: 'pending' }
    ]
  },
  {
    id: 'nairobi-sole',
    number: '02',
    title: 'Nairobi Sole E-Commerce',
    subtitle: 'Nairobi\'s premium sneaker storefront built on Shopify and operated from the founder\'s seat.',
    category: 'Ecommerce / Shopify',
    description: 'The complete stack of a live sneaker ecommerce operation. Engineered custom storefront code, mapped competitive pricing tactics, and formulated supplier CRMs alongside Notion-based founder roadmaps.',
    metricValue: 'FNDR OPERATOR',
    metricLabel: 'Nairobi Sole Store Owner',
    duration: 'Continuous',
    role: 'Founder & Operator',
    technologies: ['Shopify', 'Lovable.dev', 'Notion Operating Hubs', 'Supplier CRM'],
    challenge: 'Operating a sneaker sneaker business in East Africa requires solving price-and-trust sensitivities, tracking volatile customer demand signals, and running lean warehouse operations.',
    solution: 'Built a sleek storefront design coupled with Notion-based operational modules to control purchase flows, supplier details, track pricing metrics, and organize 90-day execution sprints.',
    workflowSteps: [
      { title: 'Storefront Launch', description: 'Highly responsive custom product category layout optimized for speed over mobile Safari screens.', status: 'completed' },
      { title: 'Supplier CRM Integration', description: 'Aggregated central hub with size levels and supplier purchase registers.', status: 'completed' },
      { title: 'Dynamic Price Tracker', description: 'Calculates price elasticity and matches local sneaker market valuations.', status: 'active' },
      { title: '90-Day Strategy Sprints', description: 'Translates conversion rate analytics directly to programmatic supplier ordering logs.', status: 'pending' }
    ]
  },
  {
    id: 'mnl-advocates',
    number: '03',
    title: 'MNL Advocates LLP Transformation',
    subtitle: 'Migrating digital law firm architecture to sub-second headless load velocity and active content engines.',
    category: 'Web Architecture / SEO / Content Engine',
    description: 'Migrated MNL Advocates LLP\'s digital infrastructure to a headless web architecture, resolved complex legacy DNS profiles, executed deep SEO rewrites, and built a thought-leadership content engine covering critical Kenyan policy (Finance Bill).',
    metricValue: 'SUB-SEC',
    metricLabel: 'Headless Portal Load Time',
    duration: '8 Weeks',
    role: 'AI & Digital Architect',
    technologies: ['Headless WordPress CMS', 'Next.js', 'Vercel Serverless', 'DNS Routing Control', 'SEO Optimization'],
    challenge: 'A respected law firm had laggy legacy WordPress pages, unresolved host record conflicts, and lacked a content machine matching its elite market authority.',
    solution: 'Separated the content administration panel via a decoupled headless architecture, rebuilt host DNS mappings, and drafted a high-impact policy thought-leadership blueprint designed for both human readers and AI citation search.',
    workflowSteps: [
      { title: 'DNS & Hosting Rectification', description: 'Audited and consolidated scattered nameserver records to eliminate routing handoff delays.', status: 'completed' },
      { title: 'Headless Next.js Hook', description: 'Fitted decoupled WordPress JSON feeds to superfast static react screens.', status: 'completed' },
      { title: 'SEO Blog Refactoring', description: 'Rewrote archive logs to embed strict semantic headers and metadata blocks.', status: 'completed' },
      { title: 'AEO Engine Indexing', description: 'Structured answers to make MNL Advocates content highly citeable by Perplexity & ChatGPT.', status: 'active' }
    ]
  },
  {
    id: 'whatsapp-sme-agents',
    number: '04',
    title: 'SME WhatsApp AI Agents',
    subtitle: 'Answering WhatsApp inquiries in 30 seconds and booking appointments while you sleep.',
    category: 'AI Agents / Conversational Commerce',
    description: 'Vertical-specific WhatsApp AI agents tailored for East African SMEs — dental clinics (appointments), car dealerships (inventories), and Airbnb hosts (guest communications). Instantly processes text, qualifies leads, and coordinates booking.',
    metricValue: '30 SEC',
    metricLabel: 'Average Auto Reply Speed',
    duration: '4 Weeks',
    role: 'AI Systems Engineer',
    technologies: ['WhatsApp Business API', 'Claude API', 'Node.js Express', 'Scheduling System Integrations'],
    challenge: 'For East African SMEs, WhatsApp is the default digital storefront — but operators cannot reply fast enough 24/7, losing massive volumes of high-intent leads.',
    solution: 'Constructed an endpoint webhook router that grabs incoming mobile message streams, triggers prompt guardrails loaded with business parameters, checks reservation times, and initiates booking.',
    workflowSteps: [
      { title: 'Meta Webhook Hookup', description: 'Processes JSON text packets on immediate incoming WhatsApp Business API events.', status: 'completed' },
      { title: 'Prompt Scaffolding', description: 'Controls model responses to strictly focus on clinic, host, or dealer rules without hallucinations.', status: 'completed' },
      { title: 'API Calendar Bridge', description: 'Looks up active database timeslots to identify real-time reservation gaps.', status: 'active' },
      { title: 'Human Handshake Escalation', description: 'Pushes alert to real operator Slack/WhatsApp when client asks for critical resolution.', status: 'pending' }
    ]
  }
];

export const SERVICES: Service[] = [
  {
    id: 'service-1',
    number: '01',
    title: 'AI Agents & Agentic Workflows',
    description: 'Custom AI systems that act as autonomous back-office operators: lead response, instant customer operations, programmatic research, and structured document pipelines.',
    deliverables: [
      'Tailored Claude / Gemini Agent Architectures',
      'n8n / Relevance AI automation workflows',
      'Supabase pgvector / Voyage AI semantic RAG modules',
      'WhatsApp Business API conversational lead integrations'
    ]
  },
  {
    id: 'service-2',
    number: '02',
    title: 'AI-Powered Campaigns & Marketing',
    description: 'Programmatic campaign infrastructures combining natural-language generation, audience intelligence monitors, and automated workflow triggers.',
    deliverables: [
      'Scale automated content generation pipelines',
      'Social listening systems & automated alerts (TinyFish)',
      'Programmatic Google Ads / Meta Ads campaigns',
      'Secure Outlook & email campaign engines at scale'
    ]
  },
  {
    id: 'service-3',
    number: '03',
    title: 'SEO + AEO (Answer Engine Optimization)',
    description: 'Ranking your brand on Google and ensuring your organization is actively cited by ChatGPT, Claude, and Perplexity when potential clients seek answers.',
    deliverables: [
      'Comprehensive content architecture structural audits',
      'Optimization to win Perplexity & Assistant citations',
      'Thought-leadership content engine policy frameworks',
      'Strict semantic structure tagging for Google search engines'
    ]
  },
  {
    id: 'service-4',
    number: '04',
    title: 'Shopify Dev & Ecommerce Systems',
    description: 'Bespoke Shopify store builds, operational tracking portals, and supplier CRMs engineered by an active sneaker store owner who knows daily operations.',
    deliverables: [
      'Bespoke Shopify theme implementations and setups',
      'Notion Founder OS workspace and task operating hubs',
      'CentralIZED supplier inventory tracking dashboards',
      'Price elasticity analysis calculators and volume monitors'
    ]
  }
];

export const PROJECTS: Project[] = [
  {
    id: 'regwatch-platform',
    number: '01',
    title: 'RegWatch Compliance SaaS',
    subtitle: 'RAG policy platform taking complex legalese and churning precise automated audits.',
    description: 'Built inside MNL Advocates LLP to transform how companies track regulatory updates in East Africa. Integrates custom server-side document parsing, semantic index chunking, and secure natural-language workspace chats.',
    technologies: ['Next.js 14', 'Supabase (pgvector)', 'Voyage AI Embeddings', 'Anthropic Claude API', 'Vercel'],
    liveUrl: 'https://ais-pre-2dh3i6sdmzuqats6vbzd2o-24581161265.europe-west2.run.app',
    repoUrl: 'https://github.com/zacharyongeri/regwatch-rag',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'nairobi-sole-shopify',
    number: '02',
    title: 'Nairobi Sole Store',
    subtitle: 'Sleek premium Shopify sneaker store built and managed daily from the operator seat.',
    description: 'Our in-house commerce proof point. Features an optimized responsive layout built on top of the Kenyan sneaker landscape, tied with precise pricing strategies, Notion tracking, and automated supplier logs.',
    technologies: ['Shopify Portal', 'Lovable.dev', 'Notion operating structures', 'Supplier Tracker'],
    liveUrl: 'https://naisole.store',
    repoUrl: 'https://github.com/zacharyongeri/nairobi-sole',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'whatsapp-ai-verticals',
    number: '03',
    title: 'Kenyan WhatsApp Lead Agents',
    subtitle: 'Conversational SME templates qualifying prospects and scheduling clinics automatically.',
    description: 'Immediate agent systems responding to clients on clinics, hosts, and dealerships under 30 seconds. Bridges automated schedules directly to SME admin notifications.',
    technologies: ['WhatsApp Business API', 'Claude API', 'Express Server', 'Google Calendar API'],
    liveUrl: 'https://ais-pre-2dh3i6sdmzuqats6vbzd2o-24581161265.europe-west2.run.app',
    repoUrl: 'https://github.com/zacharyongeri/whatsapp-leads-agents',
    image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=600&auto=format&fit=crop'
  }
];

export const EXPERIENCES: Experience[] = [
  {
    id: 'exp-1',
    period: '2024 — Present',
    role: 'Lead AI Engineer & Associate',
    company: 'MNL Advocates LLP',
    description: 'Pioneered full-stack regulatory AI software and resolved DNS infrastructure pipelines from the ground up.',
    bulletPoints: [
      'Pitched and built RegWatch, taking it from whitepaper concept to a live RAG intelligence SaaS summit platform.',
      'Refactored legacy network host files and migrated site to headless Next.js, raising speed metrics drastically.',
      'Developed SEO/AEO frameworks covering major policy shifts like Finance Bill 2026 to capture high-authority organic search citations.'
    ]
  },
  {
    id: 'exp-2',
    period: '2023 — Present',
    role: 'Founder & E-Commerce Operator',
    company: 'Nairobi Sole',
    description: 'Built and operated a live sneaker commerce brand in East Africa, mastering unit economics and supply.',
    bulletPoints: [
      'Built a high-performance custom Shopify storefront driving checkout funnel engagement and sneaker inquiries.',
      'Designed Notion Founder OS tracking supplier lists, pricing strategy sheets, and running regular 90-day sprints.',
      'Integrated live customer purchase and demand routers resulting in seamless shipping coordination across Nairobi.'
    ]
  },
  {
    id: 'exp-3',
    period: '2021 — 2023',
    role: 'AI Systems Developer (Freelance)',
    company: 'East Africa Systems Integrations',
    description: 'Consulted and authored automated CRM and messaging applications for growth-focused SMEs.',
    bulletPoints: [
      'Engineered productized WhatsApp Business API booking bots for clinics and car dealerships, driving 30-sec lead speed.',
      'Integrated server-side Claude API orchestration workflows connecting multi-agent logic layers in Node.js Express.',
      'Drafted secure programmatic ad audience lists and email campaigns to optimize client marketing conversions.'
    ]
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: 'skills-1',
    category: 'AI ENGINE INTEGRATION',
    skills: [
      'Claude & Gemini API SDKs',
      'Semantic Vector RAG Pipelines',
      'Supabase pgvector Indexes',
      'Voyage AI Sentiment Models',
      'Prompt Scaffolding & Guards',
      'WhatsApp Business API Webhooks'
    ]
  },
  {
    id: 'skills-2',
    category: 'COMMERCE & SEO ARCHITECT',
    skills: [
      'Custom Shopify Development',
      'Notion Founder OS Systems',
      'Headless WordPress Hubs',
      'SEO / Semantic Link Audits',
      'AEO AI Citation Optimization',
      'Google Mail Operational Pipelines'
    ]
  },
  {
    id: 'skills-3',
    category: 'FULL-STACK COMPOSITION',
    skills: [
      'Next.js 14 / Vite React SPAs',
      'Express & Node.js Backends',
      'Vercel Serverless Functions',
      'DNS Records & Hosting Audits',
      'GraphQL & Headless APIs',
      'Multi-Agent System Orchestration'
    ]
  }
];
