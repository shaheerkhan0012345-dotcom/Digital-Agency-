import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, Sparkles, CheckCircle, Zap, TrendingUp, Layers } from 'lucide-react';

/**
 * Word token data structure for scroll-scrubbed text reveal
 */
interface HeadingToken {
  text: string;
  isHighlight: boolean;
}

const HEADING_TOKENS: HeadingToken[] = [
  { text: 'Transforming', isHighlight: false },
  { text: 'the', isHighlight: false },
  { text: 'Digital', isHighlight: false },
  { text: 'Landscape', isHighlight: false },
  { text: 'with', isHighlight: false },
  { text: 'Cutting-Edge', isHighlight: true },
  { text: 'Innovation,', isHighlight: true },
  { text: 'Strategic', isHighlight: true },
  { text: 'Excellence,', isHighlight: true },
  { text: 'and', isHighlight: false },
  { text: 'Seamless', isHighlight: true },
  { text: 'User-Centric', isHighlight: true },
  { text: 'Experiences', isHighlight: true },
  { text: 'to', isHighlight: false },
  { text: 'Empower', isHighlight: false },
  { text: 'Businesses,', isHighlight: false },
  { text: 'Enhance', isHighlight: false },
  { text: 'Brand', isHighlight: false },
  { text: 'Visibility,', isHighlight: false },
  { text: 'and', isHighlight: false },
  { text: 'Drive', isHighlight: false },
  { text: 'Sustainable', isHighlight: false },
  { text: 'Growth', isHighlight: false },
  { text: 'in', isHighlight: false },
  { text: 'an', isHighlight: false },
  { text: 'Ever-Evolving', isHighlight: false },
  { text: 'Online', isHighlight: false },
  { text: 'World', isHighlight: false },
];

/**
 * AboutSection Component
 * 
 * Award-Winning Frontend Polish:
 * 1. 2-column responsive layout with sticky eyebrow label and glowing compass dot
 * 2. High-precision continuous scroll-scrubbed text reveal with per-word float interpolation
 * 3. Glossy green gradient and luminous emerald glow on key phrases
 * 4. Refined editorial description card with interactive domain chips (SEO, UI/UX, Web Dev)
 * 5. Interactive skill badges with micro-hover scaling and active indicator halos
 * 6. Ambient cursor-follow spotlight over the typography
 * 7. Glossy "Contact Us →" button with kinetic sliding arrow
 */
