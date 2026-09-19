import React, { useState, useEffect, useRef } from 'react';
import {
  MessageSquare,
  Bot,
  Send,
  X,
  Minus,
  Maximize2,
  Minimize2,
  Sparkles,
  ArrowUpRight,
  RotateCcw,
  User,
  CheckCircle2,
  Phone,
} from 'lucide-react';
import { HKLogo } from './HKLogo';

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: string;
  isInitial?: boolean;
}

interface AiAssistantWidgetProps {
  onNavigateToContact?: () => void;
}

const DEFAULT_PROMPTS = [
  'What are your project timelines & pricing?',
  'Can you build a high-performance Next.js store?',
  'How does your custom UI/UX design process work?',
  'How can I get a fast quote for my project?',
];

export const AiAssistantWidget: React.FC<AiAssistantWidgetProps> = ({
  onNavigateToContact,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [inputMessage, setInputMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasNewMessageNotice, setHasNewMessageNotice] = useState<boolean>(true);

  const initialMessage: ChatMessage = {
    id: 'welcome-msg',
    role: 'model',
    content:
      "Hello! 👋 I'm your **HK Digital Agency AI Consultant**.\n\nWhether you're planning a new web platform, a high-converting landing page, or a custom UI/UX design system in Figma, I'm here to recommend the best technical architecture, estimate timelines, and answer your questions.",
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    isInitial: true,
  };

  const [messages, setMessages] = useState<ChatMessage[]>([initialMessage]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll on new messages
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isLoading]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setHasNewMessageNotice(false);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 150);
    }
  }, [isOpen]);

  const handleSendMessage = async (customPrompt?: string) => {
    const textToSend = (customPrompt || inputMessage).trim();
    if (!textToSend || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!customPrompt) setInputMessage('');
    setIsLoading(true);

    try {
      // Build history for context (exclude the initial greeting)
      const history = messages
        .filter((m) => !m.isInitial)
        .map((m) => ({
          role: m.role,
          content: m.content,
        }));

      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: history,
          userMessage: textToSend,
        }),
      });

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }

      const data = await response.json();
      const botReply = data.reply || "Thank you for reaching out! Let me know if you'd like to schedule a discovery call or discuss tech requirements.";

      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        role: 'model',
        content: botReply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      console.error('AI chat error:', err);
      const fallbackAiMsg: ChatMessage = {
        id: `ai-err-${Date.now()}`,
        role: 'model',
        content:
          "I'd love to help you build your project! HK Digital Agency specializes in Next.js, React, custom Figma design systems, and high-performance web engineering. You can also reach our team immediately on WhatsApp at **+92 336 6472492** or submit your brief on our Contact page.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, fallbackAiMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetChat = () => {
    setMessages([
      {
        ...initialMessage,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  };

  // Helper to render bold markdown and lists simply
  const renderFormattedContent = (content: string) => {
    const lines = content.split('\n');
    return lines.map((line, idx) => {
      // Render bullet lines
      if (line.trim().startsWith('•') || line.trim().startsWith('-')) {
        const clean = line.trim().replace(/^[•-]\s*/, '');
        return (
          <li key={idx} className="flex items-start gap-2 my-1 text-xs sm:text-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#1FA82C] mt-1.5 shrink-0" />
            <span>{parseInlineBold(clean)}</span>
          </li>
        );
      }

      // Empty line spacing
      if (!line.trim()) {
        return <div key={idx} className="h-2" />;
      }

      return (
        <p key={idx} className="my-1 text-xs sm:text-sm leading-relaxed">
          {parseInlineBold(line)}
        </p>
      );
    });
  };

  const parseInlineBold = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <strong key={i} className="font-bold text-neutral-900">
            {part.slice(2, -2)}
          </strong>
        );
      }
      return part;
    });
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-none">
      
      {/* =========================================================================
          1. EXPANDED / OPEN CHAT WINDOW
         ========================================================================= */}
      {isOpen && (
        <div
          className={`pointer-events-auto flex flex-col bg-white rounded-3xl shadow-[0_25px_60px_rgba(0,0,0,0.22)] border border-neutral-200/90 overflow-hidden transition-all duration-300 mb-4 ${
            isExpanded
              ? 'w-[94vw] sm:w-[540px] h-[82vh] max-h-[720px]'
              : 'w-[92vw] sm:w-[410px] h-[560px] max-h-[80vh]'
          }`}
          role="dialog"
          aria-labelledby="ai-assistant-title"
        >
          {/* Header */}
          <div className="bg-[#0A0A0A] text-white px-5 py-4 flex items-center justify-between border-b border-neutral-800 shrink-0">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-xl bg-neutral-900 border border-neutral-700 flex items-center justify-center p-1.5 shadow-sm">
                <HKLogo className="w-full h-full" />
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-[#1FA82C] border-2 border-[#0A0A0A] shadow-[0_0_8px_#35D13F]" />
              </div>

              <div>
                <div className="flex items-center gap-1.5">
                  <h3 id="ai-assistant-title" className="text-sm font-bold text-white tracking-tight">
                    HK AI Strategist
                  </h3>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#1FA82C]/20 text-[#35D13F] border border-[#1FA82C]/30">
                    <Sparkles className="w-2.5 h-2.5" />
                    AI Agent
                  </span>
                </div>
                <p className="text-[11px] text-neutral-400">
                  Online • Client Architecture Consultant
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={handleResetChat}
                title="Restart conversation"
                className="w-8 h-8 rounded-lg hover:bg-white/10 text-neutral-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>

              <button
                type="button"
                onClick={() => setIsExpanded(!isExpanded)}
                title={isExpanded ? 'Standard size' : 'Expand window'}
                className="hidden sm:flex w-8 h-8 rounded-lg hover:bg-white/10 text-neutral-400 hover:text-white items-center justify-center transition-colors cursor-pointer"
              >
                {isExpanded ? (
                  <Minimize2 className="w-3.5 h-3.5" />
                ) : (
                  <Maximize2 className="w-3.5 h-3.5" />
                )}
              </button>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                title="Close chat"
                className="w-8 h-8 rounded-lg hover:bg-white/10 text-neutral-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Chat Messages Body */}
          <div className="flex-1 p-4 sm:p-5 overflow-y-auto space-y-4 bg-[#FBFBFB]">
            {messages.map((msg) => {
              const isUser = msg.role === 'user';

              return (
                <div
                  key={msg.id}
                  className={`flex gap-2.5 ${isUser ? 'justify-end' : 'justify-start'}`}
                >
                  {!isUser && (
                    <div className="w-7 h-7 rounded-lg bg-[#0A0A0A] text-white flex items-center justify-center shrink-0 mt-0.5 shadow-xs border border-neutral-700 p-1">
                      <HKLogo className="w-full h-full" />
                    </div>
                  )}

                  <div
                    className={`max-w-[85%] rounded-2xl p-3.5 sm:p-4 text-xs sm:text-sm shadow-xs ${
                      isUser
                        ? 'bg-[#1FA82C] text-white rounded-br-xs font-medium'
                        : 'bg-white text-neutral-800 border border-neutral-200/80 rounded-bl-xs'
                    }`}
                  >
                    <div className="space-y-1">
                      {renderFormattedContent(msg.content)}
                    </div>

                    <div
                      className={`text-[10px] mt-1.5 font-mono ${
                        isUser ? 'text-white/80 text-right' : 'text-neutral-400 text-left'
                      }`}
                    >
                      {msg.timestamp}
                    </div>

                    {/* Quick Action Shortcuts inside AI message */}
                    {!isUser && msg.isInitial && (
                      <div className="mt-3 pt-3 border-t border-neutral-100 flex flex-wrap gap-1.5">
                        <a
                          href="https://wa.me/923366472492?text=Hello%20HK%20Digital%20Agency,%20I%20am%20chatting%20with%20your%20AI%20and%20want%20to%20discuss%20a%20project!"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold bg-emerald-50 text-[#1FA82C] border border-[#1FA82C]/30 hover:bg-[#1FA82C] hover:text-white transition-colors"
                        >
                          <Phone className="w-3 h-3" />
                          <span>WhatsApp Founder</span>
                        </a>

                        {onNavigateToContact ? (
                          <button
                            type="button"
                            onClick={() => {
                              setIsOpen(false);
                              onNavigateToContact();
                            }}
                            className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-semibold bg-neutral-100 text-neutral-700 hover:bg-neutral-200 transition-colors cursor-pointer"
                          >
                            <span>Brief Form</span>
                            <ArrowUpRight className="w-3 h-3" />
                          </button>
                        ) : (
                          <a
                            href="#contact"
                            onClick={() => setIsOpen(false)}
                            className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-semibold bg-neutral-100 text-neutral-700 hover:bg-neutral-200 transition-colors"
                          >
                            <span>Brief Form</span>
                            <ArrowUpRight className="w-3 h-3" />
                          </a>
                        )}
                      </div>
                    )}
                  </div>

                  {isUser && (
                    <div className="w-7 h-7 rounded-lg bg-neutral-200 text-neutral-700 flex items-center justify-center shrink-0 mt-0.5">
                      <User className="w-3.5 h-3.5" />
                    </div>
                  )}
                </div>
              );
            })}

            {/* Typing Indicator */}
            {isLoading && (
              <div className="flex gap-2.5 justify-start">
                <div className="w-7 h-7 rounded-lg bg-[#0A0A0A] text-white flex items-center justify-center shrink-0 mt-0.5 p-1 border border-neutral-700">
                  <HKLogo className="w-full h-full" />
                </div>
                <div className="bg-white border border-neutral-200/80 rounded-2xl rounded-bl-xs p-3.5 shadow-xs flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#1FA82C] animate-bounce" />
                  <span className="w-2 h-2 rounded-full bg-[#1FA82C] animate-bounce [animation-delay:0.2s]" />
                  <span className="w-2 h-2 rounded-full bg-[#1FA82C] animate-bounce [animation-delay:0.4s]" />
                  <span className="text-[11px] text-neutral-400 font-medium ml-1.5">
                    Analyzing project scope...
                  </span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Suggested Prompts Pills (Only visible when conversation is short) */}
          {messages.length <= 2 && (
            <div className="px-4 py-2 bg-[#F5F5F5] border-t border-neutral-200/70 overflow-x-auto no-scrollbar shrink-0">
              <p className="text-[10px] uppercase tracking-wider font-bold text-neutral-400 mb-1.5">
                Suggested Questions:
              </p>
              <div className="flex flex-nowrap gap-1.5 pb-1">
                {DEFAULT_PROMPTS.map((prompt, idx) => (
                  <button
                    key={idx}
                    type="button"
                    disabled={isLoading}
                    onClick={() => handleSendMessage(prompt)}
                    className="whitespace-nowrap px-3 py-1 rounded-full text-[11px] font-medium bg-white text-neutral-700 border border-neutral-300/80 hover:border-[#1FA82C] hover:text-[#1FA82C] hover:bg-emerald-50/50 transition-colors shrink-0 cursor-pointer disabled:opacity-50"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input Bar */}
          <div className="p-3 sm:p-4 bg-white border-t border-neutral-200/80 shrink-0">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <input
                ref={inputRef}
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Ask about pricing, tech stack, timelines..."
                disabled={isLoading}
                className="flex-1 bg-neutral-100 hover:bg-neutral-50 focus:bg-white text-[#0A0A0A] placeholder-neutral-400 text-xs sm:text-sm px-4 py-3 rounded-2xl border border-neutral-200/80 focus:border-[#1FA82C] focus:ring-2 focus:ring-[#1FA82C]/20 outline-none transition-all"
              />

              <button
                type="submit"
                disabled={!inputMessage.trim() || isLoading}
                aria-label="Send message"
                className="w-11 h-11 rounded-2xl bg-[#1FA82C] hover:bg-[#35D13F] disabled:bg-neutral-200 text-white disabled:text-neutral-400 flex items-center justify-center transition-all duration-200 cursor-pointer disabled:cursor-not-allowed shadow-[0_4px_12px_rgba(31,168,44,0.3)] disabled:shadow-none shrink-0 active:scale-95"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>

            <div className="mt-2 flex items-center justify-between text-[10px] text-neutral-400 px-1">
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-[#1FA82C]" />
                Official HK Digital Agency Agent
              </span>
              <span>Powered by Gemini</span>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          2. FLOATING TRIGGER BUTTON (Always visible at bottom-right)
         ========================================================================= */}
      <div className="pointer-events-auto relative group">
        
        {/* Pulsing notification bubble when unopened */}
        {!isOpen && hasNewMessageNotice && (
          <div className="absolute -top-10 right-0 bg-[#0A0A0A] text-white text-[11px] font-semibold px-3 py-1 rounded-full border border-neutral-700 shadow-lg whitespace-nowrap flex items-center gap-1.5 animate-bounce">
            <span className="w-2 h-2 rounded-full bg-[#1FA82C] shadow-[0_0_8px_#35D13F]" />
            <span>Chat with AI Strategist</span>
          </div>
        )}

        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? 'Close AI Assistant' : 'Open AI Assistant'}
          className={`flex items-center gap-2.5 px-4 py-3 sm:px-5 sm:py-3.5 rounded-full shadow-[0_12px_32px_rgba(0,0,0,0.25)] border transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer select-none ${
            isOpen
              ? 'bg-[#0A0A0A] text-white border-neutral-700'
              : 'bg-gradient-to-r from-[#0A0A0A] via-[#141414] to-[#0A0A0A] text-white border-white/20 hover:border-[#1FA82C]/60 shadow-[0_8px_25px_rgba(31,168,44,0.25)]'
          }`}
        >
          {/* Logo / Bot icon with live pulsing status */}
          <div className="relative flex items-center justify-center w-7 h-7 rounded-lg bg-neutral-900 border border-neutral-700 p-1">
            <HKLogo className="w-full h-full" />
            <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-[#1FA82C] border-2 border-[#0A0A0A] shadow-[0_0_8px_#35D13F]" />
          </div>

          <div className="flex flex-col items-start leading-none pr-1">
            <div className="flex items-center gap-1">
              <span className="text-xs sm:text-sm font-bold tracking-tight text-white">
                HK AI Agent
              </span>
              <Sparkles className="w-3 h-3 text-[#35D13F]" />
            </div>
            <span className="text-[10px] text-neutral-400 font-mono uppercase tracking-wider mt-0.5">
              Client Assistant
            </span>
          </div>
        </button>
      </div>

    </div>
  );
};
