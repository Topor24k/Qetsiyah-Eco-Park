import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { WelcomeSection } from './components/WelcomeSection';
import { FoodPreviewSection } from './components/FoodPreviewSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';

// Dedicated Frames
import { AboutFrame } from './components/frames/AboutFrame';
import { ActivitiesFrame } from './components/frames/ActivitiesFrame';
import { FoodOffersFrame } from './components/frames/FoodOffersFrame';
import { StaysVenuesFrame } from './components/frames/StaysVenuesFrame';
import { ServicesFrame } from './components/frames/ServicesFrame';
import { GalleryFrame } from './components/frames/GalleryFrame';
import { AnnouncementsFrame } from './components/frames/AnnouncementsFrame';
import { MustVisitFrame } from './components/frames/MustVisitFrame';

export function App() {
  const [activeFrame, setActiveFrame] = useState('home');

  // Handle URL hash routing (e.g. #about, #activities, #food-offers, etc.)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '').replace('/', '');
      if (['about', 'activities', 'food-offers', 'stays-venues', 'services', 'gallery', 'announcements', 'must-visit'].includes(hash)) {
        setActiveFrame(hash);
      } else if (hash === 'home' || hash === '' || hash === 'about-park' || hash === 'contact' || hash === 'booking') {
        setActiveFrame('home');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (frameName) => {
    setActiveFrame(frameName);
    if (frameName === 'home') {
      window.history.pushState(null, '', '#home');
    } else {
      window.history.pushState(null, '', `#${frameName}`);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="site-root">
      {/* Global Fixed Navbar with Frame Switching */}
      <Navbar activeFrame={activeFrame} onNavigate={navigateTo} />

      {/* Frame 1: HOME (Hero + Welcome + FoodPreview + Booking) */}
      {activeFrame === 'home' && (
        <main className="home-frame-view">
          <HeroSection onNavigate={navigateTo} />
          <WelcomeSection />
          <FoodPreviewSection onNavigate={navigateTo} />
          <ContactSection />
        </main>
      )}

      {/* Frame 2: ABOUT FRAME (Dedicated Frame) */}
      {activeFrame === 'about' && (
        <main className="category-frame-view">
          <AboutFrame onNavigate={navigateTo} />
        </main>
      )}

      {/* Frame 3: ACTIVITIES FRAME */}
      {activeFrame === 'activities' && (
        <main className="category-frame-view">
          <ActivitiesFrame onNavigate={navigateTo} />
        </main>
      )}

      {/* Frame 4: FOOD OFFERS & MENU FRAME */}
      {activeFrame === 'food-offers' && (
        <main className="category-frame-view">
          <FoodOffersFrame onNavigate={navigateTo} />
        </main>
      )}

      {/* Frame 5: STAYS & VENUES (VERDE VILLA) FRAME */}
      {activeFrame === 'stays-venues' && (
        <main className="category-frame-view">
          <StaysVenuesFrame onNavigate={navigateTo} />
        </main>
      )}

      {/* Frame 6: OUR SERVICES & EVENT HALL FRAME */}
      {activeFrame === 'services' && (
        <main className="category-frame-view">
          <ServicesFrame onNavigate={navigateTo} />
        </main>
      )}

      {/* Frame 7: PARK PHOTO GALLERY FRAME */}
      {activeFrame === 'gallery' && (
        <main className="category-frame-view">
          <GalleryFrame onNavigate={navigateTo} />
        </main>
      )}

      {/* Frame 8: ANNOUNCEMENTS & ADVISORIES FRAME */}
      {activeFrame === 'announcements' && (
        <main className="category-frame-view">
          <AnnouncementsFrame onNavigate={navigateTo} />
        </main>
      )}

      {/* Frame 9: MUST VISIT (WYATTEL HOTEL) FRAME */}
      {activeFrame === 'must-visit' && (
        <main className="category-frame-view">
          <MustVisitFrame onNavigate={navigateTo} />
        </main>
      )}

      {/* Site-Wide Footer */}
      <Footer onNavigate={navigateTo} />
    </div>
  );
}

export default App;
