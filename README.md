# Zachary Ongeri, Systems Builder Portfolio

A high-performance, minimalist portfolio website showcasing Zachary Ongeri's systems integrations, autonomous agentic workflows, and headless e-commerce engineering.

Built as a purely static, multi-page client-side application using **React (Vite)**, **React Router**, **TailwindCSS**, and **Framer Motion**. There is no backend: no server, no database, no auth provider. Nothing runs behind this site except the CDN serving it.

---

## Technical Overview & Architecture

- **Frontend**: A React SPA with real client-side routing (React Router), bundled by Vite and served globally via CDN for sub-second page loads.
- **Pages**: Home, Projects, About, Services, Books, and Contact each have their own URL. `vercel.json` rewrites unmatched paths to `index.html` so deep links and refreshes work correctly.
- **AI Chatbot (INTEGRA-1)**: Operates entirely client-side using a simulated systems-intelligence response engine. No API keys, no server calls, zero cost.
- **Contact & Lead Capture**: There is no database. Submitting a form builds a pre-filled `mailto:` link and hands it to the visitor's own email client, addressed directly to Zachary. Nothing is stored server-side.
- **Deployment**: Configured for simple static hosting on Vercel with SPA routing fallbacks.

---

## Featured Sections

- **Case Studies**: Autonomous workflows, headless e-commerce, and agentic pipelines, each with an interactive pipeline simulator.
- **Projects**: Live demos and source links for shipped work.
- **Books I've Read**: A reading log, not a syllabus. Philosophy, systems thinking, and markets, with unfiltered verdicts.
- **Contact**: A form that opens your email client. No middleman.

---

## Repository Structure

```
├── src/
│   ├── components/        # Header, Footer, modals, chatbot, shared UI
│   ├── pages/              # One component per route (Home, Projects, About, Services, Books, Contact, 404)
│   ├── layouts/
│   │   └── RootLayout.tsx  # Header/Footer/modal shell wrapping every route
│   ├── context/
│   │   └── UIContext.tsx   # Shared contact-dialog and case-study-modal state
│   ├── lib/
│   │   └── contact.ts      # mailto: helper, the entire "backend"
│   ├── App.tsx              # Route definitions
│   ├── data.ts              # Case studies, projects, bio, books
│   └── index.css            # Styling system (TailwindCSS integration)
├── vercel.json               # Vercel configuration for SPA client routing fallback
├── vite.config.ts            # Vite bundler & path alias configuration
└── package.json              # Frontend dependencies and scripts
```

---

## Setup & Local Development

### Prerequisites
- Node.js (v18 or higher)
- npm

### 1. Install Dependencies
```bash
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```
This starts the local Vite development server on `http://localhost:5173`.

### 3. Build for Production
```bash
npm run build
```
Compiles and optimizes the React application, writing the output static assets into the `/dist` directory.

---

## Deployment to Vercel

This repository is optimized for Vercel Static Hosting.

1. Connect your repository to **Vercel**.
2. Vercel will auto-detect **Vite** and configure the build command (`npm run build`) and output directory (`dist`) automatically.
3. Deploy! Vercel serves the app statically, while `vercel.json` rewrites all client-side paths (e.g. `/projects`, `/books`) to `index.html` to support React Router.

---

## License
Licensed under the Apache-2.0 License.
