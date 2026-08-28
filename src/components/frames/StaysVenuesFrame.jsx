import React from 'react';
import { HeroCarousel } from '../HeroCarousel';

export function StaysVenuesFrame({ onNavigate }) {
  const items = [
    { 
      id: 1, 
      label: 'VERDE VILLA', 
      image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80' 
    },
    { 
      id: 2, 
      label: 'LAKESIDE COTTAGES', 
      image: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=800&q=80' 
    },
    { 
      id: 3, 
      label: 'QETSIYAH CAFÉ', 
      image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80' 
    },
    { 
      id: 4, 
      label: 'GRAND FUNCTION HALL', 
      image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=800&q=80' 
    },
    { 
      id: 5, 
      label: 'NATURE CAMP', 
      image: 'https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=800&q=80' 
    }
  ];

  return <HeroCarousel title="VENUES" items={items} onNavigate={onNavigate} />;
}

export default StaysVenuesFrame;
