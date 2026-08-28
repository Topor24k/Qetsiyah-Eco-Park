import React, { useState, useEffect, useRef } from 'react';

export function CustomScrollbar() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [thumbHeight, setThumbHeight] = useState(60);
  const [isVisible, setIsVisible] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const trackRef = useRef(null);

  // Calculate scroll position & proportional thumb height
  const updateScrollProgress = () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (totalHeight > 0) {
      const current = window.scrollY;
      setScrollProgress((current / totalHeight) * 100);
      
      const calculatedHeight = Math.max(
        40, 
        Math.min(180, (window.innerHeight / document.documentElement.scrollHeight) * window.innerHeight)
      );
      setThumbHeight(calculatedHeight);
    }
  };

  useEffect(() => {
    // Only update position on scroll - DO NOT reveal on scroll
    const handleScroll = () => {
      updateScrollProgress();
    };

    const handleMouseMove = (e) => {
      const distanceFromRight = window.innerWidth - e.clientX;
      // ONLY appear when cursor moves within 35px of the right scroll area
      if (distanceFromRight <= 35) {
        setIsVisible(true);
      } else if (!isDragging && !isHovered) {
        setIsVisible(false);
      }
    };

    const handleMouseLeaveWindow = () => {
      if (!isDragging) {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeaveWindow);

    updateScrollProgress();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeaveWindow);
    };
  }, [isDragging, isHovered]);

  // Handle Dragging
  const handleThumbMouseDown = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
    setIsVisible(true);

    const startY = e.clientY;
    const startScrollY = window.scrollY;
    const totalScrollable = document.documentElement.scrollHeight - window.innerHeight;
    const trackHeight = trackRef.current ? trackRef.current.clientHeight : window.innerHeight;
    const maxThumbTravel = trackHeight - thumbHeight;

    const onMouseMove = (moveEvent) => {
      const deltaY = moveEvent.clientY - startY;
      if (maxThumbTravel > 0) {
        const scrollDelta = (deltaY / maxThumbTravel) * totalScrollable;
        window.scrollTo({
          top: Math.max(0, Math.min(totalScrollable, startScrollY + scrollDelta)),
          behavior: 'auto'
        });
      }
    };

    const onMouseUp = () => {
      setIsDragging(false);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  };

  // Handle Track Click
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

  const currentTop = trackRef.current 
    ? (scrollProgress / 100) * (trackRef.current.clientHeight - thumbHeight)
    : 0;

  return (
    <div
      className={`original-style-scrollbar-dock ${isVisible ? 'is-visible' : ''} ${isDragging ? 'is-dragging' : ''}`}
      onMouseEnter={() => {
        setIsHovered(true);
        setIsVisible(true);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        setIsVisible(false);
      }}
    >
      <div 
        className="original-style-scrollbar-track" 
        ref={trackRef}
        onClick={handleTrackClick}
      >
        <div
          className="original-style-scrollbar-thumb"
          style={{
            top: `${Math.max(0, currentTop)}px`,
            height: `${thumbHeight}px`
          }}
          onMouseDown={handleThumbMouseDown}
        />
      </div>
    </div>
  );
}

export default CustomScrollbar;
