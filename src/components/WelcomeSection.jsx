import React from 'react';
import { Lines } from './ui/Lines';

const welcomeLines = [
  'Private events.',
  'Family gatherings & parties.',
  'Milestones, or even just for fun.'
];

const titleLines = ['All are', 'welcome', 'here.'];

// One idea, set as large as the page allows, on the accent color.
export function WelcomeSection() {
  return (
    <section className="section section--accent statement" id="welcome" aria-labelledby="welcome-title">
      <div className="shell statement-grid">
        <p className="label statement-label" data-reveal="fade">Every moment matters</p>

        <div className="statement-row">
          {/* An invisible copy of the headline's first line. It holds that
              line's exact space, so the list sits beside "All are" when there
              is room and moves above it when there is not. */}
          <span className="display statement-ghost" aria-hidden="true">{titleLines[0]}</span>

          <ul className="statement-list">
            {welcomeLines.map((line, index) => (
              <li key={line} data-reveal style={{ '--d': `${index * 110}ms` }}>
                <span className="label num">{String(index + 1).padStart(2, '0')}</span>
                <span className="label">{line}</span>
              </li>
            ))}
          </ul>
        </div>

        <Lines
          id="welcome-title"
          className="display statement-title"
          lines={titleLines}
        />
      </div>
    </section>
  );
}

export default WelcomeSection;
