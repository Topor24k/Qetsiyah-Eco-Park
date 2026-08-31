import React from 'react';
import { CategoryOpeningHero } from '../CategoryOpeningHero';
import { ParkGallerySection } from '../ParkGallerySection';

export function GalleryFrame({ onNavigate }) {
  const scrollToGallery = () => {
    const el = document.querySelector('#park-gallery-mosaic');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="frame-view-wrapper gallery-page">
      {/* 1. Category Opening Hero */}
      <CategoryOpeningHero 
        titleTop="DISCOVER" 
        titleBottom="OUR PARK GALLERY" 
        flankLeft="VISUAL EXPERIENCES" 
        flankRight="SULTAN KUDARAT" 
        image="/Background Pictures/Background Hero Section II.jpg"
        id="gallery" 
        hasContentBelow={true}
        onExploreBelow={scrollToGallery}
      />

      {/* 2. Editorial Mosaic Gallery Section (Matching Reference Layout) */}
      <ParkGallerySection />
    </div>
  );
}

export default GalleryFrame;
