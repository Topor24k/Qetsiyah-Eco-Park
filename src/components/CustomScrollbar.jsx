import React, { useState, useEffect, useRef, useCallback } from 'react';

/**
 * 100% Native-feel Custom Scrollbar:
 * - ZERO black space / gutter (native scrollbar width is 0).
 * - ZERO website layout shift (fixed overlay).
 * - Appears ONLY when cursor moves near the right edge (<= 40px).
 * - Full native OS physics: Pointer-capture hardware drag, page-up/page-down track clicking, sub-pixel sync.
 */
export function CustomScrollbar() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [thumbHeight, setThumbHeight] = useState(60);
  const [isVisible, setIsVisible] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const isDraggingRef = useRef(false);
  const startPointerYRef = useRef(0);
  const startScrollYRef = useRef(0);
  const trackRef = useRef(null);

  // Calculate thumb size and position with exact viewport proportions
  const updateScroll = useCallback(() => {
    const docHeight = document.documentElement.scrollHeight;
    const winHeight = window.innerHeight;
    const maxScroll = docHeight - winHeight;

    if (maxScroll > 0) {
      const currentScroll = window.scrollY;
      const progress = Math.min(1, Math.max(0, currentScroll / maxScroll));
      setScrollProgress(progress);

      const calculatedThumbH = Math.max(
        32,
        Math.min(winHeight - 20, (winHeight / docHeight) * winHeight)
      );
      setThumbHeight(calculatedThumbH);
    }
  }, []);

  useEffect(() => {
    // Only update position on scroll (NEVER show on scroll down)
    const onScroll = () => {
      updateScroll();
    };

    const onMouseMove = (e) => {
      const distFromRight = window.innerWidth - e.clientX;
      // ONLY reveal when cursor is near the right edge (<= 40px)
      if (distFromRight <= 40) {
        setIsVisible(true);
      } else if (!isDraggingRef.current && !isHovered) {
        setIsVisible(false);
      }
    };

    const onMouseLeave = () => {
      if (!isDraggingRef.current) {
        setIsVisible(false);
      }
    };

    const onResize = () => {
      updateScroll();
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('resize', onResize);
    document.addEventListener('mouseleave', onMouseLeave);

    updateScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      document.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [isHovered, updateScroll]);

  // 1:1 Native OS Dragging using Pointer Events & Pointer Capture
  const handlePointerDownThumb = (e) => {
    e.preventDefault();
    e.stopPropagation();

    isDraggingRef.current = true;
    setIsDragging(true);
    setIsVisible(true);

    startPointerYRef.current = e.clientY;
    startScrollYRef.current = window.scrollY;

    try {
      e.target.setPointerCapture(e.pointerId);
    } catch {
      // fallback if capture not supported
    }

    const docHeight = document.documentElement.scrollHeight;
    const winHeight = window.innerHeight;
    const maxScroll = docHeight - winHeight;
    const trackH = trackRef.current ? trackRef.current.clientHeight : winHeight;
    const maxThumbTravel = trackH - thumbHeight;

    const onPointerMove = (moveEvt) => {
      if (!isDraggingRef.current) return;
      const deltaY = moveEvt.clientY - startPointerYRef.current;
      if (maxThumbTravel > 0) {
        const scrollDelta = (deltaY / maxThumbTravel) * maxScroll;
        window.scrollTo(0, Math.max(0, Math.min(maxScroll, startScrollYRef.current + scrollDelta)));
      }
    };

    const onPointerUp = (upEvt) => {
      isDraggingRef.current = false;
      setIsDragging(false);
      try {
        upEvt.target.releasePointerCapture(upEvt.pointerId);
      } catch {
        // fallback
      }
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
    };

    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
  };

  // Native Track Clicking: Page-Up / Page-Down (or Jump on Shift)
  const handleTrackClick = (e) => {
    if (e.target.classList.contains('native-feel-scrollbar-thumb')) return;
    
    const winHeight = window.innerHeight;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickY = e.clientY - rect.top;
    const maxThumbTravel = rect.height - thumbHeight;
    const currentThumbTop = scrollProgress * maxThumbTravel;

    if (e.shiftKey) {
      // Jump directly to percentage
      const docHeight = document.documentElement.scrollHeight;
      const maxScroll = docHeight - winHeight;
      const pct = Math.max(0, Math.min(1, (clickY - thumbHeight / 2) / maxThumbTravel));
      window.scrollTo({ top: pct * maxScroll, behavior: 'instant' });
    } else if (clickY < currentThumbTop) {
      // Page Up (default OS behavior)
      window.scrollBy({ top: -winHeight * 0.85, behavior: 'instant' });
    } else if (clickY > currentThumbTop + thumbHeight) {
      // Page Down (default OS behavior)
      window.scrollBy({ top: winHeight * 0.85, behavior: 'instant' });
    }
  };

  const trackH = trackRef.current ? trackRef.current.clientHeight : (typeof window !== 'undefined' ? window.innerHeight : 800);
  const maxThumbTravel = Math.max(1, trackH - thumbHeight);
  const thumbTop = scrollProgress * maxThumbTravel;

  return (
    <div
      className={`native-feel-scrollbar-dock ${isVisible ? 'is-visible' : ''} ${isDragging ? 'is-dragging' : ''}`}
      onMouseEnter={() => {
        setIsHovered(true);
        setIsVisible(true);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        if (!isDraggingRef.current) {
          setIsVisible(false);
        }
      }}
    >
      <div 
        className="native-feel-scrollbar-track" 
        ref={trackRef}
        onMouseDown={handleTrackClick}
      >
        <div
          className="native-feel-scrollbar-thumb"
          style={{
            transform: `translate3d(0, ${thumbTop}px, 0)`,
            height: `${thumbHeight}px`
          }}
          onPointerDown={handlePointerDownThumb}
        />
      </div>
    </div>
  );
}

export default CustomScrollbar;
