import React from 'react';
import { ArrowDown } from 'lucide-react';
import { Media } from './ui/Media';

// Gallery title card: three photographs at different depths behind the
// page name.
export function ParkGalleryHero({ onExplore }) {
  const scrollToGallery = () => {
    if (onExplore) onExplore();
  };

  return (
    <section className="ghero" id="gallery" aria-labelledby="park-gallery-hero-title">
      <div className="ghero-collage">
        <Media
          src="/gallery/facebook/scenery-atmosphere/1414406397372320.webp"
          alt="Colorful flower garden at sunset in Qetsiyah Eco Park"
          className="ghero-frame ghero-frame--left"
          parallax
          eager
          delay={500}
        />
        <Media
          src="/gallery/facebook/scenery-atmosphere/1455627183250241.webp"
          alt="Sunset overlooking Qetsiyah Eco Park"
          className="ghero-frame ghero-frame--center"
          parallax
          eager
          delay={300}
        />
        <Media
          src="/gallery/facebook/scenery-atmosphere/1413818884097738.webp"
          alt="Illuminated viewing tower and gardens at Qetsiyah Eco Park"
          className="ghero-frame ghero-frame--right"
          parallax
          eager
          delay={650}
        />
      </div>

      <div className="ghero-ui shell">
        <div className="ghero-meta" data-intro style={{ '--intro-delay': '1250ms' }}>
          <span className="label">Qetsiyah Eco Park • Tacurong City</span>
          <span className="label" aria-label="Established in 2023">2023 — Established</span>
        </div>

        <div className="ghero-foot">
          <h1 className="display ghero-title" id="park-gallery-hero-title">
            <span className="ln">
              <span data-intro style={{ '--intro-delay': '380ms' }}>Spirit of</span>
            </span>
            <span className="ln">
              <span data-intro style={{ '--intro-delay': '520ms' }}><span className="accent">the Park</span></span>
            </span>
          </h1>

          <button
            className="link-arrow"
            type="button"
            onClick={scrollToGallery}
            data-intro
            style={{ '--intro-delay': '1250ms' }}
          >
            Scroll down
            <ArrowDown size={14} aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
}

export default ParkGalleryHero;
