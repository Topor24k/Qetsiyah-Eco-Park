import React from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export function Footer({ onNavigate }) {
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
            A relaxing wide place that is perfect for all events and occasions in Barangay Calean, Tacurong City, Sultan Kudarat. Established October 20, 2023.
          </p>

          {/* Interactive Google Satellite Map Card */}
          <a
            href="https://www.google.com/maps/place/Qetsiyah+Ecopark/@6.6567268,124.6805906,433m/data=!3m1!1e3!4m14!1m7!3m6!1s0x32f80d3f87f6d6e5:0xd47b9e3e2d0f4b2a!2sQetsiyah+Ecopark!8m2!3d6.6564972!4d124.6816161!16s%2Fg%2F11khxzgt7r!3m5!1s0x32f80d3f87f6d6e5:0xd47b9e3e2d0f4b2a!8m2!3d6.6564972!4d124.6816161!16s%2Fg%2F11khxzgt7r?entry=ttu"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-map-card"
            aria-label="View Qetsiyah Ecopark on Google Maps"
          >
            <iframe
              title="Qetsiyah Ecopark Google Satellite Map"
              src="https://maps.google.com/maps?q=6.6564972,124.6816161+(Qetsiyah+Ecopark)&t=k&z=17&ie=UTF8&iwloc=B&output=embed"
              className="footer-map-iframe"
              loading="lazy"
            />
            <div className="footer-map-overlay">
              <span className="footer-map-badge">
                <MapPin size={11} />
                <span>VIEW IN MAPS</span>
              </span>
            </div>
          </a>
        </div>

        {/* Column 2: Quick Links / Offers */}
        <div className="footer-col">
          <h4 className="footer-col-title">EXPERIENCES</h4>
          <ul className="footer-link-list">
            <li><a href="#activities" onClick={(e) => { e.preventDefault(); onNavigate('activities'); }}>Activities & Adventure</a></li>
            <li><a href="#food-offers" onClick={(e) => { e.preventDefault(); onNavigate('food-offers'); }}>Cafe & Dining</a></li>
            <li><a href="#stays-venues" onClick={(e) => { e.preventDefault(); onNavigate('stays-venues'); }}>Verde Villa Stays</a></li>
            <li><a href="#services" onClick={(e) => { e.preventDefault(); onNavigate('services'); }}>Exclusive Event Hall</a></li>
            <li><a href="#gallery" onClick={(e) => { e.preventDefault(); onNavigate('gallery'); }}>Photo Gallery</a></li>
          </ul>
        </div>

        {/* Column 3: Park Navigation */}
        <div className="footer-col">
          <h4 className="footer-col-title">EXPLORE</h4>
          <ul className="footer-link-list">
            <li><a href="#home" onClick={(e) => { e.preventDefault(); onNavigate('home'); }}>Home</a></li>
            <li><a href="#about" onClick={(e) => { e.preventDefault(); onNavigate('about'); }}>About Qetsiyah</a></li>
            <li><a href="#announcements" onClick={(e) => { e.preventDefault(); onNavigate('announcements'); }}>Announcements</a></li>
            <li><a href="#must-visit" onClick={(e) => { e.preventDefault(); onNavigate('must-visit'); }}>Must Visit (Wyattel Hotel)</a></li>
            <li>
              <a 
                href="#contact" 
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('home');
                  setTimeout(() => {
                    const el = document.querySelector('#contact');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }, 80);
                }}
              >
                Book Your Event
              </a>
            </li>
          </ul>
        </div>

        {/* Column 4: Contact & Operations Information */}
        <div className="footer-col footer-col-contact">
          <h4 className="footer-col-title">VISIT US</h4>
          <div className="footer-contact-details">
            <p className="footer-contact-line">
              <MapPin size={14} className="footer-icon" />
              <span>Barangay Calean, Tacurong City, Sultan Kudarat</span>
            </p>
            <p className="footer-contact-line">
              <Phone size={14} className="footer-icon" />
              <span>+63 917 123 4567</span>
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

      {/* Bottom Copyright */}
      <div className="footer-bottom-bar">
        <div className="footer-bottom-container">
          <p className="footer-copy-text">
            © {new Date().getFullYear()} Qetsiyah Eco Park. All rights reserved. Barangay Calean, Tacurong City.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
