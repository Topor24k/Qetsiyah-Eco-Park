import React, { useState, useEffect, useRef, useCallback } from 'react';

/**
 * CustomScrollbar provides an overlay scrollbar that:
 * 1. Has ZERO black gutter space (native scrollbar is hidden).
 * 2. Has ZERO layout movement when appearing/disappearing (floats via position: fixed).
 * 3. Appears ONLY on cursor proximity (<= 35px from right screen edge).
 * 4. Provides 1:1 smooth native-like dragging and track clicking.
 */
export function CustomScrollbar() {
  const [scrollRatio, setScrollRatio] = useState(0);
  const [thumbHeight, setThumbHeight] = useState(60);
  const [isVisible, setIsVisible] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const trackRef = useRef(null);
  const isDraggingRef = useRef(false);
  const dragStartYRef = useRef(0);
  const dragStartScrollYRef = useRef(0);

  // Update thumb position and size based on scroll
  const updateScrollState = useCallback(() => {
    const docHeight = document.documentElement.scrollHeight;
    const winHeight = window.innerHeight;
    const totalScrollable = docHeight - winHeight;

    if (totalScrollable > 0) {
      const current = window.scrollY;
      setScrollRatio(Math.min(1, Math.max(0, current / totalScrollable)));
      
      const calculatedHeight = Math.max(
        36, 
        Math.min(220, (winHeight / docHeight) * winHeight)
      );
      setThumbHeight(calculatedHeight);
    }
  }, []);

  useEffect(() => {
    // Only update position on scroll (NEVER show on scroll)
    const handleScroll = () => {
      updateScrollState();
    };

    const handleMouseMove = (e) => {
      const distanceFromRight = window.innerWidth - e.clientX;
      // ONLY reveal when cursor is near the right edge (<= 35px)
      if (distanceFromRight <= 35) {
        setIsVisible(true);
      } else if (!isDraggingRef.current && !isHovered) {
        setIsVisible(false);
      }
    };

    const handleMouseLeave = () => {
      if (!isDraggingRef.current) {
        setIsVisible(false);
      }
    };

    const handleResize = () => {
      updateScrollState();
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('resize', handleResize);
    document.addEventListener('mouseleave', handleMouseLeave);

    updateScrollState();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isHovered, updateScrollState]);

  // Handle Dragging with 1:1 native scroll responsiveness
  const handleThumbMouseDown = (e) => {
    e.preventDefault();
    e.stopPropagation();

    isDraggingRef.current = true;
    setIsDragging(true);
    setIsVisible(true);

    dragStartYRef.current = e.clientY;
    dragStartScrollYRef.current = window.scrollY;

    const totalScrollable = document.documentElement.scrollHeight - window.innerHeight;
    const trackHeight = trackRef.current ? trackRef.current.clientHeight : window.innerHeight;
    const maxThumbTravel = trackHeight - thumbHeight;

    const onMouseMove = (moveEvent) => {
      if (!isDraggingRef.current) return;
      const deltaY = moveEvent.clientY - dragStartYRef.current;
      if (maxThumbTravel > 0) {
        const scrollDelta = (deltaY / maxThumbTravel) * totalScrollable;
        window.scrollTo({
          top: Math.max(0, Math.min(totalScrollable, dragStartScrollYRef.current + scrollDelta)),
          behavior: 'auto'
        });
      }
    };

    const onMouseUp = () => {
      isDraggingRef.current = false;
      setIsDragging(false);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mouseup', onMouseUp);
  };

  // Handle Track Click (Page Jump)
  const handleTrackClick = (e) => {
    if (trackRef.current) {
      const rect = trackRef.current.getBoundingClientRect();
      const clickY = e.clientY - rect.top - thumbHeight / 2;
      const trackAvailable = rect.height - thumbHeight;
      const percentage = Math.max(0, Math.min(1, clickY / trackAvailable));
      const totalScrollable = document.documentElement.scrollHeight - window.innerHeight;
      window.scrollTo({
        top: totalScrollable * percentage,
        behavior: 'smooth'
      });
    }
  };

  const trackH = trackRef.current ? trackRef.current.clientHeight : window.innerHeight;
  const currentTop = scrollRatio * (trackH - thumbHeight);

  return (
    <div
      className={`zero-shift-scrollbar-dock ${isVisible ? 'is-visible' : ''} ${isDragging ? 'is-dragging' : ''}`}
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
        className="zero-shift-scrollbar-track" 
        ref={trackRef}
        onClick={handleTrackClick}
      >
        <div
          className="zero-shift-scrollbar-thumb"
          style={{
            transform: `translateY(${Math.max(0, currentTop)}px)`,
            height: `${thumbHeight}px`
          }}
          onMouseDown={handleThumbMouseDown}
        />
      </div>
    </div>
  );
}

export default CustomScrollbar;
