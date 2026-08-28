import React from 'react';
import { Building2, MapPin, Phone, ExternalLink, Star, ShieldCheck } from 'lucide-react';

export function MustVisitFrame({ onNavigate }) {
  return (
    <div className="frame-view-wrapper">
      {/* Frame Hero Banner */}
      <div className="frame-header-banner">
        <div className="frame-header-container">
          <div className="frame-title-lockup">
            <span className="frame-tag-eyebrow">REGIONAL TOURISM PARTNERS</span>
            <h1 className="frame-main-title">MUST VISIT & AFFILIATED DESTINATIONS</h1>
            <p className="frame-lead-desc">
              Discover top-rated accommodations, hotels, and attractions in Tacurong City and the greater Sultan Kudarat province.
            </p>
          </div>
        </div>
      </div>

      <div className="frame-content-container">
        {/* Featured Partner: Wyattel Hotel */}
        <div className="partner-featured-card">
          <div className="partner-media-col">
            <img
              src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80"
              alt="Wyattel Hotel Tacurong City"
              className="partner-img"
            />
            <span className="partner-badge">Official Hotel Partner</span>
          </div>

          <div className="partner-content-col">
            <span className="partner-tag">PREMIUM ACCOMMODATION</span>
            <h3 className="partner-name">Wyattel Hotel</h3>
            <h4 className="partner-subtitle">Premier Hospitality & Comfortable Suites in Tacurong City</h4>
            <p className="partner-desc">
              Looking for a comfortable, modern hotel stay during your visit to Sultan Kudarat? Wyattel Hotel offers cozy guest suites, air-conditioned rooms, delicious dining, and warm local hospitality — located just minutes away from Qetsiyah Eco Park.
            </p>

            <div className="partner-perks-list">
              <div className="partner-perk-item">
                <Star size={15} className="perk-icon" />
                <span>Modern Air-Conditioned Rooms & Executive Suites</span>
              </div>
              <div className="partner-perk-item">
                <ShieldCheck size={15} className="perk-icon" />
                <span>Convenient Location in Downtown Tacurong City</span>
              </div>
              <div className="partner-perk-item">
                <Building2 size={15} className="perk-icon" />
                <span>Ideal for Tourists, Event Guests & Business Travelers</span>
              </div>
            </div>

            <div className="partner-action-row">
              <a
                href="#booking"
                className="partner-inquire-btn"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('home');
                  setTimeout(() => {
                    const el = document.querySelector('#booking');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                }}
              >
                <span>INQUIRE VIA QETSIYAH RECEPTION</span>
                <ExternalLink size={14} />
              </a>
            </div>
          </div>
        </div>

        {/* Affiliate Placeholder Slot */}
        <div className="partner-placeholder-card">
          <Building2 size={36} className="placeholder-icon" />
          <div className="placeholder-text">
            <h4>Affiliated Tourism & Business Partner Slot</h4>
            <p>
              Are you a local business, resort, or tourism partner in Sultan Kudarat? Partner with Qetsiyah Eco Park to showcase your establishment here.
            </p>
          </div>
          <button
            className="placeholder-btn"
            onClick={() => {
              onNavigate('home');
              setTimeout(() => {
                const el = document.querySelector('#booking');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }, 100);
            }}
          >
            INQUIRE FOR PARTNERSHIP
          </button>
        </div>
      </div>
    </div>
  );
}

export default MustVisitFrame;
