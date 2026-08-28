import React from 'react';
import { Calendar, Compass } from 'lucide-react';

export function HeroSection({ onNavigate }) {
  const handleCtaClick = (e, frameOrHash) => {
    e.preventDefault();
    if (frameOrHash === '#contact') {
      const el = document.querySelector('#contact');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (frameOrHash === 'activities') {
      if (onNavigate) onNavigate('activities');
    }
  };

  return (
    <section className="exact-hero-section" id="home">
      {/* Background Picture from /Background Pictures/ folder */}
      <div className="exact-hero-backdrop">
        <img
          src="/Background Pictures/Landing Page Hero Section.png"
          alt="Qetsiyah Eco Park Landing Page Hero"
          className="exact-hero-bg-img"
        />
        <div className="tropical-dusk-overlay" />
      </div>

      {/* Hero Center Layout */}
      <div className="hero-content-container">
        {/* Center Grand Display Typography & CTA */}
        <div className="hero-center-box">
          <h1 className="hero-serif-title">
            QETSIYAH<br />
            ECO PARK
          </h1>
          
          <p className="hero-clean-tagline">
            A relaxing wide place that is perfect for all events and occasions
          </p>

          {/* Call-to-Action Buttons */}
          <div className="hero-cta-button-group">
            <a
              href="#contact"
              className="hero-cta-btn hero-cta-primary"
              onClick={(e) => handleCtaClick(e, '#contact')}
            >
              <Calendar size={16} />
              <span>BOOK YOUR EVENT</span>
            </a>
            <a
              href="#activities"
              className="hero-cta-btn hero-cta-secondary"
              onClick={(e) => handleCtaClick(e, 'activities')}
            >
              <Compass size={16} />
              <span>EXPLORE WHAT WE OFFER</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
