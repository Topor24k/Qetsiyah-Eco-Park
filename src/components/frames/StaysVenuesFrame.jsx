import React from 'react';
import { CategoryOpeningHero } from '../CategoryOpeningHero';
import { OfferingsIndex } from '../shared/OfferingsIndex';
import { parkStays } from '../../data/parkInfo';

const staysVisuals = [
  { base: '/optimized/moments/lawn-seating', widths: [640, 1100] },
  { base: '/optimized/moments/flower-sunset', widths: [640] },
  { base: '/optimized/moments/tower-night', widths: [640] }
];

export function StaysVenuesFrame({ onNavigate }) {
  const scrollToIndex = () => {
    document.querySelector('#stays-index')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="frame-view-wrapper stays-venues-page">
      <CategoryOpeningHero
        titleTop="DISCOVER"
        titleBottom="STAYS & VENUES"
        flankLeft="VERDE VILLA & HALLS"
        flankRight="SULTAN KUDARAT"
        image="https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1600&q=85"
        id="stays-venues"
        hasContentBelow={true}
        onExploreBelow={scrollToIndex}
        exploreLabel="SCROLL TO VIEW STAYS & VENUES"
      />

      <OfferingsIndex
        id="stays-index"
        label="Stays and venues"
        items={parkStays}
        visuals={staysVisuals}
        footnote="Photos show the park grounds. Rates and availability are confirmed by the park team when you inquire."
        ctaLabel="Check availability"
        onNavigate={onNavigate}
      />
    </div>
  );
}

export default StaysVenuesFrame;
