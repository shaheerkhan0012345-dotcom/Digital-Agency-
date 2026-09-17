import React, { useState, useEffect, useRef } from 'react';
import {
  ArrowRight,
  Video,
  Search,
  Palette,
  Code2,
  TrendingUp,
  Sparkles,
  CheckCircle2,
  Layers,
  ChevronDown
} from 'lucide-react';

/**
 * Service Item Data Contract
 */
interface ServiceItem {
  id: string;
  title: string;
  category: string;
  description: string;
  stats: string;
  features: string[];
  mockup: {
    type: 'video' | 'seo' | 'design' | 'dev' | 'marketing';
    tag: string;
    headline: string;
    subtext: string;
    accentColor: string;
    tiltDeg: number;
  };
}

const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'video-editing',
    title: 'Video Editing',
    category: 'Motion & Post-Production',
    description: 'High-retention cinematic edits, short-form viral cuts, color grading, and dynamic sound design tuned for engagement.',
    stats: '+340% View Retention',
    features: ['4K Multi-cam Timeline', 'Sound Design & Foley', 'Kinetic Typography', 'Color Grading (DaVinci)'],
    mockup: {
      type: 'video',
      tag: 'PREMIERE & RESOLVE WORKFLOW',
      headline: 'Cinematic Reel & Social Cuts',
      subtext: 'Rendered at 60fps with optimized bitrate & custom motion graphics',
      accentColor: '#35D13F',
      tiltDeg: -4,
    },
  },
  {
    id: 'seo-service',
    title: 'SEO Service',
    category: 'Search Engine Optimization',
    description: 'Data-driven technical SEO, keyword authority clustering, semantic optimization, and high-converting backlink architectures.',
    stats: '#1 Page Rankings',
    features: ['Core Web Vitals 99+', 'Schema & Semantic Tags', 'Competitive SERP Audits', 'Organic Inbound Funnels'],
    mockup: {
      type: 'seo',
      tag: 'TECHNICAL & CONTENT SEO',
      headline: 'Search Impression Velocity',
      subtext: '+412% Organic growth over 90 days across tier-1 keywords',
      accentColor: '#1FA82C',
      tiltDeg: -5,
    },
  },
  {
    id: 'graphic-designing',
    title: 'Graphic Designing',
    category: 'Brand Identity & Visuals',
    description: 'Iconic brand design systems, high-converting social collateral, custom 3D vectors, and pitch-deck design.',
    stats: '100% Bespoke Identity',
    features: ['Vector Design Systems', 'Visual Identity Manuals', 'Marketing Collateral', 'Iconography & 3D Assets'],
    mockup: {
      type: 'design',
      tag: 'BRANDING & SYSTEM GUIDELINES',
      headline: 'Visual Design Framework',
      subtext: 'Harmonious typography hierarchy with scalable vector components',
      accentColor: '#35D13F',
      tiltDeg: -3,
    },
  },
  {
    id: 'software-development',
    title: 'Software Development',
    category: 'Full-Stack Engineering',
    description: 'Lightning-fast web applications, scalable React/Node microservices, database schemas, and fluid interactive animations.',
    stats: '99.9% Uptime Architecture',
    features: ['Next.js / Vite SPA', 'Tailwind & Motion Systems', 'Secure REST & GraphQL APIs', 'Cloud Native Deployment'],
    mockup: {
      type: 'dev',
      tag: 'FULL-STACK CLOUD STACK',
      headline: 'Engineered Web Architecture',
      subtext: 'Sub-100ms API response latency with end-to-end type safety',
      accentColor: '#1FA82C',
      tiltDeg: -5,
    },
  },
  {
    id: 'digital-marketing',
    title: 'Digital Marketing',
    category: 'Performance & Paid Ads',
    description: 'Omni-channel performance marketing, targeted paid acquisition campaigns, CRO landing pages, and automated funnels.',
    stats: '4.8x Average ROAS',
    features: ['Meta & Google Ads Engine', 'Conversion Rate Optimization', 'A/B Test Analytics', 'Retargeting Funnel Flows'],
    mockup: {
      type: 'marketing',
      tag: 'PERFORMANCE GROWTH SUITE',
      headline: 'High-Conversion Acquisition',
      subtext: 'Data-driven audience attribution driving lower acquisition costs',
      accentColor: '#35D13F',
      tiltDeg: -4,
    },
  },
];

