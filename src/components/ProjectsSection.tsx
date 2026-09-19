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
}

const PROJECTS: ProjectItem[] = [
  {
    id: 'elearning-platform',
    title: 'E-Commerce & Digital Fashion Store',
    categories: ['Website', 'Fashion'],
    description: 'Creating seamless and high-converting eCommerce experiences that drive sales and customer engagement.',
    fullOverview: 'A high-converting eCommerce and fashion retail destination engineered with lightning-fast catalog search, interactive 3D product previews, and frictionless checkout flows.',
    client: 'Velvet & Thread Global',
    deliverables: ['Headless Next.js Storefront', 'Stripe Multi-Currency Checkout', 'Algolia AI Instant Search', 'Sub-Second Page Load Speed'],
    metrics: '+240% Sales Conversion',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 'team-meeting-suite',
    title: 'Pulse Team & Mobile Event Management',
    categories: ['Mobile App', 'Event Management'],
    description: 'Streamlining mobile management with intuitive, efficient, and user-friendly solutions for seamless control.',
    fullOverview: 'An executive calendar, custom team collaboration, and automated meeting reminder suite with integrated real-time synchronization and live push alerts.',
    client: 'SyncWave Enterprises',
    deliverables: ['iOS & Android Cross-Platform App', 'Offline-First Cloud Sync', 'Custom Micro-Interactions', 'Push Notification Engine'],
    metrics: '4.9★ App Store Rating',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 'fintech-asset-transfer',
    title: 'Fintech Vault & Digital Banking Suite',
    categories: ['Website', 'Fashion'],
    description: 'Creating seamless and high-converting eCommerce experiences that drive sales and customer engagement.',
    fullOverview: 'Next-generation biometric digital banking platform engineered for ultra-low latency peer-to-peer transfers, asset tracking, and multi-currency budgeting.',
    client: 'Aura Financial Technologies',
    deliverables: ['Biometric Authentication Protocol', 'P2P Micro-Payments Gateway', 'Real-Time Financial Analytics', 'Automated Compliance Engine'],
    metrics: '$18M+ Monthly Volume',
    image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 'lifestyle-event-discovery',
    title: 'Lifestyle Social & Venue Discovery App',
    categories: ['Mobile App', 'Event Management'],
    description: 'Streamlining mobile management with intuitive, efficient, and user-friendly solutions for seamless control.',
    fullOverview: 'An interactive social venue guide, ticketing marketplace, and curated nightlife discovery feed customized through intelligent location-based recommendations.',
    client: 'Vivid Hospitality Group',
    deliverables: ['Geolocation Event Mapping', 'Dynamic QR Code Ticketing', 'Interactive Feed Engine', 'In-App Social Messaging'],
    metrics: '120k Active Users',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 'pitch-deck-keynote',
    title: 'Venture Pitch & Keynote Showcase',
    categories: ['Website', 'Fashion'],
    description: 'Creating seamless and high-converting eCommerce experiences that drive sales and customer engagement.',
    fullOverview: 'Interactive digital pitch showcase with WebGL smooth transitions, interactive slide controls, and investor engagement telemetry.',
    client: 'HyperOrb Studios',
    deliverables: ['Interactive WebGL Scene', 'Kinetic Typography Engine', 'High-Speed Asset Streaming', 'Venture Pitch Generator'],
    metrics: 'FWA of the Day Winner',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 'nexus-enterprise-suite',
    title: 'Nexus Operations & Control Dashboard',
    categories: ['Mobile App', 'Event Management'],
    description: 'Streamlining mobile management with intuitive, efficient, and user-friendly solutions for seamless control.',
    fullOverview: 'Enterprise resource planning and field operations mobile platform empowering managers to track tasks, team rosters, and real-time revenue forecasts.',
    client: 'OmniGlobal Logistics',
    deliverables: ['Role-Based Access Control', 'Automated Shift Scheduling', 'Predictive Resource Telemetry', 'Multi-Tenant Cloud Backend'],
    metrics: '99.98% SLA Guaranteed',
    image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=1200&auto=format&fit=crop',
  },
];

/**
 * Our Project Portfolio Section Component
 * 
 * Clean, rock-solid, and matching pics 4.png:
 * 1. 2-column header with green accent dot, "Our Project" title, and fluid description.
 * 2. 2-column balanced project cards grid matching exact reference layout.
 * 3. Stable, crisp hover elevation with smooth CSS image zoom and soft shadows.
 * 4. Floating green circular action button with white "+" icon in bottom-right corner.
 * 5. Category pill badges + project title + 2-line authentic description.
 * 6. Interactive lightbox modal with full project deliverables and client metrics.
 */
