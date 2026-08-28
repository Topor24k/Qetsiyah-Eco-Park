import React, { useState, useEffect, useRef } from 'react';

/**
 * High-Performance 0ms Latency Native-Feel Scrollbar:
 * - Direct DOM transform updates for 144Hz/240Hz zero-lag drag response.
 * - Zero black space / gutter.
 * - Zero website layout movement (fixed overlay).
 * - Appears ONLY on cursor proximity (<= 40px).
 */
export function CustomScrollbar() {
  const [isVisible, setIsVisible] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const trackRef = useRef(null);
  const thumbRef = useRef(null);
  const isDraggingRef = useRef(false);
  const startPointerYRef = useRef(0);
  const startThumbTopRef = useRef(0);
  const currentThumbTopRef = useRef(0);
  const thumbHeightRef = useRef(60);

  // Synchronously update thumb position on screen without React render latency
  const syncThumbToScroll = () => {
    if (isDraggingRef.current) return; // Drag has direct pointer control

    const docHeight = document.documentElement.scrollHeight;
    const winHeight = window.innerHeight;
    const maxScroll = docHeight - winHeight;

    if (maxScroll <= 0) return;

    const trackH = trackRef.current ? trackRef.current.clientHeight : winHeight;
    const calculatedThumbH = Math.max(
      32,
      Math.min(winHeight - 20, (winHeight / docHeight) * winHeight)
    );
    thumbHeightRef.current = calculatedThumbH;

    const maxThumbTravel = trackH - calculatedThumbH;
    const scrollRatio = window.scrollY / maxScroll;
    const top = Math.max(0, Math.min(maxThumbTravel, scrollRatio * maxThumbTravel));
    currentThumbTopRef.current = top;

    if (thumbRef.current) {
      thumbRef.current.style.height = `${calculatedThumbH}px`;
      thumbRef.current.style.transform = `translate3d(0, ${top}px, 0)`;
    }
  };

  useEffect(() => {
    let rafId = null;

    const onScroll = () => {
      if (!rafId) {
        rafId = requestAnimationFrame(() => {
          syncThumbToScroll();
          rafId = null;
        });
      }
    };

    const onMouseMove = (e) => {
      const distFromRight = window.innerWidth - e.clientX;
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
      syncThumbToScroll();
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('resize', onResize);
    document.addEventListener('mouseleave', onMouseLeave);

    syncThumbToScroll();

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      document.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [isHovered]);

  // Instant 0ms Lag Direct Hardware Pointer Drag
  const handlePointerDownThumb = (e) => {
    e.preventDefault();
    e.stopPropagation();

    isDraggingRef.current = true;
    setIsDragging(true);
    setIsVisible(true);

    startPointerYRef.current = e.clientY;
    startThumbTopRef.current = currentThumbTopRef.current;

    document.documentElement.style.scrollBehavior = 'auto';
    document.body.style.userSelect = 'none';

    try {
      e.target.setPointerCapture(e.pointerId);
    } catch {
      // fallback
    }

    const docHeight = document.documentElement.scrollHeight;
    const winHeight = window.innerHeight;
    const maxScroll = docHeight - winHeight;
    const trackH = trackRef.current ? trackRef.current.clientHeight : winHeight;
    const maxThumbTravel = trackH - thumbHeightRef.current;

    const onPointerMove = (moveEvt) => {
      if (!isDraggingRef.current || maxThumbTravel <= 0) return;

      const deltaY = moveEvt.clientY - startPointerYRef.current;
      const newThumbTop = Math.max(0, Math.min(maxThumbTravel, startThumbTopRef.current + deltaY));
      currentThumbTopRef.current = newThumbTop;

      // 1. Instantly move thumb with direct DOM transform (0ms delay)
      if (thumbRef.current) {
        thumbRef.current.style.transform = `translate3d(0, ${newThumbTop}px, 0)`;
      }

      // 2. Instantly scroll page synchronously with exact 1:1 proportion
      const targetScroll = (newThumbTop / maxThumbTravel) * maxScroll;
      window.scrollTo(0, targetScroll);
    };

    const onPointerUp = (upEvt) => {
      isDraggingRef.current = false;
      setIsDragging(false);
      document.documentElement.style.scrollBehavior = '';
      document.body.style.userSelect = '';

      try {
        upEvt.target.releasePointerCapture(upEvt.pointerId);
      } catch {
        // fallback
      }

      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
    };

    window.addEventListener('pointermove', onPointerMove, { passive: false });
    window.addEventListener('pointerup', onPointerUp);
  };

  // Instant Track Click (Page Up / Page Down or Shift+Jump)
  const handleTrackMouseDown = (e) => {
    if (e.target === thumbRef.current) return;

    const winHeight = window.innerHeight;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickY = e.clientY - rect.top;
    const currentTop = currentThumbTopRef.current;
    const currentBottom = currentTop + thumbHeightRef.current;

    document.documentElement.style.scrollBehavior = 'auto';

    if (e.shiftKey) {
      const maxThumbTravel = rect.height - thumbHeightRef.current;
      const targetThumbTop = Math.max(0, Math.min(maxThumbTravel, clickY - thumbHeightRef.current / 2));
      const docHeight = document.documentElement.scrollHeight;
      const maxScroll = docHeight - winHeight;
      const targetScroll = (targetThumbTop / maxThumbTravel) * maxScroll;
      window.scrollTo(0, targetScroll);
    } else if (clickY < currentTop) {
      window.scrollBy(0, -winHeight * 0.85);
    } else if (clickY > currentBottom) {
      window.scrollBy(0, winHeight * 0.85);
    }
  };

  return (
    <div
      className={`zero-lag-scrollbar-dock ${isVisible ? 'is-visible' : ''} ${isDragging ? 'is-dragging' : ''}`}
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
        className="zero-lag-scrollbar-track" 
        ref={trackRef}
        onMouseDown={handleTrackMouseDown}
      >
        <div
          className="zero-lag-scrollbar-thumb"
          ref={thumbRef}
          onPointerDown={handlePointerDownThumb}
        />
      </div>
    </div>
  );
}

export default CustomScrollbar;
