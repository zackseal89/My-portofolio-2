import { useState, useEffect, useRef, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, MessageSquare, X, Terminal, Cpu, Loader, ArrowRight } from 'lucide-react';
import { sendLeadViaMailto } from '../lib/contact';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  isForm?: boolean;
}

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      role: 'assistant',
      content: `Greetings. I am **INTEGRA-1**, system liaison for Zachary Ongeri. 

I coordinate project specifications and architecture inquiries. I can answer questions regarding:
- **Selected Builds**: RegWatch, Vertical AI Agents, FORMA, Naisole, MNL Advocates
- **Build Log & Method**: 5-step agent delivery framework & Postgres RLS tenant security
- **Engagement Shapes**: Build Sprint (6-week blueprint), System Audit, Retained Build

How may I assist you with your system goals today?`
    }
  ]);
  const [inputVal, setInputVal] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showLeadForm, setShowLeadForm] = useState<boolean>(false);
  
  // Lead Form state
  const [leadName, setLeadName] = useState<string>('');
  const [leadEmail, setLeadEmail] = useState<string>('');
  const [leadMessage, setLeadMessage] = useState<string>('');
  const [leadSubmitted, setLeadSubmitted] = useState<boolean>(false);

  const endOfMessagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isLoading, showLeadForm]);

  const generateMockReply = (msgText: string): string => {
    const text = msgText.toLowerCase();

    if (text.includes('agent') || text.includes('build an agent') || text.includes('method') || text.includes('step')) {
      return `Zachary's **5-Step Agent Delivery Blueprint**:

1. **Study Real Messages**: Read a hundred real customer messages before writing any prompts or code.
2. **Narrow Scope & Handoff**: Define the single job and the exact point where thread control transfers to a human operator.
3. **Retrieval Before Personality**: Build retrieval infrastructure first. Wrong facts in a friendly voice are worse than no agent.
4. **Automated Failure Tests**: Write failure cases as automated tests and run them on every system prompt update.
5. **Ship Single-Channel**: Measure human handoff rate, and only widen agent scope once handoff rates drop.`;
    }

    if (text.includes('regwatch') || text.includes('rag') || text.includes('compliance') || text.includes('cbk') || text.includes('odpc')) {
      return `**RegWatch (Flagship RAG SaaS Platform)**:
- **Built inside**: MNL Advocates LLP for CBK and ODPC filings.
- **Full Retrieval Pipeline**: Voyage AI embeddings, Supabase pgvector, Next.js 14 application layer.
- **Data Security**: Three-role Postgres Row Level Security (RLS) model. Isolation sits in Postgres policies rather than application code, so security fails closed.`;
    }

    if (text.includes('vertical') || text.includes('whatsapp') || text.includes('clinic') || text.includes('dealership') || text.includes('host')) {
      return `**Vertical AI Agents (Kenya & US Markets)**:
- **Inbound Speed**: Qualifies leads and answers enquiries in **under 30 seconds**.
- **Scope**: Narrowly built for clinics (triage), dealerships (stock & finance), and short-stay hosts (booking).
- **Integrations**: Meta WhatsApp Business API & Anthropic Claude API with automatic escalation to human operators.`;
    }

    if (text.includes('forma') || text.includes('naisole') || text.includes('shopify') || text.includes('ecommerce') || text.includes('sourcing')) {
      return `**Ecommerce Builds (Design Through Build)**:
- **FORMA**: DTC apparel brand built from the sourcing layer up. Supplier locked to S-Shaper (OEKO-TEX, 100 MOQ), sizing rebuilt for East African body proportions, plus identity system and Shopify storefront.
- **Naisole**: Shopify storefront designed & built end-to-end (identity, IA, product schema, conversion UX as one system).
- **Core Philosophy**: Supply chain is part of the software. Fixing sizing & supplier constraints upfront prevents costly returns later.`;
    }

    if (text.includes('mnl') || text.includes('headless') || text.includes('seo') || text.includes('aeo') || text.includes('wordpress')) {
      return `**MNL Advocates LLP Platform Migration**:
- **Stack**: Decoupled WordPress CMS + Next.js 14 front end on Vercel edge network.
- **Search & AEO**: Structured practice areas as entity graphs (Schema.org) so content reads cleanly to AI answer engines (Perplexity, ChatGPT, Gemini) as well as crawlers.
- **Event Operations**: Operational scaffolding and briefing document pipelines for Africa Leadership Circle (Nairobi summit & Benin breakfast in Cotonou).`;
    }

    if (text.includes('sprint') || text.includes('engagement') || text.includes('audit') || text.includes('retainer') || text.includes('how a build sprint runs')) {
      return `**Engagement Shapes & Build Sprint Timeline**:

**Shapes**:
1. **Build Sprint**: Fixed product/storefront taken from zero to live in 6 weeks.
2. **System Audit**: Comprehensive read of stack, search visibility, and uncosted manual steps.
3. **Retained Build**: Ongoing technical direction and engineering ownership.

**6-Week Sprint Blueprint**:
- **Week 01 (Define)**: Commercial outcome agreed as a number.
- **Week 02–05 (Build)**: Working software delivered weekly with real data.
- **Week 06 (Hand Over)**: Deployment, tracking, and written documentation.`;
    }

    if (text.includes('location') || text.includes('available') || text.includes('education') || text.includes('contact') || text.includes('email') || text.includes('hire') || text.includes('quote')) {
      return `**Zachary Ongeri Key Details**:
- **Location**: Nairobi, Kenya (UTC+3, remote). Overlap held open for European, United States, and Asia Pacific working hours.
- **Education**: University of Nairobi.
- **Direct Email**: zacharyongeri121@gmail.com
- **LinkedIn**: linkedin.com/in/zachary-ongeri-253593231

*To send a direct brief, please click "Request a Project Quote // Hire Zachary" or fill out the inline form below.*`;
    }

    if (text.includes('hello') || text.includes('hi') || text.includes('hey') || text.includes('greetings')) {
      return `Greetings. I am **INTEGRA-1**, Zachary's systems liaison. How can I assist you with your engineering or AI architectural goals today? 

Feel free to query me about:
- **5-Step Agent Delivery Blueprint**
- **RegWatch RAG SaaS Platform**
- **Vertical AI WhatsApp Agents**
- **6-Week Build Sprint Framework**`;
    }

    return `Query parsed. To help address your inquiry accurately, feel free to ask about:
- **Zachary's Selected Builds** (RegWatch, Vertical Agents, FORMA, Naisole, MNL)
- **5-Step Agent Delivery Blueprint**
- **6-Week Build Sprint & Engagement Shapes**
- **Direct hiring / project quotes**`;
  };

  const sendMessageToApi = async (msgText: string, updatedHistory: ChatMessage[]) => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 750));

    try {
      const replyText = generateMockReply(msgText);
      setMessages(prev => [
        ...prev,
        {
          id: `msg-${Date.now()}-reply`,
          role: 'assistant',
          content: replyText
        }
      ]);
    } catch (err: any) {
      console.error(err);
      setMessages(prev => [
        ...prev,
        {
          id: `msg-${Date.now()}-error`,
          role: 'assistant',
          content: `⚠️ **[SYSTEM EXCEPTION]** Connection error. Please email Zachary directly at zacharyongeri121@gmail.com.`
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim() || isLoading) return;

    const userMessageText = inputVal;
    setInputVal('');

    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      role: 'user',
      content: userMessageText
    };

    const newHistory = [...messages, newMsg];
    setMessages(newHistory);

    const isHireIntent = /hire|quote|consult|contract|project|brief|audit/i.test(userMessageText);
    
    if (isHireIntent) {
      setMessages(prev => [
        ...prev,
        {
          id: `msg-form-${Date.now()}`,
          role: 'assistant',
          content: `Preparing system brief form... Please complete your contact details below to queue a priority audit on Zachary's terminal:`
        }
      ]);
      setShowLeadForm(true);
      return;
    }

    sendMessageToApi(userMessageText, newHistory);
  };

  const handleQuickPromptClick = (promptText: string) => {
    if (isLoading) return;

    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      role: 'user',
      content: promptText
    };

    const newHistory = [...messages, newMsg];
    setMessages(newHistory);

    if (promptText.includes('Hire Zachary') || promptText.includes('Request a Project Quote')) {
      setMessages(prev => [
        ...prev,
        {
          id: `msg-form-trigger-${Date.now()}`,
          role: 'assistant',
          content: `Preparing brief form... Complete your details to establish high-confidence routing:`
        }
      ]);
      setShowLeadForm(true);
      return;
    }

    sendMessageToApi(promptText, newHistory);
  };

  const handleLeadFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!leadName || !leadEmail) return;

    setIsLoading(true);

    const opened = sendLeadViaMailto({
      name: leadName,
      email: leadEmail,
      message: leadMessage || 'Request sent via INTEGRA-1 chat widget'
    });

    if (opened) {
      setLeadSubmitted(true);
      setShowLeadForm(false);
      setMessages(prev => [
        ...prev,
        {
          id: `msg-success-${Date.now()}`,
          role: 'assistant',
          content: `✅ **[TRANSMISSION DISPATCHED]**

Thank you, **${leadName}**. Your email client has opened pre-filled straight to zacharyongeri121@gmail.com. Hit send to transmit.`
        }
      ]);

      setLeadName('');
      setLeadEmail('');
      setLeadMessage('');
    } else {
      setMessages(prev => [
        ...prev,
        {
          id: `msg-lead-error-${Date.now()}`,
          role: 'assistant',
          content: `⚠️ Could not open email client automatically. Please write to zacharyongeri121@gmail.com directly.`
        }
      ]);
    }
    setIsLoading(false);
  };

  const quickPrompts = [
    "Explain Zachary's 5-Step Agent Blueprint",
    "What is RegWatch and how is it built?",
    "How does a 6-Week Build Sprint run?",
    "Request a Project Quote // Hire Zachary"
  ];

  return (
    <div id="aesthetic-ai-chatbot-root" className="fixed bottom-6 right-6 z-[999] font-sans">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 35, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 35, scale: 0.95 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="w-[360px] sm:w-[420px] h-[580px] bg-brand-bg/95 backdrop-blur-md border border-brand-dark shadow-2xl relative flex flex-col justify-between sharp-edge"
            id="chatbot-terminal-panel"
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 max-h-[60px] opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#121212 1px, transparent 0)', backgroundSize: '8px 8px' }} />

            {/* Panel Header */}
            <div className="px-5 py-4 border-b border-brand-dark/15 flex items-center justify-between bg-white/70">
              <div className="flex items-center gap-2.5">
                <div className="h-2.5 w-2.5 bg-[#10b981] rounded-full animate-pulse border border-[#047857]" />
                <div>
                  <div className="flex items-center gap-1">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-[#a3a3a3] leading-none font-bold">// SECURE SESSION</span>
                    <span className="text-[8px] bg-brand-dark text-brand-bg px-1 rounded-sm leading-none sharp-edge font-mono">NODE_0x1</span>
                  </div>
                  <h3 className="font-serif text-base font-black text-brand-dark tracking-tight leading-snug mt-1">
                    INTEGRA-1 Systems Liaison
                  </h3>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-brand-muted hover:text-brand-dark p-1.5 border border-transparent hover:border-brand-dark/[0.08] bg-brand-bg/40 hover:bg-brand-bg transition-all sharp-edge cursor-pointer"
                id="chatbot-close-btn"
                title="Disconnect node"
              >
                <X size={14} />
              </button>
            </div>

            {/* Chat Messages Frame */}
            <div 
              className="flex-1 overflow-y-auto px-5 py-6 space-y-5 bg-brand-bg/20"
              id="chatbot-messages-container"
            >
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  id={`chat-msg-row-${msg.id}`}
                >
                  <div className="max-w-[85%] flex gap-2.5 items-start">
                    {msg.role === 'assistant' && (
                      <div className="h-[26px] w-[26px] border border-brand-dark/15 rounded-full flex items-center justify-center bg-white/80 text-brand-accent shrink-0">
                        <Cpu size={12} className="animate-pulse" />
                      </div>
                    )}
                    <div 
                      className={`p-4 border text-[11.5px] leading-relaxed sharp-edge relative ${
                        msg.role === 'user' 
                          ? 'bg-brand-dark text-brand-bg border-brand-dark shadow-sm'
                          : 'bg-white text-zinc-800 border-brand-dark/10 shadow-sm'
                      }`}
                    >
                      <div className="space-y-1.5 whitespace-pre-wrap font-sans">
                        {msg.content.split('\n').map((line, lIdx) => {
                          let processed = line;
                          if (processed.includes('**')) {
                            const parts = processed.split('**');
                            return (
                              <p key={lIdx}>
                                {parts.map((p, pIdx) => pIdx % 2 === 1 ? <strong key={pIdx} className={msg.role === 'user' ? 'text-brand-bg font-heavy' : 'text-brand-accent font-black'}>{p}</strong> : p)}
                              </p>
                            );
                          }
                          if (processed.startsWith('- ')) {
                            return (
                              <div key={lIdx} className="flex gap-2 pl-2">
                                <span className={msg.role === 'user' ? 'text-brand-bg' : 'text-brand-accent'}>•</span>
                                <span>{processed.substring(2)}</span>
                              </div>
                            );
                          }
                          return <p key={lIdx}>{processed}</p>;
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Lead Capture form */}
              {showLeadForm && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-5 border border-brand-dark bg-white sharp-edge shadow-sm space-y-4"
                  id="chatbot-inline-lead-form"
                >
                  <div className="flex items-center gap-1.5 border-b border-brand-dark/10 pb-2">
                    <Terminal size={11} className="text-brand-accent" />
                    <span className="font-mono text-[9px] uppercase tracking-widest text-[#a3a3a3] font-bold">System Brief Specification</span>
                  </div>
                  <form onSubmit={handleLeadFormSubmit} className="space-y-3.5">
                    <div className="flex flex-col gap-1">
                      <label className="font-mono text-[8px] uppercase tracking-wider text-brand-muted font-bold">Your Name / Organization *</label>
                      <input
                        type="text"
                        required
                        value={leadName}
                        onChange={(e) => setLeadName(e.target.value)}
                        placeholder="e.g. Alex Vance"
                        className="p-2 border border-brand-dark/15 hover:border-brand-dark focus:border-brand-dark focus:ring-1 focus:ring-brand-dark focus:outline-none transition-colors text-[11px] sharp-edge"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="font-mono text-[8px] uppercase tracking-wider text-brand-muted font-bold">Email Address *</label>
                      <input
                        type="email"
                        required
                        value={leadEmail}
                        onChange={(e) => setLeadEmail(e.target.value)}
                        placeholder="email@company.com"
                        className="p-2 border border-brand-dark/15 hover:border-brand-dark focus:border-brand-dark focus:ring-1 focus:ring-brand-dark focus:outline-none transition-colors text-[11px] sharp-edge"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="font-mono text-[8px] uppercase tracking-wider text-brand-muted font-bold">Brief / Goals</label>
                      <textarea
                        rows={2}
                        value={leadMessage}
                        onChange={(e) => setLeadMessage(e.target.value)}
                        placeholder="e.g. Need a 6-week build sprint for a RAG search system or Shopify storefront..."
                        className="p-2 border border-brand-dark/15 hover:border-brand-dark focus:border-brand-dark focus:ring-1 focus:ring-brand-dark focus:outline-none transition-colors text-[11px] sharp-edge resize-none"
                      />
                    </div>
                    <div className="flex gap-2 pt-1.5">
                      <button
                        type="button"
                        onClick={() => {
                          setShowLeadForm(false);
                          setMessages(prev => [
                            ...prev,
                            {
                              id: `msg-cancel-${Date.now()}`,
                              role: 'assistant',
                              content: `Form closed. Feel free to ask other questions.`
                            }
                          ]);
                        }}
                        className="flex-1 py-2 text-[10px] border border-brand-dark/10 hover:border-brand-dark text-brand-muted hover:text-brand-dark uppercase tracking-widest font-black transition-colors sharp-edge"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="flex-1 py-2 bg-brand-dark hover:bg-brand-accent text-brand-bg hover:text-brand-dark uppercase tracking-widest font-black text-[10px] transition-colors sharp-edge border border-brand-dark"
                      >
                        Transmit Brief
                      </button>
                    </div>
                  </form>
                </motion.div>
              )}

              {isLoading && (
                <div className="flex justify-start" id="chatbot-loading-row">
                  <div className="flex items-center gap-2 px-4 py-3 border border-brand-dark/10 bg-white/70 sharp-edge">
                    <Loader size={12} className="animate-spin text-brand-accent" />
                    <span className="font-mono text-[9px] uppercase tracking-widest text-brand-muted leading-none">INTEGRA-1 formulating response...</span>
                  </div>
                </div>
              )}

              <div ref={endOfMessagesRef} />
            </div>

            {/* Quick Actions Panel */}
            <div className="px-5 pt-3 pb-2 border-t border-brand-dark/10 bg-white/40 space-y-1.5">
              <span className="font-mono text-[8px] uppercase tracking-widest text-[#a3a3a3] block font-bold">Quick Ingress Commands</span>
              <div className="flex flex-col gap-1">
                {quickPrompts.map((pText, pIdx) => (
                  <button
                    key={pIdx}
                    onClick={() => handleQuickPromptClick(pText)}
                    disabled={isLoading}
                    className="text-left py-1.5 px-3 border border-brand-dark/10 hover:border-brand-dark bg-white hover:bg-brand-surface text-brand-dark text-[10.5px] tracking-wide font-black transition-all sharp-edge cursor-pointer flex items-center justify-between group disabled:opacity-50"
                  >
                    <span>{pText}</span>
                    <ArrowRight size={10} className="opacity-0 group-hover:opacity-100 transform translate-x-[-4px] group-hover:translate-x-0 transition-all text-brand-accent" />
                  </button>
                ))}
              </div>
            </div>

            {/* Message input */}
            <div className="p-4 border-t border-brand-dark/15 bg-white">
              <form onSubmit={handleSubmit} className="flex gap-2">
                <input
                  type="text"
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  disabled={isLoading}
                  placeholder={showLeadForm ? "Please fill lead details above..." : "Ask INTEGRA-1 about Zachary's builds or method..."}
                  className="flex-1 p-2.5 bg-brand-bg/80 border border-brand-dark/15 hover:border-brand-dark focus:border-brand-dark focus:outline-none focus:ring-1 focus:ring-brand-dark text-[11px] sharp-edge disabled:opacity-60"
                  id="chatbot-text-input"
                />
                <button
                  type="submit"
                  disabled={isLoading || !inputVal.trim() || showLeadForm}
                  className="px-3.5 bg-brand-dark text-brand-bg hover:bg-brand-accent hover:text-brand-dark transition-all duration-200 focus:outline-none sharp-edge border border-brand-dark flex items-center justify-center disabled:opacity-40 cursor-pointer"
                  id="chatbot-submit-btn"
                  title="Forward query packet"
                >
                  <Send size={12} />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Spark Launcher Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className="h-12 w-12 rounded-full bg-brand-dark hover:bg-brand-accent text-brand-bg hover:text-brand-dark flex items-center justify-center shadow-lg cursor-pointer border border-brand-dark relative group transition-colors duration-300"
        id="chatbot-toggle-trigger"
        title="Open INTEGRA-1 Secure Chat Liaison"
      >
        {isOpen ? (
          <X size={18} className="transform rotate-0 transition-transform duration-300" />
        ) : (
          <div className="relative flex items-center justify-center">
            <span className="absolute h-10 w-10 bg-brand-accent/25 rounded-full animate-ping pointer-events-none group-hover:bg-brand-dark/10" />
            <MessageSquare size={18} className="relative z-10" />
          </div>
        )}
      </motion.button>
    </div>
  );
}
