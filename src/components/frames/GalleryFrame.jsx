import React from 'react';
import { HeroCarousel } from '../HeroCarousel';

export function GalleryFrame({ onNavigate }) {
  const items = [
    { 
      id: 1, 
      label: 'LUSH LANDSCAPES', 
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80' 
    },
    { 
      id: 2, 
      label: 'SERENE WATERS', 
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80' 
    },
    { 
      id: 3, 
      label: 'ELEGANT SPACES', 
      image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80' 
    },
    { 
      id: 4, 
      label: 'LEISURE POOLS', 
      image: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=800&q=80' 
    },
    { 
      id: 5, 
      label: 'SCENIC GROUNDS', 
      image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=800&q=80' 
    }
  ];

  return <HeroCarousel title="GALLERY" items={items} onNavigate={onNavigate} />;
}

export default GalleryFrame;
