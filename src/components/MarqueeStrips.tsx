import React from 'react';

/**
 * 8-Point Star / Sparkle Icon matching reference image ribbon design
 */
const SparkleBurst: React.FC<{ className?: string }> = ({ className = "w-6 h-6 text-white" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    className={`inline-block flex-shrink-0 ${className}`}
    aria-hidden="true"
  >
    {/* 8-pointed star burst geometry */}
    <path d="M12 0L14.4 7.6L22 4.8L17.2 12L22 19.2L14.4 16.4L12 24L9.6 16.4L2 19.2L6.8 12L2 4.8L9.6 7.6L12 0Z" />
  </svg>
);

/**
 * MarqueeStrips Component
 * 
 * Features:
 * - Two skewed, overlapping ribbon strips crossing diagonally (-2.5deg and 2.5deg)
 * - Strip 1: Glossy green gradient scrolling left-to-right
 * - Strip 2: Rich black / dark emerald gradient scrolling right-to-left
 * - Pure CSS GPU-accelerated keyframe animation with will-change
 * - Duplicated content blocks for zero-glitch infinite loop
 * - Hover to pause for polished micro-interaction
 */
export const MarqueeStrips: React.FC = () => {
  // Strip 1 Content Items (Emerald Green Ribbon - Left to Right)
  const stripOneItems = [
    "Software Development",
    "HK Digital Agency",
    "Video Editing",
    "Digital Agency",
    "Software Development",
    "HK Digital Agency",
    "Video Editing",
    "Digital Agency",
  ];

  // Strip 2 Content Items (Rich Black Ribbon - Right to Left)
  const stripTwoItems = [
    "Graphic Designing",
    "HK Digital Agency",
    "Digital Marketing",
    "Software Solutions",
    "Graphic Designing",
    "HK Digital Agency",
    "Digital Marketing",
    "Software Solutions",
  ];

  return (
    <section
      id="marquee-strip-section"
      className="relative w-full py-12 md:py-16 overflow-hidden select-none"
      aria-label="Agency capabilities ticker"
    >
      <div className="relative w-full flex flex-col items-center justify-center">
        
        {/* =========================================================================
            STRIP 1: Glossy Emerald Green Ribbon (Left to Right Animation)
            Skewed at -2.8deg, overlapping top layer with soft elevation shadow
           ========================================================================= */}
        <div
          className="marquee-container relative z-20 w-[125%] -ml-[12.5%] py-4 sm:py-5 shadow-[0_12px_32px_rgba(31,168,44,0.3)] bg-gradient-to-r from-[#179023] via-[#1FA82C] to-[#35D13F] text-white border-y border-white/20 transform -rotate-[2.6deg] hover:z-30 transition-transform duration-300"
        >
          {/* Subtle gloss overlay highlight */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/25 via-transparent to-black/10 pointer-events-none" />

          {/* Continuous Infinite Track (Duplicated twice for seamless loop) */}
          <div className="animate-marquee-ltr flex items-center">
            {/* Primary Track Loop */}
            <div className="flex items-center space-x-8 sm:space-x-12 pr-8 sm:pr-12">
              {stripOneItems.map((text, idx) => (
                <div key={`s1-a-${idx}`} className="flex items-center space-x-6 sm:space-x-8 whitespace-nowrap">
                  <span className="text-lg sm:text-xl md:text-2xl font-black uppercase tracking-wider drop-shadow-sm">
                    {text}
                  </span>
                  <SparkleBurst className="w-5 h-5 sm:w-6 sm:h-6 text-white drop-shadow" />
                </div>
              ))}
            </div>

            {/* Seamless Duplicate Track Loop */}
            <div className="flex items-center space-x-8 sm:space-x-12 pr-8 sm:pr-12" aria-hidden="true">
              {stripOneItems.map((text, idx) => (
                <div key={`s1-b-${idx}`} className="flex items-center space-x-6 sm:space-x-8 whitespace-nowrap">
                  <span className="text-lg sm:text-xl md:text-2xl font-black uppercase tracking-wider drop-shadow-sm">
                    {text}
                  </span>
                  <SparkleBurst className="w-5 h-5 sm:w-6 sm:h-6 text-white drop-shadow" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* =========================================================================
            STRIP 2: Rich Black Ribbon (Right to Left Opposite Animation)
            Skewed at +2.4deg, overlapping Strip 1 like crossing ribbons
           ========================================================================= */}
        <div
          className="marquee-container relative z-10 w-[125%] -ml-[12.5%] -mt-6 sm:-mt-7 py-4 sm:py-5 shadow-[0_16px_36px_rgba(0,0,0,0.4)] bg-[#0A0A0A] text-white border-y border-neutral-800 transform rotate-[2.2deg] hover:z-30 transition-transform duration-300"
        >
          {/* Subtle neon emerald ambient glow in dark strip */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#1FA82C]/10 to-transparent pointer-events-none" />

          {/* Continuous Infinite Track (Right to Left) */}
          <div className="animate-marquee-rtl flex items-center">
            {/* Primary Track Loop */}
            <div className="flex items-center space-x-8 sm:space-x-12 pr-8 sm:pr-12">
              {stripTwoItems.map((text, idx) => (
                <div key={`s2-a-${idx}`} className="flex items-center space-x-6 sm:space-x-8 whitespace-nowrap">
                  <SparkleBurst className="w-5 h-5 sm:w-6 sm:h-6 text-[#35D13F]" />
                  <span className="text-lg sm:text-xl md:text-2xl font-black uppercase tracking-wider text-neutral-100">
                    {text}
                  </span>
                </div>
              ))}
            </div>

            {/* Seamless Duplicate Track Loop */}
            <div className="flex items-center space-x-8 sm:space-x-12 pr-8 sm:pr-12" aria-hidden="true">
              {stripTwoItems.map((text, idx) => (
                <div key={`s2-b-${idx}`} className="flex items-center space-x-6 sm:space-x-8 whitespace-nowrap">
                  <SparkleBurst className="w-5 h-5 sm:w-6 sm:h-6 text-[#35D13F]" />
                  <span className="text-lg sm:text-xl md:text-2xl font-black uppercase tracking-wider text-neutral-100">
                    {text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
