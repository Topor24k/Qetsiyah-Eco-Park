import React, { useState } from 'react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';

// Numbered editorial index used by Stays & Venues and Services. Hovering or
// focusing a row swaps the photograph beside it; every row leads to the
// booking form. Row ids match the "What we offer" anchors.
export function OfferingsIndex({
  id,
  label,
  items,
  visuals = [],
  footnote,
  ctaLabel = 'Send an inquiry',
  onNavigate
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const goToBooking = () => onNavigate && onNavigate('home', '#booking');
  const total = String(items.length).padStart(2, '0');

  // Rows without their own photo fall back to the section's scenic set.
  const frames = items
    .map((item, index) =>
      item.image
        ? { base: item.image, widths: [640, 1100] }
        : visuals[index % Math.max(1, visuals.length)]
    )
    .filter(Boolean);

  return (
    <section className="section offer" id={id} aria-label={label}>
      <div className="shell">
        <div className="offer-body">
          <div className="offer-stage" aria-hidden="true" data-reveal="clip">
            {frames.map((frame, index) => (
              <img
                key={`${frame.base}-${index}`}
                className={`offer-stage-img ${index === activeIndex ? 'is-active' : ''}`}
                src={`${frame.base}-${frame.widths[0]}.webp`}
                srcSet={frame.widths.map((width) => `${frame.base}-${width}.webp ${width}w`).join(', ')}
                sizes="(max-width: 900px) 100vw, 42vw"
                alt=""
                loading="lazy"
                decoding="async"
              />
            ))}
            <span className="label num offer-stage-count">
              {String(activeIndex + 1).padStart(2, '0')} / {total}
            </span>
          </div>

          <ol className="offer-list">
            {items.map((item, index) => (
              <li
                key={item.id}
                id={item.id}
                className={`offer-row ${index === activeIndex ? 'is-active' : ''}`}
                onMouseEnter={() => setActiveIndex(index)}
                data-reveal
                style={{ '--d': `${index * 70}ms` }}
              >
                <button
                  type="button"
                  className="offer-btn"
                  onFocus={() => setActiveIndex(index)}
                  onClick={goToBooking}
                  aria-label={`${item.name}: send an inquiry`}
                >
                  <span className="label num offer-num" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                  <span className="offer-text">
                    <span className="display offer-name">{item.name}</span>
                    <span className="offer-note">{item.note}</span>
                  </span>
                  <ArrowUpRight size={22} className="offer-arrow" aria-hidden="true" />
                </button>
              </li>
            ))}
          </ol>
        </div>

        <div className="offer-foot" data-reveal>
          {footnote && <p className="offer-footnote">{footnote}</p>}
          <button type="button" className="btn" onClick={goToBooking}>
            <span>{ctaLabel}</span>
            <ArrowRight size={16} aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
}

export default OfferingsIndex;
