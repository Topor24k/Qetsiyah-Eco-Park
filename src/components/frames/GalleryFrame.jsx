import React from 'react';
import { ParkGalleryHero } from '../ParkGalleryHero';
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
      {/* 1. Editorial gallery opening hero */}
      <ParkGalleryHero onExplore={scrollToGallery} />

      {/* 2. Editorial Mosaic Gallery Section (Matching Reference Layout) */}
      <ParkGallerySection />
    </div>
  );
}

export default GalleryFrame;
