import React, { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { useMediaQuery } from '../hooks/useMediaQuery';

const layerSrcSet = (name) =>
  `/optimized/hero-layers/${name}-1100.webp 1100w, /optimized/hero-layers/${name}-1920.webp 1920w`;

// Home hero. The park's name is set between two copies of the same photo:
// the full picture behind it, and a cutout of the tower, trees and lawn in
// front, so the landscape overlaps the letters. As the page scrolls the word
// sinks behind the treeline like the sun going down.
export function HeroSection({ onNavigate }) {
  const sectionRef = useRef(null);
  // Phones already carry a Book tab in the dock, so the hero offers one
  // action there instead of repeating it.
  const isPhone = useMediaQuery('(max-width: 768px)');

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return undefined;

    let frame = null;

    const update = () => {
      frame = null;
      const el = sectionRef.current;
      if (!el) return;
      const progress = Math.min(1, Math.max(0, window.scrollY / el.offsetHeight));
      el.style.setProperty('--sy', progress.toFixed(4));
    };

    const schedule = () => {
      if (frame === null) frame = window.requestAnimationFrame(update);
    };

    window.addEventListener('scroll', schedule, { passive: true });
    update();
    return () => {
      if (frame !== null) window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
    };
  }, []);

  const goToBooking = (event) => {
    event.preventDefault();
    if (onNavigate) onNavigate('home', '#booking');
  };

  const goToExperiences = (event) => {
    event.preventDefault();
    if (onNavigate) onNavigate('home', '#experiences');
  };

  return (
    <section className="hero" id="home" ref={sectionRef}>
      <div className="hero-stage" aria-hidden="true">
        <div className="hero-photo" data-intro>
          <img
            className="hero-layer"
            src="/optimized/hero-layers/hero-back-1920.webp"
            srcSet={layerSrcSet('hero-back')}
            sizes="100vw"
            alt=""
            fetchPriority="high"
            decoding="async"
          />
          <div className="hero-word" data-intro>
            <span>Qetsiyah</span>
          </div>
          <img
            className="hero-layer hero-layer--front"
            src="/optimized/hero-layers/hero-front-1920.webp"
            srcSet={layerSrcSet('hero-front')}
            sizes="100vw"
            alt=""
            decoding="async"
          />
        </div>
        <div className="hero-shade" />
      </div>

      <div className="hero-ui shell">
        <h1 className="visually-hidden">Qetsiyah Eco Park</h1>

        <div className="hero-meta" data-intro style={{ '--intro-delay': '1500ms' }}>
          <span className="label">Barangay Calean, Tacurong City</span>
        </div>

        <div className="hero-foot">
          <div className="hero-pitch">
            <p className="display hero-sub" aria-hidden="true">
              <span className="ln"><span data-intro style={{ '--intro-delay': '900ms' }}>Eco Park</span></span>
            </p>
            <p className="hero-tagline" data-intro style={{ '--intro-delay': '1150ms' }}>
              A relaxing wide place. Perfect for all events and occasions.
            </p>
            <div className="hero-actions" data-intro style={{ '--intro-delay': '1300ms' }}>
              {isPhone ? (
                <a className="btn" href="#experiences" onClick={goToExperiences}>
                  <span>Explore the park</span>
                  <ArrowRight size={16} aria-hidden="true" />
                </a>
              ) : (
                <>
                  <a className="btn" href="#booking" onClick={goToBooking}>
                    <span>Book your event</span>
                    <ArrowRight size={16} aria-hidden="true" />
                  </a>
                  <a className="link-arrow" href="#experiences" onClick={goToExperiences}>
                    Explore the park
                  </a>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
