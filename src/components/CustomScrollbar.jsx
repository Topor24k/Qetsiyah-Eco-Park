import React, { useState, useEffect, useRef } from 'react';

export function CustomScrollbar() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const hideTimerRef = useRef(null);
  const trackRef = useRef(null);

  // Calculate scroll position
  const updateScrollProgress = () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (totalHeight > 0) {
      const current = window.scrollY;
      setScrollProgress((current / totalHeight) * 100);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      updateScrollProgress();
      setIsVisible(true);
      document.documentElement.classList.add('show-scrollbar');

      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
      hideTimerRef.current = setTimeout(() => {
        if (!isHovered && !isDragging) {
          setIsVisible(false);
          document.documentElement.classList.remove('show-scrollbar');
        }
      }, 1200);
    };

    const handleMouseMove = (e) => {
      const distanceFromRight = window.innerWidth - e.clientX;
      // When cursor is within 45px of the right screen edge
      if (distanceFromRight <= 45) {
        setIsVisible(true);
        document.documentElement.classList.add('show-scrollbar');
        if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
      } else if (!isDragging && !isHovered) {
        setIsVisible(false);
        document.documentElement.classList.remove('show-scrollbar');
      }
    };

    const handleMouseLeaveWindow = () => {
      if (!isDragging) {
        setIsVisible(false);
        document.documentElement.classList.remove('show-scrollbar');
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
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    };
  }, [isDragging, isHovered]);

  // Handle Dragging
  const handleThumbMouseDown = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
    setIsVisible(true);
    document.documentElement.classList.add('show-scrollbar');

    const startY = e.clientY;
    const startScrollY = window.scrollY;
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const trackHeight = trackRef.current ? trackRef.current.clientHeight : window.innerHeight;

    const onMouseMove = (moveEvent) => {
      const deltaY = moveEvent.clientY - startY;
      const scrollDelta = (deltaY / trackHeight) * totalHeight;
      window.scrollTo({
        top: Math.max(0, Math.min(totalHeight, startScrollY + scrollDelta)),
        behavior: 'auto'
      });
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
      const clickY = e.clientY - rect.top;
      const percentage = clickY / rect.height;
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      window.scrollTo({
        top: totalHeight * percentage,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div
      className={`animated-scrollbar-dock ${isVisible ? 'is-visible' : ''} ${isDragging ? 'is-dragging' : ''}`}
      onMouseEnter={() => {
        setIsHovered(true);
        setIsVisible(true);
        document.documentElement.classList.add('show-scrollbar');
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        setIsVisible(false);
        document.documentElement.classList.remove('show-scrollbar');
      }}
    >
      <div 
        className="animated-scrollbar-track" 
        ref={trackRef}
        onClick={handleTrackClick}
      >
        <div
          className="animated-scrollbar-thumb"
          style={{
            top: `${Math.min(92, Math.max(0, scrollProgress * 0.92))}%`
          }}
          onMouseDown={handleThumbMouseDown}
        >
          <span className="scrollbar-thumb-glow" />
        </div>
      </div>
    </div>
  );
}

export default CustomScrollbar;
