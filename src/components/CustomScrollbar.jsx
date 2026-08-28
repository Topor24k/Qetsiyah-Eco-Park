import { useEffect } from 'react';

/**
 * CustomScrollbar activates the native browser scrollbar styling 
 * ONLY when the cursor approaches the right scrollbar area (<= 35px from edge).
 * Provides 100% default native browser scrolling functionality, performance, and feel.
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
