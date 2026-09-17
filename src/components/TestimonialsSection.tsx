import React, { useEffect, useRef, useState, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Testimonial Data matching reference image pics 5.png and top-tier agency clients
 */
interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  avatar: string;
  rating: number;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: 'elena-rostova',
    quote: 'From UX wireframes to production deployment, HK Digital Agency brought our creative vision to life with precision and unmatched aesthetic polish.',
    author: 'Elena Rostova',
    role: 'Head of Brand Design, Aura Studio',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=400&auto=format&fit=crop',
    rating: 5,
  },
  {
    id: 'marcus-vance',
    quote: 'The level of craftsmanship and speed of execution completely transformed our product launch. Our conversions jumped 180% within the first month.',
    author: 'Marcus Vance',
    role: 'Chief Technology Officer, FinWave',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop',
    rating: 5,
  },
  {
    id: 'stephen-brekke',
    quote: "If you want real marketing that works and effective implementation – mobile app's got you covered.",
    author: 'Stephen Brekke',
    role: 'Legacy Integration Producer',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400&auto=format&fit=crop',
    rating: 5,
  },
  {
    id: 'david-chen',
    quote: 'Working with this team was an absolute pleasure. Their technical depth in interactive GSAP animations and clean architecture set a new benchmark for us.',
    author: 'David Chen',
    role: 'VP of Product, CloudSync',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop',
    rating: 5,
  },
  {
    id: 'sophia-alvarez',
    quote: 'They didn’t just build a website; they engineered an immersive brand experience that captivates our customers and drives recurring engagement.',
    author: 'Sophia Alvarez',
    role: 'Creative Director, LuxVenture',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop',
    rating: 5,
  },
];

