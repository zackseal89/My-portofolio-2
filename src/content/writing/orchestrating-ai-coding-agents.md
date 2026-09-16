---
title: Orchestrating Autonomous Coding Agents: Lessons from Daily Production with Antigravity, Claude Code, and Codex
type: Essay
category: AI & Agentic Systems
date: 2026-09-12
venue: Technical Essays
summary: The difference between toy AI demos and production engineering is harness architecture. How I orchestrate Antigravity, Claude Code, and Codex daily to hold whole software surfaces as a single engineer without architectural decay.
---

# Orchestrating Autonomous Coding Agents: Lessons from Daily Production with Antigravity, Claude Code, and Codex

Most developers using AI today are stuck in the **amateur loop**: they open a chat box, type a loose natural language prompt ("build me an auth system"), watch the model generate 300 lines of unverified boilerplate, and spend the next three hours debugging subtle edge-case hallucinations.

When they get frustrated, they blame the model.

I run software systems from empty repositories to multi-tenant production deployments (like OREoS at `oreos.online`, RegWatch, and custom commerce storefronts). I write code every single day using **Google Antigravity**, **Claude Code**, and **OpenAI Codex**. I do not treat these tools as autocomplete gimmicks or conversational chatbots. 

I treat them as **high-throughput, non-deterministic workers operating inside a strictly deterministic harness**.

Here is my operational playbook for orchestrating AI coding agents at expert speed without sacrificing conceptual integrity.

---

## The Triad: How I Choose the Right Tool for the Job

![Multi-Agent Dev Orchestration: Antigravity, Claude Code & Codex in Production](/assets/images/multi-agent-triad-matrix.jpg)

Different coding agents possess fundamentally different mechanical profiles. Forcing one tool into every task creates friction. My daily stack divides responsibilities across three complementary engines:

### 1. Google Antigravity: The Full-Surface Multi-Agent Architect
- **Strengths:** Workspace-wide semantic comprehension, strict separation between Planning Mode and Execution, subagent delegation, and reactive event-driven wakeups.
- **When I use it:** Multi-file architectural refactors, systemic audits, schema migrations, and tasks requiring autonomous research across hundreds of files without context drift. Antigravity's ability to plan first, lock invariants, and spawn targeted subagents makes it my primary engine for whole-surface engineering.

### 2. Claude Code: The Terminal-Native Deep Reasoner
- **Strengths:** Terminal-speed autonomous loops, razor-sharp AST line-range editing, and deep algorithmic debugging.
- **When I use it:** Command-line debugging, tight git-diff reviews, targeted performance bottlenecks, and rapid terminal-centric feature spikes where I want an agent to read stderr, grep the codebase, and patch in seconds.

### 3. OpenAI Codex & Inline Model Inference: High-Velocity Mechanical Synthesis
- **Strengths:** Millisecond token generation, deterministic pattern repetition, and syntactic translation.
- **When I use it:** In-file boilerplate expansion, repetitive typing schemas, translation between data structures, and localized function implementations where the interface is already mathematically defined.

---

## Rule 1: Harness Over Model (Compilers as Sensory Organs)

![Autonomous Agentic Coding Harness: The Triad Orchestration](/assets/images/agentic-coding-harness.jpg)

An AI agent has no innate sense of physical ground truth. If you ask an LLM whether its code works, it will confidently answer "yes" while referencing deprecated APIs or mismatched import symbols.

The fundamental rule of agentic coding is: **Never rely on the agent's self-assessment. Let the deterministic compiler be its eyes.**

- **TypeScript Strict Mode (`tsc --noEmit`):** Every TypeScript interface acts as a formal boundary. If the agent changes a property type in `src/types.ts`, the compiler immediately lights up every broken call site across the entire repository.
- **Strict Linting & AST Diffing:** Disallow arbitrary full-file rewrites. Force agents to use line-bounded replacements (`replace_file_content` with exact line matches). This prevents lazy overwrites, preserving existing edge-case logic and comments.
- **Zero-Prose Error Correction:** When an agent produces a compilation or test failure, do not write a paragraph explaining what went wrong. Pipe the raw `stdout` and `stderr` directly into its context. LLMs parse structured compiler diagnostics orders of magnitude more accurately than ambiguous human English.

---

## Rule 2: Separate the Architect (Planning) from the Builder (Execution)

In classical engineering, the person drafting the blueprint does not weld the steel beams simultaneously without measuring. In agentic engineering, **Planning Mode is sacred**.

Before allowing an agent to modify a single file:
1. **Discovery & Exploration:** The agent must inspect existing schemas, data flows, and active constraints using read-only tools.
2. **Explicit Implementation Plan:** The agent must write an implementation plan specifying:
   - User Review items & breaking invariants
   - Exactly which files are `[MODIFY]`, `[NEW]`, or `[DELETE]`
   - Automated verification commands (`npm run build`, unit tests)
3. **Approval Gate:** The human architect reviews the plan. Once approved, the agent executes with laser focus.

This two-phase workflow eliminates 90% of architectural debt before a single byte of code is committed.

---

## Rule 3: Compact Context Beats Massive Context Windows

Modern models advertise 1-million-token context windows. Amateurs interpret this as an invitation to dump entire codebases, documentation dumps, and chat logs into the context.

This is a disastrous mistake. **Attention is a finite resource.** As context swells, attention dilution sets in: the model misses subtle edge cases, forgets earlier instructions, and exhibits instruction drift.

My rules for context hygiene:
- **Slice, don't dump:** Read files in 50-to-100 line slices around relevant symbols rather than loading 1,000-line monoliths.
- **Compact state at milestones:** When an architectural milestone completes, compact the conversation history into a concise summary of settled decisions, invariants, and next steps.
- **Reference Schemas, Not Tutorials:** Pass formal TypeScript types and Zod schemas into the agent prompt. An interface definition communicates more precision in 20 tokens than four paragraphs of prose.

---

## Rule 4: Subagent Decomposition (Divide and Conquer)

A monolithic agent asked to "build an auth flow, configure Stripe webhooks, design a responsive modal, and write integration tests" will degrade in quality on the later steps.

Expert orchestration decomposes tasks into specialized, single-responsibility subagents:
- **Subagent A (Data Modeling):** Focuses strictly on the database migration, Postgres RLS policies, and TypeScript interfaces.
- **Subagent B (UI / Presentation):** Consumes the types and builds the responsive component with strict accessibility and design tokens.
- **Subagent C (Verification & E2E):** Runs the dev server, spins up the headless browser, verifies rendering, and captures screenshots or logs.

Because each subagent has a clean, focused context window, hallucination rates drop to near zero.

---

## Rule 5: The Human Remains the Chief Invariant Holder

The dream of "fully autonomous zero-human engineering" is a dangerous illusion for any system where downtime or data leaks carry real financial consequences.

In my practice:
- **Agents propose; humans audit.** Live database migrations, destructive git rebases, OAuth credentials, and production deployments always require explicit human sign-off.
- **Conceptual Integrity:** Frederick Brooks wrote in *The Mythical Man-Month* that conceptual integrity is the most important consideration in system design. Ten engineers produce seam friction; one engineer holding the whole surface with a triad of orchestrated agents produces a unified, cohesive system.

This is why I can operate as **One Person, Whole Surface**: identity, data model, backend RLS, and frontend UX designed and shipped seamlessly by one operator wielding agentic orchestration at peak leverage.
