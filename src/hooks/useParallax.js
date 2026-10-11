import { useEffect } from 'react';

// Gentle depth on scroll. Any element marked `data-parallax` receives a CSS
// variable `--py` from -1 (entering from below) to 1 (leaving at the top);
// the stylesheet turns that into a small drift inside the image's frame.
export function useParallax() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return undefined;

    let frame = null;

    const update = () => {
      frame = null;
      const viewHeight = window.innerHeight;

      document.querySelectorAll('[data-parallax]').forEach((el) => {
        const rect = el.parentElement.getBoundingClientRect();
        if (rect.bottom < -80 || rect.top > viewHeight + 80) return;
        const center = rect.top + rect.height / 2;
        const progress = (center - viewHeight / 2) / (viewHeight / 2 + rect.height / 2);
        el.style.setProperty('--py', Math.max(-1, Math.min(1, progress)).toFixed(4));
      });
    };

    const schedule = () => {
      if (frame === null) frame = window.requestAnimationFrame(update);
    };

    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule, { passive: true });
    // New pages mount images later; measure again once they exist.
    const mutations = new MutationObserver(schedule);
    mutations.observe(document.getElementById('root') || document.body, { childList: true, subtree: true });
    update();

    return () => {
      if (frame !== null) window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      mutations.disconnect();
    };
  }, []);
}

export default useParallax;
