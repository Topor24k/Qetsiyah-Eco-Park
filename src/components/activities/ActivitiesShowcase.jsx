import React, { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { parkActivities, parkCourts, parkInfo } from '../../data/parkInfo';
import { QuickNav } from '../shared/QuickNav';
import { Lines } from '../ui/Lines';
import { Media } from '../ui/Media';

// Tabs in the sticky bar: the six activities, then the courts.
const activityTabs = [
  ...parkActivities.map((activity) => ({ id: activity.id, label: activity.name })),
  { id: parkCourts.id, label: 'Courts' }
];

const matches = (query, ...texts) => texts.some((text) => text.toLowerCase().includes(query));

// The activities guide below the opening film. Each entry's id matches the
// anchors used by the "What we offer" panel, so those links land on the
// right activity.
export function ActivitiesShowcase({ onNavigate }) {
  const [query, setQuery] = useState('');
  const [activeId, setActiveId] = useState(parkActivities[0].id);

  const normalizedQuery = query.trim().toLowerCase();
  const visibleActivities = parkActivities.filter(
    (activity) => !normalizedQuery || matches(normalizedQuery, activity.name, activity.kicker)
  );
  const showCourts =
    !normalizedQuery || matches(normalizedQuery, parkCourts.name, parkCourts.kicker, 'courts');
  const resultCount = visibleActivities.length + (showCourts ? 1 : 0);

  const goToBooking = () => onNavigate && onNavigate('home', '#booking');

  const jumpTo = (id) => {
    setActiveId(id);
    if (onNavigate) onNavigate('activities', `#${id}`);
  };

  // Highlight the tab for whichever activity is crossing the upper part of
  // the screen.
  useEffect(() => {
    if (!('IntersectionObserver' in window)) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: '-30% 0px -60% 0px' }
    );

    document.querySelectorAll('.act, .courts').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [normalizedQuery]);

  return (
    <section className="section acts" id="activities-guide" aria-label="Activities and rides">
      <QuickNav
        items={activityTabs}
        activeId={activeId}
        onJump={jumpTo}
        query={query}
        onQueryChange={setQuery}
        resultCount={resultCount}
        placeholder="Search activities"
        searchLabel="Search activities"
        ariaLabel="Activity search and shortcuts"
        singular="activity"
        plural="activities"
        centered
      />

      {normalizedQuery && resultCount === 0 && (
        <div className="shell menu-empty" role="status">
          <p className="display display-md">Nothing matches “{query.trim()}”.</p>
          <p className="body">Try a shorter word, like “zip”, “boat”, or “pool”.</p>
          <button type="button" className="link-arrow" onClick={() => setQuery('')}>
            Show all activities
          </button>
        </div>
      )}

      {visibleActivities.length > 0 && (
        <div className="shell acts-list">
          {visibleActivities.map((activity, index) => {
            const number = parkActivities.indexOf(activity) + 1;

            return (
              <article
                key={activity.id}
                id={activity.id}
                className={`act act--${activity.orientation} ${index % 2 === 1 ? 'act--flip' : ''}`}
              >
                <Media
                  base={activity.image}
                  widths={[560, 1000]}
                  sizes="(max-width: 900px) 100vw, 52vw"
                  alt={activity.alt}
                  className="act-media"
                  parallax
                />

                <div className="act-copy">
                  <span className="display act-num" aria-hidden="true" data-reveal="fade">
                    {String(number).padStart(2, '0')}
                  </span>
                  <p className="label accent" data-reveal="fade">{activity.kicker}</p>
                  <Lines as="h2" className="display act-name" lines={[activity.name]} />
                  <p className="body" data-reveal style={{ '--d': '120ms' }}>{activity.blurb}</p>
                  <button type="button" className="link-arrow" onClick={goToBooking} data-reveal style={{ '--d': '200ms' }}>
                    Add to my visit
                    <ArrowRight size={14} aria-hidden="true" />
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      )}

      {showCourts && (
        <article className="courts" id={parkCourts.id}>
          <span id={parkCourts.secondaryId} className="courts-anchor" aria-hidden="true" />
          <Media
            base={parkCourts.image}
            widths={[560, 1000]}
            sizes="100vw"
            alt={parkCourts.alt}
            className="courts-media"
            parallax
          />
          <div className="courts-copy shell">
            <p className="label accent" data-reveal="fade">{parkCourts.kicker}</p>
            <Lines as="h2" className="display display-xl" lines={['Tennis &', 'Basketball']} />
            <p className="body" data-reveal>{parkCourts.blurb}</p>
          </div>
        </article>
      )}

      <aside className="section section--accent cta-band">
        <div className="shell cta-band-grid">
          <Lines as="h2" className="display display-lg" lines={['Ready when', 'you are.']} />
          <div className="cta-band-copy" data-reveal>
            <p className="body">
              Entrance is {parkInfo.entrance.label.toLowerCase()}; rides have their own separate fees. Tell us which
              activities you want and we will prepare for your group.
            </p>
            <button type="button" className="btn btn--ink" onClick={goToBooking}>
              <span>Plan my visit</span>
              <ArrowRight size={16} aria-hidden="true" />
            </button>
          </div>
        </div>
      </aside>
    </section>
  );
}

export default ActivitiesShowcase;
