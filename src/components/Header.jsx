import React, { useState, useEffect, useRef } from 'react';
import {
  ChevronDown,
  Phone,
  Mail,
  MapPin,
  Clock,
  Award,
  Menu,
  X,
  Trees,
  UtensilsCrossed,
  Calendar,
  Building2,
  Sparkles,
  ExternalLink
} from 'lucide-react';

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [thingsDropdownOpen, setThingsDropdownOpen] = useState(false);
  const [mustVisitDropdownOpen, setMustVisitDropdownOpen] = useState(false);
  const [mobileThingsOpen, setMobileThingsOpen] = useState(false);
  const [mobileMustVisitOpen, setMobileMustVisitOpen] = useState(false);

  const thingsRef = useRef(null);
  const mustVisitRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (thingsRef.current && !thingsRef.current.contains(e.target)) {
        setThingsDropdownOpen(false);
      }
      if (mustVisitRef.current && !mustVisitRef.current.contains(e.target)) {
        setMustVisitDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const closeAll = () => {
    setMobileMenuOpen(false);
    setThingsDropdownOpen(false);
    setMustVisitDropdownOpen(false);
  };

  return (
    <header className="site-header">
      {/* 1. Professional Top Info Bar */}
      <div className="top-bar">
        <div className="header-container top-bar-content">
          <div className="top-bar-left">
            <div className="info-item">
              <MapPin size={14} className="icon-emerald" />
              <span>Barangay Calean, Tacurong City, Sultan Kudarat</span>
            </div>
            <span className="divider-bullet">•</span>
            <div className="info-item">
              <Clock size={14} className="icon-emerald" />
              <span>Open Daily: 8:00 AM – 10:00 PM</span>
            </div>
          </div>

          <div className="top-bar-right">
            <div className="dot-accredited-tag">
              <Award size={13} />
              <span>DOT-Accredited Tourism Facility</span>
            </div>
            <span className="divider-bullet">•</span>
            <a href="tel:09624074220" className="info-item contact-link">
              <Phone size={14} className="icon-emerald" />
              <span>0962 407 4220</span>
            </a>
            <span className="divider-bullet">•</span>
            <a href="mailto:qetsiyahecopark@gmail.com" className="info-item contact-link">
              <Mail size={14} className="icon-emerald" />
              <span>qetsiyahecopark@gmail.com</span>
            </a>
          </div>
        </div>
      </div>

      {/* 2. Main Navigation Bar */}
      <nav className={`main-nav ${scrolled ? 'nav-scrolled' : ''}`}>
        <div className="header-container nav-content">
          {/* Brand Logo */}
          <a href="#home" className="brand-box" onClick={closeAll}>
            <div className="brand-icon">
              <Trees size={22} color="#ffffff" />
            </div>
            <div className="brand-info">
              <span className="brand-name">Qetsiyah Eco Park</span>
              <span className="brand-sub">Tacurong City, Sultan Kudarat</span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <ul className="nav-links-list">
            {/* Home */}
            <li className="nav-link-item">
              <a href="#home" className="nav-anchor active">Home</a>
            </li>

            {/* About */}
            <li className="nav-link-item">
              <a href="#about" className="nav-anchor">About Us</a>
            </li>

            {/* Things To Do (Dropdown ▾) */}
            <li
              className="nav-link-item dropdown-holder"
              ref={thingsRef}
              onMouseEnter={() => setThingsDropdownOpen(true)}
              onMouseLeave={() => setThingsDropdownOpen(false)}
            >
              <button
                className={`nav-anchor dropdown-btn ${thingsDropdownOpen ? 'open' : ''}`}
                onClick={() => setThingsDropdownOpen(!thingsDropdownOpen)}
                aria-expanded={thingsDropdownOpen}
              >
                <span>Things To Do</span>
                <ChevronDown size={14} className={`arrow-icon ${thingsDropdownOpen ? 'arrow-up' : ''}`} />
              </button>

              {/* Clean 3-Column Dropdown Menu */}
              <div className={`dropdown-menu mega-menu ${thingsDropdownOpen ? 'visible' : ''}`}>
                <div className="mega-menu-grid">
                  {/* Column 1: Attractions */}
                  <div className="menu-column">
                    <div className="menu-column-title">
                      <Trees size={16} className="col-icon-emerald" />
                      <span>Attractions</span>
                    </div>
                    <ul className="sub-links-list">
                      <li><a href="#zipline" onClick={closeAll}>Zip Lining</a></li>
                      <li><a href="#skybike" onClick={closeAll}>Sky Biking</a></li>
                      <li><a href="#paddleboats" onClick={closeAll}>Paddle Boats</a></li>
                      <li><a href="#horseriding" onClick={closeAll}>Horse Riding</a></li>
                      <li><a href="#playground" onClick={closeAll}>Playground</a></li>
                      <li><a href="#kiddypool" onClick={closeAll}>Kiddy Pool</a></li>
                      <li><a href="#verdevilla" onClick={closeAll}>Verde Villa</a></li>
                    </ul>
                  </div>

                  {/* Column 2: Food Menu */}
                  <div className="menu-column">
                    <div className="menu-column-title">
                      <UtensilsCrossed size={16} className="col-icon-emerald" />
                      <span>Food Menu</span>
                    </div>
                    <ul className="sub-links-list">
                      <li><a href="#menu-beef" onClick={closeAll}>Beef Meals</a></li>
                      <li><a href="#menu-chicken" onClick={closeAll}>Chicken Meals</a></li>
                      <li><a href="#menu-combo" onClick={closeAll}>Combo Meals</a></li>
                      <li><a href="#menu-drinks" onClick={closeAll}>Drinks</a></li>
                      <li><a href="#menu-pasta" onClick={closeAll}>Pasta and Noodles</a></li>
                      <li><a href="#menu-sizzling" onClick={closeAll}>Sizzling and Grill</a></li>
                      <li><a href="#menu-snacks" onClick={closeAll}>Snacks</a></li>
                      <li><a href="#menu-soup" onClick={closeAll}>Soup</a></li>
                      <li><a href="#menu-shortorders" onClick={closeAll}>Short Orders</a></li>
                    </ul>
                  </div>

                  {/* Column 3: Stay & Events */}
                  <div className="menu-column">
                    <div className="menu-column-title">
                      <Calendar size={16} className="col-icon-emerald" />
                      <span>Stay & Events</span>
                    </div>
                    <ul className="sub-links-list">
                      <li><a href="#cottagestay" onClick={closeAll}>Cottage Stay</a></li>
                      <li><a href="#functionhall" onClick={closeAll}>Function Hall</a></li>
                      <li><a href="#foodcatering" onClick={closeAll}>Food Catering</a></li>
                    </ul>

                    {/* Clean Event Tagline */}
                    <div className="column-note-box">
                      <Sparkles size={14} className="icon-emerald" />
                      <span>Open for weddings, birthdays, family reunions, and milestone events.</span>
                    </div>
                  </div>
                </div>
              </div>
            </li>

            {/* Announcements */}
            <li className="nav-link-item">
              <a href="#announcements" className="nav-anchor">Announcements</a>
            </li>

            {/* Contact */}
            <li className="nav-link-item">
              <a href="#contact" className="nav-anchor">Contact</a>
            </li>

            {/* Must Visit (Dropdown ▾) */}
            <li
              className="nav-link-item dropdown-holder"
              ref={mustVisitRef}
              onMouseEnter={() => setMustVisitDropdownOpen(true)}
              onMouseLeave={() => setMustVisitDropdownOpen(false)}
            >
              <button
                className={`nav-anchor dropdown-btn ${mustVisitDropdownOpen ? 'open' : ''}`}
                onClick={() => setMustVisitDropdownOpen(!mustVisitDropdownOpen)}
                aria-expanded={mustVisitDropdownOpen}
              >
                <span>Must Visit</span>
                <ChevronDown size={14} className={`arrow-icon ${mustVisitDropdownOpen ? 'arrow-up' : ''}`} />
              </button>

              <div className={`dropdown-menu must-visit-menu ${mustVisitDropdownOpen ? 'visible' : ''}`}>
                <div className="must-visit-title">
                  <Building2 size={16} className="col-icon-emerald" />
                  <span>Affiliated Businesses</span>
                </div>
                <p className="must-visit-subtitle">
                  Recommended accommodations and partner destinations in Tacurong.
                </p>

                <ul className="must-visit-items">
                  <li>
                    <a href="#wyattel" onClick={closeAll} className="partner-card">
                      <div className="partner-icon">
                        <Building2 size={16} />
                      </div>
                      <div className="partner-details">
                        <span className="partner-name">Wyattel Hotel</span>
                        <span className="partner-desc">Hotel & lodging in Tacurong City</span>
                      </div>
                      <ExternalLink size={13} className="partner-arrow" />
                    </a>
                  </li>

                  <li className="partner-card placeholder-card">
                    <div className="partner-icon placeholder">
                      <Sparkles size={16} />
                    </div>
                    <div className="partner-details">
                      <span className="partner-name">Partner Business Slot</span>
                      <span className="partner-desc">To be confirmed by client</span>
                    </div>
                    <span className="badge-placeholder">Slot Available</span>
                  </li>
                </ul>
              </div>
            </li>
          </ul>

          {/* Right Action Button */}
          <div className="nav-actions">
            <a href="#contact" className="btn-primary-action">
              Book / Inquire
            </a>

            {/* Mobile Hamburger Button */}
            <button
              className="mobile-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* 3. Clean Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="mobile-drawer">
            <div className="mobile-drawer-body">
              <a href="#home" className="mobile-link" onClick={closeAll}>Home</a>
              <a href="#about" className="mobile-link" onClick={closeAll}>About Us</a>

              {/* Things To Do Accordion */}
              <div className="mobile-accordion">
                <button
                  className="mobile-accordion-toggle"
                  onClick={() => setMobileThingsOpen(!mobileThingsOpen)}
                >
                  <span>Things To Do</span>
                  <ChevronDown size={16} className={`arrow-icon ${mobileThingsOpen ? 'arrow-up' : ''}`} />
                </button>

                {mobileThingsOpen && (
                  <div className="mobile-accordion-content">
                    <div className="mobile-subgroup-label">Attractions</div>
                    <a href="#zipline" onClick={closeAll}>Zip Lining</a>
                    <a href="#skybike" onClick={closeAll}>Sky Biking</a>
                    <a href="#paddleboats" onClick={closeAll}>Paddle Boats</a>
                    <a href="#horseriding" onClick={closeAll}>Horse Riding</a>
                    <a href="#playground" onClick={closeAll}>Playground</a>
                    <a href="#kiddypool" onClick={closeAll}>Kiddy Pool</a>
                    <a href="#verdevilla" onClick={closeAll}>Verde Villa</a>

                    <div className="mobile-subgroup-label">Food Menu</div>
                    <a href="#menu-beef" onClick={closeAll}>Beef Meals</a>
                    <a href="#menu-chicken" onClick={closeAll}>Chicken Meals</a>
                    <a href="#menu-combo" onClick={closeAll}>Combo Meals</a>
                    <a href="#menu-drinks" onClick={closeAll}>Drinks</a>
                    <a href="#menu-pasta" onClick={closeAll}>Pasta and Noodles</a>
                    <a href="#menu-sizzling" onClick={closeAll}>Sizzling and Grill</a>
                    <a href="#menu-snacks" onClick={closeAll}>Snacks</a>
                    <a href="#menu-soup" onClick={closeAll}>Soup</a>
                    <a href="#menu-shortorders" onClick={closeAll}>Short Orders</a>

                    <div className="mobile-subgroup-label">Stay & Events</div>
                    <a href="#cottagestay" onClick={closeAll}>Cottage Stay</a>
                    <a href="#functionhall" onClick={closeAll}>Function Hall</a>
                    <a href="#foodcatering" onClick={closeAll}>Food Catering</a>
                  </div>
                )}
              </div>

              <a href="#announcements" className="mobile-link" onClick={closeAll}>Announcements</a>
              <a href="#contact" className="mobile-link" onClick={closeAll}>Contact</a>

              {/* Must Visit Accordion */}
              <div className="mobile-accordion">
                <button
                  className="mobile-accordion-toggle"
                  onClick={() => setMobileMustVisitOpen(!mobileMustVisitOpen)}
                >
                  <span>Must Visit</span>
                  <ChevronDown size={16} className={`arrow-icon ${mobileMustVisitOpen ? 'arrow-up' : ''}`} />
                </button>

                {mobileMustVisitOpen && (
                  <div className="mobile-accordion-content">
                    <a href="#wyattel" onClick={closeAll} style={{ fontWeight: 600 }}>
                      Wyattel Hotel (Tacurong City)
                    </a>
                    <span style={{ fontSize: '0.78rem', color: '#64748b', padding: '4px 0' }}>
                      + Additional Affiliated Businesses (To be confirmed by client)
                    </span>
                  </div>
                )}
              </div>

              <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid #e2e8f0' }}>
                <a href="#contact" className="btn-primary-action" style={{ width: '100%', textAlign: 'center' }} onClick={closeAll}>
                  Book / Inquire
                </a>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

export default Header;
