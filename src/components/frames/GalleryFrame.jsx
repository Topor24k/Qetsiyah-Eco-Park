import React from 'react';
import { CategoryOpeningHero } from '../CategoryOpeningHero';

export function GalleryFrame({ onNavigate }) {
  return (
    <div className="frame-view-wrapper gallery-page">
      <CategoryOpeningHero 
        titleTop="DISCOVER" 
        titleBottom="OUR PARK GALLERY" 
        flankLeft="VISUAL EXPERIENCES"
        flankRight="SULTAN KUDARAT"
        image="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=85"
        id="gallery"
      />
    </div>
  );
}

export default GalleryFrame;
