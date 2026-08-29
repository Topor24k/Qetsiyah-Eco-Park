import React from 'react';

export function ActivitiesFrame({ onNavigate }) {
  return (
    <div className="collection-hero-page" id="activities">
      {/* Top Center Emblem Badge Lockup */}
      <div className="collection-top-border-bar">
        <div className="collection-center-emblem-badge">
          {/* Menu / Divider Icon Cell */}
          <div className="badge-cell badge-menu-cell">
            <span className="menu-bars-icon">
              <span className="bar"></span>
              <span className="bar"></span>
              <span className="bar"></span>
            </span>
          </div>

          {/* Monogram Shield Emblem Cell */}
          <div className="badge-cell badge-shield-cell">
            <div className="shield-monogram-box">
              <svg viewBox="0 0 100 100" className="shield-svg" aria-label="Qetsiyah Monogram Shield">
                <path 
                  d="M 50 18 C 72 18 82 26 82 48 C 82 72 50 86 50 86 C 50 86 18 72 18 48 C 18 26 28 18 50 18 Z" 
                  fill="none" 
                  stroke="#635d50" 
                  strokeWidth="3" 
                />
                <text x="50" y="58" textAnchor="middle" fill="#635d50" fontSize="30" fontFamily="Cinzel, 'Playfair Display', serif" fontWeight="700">Q</text>
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Main Center Display Typography */}
      <div className="collection-hero-content">
        <h1 className="collection-hero-title">
          <span className="title-line-top">DISCOVER</span>
          <span className="title-line-bottom">ALL OUR ACTIVITIES</span>
        </h1>
      </div>
    </div>
  );
}

export default ActivitiesFrame;
