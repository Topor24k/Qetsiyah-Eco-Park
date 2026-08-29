import React from 'react';
import { Calendar } from 'lucide-react';

export function HeroSection({ onNavigate }) {
  const handleCtaClick = (e, frameOrHash) => {
    e.preventDefault();
    if (frameOrHash === '#contact') {
      const el = document.querySelector('#contact');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section className="exact-hero-section" id="home">
      {/* Background Hero Section II from /Background Pictures/ folder */}
      <div className="exact-hero-backdrop">
        <img
          src="/Background Pictures/Background Hero Section II.jpg"
          alt="Qetsiyah Eco Park Landscape at Sunset"
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

          {/* Call-to-Action Button */}
          <div className="hero-cta-button-group">
            <a
              href="#contact"
              className="hero-cta-btn hero-cta-primary"
              onClick={(e) => handleCtaClick(e, '#contact')}
            >
              <Calendar size={16} />
              <span>BOOK YOUR EVENT</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
