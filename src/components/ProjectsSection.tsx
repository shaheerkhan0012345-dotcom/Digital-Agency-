import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Plus, X, ArrowUpRight, Check, Sparkles } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP ScrollTrigger plugin safely
gsap.registerPlugin(ScrollTrigger);

/**
 * Project Data Structure matching reference image pics 4.png
 */
interface ProjectItem {
  id: string;
  title: string;
  categories: string[];
  description: string;
  fullOverview: string;
  client: string;
  deliverables: string[];
  metrics: string;
  image: string;
  isDarkCard?: boolean;
  customOverlay?: {
    headline: string;
    subline?: string;
  };
}

const PROJECTS: ProjectItem[] = [
  {
    id: 'elearning-platform',
    title: 'E-Learning & Knowledge Ecosystem',
    categories: ['Website', 'Fashion'],
    description: 'Creating seamless and high-converting eCommerce experiences that drive sales and customer engagement.',
    fullOverview: 'A multi-tenant education and eCommerce destination engineered with blazing-fast search, live cohort sessions, and seamless subscription checkouts.',
    client: 'EduCore Global Labs',
    deliverables: ['Full-Stack Next.js Architecture', 'Stripe Checkout Integration', 'Interactive Video Player', 'SEO 99+ Score'],
    metrics: '+240% Student Conversion',
    image: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=1200&auto=format&fit=crop',
    customOverlay: {
      headline: 'Learn With an Expert Specialist Anytime Anywhere!',
    },
  },
  {
    id: 'team-meeting-suite',
    title: 'Pulse Team & Meeting Mobile Suite',
    categories: ['Mobile App', 'Event Management'],
    description: 'Streamlining mobile management with intuitive, efficient, and user-friendly solutions for seamless control.',
    fullOverview: 'An executive calendar, custom team collaboration, and automated meeting reminder suite with integrated real-time synchronization.',
    client: 'SyncWave Enterprises',
    deliverables: ['iOS & Android React Native', 'Offline-First Cloud Sync', 'Custom Micro-Interactions', 'Push Notification Engine'],
    metrics: '4.9★ App Store Rating',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop',
    customOverlay: {
      headline: 'Custom Team & Meeting Reminder',
      subline: 'Revenue Stats & Real-time Alerts',
    },
  },
  {
    id: 'fintech-asset-transfer',
    title: 'Fintech Vault & Asset Transfer App',
    categories: ['Website', 'Fashion'],
    description: 'Creating seamless and high-converting eCommerce experiences that drive sales and customer engagement.',
    fullOverview: 'Next-generation biometric digital banking application engineered for ultra-low latency peer-to-peer transfers and multi-currency budgeting.',
    client: 'Aura Financial Technologies',
    deliverables: ['Biometric Authentication', 'P2P Micro-Payments Gateway', 'Real-Time Financial Analytics', 'Dark Mode UI System'],
    metrics: '$18M+ Monthly Volume',
    image: 'https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?q=80&w=1200&auto=format&fit=crop',
    customOverlay: {
      headline: 'Upload & Share Asset Pipeline',
      subline: 'Biometric Encrypted Transfers',
    },
  },
  {
    id: 'lifestyle-event-discovery',
    title: 'Lifestyle Social & Event Discovery',
    categories: ['Mobile App', 'Event Management'],
    description: 'Streamlining mobile management with intuitive, efficient, and user-friendly solutions for seamless control.',
    fullOverview: 'An interactive social venue guide, ticketing marketplace, and curated nightlife discovery feed customized through intelligent recommendations.',
    client: 'Vivid Hospitality Group',
    deliverables: ['Geolocation Event Mapping', 'Dynamic QR Code Ticketing', 'Interactive Feed Engine', 'In-App Social Messaging'],
    metrics: '120k Active Users',
    image: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?q=80&w=1200&auto=format&fit=crop',
    customOverlay: {
      headline: 'What would you like 2 Do it?',
      subline: 'Curated Daily Experience Discovery',
    },
  },
  {
    id: 'pitch-dock-keynote',
    title: 'Get Your Best Pitch Deck - 3D Keynote',
    categories: ['Website', 'Fashion'],
    description: 'Creating seamless and high-converting eCommerce experiences that drive sales and customer engagement.',
    fullOverview: 'Award-winning interactive 3D web experience with WebGL glowing orb transitions, custom spatial sound, and interactive investor deck generation.',
    client: 'HyperOrb Studios',
    deliverables: ['Three.js / WebGL Spatial Scene', 'Kinetic Typography Engine', 'High-Speed Asset Streaming', 'Venture Pitch Generator'],
    metrics: 'FWA of the Day Winner',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop',
    isDarkCard: true,
    customOverlay: {
      headline: 'Get your best pitch dock',
      subline: 'Crafting pitch decks that win multi-million venture rounds',
    },
  },
  {
    id: 'nexus-enterprise-suite',
    title: 'Nexus Operations & Control Dashboard',
    categories: ['Mobile App', 'Event Management'],
    description: 'Streamlining mobile management with intuitive, efficient, and user-friendly solutions for seamless control.',
    fullOverview: 'Enterprise resource planning and field operations mobile platform empowering field managers to track tasks, rosters, and revenue forecasts.',
    client: 'OmniGlobal Logistics',
    deliverables: ['Role-Based Access Control', 'Automated Shift Scheduling', 'Predictive Resource Telemetry', 'Multi-Tenant Cloud Backend'],
    metrics: '99.98% SLA Guaranteed',
    image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=1200&auto=format&fit=crop',
    customOverlay: {
      headline: 'Streamlined Operational Telemetry',
      subline: 'Custom Team & Live Revenue Tracking',
    },
  },
];

