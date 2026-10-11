import React from 'react';
import { ArrowRight } from 'lucide-react';
import { momentsTeaser } from '../../data/parkInfo';
import { Lines } from '../ui/Lines';

// A slow strip of real park photographs, like frames of film, leading into
// the gallery. The strip is rendered twice so the drift loops seamlessly.
export function MomentsTeaser({ onNavigate }) {
  const openGallery = () => onNavigate && onNavigate('gallery');

  return (
    <section className="section section--black moments" id="moments" aria-labelledby="moments-title">
      <div className="shell">
        <header className="section-head">
          <p className="section-head-label label" data-reveal="fade">
            <span className="num">02</span>
            <span>Park moments</span>
          </p>
          <Lines
            id="moments-title"
            className="display display-xl section-head-title"
            lines={['Seen at', { text: 'Qetsiyah', className: 'accent' }]}
          />
        </header>
      </div>

      <div className="film" data-reveal="fade">
        <div className="film-track">
          {[0, 1].map((copy) => (
            <div className="film-set" key={copy} aria-hidden={copy === 1 ? 'true' : undefined}>
              {momentsTeaser.map((moment) => (
                <button
                  key={`${copy}-${moment.image}`}
                  type="button"
                  className={`film-frame ${moment.wide ? 'is-wide' : ''}`}
                  onClick={openGallery}
                  tabIndex={copy === 1 ? -1 : 0}
                  aria-label={`${moment.label}: open the photo gallery`}
                >
                  <img
                    src={`${moment.image}-640.webp`}
                    alt={moment.alt}
                    loading="lazy"
                    decoding="async"
                  />
                  <span className="label film-label">{moment.label}</span>
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="shell moments-foot" data-reveal>
        <p className="body">
          Sunsets from the lawn, flower fields in bloom, and celebrations under the lights. All photographed at the park.
        </p>
        <div className="moments-actions">
          <span className="label label-dim">120 photos · six collections</span>
          <button type="button" className="link-arrow" onClick={openGallery}>
            Open the gallery
            <ArrowRight size={14} aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
}

export default MomentsTeaser;
