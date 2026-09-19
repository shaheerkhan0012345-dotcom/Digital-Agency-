import React from 'react';

interface HKLogoProps {
  className?: string;
  size?: number | string;
  withBackground?: boolean;
  showGlow?: boolean;
  variant?: 'solid' | 'glow' | 'minimal';
}

/**
 * Official HK Digital Agency Logo
 * 
 * Recreated with exact 1:1 fidelity from the official brand asset (logo hk.png):
 * - Unified neon lime green color (#2FE236)
 * - Fused "H" and "K" geometric cyber monogram
 * - Outer circular arc brackets framing top-right and bottom-left
 * - Horizontal data circuit traces with terminal node dots on the left
 * - Horizontal data circuit traces with terminal node dots between the K arms on the right
 */
export const HKLogo: React.FC<HKLogoProps> = ({
  className = 'w-10 h-10',
  size,
  withBackground = false,
  showGlow = false,
}) => {
  const style = size ? { width: size, height: size } : undefined;

  return (
    <svg
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
      aria-label="HK Digital Agency Logo"
      role="img"
    >
      <defs>
        {showGlow && (
          <filter id="hkLogoGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        )}
      </defs>

      {withBackground && (
        <rect width="200" height="200" rx="28" fill="#000000" />
      )}

      <g
        fill="#2FE236"
        stroke="#2FE236"
        filter={showGlow ? 'url(#hkLogoGlow)' : undefined}
      >
        {/* =========================================================
            1. OUTER CIRCULAR ARCS (CYBER RING BRACKETS)
            ========================================================= */}
        {/* Top Arc: curves from above H, sweeps over the top to mid-right above circuit traces */}
        <path
          d="M 82 22 A 78 78 0 0 1 184 84"
          fill="none"
          strokeWidth="14"
          strokeLinecap="butt"
        />

        {/* Bottom Arc: curves from mid-right below circuit traces, sweeps around bottom to lower-left */}
        <path
          d="M 184 116 A 78 78 0 0 1 42 134"
          fill="none"
          strokeWidth="14"
          strokeLinecap="butt"
        />

        {/* =========================================================
            2. CENTRAL FUSED "HK" MONOGRAM
            ========================================================= */}
        {/* Left vertical bar of H */}
        <rect x="64" y="44" width="18" height="112" rx="1.5" stroke="none" />

        {/* Center horizontal crossbar of H */}
        <rect x="82" y="91" width="20" height="18" stroke="none" />

        {/* Shared center vertical bar (H right leg / K spine) */}
        <rect x="102" y="44" width="18" height="112" rx="1.5" stroke="none" />

        {/* K upper diagonal arm */}
        <polygon points="116,92 144,44 164,44 128,102" stroke="none" />

        {/* K lower diagonal arm */}
        <polygon points="128,98 164,156 144,156 116,108" stroke="none" />

        {/* =========================================================
            3. LEFT CIRCUIT BOARD TRACES & NODES
            ========================================================= */}
        <g fill="none" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
          {/* Trace 1 (Top) */}
          <path d="M 64 68 L 48 68 L 40 58 L 22 58" />
          {/* Trace 2 (Upper mid) */}
          <path d="M 64 82 L 44 82 L 36 74 L 16 74" />
          {/* Trace 3 (Center horizontal) */}
          <path d="M 64 100 L 26 100" />
          {/* Trace 4 (Lower mid) */}
          <path d="M 64 118 L 44 118 L 36 126 L 16 126" />
          {/* Trace 5 (Bottom) */}
          <path d="M 64 132 L 48 132 L 40 142 L 22 142" />
        </g>

        {/* Terminal & Intermediate Nodes (Left) */}
        <g stroke="none">
          <circle cx="22" cy="58" r="4.2" />
          <circle cx="48" cy="68" r="2.2" />

          <circle cx="16" cy="74" r="4.2" />
          <circle cx="44" cy="82" r="2.2" />

          <circle cx="26" cy="100" r="4.6" />

          <circle cx="16" cy="126" r="4.2" />
          <circle cx="44" cy="118" r="2.2" />

          <circle cx="22" cy="142" r="4.2" />
          <circle cx="48" cy="132" r="2.2" />
        </g>

        {/* =========================================================
            4. RIGHT CIRCUIT BOARD TRACES & NODES (INSIDE K ARMS)
            ========================================================= */}
        <g fill="none" strokeWidth="2.8" strokeLinecap="round">
          <line x1="126" y1="87" x2="174" y2="87" />
          <line x1="122" y1="96" x2="186" y2="96" />
          <line x1="122" y1="104" x2="186" y2="104" />
          <line x1="126" y1="113" x2="174" y2="113" />
        </g>

        {/* Terminal & Intermediate Nodes (Right) */}
        <g stroke="none">
          <circle cx="174" cy="87" r="4.2" />
          <circle cx="148" cy="87" r="2.2" />

          <circle cx="186" cy="96" r="4.5" />
          <circle cx="156" cy="96" r="2.2" />

          <circle cx="186" cy="104" r="4.5" />
          <circle cx="156" cy="104" r="2.2" />

          <circle cx="174" cy="113" r="4.2" />
          <circle cx="148" cy="113" r="2.2" />
        </g>
      </g>
    </svg>
  );
};