export const TestimonialsSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const carouselContainerRef = useRef<HTMLDivElement>(null);
  const carouselTrackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const starRefs = useRef<(HTMLDivElement | null)[]>([]);
  const autoplayTimerRef = useRef<gsap.core.Tween | null>(null);

  // Initialize at the middle card (index 2 of 5)
  const initialIndex = Math.floor(TESTIMONIALS.length / 2);
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isInteracting, setIsInteracting] = useState(false);
  const isFirstMountRef = useRef(true);

  // Drag / Swipe Tracking State
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const currentDragXRef = useRef(0);
  const dragDistanceRef = useRef(0);

  // Motion preference detection
  const prefersReducedMotion = typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false;

  const totalCards = TESTIMONIALS.length;

  /**
   * Helper: Calculate the target translation for the carousel track
   * Centers the active card in the viewport container.
   */
  const getCardWidthAndOffset = useCallback(() => {
    if (!carouselContainerRef.current) {
      return { cardWidth: 420, gap: 24, containerWidth: 1200 };
    }
    const containerWidth = carouselContainerRef.current.offsetWidth || (typeof window !== 'undefined' ? window.innerWidth : 1200);
    const cardEl = cardRefs.current[currentIndex] || cardRefs.current[0];
    const cardWidth = cardEl ? cardEl.offsetWidth : (typeof window !== 'undefined' && window.innerWidth < 640 ? 310 : typeof window !== 'undefined' && window.innerWidth < 768 ? 380 : 420);
    const gap = typeof window !== 'undefined' && window.innerWidth < 640 ? 16 : 24;
    return { cardWidth, gap, containerWidth };
  }, [currentIndex]);

  const updateCarouselPosition = useCallback(
    (index: number, animate = true) => {
      if (!carouselTrackRef.current || !carouselContainerRef.current) return;

      const { cardWidth, gap, containerWidth } = getCardWidthAndOffset();
      // Center the active card: (containerWidth / 2) - (cardWidth / 2) - (index * (cardWidth + gap))
      const targetX = (containerWidth / 2) - (cardWidth / 2) - index * (cardWidth + gap);

      if (animate && !prefersReducedMotion) {
        gsap.to(carouselTrackRef.current, {
          x: targetX,
          duration: 0.6,
          ease: 'power3.inOut',
          overwrite: 'auto',
        });
      } else {
        gsap.set(carouselTrackRef.current, { x: targetX });
      }

      // Update card scale & opacity visual hierarchy (middle card 1.04x, side cards 0.96x / 0.88 opacity)
      cardRefs.current.forEach((card, i) => {
        if (!card) return;
        const isCenter = i === index;
        const distance = Math.abs(i - index);

        if (prefersReducedMotion) {
          gsap.set(card, {
            scale: 1,
            opacity: 1,
            zIndex: isCenter ? 20 : 10,
          });
          return;
        }

        const targetScale = isCenter ? 1.04 : 0.96;
        const targetOpacity = isCenter ? 1 : distance === 1 ? 0.88 : 0.65;
        const targetShadow = isCenter
          ? '0 25px 50px -12px rgba(0, 0, 0, 0.1), 0 10px 24px -6px rgba(31, 168, 44, 0.08)'
          : '0 8px 20px -4px rgba(0, 0, 0, 0.04)';
        const targetZ = isCenter ? 25 : 10 - distance;

        if (animate) {
          gsap.to(card, {
            scale: targetScale,
            opacity: targetOpacity,
            boxShadow: targetShadow,
            zIndex: targetZ,
            duration: 0.5,
            ease: 'power2.out',
            overwrite: 'auto',
          });
        } else {
          gsap.set(card, {
            scale: targetScale,
            opacity: targetOpacity,
            boxShadow: targetShadow,
            zIndex: targetZ,
          });
        }
      });
    },
    [getCardWidthAndOffset, prefersReducedMotion]
  );

  /**
   * Navigation Handlers
   */
  const goToSlide = useCallback(
    (index: number) => {
      const clamped = Math.max(0, Math.min(totalCards - 1, index));
      setCurrentIndex(clamped);
      updateCarouselPosition(clamped, true);
    },
    [totalCards, updateCarouselPosition]
  );

  const prevSlide = useCallback(() => {
    goToSlide(currentIndex === 0 ? totalCards - 1 : currentIndex - 1);
  }, [currentIndex, totalCards, goToSlide]);

  const nextSlide = useCallback(() => {
    goToSlide(currentIndex === totalCards - 1 ? 0 : currentIndex + 1);
  }, [currentIndex, totalCards, goToSlide]);

  /**
   * Auto-Play Engine with Clean gsap.delayedCall
   */
  const startAutoplay = useCallback(() => {
    if (prefersReducedMotion || isInteracting) return;
    if (autoplayTimerRef.current) {
      autoplayTimerRef.current.kill();
    }
    autoplayTimerRef.current = gsap.delayedCall(5, () => {
      nextSlide();
    });
  }, [isInteracting, nextSlide, prefersReducedMotion]);

  const pauseAutoplay = useCallback(() => {
    if (autoplayTimerRef.current) {
      autoplayTimerRef.current.kill();
      autoplayTimerRef.current = null;
    }
  }, []);

  // Sync position on index change and trigger autoplay
  useEffect(() => {
    if (isFirstMountRef.current) {
      isFirstMountRef.current = false;
      updateCarouselPosition(currentIndex, false);
      const frameId = requestAnimationFrame(() => {
        updateCarouselPosition(currentIndex, false);
      });
      startAutoplay();
      return () => {
        cancelAnimationFrame(frameId);
        pauseAutoplay();
      };
    }

    updateCarouselPosition(currentIndex, true);
    startAutoplay();
    return () => pauseAutoplay();
  }, [currentIndex, updateCarouselPosition, startAutoplay, pauseAutoplay]);

  // Recalculate on window resize
  useEffect(() => {
    const handleResize = () => {
      updateCarouselPosition(currentIndex, false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [currentIndex, updateCarouselPosition]);

  /**
   * Master GSAP ScrollTrigger Entrance Animations
   */
  useEffect(() => {
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // 1. Header fade-up on scroll
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: headerRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // 2. Cards entrance: fade up with stagger (preserving scale and center alignment)
      const validCards = cardRefs.current.filter(Boolean);
      if (validCards.length > 0) {
        gsap.fromTo(
          validCards,
          { opacity: 0, y: 40 },
          {
            opacity: (i) => (i === currentIndex ? 1 : Math.abs(i - currentIndex) === 1 ? 0.88 : 0.65),
            y: 0,
            duration: 0.85,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: carouselContainerRef.current,
              start: 'top 82%',
              toggleActions: 'play none none none',
            },
            onComplete: () => {
              updateCarouselPosition(currentIndex, false);
            },
          }
        );
      }

      // 3. Stars pop-in stagger when section enters view
      starRefs.current.forEach((starGroup) => {
        if (!starGroup) return;
        const stars = starGroup.querySelectorAll('.star-icon');
        gsap.fromTo(
          stars,
          { scale: 0, opacity: 0, rotate: -30 },
          {
            scale: 1,
            opacity: 1,
            rotate: 0,
            duration: 0.5,
            stagger: 0.05,
            ease: 'back.out(2)',
            scrollTrigger: {
              trigger: starGroup,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [currentIndex, prefersReducedMotion, updateCarouselPosition]);

  /**
   * Pointer & Touch Drag Handlers (Native touch / swipe support)
   */
  const handlePointerDown = (e: React.PointerEvent) => {
    pauseAutoplay();
    setIsInteracting(true);
    isDraggingRef.current = true;
    startXRef.current = e.clientX;
    currentDragXRef.current = e.clientX;
    dragDistanceRef.current = 0;

    if (carouselTrackRef.current) {
      carouselTrackRef.current.style.cursor = 'grabbing';
      gsap.killTweensOf(carouselTrackRef.current);
    }
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current || !carouselTrackRef.current) return;
    const deltaX = e.clientX - currentDragXRef.current;
    dragDistanceRef.current = e.clientX - startXRef.current;
    currentDragXRef.current = e.clientX;

    // Apply immediate drag with slight resistance at edges
    const currentX = gsap.getProperty(carouselTrackRef.current, 'x') as number;
    gsap.set(carouselTrackRef.current, { x: currentX + deltaX });
  };

  const handlePointerUp = () => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    setIsInteracting(false);

    if (carouselTrackRef.current) {
      carouselTrackRef.current.style.cursor = 'grab';
    }

    const threshold = 60;
    if (dragDistanceRef.current > threshold && currentIndex > 0) {
      goToSlide(currentIndex - 1);
    } else if (dragDistanceRef.current < -threshold && currentIndex < totalCards - 1) {
      goToSlide(currentIndex + 1);
    } else {
      // Snap back to current
      updateCarouselPosition(currentIndex, true);
    }

    startAutoplay();
  };

  /**
   * Card Hover Effects (Desktop only)
   */
  const handleCardMouseEnter = (index: number) => {
    if (prefersReducedMotion) return;
    pauseAutoplay();
    const card = cardRefs.current[index];
    if (!card) return;

    // Lift card and deepen shadow
    gsap.to(card, {
      y: -6,
      duration: 0.3,
      ease: 'power2.out',
      overwrite: 'auto',
    });

    // Rotate and pulse the "Testimonial" badge icon
    const badgeIcon = card.querySelector('.badge-icon');
    if (badgeIcon) {
      gsap.to(badgeIcon, {
        rotate: 15,
        scale: 1.15,
        duration: 0.3,
        ease: 'back.out(2)',
      });
    }

    // Star shimmer effect (staggered brightness boost)
    const stars = card.querySelectorAll('.star-icon');
    if (stars.length > 0) {
      gsap.to(stars, {
        filter: 'brightness(1.25) drop-shadow(0 0 6px rgba(53, 209, 63, 0.6))',
        stagger: 0.04,
        duration: 0.2,
        yoyo: true,
        repeat: 1,
      });
    }
  };

  const handleCardMouseLeave = (index: number) => {
    if (prefersReducedMotion) return;
    startAutoplay();
    const card = cardRefs.current[index];
    if (!card) return;

    gsap.to(card, {
      y: 0,
      duration: 0.3,
      ease: 'power2.out',
      overwrite: 'auto',
    });

    const badgeIcon = card.querySelector('.badge-icon');
    if (badgeIcon) {
      gsap.to(badgeIcon, {
        rotate: 0,
        scale: 1,
        duration: 0.3,
        ease: 'power2.out',
      });
    }

    const stars = card.querySelectorAll('.star-icon');
    if (stars.length > 0) {
      gsap.to(stars, {
        filter: 'none',
        duration: 0.2,
      });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="testimonials-section"
      className="relative w-full bg-[#F5F5F5] text-[#0A0A0A] py-20 md:py-28 overflow-hidden select-none border-t border-[#E5E5E5]"
      aria-label="What Our Clients Say"
    >
      {/* Screen-reader dynamic announcement */}
      <div className="sr-only" aria-live="polite">
        Showing testimonial {currentIndex + 1} of {totalCards}: {TESTIMONIALS[currentIndex].author}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* =========================================================================
            1. SECTION HEADER (Centered matching reference pics 5.png)
           ========================================================================= */}
        <div ref={headerRef} className="text-center max-w-3xl mx-auto mb-14 md:mb-18">
          <div className="inline-flex items-center justify-center gap-2 mb-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#1FA82C] shadow-[0_0_8px_#35D13F]" />
            <h2 className="text-2xl sm:text-3xl md:text-[34px] font-extrabold tracking-tight text-[#0A0A0A]">
              What Our Clients Say
            </h2>
          </div>
          <p className="text-[#6B6B6B] text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            Hear from our satisfied clients who have experienced firsthand the impact of our digital solutions.
            From enhanced online visibility to seamless user experiences, our work has helped businesses grow,
            engage audiences, and achieve their goals. Discover how we've transformed ideas into success stories.
          </p>
        </div>

        {/* =========================================================================
            2. TESTIMONIAL CAROUSEL ROW (3 visible cards matching pics 5.png)
           ========================================================================= */}
        <div
          ref={carouselContainerRef}
          className="relative w-full overflow-visible py-10 cursor-grab active:cursor-grabbing touch-pan-y"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          onMouseEnter={() => pauseAutoplay()}
          onMouseLeave={() => startAutoplay()}
          tabIndex={0}
          role="region"
          aria-roledescription="carousel"
          aria-label="Client Testimonials Slider"
          onKeyDown={(e) => {
            if (e.key === 'ArrowLeft') prevSlide();
            if (e.key === 'ArrowRight') nextSlide();
          }}
        >
          {/* Draggable Track */}
          <div
            ref={carouselTrackRef}
            className="flex items-center gap-4 sm:gap-6 will-change-transform"
            style={{ width: 'max-content' }}
          >
            {TESTIMONIALS.map((testimonial, idx) => {
              const isCenter = idx === currentIndex;

              return (
                <article
                  key={testimonial.id}
                  ref={(el) => {
                    cardRefs.current[idx] = el;
                  }}
                  onMouseEnter={() => handleCardMouseEnter(idx)}
                  onMouseLeave={() => handleCardMouseLeave(idx)}
                  className={`group/card relative shrink-0 w-[310px] sm:w-[380px] md:w-[420px] bg-white rounded-3xl p-6 sm:p-8 pt-10 sm:pt-12 flex flex-col justify-between transition-all duration-300 border border-[#EBEBEB] will-change-transform ${
                    isCenter ? 'ring-1 ring-black/5' : ''
                  }`}
                  style={{ minHeight: '300px' }}
                >
                  {/* Client Avatar (Overlapping the top-left card border matching pics 5.png) */}
                  <div className="absolute -top-7 left-6 sm:left-8 w-14 h-14 sm:w-16 sm:h-16 rounded-full border-4 border-white shadow-md overflow-hidden bg-neutral-100 transition-all duration-300 group-hover/card:ring-2 group-hover/card:ring-[#1FA82C] group-hover/card:shadow-[0_0_15px_rgba(31,168,44,0.3)]">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.author}
                      className="w-full h-full object-cover select-none pointer-events-none"
                      loading="lazy"
                    />
                  </div>

                  {/* 5 Glossy Green Star Icons on the Top Right */}
                  <div
                    ref={(el) => {
                      starRefs.current[idx] = el;
                    }}
                    className="flex items-center justify-end gap-1 mb-5"
                    aria-label="5 out of 5 stars rating"
                  >
                    {[...Array(5)].map((_, starIdx) => (
                      <div key={starIdx} className="star-icon inline-flex will-change-transform">
                        <Star
                          className="w-4 h-4 sm:w-5 sm:h-5 fill-[#1FA82C] text-[#35D13F] stroke-none drop-shadow-[0_1px_4px_rgba(31,168,44,0.35)]"
                        />
                      </div>
                    ))}
                  </div>

                  {/* Quote Text in Black Medium Weight */}
                  <blockquote className="my-2">
                    <p className="text-[#0A0A0A] text-[15px] sm:text-[17px] font-medium leading-relaxed">
                      "{testimonial.quote}"
                    </p>
                  </blockquote>

                  {/* Bottom Info: Author Name + Title & "Testimonial" Badge Pill */}
                  <div className="flex items-end justify-between pt-6 mt-4 border-t border-[#F0F0F0]">
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-[#0A0A0A] leading-tight">
                        {testimonial.author}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#6B6B6B] mt-0.5 font-normal">
                        {testimonial.role}
                      </p>
                    </div>

                    {/* Small "Testimonial" badge with glossy emerald circular icon */}
                    <div className="flex items-center gap-1.5 shrink-0 pl-2">
                      <div className="badge-icon w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-gradient-to-r from-[#1FA82C] to-[#35D13F] text-white flex items-center justify-center shadow-[0_2px_8px_rgba(31,168,44,0.35)] will-change-transform">
                        <Quote className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-white stroke-none" />
                      </div>
                      <span className="text-xs sm:text-sm font-semibold text-[#0A0A0A]">
                        Testimonial
                      </span>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        {/* =========================================================================
            3. CAROUSEL CONTROLS: Arrow Buttons & Expanding Dot Pagination
           ========================================================================= */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mt-8 max-w-4xl mx-auto px-4">
          
          {/* Arrow Navigation Buttons (Circular, glossy emerald gradient) */}
          <div className="flex items-center gap-3 order-2 sm:order-1">
            <button
              onClick={prevSlide}
              aria-label="Previous testimonial"
              className="w-11 h-11 rounded-full bg-gradient-to-r from-[#1FA82C] to-[#35D13F] text-white flex items-center justify-center shadow-[0_4px_14px_rgba(31,168,44,0.35)] hover:shadow-[0_0_20px_rgba(53,209,63,0.5)] hover:scale-110 active:scale-95 transition-all duration-200 cursor-pointer focus:outline-none focus-visible:ring-4 focus-visible:ring-[#1FA82C]/40"
            >
              <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
            </button>
            <button
              onClick={nextSlide}
              aria-label="Next testimonial"
              className="w-11 h-11 rounded-full bg-gradient-to-r from-[#1FA82C] to-[#35D13F] text-white flex items-center justify-center shadow-[0_4px_14px_rgba(31,168,44,0.35)] hover:shadow-[0_0_20px_rgba(53,209,63,0.5)] hover:scale-110 active:scale-95 transition-all duration-200 cursor-pointer focus:outline-none focus-visible:ring-4 focus-visible:ring-[#1FA82C]/40"
            >
              <ChevronRight className="w-5 h-5 stroke-[2.5]" />
            </button>
          </div>

          {/* Dot Pagination Indicators with Width-Expand Animation */}
          <div
            className="flex items-center gap-2 order-1 sm:order-2"
            role="tablist"
            aria-label="Testimonial slides"
          >
            {TESTIMONIALS.map((_, dotIdx) => {
              const isActive = dotIdx === currentIndex;
              return (
                <button
                  key={dotIdx}
                  onClick={() => goToSlide(dotIdx)}
                  role="tab"
                  aria-selected={isActive}
                  aria-label={`Go to testimonial ${dotIdx + 1}`}
                  className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1FA82C] ${
                    isActive
                      ? 'w-8 bg-gradient-to-r from-[#1FA82C] to-[#35D13F] shadow-[0_2px_8px_rgba(31,168,44,0.4)]'
                      : 'w-2.5 bg-[#D1D5DB] hover:bg-[#9CA3AF]'
                  }`}
                />
              );
            })}
          </div>

          {/* Numerical Counter */}
          <div className="order-3 text-xs sm:text-sm font-mono text-[#6B6B6B]">
            <span className="font-bold text-[#0A0A0A]">0{currentIndex + 1}</span>
            <span className="mx-1 text-[#CCCCCC]">/</span>
            <span>0{totalCards}</span>
          </div>

        </div>

      </div>
    </section>
  );
};