/**
 * Our Project Portfolio Section Component
 * 
 * Enhanced with Award-Winning Silky Smooth GSAP Animations:
 * 1. Kinetic Header: Staggered letter slide-up mask with glowing beacon expansion & fluid text reveal
 * 2. Independent ScrollTrigger per card: Staggered entrance as each card enters the viewport
 * 3. Continuous Scroll-Scrubbed Image Parallax: Every project image glides smoothly inside its frame
 * 4. Magnetic 3D Tilt & Zoom: Cursor-tracking hover with depth on desktop
 * 5. Elastic Spring "+" Button: Rotates 135deg to "x" with radiant emerald aura
 * 6. Cinematic Modal: Smooth scale + backdrop blur with staggered deliverables reveal
 */
export const ProjectsSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerContainerRef = useRef<HTMLDivElement>(null);
  const titleWordRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const lineIndicatorRef = useRef<HTMLSpanElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);

  // Arrays of element refs for per-card animation
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const imageContainers = useRef<(HTMLDivElement | null)[]>([]);
  const imageElements = useRef<(HTMLImageElement | null)[]>([]);
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const metaContainers = useRef<(HTMLDivElement | null)[]>([]);

  // Modal State
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const modalBackdropRef = useRef<HTMLDivElement>(null);
  const modalContentRef = useRef<HTMLDivElement>(null);

  // Motion preference detection
  const prefersReducedMotion = typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false;

  // Master GSAP Setup with ScrollTrigger
  useEffect(() => {
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // -------------------------------------------------------------
      // 1. HEADER ANIMATION: Split Word Reveal & Fluid Line Draw
      // -------------------------------------------------------------
      const headerTl = gsap.timeline({
        scrollTrigger: {
          trigger: headerContainerRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });

      // Line / Beacon expand
      if (lineIndicatorRef.current) {
        headerTl.fromTo(
          lineIndicatorRef.current,
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.6, ease: 'back.out(2)' },
          0
        );
      }

      // Title words mask slide-up
      const validTitleWords = titleWordRefs.current.filter(Boolean);
      if (validTitleWords.length > 0) {
        headerTl.fromTo(
          validTitleWords,
          { yPercent: 120, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: 0.85,
            stagger: 0.1,
            ease: 'power4.out',
          },
          0.1
        );
      }

      // Supporting paragraph fluid fade-up
      if (paragraphRef.current) {
        headerTl.fromTo(
          paragraphRef.current,
          { opacity: 0, y: 25, filter: 'blur(4px)' },
          {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 0.95,
            ease: 'power3.out',
          },
          0.25
        );
      }

      // -------------------------------------------------------------
      // 2. PER-CARD SCROLLTRIGGER: Staggered Entrance & Continuous Parallax
      // -------------------------------------------------------------
      cardRefs.current.forEach((cardEl, idx) => {
        if (!cardEl) return;

        const imgContainer = imageContainers.current[idx];
        const imgEl = imageElements.current[idx];
        const btnEl = buttonRefs.current[idx];
        const metaEl = metaContainers.current[idx];

        // A. Smooth Entrance Timeline when card scrolls into view
        const cardEntranceTl = gsap.timeline({
          scrollTrigger: {
            trigger: cardEl,
            start: 'top 88%',
            toggleActions: 'play none none none',
          },
        });

        // 1. Card container subtle slide up & fade
        cardEntranceTl.fromTo(
          cardEl,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: 'power3.out',
          },
          0
        );

        // 2. Image scale down from 1.15 to 1.05 (curtain reveal effect)
        if (imgEl) {
          cardEntranceTl.fromTo(
            imgEl,
            { scale: 1.18, opacity: 0.7 },
            {
              scale: 1.05,
              opacity: 1,
              duration: 1.2,
              ease: 'power2.out',
            },
            0.1
          );

          // B. Continuous Scroll Parallax inside frame (Scrubbed)
          gsap.fromTo(
            imgEl,
            { yPercent: -7 },
            {
              yPercent: 7,
              ease: 'none',
              scrollTrigger: {
                trigger: cardEl,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1.2,
              },
            }
          );
        }

        // 3. Floating "+" button springy pop-in
        if (btnEl) {
          cardEntranceTl.fromTo(
            btnEl,
            { scale: 0, rotate: -90, opacity: 0 },
            {
              scale: 1,
              rotate: 0,
              opacity: 1,
              duration: 0.7,
              ease: 'back.out(2.2)',
            },
            0.35
          );
        }

        // 4. Meta content (tags & description) slide up
        if (metaEl) {
          const tags = metaEl.querySelectorAll('.category-tag');
          const desc = metaEl.querySelector('.project-desc');

          if (tags.length > 0) {
            cardEntranceTl.fromTo(
              tags,
              { opacity: 0, y: 14 },
              {
                opacity: 1,
                y: 0,
                duration: 0.6,
                stagger: 0.06,
                ease: 'power2.out',
              },
              0.4
            );
          }

          if (desc) {
            cardEntranceTl.fromTo(
              desc,
              { opacity: 0, y: 10 },
              {
                opacity: 1,
                y: 0,
                duration: 0.6,
                ease: 'power2.out',
              },
              0.55
            );
          }
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  // -------------------------------------------------------------
  // 3. INTERACTIVE MOUSE TRACKING & MAGNETIC 3D TILT
  // -------------------------------------------------------------
  const handleCardMouseMove = (e: React.MouseEvent<HTMLElement>, index: number) => {
    if (prefersReducedMotion) return;

    const card = cardRefs.current[index];
    const img = imageElements.current[index];
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -5;
    const rotateY = ((x - centerX) / centerX) * 5;

    gsap.to(card, {
      rotateX,
      rotateY,
      transformPerspective: 1000,
      duration: 0.4,
      ease: 'power1.out',
      overwrite: 'auto',
    });

    if (img) {
      gsap.to(img, {
        x: ((x - centerX) / centerX) * -8,
        y: ((y - centerY) / centerY) * -8,
        duration: 0.5,
        ease: 'power1.out',
        overwrite: 'auto',
      });
    }
  };

  const handleCardMouseEnter = (index: number) => {
    if (prefersReducedMotion) return;

    const card = cardRefs.current[index];
    const img = imageElements.current[index];
    const btn = buttonRefs.current[index];

    if (card) {
      gsap.to(card, {
        y: -10,
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.12), 0 8px 24px rgba(31, 168, 44, 0.06)',
        duration: 0.5,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    }

    if (img) {
      gsap.to(img, {
        scale: 1.12,
        duration: 0.7,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    }

    if (btn) {
      gsap.to(btn, {
        rotate: 135,
        scale: 1.16,
        boxShadow: '0 0 28px rgba(53, 209, 63, 0.75), 0 4px 16px rgba(31, 168, 44, 0.45)',
        duration: 0.45,
        ease: 'elastic.out(1.1, 0.4)',
        overwrite: 'auto',
      });
    }
  };

  const handleCardMouseLeave = (index: number) => {
    if (prefersReducedMotion) return;

    const card = cardRefs.current[index];
    const img = imageElements.current[index];
    const btn = buttonRefs.current[index];

    if (card) {
      gsap.to(card, {
        rotateX: 0,
        rotateY: 0,
        y: 0,
        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.03)',
        duration: 0.6,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    }

    if (img) {
      gsap.to(img, {
        scale: 1.05,
        x: 0,
        y: 0,
        duration: 0.6,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    }

    if (btn) {
      gsap.to(btn, {
        rotate: 0,
        scale: 1.0,
        boxShadow: '0 4px 14px rgba(31, 168, 44, 0.35)',
        duration: 0.4,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    }
  };

  // -------------------------------------------------------------
  // 4. MODAL ANIMATION: Smooth Backdrop Blur + Scale Bounce
  // -------------------------------------------------------------
  const openModal = (project: ProjectItem) => {
    setSelectedProject(project);
    document.body.style.overflow = 'hidden';

    requestAnimationFrame(() => {
      if (modalBackdropRef.current && modalContentRef.current) {
        gsap.killTweensOf([modalBackdropRef.current, modalContentRef.current]);

        const modalTl = gsap.timeline();

        modalTl.fromTo(
          modalBackdropRef.current,
          { opacity: 0, backdropFilter: 'blur(0px)' },
          { opacity: 1, backdropFilter: 'blur(16px)', duration: 0.35, ease: 'power2.out' },
          0
        );

        modalTl.fromTo(
          modalContentRef.current,
          { opacity: 0, scale: 0.85, y: 35 },
          { opacity: 1, scale: 1, y: 0, duration: 0.5, ease: 'back.out(1.4)' },
          0.05
        );
      }
    });
  };

  const closeModal = useCallback(() => {
    if (modalBackdropRef.current && modalContentRef.current) {
      const modalCloseTl = gsap.timeline({
        onComplete: () => {
          setSelectedProject(null);
          document.body.style.overflow = '';
        },
      });

      modalCloseTl.to(
        modalContentRef.current,
        {
          opacity: 0,
          scale: 0.9,
          y: 20,
          duration: 0.25,
          ease: 'power2.in',
        },
        0
      );

      modalCloseTl.to(
        modalBackdropRef.current,
        {
          opacity: 0,
          duration: 0.25,
          ease: 'power2.in',
        },
        0.05
      );
    } else {
      setSelectedProject(null);
      document.body.style.overflow = '';
    }
  }, []);

  // Keyboard accessibility: ESC key closes modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedProject) {
        closeModal();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedProject, closeModal]);

  return (
    <section
      ref={sectionRef}
      id="our-projects-section"
      className="relative w-full bg-white text-[#0A0A0A] pt-20 pb-28 md:pt-28 md:pb-36 overflow-hidden border-t border-[#F0F0F0]"
      aria-labelledby="projects-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* =========================================================================
            SECTION HEADER: Kinetic 2-Column Split matching pics 4.png
           ========================================================================= */}
        <div
          ref={headerContainerRef}
          className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-16 items-start mb-14 sm:mb-18 md:mb-20"
        >
          {/* Left Column: Eyebrow "Our Project" with Kinetic Split Mask */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3">
              <span
                ref={lineIndicatorRef}
                className="w-2.5 h-2.5 rounded-full bg-[#1FA82C] shadow-[0_0_10px_#35D13F] shrink-0"
              />
              <h2
                id="projects-heading"
                className="text-2xl sm:text-3xl md:text-[34px] font-extrabold tracking-tight text-[#1FA82C] flex items-center gap-2 overflow-hidden py-1"
              >
                <span
                  ref={(el) => {
                    titleWordRefs.current[0] = el;
                  }}
                  className="inline-block will-change-transform"
                >
                  Our
                </span>
                <span
                  ref={(el) => {
                    titleWordRefs.current[1] = el;
                  }}
                  className="inline-block will-change-transform"
                >
                  Project
                </span>
              </h2>
            </div>
          </div>

          {/* Right Column: Fluid typography supporting paragraph */}
          <div className="lg:col-span-8">
            <p
              ref={paragraphRef}
              className="text-[#6B6B6B] text-base sm:text-lg leading-[1.75] font-normal will-change-transform"
            >
              Explore our portfolio of SEO-optimized websites, user-centric UI/UX designs, and
              high-performance digital solutions crafted to elevate brands and create lasting impact.
              Each project reflects our commitment to innovation, creativity, and strategic excellence
              in the digital space.
            </p>
          </div>
        </div>

        {/* =========================================================================
            PROJECT GRID: 2 Columns with Per-Card ScrollTrigger & Image Parallax
           ========================================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-start">
          {PROJECTS.map((project, index) => {
            return (
              <article
                key={project.id}
                ref={(el) => {
                  cardRefs.current[index] = el;
                }}
                onMouseMove={(e) => handleCardMouseMove(e, index)}
                onMouseEnter={() => handleCardMouseEnter(index)}
                onMouseLeave={() => handleCardMouseLeave(index)}
                className="group/card flex flex-col space-y-4 rounded-3xl p-2 sm:p-3 transition-shadow duration-300 will-change-transform"
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* 1. Project Mockup Frame with Overflow Hidden & Image Parallax */}
                <div
                  ref={(el) => {
                    imageContainers.current[index] = el;
                  }}
                  className="relative w-full aspect-[4/3] sm:aspect-[16/11] rounded-2xl sm:rounded-3xl overflow-hidden bg-neutral-100 border border-[#F0F0F0] shadow-xs"
                >
                  {/* Inner Image with GSAP continuous parallax */}
                  <div className="absolute inset-[-8%] w-[116%] h-[116%] overflow-hidden pointer-events-none">
                    <img
                      ref={(el) => {
                        imageElements.current[index] = el;
                      }}
                      src={project.image}
                      alt={project.title}
                      loading="lazy"
                      className={`w-full h-full object-cover select-none will-change-transform ${
                        project.isDarkCard ? 'brightness-90 contrast-110' : ''
                      }`}
                    />
                  </div>

                  {/* Dark gradient overlay for bottom legibility */}
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-transparent pointer-events-none transition-opacity duration-500 group-hover/card:opacity-90"
                    aria-hidden="true"
                  />

                  {/* Visual UI Overlays matching pics 4.png */}
                  {project.customOverlay && (
                    <div className="absolute inset-0 p-5 sm:p-7 flex flex-col justify-end text-white pointer-events-none z-10">
                      {project.isDarkCard ? (
                        <div className="space-y-1 sm:space-y-2">
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-[11px] font-mono border border-cyan-500/30 backdrop-blur-sm">
                            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                            KEYNOTE 3D SHOWCASE
                          </span>
                          <h3 className="text-2xl sm:text-3xl font-black tracking-tight drop-shadow-md">
                            {project.customOverlay.headline}
                          </h3>
                        </div>
                      ) : (
                        <div className="space-y-1">
                          <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white drop-shadow-md">
                            {project.title}
                          </h3>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Floating Circular "+" Icon Button with Elastic Rotation */}
                  <button
                    ref={(el) => {
                      buttonRefs.current[index] = el;
                    }}
                    onClick={() => openModal(project)}
                    aria-label={`View project details for ${project.title}`}
                    className="absolute bottom-4 right-4 sm:bottom-5 sm:right-5 z-20 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-gradient-to-r from-[#1FA82C] to-[#35D13F] text-white flex items-center justify-center shadow-[0_4px_14px_rgba(31,168,44,0.35)] cursor-pointer focus:outline-none focus-visible:ring-4 focus-visible:ring-white/80 will-change-transform"
                  >
                    <Plus className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.5]" />
                  </button>
                </div>

                {/* 2. Metadata Content (Pill tags & description) */}
                <div
                  ref={(el) => {
                    metaContainers.current[index] = el;
                  }}
                  className="flex flex-col space-y-2 pt-1"
                >
                  {/* Category Tags with smooth color transitions */}
                  <div className="flex flex-wrap items-center gap-2">
                    {project.categories.map((cat, catIdx) => (
                      <span
                        key={catIdx}
                        className="category-tag px-3.5 py-1 rounded-full text-xs font-semibold bg-[#F2F4F7] text-[#0A0A0A] hover:bg-[#1FA82C] hover:text-white hover:shadow-[0_2px_8px_rgba(31,168,44,0.3)] transition-all duration-200 cursor-default select-none"
                      >
                        {cat}
                      </span>
                    ))}
                  </div>

                  {/* Short Description */}
                  <p className="project-desc text-[#6B6B6B] text-sm sm:text-[15px] leading-relaxed line-clamp-2">
                    {project.description}
                  </p>
                </div>
              </article>
            );
          })}
        </div>

      </div>

      {/* =========================================================================
          GSAP-POWERED PROJECT LIGHTBOX / MODAL
         ========================================================================= */}
      {selectedProject && (
        <div
          ref={modalBackdropRef}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-md"
          onClick={closeModal}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-project-title"
        >
          <div
            ref={modalContentRef}
            className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white rounded-3xl shadow-2xl border border-white/20 text-[#0A0A0A] p-6 sm:p-8 will-change-transform"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close "x" Button */}
            <button
              onClick={closeModal}
              aria-label="Close project modal"
              className="absolute top-5 right-5 z-20 w-10 h-10 rounded-full bg-neutral-100 hover:bg-[#0A0A0A] text-neutral-600 hover:text-white flex items-center justify-center transition-all duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1FA82C]"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Image Header */}
            <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden mb-6 bg-neutral-900 shadow-sm">
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
                <span className="px-3 py-1 rounded-full bg-[#1FA82C] text-xs font-bold uppercase tracking-wider shadow-sm">
                  {selectedProject.metrics}
                </span>
                <span className="text-xs font-mono text-white/85">
                  Client: {selectedProject.client}
                </span>
              </div>
            </div>

            {/* Categories & Title */}
            <div className="flex flex-wrap gap-2 mb-3">
              {selectedProject.categories.map((cat, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-[#1FA82C] border border-[#1FA82C]/20"
                >
                  {cat}
                </span>
              ))}
            </div>

            <h3
              id="modal-project-title"
              className="text-2xl sm:text-3xl font-black tracking-tight text-[#0A0A0A] mb-3"
            >
              {selectedProject.title}
            </h3>

            {/* Overview paragraph */}
            <p className="text-[#555555] text-base leading-relaxed mb-6">
              {selectedProject.fullOverview}
            </p>

            {/* Deliverables Checklist */}
            <div className="mb-8 p-4 rounded-2xl bg-neutral-50 border border-neutral-100">
              <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-3 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#1FA82C]" />
                Key Scope & Deliverables
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {selectedProject.deliverables.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-sm text-neutral-700 font-medium">
                    <Check className="w-4 h-4 text-[#1FA82C] shrink-0 stroke-[2.5]" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-neutral-100">
              <div className="text-xs text-neutral-400 font-medium">
                Designed & Engineered by <strong className="text-neutral-800">HK Digital Agency</strong>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={closeModal}
                  className="px-5 py-2.5 rounded-full text-sm font-semibold text-neutral-600 hover:bg-neutral-100 transition-colors cursor-pointer"
                >
                  Close
                </button>
                <a
                  href="#contact"
                  onClick={closeModal}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-[#1FA82C] to-[#35D13F] hover:shadow-[0_4px_16px_rgba(31,168,44,0.4)] transition-all hover:scale-[1.02]"
                >
                  <span>View Live Project</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
