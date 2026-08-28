import React from 'react';
import { HeroCarousel } from '../HeroCarousel';

export function ActivitiesFrame({ onNavigate }) {
  const items = [
    { 
      id: 1, 
      label: 'ZIP LINING', 
      image: '/Activities/Zip Lining.jpg' 
    },
    { 
      id: 2, 
      label: 'SKY BIKING', 
      image: '/Activities/Sky Biking.jpg' 
    },
    { 
      id: 3, 
      label: 'PADDLE BOATS', 
      image: '/Activities/Paddle Boats.jpg' 
    },
    { 
      id: 4, 
      label: 'HORSE RIDING', 
      image: '/Activities/Horse Riding.jpg' 
    },
    { 
      id: 5, 
      label: 'PLAYGROUND', 
      image: '/Activities/Playground.jpg' 
    },
    { 
      id: 6, 
      label: 'KIDDY POOL', 
      image: '/Activities/Kiddy Pool.jpg' 
    }
  ];

  return <HeroCarousel title="ACTIVITIES" items={items} onNavigate={onNavigate} />;
}

export default ActivitiesFrame;
