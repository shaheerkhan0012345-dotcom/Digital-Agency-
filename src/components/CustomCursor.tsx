import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

interface Particle {
  x: number;
  y: number;
  size: number;
  alpha: number;
  vx: number;
  vy: number;
}

export const CustomCursor: React.FC = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [cursorText, setCursorText] = useState<string>('');
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const [isTextMode, setIsTextMode] = useState<boolean>(false);

  useEffect(() => {
    // Disable on touch devices
    const isTouchDevice =
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia('(pointer: coarse)').matches;

    if (isTouchDevice) {
      return;
    }

    // Add class to body to hide standard OS cursor on desktop
    document.documentElement.classList.add('custom-cursor-active');

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    // Fast GSAP quick setters for 60fps performance
    const setDotX = gsap.quickTo(dot, 'x', { duration: 0.08, ease: 'power2.out' });
    const setDotY = gsap.quickTo(dot, 'y', { duration: 0.08, ease: 'power2.out' });

    const setRingX = gsap.quickTo(ring, 'x', { duration: 0.35, ease: 'power3.out' });
    const setRingY = gsap.quickTo(ring, 'y', { duration: 0.35, ease: 'power3.out' });

    let mouseX = -100;
    let mouseY = -100;
    let lastX = -100;
    let lastY = -100;

    // Particle Trail System
    const particles: Particle[] = [];
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');

    const resizeCanvas = () => {
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    let animationFrameId: number;

    const renderParticles = () => {
      if (ctx && canvas) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let i = particles.length - 1; i >= 0; i--) {
          const p = particles[i];
          p.x += p.vx;
          p.y += p.vy;
          p.alpha -= 0.025;

          if (p.alpha <= 0) {
            particles.splice(i, 1);
            continue;
          }

          ctx.save();
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(53, 209, 63, ${p.alpha * 0.7})`;
          ctx.shadowColor = '#35D13F';
          ctx.shadowBlur = 8;
          ctx.fill();
          ctx.restore();
        }
      }

      animationFrameId = requestAnimationFrame(renderParticles);
    };

    animationFrameId = requestAnimationFrame(renderParticles);

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      setDotX(mouseX);
      setDotY(mouseY);
      setRingX(mouseX);
      setRingY(mouseY);

      if (!isVisible) {
        setIsVisible(true);
      }

      // Add trail particles if mouse is moving fast enough
      const dist = Math.hypot(mouseX - lastX, mouseY - lastY);
      if (dist > 8 && particles.length < 35) {
        particles.push({
          x: mouseX + (Math.random() - 0.5) * 6,
          y: mouseY + (Math.random() - 0.5) * 6,
          size: Math.random() * 2.5 + 1.2,
          alpha: 0.65,
          vx: (Math.random() - 0.5) * 0.8,
          vy: (Math.random() - 0.5) * 0.8,
        });
        lastX = mouseX;
        lastY = mouseY;
      }

      // Detect hover target
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const isInteractive = Boolean(
        target.closest(
          'a, button, [role="button"], input, textarea, select, [data-cursor], .cursor-pointer'
        )
      );

      const isInput = Boolean(
        target.closest('input[type="text"], input[type="email"], textarea, [contenteditable="true"]')
      );

      const customLabelEl = target.closest('[data-cursor-text]') as HTMLElement | null;
      const customLabel = customLabelEl ? customLabelEl.getAttribute('data-cursor-text') : '';

      setIsHovered(isInteractive && !isInput);
      setIsTextMode(isInput);
      setCursorText(customLabel || '');
    };

    const onMouseDown = () => setIsClicked(true);
    const onMouseUp = () => setIsClicked(false);

    const onMouseLeave = () => {
      setIsVisible(false);
    };

    const onMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    return () => {
      document.documentElement.classList.remove('custom-cursor-active');
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isVisible]);

  return (
    <>
      {/* Background Particle Trail Canvas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-[99998] transition-opacity duration-300"
        style={{ opacity: isVisible ? 1 : 0 }}
      />

      {/* Outer Follower Ring / Neon Aura */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 pointer-events-none z-[99999] rounded-full flex items-center justify-center -translate-x-1/2 -translate-y-1/2 will-change-transform transition-all duration-300 ease-out ${
          !isVisible ? 'opacity-0 scale-50' : 'opacity-100'
        } ${
          isTextMode
            ? 'w-1 h-7 rounded-none bg-[#1FA82C] shadow-[0_0_12px_#35D13F]'
            : isClicked
            ? 'w-7 h-7 bg-[#1FA82C]/30 border-2 border-[#35D13F] shadow-[0_0_20px_#1FA82C]'
            : isHovered
            ? 'w-16 h-16 bg-[#1FA82C]/15 border border-[#35D13F] shadow-[0_0_28px_rgba(53,209,63,0.45)] backdrop-blur-[2px]'
            : 'w-10 h-10 border border-[#1FA82C]/80 shadow-[0_0_16px_rgba(31,168,44,0.35)]'
        }`}
      >
        {/* Four Orbit Tech Markers on Ring (visible when idle/hovered) */}
        {!isTextMode && (
          <>
            <span
              className={`absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#35D13F] transition-opacity duration-200 ${
                isHovered ? 'scale-125 opacity-100' : 'opacity-75'
              }`}
            />
            <span
              className={`absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#35D13F] transition-opacity duration-200 ${
                isHovered ? 'scale-125 opacity-100' : 'opacity-75'
              }`}
            />
          </>
        )}

        {/* Dynamic Context Badge Label (e.g. 'VIEW', 'CHAT') */}
        {cursorText && isHovered && (
          <span
            ref={labelRef}
            className="text-[9px] font-bold font-mono tracking-widest text-[#0A0A0A] bg-[#35D13F] px-1.5 py-0.5 rounded shadow-sm uppercase animate-pulse select-none"
          >
            {cursorText}
          </span>
        )}
      </div>

      {/* Inner Precision Center Dot */}
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 pointer-events-none z-[100000] -translate-x-1/2 -translate-y-1/2 rounded-full will-change-transform transition-all duration-150 ease-out ${
          !isVisible || isTextMode ? 'opacity-0' : 'opacity-100'
        } ${
          isHovered
            ? 'w-3 h-3 bg-white shadow-[0_0_12px_#35D13F,0_0_4px_#ffffff]'
            : isClicked
            ? 'w-1.5 h-1.5 bg-[#35D13F]'
            : 'w-2 h-2 bg-[#35D13F] shadow-[0_0_10px_#35D13F,0_0_2px_#ffffff]'
        }`}
      />
    </>
  );
};
