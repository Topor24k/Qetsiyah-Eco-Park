import React, { useEffect, useRef, useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { WelcomeSection } from './components/WelcomeSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { CustomScrollbar } from './components/CustomScrollbar';
import { MobileBottomNav } from './components/MobileBottomNav';
import { ExperiencesRail } from './components/home/ExperiencesRail';
import { MomentsTeaser } from './components/home/MomentsTeaser';
import { VisitGuideSection } from './components/home/VisitGuideSection';
import { PageCurtain } from './components/ui/PageCurtain';
import { useScrollReveal } from './hooks/useScrollReveal';
import { useParallax } from './hooks/useParallax';
import { scrollToAnchor } from './utils/scrollToAnchor';
import { foodMenuCatalog } from './data/foodMenuCatalog';
import { parkActivities, parkCourts, parkServices, parkStays } from './data/parkInfo';

// Dedicated Frames
import { AboutFrame } from './components/frames/AboutFrame';
import { ActivitiesFrame } from './components/frames/ActivitiesFrame';
import { FoodOffersFrame } from './components/frames/FoodOffersFrame';
import { StaysVenuesFrame } from './components/frames/StaysVenuesFrame';
import { ServicesFrame } from './components/frames/ServicesFrame';
import { GalleryFrame } from './components/frames/GalleryFrame';
import { AnnouncementsFrame } from './components/frames/AnnouncementsFrame';
import { MustVisitFrame } from './components/frames/MustVisitFrame';

const frameViews = {
  about: AboutFrame,
  activities: ActivitiesFrame,
  'food-offers': FoodOffersFrame,
  'stays-venues': StaysVenuesFrame,
  services: ServicesFrame,
  gallery: GalleryFrame,
  announcements: AnnouncementsFrame,
  'must-visit': MustVisitFrame
};

const frameNames = Object.keys(frameViews);

// The word shown on the curtain while a page is changing.
const frameTitles = {
  home: 'Qetsiyah',
  about: 'About',
  activities: 'Activities',
  'food-offers': 'Dining',
  'stays-venues': 'Stays & Venues',
  services: 'Services',
  gallery: 'Gallery',
  announcements: 'Announcements',
  'must-visit': 'Must Visit'
};

// In-page anchors that live inside a frame other than Home, so a shared or
// reloaded link such as #zip-lining or #beef-meals opens the right page.
const anchorFrames = {
  'activities-guide': 'activities',
  [parkCourts.id]: 'activities',
  [parkCourts.secondaryId]: 'activities',
  'stays-index': 'stays-venues',
  'services-index': 'services',
  'food-catalog': 'food-offers',
  'park-gallery-mosaic': 'gallery'
};
parkActivities.forEach((activity) => { anchorFrames[activity.id] = 'activities'; });
foodMenuCatalog.forEach((category) => { anchorFrames[category.id] = 'food-offers'; });
parkStays.forEach((stay) => { anchorFrames[stay.id] = 'stays-venues'; });
parkServices.forEach((service) => { anchorFrames[service.id] = 'services'; });

const readAnchor = () => window.location.hash.replace('#', '').replace('/', '');

const resolveFrameFromAnchor = (anchor) => {
  if (frameNames.includes(anchor)) return anchor;
  return anchorFrames[anchor] || 'home';
};

// True when the hash names a section inside a page rather than a page itself.
const isSectionAnchor = (anchor) => Boolean(anchor) && anchor !== 'home' && !frameNames.includes(anchor);

const landOn = (anchor) => {
  const el = isSectionAnchor(anchor) ? document.getElementById(anchor) : null;
  if (el) scrollToAnchor(el, 'instant');
  else window.scrollTo({ top: 0, behavior: 'instant' });
};

export function App() {
  const [activeFrame, setActiveFrame] = useState(() => resolveFrameFromAnchor(readAnchor()));
  const [currentHash, setCurrentHash] = useState(() => window.location.hash || '#home');
  // Every visit opens on the title card; it lifts once the fonts are ready.
  const [curtain, setCurtain] = useState(() => ({ title: frameTitles[resolveFrameFromAnchor(readAnchor())], phase: 'hold' }));
  const activeFrameRef = useRef(activeFrame);
  const isTransitioningRef = useRef(false);

  useScrollReveal();
  useParallax();

  // Lift the opening curtain.
  useEffect(() => {
    let cancelled = false;
    let removeTimer = null;

    const lift = () => {
      if (cancelled) return;
      cancelled = true;
      landOn(readAnchor());
      setCurtain((current) => (current ? { ...current, phase: 'out' } : current));
      removeTimer = window.setTimeout(() => setCurtain(null), 880);
    };

    const fontsReady = document.fonts?.ready ?? Promise.resolve();
    const minimumHold = new Promise((resolve) => window.setTimeout(resolve, 700));
    Promise.all([fontsReady, minimumHold]).then(lift);
    const safetyTimer = window.setTimeout(lift, 1800);

    return () => {
      // Only a lift that has not started is cancelled; a started one finishes.
      if (!removeTimer) cancelled = true;
      window.clearTimeout(safetyTimer);
    };
  }, []);

  // While the curtain covers the screen, entrance animations wait beneath it.
  const isCovered = Boolean(curtain) && curtain.phase !== 'out';
  useEffect(() => {
    document.documentElement.dataset.stage = isCovered ? 'covered' : 'live';
    window.dispatchEvent(new Event('stagechange'));
  }, [isCovered]);

  // Back/forward buttons and hand-typed hashes.
  useEffect(() => {
    const handleHashChange = () => {
      const anchor = readAnchor();
      const targetFrame = resolveFrameFromAnchor(anchor);
      const frameChanged = activeFrameRef.current !== targetFrame;

      setCurrentHash(window.location.hash || '#home');
      if (frameChanged) {
        activeFrameRef.current = targetFrame;
        setActiveFrame(targetFrame);
      }

      window.setTimeout(() => {
        if (frameChanged || isSectionAnchor(anchor)) landOn(anchor);
      }, 60);
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (frameName, scrollTarget = null) => {
    window.dispatchEvent(new Event('site:navigate'));
    const hash = scrollTarget || (frameName === 'home' ? '#home' : `#${frameName}`);
    const anchor = hash.replace('#', '');

    // Same page: just move to the section.
    if (frameName === activeFrameRef.current) {
      window.history.pushState(null, '', hash);
      setCurrentHash(hash);
      const el = isSectionAnchor(anchor) ? document.getElementById(anchor) : null;
      if (el) scrollToAnchor(el);
      else window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (isTransitioningRef.current) return;

    const swapFrame = () => {
      activeFrameRef.current = frameName;
      setActiveFrame(frameName);
      window.history.pushState(null, '', hash);
      setCurrentHash(hash);
    };

    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      swapFrame();
      window.setTimeout(() => landOn(anchor), 60);
      return;
    }

    // Curtain in, swap the page beneath it, curtain out.
    isTransitioningRef.current = true;
    setCurtain({ title: frameTitles[frameName], phase: 'in' });

    window.setTimeout(() => {
      swapFrame();
      window.setTimeout(() => {
        landOn(anchor);
        setCurtain((current) => (current ? { ...current, phase: 'out' } : current));
        window.setTimeout(() => {
          setCurtain(null);
          isTransitioningRef.current = false;
        }, 850);
      }, 140);
    }, 600);
  };

  const FrameView = frameViews[activeFrame];

  return (
    <div className="site" data-frame={activeFrame}>
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <CustomScrollbar />
      <Navbar activeFrame={activeFrame} onNavigate={navigateTo} />

      {activeFrame === 'home' ? (
        <main className="page page--home" id="main-content" tabIndex="-1">
          <HeroSection onNavigate={navigateTo} />
          <WelcomeSection />
          <ExperiencesRail onNavigate={navigateTo} />
          <MomentsTeaser onNavigate={navigateTo} />
          <VisitGuideSection />
          <ContactSection />
        </main>
      ) : (
        <main className={`page page--${activeFrame}`} id="main-content" tabIndex="-1" key={activeFrame}>
          <FrameView onNavigate={navigateTo} />
        </main>
      )}

      <Footer onNavigate={navigateTo} />
      <MobileBottomNav activeFrame={activeFrame} currentHash={currentHash} onNavigate={navigateTo} />
      <PageCurtain curtain={curtain} />
    </div>
  );
}

export default App;
