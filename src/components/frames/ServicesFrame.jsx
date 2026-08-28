import React from 'react';
import { HeroCarousel } from '../HeroCarousel';

export function ServicesFrame({ onNavigate }) {
  const items = [
    { 
      id: 1, 
      label: 'FOOD CATERING', 
      image: 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=800&q=80' 
    },
    { 
      id: 2, 
      label: 'WEDDINGS', 
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80' 
    },
    { 
      id: 3, 
      label: 'FAMILY EVENTS', 
      image: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=800&q=80' 
    },
    { 
      id: 4, 
      label: 'BIRTHDAY EVENTS', 
      image: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&w=800&q=80' 
    },
    { 
      id: 5, 
      label: 'OFFICE EVENTS', 
      image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=800&q=80' 
    }
  ];

  return <HeroCarousel title="SERVICES" items={items} onNavigate={onNavigate} />;
}

export default ServicesFrame;
