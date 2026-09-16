/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface BuildDecision {
  id: string;
  number: string;
  title: string;
  summary: string;
  quote: string;
  rationale: string;
}

export interface AgentBuildStep {
  stepNumber: number;
  title: string;
  description: string;
}

export interface EngagementShape {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  deliverables: string[];
}

export interface SprintWeek {
  phase: string;
  title: string;
  description: string;
}

export interface Project {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  technologies: string[];
  status: 'Live' | 'In Development' | 'Client Work';
  category?: string;
  liveUrl?: string;
  repoUrl?: string;
}

export interface Experience {
  id: string;
  period: string;
  role: string;
  company: string;
  description: string;
  bulletPoints: string[];
}

export interface SkillCategory {
  id: string;
  category: string;
  skills: string[];
}

export interface CaseStudy {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  category: string;
  description: string;
  metricValue: string;
  metricLabel: string;
  duration: string;
  role: string;
  technologies: string[];
  challenge: string;
  solution: string;
  workflowSteps: {
    title: string;
    description: string;
    status: 'pending' | 'active' | 'completed';
  }[];
}

export interface Service {
  id: string;
  number: string;
  title: string;
  description: string;
  deliverables: string[];
}

// A single essay, article, or book, sourced at build time from a
// markdown file in src/content/writing/. See that folder's README
// for the frontmatter format. Nothing here is hand-typed into this
// file; add a new .md file and it appears automatically.
export interface WritingPiece {
  slug: string;
  title: string;
  type: 'Essay' | 'Article' | 'Book';
  venue: string;
  date: string;
  category?: string;
  readTime?: string;
  url?: string;
  blurb: string;
  content?: string;
}

export interface LeadSubmission {
  id: string;
  name: string;
  email: string;
  message: string;
  classification?: string;
  confidence?: number;
  routedTo?: string;
  loading?: boolean;
}

export interface Book {
  id: string;
  title: string;
  author: string;
  year: number;
  category: 'Systems & Cybernetics' | 'Philosophy & Mind' | 'Risk & Markets' | 'Software Craft';
  verdict: string;
  impactOnCode: string;
  keyAxiom: string;
  status: 'Deep Re-read' | 'Foundational' | 'Reference';
}

