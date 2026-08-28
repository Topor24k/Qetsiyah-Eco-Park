import React from 'react';

export function WelcomeSection() {
  return (
    <section className="welcome-banner-section" id="about">
      <div className="welcome-banner-container">
        {/* Primary Organic Botanical Blob Shape on Left */}
        <div className="welcome-blob-primary" aria-hidden="true">
          <svg viewBox="0 0 200 200" fill="currentColor">
            <path d="M43.3,-74.6C56.6,-67.7,68.2,-56.9,76.3,-43.7C84.4,-30.5,89.1,-15.3,87.7,-0.8C86.3,13.6,78.9,27.3,70.2,40.1C61.5,52.8,51.6,64.7,39.1,72.3C26.7,79.9,11.8,83.2,-2.6,87.7C-17,92.2,-30.9,98,-44.3,92.6C-57.7,87.2,-70.6,70.7,-78.6,53.4C-86.6,36.1,-89.7,18.1,-87.6,1.2C-85.5,-15.7,-78.3,-31.3,-68.8,-45.5C-59.3,-59.6,-47.6,-72.2,-33.8,-78.8C-20,-85.4,-4.1,-86,9.8,-82.9C23.7,-79.8,30,-73.1,43.3,-74.6Z" transform="translate(100 100)" />
          </svg>
        </div>

        {/* Secondary Balanced Blob Shape on Top-Right Corner */}
        <div className="welcome-blob-secondary" aria-hidden="true">
          <svg viewBox="0 0 200 200" fill="currentColor">
            <path d="M44.5,-76.3C57.4,-68.9,67.8,-56.6,75.4,-42.6C83,-28.6,87.7,-12.9,86.4,2.3C85.1,17.4,77.7,32,68.4,44.7C59.1,57.4,47.9,68.2,34.8,74.7C21.7,81.2,6.7,83.4,-8.1,82.4C-22.9,81.4,-37.5,77.2,-49.8,69.4C-62.1,61.6,-72.1,50.2,-78.2,36.8C-84.3,23.4,-86.5,8,-84.7,-6.8C-82.9,-21.6,-77.1,-35.8,-67.7,-47.7C-58.3,-59.6,-45.3,-69.2,-31.6,-75.7C-17.9,-82.2,-3.5,-85.6,9.7,-84.7C22.9,-83.8,31.6,-83.7,44.5,-76.3Z" transform="translate(100 100)" />
          </svg>
        </div>

        {/* Main Content Layout */}
        <div className="welcome-banner-inner">
          {/* Sub-Text Placement: Positioned cleanly on left without colliding */}
          <div className="welcome-supporting-block">
            <span className="welcome-eyebrow-tag">EVERY MOMENT MATTERS</span>
            <div className="welcome-supporting-lines">
              <div className="supporting-line-item">
                <span className="supporting-accent-dash">—</span>
                <span>PRIVATE EVENTS.</span>
              </div>
              <div className="supporting-line-item">
                <span className="supporting-accent-dash">—</span>
                <span>FAMILY GATHERINGS & PARTIES.</span>
              </div>
              <div className="supporting-line-item">
                <span className="supporting-accent-dash">—</span>
                <span>MILESTONES, OR EVEN JUST FOR FUN.</span>
              </div>
            </div>
          </div>

          {/* Headline: Consistently right-aligned on the exact same edge */}
          <div className="welcome-headline-block">
            <h2 className="welcome-headline-title">
              <span className="headline-row">ALL ARE</span>
              <span className="headline-row">WELCOME</span>
              <span className="headline-row">HERE.</span>
            </h2>
          </div>
        </div>
      </div>
    </section>
  );
}

export default WelcomeSection;
