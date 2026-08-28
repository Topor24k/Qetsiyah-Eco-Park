import { useEffect } from 'react';

/**
 * CustomScrollbar enables the true native browser scrollbar to fade in
 * on cursor proximity (<= 35px from the right edge) with:
 * 1. 100% real default native browser scrollbar functionality (OS-level drag, click, momentum).
 * 2. 100% transparent track (ZERO black space / gutter on the right).
 * 3. Constant width (ZERO website layout shift / movement).
 */
export function CustomScrollbar() {
  useEffect(() => {
    let isNear = false;

    const handleMouseMove = (e) => {
      const distanceFromRight = window.innerWidth - e.clientX;
      const shouldShow = distanceFromRight <= 35;

      if (shouldShow && !isNear) {
        isNear = true;
        document.documentElement.classList.add('cursor-near-scrollbar');
      } else if (!shouldShow && isNear) {
        isNear = false;
        document.documentElement.classList.remove('cursor-near-scrollbar');
      }
    };

    const handleMouseLeave = () => {
      if (isNear) {
        isNear = false;
        document.documentElement.classList.remove('cursor-near-scrollbar');
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.documentElement.classList.remove('cursor-near-scrollbar');
    };
  }, []);

  return null;
}

export default CustomScrollbar;
