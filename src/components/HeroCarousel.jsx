import React, { useState, useEffect, useCallback } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export function HeroCarousel({ title, items, onNavigate }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const total = items.length;

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => prev + 1);
  }, []);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => prev - 1);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev]);

  // Compute circular slot offset for continuous infinite animation
  const getOffset = (itemIndex) => {
    const diff = ((itemIndex - (currentIndex % total)) % total + total) % total;
    if (diff > total / 2) {
      return diff - total;
    }
    return diff;
  };

  return (
    <section className="showcase-hero">
      {/* Giant Background Title */}
      <h1 className="showcase-bg-title">{title}</h1>

      {/* Animated Carousel Stage */}
      <div className="showcase-stage">
        <div className="showcase-carousel-track">
          {items.map((item, idx) => {
            const offset = getOffset(idx);

            let slotClass = 'slot-hidden';
            if (offset === 0) slotClass = 'slot-center';
            else if (offset === -1) slotClass = 'slot-left';
            else if (offset === 1) slotClass = 'slot-right';
            else if (offset < -1) slotClass = 'slot-hidden-left';
            else if (offset > 1) slotClass = 'slot-hidden-right';

            return (
              <div
                key={item.id}
                className={`showcase-card-wrapper ${slotClass}`}
                onClick={() => {
                  if (offset === -1) handlePrev();
                  if (offset === 1) handleNext();
                }}
              >
                <div className="showcase-frame">
                  <img src={item.image} alt={item.label} loading="lazy" />
                </div>
                <span className="showcase-label">{item.label}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Subtle Edge Arrows */}
      <button
        className="showcase-arrow showcase-arrow-left"
        onClick={handlePrev}
        aria-label="Previous item"
      >
        <ArrowLeft size={22} />
      </button>
      <button
        className="showcase-arrow showcase-arrow-right"
        onClick={handleNext}
        aria-label="Next item"
      >
        <ArrowRight size={22} />
      </button>
    </section>
  );
}

export default HeroCarousel;
