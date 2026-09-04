import React, { useState, useEffect } from 'react';
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

  // Track sub-image rotation index for each of the 5 slides
  const [subImageIndices, setSubImageIndices] = useState(() => aboutShowcaseSlides.map(() => 0));

  // Rotate images every 5 seconds (5000ms)
  useEffect(() => {
    const timer = setInterval(() => {
      setSubImageIndices((prev) =>
        prev.map((idx, sIdx) => {
          const slideImages = aboutShowcaseSlides[sIdx].images;
          return (idx + 1) % slideImages.length;
        })
      );
    }, 5000);

    return () => clearInterval(timer);
  }, [activeSlide]);

  const selectPrevious = () => {
    setActiveSlide((current) => (current - 1 + total) % total);
  };

  const selectNext = () => {
    setActiveSlide((current) => (current + 1) % total);
  };

  const activeContent = aboutShowcaseSlides[activeSlide];

  return (
    <section className="about-changing-showcase" aria-roledescription="carousel" aria-label="About Qetsiyah themes">
      <div className="about-changing-copy" key={`copy-${activeSlide}`}>
        <h2>
          <span>{activeContent.titleTop}</span>
          <span>{activeContent.titleBottom}</span>
        </h2>
        <div className="about-changing-subtitle">
          <span aria-hidden="true" />
          <p>{activeContent.subtitle}</p>
          <span aria-hidden="true" />
        </div>
      </div>

      <div className="about-changing-full-slider">
        <div className="about-changing-track-absolute">
          {aboutShowcaseSlides.map((slide, i) => {
            let offset = (i - activeSlide) % total;
            if (offset > Math.floor(total / 2)) offset -= total;
            if (offset < -Math.floor(total / 2)) offset += total;

            const isActive = offset === 0;

            return (
              <div
                className={`about-slide-item-absolute ${isActive ? 'is-active' : ''}`}
                key={i}
                data-offset={offset}
                style={{ '--offset': offset }}
                onClick={() => {
                  if (offset === -1) selectPrevious();
                  else if (offset === 1) selectNext();
                  else if (!isActive) setActiveSlide(i);
                }}
              >
                {slide.images.map((imgSrc, imgIdx) => {
                  const isCurrentImg = imgIdx === (subImageIndices[i] || 0);
                  return (
                    <img
                      key={imgSrc}
                      src={imgSrc}
                      alt={`${slide.alt} ${imgIdx + 1}`}
                      className={`about-slide-subimg ${isCurrentImg ? 'active' : ''}`}
                    />
                  );
                })}
                <div className="slide-overlay-gradient"></div>
                {isActive && (
                  <div className="slide-caption-bar">
                    <div className="slide-caption-title-wrap">
                      <span>{slide.label}</span>
                      {slide.images.length > 1 && (
                        <div className="sub-slide-pills" aria-label="Rotating gallery indicators">
                          {slide.images.map((_, pIdx) => (
                            <button
                              key={pIdx}
                              type="button"
                              className={`sub-slide-pill ${pIdx === (subImageIndices[i] || 0) ? 'active' : ''}`}
                              onClick={(e) => {
                                e.stopPropagation();
                                setSubImageIndices((prev) => {
                                  const next = [...prev];
                                  next[i] = pIdx;
                                  return next;
                                });
                              }}
                              aria-label={`Show picture ${pIdx + 1} of ${slide.label}`}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                    <span>
                      {String(i + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="global-slider-arrows">
          <button className="nav-arrow prev-arrow" onClick={selectPrevious} aria-label="Previous image">
            <ArrowLeft size={20} />
          </button>
          <button className="nav-arrow next-arrow" onClick={selectNext} aria-label="Next image">
            <ArrowRight size={20} />
          </button>
        </div>
      </div>

      <div className="about-gallery-dots">
        {aboutShowcaseSlides.map((_, i) => (
          <button
            key={i}
            className={i === activeSlide ? 'is-active' : ''}
            onClick={() => setActiveSlide(i)}
            aria-label={`Go to slide ${i + 1}`}
          >
            {String(i + 1).padStart(2, '0')}
          </button>
        ))}
      </div>
    </section>
  );
}

export default AboutChangingShowcase;