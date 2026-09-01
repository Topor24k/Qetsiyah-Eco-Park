import React, { useEffect, useMemo, useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

export function ParkGallerySection() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [lightboxIndex, setLightboxIndex] = useState(null);

  // Compact controls keep the gallery easy to browse while the photos remain
  // the only visual focus of this section.
  const categories = [
    { id: 'all', label: 'All' },
    { id: 'views', label: 'Views' },
    { id: 'adventure', label: 'Adventure' },
    { id: 'waterside', label: 'Waterside' },
    { id: 'family', label: 'Family' },
    { id: 'dining', label: 'Dining' }
  ];

  // Every image is an existing project asset. No generated or third-party
  // gallery imagery is used here.
  const mosaicSlots = [
    'slot-col1-top',
    'slot-col1-mid',
    'slot-col1-bot',
    'slot-col2-tall-photo',
    'slot-col2-bot',
    'slot-col34-top',
    'slot-col3-mid',
    'slot-col4-mid',
    'slot-col34-bot'
  ];

  const photoSources = {
    sanctuary: '/about-adventure-sanctuary.jpg',
    villa: '/about-verde-villa.jpg',
    cafe: '/about-cafe-dining.jpg',
    dusk: '/qetsiyah-tropical-dusk.jpg',
    vista: '/Background Pictures/Background Hero Section II.jpg',
    zipline: '/Activities/Zip Lining.jpg',
    skyBike: '/Activities/Sky Biking.jpg',
    horseRiding: '/Activities/Horse Riding.jpg',
    paddleBoats: '/Activities/Paddle Boats.jpg',
    kiddyPool: '/Activities/Kiddy Pool.jpg',
    playground: '/Activities/Playground.jpg',
    foodHero: '/food-plate-hero.jpg',
    foodBeef: '/Food Menu/Beef Meals.jpg',
    foodChicken: '/Food Menu/Chicken Meals.jpg',
    foodCombo: '/Food Menu/Combo Meals.jpg',
    foodPasta: '/Food Menu/Pasta and Noodles Meals.jpg',
    foodSizzling: '/Food Menu/Sizzling and Grill Meals.jpg',
    foodSoup: '/Food Menu/Soup Meals.jpg',
    foodDrinks: '/Food Menu/Drinks.jpg'
  };

  // Every filter receives a curated nine-photo story in the same editorial
  // frame. This keeps the visual rhythm identical instead of falling back to
  // a sparse, ordinary card grid for the smaller categories.
  const gallerySets = {
    all: ['sanctuary', 'zipline', 'cafe', 'villa', 'paddleBoats', 'dusk', 'horseRiding', 'skyBike', 'kiddyPool'],
    views: ['sanctuary', 'vista', 'dusk', 'villa', 'cafe', 'paddleBoats', 'horseRiding', 'skyBike', 'zipline'],
    adventure: ['zipline', 'skyBike', 'horseRiding', 'paddleBoats', 'kiddyPool', 'playground', 'vista', 'sanctuary', 'dusk'],
    waterside: ['sanctuary', 'paddleBoats', 'kiddyPool', 'dusk', 'vista', 'horseRiding', 'cafe', 'skyBike', 'villa'],
    family: ['kiddyPool', 'playground', 'paddleBoats', 'cafe', 'horseRiding', 'zipline', 'skyBike', 'sanctuary', 'villa'],
    dining: ['cafe', 'foodHero', 'foodBeef', 'foodChicken', 'foodCombo', 'foodPasta', 'foodSizzling', 'foodSoup', 'foodDrinks']
  };

  const activeItems = useMemo(
    () => gallerySets[activeCategory].map((photoId, index) => ({
      id: `${activeCategory}-${photoId}-${index}`,
      image: photoSources[photoId],
      slot: mosaicSlots[index]
    })),
    [activeCategory]
  );

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (lightboxIndex === null) return;
      if (event.key === 'Escape') setLightboxIndex(null);
      if (event.key === 'ArrowLeft') {
        setLightboxIndex((current) => current > 0 ? current - 1 : activeItems.length - 1);
      }
      if (event.key === 'ArrowRight') {
        setLightboxIndex((current) => current < activeItems.length - 1 ? current + 1 : 0);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeItems.length, lightboxIndex]);

  useEffect(() => () => {
    document.body.style.overflow = '';
  }, []);

  const openLightbox = (index) => {
    setLightboxIndex(index);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
    document.body.style.overflow = '';
  };

  const changeImage = (direction, event) => {
    event.stopPropagation();
    setLightboxIndex((current) => (
      direction === 'next'
        ? (current < activeItems.length - 1 ? current + 1 : 0)
        : (current > 0 ? current - 1 : activeItems.length - 1)
    ));
  };

  const handleTileKeyDown = (event, index) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      openLightbox(index);
    }
  };

  const renderTile = (item, index, extraClassName = '') => (
    <div
      key={item.id}
      className={`mosaic-card-wrapper ${extraClassName}`}
      onClick={() => openLightbox(index)}
      onKeyDown={(event) => handleTileKeyDown(event, index)}
      role="button"
      tabIndex={0}
      aria-label={`Open park photo ${index + 1}`}
    >
      <img
        src={item.image}
        alt={`Park gallery photo ${index + 1}`}
        className="mosaic-img"
        loading="lazy"
      />
    </div>
  );

  return (
    <section className="park-gallery-editorial-section" id="park-gallery-mosaic">
      <div className="gallery-editorial-container">
        <div className="gallery-category-filter-bar" aria-label="Park photo categories">
          {categories.map((category) => (
            <button
              key={category.id}
              className={`gallery-category-pill-btn ${activeCategory === category.id ? 'is-active' : ''}`}
              onClick={() => {
                setActiveCategory(category.id);
                setLightboxIndex(null);
              }}
              type="button"
              aria-pressed={activeCategory === category.id}
            >
              <span className="gallery-btn-label">{category.label}</span>
            </button>
          ))}
        </div>

        <div key={activeCategory} className="gallery-reference-mosaic-grid gallery-photo-only-grid">
          {activeItems.map((item, index) => renderTile(item, index, item.slot))}
        </div>
      </div>

      {lightboxIndex !== null && activeItems[lightboxIndex] && (
        <div className="gallery-lightbox-backdrop" onClick={closeLightbox}>
          <div className="gallery-lightbox-modal" onClick={(event) => event.stopPropagation()}>
            <button
              className="lightbox-close-btn"
              onClick={closeLightbox}
              aria-label="Close photo"
            >
              <X size={24} />
            </button>

            <button
              className="lightbox-arrow-btn arrow-prev"
              onClick={(event) => changeImage('previous', event)}
              aria-label="Previous photo"
            >
              <ChevronLeft size={32} />
            </button>

            <div className="lightbox-image-stage">
              <img
                src={activeItems[lightboxIndex].image}
                alt={`Park gallery photo ${lightboxIndex + 1}`}
                className="lightbox-display-img"
              />
            </div>

            <button
              className="lightbox-arrow-btn arrow-next"
              onClick={(event) => changeImage('next', event)}
              aria-label="Next photo"
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
