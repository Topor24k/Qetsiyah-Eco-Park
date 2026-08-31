import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';

export function ParkGallerySection() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [lightboxIndex, setLightboxIndex] = useState(null);

  // Exact categories matching the website's Mega Menu & navigation
  const categories = [
    { id: 'all', label: 'View All Park Photos' },
    { id: 'highlights', label: 'Park Highlights & Views' },
    { id: 'activities', label: 'Activity Moments' },
    { id: 'events', label: 'Event Hall & Pavilions' },
    { id: 'grounds', label: 'Lakeside Grounds' },
    { id: 'dining', label: 'Café & Dining Ambiance' }
  ];

  // Master gallery items dataset with exact category associations
  const allGalleryItems = [
    // 1. Column 1 - Top (Landscape / Grand Vault)
    {
      id: 'col1-top',
      slot: 'col1-top',
      title: 'Grand Canopy & Sanctuary Vista',
      subtitle: 'Natural Eco-Sanctuary',
      category: 'highlights',
      categories: ['highlights', 'grounds'],
      image: '/about-adventure-sanctuary.jpg',
      aspect: 'landscape',
      tag: '01 / ARCHIVE'
    },
    // 2. Column 1 - Middle (Tall / Curves & Arches)
    {
      id: 'col1-mid',
      slot: 'col1-mid',
      title: 'Zipline High Canopy Course',
      subtitle: 'Adventure Experiences',
      category: 'activities',
      categories: ['activities'],
      image: '/Activities/Zip Lining.jpg',
      aspect: 'portrait',
      tag: '02 / ADVENTURE'
    },
    // 3. Column 1 - Bottom (Landscape / Staircase Hall)
    {
      id: 'col1-bot',
      slot: 'col1-bot',
      title: 'Qetsiyah Café Veranda & Dining',
      subtitle: 'Café & Restaurant',
      category: 'dining',
      categories: ['dining'],
      image: '/about-cafe-dining.jpg',
      aspect: 'landscape',
      tag: '03 / DINING'
    },
    // 4. Column 2 - Top (Tall Rotunda / Main Feature)
    {
      id: 'col2-top',
      slot: 'col2-top',
      title: 'Verde Villa Luxury Retreat',
      subtitle: 'Exclusive Suites & Grounds',
      category: 'events',
      categories: ['events', 'highlights'],
      image: '/about-verde-villa.jpg',
      aspect: 'tall-portrait',
      tag: '04 / RETREAT'
    },
    // 5. Column 2 - Bottom (Classical Facade / Gate)
    {
      id: 'col2-bot',
      slot: 'col2-bot',
      title: 'Grand Event Pavilion & Hall Entrance',
      subtitle: 'Celebrations & Milestones',
      category: 'events',
      categories: ['events'],
      image: '/Activities/Playground.jpg',
      aspect: 'landscape',
      tag: '05 / PAVILION'
    },
    // 6. Column 3 & 4 - Top Spanning (Wide Panorama / Skyline & Bridge)
    {
      id: 'col34-top',
      slot: 'col34-top',
      title: 'Tropical Dusk Panoramic Lake View',
      subtitle: 'Scenic Sunset Horizon',
      category: 'highlights',
      categories: ['highlights', 'grounds'],
      image: '/qetsiyah-tropical-dusk.jpg',
      aspect: 'wide-landscape',
      tag: '06 / PANORAMA'
    },
    // 7. Column 3 - Middle (Tall / Sculpture in Arch)
    {
      id: 'col3-mid',
      slot: 'col3-mid',
      title: 'Horse Riding Trails & Botanical Grove',
      subtitle: 'Guided Equestrian Tours',
      category: 'activities',
      categories: ['activities', 'grounds'],
      image: '/Activities/Horse Riding.jpg',
      aspect: 'portrait',
      tag: '07 / TRAILS'
    },
    // 8. Column 4 - Middle (Tall / Boulevard Street View)
    {
      id: 'col4-mid',
      slot: 'col4-mid',
      title: 'Sky Biking High-Wire Adventure',
      subtitle: 'Panoramic Aerial Ride',
      category: 'activities',
      categories: ['activities'],
      image: '/Activities/Sky Biking.jpg',
      aspect: 'portrait',
      tag: '08 / SKY RIDE'
    },
    // 9. Column 3 & 4 - Bottom Spanning (Wide Exhibition Hall & Visitors)
    {
      id: 'col34-bot',
      slot: 'col34-bot',
      title: 'Lakeside Paddle Boats & Recreation',
      subtitle: 'Family Fun & Water Activities',
      category: 'grounds',
      categories: ['grounds', 'activities'],
      image: '/Activities/Paddle Boats.jpg',
      aspect: 'wide-landscape',
      tag: '09 / LAKESIDE'
    },
    // Extra photos for rich category exploration
    {
      id: 'extra-pool-1',
      title: 'Kiddy Pool Resort & Family Splash Area',
      subtitle: 'Children Splash Park',
      category: 'activities',
      categories: ['activities', 'grounds'],
      image: '/Activities/Kiddy Pool.jpg',
      aspect: 'landscape',
      tag: '10 / POOL'
    },
    {
      id: 'extra-grounds-1',
      title: 'Botanical Walkways & Tropical Gardens',
      subtitle: 'Lush Manicured Grounds',
      category: 'grounds',
      categories: ['grounds', 'highlights'],
      image: '/Background Pictures/Background Hero Section II.jpg',
      aspect: 'landscape',
      tag: '11 / GROUNDS'
    },
    {
      id: 'extra-dining-1',
      title: 'Qetsiyah Culinary Special Delights',
      subtitle: 'Local Flavors & Comfort Dishes',
      category: 'dining',
      categories: ['dining'],
      image: '/food-plate-hero.jpg',
      aspect: 'landscape',
      tag: '12 / DINING'
    }
  ];

  // Active items based on selected category tab
  const activeItems = activeCategory === 'all' 
    ? allGalleryItems.slice(0, 9) 
    : allGalleryItems.filter(item => item.categories ? item.categories.includes(activeCategory) : item.category === activeCategory);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowLeft') {
        setLightboxIndex((prev) => (prev > 0 ? prev - 1 : activeItems.length - 1));
      }
      if (e.key === 'ArrowRight') {
        setLightboxIndex((prev) => (prev < activeItems.length - 1 ? prev + 1 : 0));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, activeItems.length]);

  const openLightbox = (index) => {
    setLightboxIndex(index);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
    document.body.style.overflow = '';
  };

  const nextImage = (e) => {
    e.stopPropagation();
    setLightboxIndex((prev) => (prev < activeItems.length - 1 ? prev + 1 : 0));
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setLightboxIndex((prev) => (prev > 0 ? prev - 1 : activeItems.length - 1));
  };

  return (
    <section className="park-gallery-editorial-section" id="park-gallery-mosaic">
      <div className="gallery-editorial-container">
        
        {/* =========================================================================
            CATEGORY FILTER BUTTONS (Matching Website Aesthetic & Mega Menu)
           ========================================================================= */}
        <div className="gallery-category-filter-bar">
          {categories.map((cat) => (
            <button
              key={cat.id}
              className={`gallery-category-pill-btn ${activeCategory === cat.id ? 'is-active' : ''}`}
              onClick={() => {
                setActiveCategory(cat.id);
                setLightboxIndex(null);
              }}
              type="button"
            >
              <span className="gallery-btn-label">{cat.label}</span>
            </button>
          ))}
        </div>

        {/* =========================================================================
            MAIN GALLERY VIEW: 4-COLUMN MOSAIC (WHEN 'VIEW ALL PARK PHOTOS' IS SELECTED)
           ========================================================================= */}
        {activeCategory === 'all' ? (
          <div className="gallery-reference-mosaic-grid">
            
            {/* ----------------- COLUMN 1: 3 Stacked Photos ----------------- */}
            {/* Slot 1: Col 1 Top */}
            <div 
              className="mosaic-card-wrapper slot-col1-top"
              onClick={() => openLightbox(0)}
              role="button"
              tabIndex={0}
              aria-label="View photo: Grand Canopy & Sanctuary Vista"
            >
              <img 
                src={allGalleryItems[0].image} 
                alt={allGalleryItems[0].title}
                className="mosaic-img"
                loading="lazy"
              />
              <div className="mosaic-hover-overlay">
                <span className="mosaic-tag-pill">{allGalleryItems[0].tag}</span>
                <h4 className="mosaic-overlay-title">{allGalleryItems[0].title}</h4>
                <p className="mosaic-overlay-sub">{allGalleryItems[0].subtitle}</p>
                <div className="mosaic-zoom-icon-wrap">
                  <Maximize2 size={16} />
                </div>
              </div>
            </div>

            {/* Slot 2: Col 1 Middle */}
            <div 
              className="mosaic-card-wrapper slot-col1-mid"
              onClick={() => openLightbox(1)}
              role="button"
              tabIndex={0}
              aria-label="View photo: Zipline High Canopy Course"
            >
              <img 
                src={allGalleryItems[1].image} 
                alt={allGalleryItems[1].title}
                className="mosaic-img"
                loading="lazy"
              />
              <div className="mosaic-hover-overlay">
                <span className="mosaic-tag-pill">{allGalleryItems[1].tag}</span>
                <h4 className="mosaic-overlay-title">{allGalleryItems[1].title}</h4>
                <p className="mosaic-overlay-sub">{allGalleryItems[1].subtitle}</p>
                <div className="mosaic-zoom-icon-wrap">
                  <Maximize2 size={16} />
                </div>
              </div>
            </div>

            {/* Slot 3: Col 1 Bottom */}
            <div 
              className="mosaic-card-wrapper slot-col1-bot"
              onClick={() => openLightbox(2)}
              role="button"
              tabIndex={0}
              aria-label="View photo: Qetsiyah Café Veranda & Dining"
            >
              <img 
                src={allGalleryItems[2].image} 
                alt={allGalleryItems[2].title}
                className="mosaic-img"
                loading="lazy"
              />
              <div className="mosaic-hover-overlay">
                <span className="mosaic-tag-pill">{allGalleryItems[2].tag}</span>
                <h4 className="mosaic-overlay-title">{allGalleryItems[2].title}</h4>
                <p className="mosaic-overlay-sub">{allGalleryItems[2].subtitle}</p>
                <div className="mosaic-zoom-icon-wrap">
                  <Maximize2 size={16} />
                </div>
              </div>
            </div>


            {/* ----------------- COLUMN 2: Tall Photo + Bottom Photo ----------------- */}
            {/* Slot 4: Col 2 Tall Top Photo */}
            <div 
              className="mosaic-card-wrapper slot-col2-tall-photo"
              onClick={() => openLightbox(3)}
              role="button"
              tabIndex={0}
              aria-label="View photo: Verde Villa Luxury Retreat"
            >
              <img 
                src={allGalleryItems[3].image} 
                alt={allGalleryItems[3].title}
                className="mosaic-img"
                loading="lazy"
              />
              <div className="mosaic-hover-overlay">
                <span className="mosaic-tag-pill">{allGalleryItems[3].tag}</span>
                <h4 className="mosaic-overlay-title">{allGalleryItems[3].title}</h4>
                <p className="mosaic-overlay-sub">{allGalleryItems[3].subtitle}</p>
                <div className="mosaic-zoom-icon-wrap">
                  <Maximize2 size={16} />
                </div>
              </div>
            </div>

            {/* Slot 5: Col 2 Bottom */}
            <div 
              className="mosaic-card-wrapper slot-col2-bot"
              onClick={() => openLightbox(4)}
              role="button"
              tabIndex={0}
              aria-label="View photo: Grand Event Pavilion & Hall Entrance"
            >
              <img 
                src={allGalleryItems[4].image} 
                alt={allGalleryItems[4].title}
                className="mosaic-img"
                loading="lazy"
              />
              <div className="mosaic-hover-overlay">
                <span className="mosaic-tag-pill">{allGalleryItems[4].tag}</span>
                <h4 className="mosaic-overlay-title">{allGalleryItems[4].title}</h4>
                <p className="mosaic-overlay-sub">{allGalleryItems[4].subtitle}</p>
                <div className="mosaic-zoom-icon-wrap">
                  <Maximize2 size={16} />
                </div>
              </div>
            </div>


            {/* ----------------- COLUMNS 3 & 4 (Right Half) ----------------- */}
            {/* Slot 6: Col 3 & 4 Top Spanning (Wide 2-Column Panorama) */}
            <div 
              className="mosaic-card-wrapper slot-col34-top"
              onClick={() => openLightbox(5)}
              role="button"
              tabIndex={0}
              aria-label="View photo: Tropical Dusk Panoramic Lake View"
            >
              <img 
                src={allGalleryItems[5].image} 
                alt={allGalleryItems[5].title}
                className="mosaic-img"
                loading="lazy"
              />
              <div className="mosaic-hover-overlay">
                <span className="mosaic-tag-pill">{allGalleryItems[5].tag}</span>
                <h4 className="mosaic-overlay-title">{allGalleryItems[5].title}</h4>
                <p className="mosaic-overlay-sub">{allGalleryItems[5].subtitle}</p>
                <div className="mosaic-zoom-icon-wrap">
                  <Maximize2 size={16} />
                </div>
              </div>
            </div>

            {/* Slot 7: Col 3 Middle (Tall Portrait) */}
            <div 
              className="mosaic-card-wrapper slot-col3-mid"
              onClick={() => openLightbox(6)}
              role="button"
              tabIndex={0}
              aria-label="View photo: Horse Riding Trails & Botanical Grove"
            >
              <img 
                src={allGalleryItems[6].image} 
                alt={allGalleryItems[6].title}
                className="mosaic-img"
                loading="lazy"
              />
              <div className="mosaic-hover-overlay">
                <span className="mosaic-tag-pill">{allGalleryItems[6].tag}</span>
                <h4 className="mosaic-overlay-title">{allGalleryItems[6].title}</h4>
                <p className="mosaic-overlay-sub">{allGalleryItems[6].subtitle}</p>
                <div className="mosaic-zoom-icon-wrap">
                  <Maximize2 size={16} />
                </div>
              </div>
            </div>

            {/* Slot 8: Col 4 Middle (Tall Portrait) */}
            <div 
              className="mosaic-card-wrapper slot-col4-mid"
              onClick={() => openLightbox(7)}
              role="button"
              tabIndex={0}
              aria-label="View photo: Sky Biking High-Wire Adventure"
            >
              <img 
                src={allGalleryItems[7].image} 
                alt={allGalleryItems[7].title}
                className="mosaic-img"
                loading="lazy"
              />
              <div className="mosaic-hover-overlay">
                <span className="mosaic-tag-pill">{allGalleryItems[7].tag}</span>
                <h4 className="mosaic-overlay-title">{allGalleryItems[7].title}</h4>
                <p className="mosaic-overlay-sub">{allGalleryItems[7].subtitle}</p>
                <div className="mosaic-zoom-icon-wrap">
                  <Maximize2 size={16} />
                </div>
              </div>
            </div>

            {/* Slot 9: Col 3 & 4 Bottom Spanning (Wide 2-Column Exhibition) */}
            <div 
              className="mosaic-card-wrapper slot-col34-bot"
              onClick={() => openLightbox(8)}
              role="button"
              tabIndex={0}
              aria-label="View photo: Lakeside Paddle Boats & Recreation"
            >
              <img 
                src={allGalleryItems[8].image} 
                alt={allGalleryItems[8].title}
                className="mosaic-img"
                loading="lazy"
              />
              <div className="mosaic-hover-overlay">
                <span className="mosaic-tag-pill">{allGalleryItems[8].tag}</span>
                <h4 className="mosaic-overlay-title">{allGalleryItems[8].title}</h4>
                <p className="mosaic-overlay-sub">{allGalleryItems[8].subtitle}</p>
                <div className="mosaic-zoom-icon-wrap">
                  <Maximize2 size={16} />
                </div>
              </div>
            </div>

          </div>
        ) : (
          /* =========================================================================
             FILTERED CATEGORY GRID VIEW
             ========================================================================= */
          <div className="gallery-filtered-category-grid">
            {activeItems.map((item, idx) => (
              <div 
                key={item.id}
                className="mosaic-card-wrapper filtered-category-card"
                onClick={() => openLightbox(idx)}
                role="button"
                tabIndex={0}
                aria-label={`View photo: ${item.title}`}
              >
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="mosaic-img"
                  loading="lazy"
                />
                <div className="mosaic-hover-overlay">
                  <span className="mosaic-tag-pill">{item.tag}</span>
                  <h4 className="mosaic-overlay-title">{item.title}</h4>
                  <p className="mosaic-overlay-sub">{item.subtitle}</p>
                  <div className="mosaic-zoom-icon-wrap">
                    <Maximize2 size={16} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* =========================================================================
          FULLSCREEN HIGH-RES LIGHTBOX MODAL
         ========================================================================= */}
      {lightboxIndex !== null && activeItems[lightboxIndex] && (
        <div className="gallery-lightbox-backdrop" onClick={closeLightbox}>
          <div className="gallery-lightbox-modal" onClick={(e) => e.stopPropagation()}>
            {/* Close Button */}
            <button 
              className="lightbox-close-btn" 
              onClick={closeLightbox}
              aria-label="Close Lightbox"
            >
              <X size={24} />
            </button>

            {/* Left Nav Arrow */}
            <button 
              className="lightbox-arrow-btn arrow-prev" 
              onClick={prevImage}
              aria-label="Previous Photo"
            >
              <ChevronLeft size={32} />
            </button>

            {/* Active Image & Info */}
            <div className="lightbox-image-stage">
              <img 
                src={activeItems[lightboxIndex].image} 
                alt={activeItems[lightboxIndex].title}
                className="lightbox-display-img"
              />
              <div className="lightbox-caption-bar">
                <div className="lightbox-caption-text">
                  <span className="lightbox-counter">
                    {lightboxIndex + 1} of {activeItems.length}
                  </span>
                  <h3 className="lightbox-image-title">
                    {activeItems[lightboxIndex].title}
                  </h3>
                  <p className="lightbox-image-desc">
                    {activeItems[lightboxIndex].subtitle}
                  </p>
                </div>
              </div>
            </div>

            {/* Right Nav Arrow */}
            <button 
              className="lightbox-arrow-btn arrow-next" 
              onClick={nextImage}
              aria-label="Next Photo"
            >
              <ChevronRight size={32} />
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

export default ParkGallerySection;
