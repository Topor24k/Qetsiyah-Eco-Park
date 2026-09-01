import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { WelcomeSection } from './components/WelcomeSection';
import { FoodPreviewSection } from './components/FoodPreviewSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { CustomScrollbar } from './components/CustomScrollbar';

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
  const [previousFrame, setPreviousFrame] = useState(null);
  const [exitingFromAbout, setExitingFromAbout] = useState(false);
  const [enteringHomeFromAbout, setEnteringHomeFromAbout] = useState(false);

  // Handle URL hash routing
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '').replace('/', '');
      let targetFrame = 'home';
      if (['about', 'activities', 'food-offers', 'stays-venues', 'services', 'gallery', 'announcements', 'must-visit'].includes(hash)) {
        targetFrame = hash;
      }
      
      setActiveFrame((current) => {
        if (current !== targetFrame) {
          setPreviousFrame(current);
        }
        return targetFrame;
      });
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (frameName, scrollTarget = null) => {
    // About -> Home animation logic
    if (activeFrame === 'about' && frameName === 'home') {
      setExitingFromAbout(true);
      setTimeout(() => {
        setExitingFromAbout(false);
        setEnteringHomeFromAbout(true);
        setPreviousFrame('about');
        setActiveFrame('home');
        
        const hash = scrollTarget ? scrollTarget : '#home';
        window.history.pushState(null, '', hash);
        
        // Wait 50ms for Home components to mount
        setTimeout(() => {
          if (scrollTarget) {
            const el = document.querySelector(scrollTarget);
            if (el) {
              const pos = el.getBoundingClientRect().top + window.pageYOffset - 72;
              window.scrollTo({ top: Math.max(0, pos), behavior: 'smooth' });
            }
          } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }, 50);
        
        setTimeout(() => {
          setEnteringHomeFromAbout(false);
        }, 1500);
      }, 900);
      return;
    }

    // Normal navigation
    setPreviousFrame(activeFrame);
    setActiveFrame(frameName);
    
    const hash = scrollTarget ? scrollTarget : (frameName === 'home' ? '#home' : '#' + frameName);
    window.history.pushState(null, '', hash);
    
    // Wait 50ms for components to mount
    setTimeout(() => {
      if (scrollTarget) {
        const el = document.querySelector(scrollTarget);
        if (el) {
          const pos = el.getBoundingClientRect().top + window.pageYOffset - 72;
          window.scrollTo({ top: Math.max(0, pos), behavior: 'smooth' });
        }
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 50);
  };

  return (
    <div className="site-root">
      <CustomScrollbar />
      <Navbar activeFrame={activeFrame} onNavigate={navigateTo} />

      {activeFrame === 'home' && (
        <main className="home-frame-view">
          <HeroSection onNavigate={navigateTo} isEntering={enteringHomeFromAbout} />
          <WelcomeSection />
          <FoodPreviewSection onNavigate={navigateTo} />
          <ContactSection />
        </main>
      )}

      {activeFrame === 'about' && (
        <main className="category-frame-view">
          <AboutFrame 
            onNavigate={navigateTo} 
            isExiting={exitingFromAbout} 
            previousFrame={previousFrame} 
          />
        </main>
      )}

      {activeFrame === 'activities' && (
        <main className="category-frame-view">
          <ActivitiesFrame onNavigate={navigateTo} />
        </main>
      )}

      {activeFrame === 'food-offers' && (
        <main className="category-frame-view">
          <FoodOffersFrame onNavigate={navigateTo} />
        </main>
      )}

      {activeFrame === 'stays-venues' && (
        <main className="category-frame-view">
          <StaysVenuesFrame onNavigate={navigateTo} />
        </main>
      )}

      {activeFrame === 'services' && (
        <main className="category-frame-view">
          <ServicesFrame onNavigate={navigateTo} />
        </main>
      )}

      {activeFrame === 'gallery' && (
        <main className="category-frame-view">
          <GalleryFrame onNavigate={navigateTo} />
        </main>
      )}

      {activeFrame === 'announcements' && (
        <main className="category-frame-view">
          <AnnouncementsFrame onNavigate={navigateTo} />
        </main>
      )}

      {activeFrame === 'must-visit' && (
        <main className="category-frame-view">
          <MustVisitFrame onNavigate={navigateTo} />
        </main>
      )}

      <Footer onNavigate={navigateTo} />
    </div>
  );
}

export default App;
