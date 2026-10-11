import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, ArrowUpRight, Minus, Plus } from 'lucide-react';
import { parkInfo } from '../data/parkInfo';
import { SoundToggle } from './ui/SoundToggle';

// "What we offer" panel: four columns of deep links into the offer pages.
const offerColumns = [
  {
    title: 'Activities & Rides',
    frame: 'activities',
    links: [
      ['Zip Lining', '#zip-lining'],
      ['Sky Biking', '#sky-biking'],
      ['Paddle Boats', '#paddle-boats'],
      ['Horse Riding', '#horse-riding'],
      ['Playground for Kids', '#playground-for-kids'],
      ['Kiddy Pool', '#kiddy-pool'],
      ['Basketball', '#basketball'],
      ['Tennis', '#tennis']
    ]
  },
  {
    title: 'Food Offers & Menu',
    frame: 'food-offers',
    links: [
      ['Short Orders', '#short-orders'],
      ['Drinks', '#drinks-beverages'],
      ['Snacks', '#snacks-meals'],
      ['Pasta and Noodles', '#pasta-noodles'],
      ['Sizzling and Grill', '#sizzling-grill'],
      ['Soup', '#soup-meals'],
      ['Chicken Meals', '#chicken-meals'],
      ['Beef Meals', '#beef-meals'],
      ['Combo Meals', '#combo-meals']
    ]
  },
  {
    title: 'Stays & Venues',
    frame: 'stays-venues',
    links: [
      ['Verde Villa Retreat', '#verde-villa-retreat'],
      ['Cottage Stay', '#cottage-stay'],
      ['Qetsiyah Café', '#qetsiyah-cafe'],
      ['Dine-in Restaurant', '#dine-in-restaurant'],
      ['Lakeside Gazebos', '#lakeside-gazebos']
    ]
  },
  {
    title: 'Our Services',
    frame: 'services',
    links: [
      ['Food Catering', '#food-catering'],
      ['Weddings', '#weddings'],
      ['Family Events', '#family-events'],
      ['Birthday Event', '#birthday-event'],
      ['Office Event', '#office-event'],
      ['Event Hall', '#event-hall']
    ]
  }
];

// Every page, in the order shown in the full-screen menu.
const menuPages = [
  { frame: 'home', label: 'Home', hash: '#home' },
  { frame: 'about', label: 'About' },
  { frame: 'activities', label: 'Activities' },
  { frame: 'food-offers', label: 'Dining' },
  { frame: 'stays-venues', label: 'Stays & Venues' },
  { frame: 'services', label: 'Services' },
  { frame: 'gallery', label: 'Gallery' },
  { frame: 'announcements', label: 'Announcements' },
  { frame: 'must-visit', label: 'Must Visit' }
];

const offerFrames = ['activities', 'food-offers', 'stays-venues', 'services', 'gallery'];

