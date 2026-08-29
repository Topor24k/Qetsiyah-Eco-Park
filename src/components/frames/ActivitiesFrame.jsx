import React, { useState, useEffect } from 'react';
import { X, ArrowRight, Compass, Sparkles, Shield, ChevronLeft, ChevronRight } from 'lucide-react';

export function ActivitiesFrame({ onNavigate }) {
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [activeChapterIndex, setActiveChapterIndex] = useState(1);

  const activities = [
    {
      id: 'zipline',
      number: '01',
      kicker: 'AERIAL ADVENTURES',
      title: 'CANOPY ZIP LINING',
      subtitle: 'SOAR ABOVE EMERALD CANOPIES',
      desc: 'Feel the exhilarating rush of flying high above the lush rainforest canopies. With high-tension dual cables spanning across the park, experience panoramic 360-degree views of Sultan Kudarat’s vibrant botanical flora and rolling landscapes.',
      image: '/Activities/Zip Lining.jpg',
      badgeTag: 'AERIAL THRILL',
      location: 'Park High Canopy Station',
      elevation: 'High-Altitude Cable Flight',
      safety: 'Full Double-Harness & Helmet Provided',
      capacity: 'Single Rider per Cable'
    },
    {
      id: 'skybike',
      number: '02',
      kicker: 'SIGNATURE ATTRACTION',
      title: 'HIGH-WIRE SKY BIKING',
      subtitle: 'PEDAL ACROSS THE HORIZON',
      desc: 'A signature heart-pumping feat combining cycling with aerial thrill. Pedal specialized suspended bicycles across overhead steel cables high above the tranquil waters of the park lagoon, backed by breathtaking mountain horizons.',
      image: '/Activities/Sky Biking.jpg',
      badgeTag: 'HIGH WIRE',
      location: 'Lagoon Skyway Crossing',
      elevation: 'Suspended Mid-Air Track',
      safety: 'Dual Anchor Lock & Attendant Assist',
      capacity: '1 to 2 Tandem Riders'
    },
    {
      id: 'paddleboat',
      number: '03',
      kicker: 'LAGOON WATERS',
      title: 'LAGOON PADDLE BOATS',
      subtitle: 'SERENE WATERFRONT MOMENTS',
      desc: 'Glide peacefully across the shimmering park lagoon aboard colorful pedal boats. Surrounded by lotus blooms, weeping willows, and cool tropical breezes, it is the quintessential relaxing water retreat for couples and families.',
      image: '/Activities/Paddle Boats.jpg',
      badgeTag: 'LAGOON CRUISE',
      location: 'Central Freshwater Lagoon',
      elevation: 'Water Level Cruise',
      safety: 'Life Vests & On-Dock Lifeguards',
      capacity: 'Up to 4 Guests per Boat'
    },
    {
      id: 'horseriding',
      number: '04',
      kicker: 'EQUESTRIAN TRAILS',
      title: 'SCENIC HORSE RIDING',
      subtitle: 'JOURNEY THROUGH NATURE PATHS',
      desc: 'Embark on a guided horseback tour through gentle shaded trails, coconut groves, and open green pastures. Accompanied by experienced animal caretakers, this gentle trek lets you connect deeply with nature.',
      image: '/Activities/Horse Riding.jpg',
      badgeTag: 'EQUESTRIAN',
      location: 'Meadow Trail Head',
      elevation: 'Ground Trail Trek',
      safety: 'Guided by Trained Caretakers',
      capacity: 'Individual Guided Mounts'
    },
    {
      id: 'playground',
      number: '05',
      kicker: 'FAMILY & RECREATION',
      title: 'PARK PLAYGROUND',
      subtitle: 'LAUGHTER & OPEN-AIR PLAY',
      desc: 'A vibrant open-air lawn playground equipped with swings, slides, climbing sets, and soft grassy lawns where children can run freely in a safe, nature-enclosed environment while parents relax nearby under shaded gazebos.',
      image: '/Activities/Playground.jpg',
      badgeTag: 'FAMILY FUN',
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
      desc: 'A dedicated shallow splash wading pool designed for young adventurers. Featuring crystal-clear treated waters, gentle water showers, and perimeter shaded seating, providing refreshing relief on warm tropical afternoons.',
      image: '/Activities/Kiddy Pool.jpg',
      badgeTag: 'SPLASH POOL',
      location: 'Poolside Pavilion Area',
      elevation: 'Ground Level Pool',
      safety: 'Shallow Depth & Pool Attendant',
      capacity: 'Children & Family Access'
    }
  ];

  // Track active chapter on scroll
  useEffect(() => {
    const handleScroll = () => {
      const storyCards = document.querySelectorAll('.storyboard-block');
      storyCards.forEach((card, index) => {
        const rect = card.getBoundingClientRect();
        if (rect.top <= window.innerHeight * 0.5 && rect.bottom >= window.innerHeight * 0.2) {
          setActiveChapterIndex(index + 1);
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToActivity = (index) => {
    const el = document.getElementById(`activity-story-${index}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <div className="frame-view-wrapper activities-cinematic-page">
      
      {/* =========================================================================
          1. TRIPTYCH ARCHWAY HERO (Based on Video Hero Header & 3 Arches)
          ========================================================================= */}
      <section className="triptych-hero-section">
        <div className="triptych-hero-container">
          
          {/* Top Classical Header Frame */}
          <div className="triptych-top-header">
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

          {/* 3 Arched Panoramic Portals (Triptych Layout) */}
          <div className="triptych-arches-stage">
            
            {/* Left Arch Portal */}
            <div 
              className="triptych-arch-card arch-left"
              onClick={() => scrollToActivity(1)}
              role="button"
              tabIndex={0}
            >
              <div className="arch-frame-inner">
                <img 
                  src="/Activities/Sky Biking.jpg" 
                  alt="Sky Biking at Qetsiyah" 
                  className="arch-img" 
                />
                <div className="arch-overlay-scrim"></div>
                <div className="arch-floating-label">
                  <span>HIGH-WIRE SKY BIKING</span>
                </div>
              </div>
            </div>

            {/* Center Grand Dominant Arch */}
            <div 
              className="triptych-arch-card arch-center"
              onClick={() => scrollToActivity(0)}
              role="button"
              tabIndex={0}
            >
              <div className="arch-frame-inner grand-arch">
                <img 
                  src="/Activities/Zip Lining.jpg" 
                  alt="Canopy Zip Lining at Qetsiyah" 
                  className="arch-img" 
                />
                <div className="arch-overlay-scrim center-scrim"></div>
                <div className="arch-center-caption">
                  <span className="arch-kicker">FEATURED ADVENTURE</span>
                  <h3>CANOPY ZIP LINING</h3>
                  <p>Soar 360° Across Emerald Tree-Tops</p>
                </div>
              </div>
            </div>

            {/* Right Arch Portal */}
            <div 
              className="triptych-arch-card arch-right"
              onClick={() => scrollToActivity(2)}
              role="button"
              tabIndex={0}
            >
              <div className="arch-frame-inner">
                <img 
                  src="/Activities/Paddle Boats.jpg" 
                  alt="Lagoon Paddle Boats" 
                  className="arch-img" 
                />
                <div className="arch-overlay-scrim"></div>
                <div className="arch-floating-label">
                  <span>LAGOON PADDLE BOATS</span>
                </div>
              </div>
            </div>

            {/* Flowing Script Accent Typography across the base */}
            <div className="triptych-script-overlay">
              <span className="script-accent-text">Power Your Adventure in Nature</span>
            </div>
          </div>

        </div>
      </section>

      {/* =========================================================================
          2. STAGGERED EDITORIAL STORYBOARD GALLERY (Scroll Flow from Video)
          ========================================================================= */}
      <section className="editorial-storyboard-section">
        <div className="storyboard-container">

          {/* Block 1: Zip Lining (Wide Left Photo + Right Story Card) */}
          <div className="storyboard-block block-layout-split" id="activity-story-0">
            <div className="storyboard-photo-col">
              <div className="framed-photo-card large-card">
                <img src="/Activities/Zip Lining.jpg" alt="Canopy Zip Lining" className="framed-photo-img" />
                <button 
                  className="framed-photo-plus-badge" 
                  onClick={() => setSelectedActivity(activities[0])}
                  aria-label="View Canopy Zip Lining details"
                >
                  <span className="plus-badge-tag">ZIP LINE</span>
                  <span className="plus-badge-icon">+</span>
                </button>
              </div>
            </div>

            <div className="storyboard-text-col">
              <div className="framed-story-card">
                <div className="framed-story-header">
                  <span className="story-card-number">01</span>
                  <h3 className="story-card-title">CANOPY ZIP LINING</h3>
                </div>
                <p className="story-card-body">
                  Feel the rush of flying across high-elevation cables with breathtaking panoramic views of Tacurong's lush landscapes, botanical gardens, and tropical tree-tops.
                </p>
                <div className="story-card-specs">
                  <div className="spec-row">
                    <span className="spec-name">Track:</span>
                    <span className="spec-detail">High Canopy Cable Flight</span>
                  </div>
                  <div className="spec-row">
                    <span className="spec-name">Safety:</span>
                    <span className="spec-detail">Full Harness & Helmet Included</span>
                  </div>
                </div>
                <button 
                  className="story-card-cta"
                  onClick={() => setSelectedActivity(activities[0])}
                >
                  <span>EXPLORE EXPERIENCE</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </div>

          {/* Block 2: Sky Biking (Right Large Photo + Left Story Card) */}
          <div className="storyboard-block block-layout-split reverse" id="activity-story-1">
            <div className="storyboard-text-col">
              <div className="framed-story-card">
                <div className="framed-story-header">
                  <span className="story-card-number">02</span>
                  <h3 className="story-card-title">HIGH-WIRE SKY BIKING</h3>
                </div>
                <p className="story-card-body">
                  A high-adrenaline signature experience combining cycling with aerial thrill. Pedal suspended bicycles along overhead cables high above the lagoon with 360-degree vistas.
                </p>
                <div className="story-card-specs">
                  <div className="spec-row">
                    <span className="spec-name">Elevation:</span>
                    <span className="spec-detail">Overhead Lagoon Crossing</span>
                  </div>
                  <div className="spec-row">
                    <span className="spec-name">Setup:</span>
                    <span className="spec-detail">Dual Anchor Safety Lock</span>
                  </div>
                </div>
                <button 
                  className="story-card-cta"
                  onClick={() => setSelectedActivity(activities[1])}
                >
                  <span>EXPLORE EXPERIENCE</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>

            <div className="storyboard-photo-col">
              <div className="framed-photo-card large-card">
                <img src="/Activities/Sky Biking.jpg" alt="High-Wire Sky Biking" className="framed-photo-img" />
                <button 
                  className="framed-photo-plus-badge"
                  onClick={() => setSelectedActivity(activities[1])}
                  aria-label="View High-Wire Sky Biking details"
                >
                  <span className="plus-badge-tag">SKY BIKE</span>
                  <span className="plus-badge-icon">+</span>
                </button>
              </div>
            </div>
          </div>

          {/* Block 3 & 4: Paddle Boats & Horse Riding (Staggered Editorial Pair) */}
          <div className="storyboard-block block-layout-staggered-pair">
            
            {/* Paddle Boats Card */}
            <div className="staggered-item item-left" id="activity-story-2">
              <div className="framed-photo-card medium-card">
                <img src="/Activities/Paddle Boats.jpg" alt="Lagoon Paddle Boats" className="framed-photo-img" />
                <button 
                  className="framed-photo-plus-badge"
                  onClick={() => setSelectedActivity(activities[2])}
                  aria-label="View Lagoon Paddle Boats details"
                >
                  <span className="plus-badge-tag">PADDLE BOAT</span>
                  <span className="plus-badge-icon">+</span>
                </button>
              </div>
              <div className="framed-story-card compact">
                <div className="framed-story-header">
                  <span className="story-card-number">03</span>
                  <h3 className="story-card-title">LAGOON PADDLE BOATS</h3>
                </div>
                <p className="story-card-body">
                  Glide peacefully across the shimmering park lagoon. A calming, scenic cruise perfect for family bonding, romantic dates, and waterfront photography.
                </p>
                <button 
                  className="story-card-cta"
                  onClick={() => setSelectedActivity(activities[2])}
                >
                  <span>VIEW DETAILS</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>

            {/* Horse Riding Card */}
            <div className="staggered-item item-right" id="activity-story-3">
              <div className="framed-story-card compact">
                <div className="framed-story-header">
                  <span className="story-card-number">04</span>
                  <h3 className="story-card-title">SCENIC HORSE RIDING</h3>
                </div>
                <p className="story-card-body">
                  Gentle horseback treks through coconut trails, blooming pathways, and open green meadows guided by trained park animal caretakers.
                </p>
                <button 
                  className="story-card-cta"
                  onClick={() => setSelectedActivity(activities[3])}
                >
                  <span>VIEW DETAILS</span>
                  <ArrowRight size={14} />
                </button>
              </div>
              <div className="framed-photo-card medium-card">
                <img src="/Activities/Horse Riding.jpg" alt="Scenic Horse Riding" className="framed-photo-img" />
                <button 
                  className="framed-photo-plus-badge"
                  onClick={() => setSelectedActivity(activities[3])}
                  aria-label="View Scenic Horse Riding details"
                >
                  <span className="plus-badge-tag">HORSE RIDE</span>
                  <span className="plus-badge-icon">+</span>
                </button>
              </div>
            </div>

          </div>

          {/* Block 5 & 6: Playground & Kiddy Pool */}
          <div className="storyboard-block block-layout-staggered-pair second-pair">
            
            {/* Playground Card */}
            <div className="staggered-item item-left" id="activity-story-4">
              <div className="framed-photo-card medium-card">
                <img src="/Activities/Playground.jpg" alt="Park Playground" className="framed-photo-img" />
                <button 
                  className="framed-photo-plus-badge"
                  onClick={() => setSelectedActivity(activities[4])}
                  aria-label="View Playground details"
                >
                  <span className="plus-badge-tag">PLAYGROUND</span>
                  <span className="plus-badge-icon">+</span>
                </button>
              </div>
              <div className="framed-story-card compact">
                <div className="framed-story-header">
                  <span className="story-card-number">05</span>
                  <h3 className="story-card-title">PARK PLAYGROUND</h3>
                </div>
                <p className="story-card-body">
                  An expansive outdoor recreation area where kids can swing, climb, and laugh in the shade of lush tropical trees.
                </p>
                <button 
                  className="story-card-cta"
                  onClick={() => setSelectedActivity(activities[4])}
                >
                  <span>VIEW DETAILS</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>

            {/* Kiddy Pool Card */}
            <div className="staggered-item item-right" id="activity-story-5">
              <div className="framed-story-card compact">
                <div className="framed-story-header">
                  <span className="story-card-number">06</span>
                  <h3 className="story-card-title">KIDDY SPLASH POOL</h3>
                </div>
                <p className="story-card-body">
                  A refreshing shallow splash pool with crystal clean waters and shaded pavilions for safe family water recreation.
                </p>
                <button 
                  className="story-card-cta"
                  onClick={() => setSelectedActivity(activities[5])}
                >
                  <span>VIEW DETAILS</span>
                  <ArrowRight size={14} />
                </button>
              </div>
              <div className="framed-photo-card medium-card">
                <img src="/Activities/Kiddy Pool.jpg" alt="Kiddy Splash Pool" className="framed-photo-img" />
                <button 
                  className="framed-photo-plus-badge"
                  onClick={() => setSelectedActivity(activities[5])}
                  aria-label="View Kiddy Splash Pool details"
                >
                  <span className="plus-badge-tag">KIDDY POOL</span>
                  <span className="plus-badge-icon">+</span>
                </button>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          3. FLOATING BOTTOM CHAPTER DOCK (Matching Video Bottom Pill)
          ========================================================================= */}
      <div className="floating-chapter-dock">
        <div className="chapter-dock-pill">
          <button 
            className="dock-nav-arrow prev" 
            onClick={() => {
              const prevIdx = activeChapterIndex > 1 ? activeChapterIndex - 2 : activities.length - 1;
              scrollToActivity(prevIdx);
            }}
            aria-label="Previous Activity"
          >
            <ChevronLeft size={16} />
          </button>

          <div className="dock-chapter-info">
            <span className="dock-label">ACTIVITIES</span>
            <span className="dock-counter">{activeChapterIndex} / {activities.length}</span>
          </div>

          <button 
            className="dock-nav-arrow next" 
            onClick={() => {
              const nextIdx = activeChapterIndex < activities.length ? activeChapterIndex : 0;
              scrollToActivity(nextIdx);
            }}
            aria-label="Next Activity"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* =========================================================================
          4. INTERACTIVE ACTIVITY MODAL / LIGHTBOX (Opened via '+' Badge)
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
