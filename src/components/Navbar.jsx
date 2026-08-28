import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, Menu, X } from 'lucide-react';

export function Navbar({ activeFrame, onNavigate }) {
  const [scrollRatio, setScrollRatio] = useState(0);
  const [activeMegaMenu, setActiveMegaMenu] = useState(null); // 'offers' | 'must-visit' | null
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileOffersOpen, setMobileOffersOpen] = useState(false);
  const [mobileMustVisitOpen, setMobileMustVisitOpen] = useState(false);

  const navRef = useRef(null);

  // Calculates smooth fade-in of the olive background only as you scroll away from Home
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.pageYOffset || document.documentElement.scrollTop || window.scrollY || 0;
      const fadeDistance = 240;
      const ratio = Math.min(Math.max((scrollY - 20) / fadeDistance, 0), 1);
      setScrollRatio(ratio);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Close mega menu on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setActiveMegaMenu(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const closeAll = () => {
    setActiveMegaMenu(null);
    setMobileMenuOpen(false);
  };

  const handleNavClick = (e, frameName, scrollTarget = null) => {
    e.preventDefault();
    closeAll();

    if (onNavigate) {
      onNavigate(frameName);
    }

    if (scrollTarget) {
      setTimeout(() => {
        const el = document.querySelector(scrollTarget);
        if (el) {
          const headerOffset = 72;
          const pos = el.getBoundingClientRect().top + window.pageYOffset - headerOffset;
          window.scrollTo({ top: Math.max(0, pos), behavior: 'smooth' });
        } else if (scrollTarget === '#home') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }, 80);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const isHome = activeFrame === 'home';
  const isScrolled = scrollRatio > 0.05;
  const showSolidNav = !isHome || isScrolled;

  return (
    <header
      ref={navRef}
      className={`primary-nav-header ${showSolidNav ? 'is-scrolled' : 'is-at-top'}`}
      style={{
        backgroundColor: showSolidNav ? '#383e24' : `rgba(56, 62, 36, ${scrollRatio})`,
        borderBottomColor: showSolidNav ? 'rgba(255, 255, 255, 0.12)' : `rgba(255, 255, 255, ${0.12 * scrollRatio})`,
        boxShadow: showSolidNav ? '0 4px 20px rgba(0, 0, 0, 0.35)' : 'none',
        padding: showSolidNav ? '14px 0' : '24px 0 10px'
      }}
      onMouseLeave={() => setActiveMegaMenu(null)}
    >
      <div className="primary-nav-container">
        {/* Left: Typeset Qetsiyah Logo */}
        <a href="#home" className="qetsiyah-brand-logo" onClick={(e) => handleNavClick(e, 'home', '#home')}>
          <div className="brand-logo-typeset">
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

        {/* Desktop Primary Navigation Links */}
        <nav className="desktop-nav-links">
          {/* 1. Home */}
          <a
            href="#home"
            className={`primary-nav-link ${isHome ? 'active' : ''}`}
            onMouseEnter={() => setActiveMegaMenu(null)}
            onClick={(e) => handleNavClick(e, 'home', '#home')}
          >
            HOME
          </a>

          {/* 2. About (Dedicated Frame) */}
          <a
            href="#about"
            className={`primary-nav-link ${activeFrame === 'about' ? 'active' : ''}`}
            onMouseEnter={() => setActiveMegaMenu(null)}
            onClick={(e) => handleNavClick(e, 'about')}
          >
            ABOUT
          </a>

          {/* 3. WHAT WE OFFER (Full Width Mega Menu Trigger) */}
          <div
            className="nav-dropdown-item"
            onMouseEnter={() => setActiveMegaMenu('offers')}
          >
            <button
              className={`primary-nav-link dropdown-trigger ${
                ['activities', 'food-offers', 'stays-venues', 'services', 'gallery'].includes(activeFrame) || activeMegaMenu === 'offers'
                  ? 'active'
                  : ''
              }`}
              onClick={() => setActiveMegaMenu(activeMegaMenu === 'offers' ? null : 'offers')}
              aria-expanded={activeMegaMenu === 'offers'}
            >
              <span>WHAT WE OFFER</span>
              <ChevronDown size={13} className={`chevron-arrow ${activeMegaMenu === 'offers' ? 'open' : ''}`} />
            </button>
          </div>

          {/* 4. Announcements */}
          <a
            href="#announcements"
            className={`primary-nav-link ${activeFrame === 'announcements' ? 'active' : ''}`}
            onMouseEnter={() => setActiveMegaMenu(null)}
            onClick={(e) => handleNavClick(e, 'announcements')}
          >
            ANNOUNCEMENTS
          </a>

          {/* 5. Booking / Contact */}
          <a
            href="#booking"
            className="primary-nav-link"
            onMouseEnter={() => setActiveMegaMenu(null)}
            onClick={(e) => handleNavClick(e, 'home', '#booking')}
          >
            BOOKING
          </a>

          {/* 6. Must Visit (Full Width Mega Menu Trigger) */}
          <div
            className="nav-dropdown-item"
            onMouseEnter={() => setActiveMegaMenu('must-visit')}
          >
            <button
              className={`primary-nav-link dropdown-trigger ${activeFrame === 'must-visit' || activeMegaMenu === 'must-visit' ? 'active' : ''}`}
              onClick={() => setActiveMegaMenu(activeMegaMenu === 'must-visit' ? null : 'must-visit')}
              aria-expanded={activeMegaMenu === 'must-visit'}
            >
              <span>MUST VISIT</span>
              <ChevronDown size={13} className={`chevron-arrow ${activeMegaMenu === 'must-visit' ? 'open' : ''}`} />
            </button>
          </div>
        </nav>

        {/* Mobile Hamburger Button */}
        <button
          className="phone-only-burger-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle Mobile Menu"
        >
          {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* =========================================================================
          WHAT WE OFFER: 5-COLUMN FULL-WIDTH MEGA MENU POPOVER
         ========================================================================= */}
      {activeMegaMenu === 'offers' && (
        <div className="full-width-mega-menu-popover animate-mega-fade">
          <div className="mega-menu-inner-container">
            <div className="mega-menu-categories-grid five-cols">
              {/* Column 1: ACTIVITIES */}
              <div className="mega-cat-col">
                <button
                  className="mega-cat-header-link"
                  onClick={(e) => handleNavClick(e, 'activities')}
                >
                  <span className="mega-cat-label">ACTIVITIES ›</span>
                </button>
                <ul className="mega-cat-items-list">
                  <li><a href="#activities" onClick={(e) => handleNavClick(e, 'activities')}>Zip Lining</a></li>
                  <li><a href="#activities" onClick={(e) => handleNavClick(e, 'activities')}>Sky Biking</a></li>
                  <li><a href="#activities" onClick={(e) => handleNavClick(e, 'activities')}>Paddle Boats</a></li>
                  <li><a href="#activities" onClick={(e) => handleNavClick(e, 'activities')}>Horse Riding</a></li>
                  <li><a href="#activities" onClick={(e) => handleNavClick(e, 'activities')}>Playground for Kids</a></li>
                  <li><a href="#activities" onClick={(e) => handleNavClick(e, 'activities')}>Kiddy Pool</a></li>
                </ul>
              </div>

              {/* Column 2: FOOD OFFERS */}
              <div className="mega-cat-col">
                <button
                  className="mega-cat-header-link"
                  onClick={(e) => handleNavClick(e, 'food-offers')}
                >
                  <span className="mega-cat-label">FOOD OFFERS ›</span>
                </button>
                <ul className="mega-cat-items-list">
                  <li><a href="#food-offers" onClick={(e) => handleNavClick(e, 'food-offers')}>Short Orders</a></li>
                  <li><a href="#food-offers" onClick={(e) => handleNavClick(e, 'food-offers')}>Drinks</a></li>
                  <li><a href="#food-offers" onClick={(e) => handleNavClick(e, 'food-offers')}>Snacks</a></li>
                  <li><a href="#food-offers" onClick={(e) => handleNavClick(e, 'food-offers')}>Pasta and Noodles</a></li>
                  <li><a href="#food-offers" onClick={(e) => handleNavClick(e, 'food-offers')}>Sizzling and Grill</a></li>
                  <li><a href="#food-offers" onClick={(e) => handleNavClick(e, 'food-offers')}>Soup</a></li>
                  <li><a href="#food-offers" onClick={(e) => handleNavClick(e, 'food-offers')}>Chicken Meals</a></li>
                  <li><a href="#food-offers" onClick={(e) => handleNavClick(e, 'food-offers')}>Beef Meals</a></li>
                  <li><a href="#food-offers" onClick={(e) => handleNavClick(e, 'food-offers')}>Combo Meals</a></li>
                </ul>
              </div>

              {/* Column 3: STAYS & VENUES */}
              <div className="mega-cat-col">
                <button
                  className="mega-cat-header-link"
                  onClick={(e) => handleNavClick(e, 'stays-venues')}
                >
                  <span className="mega-cat-label">STAYS & VENUES ›</span>
                </button>
                <ul className="mega-cat-items-list">
                  <li><a href="#stays-venues" onClick={(e) => handleNavClick(e, 'stays-venues')}>Verde Villa Retreat</a></li>
                  <li><a href="#stays-venues" onClick={(e) => handleNavClick(e, 'stays-venues')}>Cottage Stay</a></li>
                  <li><a href="#stays-venues" onClick={(e) => handleNavClick(e, 'stays-venues')}>Qetsiyah Café</a></li>
                  <li><a href="#stays-venues" onClick={(e) => handleNavClick(e, 'stays-venues')}>Dine-in Restaurant</a></li>
                  <li><a href="#stays-venues" onClick={(e) => handleNavClick(e, 'stays-venues')}>Lakeside Gazebos</a></li>
                </ul>
              </div>

              {/* Column 4: OUR SERVICES */}
              <div className="mega-cat-col">
                <button
                  className="mega-cat-header-link"
                  onClick={(e) => handleNavClick(e, 'services')}
                >
                  <span className="mega-cat-label">OUR SERVICES ›</span>
                </button>
                <ul className="mega-cat-items-list">
                  <li><a href="#services" onClick={(e) => handleNavClick(e, 'services')}>Food Catering</a></li>
                  <li><a href="#services" onClick={(e) => handleNavClick(e, 'services')}>Weddings</a></li>
                  <li><a href="#services" onClick={(e) => handleNavClick(e, 'services')}>Family Events</a></li>
                  <li><a href="#services" onClick={(e) => handleNavClick(e, 'services')}>Birthday Event</a></li>
                  <li><a href="#services" onClick={(e) => handleNavClick(e, 'services')}>Office Event</a></li>
                  <li><a href="#services" onClick={(e) => handleNavClick(e, 'services')}>Event Hall</a></li>
                </ul>
              </div>

              {/* Column 5: PARK GALLERY */}
              <div className="mega-cat-col">
                <button
                  className="mega-cat-header-link"
                  onClick={(e) => handleNavClick(e, 'gallery')}
                >
                  <span className="mega-cat-label">PARK GALLERY ›</span>
                </button>
                <ul className="mega-cat-items-list">
                  <li><a href="#gallery" onClick={(e) => handleNavClick(e, 'gallery')}>Park Highlights & Views</a></li>
                  <li><a href="#gallery" onClick={(e) => handleNavClick(e, 'gallery')}>Activity Moments</a></li>
                  <li><a href="#gallery" onClick={(e) => handleNavClick(e, 'gallery')}>Event Hall & Pavilions</a></li>
                  <li><a href="#gallery" onClick={(e) => handleNavClick(e, 'gallery')}>Lakeside Grounds</a></li>
                  <li><a href="#gallery" onClick={(e) => handleNavClick(e, 'gallery')}>Café & Dining Ambiance</a></li>
                  <li><a href="#gallery" onClick={(e) => handleNavClick(e, 'gallery')}>View All Park Photos</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MUST VISIT FULL-WIDTH POPOVER */}
      {activeMegaMenu === 'must-visit' && (
        <div className="full-width-mega-menu-popover animate-mega-fade">
          <div className="mega-menu-inner-container">
            <div className="mega-menu-categories-grid five-cols">
              <div className="mega-cat-col">
                <button
                  className="mega-cat-header-link"
                  onClick={(e) => handleNavClick(e, 'must-visit')}
                >
                  <span className="mega-cat-label">PARTNER ACCOMMODATIONS ›</span>
                </button>
                <ul className="mega-cat-items-list">
                  <li><a href="#must-visit" onClick={(e) => handleNavClick(e, 'must-visit')}>Wyattel Hotel (Tacurong City)</a></li>
                  <li><a href="#stays-venues" onClick={(e) => handleNavClick(e, 'stays-venues')}>Verde Villa (At Eco-Park)</a></li>
                </ul>
              </div>

              <div className="mega-cat-col">
                <button
                  className="mega-cat-header-link"
                  onClick={(e) => handleNavClick(e, 'must-visit')}
                >
                  <span className="mega-cat-label">SULTAN KUDARAT DESTINATIONS ›</span>
                </button>
                <ul className="mega-cat-items-list">
                  <li><a href="#must-visit" onClick={(e) => handleNavClick(e, 'must-visit')}>Tacurong City Bird Sanctuary</a></li>
                  <li><a href="#must-visit" onClick={(e) => handleNavClick(e, 'must-visit')}>Sultan Kudarat Provincial Capitol</a></li>
                </ul>
              </div>

              <div className="mega-cat-col">
                <button
                  className="mega-cat-header-link"
                  onClick={(e) => handleNavClick(e, 'must-visit')}
                >
                  <span className="mega-cat-label">AFFILIATED BUSINESSES ›</span>
                </button>
                <ul className="mega-cat-items-list">
                  <li><a href="#must-visit" onClick={(e) => handleNavClick(e, 'must-visit')}>Wyattel Fine Dining & Suites</a></li>
                  <li><a href="#must-visit" onClick={(e) => handleNavClick(e, 'must-visit')}>Tourism Partner Slot (Inquire)</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Responsive Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-nav-panel">
          <a href="#home" className="mobile-nav-item" onClick={(e) => handleNavClick(e, 'home', '#home')}>HOME</a>
          <a href="#about" className="mobile-nav-item" onClick={(e) => handleNavClick(e, 'about')}>ABOUT</a>

          {/* Mobile Accordion: WHAT WE OFFER */}
          <div className="mobile-accordion-wrapper">
            <button
              className="mobile-accordion-header"
              onClick={() => setMobileOffersOpen(!mobileOffersOpen)}
            >
              <span>WHAT WE OFFER</span>
              <ChevronDown size={16} className={`chevron-arrow ${mobileOffersOpen ? 'open' : ''}`} />
            </button>

            {mobileOffersOpen && (
              <div className="mobile-accordion-body">
                <div className="mobile-group-header">Categories</div>
                <a href="#activities" onClick={(e) => handleNavClick(e, 'activities')}>🎯 Activities & Rides Frame</a>
                <a href="#food-offers" onClick={(e) => handleNavClick(e, 'food-offers')}>🍽️ Food Offers & Menu Frame</a>
                <a href="#stays-venues" onClick={(e) => handleNavClick(e, 'stays-venues')}>🏡 Stays & Venues (Verde Villa)</a>
                <a href="#services" onClick={(e) => handleNavClick(e, 'services')}>✨ Our Services & Event Hall</a>
                <a href="#gallery" onClick={(e) => handleNavClick(e, 'gallery')}>📸 Park Photo Gallery</a>
              </div>
            )}
          </div>

          <a href="#announcements" className="mobile-nav-item" onClick={(e) => handleNavClick(e, 'announcements')}>ANNOUNCEMENTS</a>
          <a href="#booking" className="mobile-nav-item" onClick={(e) => handleNavClick(e, 'home', '#booking')}>BOOKING</a>
          <a href="#must-visit" className="mobile-nav-item" onClick={(e) => handleNavClick(e, 'must-visit')}>MUST VISIT (WYATTEL)</a>
        </div>
      )}
    </header>
  );
}

export default Navbar;