/**
 * Our Services Section Component
 * 
 * Responsive Precision:
 * - Desktop (lg+): Exactly matches reference image pics 3.png with full-width emerald gradient,
 *   accordion items on left, and tilted floating preview card overlapping the right side.
 * - Mobile & Tablet (<lg): Interactive accordion with inline preview reveal directly under
 *   the tapped service. Eliminates disconnected scrolling and prevented card tilt clipping on narrow viewports.
 */
export const ServicesSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const [pulseGlow, setPulseGlow] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(false);

  const sectionRef = useRef<HTMLElement>(null);
  const activeService = SERVICES_DATA[activeIndex];

  // Motion preference detection
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Section entrance observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.08 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Handle service switch with tactile crossfade & pop animation
  const handleSelectService = (index: number) => {
    if (index === activeIndex) return;

    if (prefersReducedMotion) {
      setActiveIndex(index);
      return;
    }

    setIsTransitioning(true);
    setPulseGlow(true);

    setTimeout(() => {
      setActiveIndex(index);
      setIsTransitioning(false);
    }, 180);

    setTimeout(() => {
      setPulseGlow(false);
    }, 550);
  };

  /**
   * Reusable preview card rendering for consistent visual excellence on both mobile and desktop
   */
  const renderPreviewContent = (service: ServiceItem, isMobile: boolean) => (
    <div
      className={`relative w-full bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-7 text-[#0A0A0A] border border-white/80 transition-all duration-300 ${
        isMobile
          ? 'shadow-xl mt-3'
          : 'shadow-[0_24px_50px_rgba(0,0,0,0.28),0_4px_12px_rgba(0,0,0,0.12)]'
      }`}
    >
      {/* Card Header Tag & Category */}
      <div className="flex items-center justify-between pb-3.5 border-b border-neutral-100">
        <span className="px-2.5 sm:px-3 py-1 rounded-md bg-emerald-50 text-[#1FA82C] text-[11px] sm:text-xs font-bold uppercase tracking-wider border border-[#1FA82C]/20">
          {service.mockup.tag}
        </span>
        <span className="text-[11px] sm:text-xs font-semibold text-neutral-400 uppercase tracking-wider">
          {service.stats}
        </span>
      </div>

      {/* Dynamic Mockup Visual Workspace */}
      <div className="mt-4 sm:mt-5 rounded-xl sm:rounded-2xl bg-gradient-to-b from-neutral-50 to-neutral-100/70 p-3.5 sm:p-4 border border-neutral-200/70 overflow-hidden shadow-inner">
        
        {/* Simulated UI Window Bar */}
        <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-neutral-200/60">
          <div className="flex items-center gap-1.5">
            <span className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-rose-400/80" />
            <span className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-amber-400/80" />
            <span className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-emerald-400/80" />
          </div>
          <div className="px-2.5 py-0.5 rounded bg-white text-[10px] sm:text-[11px] font-mono text-neutral-500 border border-neutral-200 shadow-2xs">
            hk-agency.app/{service.id}
          </div>
          <Sparkles className="w-3.5 h-3.5 text-[#1FA82C]" />
        </div>

        {/* Service-Specific Mockup Graphics */}
        {service.mockup.type === 'video' && (
          <div className="space-y-2.5 py-0.5">
            <div className="relative aspect-video rounded-lg sm:rounded-xl bg-[#0A0A0A] overflow-hidden flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#1FA82C]/30 via-transparent to-black/80" />
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30 shadow-lg">
                <Video className="w-4 h-4 sm:w-5 sm:h-5 text-white fill-white/80 ml-0.5" />
              </div>
              <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between text-[9px] sm:text-[10px] font-mono text-white/80">
                <span>00:04:18 / 00:15:00</span>
                <span className="px-1.5 py-0.5 rounded bg-red-600 text-white font-bold">4K 60FPS</span>
              </div>
            </div>
            <div className="space-y-1.5">
              <div className="h-3.5 sm:h-4 rounded bg-[#1FA82C]/30 border border-[#1FA82C]/50 flex items-center px-2">
                <span className="text-[8px] sm:text-[9px] font-mono text-emerald-900 font-bold">Video Track 01 (Color Graded)</span>
              </div>
              <div className="h-3.5 sm:h-4 rounded bg-neutral-300/80 flex items-center px-2">
                <span className="text-[8px] sm:text-[9px] font-mono text-neutral-700">Audio Foley & Dialog Waveform</span>
              </div>
            </div>
          </div>
        )}

        {service.mockup.type === 'seo' && (
          <div className="space-y-2.5 py-0.5">
            <div className="p-3 rounded-lg sm:rounded-xl bg-white border border-neutral-200 shadow-xs space-y-1.5">
              <div className="flex items-center justify-between text-[11px] sm:text-xs font-semibold">
                <span className="text-neutral-500">Keyword Visibility Growth</span>
                <span className="text-[#1FA82C] font-bold">+284.6%</span>
              </div>
              <div className="h-14 sm:h-16 flex items-end justify-between gap-1 sm:gap-1.5 pt-1">
                {[35, 48, 42, 60, 55, 78, 85, 92, 100].map((val, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-t-sm transition-all duration-300"
                    style={{
                      height: `${val}%`,
                      backgroundColor: i >= 6 ? '#1FA82C' : '#D1D5DB',
                    }}
                  />
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 text-center text-[10px] sm:text-[11px]">
              <div className="p-1.5 sm:p-2 rounded-lg bg-emerald-50 text-emerald-800 font-medium">
                Avg Position: <strong className="text-emerald-950">1.8</strong>
              </div>
              <div className="p-1.5 sm:p-2 rounded-lg bg-neutral-100 text-neutral-700 font-medium">
                Organic Clicks: <strong className="text-neutral-900">42.8K</strong>
              </div>
            </div>
          </div>
        )}

        {service.mockup.type === 'design' && (
          <div className="space-y-2.5 py-0.5">
            <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
              <div className="p-2 sm:p-3 rounded-lg sm:rounded-xl bg-white border border-neutral-200 flex flex-col items-center justify-center text-center shadow-xs">
                <Palette className="w-4 h-4 sm:w-5 sm:h-5 text-[#1FA82C] mb-1" />
                <span className="text-[9px] sm:text-[10px] font-bold text-neutral-700">Palette</span>
              </div>
              <div className="p-2 sm:p-3 rounded-lg sm:rounded-xl bg-white border border-neutral-200 flex flex-col items-center justify-center text-center shadow-xs">
                <Layers className="w-4 h-4 sm:w-5 sm:h-5 text-[#35D13F] mb-1" />
                <span className="text-[9px] sm:text-[10px] font-bold text-neutral-700">Typography</span>
              </div>
              <div className="p-2 sm:p-3 rounded-lg sm:rounded-xl bg-white border border-neutral-200 flex flex-col items-center justify-center text-center shadow-xs">
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-[#1FA82C] mb-1" />
                <span className="text-[9px] sm:text-[10px] font-bold text-neutral-700">3D Assets</span>
              </div>
            </div>
            <div className="p-2.5 sm:p-3 rounded-lg sm:rounded-xl bg-white border border-neutral-200 shadow-xs">
              <div className="flex items-center gap-1.5 sm:gap-2 mb-1">
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#1FA82C]" />
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#35D13F]" />
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#0A0A0A]" />
                <span className="text-[10px] sm:text-[11px] font-mono text-neutral-400 ml-auto">Figma Kit</span>
              </div>
              <p className="text-[11px] sm:text-xs font-semibold text-neutral-800">Design System V2.4</p>
            </div>
          </div>
        )}

        {service.mockup.type === 'dev' && (
          <div className="space-y-2 py-0.5 font-mono text-[10px] sm:text-[11px]">
            <div className="p-2.5 sm:p-3 rounded-lg sm:rounded-xl bg-[#0A0A0A] text-emerald-400 space-y-1 shadow-sm">
              <div className="text-neutral-500">// TypeScript Next.js API</div>
              <div>
                <span className="text-purple-400">const</span>{' '}
                <span className="text-amber-300">app</span> ={' '}
                <span className="text-blue-400">createAgencyApp</span>();
              </div>
              <div>
                <span className="text-amber-300">app</span>.
                <span className="text-emerald-300">optimizeSpeed</span>({'{ '}
                <span className="text-cyan-300">score</span>: 100 {'}'});
              </div>
              <div className="text-emerald-500/80 pt-0.5">✓ Compiled in 12ms</div>
            </div>
            <div className="flex items-center justify-between px-1 text-[9px] sm:text-[10px] text-neutral-500">
              <span>Serverless Edge Route</span>
              <span className="text-[#1FA82C] font-semibold">99.9% Uptime</span>
            </div>
          </div>
        )}

        {service.mockup.type === 'marketing' && (
          <div className="space-y-2.5 py-0.5">
            <div className="p-2.5 sm:p-3 rounded-lg sm:rounded-xl bg-white border border-neutral-200 shadow-xs">
              <div className="flex items-center justify-between text-[11px] sm:text-xs font-semibold mb-1">
                <span className="text-neutral-600">Campaign ROAS Ratio</span>
                <span className="text-emerald-600 font-bold">4.82x</span>
              </div>
              <div className="w-full bg-neutral-100 rounded-full h-2 sm:h-2.5 overflow-hidden">
                <div className="bg-gradient-to-r from-[#1FA82C] to-[#35D13F] h-2 sm:h-2.5 rounded-full w-[82%]" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 text-center text-[10px] sm:text-[11px]">
              <div className="p-1.5 sm:p-2 rounded-lg bg-emerald-50 text-emerald-800 font-medium">
                Ad Spend: <strong>$12,400</strong>
              </div>
              <div className="p-1.5 sm:p-2 rounded-lg bg-neutral-100 text-neutral-800 font-medium">
                Return: <strong>$59,768</strong>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Card Footer Detail */}
      <div className="mt-4 sm:mt-5 space-y-2">
        <h4 className="text-sm sm:text-base md:text-lg font-bold text-[#0A0A0A] leading-tight">
          {service.mockup.headline}
        </h4>
        <p className="text-[11px] sm:text-xs md:text-[13px] text-neutral-500 leading-relaxed">
          {service.mockup.subtext}
        </p>

        {/* Feature Checklist Tags */}
        <div className="pt-2.5 border-t border-neutral-100 grid grid-cols-2 gap-1.5">
          {service.features.map((feat, idx) => (
            <div key={idx} className="flex items-center gap-1.5 text-[10px] sm:text-[11px] text-neutral-600">
              <CheckCircle2 className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-[#1FA82C] shrink-0" />
              <span className="truncate">{feat}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <section
      ref={sectionRef}
      id="services-section"
      className="relative w-full bg-gradient-to-br from-[#1FA82C] via-[#23A92F] to-[#35D13F] text-white py-16 sm:py-20 md:py-24 lg:py-32 overflow-hidden select-none"
      aria-labelledby="services-heading"
    >
      {/* Ambient background light spheres for depth */}
      <div
        className="absolute -top-32 -left-32 w-72 sm:w-96 h-72 sm:h-96 rounded-full bg-white/10 blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-40 -right-40 w-80 sm:w-[500px] h-80 sm:h-[500px] rounded-full bg-[#116919]/40 blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* =========================================================================
            TOP HEADER AREA (Responsive 2-Column or Stacked on Mobile)
           ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-8 lg:gap-12 items-end mb-10 sm:mb-14 md:mb-16">
          
          {/* Left Column: Eyebrow + Big Headline */}
          <div
            className={`lg:col-span-6 transition-all duration-700 ease-out ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            {/* Eyebrow Label */}
            <div className="flex items-center gap-2 mb-2 sm:mb-3">
              <span className="inline-block w-2 h-2 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
              <p className="text-xs sm:text-sm font-black uppercase tracking-[0.22em] text-white/95">
                Our Services
              </p>
            </div>

            {/* Main Headline */}
            <h2
              id="services-heading"
              className="text-2xl sm:text-3xl md:text-4xl lg:text-[50px] font-black tracking-tight leading-[1.18] lg:leading-[1.12] text-white"
            >
              What Service <br className="hidden sm:inline" />
              We're Offering
            </h2>
          </div>

          {/* Right Column: Paragraph Intro Line */}
          <div
            className={`lg:col-span-6 transition-all duration-700 delay-150 ease-out ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            <p className="text-white/85 text-sm sm:text-base md:text-[17px] lg:text-[18px] leading-[1.7] font-normal max-w-xl lg:ml-auto">
              From SEO and UI/UX design to website development, video editing, and digital marketing,
              we provide a full suite of digital services designed to elevate your online presence,
              enhance user engagement, and drive measurable business growth.
            </p>
          </div>

        </div>

        {/* =========================================================================
            DESKTOP LAYOUT (lg:grid):
            Accordion pills in front (z-20/z-30), Floating Rotated Mockup Card tucked
            behind the buttons (z-10) - strictly matching reference image pics 3.png
           ========================================================================= */}
        <div className="hidden lg:grid lg:grid-cols-12 gap-4 items-center relative">
          
          {/* Accordion Pill List (8 Columns on desktop, sits in FRONT with z-20) */}
          <div
            className={`lg:col-span-8 flex flex-col space-y-3.5 relative z-20 transition-all duration-700 delay-300 ease-out ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            role="tablist"
            aria-label="HK Digital Agency Services"
          >
            {SERVICES_DATA.map((service, index) => {
              const isActive = index === activeIndex;

              return (
                <button
                  key={service.id}
                  id={`service-tab-desktop-${service.id}`}
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`service-panel-desktop-${service.id}`}
                  onClick={() => handleSelectService(index)}
                  className={`group relative w-full text-left rounded-full px-8 py-5 flex items-center justify-between transition-all duration-300 ease-out cursor-pointer focus:outline-none focus-visible:ring-4 focus-visible:ring-white/60 ${
                    isActive
                      ? 'bg-white text-[#0A0A0A] shadow-[0_20px_40px_rgba(0,0,0,0.22)] scale-[1.01] -translate-y-0.5 z-30'
                      : 'bg-[#178A22] hover:bg-[#15801f] text-white/95 border border-white/10 hover:border-white/20 z-20'
                  }`}
                >
                  {/* Left Title & Active Badge */}
                  <div className="flex items-center gap-4">
                    <span
                      className={`text-xl md:text-[22px] font-bold tracking-tight transition-colors duration-200 ${
                        isActive ? 'text-[#0A0A0A]' : 'text-white'
                      }`}
                    >
                      {service.title}
                    </span>

                    {isActive && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-100 text-[#1FA82C] text-xs font-semibold uppercase tracking-wider">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#1FA82C] animate-pulse" />
                        Active
                      </span>
                    )}
                  </div>

                  {/* Right Arrow Icon Button - always in front and fully visible */}
                  <div
                    className={`relative z-30 flex items-center justify-center w-11 h-11 rounded-full transition-all duration-300 shadow-sm shrink-0 ${
                      isActive
                        ? 'bg-gradient-to-r from-[#1FA82C] to-[#35D13F] text-white shadow-[0_4px_12px_rgba(31,168,44,0.45)] rotate-90'
                        : 'bg-[#0A0A0A] text-white group-hover:bg-black group-hover:scale-105'
                    }`}
                    aria-hidden="true"
                  >
                    <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-0.5" />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Floating Overlapping Card (4 Columns, tucked BEHIND the buttons with z-10) */}
          <div
            className={`lg:col-span-4 relative -ml-16 xl:-ml-24 z-10 transition-all duration-700 delay-500 ease-out pointer-events-auto ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            {/* Background Glow */}
            <div
              className={`absolute -inset-4 rounded-[36px] bg-white/20 blur-xl transition-all duration-500 pointer-events-none ${
                pulseGlow ? 'opacity-80 scale-105' : 'opacity-40 scale-100'
              }`}
              aria-hidden="true"
            />

            <div
              id={`service-panel-desktop-${activeService.id}`}
              role="tabpanel"
              aria-labelledby={`service-tab-desktop-${activeService.id}`}
              style={{
                transform: prefersReducedMotion
                  ? 'none'
                  : `rotate(${activeService.mockup.tiltDeg}deg)`,
              }}
              className={`transition-all duration-400 ease-out hover:rotate-0 hover:scale-[1.02] cursor-default ${
                isTransitioning
                  ? 'opacity-30 scale-95 translate-y-3'
                  : 'opacity-100 scale-100 translate-y-0'
              }`}
            >
              {renderPreviewContent(activeService, false)}
            </div>
          </div>

        </div>

        {/* =========================================================================
            MOBILE & TABLET LAYOUT (<lg):
            Tactile inline accordion where tapping ANY service expands its preview
            right in place! Eliminates disconnected scrolling and prevents card tilt clipping.
           ========================================================================= */}
        <div className="lg:hidden flex flex-col space-y-3.5" role="tablist" aria-label="HK Digital Agency Services Mobile">
          {SERVICES_DATA.map((service, index) => {
            const isActive = index === activeIndex;

            return (
              <div
                key={service.id}
                className="w-full transition-all duration-300"
              >
                {/* Accordion Tab Button */}
                <button
                  id={`service-tab-mobile-${service.id}`}
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`service-panel-mobile-${service.id}`}
                  onClick={() => handleSelectService(index)}
                  className={`w-full text-left rounded-2xl px-5 sm:px-6 py-4 flex items-center justify-between transition-all duration-300 ease-out cursor-pointer focus:outline-none focus-visible:ring-4 focus-visible:ring-white/60 min-h-[56px] ${
                    isActive
                      ? 'bg-white text-[#0A0A0A] shadow-[0_12px_28px_rgba(10,10,10,0.2)]'
                      : 'bg-[#178A22] hover:bg-[#15801f] text-white border border-white/10'
                  }`}
                >
                  {/* Title & Active Dot */}
                  <div className="flex items-center gap-3">
                    <span
                      className={`text-base sm:text-lg font-bold tracking-tight ${
                        isActive ? 'text-[#0A0A0A]' : 'text-white'
                      }`}
                    >
                      {service.title}
                    </span>

                    {isActive && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-100 text-[#1FA82C] text-[10px] font-bold uppercase tracking-wider">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#1FA82C] animate-pulse" />
                        Active
                      </span>
                    )}
                  </div>

                  {/* Right Arrow Button with rotation */}
                  <div
                    className={`relative flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full transition-all duration-300 shadow-sm shrink-0 ml-2 ${
                      isActive
                        ? 'bg-gradient-to-r from-[#1FA82C] to-[#35D13F] text-white shadow-[0_2px_8px_rgba(31,168,44,0.4)] rotate-90'
                        : 'bg-[#0A0A0A] text-white'
                    }`}
                    aria-hidden="true"
                  >
                    <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </div>
                </button>

                {/* Inline Expanded Preview Card on Mobile */}
                {isActive && (
                  <div
                    id={`service-panel-mobile-${service.id}`}
                    role="tabpanel"
                    aria-labelledby={`service-tab-mobile-${service.id}`}
                    className={`transition-all duration-300 ease-out pt-1.5 ${
                      isTransitioning
                        ? 'opacity-40 scale-[0.98]'
                        : 'opacity-100 scale-100'
                    }`}
                  >
                    {renderPreviewContent(service, true)}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>

    </section>
  );
};
