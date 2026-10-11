import { useEffect } from 'react';

// Reveals content as it enters the viewport. Any element marked with
// `data-reveal` is picked up automatically, including ones mounted later by a
// page change. Content stays fully visible when the visitor prefers reduced
// motion or scripting is unavailable.
export function useScrollReveal() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return undefined;

    const root = document.documentElement;
    root.classList.add('reveal-on');

    let frame = null;

    // Measured directly on scroll rather than through IntersectionObserver so
    // a reveal can never be left waiting on a delayed observer callback.
    const revealVisible = () => {
      frame = null;
      // Hold everything while the page curtain is still covering the screen.
      if (root.dataset.stage === 'covered') return;

      const viewHeight = window.innerHeight;
      const viewWidth = window.innerWidth;

      document.querySelectorAll('[data-reveal]:not([data-revealed])').forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.width === 0 && rect.height === 0) return;
        const inView = rect.top < viewHeight * 0.9 && rect.bottom > 0 && rect.left < viewWidth && rect.right > 0;
        // An attribute (not a class) so React re-renders never wipe it.
        if (inView) el.setAttribute('data-revealed', '');
      });
    };

    const schedule = () => {
      if (frame === null) frame = window.requestAnimationFrame(revealVisible);
    };

    // Capture phase also hears the horizontal rails scrolling.
    document.addEventListener('scroll', schedule, { passive: true, capture: true });
    window.addEventListener('resize', schedule, { passive: true });
    window.addEventListener('load', schedule);
    window.addEventListener('stagechange', schedule);

    const mutations = new MutationObserver(schedule);
    mutations.observe(document.getElementById('root') || document.body, { childList: true, subtree: true });
    revealVisible();

    return () => {
      if (frame !== null) window.cancelAnimationFrame(frame);
      document.removeEventListener('scroll', schedule, { capture: true });
      window.removeEventListener('resize', schedule);
      window.removeEventListener('load', schedule);
      window.removeEventListener('stagechange', schedule);
      mutations.disconnect();
      root.classList.remove('reveal-on');
    };
  }, []);
}

export default useScrollReveal;
