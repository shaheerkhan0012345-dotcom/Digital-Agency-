import express, { Request, Response } from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const PORT = 3000;
const app = express();

app.use(express.json());

// Lazy-initialized Gemini Client
let aiClient: GoogleGenAI | null = null;

function getAiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }
  if (!aiClient) {
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return aiClient;
}

const SYSTEM_INSTRUCTION = `
You are the elite AI Client Consultant for HK Digital Agency.
Your mission is to welcome prospective clients, understand their project vision, recommend modern tech architectures, provide realistic timelines and pricing milestones, and guide them to initiate a project with our team.

About HK Digital Agency:
- Brand: HK Digital Agency
- Primary Tagline: "Change Your Business Strategy with Next-Gen Digital Engineering"
- Global Presence: Offices in Pakistan and UAE, serving international clients across the United States, United Kingdom, UAE, Europe, and Asia.
- Founders & Leadership: Shaheer Khan (Lead Creative Technologist & Founder), Hamza Tariq (Head of Web Engineering).

Core Services:
1. Web Development & Full-Stack Engineering:
   - Modern Stack: React 19, Next.js (App Router), TypeScript, Tailwind CSS, GSAP for 60fps micro-interactions, Node.js, Express, PostgreSQL, Cloud SQL, Firebase.
   - Headless eCommerce (Shopify/Next.js), Custom Web Applications, High-Converting Landing Pages, SaaS MVPs.
   - Speed & Core Web Vitals: 95+ PageSpeed scores, sub-second TTFB, edge CDN caching.
2. UI/UX & Digital Product Design:
   - 100% custom-crafted in Figma (no generic templates).
   - Clickable interactive prototypes, responsive design systems, usability testing.
3. Video Editing & Motion Graphics:
   - Promotional videos, 3D motion animations, social media brand assets.
4. Technical SEO & Performance Audits:
   - Semantic HTML5, JSON-LD Schema markup, OpenGraph social cards, search index optimization.

Project Timelines & Process:
- Landing Pages: 10 – 14 business days.
- Corporate Websites / Brand Overhauls: 3 – 4 weeks.
- Custom Full-Stack Platforms & Headless Stores: 4 – 6 weeks.
- Payment Milestones: 50% deposit upon kickoff and architecture approval; 50% upon final quality sign-off and deployment.

Direct Communication Channels:
- WhatsApp: +92 336 6472492 / +92 311 555 4198
- Project Brief Form: On the website (#contact)
- Email: contact@hkdigitalagency.com

Tone & Style:
- Warm, articulate, consultative, authoritative, and concise.
- Use clean formatting with short paragraphs and bullet points when listing details.
- Always offer clear next steps (e.g. inviting them to share their project requirements or connect directly on WhatsApp).
`;

// API Routes
app.get('/api/health', (req: Request, res: Response) => {
  res.json({
    status: 'ok',
    service: 'HK Digital Agency AI Backend',
    geminiConfigured: Boolean(process.env.GEMINI_API_KEY),
    timestamp: new Date().toISOString(),
  });
});

