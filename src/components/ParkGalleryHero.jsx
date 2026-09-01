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
          <img src="/Activities/Horse Riding.jpg" alt="Horse riding at Qetsiyah Eco Park" />
        </figure>

        <figure className="park-gallery-polaroid polaroid-center">
          <img src="/about-adventure-sanctuary.jpg" alt="Qetsiyah Eco Park landscape" />
        </figure>

        <figure className="park-gallery-polaroid polaroid-right">
          <img src="/about-verde-villa.jpg" alt="Verde Villa at Qetsiyah Eco Park" />
        </figure>
      </div>
    </section>
  );
}

export default ParkGalleryHero;
