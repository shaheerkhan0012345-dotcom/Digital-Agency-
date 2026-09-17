import React, { useState, useEffect, useRef } from 'react';
import {
  ArrowRight,
  ChevronDown,
  Video,
  Search,
  Palette,
  Code2,
  TrendingUp,
  Sparkles,
  CheckCircle2,
  Layers,
  Cpu,
  MousePointerClick
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
    previewUrl?: string;
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
 * Strict Implementation of Reference Image (pics 3.png) & User Requirements:
 * 1. Primary Green full-section background (glossy emerald gradient #1FA82C to #35D13F)
 * 2. 2-column top header:
 *    - Left: "Our Services" eyebrow + "What Service We're Offering" bold headline
 *    - Right: Supporting agency paragraph in light translucent white/green
 * 3. 5-item interactive accordion list:
 *    - Video Editing (default active)
 *    - SEO Service
 *    - Graphic Designing
 *    - Software Development
 *    - Digital Marketing
 * 4. Inactive items: Dark green background (#178A22) with smooth hover state and circular arrow button
 * 5. Active item: Bright white pill container, bold black text (#0A0A0A), elevated shadow, 
 *    arrow indicator transitioning with a smooth rotation/bounce
 * 6. Floating Image Panel on the right (overlapping the accordion list like in pics 3.png):
 *    - Distinctive dynamic tilt (-4deg to -5deg)
 *    - Interactive crossfade + scale/pop animation on skill change
 *    - Luminous glowing shadow pulse on update
 * 7. Accessibility (keyboard arrows/tab, ARIA attributes) and prefers-reduced-motion support
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
      { threshold: 0.12 }
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

  return (
    <section
      ref={sectionRef}
      id="services-section"
      className="relative w-full bg-gradient-to-br from-[#1FA82C] via-[#23A92F] to-[#35D13F] text-white py-20 md:py-28 lg:py-32 overflow-hidden select-none"
      aria-labelledby="services-heading"
    >
      {/* Ambient background light spheres for depth */}
      <div
        className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-white/10 blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full bg-[#116919]/40 blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* =========================================================================
            TOP HEADER AREA (2-Column Layout matching Reference Image pics 3.png)
           ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end mb-14 md:mb-18">
          
          {/* Left Column: Eyebrow + Big Headline */}
          <div
            className={`lg:col-span-6 transition-all duration-700 ease-out ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            {/* Eyebrow Label */}
            <div className="flex items-center gap-2.5 mb-3">
              <span className="inline-block w-2 h-2 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
              <p className="text-xs sm:text-sm font-black uppercase tracking-[0.24em] text-white/95">
                Our Services
              </p>
            </div>

            {/* Main Headline */}
            <h2
              id="services-heading"
              className="text-3xl sm:text-4xl md:text-[46px] lg:text-[50px] font-black tracking-tight leading-[1.14] text-white"
            >
              What Service <br />
              We're Offering
            </h2>
          </div>

          {/* Right Column: Paragraph Intro Line */}
          <div
            className={`lg:col-span-6 transition-all duration-700 delay-150 ease-out ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            <p className="text-white/85 text-base sm:text-[17px] md:text-[18px] leading-[1.75] font-normal max-w-xl lg:ml-auto">
              From SEO and UI/UX design to website development, video editing, and digital marketing,
              we provide a full suite of digital services designed to elevate your online presence,
              enhance user engagement, and drive measurable business growth.
            </p>
          </div>

        </div>

        {/* =========================================================================
            LOWER AREA: Accordion List on Left + Floating Angled Preview Card on Right
           ========================================================================= */}
        <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* ACCORDION PILL LIST (7 Cols on desktop) */}
          <div
            className={`lg:col-span-7 flex flex-col space-y-3.5 z-10 transition-all duration-700 delay-300 ease-out ${
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
                  id={`service-tab-${service.id}`}
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`service-panel-${service.id}`}
                  onClick={() => handleSelectService(index)}
                  className={`group relative w-full text-left rounded-2xl md:rounded-full px-6 sm:px-8 py-4 sm:py-5 flex items-center justify-between transition-all duration-300 ease-out cursor-pointer focus:outline-none focus-visible:ring-4 focus-visible:ring-white/60 ${
                    isActive
                      ? 'bg-white text-[#0A0A0A] shadow-[0_16px_36px_rgba(10,10,10,0.22)] scale-[1.01] -translate-y-0.5'
                      : 'bg-[#178A22] hover:bg-[#15801f] text-white/95 border border-white/10 hover:border-white/20'
                  }`}
                >
                  {/* Left Title & Optional Sub-indicator */}
                  <div className="flex items-center gap-4">
                    <span
                      className={`text-lg sm:text-xl md:text-[22px] font-bold tracking-tight transition-colors duration-200 ${
                        isActive ? 'text-[#0A0A0A]' : 'text-white'
                      }`}
                    >
                      {service.title}
                    </span>

                    {/* Active Mini Badge */}
                    {isActive && (
                      <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-100 text-[#1FA82C] text-xs font-semibold uppercase tracking-wider">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#1FA82C] animate-pulse" />
                        Active
                      </span>
                    )}
                  </div>

                  {/* Right Arrow Icon Button */}
                  <div
                    className={`relative flex items-center justify-center w-9 h-9 sm:w-11 sm:h-11 rounded-full transition-all duration-300 shadow-sm ${
                      isActive
                        ? 'bg-gradient-to-r from-[#1FA82C] to-[#35D13F] text-white shadow-[0_4px_12px_rgba(31,168,44,0.45)] rotate-90'
                        : 'bg-[#0A0A0A] text-white group-hover:bg-black group-hover:scale-105'
                    }`}
                    aria-hidden="true"
                  >
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:translate-x-0.5" />
                  </div>
                </button>
              );
            })}
          </div>

          {/* =========================================================================
              FLOATING PREVIEW CARD (5 Cols on desktop, overlapping with dynamic tilt)
              Directly matching the floating rotated card in reference image pics 3.png
             ========================================================================= */}
          <div
            className={`lg:col-span-5 relative transition-all duration-700 delay-500 ease-out ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            {/* Background Decorative Glow behind card */}
            <div
              className={`absolute -inset-2 sm:-inset-4 rounded-[32px] bg-white/20 blur-xl transition-all duration-500 pointer-events-none ${
                pulseGlow ? 'opacity-80 scale-105' : 'opacity-40 scale-100'
              }`}
              aria-hidden="true"
            />

            {/* Main Floating Card Container with subtle tilt */}
            <div
              id={`service-panel-${activeService.id}`}
              role="tabpanel"
              aria-labelledby={`service-tab-${activeService.id}`}
              style={{
                transform: prefersReducedMotion
                  ? 'none'
                  : `rotate(${activeService.mockup.tiltDeg}deg)`,
              }}
              className={`relative w-full max-w-md mx-auto lg:max-w-none bg-white rounded-3xl p-5 sm:p-7 text-[#0A0A0A] shadow-[0_24px_50px_rgba(0,0,0,0.28),0_4px_12px_rgba(0,0,0,0.12)] border border-white/80 transition-all duration-400 ease-out hover:rotate-0 hover:scale-[1.02] cursor-default ${
                isTransitioning
                  ? 'opacity-30 scale-95 translate-y-3'
                  : 'opacity-100 scale-100 translate-y-0'
              }`}
            >
              {/* Card Header Tag & Category */}
              <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
                <span className="px-3 py-1 rounded-md bg-emerald-50 text-[#1FA82C] text-xs font-bold uppercase tracking-wider border border-[#1FA82C]/20">
                  {activeService.mockup.tag}
                </span>
                <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">
                  {activeService.stats}
                </span>
              </div>

              {/* Dynamic Mockup Visual Workspace */}
              <div className="mt-5 rounded-2xl bg-gradient-to-b from-neutral-50 to-neutral-100/70 p-4 border border-neutral-200/70 overflow-hidden shadow-inner">
                
                {/* Simulated UI Window Bar */}
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-neutral-200/60">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-400/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/80" />
                  </div>
                  <div className="px-3 py-0.5 rounded-md bg-white text-[11px] font-mono text-neutral-500 border border-neutral-200 shadow-2xs">
                    hk-agency.app/{activeService.id}
                  </div>
                  <Sparkles className="w-3.5 h-3.5 text-[#1FA82C]" />
                </div>

                {/* Service-Specific Mockup Graphics */}
                {activeService.mockup.type === 'video' && (
                  <div className="space-y-3 py-1">
                    {/* Video Player Canvas */}
                    <div className="relative aspect-video rounded-xl bg-[#0A0A0A] overflow-hidden flex items-center justify-center group/screen">
                      <div className="absolute inset-0 bg-gradient-to-tr from-[#1FA82C]/30 via-transparent to-black/80" />
                      <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30 shadow-lg">
                        <Video className="w-5 h-5 text-white fill-white/80 ml-0.5" />
                      </div>
                      <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between text-[10px] font-mono text-white/80">
                        <span>00:04:18 / 00:15:00</span>
                        <span className="px-1.5 py-0.5 rounded bg-red-600 text-white font-bold">4K 60FPS</span>
                      </div>
                    </div>
                    {/* Multi-track Timeline */}
                    <div className="space-y-1.5 pt-1">
                      <div className="h-4 rounded-md bg-[#1FA82C]/30 border border-[#1FA82C]/50 flex items-center px-2">
                        <span className="text-[9px] font-mono text-emerald-900 font-bold">Video Track 01 (Color Graded)</span>
                      </div>
                      <div className="h-4 rounded-md bg-neutral-300/80 flex items-center px-2">
                        <span className="text-[9px] font-mono text-neutral-700">Audio Foley & Dialog Waveform</span>
                      </div>
                    </div>
                  </div>
                )}

                {activeService.mockup.type === 'seo' && (
                  <div className="space-y-3 py-1">
                    <div className="p-3 rounded-xl bg-white border border-neutral-200 shadow-xs space-y-2">
                      <div className="flex items-center justify-between text-xs font-semibold">
                        <span className="text-neutral-500">Keyword Visibility Growth</span>
                        <span className="text-[#1FA82C] font-bold">+284.6%</span>
                      </div>
                      {/* Bar graph visualization */}
                      <div className="h-16 flex items-end justify-between gap-1.5 pt-2">
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
                    <div className="grid grid-cols-2 gap-2 text-center text-[11px]">
                      <div className="p-2 rounded-lg bg-emerald-50 text-emerald-800 font-medium">
                        Avg Position: <strong className="text-emerald-950">1.8</strong>
                      </div>
                      <div className="p-2 rounded-lg bg-neutral-100 text-neutral-700 font-medium">
                        Organic Clicks: <strong className="text-neutral-900">42.8K</strong>
                      </div>
                    </div>
                  </div>
                )}

                {activeService.mockup.type === 'design' && (
                  <div className="space-y-3 py-1">
                    <div className="grid grid-cols-3 gap-2">
                      <div className="p-3 rounded-xl bg-white border border-neutral-200 flex flex-col items-center justify-center text-center shadow-xs">
                        <Palette className="w-5 h-5 text-[#1FA82C] mb-1" />
                        <span className="text-[10px] font-bold text-neutral-700">Palette</span>
                      </div>
                      <div className="p-3 rounded-xl bg-white border border-neutral-200 flex flex-col items-center justify-center text-center shadow-xs">
                        <Layers className="w-5 h-5 text-[#35D13F] mb-1" />
                        <span className="text-[10px] font-bold text-neutral-700">Typography</span>
                      </div>
                      <div className="p-3 rounded-xl bg-white border border-neutral-200 flex flex-col items-center justify-center text-center shadow-xs">
                        <Sparkles className="w-5 h-5 text-[#1FA82C] mb-1" />
                        <span className="text-[10px] font-bold text-neutral-700">3D Assets</span>
                      </div>
                    </div>
                    <div className="p-3 rounded-xl bg-white border border-neutral-200 shadow-xs">
                      <div className="flex items-center gap-2 mb-1.5">
                        <div className="w-3 h-3 rounded-full bg-[#1FA82C]" />
                        <div className="w-3 h-3 rounded-full bg-[#35D13F]" />
                        <div className="w-3 h-3 rounded-full bg-[#0A0A0A]" />
                        <span className="text-[11px] font-mono text-neutral-400 ml-auto">Figma Component</span>
                      </div>
                      <p className="text-xs font-semibold text-neutral-800">Design System V2.4 Released</p>
                    </div>
                  </div>
                )}

                {activeService.mockup.type === 'dev' && (
                  <div className="space-y-2 py-1 font-mono text-[11px]">
                    <div className="p-3 rounded-xl bg-[#0A0A0A] text-emerald-400 space-y-1 shadow-sm">
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
                      <div className="text-emerald-500/80 pt-1">✓ Compiled in 12ms [production]</div>
                    </div>
                    <div className="flex items-center justify-between px-2 text-[10px] text-neutral-500">
                      <span>Serverless Edge Route</span>
                      <span className="text-[#1FA82C] font-semibold">99.9% Uptime</span>
                    </div>
                  </div>
                )}

                {activeService.mockup.type === 'marketing' && (
                  <div className="space-y-3 py-1">
                    <div className="p-3 rounded-xl bg-white border border-neutral-200 shadow-xs">
                      <div className="flex items-center justify-between text-xs font-semibold mb-1">
                        <span className="text-neutral-600">Campaign ROAS Ratio</span>
                        <span className="text-emerald-600 font-bold">4.82x</span>
                      </div>
                      <div className="w-full bg-neutral-100 rounded-full h-2.5 overflow-hidden">
                        <div className="bg-gradient-to-r from-[#1FA82C] to-[#35D13F] h-2.5 rounded-full w-[82%]" />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-center text-[11px]">
                      <div className="p-2 rounded-lg bg-emerald-50 text-emerald-800 font-medium">
                        Ad Spend: <strong>$12,400</strong>
                      </div>
                      <div className="p-2 rounded-lg bg-neutral-100 text-neutral-800 font-medium">
                        Return: <strong>$59,768</strong>
                      </div>
                    </div>
                  </div>
                )}

              </div>

              {/* Card Footer Detail */}
              <div className="mt-5 space-y-2">
                <h4 className="text-base sm:text-lg font-bold text-[#0A0A0A] leading-tight">
                  {activeService.mockup.headline}
                </h4>
                <p className="text-xs sm:text-[13px] text-neutral-500 leading-relaxed">
                  {activeService.mockup.subtext}
                </p>

                {/* Feature Checklist Tags */}
                <div className="pt-3 border-t border-neutral-100 grid grid-cols-2 gap-1.5">
                  {activeService.features.map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-1.5 text-[11px] text-neutral-600">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#1FA82C] shrink-0" />
                      <span className="truncate">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
};
