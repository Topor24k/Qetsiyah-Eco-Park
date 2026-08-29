import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ArrowDown } from 'lucide-react';

export function CategoryOpeningHero({
  titleTop = 'DISCOVER',
  titleBottom = 'ALL OUR ACTIVITIES',
  flankLeft = 'ECO-PARK EXPERIENCES',
  flankRight = 'SULTAN KUDARAT',
  image = '/Background Pictures/Background Hero Section II.jpg',
  id = 'opening-hero',
  hasContentBelow = false,
  onExploreBelow = null
}) {
  const [progress, setProgress] = useState(0);
  const containerRef = useRef(null);

  const handleScroll = useCallback(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const rect = container.getBoundingClientRect();
    const scrollDistance = container.offsetHeight - window.innerHeight;

    if (scrollDistance > 0) {
      const currentScroll = -rect.top;
      const rawProgress = currentScroll / scrollDistance;
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

  // Power easing for cinematic acceleration matching Animated Opening.mp4
  const p = progress;
  const eased = p < 0.5 
    ? 2 * p * p 
    : 1 - Math.pow(-2 * p + 2, 2) / 2;

  // Text translations (0px at start, parting smoothly up & down on scroll)
  const textTranslateY = eased * 380;
  const textOpacity = Math.max(0, 1 - p * 1.35);

  // Flank text translations
  const flankTranslateX = eased * 160;
  const flankOpacity = Math.max(0, 1 - p * 2.2);

  // Image dimensions: starts small in center gap, expands to 100vw x 100vh
  const imageWidthPercent = Math.min(100, 15 + eased * 85);
  const imageHeightPercent = Math.min(100, eased * 100);

  // Border radius: 4px down to 0px
  const borderRadius = Math.max(0, (1 - eased) * 4);

  return (
    <div 
      className={`activities-opening-hero-frame ${hasContentBelow ? 'has-content-below' : 'standalone-hero'}`}
      ref={containerRef} 
      id={id}
    >
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
          <span>{flankLeft}</span>
        </div>

        {/* Right Flank Subtitle */}
        <div 
          className="opening-flank-text right"
          style={{
            transform: `translate3d(${flankTranslateX}px, -50%, 0)`,
            opacity: flankOpacity
          }}
        >
          <span>{flankRight}</span>
        </div>

        {/* Center Expanding Image (Behind/Between the text) */}
        <div 
          className="expanding-image-container"
          style={{
            width: `${imageWidthPercent}vw`,
            height: `${imageHeightPercent}vh`,
            borderRadius: `${borderRadius}px`,
            opacity: p > 0.005 ? 1 : 0
          }}
        >
          <img 
            src={image} 
            alt={titleBottom} 
            className="expanding-image-content"
          />
          
          {/* Subtle atmospheric vignette when fully expanded */}
          <div 
            className="expanding-image-scrim"
            style={{
              opacity: Math.min(0.35, Math.max(0, (p - 0.7) / 0.3))
            }}
          />

          {/* Action Button to scroll down to Menu / Content if present */}
          {hasContentBelow && p >= 0.85 && (
            <button 
              className="opening-explore-menu-btn"
              onClick={onExploreBelow}
            >
              <span>EXPLORE FULL MENU</span>
              <ArrowDown size={15} />
            </button>
          )}
        </div>

        {/* Main Center Display Typography */}
        <div className="opening-hero-text-block">
          <h2 
            className="opening-title-top"
            style={{
              transform: `translate3d(0, ${-textTranslateY}px, 0)`,
              opacity: textOpacity
            }}
          >
            {titleTop}
          </h2>

          <h2 
            className="opening-title-bottom"
            style={{
              transform: `translate3d(0, ${textTranslateY}px, 0)`,
              opacity: textOpacity
            }}
          >
            {titleBottom}
          </h2>
        </div>

        {/* Subtle Scroll Hint Indicator at 0% */}
        {p < 0.05 && (
          <div className="opening-scroll-hint">
            <span>SCROLL DOWN TO REVEAL</span>
          </div>
        )}

      </div>
    </div>
  );
}

export default CategoryOpeningHero;
