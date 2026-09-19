import React, { useEffect, useState } from 'react';

interface PageLoaderProps {
  isLoading: boolean;
  onFinish?: () => void;
  allowManualTrigger?: boolean;
}

/**
 * Pure Bubble Gum Loader adapted with HK Digital Agency Brand Theme
 * Based on ilithya's CodePen concept.
 *
 * Theme Colors:
 * - Bubble & Base Text: HK Vivid Emerald (#1FA82C / #35D13F)
 * - Highlights: Crisp White (#FFFFFF)
 * - Canvas: Deep Cyber Black (#0A0A0A)
 */
export const PageLoader: React.FC<PageLoaderProps> = ({
  isLoading,
  onFinish,
}) => {
  const [visible, setVisible] = useState<boolean>(isLoading);
  const [fadeOut, setFadeOut] = useState<boolean>(false);

  useEffect(() => {
    if (isLoading) {
      setVisible(true);
      setFadeOut(false);

      // Allow 2 full inflation cycles (~2.2s) for a satisfying experience
      const timer = setTimeout(() => {
        setFadeOut(true);
        const exitTimer = setTimeout(() => {
          setVisible(false);
          if (onFinish) onFinish();
        }, 500); // match 500ms fade transition

        return () => clearTimeout(exitTimer);
      }, 2200);

      return () => clearTimeout(timer);
    } else {
      setFadeOut(true);
      const exitTimer = setTimeout(() => {
        setVisible(false);
      }, 400);
      return () => clearTimeout(exitTimer);
    }
  }, [isLoading, onFinish]);

  if (!visible) return null;

  return (
    <div
      id="page-loader-screen"
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0A0A0A] text-white transition-opacity duration-500 ease-out select-none overflow-hidden ${
        fadeOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      role="progressbar"
      aria-label="Loading HK Digital Agency"
    >
      {/* Ambient background glow accents */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] rounded-full bg-[#1FA82C]/15 blur-[120px] pointer-events-none" />
      <div className="absolute top-1/4 left-1/3 w-[260px] h-[260px] rounded-full bg-[#35D13F]/10 blur-[90px] pointer-events-none" />

      {/* The Requested Pure CSS Bubble Gum Loader */}
      <div className="relative z-10 flex flex-col items-center">
        <div className="hk-bubble-loader">
          <div className="hk-bubble">
            <div className="hk-bubble__shine hk-bubble__shine--lg" />
            <div className="hk-bubble__shine hk-bubble__shine--sm" />
          </div>
          <p className="hk-bubble-text">
            Lo<span className="hk-bubble-text__highlight">a</span>din
            <span className="hk-bubble-text__highlight">g</span>
          </p>
        </div>

        {/* Agency Brand Tagline */}
        <div className="mt-8 flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-[#1FA82C] shadow-[0_0_8px_#35D13F] animate-pulse" />
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-neutral-300">
            HK Digital Agency
          </span>
        </div>
      </div>

      {/* Fast Skip Option */}
      <button
        type="button"
        onClick={() => {
          setFadeOut(true);
          setTimeout(() => {
            setVisible(false);
            if (onFinish) onFinish();
          }, 300);
        }}
        className="absolute bottom-8 z-20 text-xs font-medium text-neutral-500 hover:text-neutral-300 tracking-wider uppercase px-4 py-2 rounded-full hover:bg-white/5 transition-colors cursor-pointer"
      >
        Skip Intro
      </button>
    </div>
  );
};
