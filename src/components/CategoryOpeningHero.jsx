import React, { useState, useEffect, useRef } from 'react';
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

  // Wheel & touch listener: Frame stays 100% stationary, ONLY text and image animate
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const handleWheel = (e) => {
      const isAtTop = window.scrollY <= 10;
      
      // If we are at the top of the page:
      if (isAtTop) {
        // If scrolling down and not yet fully expanded, capture and expand
        if (e.deltaY > 0 && targetProgressRef.current < 0.98) {
          e.preventDefault();
          const delta = e.deltaY * 0.0012;
          targetProgressRef.current = Math.min(1, targetProgressRef.current + delta);
        } 
        // If scrolling down and ALREADY fully expanded on a page with content below, allow natural document scroll
        else if (e.deltaY > 0 && targetProgressRef.current >= 0.98 && hasContentBelow) {
          // Allow natural scroll to menu
          return;
        }
        // If scrolling up at the very top of document, shrink back towards 0
        else if (e.deltaY < 0 && targetProgressRef.current > 0) {
          e.preventDefault();
          const delta = e.deltaY * 0.0012;
          targetProgressRef.current = Math.max(0, targetProgressRef.current + delta);
        }
      }
    };

    const handleTouchStart = (e) => {
      if (e.touches.length > 0) {
        touchStartYRef.current = e.touches[0].clientY;
      }
    };

    const handleTouchMove = (e) => {
      const isAtTop = window.scrollY <= 10;
      if (e.touches.length > 0 && isAtTop) {
        const touchY = e.touches[0].clientY;
        const delta = (touchStartYRef.current - touchY) * 0.003;
        touchStartYRef.current = touchY;

        if (delta > 0 && targetProgressRef.current < 0.98) {
          e.preventDefault();
          targetProgressRef.current = Math.min(1, targetProgressRef.current + delta);
        } else if (delta < 0 && targetProgressRef.current > 0) {
          e.preventDefault();
          targetProgressRef.current = Math.max(0, targetProgressRef.current + delta);
        }
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
  }, [hasContentBelow]);

  // Smooth interpolation calculations
  const p = Math.min(1, Math.max(0, progress));
  
  // Power easing for cinematic acceleration matching Animated Opening.mp4
  const eased = p < 0.5 
    ? 2 * p * p 
    : 1 - Math.pow(-2 * p + 2, 2) / 2;

  // Text translations (0px at start, parting smoothly up & down on scroll)
  const textTranslateY = eased * 360;
  const textOpacity = Math.max(0, 1 - p * 1.25);

  // Flank text translations
  const flankTranslateX = eased * 140;
  const flankOpacity = Math.max(0, 1 - p * 2.0);

  // Image dimensions: starts small in center gap, expands to 100vw x 100vh
  const initialWidth = 220;
  const initialHeight = 120;
  const imageWidthPercent = Math.min(100, 15 + eased * 85);
  const imageHeightPercent = Math.min(100, eased * 100);

  // Border radius: 4px down to 0px
  const borderRadius = Math.max(0, (1 - eased) * 4);

  return (
    <div 
      className="activities-opening-hero-frame" 
      ref={containerRef} 
      id={id}
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
        {hasContentBelow && p >= 0.75 && (
          <button 
            className="opening-explore-menu-btn"
            onClick={onExploreBelow}
          >
            <span>VIEW FOOD MENU CATALOG</span>
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
  );
}

export default CategoryOpeningHero;
