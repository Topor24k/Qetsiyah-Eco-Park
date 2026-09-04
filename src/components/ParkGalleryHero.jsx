import React from 'react';
import { ArrowDown } from 'lucide-react';

export function ParkGalleryHero({ onExplore }) {
  const scrollToGallery = () => {
    if (onExplore) onExplore();
  };

  return (
    <section className="park-gallery-editorial-hero" id="gallery" aria-labelledby="park-gallery-hero-title">
      <div className="park-gallery-hero-intro">
        <span>Qetsiyah Eco Park</span>
        <span aria-hidden="true">•</span>
        <span>Tacurong City</span>
      </div>

      <button className="park-gallery-scroll-cue" type="button" onClick={scrollToGallery}>
        <ArrowDown size={18} strokeWidth={1.25} aria-hidden="true" />
        <span>Scroll down</span>
      </button>

      <div className="park-gallery-hero-title-wrap">
        <h1 id="park-gallery-hero-title">
          <span>Spirit of</span>
          <span>the Park</span>
        </h1>
      </div>

      <div className="park-gallery-established" aria-label="Established in 2023">
        <span>2023</span>
        <small>Established</small>
      </div>

      <div className="park-gallery-polaroid-collage" aria-label="A collection of park photographs">
        <figure className="park-gallery-polaroid polaroid-left">
          <img
            src="/gallery/facebook/scenery-atmosphere/1414406397372320.webp"
            alt="Colorful flower garden at sunset in Qetsiyah Eco Park"
            decoding="async"
          />
        </figure>

        <figure className="park-gallery-polaroid polaroid-center">
          <img
            src="/gallery/facebook/scenery-atmosphere/1455627183250241.webp"
            alt="Sunset overlooking Qetsiyah Eco Park"
            fetchPriority="high"
          />
        </figure>

        <figure className="park-gallery-polaroid polaroid-right">
          <img
            src="/gallery/facebook/scenery-atmosphere/1413818884097738.webp"
            alt="Illuminated viewing tower and gardens at Qetsiyah Eco Park"
            decoding="async"
          />
        </figure>
      </div>
    </section>
  );
}

export default ParkGalleryHero;
