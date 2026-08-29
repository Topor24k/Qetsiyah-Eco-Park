import React, { useState, useEffect, useRef, useCallback } from 'react';

export function ActivitiesFrame({ onNavigate }) {
  const [progress, setProgress] = useState(0);
  const containerRef = useRef(null);

  const handleScroll = useCallback(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const rect = container.getBoundingClientRect();
    const totalScrollable = container.scrollHeight - window.innerHeight;

    if (totalScrollable > 0) {
      const currentScroll = -rect.top;
      const rawProgress = currentScroll / totalScrollable;
      const clamped = Math.min(1, Math.max(0, rawProgress));
      setProgress(clamped);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [handleScroll]);

  // Interpolation calculations for smooth animation
  // Eased progress for smooth expansion
  const eased = progress < 0.5 
    ? 2 * progress * progress 
    : 1 - Math.pow(-2 * progress + 2, 2) / 2;

  // Initial slit dimensions at 0%: 160px width, 0px height
  // Max dimensions at 100%: 100vw width, 100vh height
  const minWidth = 160;
  const minHeight = 0;

  const currentWidthPercent = minWidth + (100 - (minWidth / (typeof window !== 'undefined' ? window.innerWidth : 1440) * 100)) * eased;
  const currentHeightPercent = eased * 100;

  // Text translations
  const textTranslateY = eased * 380;
  const textOpacity = Math.max(0, 1 - progress * 1.3);

  // Flank text translations
  const flankTranslateX = eased * 140;
  const flankOpacity = Math.max(0, 1 - progress * 2.2);

  // Border radius: 4px down to 0px
  const borderRadius = Math.max(0, (1 - eased) * 4);

  return (
    <div className="activities-scroll-opening-container" ref={containerRef} id="activities">
      {/* Sticky 100vh Viewport Stage */}
      <div className="sticky-opening-stage">
        
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
              width: `${Math.min(100, Math.max(minWidth / 14.4, currentWidthPercent))}%`,
              height: `${Math.min(100, currentHeightPercent)}%`,
              borderRadius: `${borderRadius}px`,
              opacity: progress > 0.01 ? 1 : 0
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
                opacity: Math.min(0.4, Math.max(0, (progress - 0.7) / 0.3))
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

      </div>
    </div>
  );
}

export default ActivitiesFrame;
