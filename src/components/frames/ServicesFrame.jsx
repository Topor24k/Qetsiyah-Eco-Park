import React from 'react';
import { CategoryOpeningHero } from '../CategoryOpeningHero';

export function ServicesFrame({ onNavigate }) {
  return (
    <div className="frame-view-wrapper services-page">
      <CategoryOpeningHero 
        titleTop="DISCOVER" 
        titleBottom="ALL OUR SERVICES" 
        flankLeft="CATERING & CELEBRATIONS"
        flankRight="SULTAN KUDARAT"
        image="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=85"
        id="services"
      />
    </div>
  );
}

export default ServicesFrame;
