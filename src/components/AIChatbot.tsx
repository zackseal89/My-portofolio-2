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

I coordinate communication routing and project specification processing. I can answer inquiries regarding:
- Zachary's custom autonomous lead pipelines
- Sub-second headless e-commerce architectures
- Enterprise integration of secure generative AI systems

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

    if (text.includes('workflow') || text.includes('triage') || text.includes('automate') || text.includes('lead triage')) {
      return `Zachary's **Freelance Automation Engine** answers and qualifies SME leads over WhatsApp.

Key architectural parameters:
- **Reply Speed**: Under 30 seconds, average, from inquiry to response.
- **Safety**: Prompt scaffolding and guardrails scoped to each client, no cross-client hallucination.
- **Lead-Gen**: A weekly automated sweep (built on Cowork) surfaces new prospects across Kenyan and US ecommerce markets.
- **Integrations**: WhatsApp Business API events routed to booking calendars and operator alerts.`;
    }

    if (text.includes('checkout') || text.includes('shopify') || text.includes('e-commerce') || text.includes('forma') || text.includes('shapewear')) {
      return `**FORMA** is Zachary's own DTC brand, built from the sourcing layer up:
- **Supplier**: Locked to S-Shaper, OEKO-TEX certified, at a 100-unit MOQ.
- **Sizing**: Rebuilt around East African hip proportions instead of an imported chart.
- **Brand System**: Obsidian, cream, terracotta, and nude, designed before a single unit ships.
- **Freelance Lane**: Separately, Zachary builds Shopify storefronts and AI chatbots for SME clients via Fiverr, Upwork, and Whop, kept deliberately apart from his legal-tech work.`;
    }

    if (text.includes('regwatch') || text.includes('rag') || text.includes('compliance') || text.includes('saas')) {
      return `**RegWatch** is Zachary's flagship AI SaaS platform, built inside MNL Advocates LLP:
- **Function**: Covers CBK and ODPC jurisdiction, turning regulatory gazettes into instant, citation-backed compliance analysis.
- **Stack**: Next.js 14, Supabase (pgvector + row-level security), Voyage AI embeddings, and Claude API.
- **Security**: A three-role RLS model means one client's filings never surface in another client's results, by construction.`;
    }

    if (text.includes('hire') || text.includes('quote') || text.includes('contact') || text.includes('consult') || text.includes('brief') || text.includes('project')) {
      return `Understood. I am launching the **System Parameters Brief Form** directly in the chat terminal window below. 

Please supply your name, email, and a summary of your integration goals to queue a priority audit session on Zachary's terminal.`;
    }

    if (text.includes('hello') || text.includes('hi') || text.includes('hey') || text.includes('greetings')) {
      return `Greetings. I am **INTEGRA-1**, Zachary's systems liaison. How can I assist you with your digital or AI architectural goals today? 

Feel free to query me about:
- **AI Agent Lead Triage Workflows**
- **Sub-second Headless E-Commerce**
- **RegWatch AI SaaS Platform**
- **Direct quote/project inquiries**`;
    }

    // Default response containing suggestions
    return `Query received. I have parsed your query parameters.

To help address your inquiry accurately, please select one of the Quick Ingress Commands below, or query me on:
- **Zachary's AI Lead Triage Engine**
- **FORMA and the freelance automation lane**
- **RegWatch AI compliance RAG platform**
- **Project quotes and hiring contracts**`;
  };

  const sendMessageToApi = async (msgText: string, updatedHistory: ChatMessage[]) => {
    setIsLoading(true);
    
    // Simulate small latency for premium terminal feel
    await new Promise(resolve => setTimeout(resolve, 800));

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
          content: `⚠️ **[SYSTEM EXCEPTION_ROUTING_ERROR]** Failed to execute secure handshake. 

*Details: Connection timeout. Please verify your network state or contact Zachary directly at zacharyongeri121@gmail.com.*`
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

    // If they say or ask for quote / hire / consult, trigger lead form inline
    const isHireIntent = /hire|quote|consult|contract|project|brief|contact/i.test(userMessageText);
    
    if (isHireIntent) {
      setMessages(prev => [
        ...prev,
        {
          id: `msg-form-${Date.now()}`,
          role: 'assistant',
          content: `Processing specification request... For automated high-priority routing, please complete this secure brief transmission checklist:`
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
          content: `Preparing integration brief. Complete the parameters below to establish high-confidence routing to Zachary's primary logs pager:`
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

    // No backend here. This hands off to the visitor's own email client with
    // the brief pre-filled. There is no database recording this exchange.
    const opened = sendLeadViaMailto({
      name: leadName,
      email: leadEmail,
      message: leadMessage || 'Request sent via INTEGRA-1 chat widget prompt'
    });

    if (opened) {
      setLeadSubmitted(true);
      setShowLeadForm(false);
      setMessages(prev => [
        ...prev,
        {
          id: `msg-success-${Date.now()}`,
          role: 'assistant',
          content: `✅ **[TRANSMISSION DISPATCHED // SUCCESS]**

Thank you, **${leadName}**. Your default email client should have opened with the brief pre-filled and addressed straight to Zachary. Hit send there to complete it. No server, no database, just email.

Zachary will read your requirements and reply personally.`
        }
      ]);

      // Reset lead fields
      setLeadName('');
      setLeadEmail('');
      setLeadMessage('');
    } else {
      setMessages(prev => [
        ...prev,
        {
          id: `msg-lead-error-${Date.now()}`,
          role: 'assistant',
          content: `⚠️ **[LEAD_ROUTING_EXCEPTION]** Could not open your email client automatically. Please mail directly to zacharyongeri121@gmail.com.`
        }
      ]);
    }
    setIsLoading(false);
  };

  const quickPrompts = [
    "Explain Zachary's AI Lead Triage Engine",
    "What is FORMA and how is it built?",
    "Request a Project Quote // Hire Zachary",
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
            className="w-[360px] sm:w-[410px] h-[550px] bg-brand-bg/95 backdrop-blur-md border border-brand-dark shadow-2xl relative flex flex-col justify-between sharp-edge"
            id="chatbot-terminal-panel"
          >
            {/* Minimal Grid Header Background Pattern */}
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
              {messages.map((msg, idx) => (
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
                          ? 'bg-brand-dark text-white border-brand-dark shadow-sm' 
                          : 'bg-white text-zinc-800 border-brand-dark/10 shadow-sm'
                      }`}
                    >
                      {/* Markdown simple renderer for bold/lists */}
                      <div className="space-y-1.5 whitespace-pre-wrap font-sans">
                        {msg.content.split('\n').map((line, lIdx) => {
                          let processed = line;
                          // Bold match **text**
                          if (processed.includes('**')) {
                            const parts = processed.split('**');
                            return (
                              <p key={lIdx}>
                                {parts.map((p, pIdx) => pIdx % 2 === 1 ? <strong key={pIdx} className={msg.role === 'user' ? 'text-white font-heavy' : 'text-brand-accent font-black'}>{p}</strong> : p)}
                              </p>
                            );
                          }
                          // Bullet list item
                          if (processed.startsWith('- ')) {
                            return (
                              <div key={lIdx} className="flex gap-2 pl-2">
                                <span className={msg.role === 'user' ? 'text-white' : 'text-brand-accent'}>•</span>
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

              {/* Dynamic Qualified Lead Capture form direct in UI frame */}
              {showLeadForm && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-5 border border-brand-dark bg-white sharp-edge shadow-sm space-y-4"
                  id="chatbot-inline-lead-form"
                >
                  <div className="flex items-center gap-1.5 border-b border-brand-dark/10 pb-2">
                    <Terminal size={11} className="text-brand-accent" />
                    <span className="font-mono text-[9px] uppercase tracking-widest text-[#a3a3a3] font-bold">Parameters Qualification</span>
                  </div>
                  <form onSubmit={handleLeadFormSubmit} className="space-y-3.5">
                    <div className="flex flex-col gap-1">
                      <label className="font-mono text-[8px] uppercase tracking-wider text-brand-muted font-bold">Identifier / Name *</label>
                      <input
                        type="text"
                        required
                        value={leadName}
                        onChange={(e) => setLeadName(e.target.value)}
                        placeholder="e.g. Elena Rostova"
                        className="p-2 border border-brand-dark/15 hover:border-brand-dark focus:border-brand-dark focus:ring-1 focus:ring-brand-dark focus:outline-none transition-colors text-[11px] sharp-edge"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="font-mono text-[8px] uppercase tracking-wider text-brand-muted font-bold">Direct Corporate Email *</label>
                      <input
                        type="email"
                        required
                        value={leadEmail}
                        onChange={(e) => setLeadEmail(e.target.value)}
                        placeholder="email@organization.co"
                        className="p-2 border border-brand-dark/15 hover:border-brand-dark focus:border-brand-dark focus:ring-1 focus:ring-brand-dark focus:outline-none transition-colors text-[11px] sharp-edge"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="font-mono text-[8px] uppercase tracking-wider text-brand-muted font-bold">System Challenges / Details</label>
                      <textarea
                        rows={2}
                        value={leadMessage}
                        onChange={(e) => setLeadMessage(e.target.value)}
                        placeholder="e.g. Integrating automated lead triaging with HubSpot CRM and Gemini routing..."
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
                              content: `Transmission form closed. Let me know if you wish to query other topics instead.`
                            }
                          ]);
                        }}
                        className="flex-1 py-2 text-[10px] border border-brand-dark/10 hover:border-brand-dark text-brand-muted hover:text-brand-dark uppercase tracking-widest font-black transition-colors sharp-edge"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="flex-1 py-2 bg-brand-dark hover:bg-brand-accent text-white hover:text-brand-dark uppercase tracking-widest font-black text-[10px] transition-colors sharp-edge border border-brand-dark"
                      >
                        Commit Brief
                      </button>
                    </div>
                  </form>
                </motion.div>
              )}

              {/* Loader feedback */}
              {isLoading && (
                <div className="flex justify-start" id="chatbot-loading-row">
                  <div className="flex items-center gap-2 px-4 py-3 border border-brand-dark/10 bg-white/70 sharp-edge">
                    <Loader size={12} className="animate-spin text-brand-accent" />
                    <span className="font-mono text-[9px] uppercase tracking-widest text-brand-muted leading-none">INTEGRA-1 is formulating routing reply...</span>
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

            {/* Message input container */}
            <div className="p-4 border-t border-brand-dark/15 bg-white">
              <form onSubmit={handleSubmit} className="flex gap-2">
                <input
                  type="text"
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  disabled={isLoading}
                  placeholder={showLeadForm ? "Please fill lead details above..." : "Draft inquiry or systems question..."}
                  className="flex-1 p-2.5 bg-brand-bg/80 border border-brand-dark/15 hover:border-brand-dark focus:border-brand-dark focus:outline-none focus:ring-1 focus:ring-brand-dark text-[11px] sharp-edge disabled:opacity-60"
                  id="chatbot-text-input"
                />
                <button
                  type="submit"
                  disabled={isLoading || !inputVal.trim() || showLeadForm}
                  className="px-3.5 bg-brand-dark text-white hover:bg-brand-accent hover:text-brand-dark transition-all duration-200 focus:outline-none sharp-edge border border-brand-dark flex items-center justify-center disabled:opacity-40 cursor-pointer"
                  id="chatbot-submit-btn"
                  title="Forward query packet"
                >
                  <Send size={12} />
                </button>
              </form>
              <div className="flex items-center justify-between text-[8px] font-mono text-[#a3a3a3] mt-2 px-1">
                <span>HANDSHAKE: ENCRYPTED</span>
                <span>DATA ROUTE: LOCAL_SSL</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Spark Launcher Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className="h-12 w-12 rounded-full bg-brand-dark hover:bg-brand-accent text-white hover:text-brand-dark flex items-center justify-center shadow-lg cursor-pointer border border-brand-dark relative group transition-colors duration-300"
        id="chatbot-toggle-trigger"
        title="Open INTEGRA-1 Secure Chat Liaison"
      >
        {isOpen ? (
          <X size={18} className="transform rotate-0 transition-transform duration-300" />
        ) : (
          <div className="relative flex items-center justify-center">
            {/* Pulsing ring around chat launcher for aesthetics */}
            <span className="absolute h-10 w-10 bg-brand-accent/25 rounded-full animate-ping pointer-events-none group-hover:bg-brand-dark/10" />
            <MessageSquare size={18} className="relative z-10" />
          </div>
        )}
        
        {/* Simple tooltip label */}
        <div className="absolute right-14 bg-brand-dark text-white text-[9px] uppercase tracking-widest px-2.5 py-1 sharp-edge border border-brand-accent/35 whitespace-nowrap shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          INTEGRA-1 SYSTEMS LIAISON
        </div>
      </motion.button>
    </div>
  );
}
