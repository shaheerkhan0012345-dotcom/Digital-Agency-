import React, { useEffect, useRef, useState, useCallback } from 'react';
import {
  Calendar,
  Clock,
  ArrowUpRight,
  Sparkles,
  X,
  BookOpen,
  Share2,
  CheckCircle2,
  ChevronRight,
  Flame,
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export interface BlogPost {
  id: string;
  title: string;
  category: 'UI/UX Design' | 'Web Engineering' | 'SEO & Growth' | 'Agency Insights';
  date: string;
  readTime: string;
  excerpt: string;
  coverImage: string;
  featured?: boolean;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  content: {
    introduction: string;
    subheadings: {
      heading: string;
      body: string;
      bulletPoints?: string[];
    }[];
    conclusion: string;
    takeaway: string;
  };
}

const BLOG_POSTS: BlogPost[] = [
  {
    id: 'kinetic-typography-and-micro-interactions',
    title: 'Why Kinetic Typography & Micro-Interactions Double User Retention in 2026',
    category: 'UI/UX Design',
    date: 'Sep 16, 2026',
    readTime: '5 min read',
    featured: true,
    excerpt:
      'Static websites are fading. Modern audiences expect digital atmospheres that respond physically to cursor velocity, touch pressure, and ambient scroll.',
    coverImage:
      'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=1200&auto=format&fit=crop',
    author: {
      name: 'Shaheer Khan',
      role: 'Lead Creative Technologist',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop',
    },
    content: {
      introduction:
        'Over the past two years, web consumer behavior underwent a fundamental psychological shift. Attention spans have dropped below four seconds, but engagement depth on interactive experiences has skyrocketed by 180%. When a user moves their cursor and typography reacts dynamically, a visceral sense of craftsmanship is formed.',
      subheadings: [
        {
          heading: '1. The Neurological Impact of Reactive Motion',
          body: 'Micro-interactions trigger instant cognitive affirmation. When buttons gently pull toward cursor gravity, or when headlines scrub smoothly into focus via GSAP ScrollTrigger, users intuitively trust the software.',
          bulletPoints: [
            'Interactive hover states lower cognitive load by validating clickable boundaries.',
            'Spatial spring-physics prevent visual fatigue compared to linear mechanical transitions.',
            'Perceived site performance increases by up to 40% when transitions mask data operations.',
          ],
        },
        {
          heading: '2. The Delicate Balance: Meaningful Motion vs. Visual Noise',
          body: 'Animation should never obstruct comprehension. At HK Digital Agency, we adhere strictly to the 150–350ms response threshold with zero jank, prioritizing 60fps GPU acceleration across all mobile screens.',
        },
      ],
      conclusion:
        'Incorporating kinetic motion is no longer a luxury aesthetic touch; it is a direct lever for brand prestige, session duration, and overall conversion velocity.',
      takeaway: 'Craft interactions that reward curiosity without delaying the primary task.',
    },
  },
  {
    id: 'nextjs-headless-ecommerce-speed',
    title: 'Sub-Second Page Loads: Architecting Scalable Next.js Headless Stores',
    category: 'Web Engineering',
    date: 'Sep 12, 2026',
    readTime: '6 min read',
    excerpt:
      'How decoupling the frontend storefront from legacy backends yields 99+ Core Web Vital scores and unlocks unprecedented conversion rates.',
    coverImage:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop',
    author: {
      name: 'Hamza Tariq',
      role: 'Head of Web Engineering',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop',
    },
    content: {
      introduction:
        'In global retail, every 100-millisecond delay in checkout or product catalog rendering causes an average 7% drop in transaction conversion. Traditional monolithic architectures buckle under sudden flash sales or media traffic spikes.',
      subheadings: [
        {
          heading: '1. Edge CDN Routing & Dynamic ISR',
          body: 'By leveraging incremental static regeneration (ISR) with modern edge networks, product pages generate instantly from nearest global nodes, keeping server TTFB under 80ms.',
          bulletPoints: [
            'Distributed caching across regional cloud points of presence.',
            'Optimized image pipelines delivering AVIF & WebP with adaptive sizing.',
            'Zero-bundle hydration layers preventing main-thread CPU choking.',
          ],
        },
        {
          heading: '2. Frictionless Real-Time Checkout Flows',
          body: 'Integrating headless Stripe and Apple Pay direct pipelines cuts user purchasing steps from five complex screens to a single authenticated tap.',
        },
      ],
      conclusion:
        'High speed is the ultimate sales pitch. A sub-second website communicates authority before the prospective buyer even reads the headline.',
      takeaway: 'Speed is not a technical afterthought; it is your highest-leverage conversion metric.',
    },
  },
  {
    id: 'seo-algorithmic-shifts-ai-search',
    title: 'Navigating Search Generative AI: The New Rules of High-Authority SEO',
    category: 'SEO & Growth',
    date: 'Sep 08, 2026',
    readTime: '4 min read',
    excerpt:
      'Traditional keyword stuffing is obsolete. Learn how search engines and AI answer engines index contextual topical authority and semantic depth.',
    coverImage:
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop',
    author: {
      name: 'Aisha Malik',
      role: 'Growth & SEO Strategist',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=300&auto=format&fit=crop',
    },
    content: {
      introduction:
        'With generative search engines summarizing answers directly in search result pages, winning traffic requires shifting from isolated keywords to authoritative topical clusters and verified digital authorship.',
      subheadings: [
        {
          heading: '1. Information Gain & Semantic Entities',
          body: 'AI search systems prioritize pages that contribute fresh data points, verifiable client case studies, and proprietary research rather than rehashed summaries.',
          bulletPoints: [
            'Structured JSON-LD schema linking verified real-world digital entities.',
            'In-depth technical problem breakdowns that AI engines quote as primary citations.',
            'First-party performance metrics and genuine client proof points.',
          ],
        },
      ],
      conclusion:
        'Write for human clarity, engineer for machine comprehension. High semantic relevance consistently outperforms generic volume.',
      takeaway: 'Focus on providing original insights that generative search engines cannot replicate.',
    },
  },
  {
    id: 'high-converting-b2b-landing-page-blueprint',
    title: 'The Blueprint for B2B Digital Agency Landing Pages That Actually Convert',
    category: 'Agency Insights',
    date: 'Aug 30, 2026',
    readTime: '5 min read',
    excerpt:
      'An exhaustive breakdown of visual hierarchy, social proof placement, and frictionless lead intake mechanics tested on over 40+ client campaigns.',
    coverImage:
      'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop',
    author: {
      name: 'Shaheer Khan',
      role: 'Lead Creative Technologist',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop',
    },
    content: {
      introduction:
        'Most agency websites fail because they make the agency the hero rather than the client’s transformation. Converting high-value B2B decision-makers requires clarity over cleverness, demonstrable proof, and immediate access to communication channels.',
      subheadings: [
        {
          heading: '1. The Three-Second Value Assertion',
          body: 'Above the fold, prospective partners must immediately perceive who you are, what outcomes you deliver, and why your engineering standards exceed ordinary competitors.',
          bulletPoints: [
            'Visible social proof and verified client reviews above the fold.',
            'Direct WhatsApp & multi-channel contact routing for immediate outreach.',
            'Crisp, interactive portfolio previews without generic stock mockups.',
          ],
        },
      ],
      conclusion:
        'Treat your landing page as an elite consultative presentation, not an uninspired brochure.',
      takeaway: 'Clarity beats cleverness every single time.',
    },
  },
];

const CATEGORIES = ['All', 'UI/UX Design', 'Web Engineering', 'SEO & Growth', 'Agency Insights'] as const;

export const BlogSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const cardElementsRef = useRef<(HTMLElement | null)[]>([]);

  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);

  const modalBackdropRef = useRef<HTMLDivElement>(null);
  const modalContentRef = useRef<HTMLDivElement>(null);

  const filteredPosts =
    activeCategory === 'All'
      ? BLOG_POSTS
      : BLOG_POSTS.filter((post) => post.category === activeCategory);

  // Animate Entrance with GSAP ScrollTrigger
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

      const validCards = cardElementsRef.current.filter(Boolean);
      if (validCards.length > 0) {
        gsap.fromTo(
          validCards,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: cardsContainerRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
            clearProps: 'transform',
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [activeCategory]);

  const openPostModal = (post: BlogPost) => {
    setSelectedPost(post);
    setCopiedLink(false);
    document.body.style.overflow = 'hidden';

    requestAnimationFrame(() => {
      if (modalBackdropRef.current && modalContentRef.current) {
        gsap.fromTo(
          modalBackdropRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.25, ease: 'power2.out' }
        );
        gsap.fromTo(
          modalContentRef.current,
          { opacity: 0, scale: 0.94, y: 20 },
          { opacity: 1, scale: 1, y: 0, duration: 0.35, ease: 'back.out(1.2)' }
        );
      }
    });
  };

  const closePostModal = useCallback(() => {
    if (modalBackdropRef.current && modalContentRef.current) {
      gsap.to(modalContentRef.current, {
        opacity: 0,
        scale: 0.95,
        duration: 0.2,
        ease: 'power2.in',
      });
      gsap.to(modalBackdropRef.current, {
        opacity: 0,
        duration: 0.2,
        ease: 'power2.in',
        onComplete: () => {
          setSelectedPost(null);
          document.body.style.overflow = '';
        },
      });
    } else {
      setSelectedPost(null);
      document.body.style.overflow = '';
    }
  }, []);

  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  // Keyboard close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedPost) {
        closePostModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedPost, closePostModal]);

  return (
    <section
      ref={sectionRef}
      id="blog-section"
      className="relative w-full bg-[#FAFAFA] text-[#0A0A0A] pt-20 pb-28 md:pt-28 md:pb-36 border-t border-[#EDEDED] overflow-hidden"
      aria-labelledby="blog-heading"
    >
      {/* Ambient background glow */}
      <div className="absolute top-1/3 -right-40 w-96 h-96 rounded-full bg-[#1FA82C]/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 -left-40 w-96 h-96 rounded-full bg-[#35D13F]/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* =========================================================================
            1. SECTION HEADER (2-Column Split matching Agency Design Language)
           ========================================================================= */}
        <div
          ref={headerRef}
          className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-16 items-start mb-12 sm:mb-16"
        >
          {/* Left Column: Eyebrow "Our Blog & Insights" */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3 mb-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#1FA82C] shadow-[0_0_10px_#35D13F] shrink-0" />
              <h2
                id="blog-heading"
                className="text-2xl sm:text-3xl md:text-[34px] font-display font-extrabold tracking-tight text-[#1FA82C]"
              >
                Latest Insights
              </h2>
            </div>
            <p className="text-xs uppercase tracking-wider font-semibold text-neutral-400 pl-5.5">
              Engineering, Design & Strategy
            </p>
          </div>

          {/* Right Column: Narrative summary */}
          <div className="lg:col-span-8">
            <p className="text-[#6B6B6B] text-base sm:text-lg leading-[1.75] font-normal">
              Deep dives into modern web engineering, high-conversion UI/UX frameworks, SEO intelligence,
              and creative digital direction. Authored by the engineers and designers building next-generation
              experiences at HK Digital Agency.
            </p>
          </div>
        </div>

        {/* =========================================================================
            2. INTERACTIVE CATEGORY FILTER CHIPS
           ========================================================================= */}
        <div className="flex flex-wrap items-center gap-2 mb-10 pb-2">
          {CATEGORIES.map((category) => {
            const isActive = activeCategory === category;
            return (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-[#1FA82C] text-white shadow-[0_4px_14px_rgba(31,168,44,0.35)] scale-105'
                    : 'bg-white text-neutral-600 hover:text-black border border-neutral-200/80 hover:border-neutral-300 hover:bg-neutral-50'
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        {/* =========================================================================
            3. BLOG POSTS GRID: Responsive 3-Column Bento Layout
           ========================================================================= */}
        <div
          ref={cardsContainerRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch"
        >
          {filteredPosts.map((post, index) => {
            return (
              <article
                key={post.id}
                ref={(el) => {
                  cardElementsRef.current[index] = el;
                }}
                onClick={() => openPostModal(post)}
                className="group flex flex-col bg-white rounded-3xl border border-neutral-200/80 shadow-xs hover:shadow-xl hover:border-[#1FA82C]/40 transition-all duration-300 overflow-hidden cursor-pointer text-left"
              >
                {/* Post Cover Image */}
                <div className="relative w-full aspect-[16/10] overflow-hidden bg-neutral-100">
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Category badge */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-white/95 text-[#0A0A0A] backdrop-blur-md shadow-sm group-hover:bg-[#1FA82C] group-hover:text-white transition-colors duration-300">
                      {post.category}
                    </span>
                  </div>

                  {/* Featured Badge if applicable */}
                  {post.featured && (
                    <div className="absolute top-4 right-4 z-10">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-[#0A0A0A]/90 text-white backdrop-blur-md shadow-sm">
                        <Flame className="w-3 h-3 text-[#35D13F] fill-[#35D13F]" />
                        Trending
                      </span>
                    </div>
                  )}
                </div>

                {/* Content Block */}
                <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    {/* Date & Read Time */}
                    <div className="flex items-center gap-3 text-xs text-neutral-400">
                      <span className="inline-flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-[#1FA82C]" />
                        {post.date}
                      </span>
                      <span>•</span>
                      <span className="inline-flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-neutral-400" />
                        {post.readTime}
                      </span>
                    </div>

                    {/* Post Title */}
                    <h3 className="text-lg sm:text-xl font-display font-bold text-[#0A0A0A] leading-snug group-hover:text-[#1FA82C] transition-colors duration-200 line-clamp-2">
                      {post.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-sm text-[#6B6B6B] leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>
                  </div>

                  {/* Author Meta & Action */}
                  <div className="pt-4 border-t border-neutral-100 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <img
                        src={post.author.avatar}
                        alt={post.author.name}
                        className="w-8 h-8 rounded-full object-cover border border-neutral-200 shrink-0"
                      />
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-[#0A0A0A] truncate">
                          {post.author.name}
                        </p>
                        <p className="text-[11px] text-neutral-400 truncate">
                          {post.author.role}
                        </p>
                      </div>
                    </div>

                    <div className="w-9 h-9 rounded-full bg-neutral-100 group-hover:bg-[#1FA82C] text-neutral-600 group-hover:text-white flex items-center justify-center shrink-0 transition-colors duration-200">
                      <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

      </div>

      {/* =========================================================================
          4. INTERACTIVE ARTICLE LIGHTBOX / READING MODAL
         ========================================================================= */}
      {selectedPost && (
        <div
          ref={modalBackdropRef}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-md"
          onClick={closePostModal}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-blog-title"
        >
          <div
            ref={modalContentRef}
            className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white rounded-3xl shadow-2xl border border-white/20 text-[#0A0A0A] p-6 sm:p-10"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closePostModal}
              aria-label="Close article reader"
              className="absolute top-5 right-5 z-20 w-10 h-10 rounded-full bg-neutral-100 hover:bg-[#0A0A0A] text-neutral-600 hover:text-white flex items-center justify-center transition-colors duration-200 cursor-pointer focus:outline-none"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header Hero Image */}
            <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden mb-6 bg-neutral-900 shadow-sm">
              <img
                src={selectedPost.coverImage}
                alt={selectedPost.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
                <span className="px-3 py-1 rounded-full bg-[#1FA82C] text-xs font-bold uppercase tracking-wider">
                  {selectedPost.category}
                </span>
                <span className="text-xs font-mono text-white/90 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  {selectedPost.readTime}
                </span>
              </div>
            </div>

            {/* Meta & Title */}
            <div className="flex items-center gap-3 text-xs text-neutral-400 mb-3">
              <span>Published on {selectedPost.date}</span>
              <span>•</span>
              <span className="text-[#1FA82C] font-semibold">HK Digital Agency Insights</span>
            </div>

            <h2
              id="modal-blog-title"
              className="text-2xl sm:text-3xl lg:text-4xl font-display font-extrabold text-[#0A0A0A] tracking-tight leading-snug mb-6"
            >
              {selectedPost.title}
            </h2>

            {/* Author Profile */}
            <div className="flex items-center gap-3 p-4 rounded-2xl bg-neutral-50 border border-neutral-100 mb-8">
              <img
                src={selectedPost.author.avatar}
                alt={selectedPost.author.name}
                className="w-11 h-11 rounded-full object-cover border-2 border-white shadow-xs"
              />
              <div>
                <p className="text-sm font-bold text-[#0A0A0A]">
                  {selectedPost.author.name}
                </p>
                <p className="text-xs text-neutral-500">
                  {selectedPost.author.role} • Digital Craft & Architecture
                </p>
              </div>
            </div>

            {/* Body Content */}
            <div className="space-y-6 text-neutral-700 leading-relaxed text-base sm:text-lg">
              <p className="font-medium text-neutral-900 border-l-4 border-[#1FA82C] pl-4 py-1 italic bg-emerald-50/40 rounded-r-lg">
                "{selectedPost.content.introduction}"
              </p>

              {selectedPost.content.subheadings.map((sub, idx) => (
                <div key={idx} className="space-y-3 pt-2">
                  <h3 className="text-xl font-display font-bold text-[#0A0A0A]">
                    {sub.heading}
                  </h3>
                  <p className="text-neutral-600 text-base leading-relaxed">
                    {sub.body}
                  </p>
                  {sub.bulletPoints && (
                    <ul className="space-y-2 pt-1 pl-1">
                      {sub.bulletPoints.map((point, pIdx) => (
                        <li key={pIdx} className="flex items-start gap-2.5 text-sm text-neutral-700">
                          <CheckCircle2 className="w-4 h-4 text-[#1FA82C] shrink-0 mt-0.5" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}

              <div className="pt-4">
                <h3 className="text-xl font-display font-bold text-[#0A0A0A] mb-2">
                  Final Reflection
                </h3>
                <p className="text-neutral-600 text-base leading-relaxed">
                  {selectedPost.content.conclusion}
                </p>
              </div>

              {/* Key Takeaway Card */}
              <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-500/10 via-emerald-500/5 to-transparent border border-[#1FA82C]/30 flex items-start gap-3.5">
                <Sparkles className="w-5 h-5 text-[#1FA82C] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs uppercase font-bold tracking-wider text-[#1FA82C] mb-1">
                    Executive Takeaway
                  </h4>
                  <p className="text-sm font-semibold text-neutral-900">
                    {selectedPost.content.takeaway}
                  </p>
                </div>
              </div>
            </div>

            {/* Footer actions inside Reader */}
            <div className="mt-10 pt-6 border-t border-neutral-100 flex flex-wrap items-center justify-between gap-4">
              <button
                type="button"
                onClick={handleCopyLink}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold text-neutral-600 hover:bg-neutral-100 transition-colors cursor-pointer"
              >
                <Share2 className="w-3.5 h-3.5 text-[#1FA82C]" />
                <span>{copiedLink ? 'Link Copied!' : 'Share Article'}</span>
              </button>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={closePostModal}
                  className="px-5 py-2.5 rounded-full text-sm font-semibold text-neutral-600 hover:bg-neutral-100 transition-colors cursor-pointer"
                >
                  Close Reader
                </button>
                <a
                  href="#contact"
                  onClick={closePostModal}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-[#1FA82C] to-[#35D13F] hover:shadow-[0_4px_16px_rgba(31,168,44,0.4)] transition-all hover:scale-[1.02]"
                >
                  <span>Build with Our Team</span>
                  <ChevronRight className="w-4 h-4" />
                </a>
              </div>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
