import React, { useState, useEffect, useRef, useCallback } from 'react';
import { X, ArrowRight, ChevronLeft, ChevronRight, Compass, ShieldCheck } from 'lucide-react';

export function ActivitiesFrame({ onNavigate }) {
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeChapterIndex, setActiveChapterIndex] = useState(1);

  const containerRef = useRef(null);
  const horizontalTrackRef = useRef(null);

  const activities = [
    {
      id: 'zipline',
      number: '01',
      kicker: 'AERIAL ADVENTURE',
      title: 'CANOPY ZIP LINING',
      subtitle: 'SOAR ABOVE EMERALD CANOPIES',
      desc: 'Feel the exhilarating rush of flying high above lush rainforest canopies. High-tension dual cables span across the park, delivering 360° panoramic views of vibrant botanical gardens and rolling mountain horizons.',
      image: '/Activities/Zip Lining.jpg',
      badgeTag: 'ZIP LINE',
      location: 'Park High Canopy Station',
      elevation: 'High-Altitude Cable Flight',
      safety: 'Full Double-Harness & Helmet Provided',
      capacity: 'Single Rider per Cable'
    },
    {
      id: 'skybike',
      number: '02',
      kicker: 'SIGNATURE RIDE',
      title: 'HIGH-WIRE SKY BIKING',
      subtitle: 'PEDAL ACROSS THE SKY',
      desc: 'A signature heart-pumping adventure combining cycling with aerial thrill. Pedal specialized suspended bicycles across overhead steel cables high above the tranquil waters of the lagoon.',
      image: '/Activities/Sky Biking.jpg',
      badgeTag: 'SKY BIKE',
      location: 'Lagoon Skyway Crossing',
      elevation: 'Suspended Mid-Air Track',
      safety: 'Dual Anchor Lock & Guide Support',
      capacity: '1 to 2 Tandem Riders'
    },
    {
      id: 'paddleboat',
      number: '03',
      kicker: 'LAGOON WATERS',
      title: 'LAGOON PADDLE BOATS',
      subtitle: 'SERENE WATERFRONT RETREAT',
      desc: 'Glide peacefully across the shimmering park lagoon aboard colorful pedal boats. Surrounded by lotus blooms and cool breezes, it is the quintessential relaxing water retreat for couples and families.',
      image: '/Activities/Paddle Boats.jpg',
      badgeTag: 'PADDLE BOAT',
      location: 'Central Freshwater Lagoon',
      elevation: 'Water Level Cruise',
      safety: 'Life Vests & On-Dock Attendants',
      capacity: 'Up to 4 Guests per Boat'
    },
    {
      id: 'horseriding',
      number: '04',
      kicker: 'EQUESTRIAN TRAILS',
      title: 'SCENIC HORSE RIDING',
      subtitle: 'JOURNEY THROUGH NATURE PATHS',
      desc: 'Embark on a guided horseback tour through gentle shaded trails, coconut groves, and open green pastures. Accompanied by experienced animal caretakers, connect deeply with nature.',
      image: '/Activities/Horse Riding.jpg',
      badgeTag: 'HORSE RIDE',
      location: 'Meadow Trail Head',
      elevation: 'Ground Trail Trek',
      safety: 'Guided by Trained Caretakers',
      capacity: 'Individual Guided Mounts'
    },
    {
      id: 'playground',
      number: '05',
      kicker: 'FAMILY RECREATION',
      title: 'PARK PLAYGROUND',
      subtitle: 'OUTDOOR LAUGHTER & PLAY',
      desc: 'A vibrant open-air lawn playground equipped with swings, slides, climbing sets, and soft grassy lawns where children can run freely in a safe, nature-enclosed environment.',
      image: '/Activities/Playground.jpg',
      badgeTag: 'PLAYGROUND',
      location: 'Central Recreation Green',
      elevation: 'Park Grounds',
      safety: 'Kid-Friendly Soft Turf Area',
      capacity: 'Open for All Young Explorers'
    },
    {
      id: 'kiddypool',
      number: '06',
      kicker: 'AQUATIC REFRESHMENT',
      title: 'KIDDY SPLASH POOL',
      subtitle: 'COOL TROPICAL SPLASH',
      desc: 'A dedicated shallow splash wading pool designed for young adventurers. Featuring crystal-clear treated waters, gentle water showers, and perimeter shaded seating for warm afternoons.',
      image: '/Activities/Kiddy Pool.jpg',
      badgeTag: 'KIDDY POOL',
      location: 'Poolside Pavilion Area',
      elevation: 'Ground Level Pool',
      safety: 'Shallow Depth & Pool Attendant',
      capacity: 'Children & Family Access'
    }
  ];

  // Scroll listener for sticky horizontal progression
  const handleScroll = useCallback(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const rect = container.getBoundingClientRect();
    const totalScrollable = container.scrollHeight - window.innerHeight;

    if (totalScrollable > 0) {
      // Calculate scroll progress from 0 (top) to 1 (end)
      const currentScroll = -rect.top;
      const progress = Math.min(1, Math.max(0, currentScroll / totalScrollable));
      setScrollProgress(progress);

      // Active Chapter calculation (1 to 6)
      if (progress < 0.15) {
        setActiveChapterIndex(1);
      } else {
        const horizProgress = (progress - 0.15) / 0.85;
        const chapter = Math.min(6, Math.max(1, Math.floor(horizProgress * 6) + 1));
        setActiveChapterIndex(chapter);
      }
    }
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [handleScroll]);

  // Jump to specific chapter
  const jumpToChapter = (chapIdx) => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const totalScrollable = container.scrollHeight - window.innerHeight;
    const targetProgress = chapIdx === 0 ? 0 : 0.15 + ((chapIdx - 1) / 5) * 0.85;
    const containerTop = container.offsetTop;
    
    window.scrollTo({
      top: containerTop + targetProgress * totalScrollable,
      behavior: 'smooth'
    });
  };

  // Phase Calculations for the 2-Stage Cinematic Animation
  // Phase 1: 0 -> 0.18 (Arch Expansion / Morph Zoom)
  const zoomProgress = Math.min(1, Math.max(0, scrollProgress / 0.16));
  
  // Phase 2: 0.16 -> 1.0 (Smooth Horizontal Storyboard Pan)
  const horizProgress = Math.min(1, Math.max(0, (scrollProgress - 0.14) / 0.86));

  // Compute horizontal translation
  // Total horizontal track width is ~5000px, screen width is window.innerWidth
  const totalHorizontalTravel = typeof window !== 'undefined' ? Math.max(1600, window.innerWidth * 3.6) : 3600;
  const translateX = horizProgress * totalHorizontalTravel;

  return (
    <div className="activities-cinematic-wrapper" ref={containerRef}>
      
      {/* Pinned 100vh Viewport Stage */}
      <div className="cinematic-sticky-stage">
        
        {/* =========================================================================
            STAGE 1: TRIPTYCH ARCHWAY HERO (Morphs & Zooms on Initial Scroll)
            ========================================================================= */}
        <div 
          className="cinematic-triptych-layer"
          style={{
            opacity: Math.max(0, 1 - (scrollProgress / 0.20)),
            pointerEvents: scrollProgress > 0.18 ? 'none' : 'auto'
          }}
        >
          {/* Top Classical Header Lockup */}
          <div 
            className="triptych-top-header"
            style={{
              opacity: Math.max(0, 1 - zoomProgress * 1.8),
              transform: `translateY(${-zoomProgress * 50}px)`
            }}
          >
            <div className="triptych-header-flank">
              <span className="flank-line"></span>
              <span className="flank-text">ECO-PARK EXPERIENCES</span>
            </div>

            <div className="triptych-header-center">
              <h1 className="triptych-main-title">WHAT WE OFFER</h1>
              <div className="triptych-chapter-badge">
                <span className="chapter-ornament">❖</span>
                <span className="chapter-title">OUTDOOR ADVENTURES & ACTIVITIES</span>
                <span className="chapter-ornament">❖</span>
              </div>
            </div>

            <div className="triptych-header-flank right">
              <span className="flank-text">SULTAN KUDARAT</span>
              <span className="flank-line"></span>
            </div>
          </div>

          {/* 3 Arches Triptych Stage with Zoom & Morph */}
          <div className="triptych-arches-stage">
            
            {/* Left Arch Portal (Recedes and slides left) */}
            <div 
              className="triptych-arch-card arch-left"
              style={{
                transform: `translateX(${-zoomProgress * 240}px) scale(${1 - zoomProgress * 0.3})`,
                opacity: Math.max(0, 1 - zoomProgress * 1.5)
              }}
              onClick={() => jumpToChapter(2)}
            >
              <div className="arch-frame-inner">
                <img src="/Activities/Sky Biking.jpg" alt="Sky Biking" className="arch-img" />
                <div className="arch-overlay-scrim"></div>
                <div className="arch-floating-label">
                  <span>HIGH-WIRE SKY BIKING</span>
                </div>
              </div>
            </div>

            {/* Center Grand Arch (Zooms in and expands into the wide panorama) */}
            <div 
              className="triptych-arch-card arch-center"
              style={{
                transform: `scale(${1 + zoomProgress * 1.5}) translateY(${zoomProgress * 30}px)`,
                borderRadius: `${Math.max(0, (1 - zoomProgress) * 260)}px ${Math.max(0, (1 - zoomProgress) * 260)}px 4px 4px`
              }}
              onClick={() => jumpToChapter(1)}
            >
              <div 
                className="arch-frame-inner grand-arch"
                style={{
                  borderRadius: `${Math.max(0, (1 - zoomProgress) * 260)}px ${Math.max(0, (1 - zoomProgress) * 260)}px 4px 4px`
                }}
              >
                <img src="/Activities/Zip Lining.jpg" alt="Canopy Zip Lining" className="arch-img" />
                <div 
                  className="arch-overlay-scrim center-scrim"
                  style={{ opacity: Math.max(0, 1 - zoomProgress * 2) }}
                ></div>
                <div 
                  className="arch-center-caption"
                  style={{
                    opacity: Math.max(0, 1 - zoomProgress * 2),
                    transform: `translateY(${zoomProgress * 30}px)`
                  }}
                >
                  <span className="arch-kicker">FEATURED ADVENTURE</span>
                  <h3>CANOPY ZIP LINING</h3>
                  <p>Scroll to Explore The Journey</p>
                </div>
              </div>
            </div>

            {/* Right Arch Portal (Recedes and slides right) */}
            <div 
              className="triptych-arch-card arch-right"
              style={{
                transform: `translateX(${zoomProgress * 240}px) scale(${1 - zoomProgress * 0.3})`,
                opacity: Math.max(0, 1 - zoomProgress * 1.5)
              }}
              onClick={() => jumpToChapter(3)}
            >
              <div className="arch-frame-inner">
                <img src="/Activities/Paddle Boats.jpg" alt="Lagoon Paddle Boats" className="arch-img" />
                <div className="arch-overlay-scrim"></div>
                <div className="arch-floating-label">
                  <span>LAGOON PADDLE BOATS</span>
                </div>
              </div>
            </div>

            {/* Flowing Script Accent Typography across base */}
            <div 
              className="triptych-script-overlay"
              style={{
                transform: `translateX(${-zoomProgress * 320}px)`,
                opacity: Math.max(0, 1 - zoomProgress * 1.2)
              }}
            >
              <span className="script-accent-text">Power Your Adventure in Nature</span>
            </div>
          </div>

        </div>

        {/* =========================================================================
            STAGE 2: HORIZONTAL EDITORIAL STORYBOARD TRACK (Glides on Scroll)
            ========================================================================= */}
        <div 
          className="cinematic-horizontal-layer"
          style={{
            opacity: Math.min(1, Math.max(0, (scrollProgress - 0.08) / 0.10)),
            pointerEvents: scrollProgress < 0.10 ? 'none' : 'auto'
          }}
        >
          {/* Subtle Parallax Textured Backdrop */}
          <div className="horizontal-marbled-backdrop"></div>

          {/* Horizontally Translating Gallery Track */}
          <div 
            className="horizontal-storyboard-track"
            ref={horizontalTrackRef}
            style={{
              transform: `translate3d(${-translateX}px, 0, 0)`
            }}
          >

            {/* Scene 1: Canopy Zip Lining (Grand Entry Pane) */}
            <div className="storyboard-scene-pane scene-zipline">
              <div className="scene-framed-photo wide-hero-photo">
                <img src="/Activities/Zip Lining.jpg" alt="Canopy Zip Lining" className="pane-img" />
                <button 
                  className="scene-photo-plus-badge" 
                  onClick={() => setSelectedActivity(activities[0])}
                  aria-label="View Zip Line details"
                >
                  <span className="plus-badge-tag">ZIP LINE</span>
                  <span className="plus-badge-icon">+</span>
                </button>
              </div>

              <div className="scene-framed-card">
                <div className="framed-card-header">
                  <span className="card-number">01</span>
                  <h3 className="card-title">CANOPY ZIP LINING</h3>
                </div>
                <p className="card-body">
                  Feel the exhilarating rush of flying high above emerald canopies. Experience 360-degree panoramic vistas across Tacurong’s lush landscapes and vibrant gardens.
                </p>
                <div className="card-specs">
                  <div className="spec-item">
                    <strong>Flight Track:</strong>
                    <span>High Canopy Cable Run</span>
                  </div>
                  <div className="spec-item">
                    <strong>Safety Gear:</strong>
                    <span>Double-Lock Harness & Helmet</span>
                  </div>
                </div>
                <button className="card-explore-btn" onClick={() => setSelectedActivity(activities[0])}>
                  <span>EXPLORE EXPERIENCE</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>

            {/* Scene 2: High-Wire Sky Biking */}
            <div className="storyboard-scene-pane scene-skybike">
              <div className="scene-framed-card">
                <div className="framed-card-header">
                  <span className="card-number">02</span>
                  <h3 className="card-title">HIGH-WIRE SKY BIKING</h3>
                </div>
                <p className="card-body">
                  A high-adrenaline signature experience combining cycling with aerial thrill. Pedal specialized bicycles suspended high above the tranquil waters of the lagoon.
                </p>
                <div className="card-specs">
                  <div className="spec-item">
                    <strong>Elevation:</strong>
                    <span>Overhead Cable Crossing</span>
                  </div>
                  <div className="spec-item">
                    <strong>Setup:</strong>
                    <span>Dual Anchor Safety Rig</span>
                  </div>
                </div>
                <button className="card-explore-btn" onClick={() => setSelectedActivity(activities[1])}>
                  <span>EXPLORE EXPERIENCE</span>
                  <ArrowRight size={14} />
                </button>
              </div>

              <div className="scene-framed-photo medium-photo offset-down">
                <img src="/Activities/Sky Biking.jpg" alt="High-Wire Sky Biking" className="pane-img" />
                <button 
                  className="scene-photo-plus-badge" 
                  onClick={() => setSelectedActivity(activities[1])}
                  aria-label="View Sky Biking details"
                >
                  <span className="plus-badge-tag">SKY BIKE</span>
                  <span className="plus-badge-icon">+</span>
                </button>
              </div>
            </div>

            {/* Scene 3: Lagoon Paddle Boats */}
            <div className="storyboard-scene-pane scene-paddle">
              <div className="scene-framed-photo medium-photo offset-up">
                <img src="/Activities/Paddle Boats.jpg" alt="Lagoon Paddle Boats" className="pane-img" />
                <button 
                  className="scene-photo-plus-badge" 
                  onClick={() => setSelectedActivity(activities[2])}
                  aria-label="View Paddle Boat details"
                >
                  <span className="plus-badge-tag">PADDLE BOAT</span>
                  <span className="plus-badge-icon">+</span>
                </button>
              </div>

              <div className="scene-framed-card compact">
                <div className="framed-card-header">
                  <span className="card-number">03</span>
                  <h3 className="card-title">LAGOON PADDLE BOATS</h3>
                </div>
                <p className="card-body">
                  Glide peacefully across the shimmering park lagoon. A serene, picturesque cruise perfect for family bonding, romantic dates, and photography.
                </p>
                <button className="card-explore-btn" onClick={() => setSelectedActivity(activities[2])}>
                  <span>VIEW DETAILS</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>

            {/* Scene 4: Scenic Horse Riding */}
            <div className="storyboard-scene-pane scene-horse">
              <div className="scene-framed-card compact">
                <div className="framed-card-header">
                  <span className="card-number">04</span>
                  <h3 className="card-title">SCENIC HORSE RIDING</h3>
                </div>
                <p className="card-body">
                  Gentle horseback treks through coconut trails, blooming pathways, and open green meadows guided by trained park animal caretakers.
                </p>
                <button className="card-explore-btn" onClick={() => setSelectedActivity(activities[3])}>
                  <span>VIEW DETAILS</span>
                  <ArrowRight size={14} />
                </button>
              </div>

              <div className="scene-framed-photo medium-photo offset-down">
                <img src="/Activities/Horse Riding.jpg" alt="Scenic Horse Riding" className="pane-img" />
                <button 
                  className="scene-photo-plus-badge" 
                  onClick={() => setSelectedActivity(activities[3])}
                  aria-label="View Horse Riding details"
                >
                  <span className="plus-badge-tag">HORSE RIDE</span>
                  <span className="plus-badge-icon">+</span>
                </button>
              </div>
            </div>

            {/* Scene 5: Playground & Kiddy Pool */}
            <div className="storyboard-scene-pane scene-family-pair">
              
              {/* Playground */}
              <div className="staggered-pair-col">
                <div className="scene-framed-photo small-photo">
                  <img src="/Activities/Playground.jpg" alt="Playground" className="pane-img" />
                  <button 
                    className="scene-photo-plus-badge" 
                    onClick={() => setSelectedActivity(activities[4])}
                    aria-label="View Playground details"
                  >
                    <span className="plus-badge-tag">PLAYGROUND</span>
                    <span className="plus-badge-icon">+</span>
                  </button>
                </div>
                <div className="scene-framed-card mini">
                  <div className="framed-card-header">
                    <span className="card-number">05</span>
                    <h3 className="card-title">PARK PLAYGROUND</h3>
                  </div>
                  <p className="card-body">
                    Expansive open-air grass playground equipped with swings, slides, and climbing sets under shaded trees.
                  </p>
                </div>
              </div>

              {/* Kiddy Pool */}
              <div className="staggered-pair-col offset-down">
                <div className="scene-framed-card mini">
                  <div className="framed-card-header">
                    <span className="card-number">06</span>
                    <h3 className="card-title">KIDDY SPLASH POOL</h3>
                  </div>
                  <p className="card-body">
                    A refreshing shallow splash pool with clean waters and shaded pavilions for safe family water recreation.
                  </p>
                </div>
                <div className="scene-framed-photo small-photo">
                  <img src="/Activities/Kiddy Pool.jpg" alt="Kiddy Pool" className="pane-img" />
                  <button 
                    className="scene-photo-plus-badge" 
                    onClick={() => setSelectedActivity(activities[5])}
                    aria-label="View Kiddy Pool details"
                  >
                    <span className="plus-badge-tag">KIDDY POOL</span>
                    <span className="plus-badge-icon">+</span>
                  </button>
                </div>
              </div>

            </div>

            {/* Scene 6: Grand Finale Sanctuary Showcase */}
            <div className="storyboard-scene-pane scene-grand-finale">
              <div className="scene-framed-photo grand-architecture-photo">
                <img src="/Background Pictures/Background Hero Section II.jpg" alt="Qetsiyah Eco Park Grounds" className="pane-img" />
              </div>

              <div className="scene-framed-card finale-card">
                <span className="finale-kicker">WHERE ADVENTURE AWAITS</span>
                <h3 className="finale-title">THE HEART OF NATURE & HOSPITALITY</h3>
                <p className="card-body">
                  Every trail, ride, and corner of Qetsiyah Eco Park is designed to inspire wonder, relaxation, and lasting memories with the people who matter most.
                </p>
                <button 
                  className="finale-book-cta"
                  onClick={() => {
                    onNavigate('home');
                    setTimeout(() => {
                      const el = document.querySelector('#contact');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }, 120);
                  }}
                >
                  <span>BOOK YOUR VISIT NOW</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* =========================================================================
            STAGE 3: FLOATING BOTTOM CHAPTER CONTROLLER (Matching Video Pill)
            ========================================================================= */}
        <div className="floating-chapter-dock">
          <div className="chapter-dock-pill">
            <button 
              className="dock-nav-arrow prev" 
              onClick={() => {
                const prev = activeChapterIndex > 1 ? activeChapterIndex - 1 : 1;
                jumpToChapter(prev);
              }}
              aria-label="Previous Chapter"
            >
              <ChevronLeft size={16} />
            </button>

            <div className="dock-chapter-info">
              <span className="dock-label">ACTIVITIES</span>
              <span className="dock-divider">|</span>
              <span className="dock-counter">{activeChapterIndex} / 6</span>
            </div>

            <button 
              className="dock-nav-arrow next" 
              onClick={() => {
                const next = activeChapterIndex < 6 ? activeChapterIndex + 1 : 6;
                jumpToChapter(next);
              }}
              aria-label="Next Chapter"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

      </div>

      {/* =========================================================================
          STAGE 4: INTERACTIVE LIGHTBOX MODAL (Opened via '+' Badges)
          ========================================================================= */}
      {selectedActivity && (
        <div className="activity-detail-modal-overlay" onClick={() => setSelectedActivity(null)}>
          <div className="activity-detail-modal-card" onClick={(e) => e.stopPropagation()}>
            <button 
              className="modal-close-button" 
              onClick={() => setSelectedActivity(null)}
              aria-label="Close detail modal"
            >
              <X size={18} />
            </button>

            <div className="modal-content-grid">
              <div className="modal-photo-pane">
                <img 
                  src={selectedActivity.image} 
                  alt={selectedActivity.title} 
                  className="modal-photo-img" 
                />
                <div className="modal-photo-badge">
                  <span>{selectedActivity.badgeTag}</span>
                </div>
              </div>

              <div className="modal-details-pane">
                <span className="modal-kicker">{selectedActivity.kicker}</span>
                <h3 className="modal-title">{selectedActivity.title}</h3>
                <h4 className="modal-subtitle">{selectedActivity.subtitle}</h4>
                <p className="modal-desc">{selectedActivity.desc}</p>

                <div className="modal-specs-grid">
                  <div className="modal-spec-cell">
                    <span className="cell-label">Location</span>
                    <span className="cell-value">{selectedActivity.location}</span>
                  </div>
                  <div className="modal-spec-cell">
                    <span className="cell-label">Track Type</span>
                    <span className="cell-value">{selectedActivity.elevation}</span>
                  </div>
                  <div className="modal-spec-cell">
                    <span className="cell-label">Safety Standards</span>
                    <span className="cell-value">{selectedActivity.safety}</span>
                  </div>
                  <div className="modal-spec-cell">
                    <span className="cell-label">Capacity</span>
                    <span className="cell-value">{selectedActivity.capacity}</span>
                  </div>
                </div>

                <div className="modal-action-footer">
                  <button 
                    className="modal-book-cta"
                    onClick={() => {
                      setSelectedActivity(null);
                      onNavigate('home');
                      setTimeout(() => {
                        const el = document.querySelector('#contact');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }, 120);
                    }}
                  >
                    <span>BOOK THIS ACTIVITY</span>
                    <ArrowRight size={15} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default ActivitiesFrame;
