import React from 'react';
import { MapPin, Phone, Mail, Clock, ArrowUp } from 'lucide-react';

export function Footer({ onNavigate }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="park-site-footer">
      <div className="footer-top-container">
        {/* Column 1: Brand Wordmark & Story (Matches Header Logo) */}
        <div className="footer-brand-col">
          <a 
            href="#home" 
            className="footer-brand-logo-link"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <div className="brand-logo-typeset footer-logo-typeset">
              <div className="brand-header-lockup">
                <span className="brand-letter-q">Q</span>
                <div className="brand-text-stack">
                  <span className="brand-letters-rest">ETSIYAH</span>
                  <div className="brand-eco-row">
                    <span>E</span>
                    <span>C</span>
                    <span>O</span>
                    <span>-</span>
                    <span>P</span>
                    <span>A</span>
                    <span>R</span>
                    <span>K</span>
                  </div>
                </div>
              </div>
              <div className="brand-underline"></div>
            </div>
          </a>

          <p className="footer-brand-desc">
            A sanctuary for nature, adventure, and connection in Barangay Calean, Tacurong City, Sultan Kudarat. Established October 2023.
          </p>
          <div className="footer-badge-tag">
            <span>DOT-ACCREDITED TOURISM RECREATION FACILITY</span>
          </div>
        </div>

        {/* Column 2: What We Offer Links */}
        <div className="footer-links-col">
          <h4 className="footer-col-title">WHAT WE OFFER</h4>
          <ul className="footer-nav-list">
            <li>
              <button onClick={() => onNavigate('activities')}>Activities & Rides</button>
            </li>
            <li>
              <button onClick={() => onNavigate('food-offers')}>Food Offers & Menu</button>
            </li>
            <li>
              <button onClick={() => onNavigate('stays-venues')}>Stays & Venues (Verde Villa)</button>
            </li>
            <li>
              <button onClick={() => onNavigate('services')}>Our Services & Event Hall</button>
            </li>
            <li>
              <button onClick={() => onNavigate('gallery')}>Park Photo Gallery</button>
            </li>
          </ul>
        </div>

        {/* Column 3: Quick Navigation */}
        <div className="footer-links-col">
          <h4 className="footer-col-title">EXPLORE</h4>
          <ul className="footer-nav-list">
            <li>
              <button onClick={() => onNavigate('home')}>Home</button>
            </li>
            <li>
              <button onClick={() => onNavigate('about')}>About Qetsiyah</button>
            </li>
            <li>
              <button onClick={() => onNavigate('announcements')}>Announcements & Advisories</button>
            </li>
            <li>
              <button onClick={() => onNavigate('must-visit')}>Must Visit (Wyattel Hotel)</button>
            </li>
            <li>
              <button onClick={() => {
                onNavigate('home');
                setTimeout(() => {
                  const el = document.querySelector('#booking');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }}>
                Reservation & Booking
              </button>
            </li>
          </ul>
        </div>

        {/* Column 4: Contact & Hours */}
        <div className="footer-links-col">
          <h4 className="footer-col-title">VISIT US</h4>
          <div className="footer-contact-items">
            <p className="footer-contact-line">
              <MapPin size={14} className="footer-icon" />
              <span>Barangay Calean, Tacurong City, Sultan Kudarat</span>
            </p>
            <p className="footer-contact-line">
              <Phone size={14} className="footer-icon" />
              <span>0962 407 4220</span>
            </p>
            <p className="footer-contact-line">
              <Mail size={14} className="footer-icon" />
              <span>qetsiyahecopark@gmail.com</span>
            </p>
            <p className="footer-contact-line">
              <Clock size={14} className="footer-icon" />
              <span>Daily: 8:00 AM – 10:00 PM</span>
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Copyright & Back to Top */}
      <div className="footer-bottom-bar">
        <div className="footer-bottom-container">
          <p className="footer-copy-text">
            © {new Date().getFullYear()} Qetsiyah Eco Park. All rights reserved. Barangay Calean, Tacurong City.
          </p>
          <button className="back-to-top-btn" onClick={scrollToTop} aria-label="Back to Top">
            <span>BACK TO TOP</span>
            <ArrowUp size={14} />
          </button>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