app.post('/api/ai/chat', async (req: Request, res: Response) => {
  try {
    const { messages = [], userMessage } = req.body;

    if (!userMessage || typeof userMessage !== 'string' || !userMessage.trim()) {
      return res.status(400).json({ error: 'User message is required.' });
    }

    const client = getAiClient();

    // Fallback if API key is not yet set up in the environment
    if (!client) {
      const lower = userMessage.toLowerCase();
      let fallbackReply =
        "Welcome to HK Digital Agency! We specialize in custom Next.js/React web engineering, bespoke UI/UX design in Figma, and SEO optimization. How can we elevate your digital presence today?";

      if (lower.includes('price') || lower.includes('cost') || lower.includes('rate') || lower.includes('quote')) {
        fallbackReply =
          "We offer transparent, fixed-price milestone agreements: 50% deposit upon kickoff and architecture sign-off, and 50% upon final testing and production deployment. Landing pages typically start at 10-14 day turnarounds, while full-stack platforms take 4-6 weeks. You can also share your specific requirements via our Contact form or WhatsApp (+92 336 6472492) for an exact estimate!";
      } else if (lower.includes('timeline') || lower.includes('how long') || lower.includes('duration') || lower.includes('time')) {
        fallbackReply =
          "Our delivery timelines are streamlined and sprint-based:\n• Landing Pages: 10–14 business days\n• Corporate & Brand Websites: 3–4 weeks\n• Custom Full-Stack Platforms & Headless Stores: 4–6 weeks\nEvery milestone includes interactive Figma previews and live staging links.";
      } else if (lower.includes('service') || lower.includes('tech') || lower.includes('stack') || lower.includes('react') || lower.includes('next')) {
        fallbackReply =
          "HK Digital Agency engineers enterprise-grade web applications using:\n• Frontend: Next.js, React 19, TypeScript, Tailwind CSS, GSAP for smooth 60fps motion\n• Backend & Databases: Node.js, Express, PostgreSQL, Cloud SQL, Firebase\n• Design: 100% custom UI/UX design systems in Figma\n• Growth: Technical SEO, JSON-LD schema, and sub-second Core Web Vitals optimization.";
      } else if (lower.includes('contact') || lower.includes('call') || lower.includes('whatsapp') || lower.includes('email') || lower.includes('reach')) {
        fallbackReply =
          "You can reach our leadership and engineering team directly:\n• WhatsApp: +92 336 6472492 (instant response)\n• Dedicated Brief Form: Visit our Contact page to specify budget and timelines\n• Email: contact@hkdigitalagency.com\nWe provide free 15-minute consultations to review your project scope!";
      }

      return res.json({
        reply: fallbackReply,
        source: 'fallback',
        suggestions: [
          'What are your project timelines & milestones?',
          'What tech stack do you recommend for high speed?',
          'How does your custom UI/UX design process work?',
          'How do I start a project with HK Digital Agency?',
        ],
      });
    }

    // Prepare contents array for Gemini
    const contents: Array<{ role: 'user' | 'model'; parts: Array<{ text: string }> }> = [];

    // Append up to last 6 chat history messages for context
    if (Array.isArray(messages)) {
      const recentHistory = messages.slice(-6);
      for (const msg of recentHistory) {
        if (msg.role === 'user' || msg.role === 'model') {
          contents.push({
            role: msg.role,
            parts: [{ text: String(msg.content) }],
          });
        }
      }
    }

    // Append current user message
    contents.push({
      role: 'user',
      parts: [{ text: userMessage.trim() }],
    });

    const response = await client.models.generateContent({
      model: 'gemini-3.8-flash',
      contents,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
        maxOutputTokens: 800,
      },
    });

    const replyText =
      response.text ||
      "I'm here to assist you with HK Digital Agency's engineering and design services. What would you like to discuss?";

    return res.json({
      reply: replyText,
      source: 'gemini',
      suggestions: [
        'What are your project timelines & pricing?',
        'Can you build a high-performance Next.js store?',
        'How does your custom UI/UX design process work?',
        'How can we schedule a discovery call?',
      ],
    });
  } catch (error: unknown) {
    console.error('Error generating AI response:', error);
    const errorMessage = error instanceof Error ? error.message : 'Internal error';

    // Graceful fallback response so the client conversation remains intact
    return res.json({
      reply:
        "Thank you for your message! Our engineering team at HK Digital Agency is ready to discuss your project requirements. You can also message us directly on WhatsApp (+92 336 6472492) or submit a brief via our Contact page for an immediate quote.",
      source: 'fallback-error',
      error: process.env.NODE_ENV !== 'production' ? errorMessage : undefined,
      suggestions: [
        'How do I start a project?',
        'Tell me about your UI/UX and web development stack',
        'What are your pricing milestone models?',
      ],
    });
  }
});

// Vite middleware & Static Serving
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[HK Digital Agency] Server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
