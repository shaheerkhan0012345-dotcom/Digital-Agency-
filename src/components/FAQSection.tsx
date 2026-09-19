import React, { useEffect, useRef, useState } from 'react';
import {
  HelpCircle,
  Plus,
  Minus,
  MessageSquare,
  ArrowUpRight,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'General' | 'Development' | 'Design & UI/UX' | 'Process & Pricing';
  highlights?: string[];
}

const FAQ_ITEMS: FAQItem[] = [
  {
    id: 'faq-timeline',
    question: 'How long does a typical digital project take from kickoff to launch?',
    answer:
      'Most standard websites and conversion-focused landing pages take between 2 to 3 weeks. Comprehensive web platforms, custom SaaS dashboards, and complex headless eCommerce builds generally span 4 to 6 weeks. We work in disciplined weekly sprints with transparent Figma previews and live staging links at every phase.',
    category: 'Process & Pricing',
    highlights: [
      'Landing Pages: 10 – 14 business days',
      'Corporate & Brand Websites: 3 – 4 weeks',
      'Complex Full-Stack Platforms: 4 – 6 weeks',
    ],
  },
  {
    id: 'faq-tech-stack',
    question: 'What technology stack and frameworks does HK Digital Agency build with?',
    answer:
      'We engineer production-grade applications using modern, future-proof technologies. Our primary web stack is React, Next.js (App Router), TypeScript, and Tailwind CSS, coupled with GSAP for buttery 60fps micro-interactions. On the backend, we implement Node.js, Express, PostgreSQL, Cloud SQL, Firebase, or headless CMS platforms (Strapi, Sanity) depending on your scalability requirements.',
    category: 'Development',
    highlights: [
      'Frontend: Next.js, React, TypeScript, Tailwind CSS, GSAP',
      'Backend & DB: Node.js, Express, PostgreSQL, Firebase',
      'Performance: Edge Caching, Sub-second TTFB, 95+ Core Web Vitals',
    ],
  },
  {
    id: 'faq-design-revisions',
    question: 'What is your UI/UX design workflow and revision policy?',
    answer:
      'We do not rely on generic templates or cookie-cutter builders. Every interface is custom-crafted from scratch in Figma based on your target audience, conversion metrics, and brand identity. We present interactive Figma prototypes for review and include 2 to 3 structured revision rounds to ensure every detail matches your exact vision before writing any code.',
    category: 'Design & UI/UX',
    highlights: [
      '100% bespoke design systems in Figma',
      'Interactive clickable prototypes before engineering',
      'Structured revisions with direct designer feedback loops',
    ],
  },
  {
    id: 'faq-seo-mobile',
    question: 'Are your websites fully mobile-responsive and optimized for SEO?',
    answer:
      'Yes, guaranteed. Mobile responsiveness and technical SEO are woven into the very fabric of our architecture—not patched on after the fact. Every website we build features semantic HTML5 tags, JSON-LD structured schema markup, OpenGraph social meta tags, sitemaps, and optimized asset delivery for lightning-fast speeds on smartphones, tablets, and desktop displays.',
    category: 'Development',
    highlights: [
      'Mobile-first responsive layout tested across 15+ screen sizes',
      'Comprehensive on-page & technical SEO architecture',
      'JSON-LD Schema & OpenGraph social share cards included',
    ],
  },
  {
    id: 'faq-international',
    question: 'Can you work with international clients across different time zones?',
    answer:
      'Absolutely. HK Digital Agency operates across global time zones with established client relationships across the United States, United Kingdom, UAE, Europe, and Pakistan. We communicate seamlessly via Slack, WhatsApp, Google Meet, and email, providing regular video async walkthroughs and prompt daily status updates.',
    category: 'General',
    highlights: [
      'Active clients in USA, UK, UAE, and Pakistan',
      'Direct WhatsApp and Slack channels for real-time collaboration',
      'Weekly recorded progress videos and sprint demos',
    ],
  },
  {
    id: 'faq-payment-terms',
    question: 'What are your pricing structures and payment milestones?',
    answer:
      'We offer transparent, fixed-price project quotes with no surprise charges or hidden fees. Standard projects follow a structured milestone schedule: 50% deposit upon kickoff and architecture approval, and 50% upon final quality assurance, client sign-off, and deployment to your production domain.',
    category: 'Process & Pricing',
    highlights: [
      'Fixed-price milestone agreement with transparent contracts',
      'Standard 50% kickoff / 50% launch sign-off structure',
      'Secure payment via Bank Wire, Stripe, or direct transfer',
    ],
  },
  {
    id: 'faq-maintenance-support',
    question: 'Do you provide ongoing maintenance and post-launch support?',
    answer:
      'Every project includes 30 days of complimentary post-launch technical support, bug fixing, and monitoring. We also provide monthly dedicated retainer packages for ongoing performance optimization, feature additions, SEO tracking, and continuous design updates.',
    category: 'General',
    highlights: [
      '30 days complimentary post-launch warranty',
      'Flexible ongoing monthly retainer & support packages',
      'Direct developer emergency channel',
    ],
  },
];

