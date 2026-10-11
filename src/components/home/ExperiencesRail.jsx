import React, { useState } from 'react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { parkActivities } from '../../data/parkInfo';
import { Lines } from '../ui/Lines';

const photoSrcSet = (base) => `${base}-560.webp 560w, ${base}-1000.webp 1000w`;

// Home index of the park's activities. Desktop: a hairline list of oversized
// names, with the photograph beside it changing to match the row in focus.
// Phone: the rows become a swipeable rail of photo cards.
export function ExperiencesRail({ onNavigate }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const total = String(parkActivities.length).padStart(2, '0');

  const openActivity = (event, activityId) => {
    event.preventDefault();
    if (onNavigate) onNavigate('activities', `#${activityId}`);
  };

  return (
    <section className="section exp" id="experiences" aria-labelledby="experiences-title">
      <div className="shell">
        <header className="section-head">
          <p className="section-head-label label" data-reveal="fade">
            <span className="num">01</span>
            <span>Things to do</span>
          </p>
          <Lines
            id="experiences-title"
            className="display display-lg section-head-title"
            lines={['Six ways to', { text: 'spend the day', className: 'accent' }]}
          />
          <p className="body section-head-aside" data-reveal>
            From the zip line deck to the kiddy pool. Pick your pace, or try them all before sunset.
          </p>
        </header>

        <div className="exp-body">
          <ol className="exp-list">
            {parkActivities.map((activity, index) => (
              <li
                key={activity.id}
                className={`exp-row ${index === activeIndex ? 'is-active' : ''}`}
                data-reveal
                style={{ '--d': `${index * 70}ms` }}
              >
                <a
                  href={`#${activity.id}`}
                  className="exp-link"
                  onMouseEnter={() => setActiveIndex(index)}
                  onFocus={() => setActiveIndex(index)}
                  onClick={(event) => openActivity(event, activity.id)}
                >
                  <span className="exp-media">
                    <img
                      src={`${activity.image}-560.webp`}
                      srcSet={photoSrcSet(activity.image)}
                      sizes="78vw"
                      alt={activity.alt}
                      loading="lazy"
                      decoding="async"
                    />
                  </span>
                  <span className="label num exp-num">{String(index + 1).padStart(2, '0')}</span>
                  <span className="display exp-name">{activity.name}</span>
                  <span className="label label-dim exp-kicker">{activity.kicker}</span>
                  <span className="exp-blurb">{activity.blurb}</span>
                  <ArrowUpRight size={22} className="exp-arrow" aria-hidden="true" />
                </a>
              </li>
            ))}
          </ol>

          <div className="exp-stage" aria-hidden="true" data-reveal="clip">
            {parkActivities.map((activity, index) => (
              <img
                key={activity.id}
                className={`exp-stage-img ${index === activeIndex ? 'is-active' : ''}`}
                src={`${activity.image}-1000.webp`}
                srcSet={photoSrcSet(activity.image)}
                sizes="40vw"
                alt=""
                loading="lazy"
                decoding="async"
              />
            ))}
            <div className="exp-stage-caption">
              <span className="label num">
                {String(activeIndex + 1).padStart(2, '0')} / {total}
              </span>
              <p key={activeIndex}>{parkActivities[activeIndex].blurb}</p>
            </div>
          </div>
        </div>

        <div className="exp-foot" data-reveal>
          <span className="label label-dim exp-hint">Swipe to explore</span>
          <a
            className="link-arrow"
            href="#activities"
            onClick={(event) => {
              event.preventDefault();
              if (onNavigate) onNavigate('activities');
            }}
          >
            See all activities
            <ArrowRight size={14} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}

export default ExperiencesRail;
