import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

// Load environment variables.
dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize the secure server-side Gemini client.
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;

if (apiKey) {
  ai = new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });
}

// Global Leads Store (In-memory mock for session scope as standard persistence)
interface Lead {
  id: string;
  name: string;
  email: string;
  message: string;
  timestamp: string;
  status: string;
}
const leads: Lead[] = [];

// ZACHARY'S KNOWLEDGE BRIEF & SYSTEM INSTRUCTIONS FOR INTEGRA-1
const SYSTEM_INSTRUCTION = `You are INTEGRA-1, an advanced AI Systems Routing agent and secure liaison for Zachary Ongeri, a world-class AI Systems Architect & Full-stack Developer.
Your primary objective is to represent Zachary's technical excellence, address client queries, capture high-quality business leads, and guide prospective clients to hire Zachary for high-impact integrations.

Zachary's Core Credentials:
- Location: Active area across London & San Francisco (GMT/PST).
- Contact: Direct email is zacharyongeri121@gmail.com.
- Tone & Mindset: Absolute structural utility, high Swiss-modernist discipline, clean typography, performance-optimized, and zero empty buzzwords or sales hype. Speak clearly, objectively, with high professional composure and technical authority. Keep answers concise, highly structured, and readable (use precise bullet points or markdown).

Zachary's Major Work Profiles:
1. AUTONOMOUS WORKFLOWS: Deployed automated triage routers processing 25k+ corporate inquiries, reducing lead response times from 3 hours to 14 seconds (94% Acceleration).
2. HEADLESS E-COMMERCE: Custom GraphQL Shopify storefront designs, custom Stripe payment routes yielding sub-second load times and 3.5x Checkout Funnel Velocity (AOV increases of 28%).
3. AGENTIC DATA PIPELINES: Formed self-correcting supply chain agent clusters, saving over 120 manual hours weekly by auditing wholesale price logs and inventory metrics.

Featured Custom Integrations (Live on Portfolio):
- Omnichannel Headless Checkout Engine: High-performance billing with live Stripe telemetry routing.
- Multi-Agent Knowledge Retrieval Cluster: RAG system parsing CSV, JSON, and text resources dynamically with Gemini API.
- Solana Autonomous Arbitrage Node: Cross-exchange pricing graph traversals parsing binary data in milliseconds.

Lead Capturing / Closing Leads Guide:
- When visitors express interest in projects, custom system integrations, freelancing, or consultant contracts:
  - Strongly encourage them to connect with Zachary.
  - Politely and elegantly ask for their Name, Corporate Email Address, and a brief description of their system challenge or project goal.
  - Let them know that their inquiry will be flagged with "HIGH QUEUE PRIORITY" and routed instantly to Zachary's primary notifications router page interface.
  - Maintain a deeply professional, respectful, and authoritative engineering demeanor. Do not act like typical pre-sales chatbots. Speak as a secure and reliable systems terminal.`;

// Endpoint: Healthcheck
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", mode: process.env.NODE_ENV || "development" });
});

// Endpoint: Chat Ingress Pipeline
app.post("/api/chat", async (req, res) => {
  const { message, history } = req.body;

  if (!message) {
    return res.status(400).json({ error: "No message parameter provided" });
  }

  if (!ai) {
    return res.json({
      text: "❌ [SYSTEM ALERT] Gemini API key is not configured. Please add GEMINI_API_KEY inside the 'Settings > Secrets' panel in Google AI Studio to unlock immediate agentic dialog loop execution."
    });
  }

  try {
    // Format history for the `@google/genai` chats SDK.
    // Each history item: { role: 'user' | 'model', parts: [{ text: string }] }
    const formattedHistory = (history || []).map((msg: any) => ({
      role: msg.role === "assistant" ? "model" : "user",
      parts: [{ text: msg.content }]
    }));

    // Create the chat session
    const chat = ai.chats.create({
      model: "gemini-3.5-flash",
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
      history: formattedHistory
    });

    const response = await chat.sendMessage({ message });
    res.json({ text: response.text });
  } catch (err: any) {
    console.error("Gemini API stream failure:", err);
    res.status(500).json({ error: "Internal Gemini session failure", details: err.message });
  }
});

// Endpoint: Receive Bot captured lead
app.post("/api/lead", (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email) {
    return res.status(400).json({ error: "Identifier parameters are incomplete" });
  }

  const newLead: Lead = {
    id: `LEAD-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
    name,
    email,
    message: message || "No message payload provided",
    timestamp: new Date().toISOString(),
    status: "HIGH_QUEUE_PRIORITY"
  };

  leads.push(newLead);
  res.json({ success: true, lead: newLead });
});

// Endpoint: Fetch Lead Queue (Visible in dev or custom console)
app.get("/api/leads", (req, res) => {
  res.json({ leads });
});

// Integration of Vite Development Server Middleware
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`ZACHARY Systems Server active on http://0.0.0.0:${PORT} in [${process.env.NODE_ENV || "development"}]`);
  });
}

startServer();