export const AboutSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingContainerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [isEyebrowVisible, setIsEyebrowVisible] = useState<boolean>(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(false);
  
  // Ambient cursor position for subtle typography glow
  const [mousePos, setMousePos] = useState<{ x: number; y: number; active: boolean }>({
    x: 0,
    y: 0,
    active: false,
  });

  // Track prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleMotionChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleMotionChange);
    return () => mediaQuery.removeEventListener('change', handleMotionChange);
  }, []);

  // IntersectionObserver for entrance trigger of the eyebrow label
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsEyebrowVisible(true);
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Continuous high-precision scroll-scrub loop via requestAnimationFrame
  useEffect(() => {
    if (prefersReducedMotion) {
      setScrollProgress(1);
      return;
    }

    let ticking = false;

    const updateScrollProgress = () => {
      if (!headingRef.current) {
        ticking = false;
        return;
      }

      const rect = headingRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Start reveal when heading hits 85% of window; complete at 25%
      const startPoint = windowHeight * 0.85;
      const endPoint = windowHeight * 0.28;

      const raw = (startPoint - rect.top) / (startPoint - endPoint);
      const clamped = Math.min(Math.max(raw, 0), 1);

      setScrollProgress(clamped);
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateScrollProgress);
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    updateScrollProgress();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [prefersReducedMotion]);

  // Ambient mouse spotlight over heading container
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!headingContainerRef.current) return;
    const rect = headingContainerRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      active: true,
    });
  };

  const handleMouseLeave = () => {
    setMousePos((prev) => ({ ...prev, active: false }));
  };

  const totalWords = HEADING_TOKENS.length;

  return (
    <section
      ref={sectionRef}
      id="about-us-section"
      className="relative w-full bg-white pt-24 pb-28 md:pt-32 md:pb-36 overflow-hidden border-t border-[#F0F0F0]"
      aria-label="About HK Digital Agency"
    >
      {/* Ambient background glow */}
      <div
        className="absolute top-1/3 right-0 w-[600px] h-[600px] bg-gradient-to-b from-[#1FA82C]/[0.03] to-transparent rounded-full blur-3xl pointer-events-none -z-10"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 2-Column Responsive Layout: Left Eyebrow Label | Right Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-16 items-start">
          
          {/* =========================================================================
              LEFT COLUMN: "About Us" Eyebrow Label with Interactive Pulse & Bar
             ========================================================================= */}
          <div className="md:col-span-3 lg:col-span-3">
            <div
              className={`sticky top-28 flex items-center gap-3.5 transition-all duration-700 ease-out group ${
                isEyebrowVisible
                  ? 'opacity-100 translate-x-0'
                  : 'opacity-0 -translate-x-6'
              }`}
            >
              {/* Pulsing indicator dot */}
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#35D13F] opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#1FA82C]" />
              </span>

              <h2 className="text-sm md:text-[15px] font-extrabold uppercase tracking-[0.24em] text-[#1FA82C] select-none group-hover:text-[#28B936] transition-colors">
                About Us
              </h2>

              {/* Short green horizontal accent bar with hover expansion */}
              <div
                className="w-8 h-[2.5px] bg-gradient-to-r from-[#1FA82C] to-[#35D13F] rounded-full transition-all duration-300 group-hover:w-12 group-hover:shadow-[0_0_8px_#35D13F]"
                aria-hidden="true"
              />
            </div>
          </div>

          {/* =========================================================================
              RIGHT COLUMN: Main Content (Scroll-Scrubbed Headline + Enhanced Small Text)
             ========================================================================= */}
          <div className="md:col-span-9 lg:col-span-9 flex flex-col space-y-10">
            
            {/* 1. Interactive Scroll-Scrubbed Headline with Ambient Spotlight */}
            <div
              ref={headingContainerRef}
              className="relative p-2 -m-2 rounded-2xl transition-all duration-300"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              {/* Subtle radial spotlight following mouse cursor */}
              {mousePos.active && (
                <div
                  className="absolute pointer-events-none -inset-px rounded-2xl transition-opacity duration-300 opacity-60"
                  style={{
                    background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, rgba(31, 168, 44, 0.09), transparent 80%)`,
                  }}
                  aria-hidden="true"
                />
              )}

              <h3
                ref={headingRef}
                className="relative text-2xl sm:text-3xl md:text-[34px] lg:text-[41px] font-display font-bold tracking-[-0.03em] leading-[1.3] select-none"
              >
                {HEADING_TOKENS.map((token, index) => {
                  // Continuous fractional progress per word for silky transition
                  const wordThreshold = (index / totalWords) * 0.95;
                  const wordProgress = Math.min(
                    Math.max((scrollProgress - wordThreshold) / (1 / totalWords), 0),
                    1
                  );
                  const isRevealed = prefersReducedMotion ? true : wordProgress > 0.45;

                  return (
                    <span
                      key={`${token.text}-${index}`}
                      className="inline-block mr-[0.24em] last:mr-0 transition-all duration-300 ease-out hover:scale-[1.04] cursor-default"
                      style={{
                        transform: prefersReducedMotion
                          ? 'none'
                          : `translateY(${Math.max(0, 4 - wordProgress * 4)}px)`,
                        opacity: prefersReducedMotion ? 1 : Math.max(0.35, wordProgress),
                      }}
                    >
                      {token.isHighlight ? (
                        // Designated Highlight Phrases (e.g. "Cutting-Edge Innovation,")
                        <span
                          className={`transition-all duration-300 font-extrabold ${
                            isRevealed
                              ? 'text-glossy-green text-glow-green drop-shadow-xs'
                              : 'text-neutral-300'
                          }`}
                        >
                          {token.text}
                        </span>
                      ) : (
                        // Standard Heading Words
                        <span
                          className={`transition-colors duration-300 ${
                            isRevealed
                              ? 'text-[#0A0A0A]'
                              : 'text-neutral-300'
                          }`}
                        >
                          {token.text}
                        </span>
                      )}
                    </span>
                  );
                })}
              </h3>
            </div>

            {/* =========================================================================
                2. ENHANCED SMALL TEXT / AGENCY DESCRIPTION
                Crafted editorial layout with interactive domain highlights & hover states
               ========================================================================= */}
            <div className="relative group/card rounded-2xl p-6 sm:p-8 bg-gradient-to-br from-neutral-50/90 via-white to-neutral-50/50 border border-neutral-200/80 shadow-[0_4px_24px_rgba(0,0,0,0.03)] card-hover-elevate transition-all duration-500">
              
              {/* Left accent indicator bar */}
              <div className="absolute left-0 top-6 bottom-6 w-1 rounded-r-full bg-neutral-200 group-hover/card:bg-gradient-to-b group-hover/card:from-[#1FA82C] group-hover/card:to-[#35D13F] transition-all duration-500" />

              {/* Enhanced Paragraph with Interactive Micro-Pill Spans */}
              <p className="text-[#555555] text-base sm:text-[17px] md:text-[18px] leading-[1.8] font-normal pl-2">
                At{' '}
                <strong className="text-[#0A0A0A] font-semibold tracking-tight hover:text-[#1FA82C] transition-colors cursor-default">
                  HK Digital Agency
                </strong>
                , we specialize in crafting impactful digital solutions that help
                businesses thrive in the modern landscape. Our multidisciplinary
                expertise spans{' '}
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-emerald-50 text-[#1FA82C] border border-[#1FA82C]/20 font-semibold text-sm transition-all duration-200 hover:bg-[#1FA82C] hover:text-white hover:shadow-[0_2px_10px_rgba(31,168,44,0.3)] hover:-translate-y-0.5 cursor-default group/pill">
                  <span>SEO Optimization</span>
                </span>
                ,{' '}
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-emerald-50 text-[#1FA82C] border border-[#1FA82C]/20 font-semibold text-sm transition-all duration-200 hover:bg-[#1FA82C] hover:text-white hover:shadow-[0_2px_10px_rgba(31,168,44,0.3)] hover:-translate-y-0.5 cursor-default group/pill">
                  <span>UI/UX Architecture</span>
                </span>
                , and{' '}
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-emerald-50 text-[#1FA82C] border border-[#1FA82C]/20 font-semibold text-sm transition-all duration-200 hover:bg-[#1FA82C] hover:text-white hover:shadow-[0_2px_10px_rgba(31,168,44,0.3)] hover:-translate-y-0.5 cursor-default group/pill">
                  <span>Full-Stack Development</span>
                </span>
                . We ensure every project we engineer is not only visually
                compelling but also strategically optimized for{' '}
                <span className="text-[#0A0A0A] font-medium border-b border-[#1FA82C]/40 hover:border-[#1FA82C] hover:text-[#1FA82C] transition-colors cursor-default">
                  peak performance and sustainable growth
                </span>
                . By uniting creative vision with data-driven insights, we build
                user-friendly, engaging digital systems that translate your ideas
                into high-performing reality.
              </p>

              {/* 3 Interactive Highlight Pills below description */}
              <div className="mt-6 pt-5 border-t border-neutral-100 flex flex-wrap items-center gap-3 sm:gap-4 pl-2">
                
                <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-neutral-200/90 text-neutral-700 text-xs sm:text-sm font-semibold shadow-2xs hover:border-[#1FA82C]/50 hover:text-[#0A0A0A] hover:bg-emerald-50/40 hover:-translate-y-0.5 transition-all duration-200 cursor-default">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1FA82C]" />
                  <span>Data-Driven Engineering</span>
                </div>

                <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-neutral-200/90 text-neutral-700 text-xs sm:text-sm font-semibold shadow-2xs hover:border-[#1FA82C]/50 hover:text-[#0A0A0A] hover:bg-emerald-50/40 hover:-translate-y-0.5 transition-all duration-200 cursor-default">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1FA82C]" />
                  <span>Strategic Brand Visibility</span>
                </div>

                <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-neutral-200/90 text-neutral-700 text-xs sm:text-sm font-semibold shadow-2xs hover:border-[#1FA82C]/50 hover:text-[#0A0A0A] hover:bg-emerald-50/40 hover:-translate-y-0.5 transition-all duration-200 cursor-default">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1FA82C]" />
                  <span>Scalable Growth Architecture</span>
                </div>

              </div>
            </div>

            {/* =========================================================================
                3. "Contact Us →" Pill CTA Button with Kinetic Micro-Interactions
               ========================================================================= */}
            <div className="pt-1">
              <a
                id="about-cta-btn"
                href="#contact"
                className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full text-[15px] font-semibold text-white bg-[#0A0A0A] hover:bg-gradient-to-r hover:from-[#1FA82C] hover:to-[#35D13F] transition-all duration-300 shadow-md hover:shadow-[0_10px_28px_rgba(31,168,44,0.38)] hover:scale-[1.03] active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#1FA82C] btn-shine-sweep"
              >
                <span>Contact Us</span>
                <div className="relative flex items-center justify-center w-5 h-5 rounded-full bg-white/15 group-hover:bg-white/25 transition-colors">
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
                </div>
              </a>
            </div>

          </div>

        </div>

      </div>

      {/* =========================================================================
          BOTTOM ACCENT DIVIDER: Solid Emerald Green Horizontal Border Strip
          (Precisely matching the bottom border in reference image pics 2.png)
         ========================================================================= */}
      <div
        className="absolute bottom-0 left-0 w-full h-2.5 sm:h-3.5 bg-gradient-to-r from-[#1FA82C] via-[#2bbd39] to-[#35D13F]"
        aria-hidden="true"
      />
    </section>
  );
};