const FAQ_CATEGORIES = ['All', 'General', 'Development', 'Design & UI/UX', 'Process & Pricing'] as const;

interface FAQSectionProps {
  onNavigateToContact?: () => void;
}

export const FAQSection: React.FC<FAQSectionProps> = ({ onNavigateToContact }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const accordionContainerRef = useRef<HTMLDivElement>(null);
  const ctaBoxRef = useRef<HTMLDivElement>(null);

  const [activeCategory, setActiveCategory] = useState<string>('All');
  // Open the first question by default so users immediately see content
  const [openIds, setOpenIds] = useState<string[]>(['faq-timeline']);

  const toggleItem = (id: string) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const filteredFAQs =
    activeCategory === 'All'
      ? FAQ_ITEMS
      : FAQ_ITEMS.filter((item) => item.category === activeCategory);

  // GSAP Entrance Animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: headerRef.current,
              start: 'top 88%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      if (accordionContainerRef.current) {
        const items = accordionContainerRef.current.querySelectorAll('.faq-accordion-item');
        if (items.length > 0) {
          gsap.fromTo(
            items,
            { opacity: 0, y: 25 },
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              stagger: 0.08,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: accordionContainerRef.current,
                start: 'top 85%',
                toggleActions: 'play none none none',
              },
              clearProps: 'transform',
            }
          );
        }
      }

      if (ctaBoxRef.current) {
        gsap.fromTo(
          ctaBoxRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: ctaBoxRef.current,
              start: 'top 90%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [activeCategory]);

  return (
    <section
      ref={sectionRef}
      id="faqs-section"
      className="relative w-full bg-white text-[#0A0A0A] pt-20 pb-28 md:pt-28 md:pb-36 border-t border-[#F0F0F0] overflow-hidden"
      aria-labelledby="faqs-heading"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* =========================================================================
            1. SECTION HEADER (Centered & Clean)
           ========================================================================= */}
        <div ref={headerRef} className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-[#1FA82C]/20 text-[#1FA82C] text-xs font-bold uppercase tracking-wider mb-4 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#1FA82C] shadow-[0_0_8px_#35D13F]" />
            <span>Answers & Transparency</span>
          </div>

          <h2
            id="faqs-heading"
            className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-[#0A0A0A] tracking-tight mb-4"
          >
            Frequently Asked <span className="text-[#1FA82C]">Questions</span>
          </h2>

          <p className="text-[#6B6B6B] text-base sm:text-lg leading-relaxed">
            Everything you need to know about working with HK Digital Agency, our development
            architecture, project turnarounds, and pricing models.
          </p>
        </div>

        {/* =========================================================================
            2. CATEGORY SELECTOR CHIPS
           ========================================================================= */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {FAQ_CATEGORIES.map((category) => {
            const isActive = activeCategory === category;
            return (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-[#1FA82C] text-white shadow-[0_4px_14px_rgba(31,168,44,0.35)] scale-105'
                    : 'bg-neutral-50 text-neutral-600 hover:text-black hover:bg-neutral-100 border border-neutral-200/80'
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        {/* =========================================================================
            3. ACCORDION CONTAINER
           ========================================================================= */}
        <div ref={accordionContainerRef} className="space-y-4">
          {filteredFAQs.map((faq) => {
            const isOpen = openIds.includes(faq.id);

            return (
              <div
                key={faq.id}
                className={`faq-accordion-item rounded-2xl sm:rounded-3xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? 'bg-[#FAFAFA] border-[#1FA82C]/50 shadow-md ring-1 ring-[#1FA82C]/15'
                    : 'bg-white border-neutral-200/80 hover:border-neutral-300 hover:shadow-xs'
                }`}
              >
                {/* Accordion Trigger Header */}
                <button
                  type="button"
                  onClick={() => toggleItem(faq.id)}
                  aria-expanded={isOpen}
                  className="w-full text-left px-6 py-5 sm:px-8 sm:py-6 flex items-center justify-between gap-4 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1FA82C]"
                >
                  <span className="text-base sm:text-lg md:text-xl font-display font-bold text-[#0A0A0A] leading-snug tracking-tight transition-colors duration-200 hover:text-[#1FA82C]">
                    {faq.question}
                  </span>

                  <span
                    className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
                      isOpen
                        ? 'bg-[#1FA82C] text-white rotate-180 shadow-[0_4px_12px_rgba(31,168,44,0.35)]'
                        : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                    }`}
                  >
                    {isOpen ? (
                      <Minus className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
                    ) : (
                      <Plus className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
                    )}
                  </span>
                </button>

                {/* Accordion Collapsible Body */}
                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="px-6 pb-6 sm:px-8 sm:pb-7 pt-1 space-y-4 border-t border-neutral-100/80">
                      <p className="text-neutral-600 text-sm sm:text-base leading-relaxed">
                        {faq.answer}
                      </p>

                      {faq.highlights && (
                        <div className="p-4 rounded-xl bg-white border border-neutral-200/80 space-y-2">
                          <p className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                            Key Details
                          </p>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {faq.highlights.map((h, hIdx) => (
                              <div
                                key={hIdx}
                                className="flex items-center gap-2 text-xs sm:text-sm text-neutral-800 font-medium"
                              >
                                <CheckCircle2 className="w-4 h-4 text-[#1FA82C] shrink-0" />
                                <span>{h}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* =========================================================================
            4. QUICK CTA FOOTER BOX: "Still have questions?"
           ========================================================================= */}
        <div
          ref={ctaBoxRef}
          className="mt-14 sm:mt-16 rounded-3xl bg-gradient-to-r from-[#0A0A0A] via-[#141414] to-[#0A0A0A] text-white p-6 sm:p-10 border border-neutral-800 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#35D13F]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Direct Founder & Engineering Consultation</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-display font-bold text-white">
              Still have a specific question about your project?
            </h3>
            <p className="text-xs sm:text-sm text-neutral-400 max-w-xl">
              We provide free 15-minute consultations to review your requirements, suggest the right
              architecture, and give you an exact quote.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href="https://wa.me/923366472492?text=Hello%20HK%20Digital%20Agency,%20I%20have%20a%20question%20about%20your%20services"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-xs sm:text-sm font-bold text-white bg-[#1FA82C] hover:bg-[#35D13F] transition-all hover:scale-105 shadow-[0_4px_16px_rgba(31,168,44,0.4)] cursor-pointer"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp Quick Chat</span>
            </a>

            {onNavigateToContact ? (
              <button
                type="button"
                onClick={onNavigateToContact}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-xs sm:text-sm font-semibold text-neutral-300 hover:text-white bg-white/10 hover:bg-white/15 transition-all cursor-pointer"
              >
                <span>Send Brief</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            ) : (
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-xs sm:text-sm font-semibold text-neutral-300 hover:text-white bg-white/10 hover:bg-white/15 transition-all"
              >
                <span>Send Brief</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>

      </div>
    </section>
  );
};
