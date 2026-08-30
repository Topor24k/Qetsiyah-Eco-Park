import React, { useState, useEffect, useRef } from 'react';
import { ArrowDown } from 'lucide-react';

export function CategoryOpeningHero({
  titleTop = 'DISCOVER',
  titleBottom = 'ALL OUR ACTIVITIES',
  flankLeft = 'ECO-PARK EXPERIENCES',
  flankRight = 'SULTAN KUDARAT',
  image = '/Background Pictures/Background Hero Section II.jpg',
  video = null,
  id = 'opening-hero',
  hasContentBelow = false,
  onExploreBelow = null
}) {
  const [progress, setProgress] = useState(0);
  const [windowScrollY, setWindowScrollY] = useState(0);
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const audioCtxRef = useRef(null);
  const targetProgressRef = useRef(0);
  const currentProgressRef = useRef(0);
  const animFrameRef = useRef(null);
  const touchStartYRef = useRef(0);

  const isVideo = Boolean(video || (typeof image === 'string' && image.toLowerCase().endsWith('.mp4')));
  const mediaSrc = video || image;

  // Global AudioContext and element sound activator
  const activateAudioEngine = () => {
    try {
      if (!audioCtxRef.current) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (AudioCtx) {
          audioCtxRef.current = new AudioCtx();
        }
      }
      if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume().catch(() => {});
      }
    } catch (e) {}

    if (isVideo && videoRef.current) {
      videoRef.current.muted = false;
      if (currentProgressRef.current >= 0.85 && (window.scrollY || 0) <= 40) {
        videoRef.current.play().catch(() => {});
      }
    }
  };

  // Attach multiple global gesture listeners to ensure browser unlocks audio automatically on first scroll/interaction
  useEffect(() => {
    const events = ['wheel', 'keydown', 'touchstart', 'touchend', 'pointerdown', 'pointermove', 'scroll', 'click'];
    events.forEach((evt) => {
      window.addEventListener(evt, activateAudioEngine, { passive: true });
      document.addEventListener(evt, activateAudioEngine, { passive: true });
    });

    return () => {
      events.forEach((evt) => {
        window.removeEventListener(evt, activateAudioEngine);
        document.removeEventListener(evt, activateAudioEngine);
      });
    };
  }, [isVideo]);

  // Track window scroll & auto-shrink back to initial size on scroll down
  useEffect(() => {
    const handleWindowScroll = () => {
      const currentScrollY = window.scrollY || window.pageYOffset || 0;
      setWindowScrollY(currentScrollY);

      // If user starts scrolling down while video is expanded, automatically shrink it back down
      if (currentScrollY > 15 && targetProgressRef.current > 0) {
        targetProgressRef.current = 0;
      }
    };

    const handleWheel = (e) => {
      // If user wheels down while expanded, immediately start shrinking back down
      if (e.deltaY > 8 && targetProgressRef.current > 0) {
        targetProgressRef.current = 0;
      }
    };

    const handleTouchStart = (e) => {
      if (e.touches && e.touches.length > 0) {
        touchStartYRef.current = e.touches[0].clientY;
      }
    };

    const handleTouchMove = (e) => {
      if (!e.touches || e.touches.length === 0) return;
      const currentY = e.touches[0].clientY;
      const diff = touchStartYRef.current - currentY;
      if (diff > 10 && targetProgressRef.current > 0) {
        targetProgressRef.current = 0;
      }
      touchStartYRef.current = currentY;
    };

    window.addEventListener('scroll', handleWindowScroll, { passive: true });
    window.addEventListener('wheel', handleWheel, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    handleWindowScroll();

    return () => {
      window.removeEventListener('scroll', handleWindowScroll);
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  // Playback & Sound Control Engine:
  // - Plays with full audio automatically when expanded (progress >= 0.85) AND in hero frame (windowScrollY <= 40).
  // - Turns OFF sound & pauses when scrolled up (progress < 0.85) OR scrolled down to menu (windowScrollY > 40).
  // - Resets to beginning (currentTime = 0) when shrunk back to original size.
  useEffect(() => {
    if (!isVideo || !videoRef.current) return;

    const isHeroActive = progress >= 0.85 && windowScrollY <= 40;

    if (isHeroActive) {
      videoRef.current.muted = false;
      videoRef.current.play().catch(() => {
        activateAudioEngine();
      });
    } else {
      videoRef.current.pause();
      videoRef.current.muted = true;
      if (progress < 0.85) {
        try {
          videoRef.current.currentTime = 0;
        } catch (e) {}
      }
    }
  }, [progress, windowScrollY, isVideo]);

  // Smooth lerp animation loop for 60fps/120fps buttery easing (slower, cinematic pace)
  useEffect(() => {
    let isRunning = true;

    const animate = () => {
      if (!isRunning) return;

      const diff = targetProgressRef.current - currentProgressRef.current;
      if (Math.abs(diff) > 0.0005) {
        currentProgressRef.current += diff * 0.055; // slower, cinematic smooth easing
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

  // Synchronize header visibility with opening hero expansion (header disappears immediately as video starts showing)
  useEffect(() => {
    if (progress > 0.005 || targetProgressRef.current > 0.01) {
      window.dispatchEvent(new CustomEvent('nav-visible', { detail: false }));
    } else if (progress <= 0.005 && targetProgressRef.current === 0 && (window.scrollY || 0) <= 10) {
      window.dispatchEvent(new CustomEvent('nav-visible', { detail: true }));
    }
  }, [progress]);

  // Click to expand / reveal full frame video or image (ONLY triggers on click, NOT on scroll)
  const handleFrameClick = (e) => {
    // If clicking on the explore menu button or any interactive button, ignore frame click
    if (e.target.closest('.opening-explore-menu-btn') || e.target.closest('button.opening-explore-menu-btn')) {
      return;
    }

    activateAudioEngine();

    if (targetProgressRef.current < 0.5) {
      targetProgressRef.current = 1;
      window.dispatchEvent(new CustomEvent('nav-visible', { detail: false }));
    }
  };

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
      className={`activities-opening-hero-frame ${p < 0.5 ? 'is-collapsed-clickable' : 'is-expanded'}`} 
      ref={containerRef} 
      id={id}
      onClick={handleFrameClick}
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

      {/* Center Expanding Media (Behind/Between the text) */}
      <div 
        className="expanding-image-container"
        style={{
          width: `${imageWidthPercent}vw`,
          height: `${imageHeightPercent}vh`,
          borderRadius: `${borderRadius}px`,
          opacity: p > 0.005 ? 1 : 0
        }}
      >
        {isVideo ? (
          <video 
            ref={videoRef}
            src={mediaSrc} 
            loop 
            playsInline 
            preload="auto"
            className="expanding-image-content expanding-video-content"
          />
        ) : (
          <img 
            src={image} 
            alt={titleBottom} 
            className="expanding-image-content"
          />
        )}
        
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
            onClick={(e) => {
              e.stopPropagation();
              targetProgressRef.current = 0;
              if (onExploreBelow) {
                onExploreBelow();
              } else {
                const el = document.querySelector('#food-catalog') || document.querySelector('.food-catalog-sheet-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            <span>SCROLL TO VIEW FULL MENU</span>
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

      {/* Click / Scroll Hint Indicator at 0% */}
      {p < 0.05 && (
        <div className="opening-scroll-hint">
          <span>CLICK TO REVEAL</span>
        </div>
      )}
    </div>
  );
}

export default CategoryOpeningHero;
