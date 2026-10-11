import React from 'react';
import { ArrowRight } from 'lucide-react';

// Title card for pages that are still on the way. Keeps the "Coming Soon"
// headline, and gives visitors somewhere to go next instead of a dead end.
export function ComingSoonPanel({ pageClass, eyebrow, lede, actions = [] }) {
  const [primaryAction, ...otherActions] = actions;

  return (
    <section className={`soon ${pageClass}`}>
      <div className="shell soon-inner">
        {eyebrow && (
          <p className="label soon-eyebrow" data-intro style={{ '--intro-delay': '1000ms' }}>{eyebrow}</p>
        )}

        <h1 className="display soon-title">
          <span className="ln">
            <span data-intro style={{ '--intro-delay': '300ms' }}>Coming</span>
          </span>
          <span className="ln">
            <span data-intro style={{ '--intro-delay': '440ms' }}><span className="accent">Soon</span></span>
          </span>
        </h1>

        <div className="soon-foot" data-intro style={{ '--intro-delay': '1150ms' }}>
          {lede && <p className="body soon-copy">{lede}</p>}

          <div className="soon-actions">
            {primaryAction && (
              <button type="button" className="btn" onClick={primaryAction.onClick}>
                <span>{primaryAction.label}</span>
                <ArrowRight size={16} aria-hidden="true" />
              </button>
            )}
            {otherActions.map((action) => (
              <button key={action.label} type="button" className="link-arrow" onClick={action.onClick}>
                {action.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ComingSoonPanel;
