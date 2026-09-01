import React, { useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const aboutShowcaseSlides = [
  {
    label: 'The Place',
    titleTop: 'A place made for',
    titleBottom: 'unhurried days',
    subtitle: 'A generous open-air setting where nature, comfort and everyday moments are given room to breathe. This introductory copy can be replaced once the full park story is ready.',
    image: '/about-adventure-sanctuary.jpg',
    alt: 'A wide tropical landscape at Qetsiyah Eco Park'
  },
  {
    label: 'The Community',
    titleTop: 'People are always',
    titleBottom: 'at the heart',
    subtitle: 'A welcoming destination shaped around families, friendships and shared celebrations. This placeholder introduces the community values behind Qetsiyah.',
    image: '/Activities/Playground.jpg',
    alt: 'Families enjoying Qetsiyah Eco Park'
  },
  {
    label: 'The Experiences',
    titleTop: 'Every visit moves',
    titleBottom: 'at your own pace',
    subtitle: 'From playful adventures to peaceful afternoons, the park brings different experiences together without making the day feel rushed.',
    image: '/Activities/Sky Biking.jpg',
    alt: 'An outdoor adventure experience at Qetsiyah Eco Park'
  },
  {
    label: 'The Hospitality',
    titleTop: 'Thoughtful moments',
    titleBottom: 'made to be shared',
    subtitle: 'Food, rest and warm service complete the experience. This section can later carry the real story of the team, the cafe and Verde Villa.',
    image: '/about-cafe-dining.jpg',
    alt: 'Cafe and dining experience at Qetsiyah Eco Park'
  },
  {
    label: 'The Future',
    titleTop: 'A young destination',
    titleBottom: 'still growing',
    subtitle: 'Qetsiyah continues to evolve with every season and every returning guest. Future milestones, plans and commitments can live here when they are ready.',
    image: '/qetsiyah-tropical-dusk.jpg',
    alt: 'Qetsiyah Eco Park illuminated at dusk'
  }
];

export function AboutChangingShowcase() {
  const [activeSlide, setActiveSlide] = useState(0);

  const selectPrevious = () => {
    setActiveSlide((current) => (current - 1 + aboutShowcaseSlides.length) % aboutShowcaseSlides.length);
  };

  const selectNext = () => {
    setActiveSlide((current) => (current + 1) % aboutShowcaseSlides.length);
  };

  const previousIndex = (activeSlide - 1 + aboutShowcaseSlides.length) % aboutShowcaseSlides.length;
  const nextIndex = (activeSlide + 1) % aboutShowcaseSlides.length;
  const activeContent = aboutShowcaseSlides[activeSlide];

  return (
    <section className="about-changing-showcase" aria-roledescription="carousel" aria-label="About Qetsiyah themes">
      <div className="about-changing-copy" key={`copy-${activeSlide}`}>
        <p className="about-changing-eyebrow">
          {String(activeSlide + 1).padStart(2, '0')} · {activeContent.label}
        </p>
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

      <div className="about-changing-gallery">
        <button
          className="about-gallery-preview about-gallery-preview-left"
          type="button"
          onClick={selectPrevious}
          aria-label={`View ${aboutShowcaseSlides[previousIndex].label}`}
        >
          <img src={aboutShowcaseSlides[previousIndex].image} alt="" aria-hidden="true" />
        </button>

        <figure className="about-gallery-feature" key={`image-${activeSlide}`}>
          <img src={activeContent.image} alt={activeContent.alt} />
          <figcaption>
            <span>{activeContent.label}</span>
            <span>
              {String(activeSlide + 1).padStart(2, '0')} / {String(aboutShowcaseSlides.length).padStart(2, '0')}
            </span>
          </figcaption>
        </figure>

        <button
          className="about-gallery-preview about-gallery-preview-right"
          type="button"
          onClick={selectNext}
          aria-label={`View ${aboutShowcaseSlides[nextIndex].label}`}
        >
          <img src={aboutShowcaseSlides[nextIndex].image} alt="" aria-hidden="true" />
        </button>

        <div className="about-gallery-arrows">
          <button type="button" onClick={selectPrevious} aria-label="Previous About story">
            <ArrowLeft size={18} />
          </button>
          <button type="button" onClick={selectNext} aria-label="Next About story">
            <ArrowRight size={18} />
          </button>
        </div>
      </div>

      <div className="about-gallery-dots" aria-label="Choose an About story">
        {aboutShowcaseSlides.map((slide, index) => (
          <button
            key={slide.label}
            type="button"
            className={index === activeSlide ? 'is-active' : ''}
            onClick={() => setActiveSlide(index)}
            aria-label={`Show ${slide.label}`}
            aria-pressed={index === activeSlide}
          >
            <span>{String(index + 1).padStart(2, '0')}</span>
          </button>
        ))}
      </div>
    </section>
  );
}

export default AboutChangingShowcase;
