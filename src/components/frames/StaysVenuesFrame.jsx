import React from 'react';
import { CategoryOpeningHero } from '../CategoryOpeningHero';

export function StaysVenuesFrame({ onNavigate }) {
  return (
    <div className="frame-view-wrapper stays-venues-page">
      <CategoryOpeningHero 
        titleTop="DISCOVER" 
        titleBottom="STAYS & VENUES" 
        flankLeft="VERDE VILLA & HALLS"
        flankRight="SULTAN KUDARAT"
        image="https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1600&q=85"
        id="stays-venues"
      />
    </div>
  );
}

export default StaysVenuesFrame;
