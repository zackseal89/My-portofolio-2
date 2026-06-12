# Zachary Ongeri — AI Systems Architect & Full-stack Developer Portfolio

A high-performance, minimalist portfolio website showcasing Zachary Ongeri's systems integrations, autonomous agentic workflows, and headless e-commerce engineering. 

Built as a purely static, highly responsive client-side application using **React (Vite)**, **TailwindCSS**, and **Framer Motion**, with zero backend server requirements.

---

## Technical Overview & Architecture

To optimize performance, security, and deployment costs, this portfolio is built with a **100% serverless, static-first architecture**:

- **Frontend**: A React SPA bundled by Vite. Served globally via CDN for sub-second page loads.
- **AI Chatbot (INTEGRA-1)**: Operates entirely client-side using a simulated systems-intelligence response engine. This avoids exposing API keys to the browser, prevents unauthorized token usage, and runs with zero cost or cold starts.
- **Lead Capture & Systems Hub**: Connects directly from the browser to **Firebase Firestore** (and Google Calendar for the scheduling console), eliminating the need for an intermediary backend server.
- **Deployment**: Configured for simple static hosting on Vercel with SPA routing fallbacks.

---

## Featured Work Profiles

- **Autonomous Workflows**: High-volume, automated triage routers reducing lead response times.
- **Headless E-Commerce**: Decoupled Shopify storefronts with supplier integrations and conversion velocity optimization (Nairobi Sole).
- **Agentic Data Pipelines**: Self-correcting supply chain agent clusters, automated RAG compliance portals (RegWatch), and conversational WhatsApp booking agents.

---

## Repository Structure

```
├── src/
│   ├── components/            # UI components (Systems Hub, AI Chatbot, etc.)
│   ├── lib/
│   │   └── firebase.ts        # Client-side Firestore and Google OAuth configuration
│   ├── App.tsx                # Main client application
│   ├── data.ts                # Case studies, project cards, and bio data
│   └── index.css              # Styling system (TailwindCSS integration)
├── vercel.json                # Vercel configuration for SPA client routing fallback
├── vite.config.ts             # Vite bundler & path alias configuration
└── package.json               # Frontend dependencies and scripts
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

### 2. Configure Firebase (Optional)
Firebase configuration parameters are loaded from `firebase-applet-config.json`. Ensure your configuration keys are populated in that file to enable the Lead Capture and Systems Hub database integration.

### 3. Run the Development Server
```bash
npm run dev
```
This starts the local Vite development server on `http://localhost:5173`.

### 4. Build for Production
```bash
npm run build
```
Compiles and optimizes the React application, writing the output static assets into the `/dist` directory.

---

## Deployment to Vercel

This repository is optimized for Vercel Static Hosting. 

1. Connect your repository to **Vercel**.
2. Vercel will auto-detect **Vite** and configure the build command (`npm run build`) and output directory (`dist`) automatically.
3. Deploy! Vercel serves the app statically, while `vercel.json` rewrites all client-side paths (e.g. `/work`, `/services`) to `index.html` to support React SPA routing.

---

## License
Licensed under the Apache-2.0 License.
