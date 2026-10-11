import React from 'react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { parkInfo } from '../data/parkInfo';

export function Footer({ onNavigate }) {
  const go = (event, frame, anchor = null) => {
    event.preventDefault();
    onNavigate(frame, anchor);
  };

  return (
    <footer className="footer">
      <div className="shell">
        <div className="footer-top">
          <div className="footer-lead">
            <p className="label label-dim">Est. {parkInfo.established}</p>
            <p className="footer-statement display display-md">
              A relaxing wide place. Perfect for all events and occasions.
            </p>
            <a className="btn" href="#booking" onClick={(e) => go(e, 'home', '#booking')}>
              <span>Book your event</span>
              <ArrowRight size={16} aria-hidden="true" />
            </a>
          </div>

          <nav className="footer-col" aria-label="Experiences">
            <h4 className="label footer-col-title">Experiences</h4>
            <ul>
              <li><a href="#activities" onClick={(e) => go(e, 'activities')}>Activities &amp; Adventure</a></li>
              <li><a href="#food-offers" onClick={(e) => go(e, 'food-offers')}>Cafe &amp; Dining</a></li>
              <li><a href="#stays-venues" onClick={(e) => go(e, 'stays-venues')}>Verde Villa Stays</a></li>
              <li><a href="#services" onClick={(e) => go(e, 'services')}>Exclusive Event Hall</a></li>
              <li><a href="#gallery" onClick={(e) => go(e, 'gallery')}>Photo Gallery</a></li>
            </ul>
          </nav>

          <nav className="footer-col" aria-label="Explore">
            <h4 className="label footer-col-title">Explore</h4>
            <ul>
              <li><a href="#home" onClick={(e) => go(e, 'home', '#home')}>Home</a></li>
              <li><a href="#about" onClick={(e) => go(e, 'about')}>About Qetsiyah</a></li>
              <li><a href="#announcements" onClick={(e) => go(e, 'announcements')}>Announcements</a></li>
              <li><a href="#must-visit" onClick={(e) => go(e, 'must-visit')}>Must Visit (Wyattel Hotel)</a></li>
              <li><a href="#booking" onClick={(e) => go(e, 'home', '#booking')}>Book Your Event</a></li>
            </ul>
          </nav>

          <div className="footer-col">
            <h4 className="label footer-col-title">Visit us</h4>
            <ul>
              <li>{parkInfo.address}</li>
              <li><a href={parkInfo.phoneHref}>{parkInfo.phoneDisplay}</a></li>
              <li><a href={parkInfo.emailHref}>{parkInfo.email}</a></li>
              <li>Daily: {parkInfo.hours.openLabel} – {parkInfo.hours.closeLabel}</li>
              <li>
                <a
                  className="footer-map"
                  href={parkInfo.mapsHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="View Qetsiyah Ecopark on Google Maps"
                >
                  View in Maps
                  <ArrowUpRight size={13} aria-hidden="true" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Oversized brand word, cropped by the page edge. */}
      <div className="footer-word display" aria-hidden="true" data-reveal="lines">
        <span className="ln"><span>Qetsiyah</span></span>
      </div>

      <div className="shell footer-base">
        <p className="label label-dim">
          © {new Date().getFullYear()} Qetsiyah Eco Park. All rights reserved.
        </p>
        <p className="label label-dim">{parkInfo.coordinates.label}</p>
      </div>
    </footer>
  );
}

export default Footer;
