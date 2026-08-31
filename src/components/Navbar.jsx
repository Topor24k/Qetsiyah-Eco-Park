import React, { useState, useEffect, useRef } from 'react';
import { Plus, X, Menu, ArrowRight } from 'lucide-react';

export function Navbar({ activeFrame, onNavigate }) {
  const [scrollRatio, setScrollRatio] = useState(0);
  const [navVisible, setNavVisible] = useState(true);
  const [activeMegaMenu, setActiveMegaMenu] = useState(null); // 'offers' | 'must-visit' | null
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileOffersOpen, setMobileOffersOpen] = useState(false);
  const [mobileMustVisitOpen, setMobileMustVisitOpen] = useState(false);

  const navRef = useRef(null);
  const lastScrollYRef = useRef(0);

  // Calculates smooth fade-in of the background and smart hide-on-scroll-down / reveal-on-scroll-up
  useEffect(() => {
    lastScrollYRef.current = window.pageYOffset || document.documentElement.scrollTop || window.scrollY || 0;
    let touchStartY = 0;

    const handleScroll = () => {
      const currentScrollY = window.pageYOffset || document.documentElement.scrollTop || window.scrollY || 0;
      const fadeDistance = 240;
      const ratio = Math.min(Math.max((currentScrollY - 20) / fadeDistance, 0), 1);
      setScrollRatio(ratio);

      const diff = currentScrollY - lastScrollYRef.current;

      if (diff > 4) {
        // Scrolling DOWN -> immediately hide navbar and close dropdown
        setActiveMegaMenu(null);
        setNavVisible(false);
      } else if (diff < -3) {
        // Scrolling UP -> immediately reveal navbar
        setNavVisible(true);
      }

      lastScrollYRef.current = currentScrollY;
    };

    const handleWheel = (e) => {
      if (e.deltaY > 8) {
        setActiveMegaMenu(null);
        setNavVisible(false);
      } else if (e.deltaY < -8) {
        setNavVisible(true);
      }
    };

    const handleTouchStart = (e) => {
      if (e.touches && e.touches.length > 0) {
        touchStartY = e.touches[0].clientY;
      }
    };

    const handleTouchMove = (e) => {
      if (!e.touches || e.touches.length === 0) return;
      const currentY = e.touches[0].clientY;
      const diffY = touchStartY - currentY;

      if (diffY > 10) {
        setActiveMegaMenu(null);
        setNavVisible(false);
      } else if (diffY < -10) {
        setNavVisible(true);
      }
      touchStartY = currentY;
    };

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setActiveMegaMenu(null);
      } else if (['ArrowDown', 'PageDown'].includes(e.key)) {
        setActiveMegaMenu(null);
        setNavVisible(false);
      } else if (['ArrowUp', 'PageUp', 'Home'].includes(e.key)) {
        setNavVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('wheel', handleWheel, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('keydown', handleKeyDown);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('scroll', handleScroll);
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // When changing frames, ensure navbar is immediately shown at the top
  useEffect(() => {
    setNavVisible(true);
    lastScrollYRef.current = 0;
  }, [activeFrame]);

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

  const toggleMegaMenu = (menuKey) => {
    setActiveMegaMenu((prev) => (prev === menuKey ? null : menuKey));
  };

  const isHome = activeFrame === 'home';
  const isScrolled = scrollRatio > 0.05;
  const isOffersOpen = activeMegaMenu === 'offers';
  const isMustVisitOpen = activeMegaMenu === 'must-visit';
  const isAnyMenuOpen = activeMegaMenu !== null;
  const showSolidNav = isScrolled || isAnyMenuOpen;

  return (
    <header
      ref={navRef}
      className={`primary-nav-header ${navVisible ? 'is-visible' : 'nav-hidden'} ${showSolidNav ? 'is-scrolled' : 'is-at-top'} ${!showSolidNav && !isHome ? 'on-light-hero' : ''}`}
      style={{
        backgroundColor: showSolidNav ? '#151b18' : 'transparent',
        borderBottomColor: showSolidNav ? 'rgba(255, 255, 255, 0.12)' : 'transparent',
        boxShadow: showSolidNav ? '0 8px 30px rgba(0, 0, 0, 0.5)' : 'none',
        padding: showSolidNav ? '14px 0' : '20px 0 10px',
        transform: navVisible ? 'translateY(0)' : 'translateY(-115%)',
        opacity: navVisible ? 1 : 0,
        pointerEvents: navVisible ? 'auto' : 'none',
        transition: 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.25s ease, padding 0.25s ease, background-color 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease'
      }}
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
            onClick={(e) => handleNavClick(e, 'home', '#home')}
          >
            HOME
          </a>

          {/* 2. About */}
          <a
            href="#about"
            className={`primary-nav-link ${activeFrame === 'about' ? 'active' : ''}`}
            onClick={(e) => handleNavClick(e, 'about')}
          >
            ABOUT
          </a>

          <div 
            className="nav-dropdown-item"
            onMouseEnter={() => setActiveMegaMenu('offers')}
            onMouseLeave={() => setActiveMegaMenu(null)}
          >
            <button
              className={`primary-nav-link dropdown-trigger-btn ${
                ['activities', 'food-offers', 'stays-venues', 'services', 'gallery'].includes(activeFrame) || isOffersOpen
                  ? 'active-open'
                  : ''
              }`}
              onClick={() => toggleMegaMenu('offers')}
              aria-expanded={isOffersOpen}
              type="button"
            >
              <span>WHAT WE OFFER</span>
              <span className="nav-toggle-icon-wrap">
                {isOffersOpen ? <X size={15} className="toggle-close-x" /> : <Plus size={15} className="toggle-plus-icon" />}
              </span>
            </button>
          </div>

          {/* 4. Announcements */}
          <a
            href="#announcements"
            className={`primary-nav-link ${activeFrame === 'announcements' ? 'active' : ''}`}
            onClick={(e) => handleNavClick(e, 'announcements')}
          >
            ANNOUNCEMENTS
          </a>

          {/* 5. Booking / Contact */}
          <a
            href="#booking"
            className="primary-nav-link"
            onClick={(e) => handleNavClick(e, 'home', '#booking')}
          >
            BOOKING
          </a>

          <div 
            className="nav-dropdown-item"
            onMouseEnter={() => setActiveMegaMenu('must-visit')}
            onMouseLeave={() => setActiveMegaMenu(null)}
          >
            <button
              className={`primary-nav-link dropdown-trigger-btn ${activeFrame === 'must-visit' || isMustVisitOpen ? 'active-open' : ''}`}
              onClick={() => toggleMegaMenu('must-visit')}
              aria-expanded={isMustVisitOpen}
              type="button"
            >
              <span>MUST VISIT</span>
              <span className="nav-toggle-icon-wrap">
                {isMustVisitOpen ? <X size={15} className="toggle-close-x" /> : <Plus size={15} className="toggle-plus-icon" />}
              </span>
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
          FULL-FRAME EDITORIAL MEGA MENU: WHAT WE OFFER (MATCHING REFERENCE IMAGE)
         ========================================================================= */}
      {isOffersOpen && (
        <div className="full-frame-mega-menu-overlay animate-fullframe-fade">
          <div className="full-frame-mega-menu-inner">
            
            {/* Left Multi-Column Links Section */}
            <div className="mega-menu-left-content">
              
              {/* Main Section Header with Full Horizontal Line */}
              <div className="mega-menu-main-header">
                <h2 className="mega-menu-heading-title">Things to do</h2>
                <div className="mega-menu-heading-divider"></div>
              </div>

              {/* Top 3-Columns Grid */}
              <div className="mega-menu-three-cols-grid">
                
                {/* Column 1: Activities & Rides */}
                <div className="mega-links-column">
                  <ul className="mega-clean-links-list">
                    <li><a href="#activities" onClick={(e) => handleNavClick(e, 'activities')}>Zip Lining</a></li>
                    <li><a href="#activities" onClick={(e) => handleNavClick(e, 'activities')}>Sky Biking</a></li>
                    <li><a href="#activities" onClick={(e) => handleNavClick(e, 'activities')}>Paddle Boats</a></li>
                    <li><a href="#activities" onClick={(e) => handleNavClick(e, 'activities')}>Horse Riding</a></li>
                    <li><a href="#activities" onClick={(e) => handleNavClick(e, 'activities')}>Playground for Kids</a></li>
                    <li><a href="#activities" onClick={(e) => handleNavClick(e, 'activities')}>Kiddy Pool</a></li>
                    <li><a href="#activities" onClick={(e) => handleNavClick(e, 'activities')}>Scenic Nature Trails</a></li>
                  </ul>
                </div>

                {/* Column 2: Food & Dining */}
                <div className="mega-links-column">
                  <ul className="mega-clean-links-list">
                    <li><a href="#food-offers" onClick={(e) => handleNavClick(e, 'food-offers')}>Qetsiyah Café & Restaurant</a></li>
                    <li><a href="#food-offers" onClick={(e) => handleNavClick(e, 'food-offers')}>Short Orders & Snacks</a></li>
                    <li><a href="#food-offers" onClick={(e) => handleNavClick(e, 'food-offers')}>Sizzling & Grill Specials</a></li>
                    <li><a href="#food-offers" onClick={(e) => handleNavClick(e, 'food-offers')}>Pasta & Noodles</a></li>
                    <li><a href="#food-offers" onClick={(e) => handleNavClick(e, 'food-offers')}>Hearty Soups</a></li>
                    <li><a href="#food-offers" onClick={(e) => handleNavClick(e, 'food-offers')}>Chicken & Beef Meals</a></li>
                    <li><a href="#food-offers" onClick={(e) => handleNavClick(e, 'food-offers')}>Halo-Halo & Refreshing Drinks</a></li>
                  </ul>
                </div>

                {/* Column 3: Stays & Venues */}
                <div className="mega-links-column">
                  <ul className="mega-clean-links-list">
                    <li><a href="#stays-venues" onClick={(e) => handleNavClick(e, 'stays-venues')}>Verde Villa Luxury Retreat</a></li>
                    <li><a href="#stays-venues" onClick={(e) => handleNavClick(e, 'stays-venues')}>Cottage Rentals</a></li>
                    <li><a href="#stays-venues" onClick={(e) => handleNavClick(e, 'stays-venues')}>Lakeside Gazebos</a></li>
                    <li><a href="#stays-venues" onClick={(e) => handleNavClick(e, 'stays-venues')}>Dine-in Pavilions</a></li>
                    <li><a href="#stays-venues" onClick={(e) => handleNavClick(e, 'stays-venues')}>Day Tour Resting Cottages</a></li>
                    <li><a href="#stays-venues" onClick={(e) => handleNavClick(e, 'stays-venues')}>Botanical Garden Grounds</a></li>
                  </ul>
                </div>

              </div>

              {/* Bottom 3-Columns Section with Underlined Subheadings */}
              <div className="mega-menu-bottom-subsections-grid">
                
                {/* Subsection 1: Family Activities / Our Services */}
                <div className="mega-sub-col">
                  <div className="mega-sub-header">
                    <h3 className="mega-sub-title">Our services</h3>
                    <div className="mega-sub-divider"></div>
                  </div>
                  <ul className="mega-clean-links-list">
                    <li><a href="#services" onClick={(e) => handleNavClick(e, 'services')}>Food Catering Packages</a></li>
                    <li><a href="#services" onClick={(e) => handleNavClick(e, 'services')}>Wedding Receptions</a></li>
                    <li><a href="#services" onClick={(e) => handleNavClick(e, 'services')}>Birthday & Family Milestones</a></li>
                    <li><a href="#services" onClick={(e) => handleNavClick(e, 'services')}>Corporate & Office Events</a></li>
                  </ul>
                </div>

                {/* Subsection 2: Events & Gallery */}
                <div className="mega-sub-col">
                  <div className="mega-sub-header">
                    <h3 className="mega-sub-title">Park gallery</h3>
                    <div className="mega-sub-divider"></div>
                  </div>
                  <ul className="mega-clean-links-list">
                    <li><a href="#gallery" onClick={(e) => handleNavClick(e, 'gallery')}>Park Highlights & Views</a></li>
                    <li><a href="#gallery" onClick={(e) => handleNavClick(e, 'gallery')}>Activity Moments</a></li>
                    <li><a href="#gallery" onClick={(e) => handleNavClick(e, 'gallery')}>Event Hall & Pavilions</a></li>
                    <li><a href="#gallery" onClick={(e) => handleNavClick(e, 'gallery')}>View All Park Photos</a></li>
                  </ul>
                </div>

                {/* Subsection 3: Tours & Programs / Visitor Info */}
                <div className="mega-sub-col">
                  <div className="mega-sub-header">
                    <h3 className="mega-sub-title">Visitor info</h3>
                    <div className="mega-sub-divider"></div>
                  </div>
                  <ul className="mega-clean-links-list">
                    <li><a href="#about" onClick={(e) => handleNavClick(e, 'about')}>Daily Operating Hours (8AM–10PM)</a></li>
                    <li><a href="#about" onClick={(e) => handleNavClick(e, 'about')}>DOT Accreditation Facility</a></li>
                    <li><a href="#booking" onClick={(e) => handleNavClick(e, 'home', '#booking')}>Online Booking & Reservation</a></li>
                    <li><a href="#announcements" onClick={(e) => handleNavClick(e, 'announcements')}>Park Bulletins & Advisories</a></li>
                  </ul>
                </div>

              </div>

            </div>

            {/* Right Featured Card (Matching Reference Layout) */}
            <div className="mega-menu-right-featured-card">
              <div className="featured-card-image-wrap">
                <img
                  src="/about-adventure-sanctuary.jpg"
                  alt="Explore Qetsiyah Eco Park"
                  className="featured-img-rounded"
                />
              </div>
              <div className="featured-card-caption-block">
                <h4 className="featured-card-title">
                  Discover activities and scenic wonders across Qetsiyah Eco Park
                </h4>
                <a
                  href="#activities"
                  className="featured-card-pill-btn"
                  onClick={(e) => handleNavClick(e, 'activities')}
                >
                  <span>View all</span>
                  <ArrowRight size={16} className="pill-arrow-icon" />
                </a>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* =========================================================================
          FULL-FRAME EDITORIAL MEGA MENU: MUST VISIT
         ========================================================================= */}
      {isMustVisitOpen && (
        <div className="full-frame-mega-menu-overlay animate-fullframe-fade">
          <div className="full-frame-mega-menu-inner">
            
            <div className="mega-menu-left-content">
              <div className="mega-menu-main-header">
                <h2 className="mega-menu-heading-title">Must visit & Partners</h2>
                <div className="mega-menu-heading-divider"></div>
              </div>

              <div className="mega-menu-three-cols-grid">
                <div className="mega-links-column">
                  <ul className="mega-clean-links-list">
                    <li><a href="#must-visit" onClick={(e) => handleNavClick(e, 'must-visit')}>Wyattel Hotel (Tacurong City)</a></li>
                    <li><a href="#must-visit" onClick={(e) => handleNavClick(e, 'must-visit')}>Executive Suites & Rooms</a></li>
                    <li><a href="#must-visit" onClick={(e) => handleNavClick(e, 'must-visit')}>Air-Conditioned Modern Rooms</a></li>
                    <li><a href="#must-visit" onClick={(e) => handleNavClick(e, 'must-visit')}>Downtown Tacurong Location</a></li>
                  </ul>
                </div>

                <div className="mega-links-column">
                  <ul className="mega-clean-links-list">
                    <li><a href="#must-visit" onClick={(e) => handleNavClick(e, 'must-visit')}>Tacurong City Bird Sanctuary</a></li>
                    <li><a href="#must-visit" onClick={(e) => handleNavClick(e, 'must-visit')}>Sultan Kudarat Provincial Capitol</a></li>
                    <li><a href="#must-visit" onClick={(e) => handleNavClick(e, 'must-visit')}>Regional Cultural Heritage</a></li>
                    <li><a href="#must-visit" onClick={(e) => handleNavClick(e, 'must-visit')}>Local Ecotourism Destinations</a></li>
                  </ul>
                </div>

                <div className="mega-links-column">
                  <ul className="mega-clean-links-list">
                    <li><a href="#must-visit" onClick={(e) => handleNavClick(e, 'must-visit')}>Wyattel Fine Dining & Restaurant</a></li>
                    <li><a href="#must-visit" onClick={(e) => handleNavClick(e, 'must-visit')}>Affiliated Regional Tourism Partners</a></li>
                    <li><a href="#must-visit" onClick={(e) => handleNavClick(e, 'must-visit')}>Partner Inquiry via Qetsiyah</a></li>
                  </ul>
                </div>
              </div>

              <div className="mega-menu-bottom-subsections-grid">
                <div className="mega-sub-col">
                  <div className="mega-sub-header">
                    <h3 className="mega-sub-title">Hotel partnership</h3>
                    <div className="mega-sub-divider"></div>
                  </div>
                  <ul className="mega-clean-links-list">
                    <li><a href="#must-visit" onClick={(e) => handleNavClick(e, 'must-visit')}>Tour & Stay Packages</a></li>
                    <li><a href="#must-visit" onClick={(e) => handleNavClick(e, 'must-visit')}>Direct Reception Coordination</a></li>
                  </ul>
                </div>

                <div className="mega-sub-col">
                  <div className="mega-sub-header">
                    <h3 className="mega-sub-title">Regional tourism</h3>
                    <div className="mega-sub-divider"></div>
                  </div>
                  <ul className="mega-clean-links-list">
                    <li><a href="#must-visit" onClick={(e) => handleNavClick(e, 'must-visit')}>Sultan Kudarat Travel Guide</a></li>
                    <li><a href="#must-visit" onClick={(e) => handleNavClick(e, 'must-visit')}>Tacurong City Tourism Hub</a></li>
                  </ul>
                </div>

                <div className="mega-sub-col">
                  <div className="mega-sub-header">
                    <h3 className="mega-sub-title">Inquiries</h3>
                    <div className="mega-sub-divider"></div>
                  </div>
                  <ul className="mega-clean-links-list">
                    <li><a href="#booking" onClick={(e) => handleNavClick(e, 'home', '#booking')}>Partner Promotion Inquiries</a></li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Right Featured Card */}
            <div className="mega-menu-right-featured-card">
              <div className="featured-card-image-wrap">
                <img
                  src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80"
                  alt="Wyattel Hotel Tacurong"
                  className="featured-img-rounded"
                />
              </div>
              <div className="featured-card-caption-block">
                <h4 className="featured-card-title">
                  Premier hospitality & cozy executive suites in Tacurong City
                </h4>
                <a
                  href="#must-visit"
                  className="featured-card-pill-btn"
                  onClick={(e) => handleNavClick(e, 'must-visit')}
                >
                  <span>View all</span>
                  <ArrowRight size={16} className="pill-arrow-icon" />
                </a>
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
              <span className="nav-toggle-icon-wrap">
                {mobileOffersOpen ? <X size={16} /> : <Plus size={16} />}
              </span>
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
