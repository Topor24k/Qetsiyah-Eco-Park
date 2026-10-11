import React, { useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const aboutShowcaseSlides = [
  {
    label: 'The Place',
    titleTop: 'From a humble land',
    titleBottom: 'to a thriving eco park',
    subtitle: 'What began as a quiet natural landscape has grown into the eco-sanctuary it is today. Rooted in deep respect for the earth and built with purposeful care, Qetsiyah evolved step by step into a spacious haven where nature, families, and outdoor adventures come alive.',
    images: [
      '/About Changing Showcase/The Place.jpg',
      '/About Changing Showcase/The Place II.jpg'
    ],
    alt: 'The scenic tropical landscape and origin of Qetsiyah Eco Park'
  },
  {
    label: 'The Community',
    titleTop: 'Owners, team & visitors',
    titleBottom: 'creating our heart',
    subtitle: 'Behind Qetsiyah are visionary owners, dedicated staff, and the loyal visitors who return season after season. Together, their warm connection and shared celebrations cultivate an inclusive, welcoming community where every visitor feels like family.',
    images: [
      '/About Changing Showcase/The Community.jpg',
      '/About Changing Showcase/The Communities II.jpg',
      '/About Changing Showcase/The Communities III.jpg'
    ],
    alt: 'Families, visitors, and staff creating a welcoming community at Qetsiyah Eco Park'
  },
  {
    label: 'The Experiences',
    titleTop: 'Professional care and',
    titleBottom: 'unmatched safety',
    subtitle: 'Every visit is defined by genuine professionalism. From trusted chefs crafting satisfying, quality menus to certified activity operators safeguarding your adventures, our staff and owners unite around one priority: guest happiness and peace of mind.',
    images: [
      '/About Changing Showcase/The Experiences.jpg',
      '/About Changing Showcase/The Experiences II.jpg'
    ],
    alt: 'Professional and safe outdoor adventures at Qetsiyah Eco Park'
  },
  {
    label: 'The Hospitality',
    titleTop: 'Receiving every guest',
    titleBottom: 'with goodwill & warmth',
    subtitle: 'Hospitality is the relationship of a host toward a guest, receiving every visitor with heartfelt goodwill and open welcome. From reception to entertainment, we ensure guests, families, and travelers feel completely valued, comforted, and celebrated.',
    images: [
      '/About Changing Showcase/The Hospitality.jpg',
      '/About Changing Showcase/The Hospitality II.jpg'
    ],
    alt: 'Warm dining hospitality and gracious reception at Qetsiyah Eco Park'
  },
  {
    label: 'The Future',
    titleTop: 'Growing with purpose,',
    titleBottom: 'ready for tomorrow',
    subtitle: 'Qetsiyah is continuously improving and adapting to every challenge and new horizon. Future milestones, sustainability commitments, and expanded park attractions will live right here as we continue to flourish.',
    images: [
      '/About Changing Showcase/The Future.jpg'
    ],
    alt: 'The illuminated future and continuous growth of Qetsiyah Eco Park'
  }
];

export function AboutChangingShowcase() {
  const [activeSlide, setActiveSlide] = useState(0);
  const total = aboutShowcaseSlides.length;

  // Which photograph each of the 5 chapters is showing. Photographs change
  // only when a visitor picks one; nothing advances on its own.
  const [subImageIndices, setSubImageIndices] = useState(() => aboutShowcaseSlides.map(() => 0));

  const selectPrevious = () => {
    setActiveSlide((current) => (current - 1 + total) % total);
  };

  const selectNext = () => {
    setActiveSlide((current) => (current + 1) % total);
  };

  const activeContent = aboutShowcaseSlides[activeSlide];
  const activeSubImage = subImageIndices[activeSlide] || 0;

  return (
    <section className="section section--charcoal chapters" aria-roledescription="carousel" aria-label="About Qetsiyah themes">
      <div className="shell">
        <div className="chapters-grid">
          <div className="chapters-copy">
            <p className="label chapters-label">
              <span className="num accent">{String(activeSlide + 1).padStart(2, '0')}</span>
              <span className="num label-dim">/ {String(total).padStart(2, '0')}</span>
              <span>{activeContent.label}</span>
            </p>

            <div className="chapters-body">
              <h2 className="display display-md chapters-title" key={`title-${activeSlide}`}>
                <span className="ln"><span>{activeContent.titleTop}</span></span>
                <span className="ln"><span><span className="accent">{activeContent.titleBottom}</span></span></span>
              </h2>

              <p className="body chapters-text" key={`text-${activeSlide}`}>{activeContent.subtitle}</p>
            </div>
          </div>

          <div className="chapters-stage">
            {aboutShowcaseSlides.map((slide, i) =>
              slide.images.map((imgSrc, imgIdx) => {
                const isCurrent = i === activeSlide && imgIdx === (subImageIndices[i] || 0);
                return (
                  <img
                    key={imgSrc}
                    src={imgSrc}
                    alt={isCurrent ? `${slide.alt} ${imgIdx + 1}` : ''}
                    aria-hidden={isCurrent ? undefined : 'true'}
                    className={`chapters-img ${isCurrent ? 'is-active' : ''}`}
                    loading="lazy"
                    decoding="async"
                  />
                );
              })
            )}

            <button className="chapters-arrow chapters-arrow--prev" onClick={selectPrevious} aria-label="Previous chapter" type="button">
              <ArrowLeft size={18} aria-hidden="true" />
            </button>
            <button className="chapters-arrow chapters-arrow--next" onClick={selectNext} aria-label="Next chapter" type="button">
              <ArrowRight size={18} aria-hidden="true" />
            </button>

            {activeContent.images.length > 1 && (
              <div className="chapters-pills" aria-label={`Pictures of ${activeContent.label}`}>
                {activeContent.images.map((_, pIdx) => (
                  <button
                    key={pIdx}
                    type="button"
                    className={`chapters-pill ${pIdx === activeSubImage ? 'is-active' : ''}`}
                    onClick={() => {
                      setSubImageIndices((prev) => {
                        const next = [...prev];
                        next[activeSlide] = pIdx;
                        return next;
                      });
                    }}
                    aria-label={`Show picture ${pIdx + 1} of ${activeContent.label}`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="chapters-tabs">
          {aboutShowcaseSlides.map((slide, i) => (
            <button
              key={slide.label}
              type="button"
              className={`chapters-tab ${i === activeSlide ? 'is-active' : ''}`}
              onClick={() => setActiveSlide(i)}
              aria-label={`Go to slide ${i + 1}`}
              aria-current={i === activeSlide ? 'true' : undefined}
            >
              <span className="label num">{String(i + 1).padStart(2, '0')}</span>
              <span className="label">{slide.label}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

export default AboutChangingShowcase;
