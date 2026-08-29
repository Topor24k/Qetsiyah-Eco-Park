import React, { useState, useEffect, useRef } from 'react';

export function ActivitiesFrame({ onNavigate }) {
  const [progress, setProgress] = useState(0);
  const containerRef = useRef(null);
  const targetProgressRef = useRef(0);
  const currentProgressRef = useRef(0);
  const animFrameRef = useRef(null);
  const touchStartYRef = useRef(0);

  // Smooth lerp animation loop
  useEffect(() => {
    let isRunning = true;

    const animate = () => {
      if (!isRunning) return;

      const diff = targetProgressRef.current - currentProgressRef.current;
      if (Math.abs(diff) > 0.0005) {
        currentProgressRef.current += diff * 0.10; // smooth easing
        setProgress(currentProgressRef.current);
      } else if (currentProgressRef.current !== targetProgressRef.current) {
        currentProgressRef.current = targetProgressRef.current;
        setProgress(targetProgressRef.current);
      }

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);

    return () => {
      isRunning = false;
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  // Wheel listener: Frame stays 100% stationary, ONLY text and image animate
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const handleWheel = (e) => {
      // Prevent browser document scrolling so the frame NEVER shifts
      e.preventDefault();
      
      const delta = e.deltaY * 0.0012; // smooth scroll sensitivity
      targetProgressRef.current = Math.min(1, Math.max(0, targetProgressRef.current + delta));
    };

    const handleTouchStart = (e) => {
      if (e.touches.length > 0) {
        touchStartYRef.current = e.touches[0].clientY;
      }
    };

    const handleTouchMove = (e) => {
      if (e.touches.length > 0) {
        e.preventDefault();
        const touchY = e.touches[0].clientY;
        const delta = (touchStartYRef.current - touchY) * 0.003;
        touchStartYRef.current = touchY;
        targetProgressRef.current = Math.min(1, Math.max(0, targetProgressRef.current + delta));
      }
    };

    el.addEventListener('wheel', handleWheel, { passive: false });
    el.addEventListener('touchstart', handleTouchStart, { passive: true });
    el.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      el.removeEventListener('wheel', handleWheel);
      el.removeEventListener('touchstart', handleTouchStart);
      el.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  // Smooth interpolation calculations
  const p = Math.min(1, Math.max(0, progress));
  
  // Power easing for cinematic acceleration matching Animated Opening.mp4
  const eased = p < 0.5 
    ? 2 * p * p 
    : 1 - Math.pow(-2 * p + 2, 2) / 2;

  // Initial slit dimensions at 0%: 220px width, 120px height
  // Expanding to 100vw and 100vh at 100%
  const initialWidth = 220;
  const initialHeight = 120;

  // Text translations
  const textTranslateY = eased * 420;
  const textOpacity = Math.max(0, 1 - p * 1.25);

  // Flank text translations
  const flankTranslateX = eased * 160;
  const flankOpacity = Math.max(0, 1 - p * 2.0);

  // Border radius: 4px down to 0px
  const borderRadius = Math.max(0, (1 - eased) * 4);

  return (
    <div 
      className="activities-opening-hero-frame" 
      ref={containerRef} 
      id="activities"
    >
      {/* Subtle Marbled Warm Background with Fine Veins */}
      <div className="opening-parchment-backdrop"></div>

      {/* Left Flank Subtitle */}
      <div 
        className="opening-flank-text left"
        style={{
          transform: `translate3d(${-flankTranslateX}px, -50%, 0)`,
          opacity: flankOpacity
        }}
      >
        <span>ECO-PARK EXPERIENCES</span>
      </div>

      {/* Right Flank Subtitle */}
      <div 
        className="opening-flank-text right"
        style={{
          transform: `translate3d(${flankTranslateX}px, -50%, 0)`,
          opacity: flankOpacity
        }}
      >
        <span>SULTAN KUDARAT</span>
      </div>

      {/* Center Display Layout */}
      <div className="opening-center-lockup">
        
        {/* Top Line: DISCOVER (Pushes upwards on scroll) */}
        <div 
          className="opening-text-line line-top"
          style={{
            transform: `translate3d(0, ${-textTranslateY}px, 0)`,
            opacity: textOpacity
          }}
        >
          <h2>DISCOVER</h2>
        </div>

        {/* Center Expanding Image (Emerges between lines & grows to fullscreen) */}
        <div 
          className="expanding-image-container"
          style={{
            width: `calc(${initialWidth}px + (100vw - ${initialWidth}px) * ${eased})`,
            height: `calc(${initialHeight}px + (100vh - ${initialHeight}px) * ${eased})`,
            borderRadius: `${borderRadius}px`,
            opacity: p > 0.005 ? 1 : 0
          }}
        >
          <img 
            src="/Background Pictures/Background Hero Section II.jpg" 
            alt="Qetsiyah Eco Park Landscape" 
            className="expanding-image-content"
          />
          
          {/* Subtle atmospheric vignette when fully expanded */}
          <div 
            className="expanding-image-scrim"
            style={{
              opacity: Math.min(0.35, Math.max(0, (p - 0.7) / 0.3))
            }}
          />
        </div>

        {/* Bottom Line: ALL OUR ACTIVITIES (Pushes downwards on scroll) */}
        <div 
          className="opening-text-line line-bottom"
          style={{
            transform: `translate3d(0, ${textTranslateY}px, 0)`,
            opacity: textOpacity
          }}
        >
          <h2>ALL OUR ACTIVITIES</h2>
        </div>

      </div>

      {/* Subtle Scroll Hint Indicator at 0% */}
      {p < 0.05 && (
        <div className="opening-scroll-hint">
          <span>SCROLL DOWN TO REVEAL</span>
        </div>
      )}
    </div>
  );
}

export default ActivitiesFrame;