export const ProjectsSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerContainerRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);

  // Modal State
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const modalBackdropRef = useRef<HTMLDivElement>(null);
  const modalContentRef = useRef<HTMLDivElement>(null);

  // Smooth Viewport Entrance via GSAP ScrollTrigger
  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Header entrance animation
      if (headerContainerRef.current) {
        gsap.fromTo(
          headerContainerRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: headerContainerRef.current,
              start: 'top 88%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // 2. Staggered Entrance for Cards
      const validCards = cardRefs.current.filter(Boolean);
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
            clearProps: 'transform', // Clears inline transforms so hover CSS works smoothly
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Modal handlers
  const openModal = (project: ProjectItem) => {
    setSelectedProject(project);
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
          { opacity: 0, scale: 0.92, y: 20 },
          { opacity: 1, scale: 1, y: 0, duration: 0.35, ease: 'back.out(1.3)' }
        );
      }
    });
  };

  const closeModal = useCallback(() => {
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
          setSelectedProject(null);
          document.body.style.overflow = '';
        },
      });
    } else {
      setSelectedProject(null);
      document.body.style.overflow = '';
    }
  }, []);

  // ESC key closes modal
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
      className="relative w-full bg-white text-[#0A0A0A] pt-20 pb-28 md:pt-28 md:pb-36 border-t border-[#F0F0F0]"
      aria-labelledby="projects-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* =========================================================================
            SECTION HEADER: 2-Column Split matching pics 4.png
           ========================================================================= */}
        <div
          ref={headerContainerRef}
          className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-16 items-start mb-12 sm:mb-16 md:mb-20"
        >
          {/* Left Column: Eyebrow "Our Project" with green indicator */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[#1FA82C] shadow-[0_0_10px_#35D13F] shrink-0" />
              <h2
                id="projects-heading"
                className="text-2xl sm:text-3xl md:text-[34px] font-display font-extrabold tracking-tight text-[#1FA82C]"
              >
                Our Project
              </h2>
            </div>
          </div>

          {/* Right Column: Clean supporting description */}
          <div className="lg:col-span-8">
            <p className="text-[#6B6B6B] text-base sm:text-lg leading-[1.75] font-normal">
              Explore our portfolio of SEO-optimized websites, user-centric UI/UX designs, and
              high-performance digital solutions crafted to elevate brands and create lasting impact.
              Each project reflects our commitment to innovation, creativity, and strategic excellence
              in the digital space.
            </p>
          </div>
        </div>

        {/* =========================================================================
            PROJECT GRID: 2 Columns with Crisp, Rock-Solid Cards matching pics 4.png
           ========================================================================= */}
        <div
          ref={cardsContainerRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-start"
        >
          {PROJECTS.map((project, index) => {
            return (
              <article
                key={project.id}
                ref={(el) => {
                  cardRefs.current[index] = el;
                }}
                onClick={() => openModal(project)}
                className="group flex flex-col space-y-4 cursor-pointer text-left focus:outline-none"
              >
                {/* 1. Project Mockup Frame */}
                <div className="relative w-full aspect-[4/3] sm:aspect-[16/11] rounded-2xl sm:rounded-3xl overflow-hidden bg-neutral-100 border border-neutral-200/80 shadow-xs transition-all duration-300 group-hover:shadow-lg group-hover:border-[#1FA82C]/30">
                  {/* Clean Mockup Image with Smooth Hover Zoom */}
                  <img
                    src={project.image}
                    alt={project.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  />

                  {/* Subtle hover gradient wash */}
                  <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                  {/* Floating Circular Green "+" Icon Button in Bottom-Right Corner */}
                  <div
                    aria-hidden="true"
                    className="absolute bottom-4 right-4 sm:bottom-5 sm:right-5 z-10 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-gradient-to-r from-[#1FA82C] to-[#35D13F] text-white flex items-center justify-center shadow-[0_4px_14px_rgba(31,168,44,0.35)] transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_6px_20px_rgba(31,168,44,0.5)]"
                  >
                    <Plus className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.5]" />
                  </div>
                </div>

                {/* 2. Metadata Content (Pill tags, Title, Description) */}
                <div className="flex flex-col space-y-2 pt-1">
                  {/* Category Tags */}
                  <div className="flex flex-wrap items-center gap-2">
                    {project.categories.map((cat, catIdx) => (
                      <span
                        key={catIdx}
                        className="px-3.5 py-1 rounded-full text-xs font-semibold bg-[#F2F4F7] text-[#0A0A0A] group-hover:bg-emerald-50 group-hover:text-[#1FA82C] transition-colors duration-200"
                      >
                        {cat}
                      </span>
                    ))}
                  </div>

                  {/* Project Title */}
                  <h3 className="text-lg sm:text-xl font-display font-bold text-[#0A0A0A] tracking-tight group-hover:text-[#1FA82C] transition-colors duration-200">
                    {project.title}
                  </h3>

                  {/* Project Description */}
                  <p className="text-[#6B6B6B] text-sm sm:text-[15px] leading-relaxed line-clamp-2">
                    {project.description}
                  </p>
                </div>
              </article>
            );
          })}
        </div>

      </div>

      {/* =========================================================================
          PROJECT DETAIL LIGHTBOX / MODAL
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
            className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white rounded-3xl shadow-2xl border border-white/20 text-[#0A0A0A] p-6 sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close "x" Button */}
            <button
              onClick={closeModal}
              aria-label="Close project modal"
              className="absolute top-5 right-5 z-20 w-10 h-10 rounded-full bg-neutral-100 hover:bg-[#0A0A0A] text-neutral-600 hover:text-white flex items-center justify-center transition-colors duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1FA82C]"
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
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-[#1FA82C] to-[#35D13F] hover:shadow-[0_4px_16px_rgba(31,168,44,0.4)] transition-all hover:scale-[1.02] btn-shine-sweep"
                >
                  <span>Inquire About Similar Project</span>
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
