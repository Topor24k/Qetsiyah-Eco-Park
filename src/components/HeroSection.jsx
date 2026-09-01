import React from 'react';
import { Calendar } from 'lucide-react';

export function HeroSection({ onNavigate, variant = 'home', isExiting = false, isEntering = false, previousFrame = null }) {
  const isAboutHero = variant === 'about';
  
  const playAboutEntrance = isAboutHero && (previousFrame === 'home' || previousFrame === null);

  const handleCtaClick = (e, frameOrHash) => {
    e.preventDefault();
    if (frameOrHash === '#contact') {
      const el = document.querySelector('#contact');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      } else if (onNavigate) {
        onNavigate('home');
        window.setTimeout(() => {
          document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
        }, 140);
      }
    }
  };

  return (
    <section
      className={`exact-hero-section ${isAboutHero ? 'about-landing-hero' : ''}`}
      id={isAboutHero ? 'about' : 'home'}
    >
      <div className="exact-hero-backdrop">
        <img
          src="/Background Pictures/Background Hero Section II.jpg"
          alt="Qetsiyah Eco Park Landscape at Sunset"
          className="exact-hero-bg-img"
        />
        <div className="tropical-dusk-overlay" />
      </div>

      <div className="hero-content-container">
        {(!isAboutHero || playAboutEntrance) && (
          <div className={`hero-left-box ${(isAboutHero && playAboutEntrance) ? 'about-hero-left-exit' : ''} ${isEntering ? 'home-hero-left-enter' : ''}`}>
            <h1 className="hero-serif-title">
              <span className="hero-title-row">QETSIYAH.</span>
              <span className="hero-title-row">ECO PARK.</span>
            </h1>

            <p className="hero-subheadline">
              A RELAXING WIDE PLACE. PERFECT FOR ALL EVENTS AND OCCASIONS.
            </p>

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
        )}
      </div>

      {(isAboutHero || isExiting) && (
        <div className={`about-us-drop-stage ${isExiting ? 'about-us-drop-exit' : ''}`} aria-label="About Qetsiyah">
          <div className={`about-us-drop-content-wrapper ${playAboutEntrance ? '' : 'about-us-drop-immediate'}`}>
            <h1 className="hero-serif-title about-us-drop-title">
              <span className="hero-title-row">ABOUT QETSIYAH.</span>
            </h1>
            <p className="hero-subheadline about-us-subheadline">
              WHAT THE PARK IS, WHERE IT IS, AND WHAT VISITORS CAN EXPECT.
            </p>
          </div>
        </div>
      )}
    </section>
  );
}

export default HeroSection;