export function Navbar({ activeFrame, onNavigate }) {
  const [isSolid, setIsSolid] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [offersOpen, setOffersOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef(null);

  // Transparent over the hero, solid once the page moves; slips away while
  // scrolling down and returns on the first scroll up.
  useEffect(() => {
    let lastY = window.scrollY;

    const handleScroll = () => {
      const y = window.scrollY;
      setIsSolid(y > 24);
      if (y > lastY + 6 && y > 180) {
        setIsHidden(true);
        setOffersOpen(false);
      } else if (y < lastY - 4 || y <= 180) {
        setIsHidden(false);
      }
      lastY = y;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Sticky bars elsewhere on the page read this to sit below the header.
  useEffect(() => {
    document.documentElement.dataset.nav = isHidden && !menuOpen && !offersOpen ? 'hidden' : 'shown';
  }, [isHidden, menuOpen, offersOpen]);

  useEffect(() => {
    setOffersOpen(false);
    setMenuOpen(false);
    setIsHidden(false);
  }, [activeFrame]);

  // Any navigation closes the menus, including a tap on the phone dock while
  // the full-screen menu is open above it.
  useEffect(() => {
    const closeMenus = () => {
      setOffersOpen(false);
      setMenuOpen(false);
    };
    window.addEventListener('site:navigate', closeMenus);
    return () => window.removeEventListener('site:navigate', closeMenus);
  }, []);

  // Hold the page still behind the full-screen menu.
  useEffect(() => {
    if (!menuOpen) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [menuOpen]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setOffersOpen(false);
        setMenuOpen(false);
      }
    };
    const handlePointerDown = (event) => {
      if (headerRef.current && !headerRef.current.contains(event.target)) setOffersOpen(false);
    };

    window.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handlePointerDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handlePointerDown);
    };
  }, []);

  const go = (event, frame, anchor = null) => {
    event.preventDefault();
    setOffersOpen(false);
    setMenuOpen(false);
    if (onNavigate) onNavigate(frame, anchor);
  };

  const headerClass = [
    'nav',
    isSolid || offersOpen ? 'is-solid' : '',
    isHidden && !menuOpen && !offersOpen ? 'is-hidden' : '',
    menuOpen ? 'is-menu-open' : ''
  ].join(' ');

  return (
    <>
      <header className={headerClass} ref={headerRef}>
        <div className="nav-bar shell">
          <a className="nav-brand" href="#home" onClick={(e) => go(e, 'home', '#home')} aria-label="Qetsiyah Eco Park, home">
            <span className="nav-brand-word">Qetsiyah</span>
            <span className="nav-brand-sub">Eco Park</span>
          </a>

          <nav className="nav-links" aria-label="Primary">
            <a
              href="#home"
              className={`nav-link ${activeFrame === 'home' ? 'is-active' : ''}`}
              onClick={(e) => go(e, 'home', '#home')}
            >
              Home
            </a>
            <a
              href="#about"
              className={`nav-link ${activeFrame === 'about' ? 'is-active' : ''}`}
              onClick={(e) => go(e, 'about')}
            >
              About
            </a>
            <button
              type="button"
              className={`nav-link nav-link--toggle ${offerFrames.includes(activeFrame) || offersOpen ? 'is-active' : ''}`}
              aria-expanded={offersOpen}
              aria-controls="offers-panel"
              onClick={() => setOffersOpen((open) => !open)}
            >
              <span>What we offer</span>
              {offersOpen ? <Minus size={12} aria-hidden="true" /> : <Plus size={12} aria-hidden="true" />}
            </button>
            <a
              href="#announcements"
              className={`nav-link ${activeFrame === 'announcements' ? 'is-active' : ''}`}
              onClick={(e) => go(e, 'announcements')}
            >
              Announcements
            </a>
            <a
              href="#must-visit"
              className={`nav-link ${activeFrame === 'must-visit' ? 'is-active' : ''}`}
              onClick={(e) => go(e, 'must-visit')}
            >
              Must visit
            </a>
          </nav>

          <div className="nav-end">
            <SoundToggle />
            <a className="btn btn--sm nav-book" href="#booking" onClick={(e) => go(e, 'home', '#booking')}>
              Booking
            </a>
            <button
              type="button"
              className="nav-burger"
              aria-expanded={menuOpen}
              aria-controls="site-menu"
              onClick={() => setMenuOpen((open) => !open)}
            >
              <span className="nav-burger-label">{menuOpen ? 'Close' : 'Menu'}</span>
              <span className="nav-burger-icon" aria-hidden="true"><i /><i /></span>
            </button>
          </div>
        </div>

        {offersOpen && (
          <div className="offers" id="offers-panel">
            <div className="offers-inner shell">
              <div className="offers-cols">
                {offerColumns.map((column, index) => (
                  <div className="offers-col" key={column.frame} style={{ '--i': index }}>
                    <span className="label num offers-col-num">{String(index + 1).padStart(2, '0')}</span>
                    <a
                      className="offers-col-title display"
                      href={`#${column.frame}`}
                      onClick={(e) => go(e, column.frame)}
                    >
                      {column.title}
                    </a>
                    <ul className="offers-list">
                      {column.links.map(([label, anchor]) => (
                        <li key={anchor}>
                          <a href={anchor} onClick={(e) => go(e, column.frame, anchor)}>{label}</a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <a className="offers-feature" href="#gallery" onClick={(e) => go(e, 'gallery')} style={{ '--i': 4 }}>
                <span className="offers-feature-media">
                  <img
                    src="/optimized/moments/sunset-tower-640.webp"
                    alt=""
                    loading="lazy"
                    decoding="async"
                  />
                </span>
                <span className="label label-dim">05</span>
                <span className="offers-feature-title display">Park photo gallery</span>
                <span className="link-arrow">
                  View the collections
                  <ArrowRight size={14} aria-hidden="true" />
                </span>
              </a>
            </div>
          </div>
        )}
      </header>

      {menuOpen && (
        <div className="menu" id="site-menu" role="dialog" aria-modal="true" aria-label="Site menu">
          <div className="menu-inner">
            <nav className="menu-list" aria-label="All pages">
              {menuPages.map((page, index) => (
                <a
                  key={page.frame}
                  href={page.hash || `#${page.frame}`}
                  className={`menu-link ${activeFrame === page.frame ? 'is-current' : ''}`}
                  aria-current={activeFrame === page.frame ? 'page' : undefined}
                  style={{ '--i': index }}
                  onClick={(e) => go(e, page.frame, page.hash || null)}
                >
                  <span className="menu-link-num label num">{String(index + 1).padStart(2, '0')}</span>
                  <span className="menu-link-text display"><span>{page.label}</span></span>
                </a>
              ))}
            </nav>

            <div className="menu-foot">
              <div className="menu-contact">
                <a className="link-arrow" href={parkInfo.phoneHref}>Call</a>
                <a className="link-arrow" href={parkInfo.mapsHref} target="_blank" rel="noopener noreferrer">
                  Directions
                  <ArrowUpRight size={13} aria-hidden="true" />
                </a>
                <a className="link-arrow" href={parkInfo.emailHref}>Email</a>
              </div>
              <p className="label label-dim menu-note">{parkInfo.hours.label}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;
