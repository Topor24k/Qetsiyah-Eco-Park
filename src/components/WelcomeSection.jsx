import React from 'react';
import { Lines } from './ui/Lines';

const welcomeLines = [
  'Private events.',
  'Family gatherings & parties.',
  'Milestones, or even just for fun.'
];

// One idea, set as large as the page allows, on the accent color.
export function WelcomeSection() {
  return (
    <section className="section section--accent statement" id="welcome" aria-labelledby="welcome-title">
      <div className="shell statement-grid">
        <p className="label statement-label" data-reveal="fade">Every moment matters</p>

        <ul className="statement-list">
          {welcomeLines.map((line, index) => (
            <li key={line} data-reveal style={{ '--d': `${index * 110}ms` }}>
              <span className="label num">{String(index + 1).padStart(2, '0')}</span>
              <span className="label">{line}</span>
            </li>
          ))}
        </ul>

        <Lines
          id="welcome-title"
          className="display statement-title"
          lines={['All are', 'welcome', 'here.']}
        />
      </div>
    </section>
  );
}

export default WelcomeSection;
