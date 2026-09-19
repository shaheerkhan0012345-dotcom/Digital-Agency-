import React, { useEffect, useRef } from 'react';
import { Sparkles, CheckCircle2 } from 'lucide-react';
import { gsap } from 'gsap';
import { HKLogo } from './HKLogo';

/**
 * HeroSection Component
 * 
 * GSAP-Powered Award-Winning Animations:
 * 1. Kinetic Split-Word Reveal for the main headline with 3D perspective masking
 * 2. Continuous glossy emerald light shimmer on the word "Digital"
 * 3. Interactive 3D Perspective Tilt on the hero team card based on cursor coordinates
 * 4. Staggered physics entrance for badge, stickers (Rocket & Starburst), and sub-line
 * 5. Smooth floating loops for ambient stickers and rotating sparkle icon
 */
export const HeroSection: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const sparkleIconRef = useRef<HTMLSpanElement>(null);
  const wordsContainerRef = useRef<HTMLHeadingElement>(null);
  const sublineRef = useRef<HTMLDivElement>(null);
  const imageCardWrapperRef = useRef<HTMLDivElement>(null);
  const imageCardInnerRef = useRef<HTMLDivElement>(null);
  const rocketRef = useRef<HTMLDivElement>(null);
  const starburstRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Initial Orchestrated Entrance Timeline
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

      // Badge pop with elastic bounce
      if (badgeRef.current) {
        tl.fromTo(
          badgeRef.current,
          { scale: 0.6, opacity: 0, y: -20 },
          { scale: 1, opacity: 1, y: 0, duration: 0.9, ease: 'back.out(2)' }
        );
      }

      // Sparkle continuous slow rotation
      if (sparkleIconRef.current) {
        gsap.to(sparkleIconRef.current, {
          rotation: 360,
          duration: 6,
          repeat: -1,
          ease: 'none',
        });
      }

      // 2. Headline Split-Word Kinetic Reveal
      const wordElements = wordsContainerRef.current?.querySelectorAll('.gsap-word-inner');
      if (wordElements && wordElements.length > 0) {
        tl.fromTo(
          wordElements,
          {
            y: '120%',
            opacity: 0,
            rotateX: -45,
            skewY: 3,
          },
          {
            y: '0%',
            opacity: 1,
            rotateX: 0,
            skewY: 0,
            stagger: 0.08,
            duration: 1.15,
            ease: 'power4.out',
          },
          '-=0.6'
        );
      }

      // 3. Sub-line Fade & Letter Expansion
      if (sublineRef.current) {
        tl.fromTo(
          sublineRef.current,
          { opacity: 0, y: 24, filter: 'blur(6px)' },
          { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.85, ease: 'power3.out' },
          '-=0.7'
        );
      }

      // 4. Hero Image Showcase Entrance
      if (imageCardWrapperRef.current) {
        tl.fromTo(
          imageCardWrapperRef.current,
          {
            opacity: 0,
            y: 70,
            scale: 0.92,
            filter: 'blur(10px)',
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            filter: 'blur(0px)',
            duration: 1.3,
            ease: 'power3.out',
          },
          '-=0.7'
        );
      }

      // 5. Floating Stickers Entrance
      if (starburstRef.current) {
        tl.fromTo(
          starburstRef.current,
          { scale: 0, rotation: -90, opacity: 0 },
          { scale: 1, rotation: 0, opacity: 1, duration: 0.9, ease: 'back.out(2)' },
          '-=0.9'
        );

        // Continuous gentle rotation for starburst badge
        gsap.to(starburstRef.current, {
          rotation: 360,
          duration: 35,
          repeat: -1,
          ease: 'none',
        });
      }

      if (rocketRef.current) {
        tl.fromTo(
          rocketRef.current,
          { x: 50, y: 70, scale: 0.4, opacity: 0 },
          { x: 0, y: 0, scale: 1, opacity: 1, duration: 1.1, ease: 'back.out(1.8)' },
          '-=0.9'
        );

        // Continuous smooth hovering loop for rocket
        gsap.to(rocketRef.current, {
          y: '-=12',
          rotation: '+=4',
          duration: 2.8,
          yoyo: true,
          repeat: -1,
          ease: 'sine.inOut',
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Interactive 3D Card Tilt & Glare Handler (Awwwards-style mouse parallax)
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageCardWrapperRef.current || !imageCardInnerRef.current) return;

    const rect = imageCardWrapperRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Calculate rotation (-6 to 6 degrees max)
    const rotateX = ((y - centerY) / centerY) * -6;
    const rotateY = ((x - centerX) / centerX) * 6;

    gsap.to(imageCardInnerRef.current, {
      rotateX,
      rotateY,
      duration: 0.45,
      ease: 'power2.out',
      transformPerspective: 1200,
    });

    // Animate glare gradient angle
    if (glareRef.current) {
      const percentX = (x / rect.width) * 100;
      const percentY = (y / rect.height) * 100;
      gsap.to(glareRef.current, {
        opacity: 0.22,
        background: `radial-gradient(circle at ${percentX}% ${percentY}%, rgba(255,255,255,0.45) 0%, rgba(255,255,255,0) 65%)`,
        duration: 0.3,
        ease: 'power1.out',
      });
    }
  };

  const handleMouseLeave = () => {
    if (!imageCardInnerRef.current) return;
    gsap.to(imageCardInnerRef.current, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.7,
      ease: 'power3.out',
    });

    if (glareRef.current) {
      gsap.to(glareRef.current, {
        opacity: 0,
        duration: 0.5,
        ease: 'power2.out',
      });
    }
  };

  // Headline words with split kinetic animation markup
  const headlineWords = [
    { text: 'We', isHighlighted: false },
    { text: 'Build', isHighlighted: false },
    { text: 'Digital', isHighlighted: true },
    { text: 'Experiences', isHighlighted: false },
    { text: 'That', isHighlighted: false },
    { text: 'Matter', isHighlighted: false },
  ];

  return (
    <section
      ref={containerRef}
      id="hero-content-section"
      className="relative w-full pt-10 pb-16 md:pt-16 md:pb-24 bg-hero-pattern overflow-hidden"
      aria-label="Hero Introduction"
    >
      {/* Decorative ambient background radial gradients */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[520px] bg-gradient-to-b from-[#1FA82C]/[0.08] via-transparent to-transparent blur-3xl pointer-events-none -z-10"
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
        
        {/* =========================================================================
            1. BADGE: Green Sparkle Icon with GSAP Spin Loop & Spring Entrance
           ========================================================================= */}
        <div ref={badgeRef} className="mb-6 opacity-0">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-emerald-50/90 border border-[#1FA82C]/25 shadow-xs hover:border-[#1FA82C]/50 transition-colors">
            {/* HK Brand Logo Icon */}
            <span className="relative flex items-center justify-center w-5 h-5">
              <HKLogo className="w-full h-full" showGlow={false} />
            </span>
            <span className="text-xs font-bold uppercase tracking-widest text-[#1FA82C]">
              HK Digital Agency
            </span>
            <span
              ref={sparkleIconRef}
              className="relative flex items-center justify-center w-3.5 h-3.5 text-[#1FA82C]/70"
            >
              <Sparkles className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>

        {/* =========================================================================
            2. HEADLINE & PLAYFUL ACCENTS (GSAP Kinetic Split-Word Animation)
           ========================================================================= */}
        <div className="relative w-full max-w-4xl mx-auto">
          
          {/* Reference Image Sticker #1: Starburst Badge on top-left of headline */}
          <div
            ref={starburstRef}
            className="hidden lg:flex absolute -top-8 -left-12 z-10 flex-col items-center justify-center select-none opacity-0"
            aria-hidden="true"
          >
            <div className="relative w-16 h-16 flex items-center justify-center filter drop-shadow-md">
              <svg
                viewBox="0 0 100 100"
                className="w-full h-full fill-[#0A0A0A] hover:fill-[#1FA82C] transition-colors duration-300"
              >
                <path d="M50 0 L61 24 L85 15 L76 39 L100 50 L76 61 L85 85 L61 76 L50 100 L39 76 L15 85 L24 61 L0 50 L24 39 L15 15 L39 24 Z" />
              </svg>
              <span className="absolute text-[9px] font-black text-white text-center leading-tight tracking-wider uppercase pointer-events-none">
                Top<br />Dev
              </span>
            </div>
          </div>

          {/* Reference Image Sticker #2: 3D Rocket Element with GSAP Smooth Float */}
          <div
            ref={rocketRef}
            className="hidden lg:flex absolute -top-12 -right-8 z-10 select-none pointer-events-none opacity-0"
            aria-hidden="true"
          >
            <div className="relative w-24 h-24 transform rotate-12 filter drop-shadow-[0_12px_22px_rgba(31,168,44,0.28)]">
              <svg viewBox="0 0 120 120" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Flame glow */}
                <ellipse cx="32" cy="88" rx="14" ry="22" transform="rotate(-45 32 88)" fill="url(#rocketGlow)" opacity="0.85" />
                <path d="M42 78L22 98L32 108L52 88Z" fill="#FF7828" />
                <path d="M46 74L30 90L38 98L54 82Z" fill="#FFAF38" />
                {/* Rocket Body */}
                <path d="M88 32C76 18 64 24 54 34L40 48C38 50 38 54 41 57L63 79C66 82 70 82 72 80L86 66C96 56 102 44 88 32Z" fill="url(#rocketBody)" />
                {/* Wings */}
                <path d="M42 50L26 56L34 72L50 66L42 50Z" fill="#35D13F" />
                <path d="M70 78L64 94L80 86L74 70L70 78Z" fill="#1FA82C" />
                {/* Porthole Window */}
                <circle cx="68" cy="52" r="10" fill="#0A0A0A" stroke="#FFFFFF" strokeWidth="2.5" />
                <circle cx="66" cy="50" r="4" fill="#35D13F" />
                <defs>
                  <linearGradient id="rocketBody" x1="88" y1="32" x2="40" y2="80" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#FFFFFF" />
                    <stop offset="0.5" stopColor="#E5E7EB" />
                    <stop offset="1" stopColor="#D1D5DB" />
                  </linearGradient>
                  <radialGradient id="rocketGlow" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(32 88) rotate(90) scale(22 14)">
                    <stop stopColor="#35D13F" stopOpacity="0.9" />
                    <stop offset="1" stopColor="#1FA82C" stopOpacity="0" />
                  </radialGradient>
                </defs>
              </svg>
            </div>
          </div>

          {/* GSAP Split Headline */}
          <h1
            ref={wordsContainerRef}
            id="hero-main-heading"
            className="text-4xl sm:text-5xl md:text-6xl lg:text-[66px] font-display font-extrabold text-[#0A0A0A] tracking-[-0.035em] leading-[1.08] flex flex-wrap justify-center items-baseline"
          >
            {headlineWords.map((word, idx) => (
              <span
                key={idx}
                className="overflow-hidden inline-block align-top mr-[0.26em] last:mr-0 py-1"
              >
                <span
                  className={`gsap-word-inner inline-block transform-gpu ${
                    word.isHighlighted
                      ? 'text-shimmer-green font-black relative drop-shadow-xs'
                      : 'text-[#0A0A0A]'
                  }`}
                >
                  {word.text}
                </span>
              </span>
            ))}
          </h1>
        </div>

        {/* =========================================================================
            3. SUB-LINE: Web Development • UI/UX Design • Graphic Designing • Video Editing • SEO
           ========================================================================= */}
        <div ref={sublineRef} className="mt-6 mb-10 opacity-0">
          <div
            id="hero-subline"
            className="flex flex-wrap items-center justify-center gap-x-2 sm:gap-x-3 gap-y-2 text-xs sm:text-sm md:text-[13px] font-bold uppercase tracking-[0.2em] text-neutral-500 max-w-4xl mx-auto"
          >
            {[
              'Web Development',
              'UI/UX Design',
              'Graphic Designing',
              'Video Editing',
              'SEO',
            ].map((skill, idx, arr) => (
              <React.Fragment key={skill}>
                <span className="px-2.5 py-1 rounded-full border border-transparent hover:border-[#1FA82C]/30 hover:bg-emerald-50/70 hover:text-[#0A0A0A] hover:shadow-xs transition-all duration-200 cursor-default select-none">
                  {skill}
                </span>
                {idx < arr.length - 1 && (
                  <span
                    className="inline-block w-1.5 h-1.5 rounded-full bg-[#1FA82C] shadow-[0_0_8px_#35D13F] transition-transform duration-200 hover:scale-150"
                    aria-hidden="true"
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* =========================================================================
            4. HERO IMAGE CONTAINER: 16:9 Showcase with GSAP 3D Interactive Parallax
           ========================================================================= */}
        <div
          ref={imageCardWrapperRef}
          id="hero-team-card"
          className="relative w-full max-w-5xl perspective-1000 opacity-0"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          {/* Card Inner with 3D Tilt Transformation */}
          <div
            ref={imageCardInnerRef}
            className="relative group rounded-2xl sm:rounded-3xl md:rounded-[36px] p-2 sm:p-3 bg-white/85 border border-neutral-200/80 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.14),0_10px_25px_-5px_rgba(31,168,44,0.08)] transition-shadow duration-500 hover:shadow-[0_28px_80px_-15px_rgba(0,0,0,0.22),0_14px_35px_-5px_rgba(31,168,44,0.16)] will-change-transform"
          >
            {/* Interactive Cursor Glare Effect */}
            <div
              ref={glareRef}
              className="absolute inset-0 rounded-2xl sm:rounded-3xl md:rounded-[36px] pointer-events-none transition-opacity duration-300 z-20 opacity-0"
            />

            {/* Image Aspect Ratio Wrapper (16:9ish) */}
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl sm:rounded-2xl md:rounded-[28px] bg-neutral-950">
              
              {/* High resolution team office collaboration photograph */}
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1600&q=80"
                alt="HK Digital Agency core engineering and design team collaborating in glass conference suite"
                className="w-full h-full object-cover object-center transform group-hover:scale-103 transition-transform duration-700 ease-out"
                loading="eager"
                referrerPolicy="no-referrer"
              />

              {/* Cinematic lighting gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent pointer-events-none" />

              {/* Card Bottom Taglines */}
              <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 md:bottom-8 md:left-8 right-4 flex flex-wrap items-center justify-between gap-3 text-white pointer-events-none">
                <div className="flex items-center gap-3">
                  <span className="flex h-3 w-3 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#35D13F] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-[#1FA82C]"></span>
                  </span>
                  <div className="text-left">
                    <p className="text-xs sm:text-sm font-semibold tracking-wide text-neutral-200">
                      Collaborative Innovation Lab
                    </p>
                    <p className="text-[11px] sm:text-xs text-neutral-400">
                      London • New York • Singapore
                    </p>
                  </div>
                </div>

                {/* Micro satisfaction badge */}
                <div className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/55 backdrop-blur-md border border-white/20 text-xs font-medium text-white shadow-xl">
                  <CheckCircle2 className="w-4 h-4 text-[#35D13F]" />
                  <span>99.8% On-Time Delivery</span>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
