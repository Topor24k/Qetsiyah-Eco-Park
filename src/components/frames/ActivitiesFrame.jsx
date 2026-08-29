import React from 'react';
import { Menu, Shield, Compass, Sparkles } from 'lucide-react';

export function ActivitiesFrame({ onNavigate }) {
  return (
    <div className="collection-hero-page" id="activities">
      {/* Top Classical Architectural Double Border with Center Emblem Lockup */}
      <div className="collection-top-border-bar">
        <div className="border-line-left">
          <span className="line-outer"></span>
          <span className="line-inner"></span>
        </div>

        {/* Top Center 3-Compartment Emblem Badge Lockup (From Reference Image) */}
        <div className="collection-center-emblem-badge">
          {/* Left Cell: Circular Park Seal */}
          <div className="badge-cell badge-seal-cell">
            <div className="circular-seal-icon">
              <svg viewBox="0 0 100 100" className="seal-svg" aria-label="Qetsiyah Seal">
                <circle cx="50" cy="50" r="44" fill="none" stroke="#635d50" strokeWidth="2.5" strokeDasharray="3 3" />
                <circle cx="50" cy="50" r="38" fill="none" stroke="#635d50" strokeWidth="1.5" />
                <text x="50" y="32" textAnchor="middle" fill="#635d50" fontSize="8" fontWeight="800" letterSpacing="2">QETSIYAH</text>
                <text x="50" y="74" textAnchor="middle" fill="#635d50" fontSize="7" fontWeight="700" letterSpacing="1.5">ECO PARK</text>
                <path d="M 50 40 L 53 48 L 62 48 L 55 53 L 57 61 L 50 56 L 43 61 L 45 53 L 38 48 L 47 48 Z" fill="#635d50" />
              </svg>
            </div>
          </div>

          {/* Center Cell: Menu / Divider Icon */}
          <div className="badge-cell badge-menu-cell">
            <span className="menu-bars-icon">
              <span className="bar"></span>
              <span className="bar"></span>
              <span className="bar"></span>
            </span>
          </div>

          {/* Right Cell: Monogram Shield Emblem */}
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

        <div className="border-line-right">
          <span className="line-outer"></span>
          <span className="line-inner"></span>
        </div>
      </div>

      {/* Main Center Display Typography */}
      <div className="collection-hero-content">
        <h1 className="collection-hero-title">
          <span className="title-line-top">DISCOVER</span>
          <span className="title-line-bottom">ALL OUR ACTIVITIES</span>
        </h1>
      </div>

      {/* Bottom Classical Architectural Double Border */}
      <div className="collection-bottom-border-bar">
        <span className="line-inner"></span>
        <span className="line-outer"></span>
      </div>
    </div>
  );
}

export default ActivitiesFrame;
