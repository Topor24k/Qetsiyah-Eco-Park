import React from 'react';
import { CategoryOpeningHero } from '../CategoryOpeningHero';
import { OfferingsIndex } from '../shared/OfferingsIndex';
import { parkServices } from '../../data/parkInfo';

export function ServicesFrame({ onNavigate }) {
  const scrollToIndex = () => {
    document.querySelector('#services-index')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="frame-view-wrapper services-page">
      <CategoryOpeningHero
        titleTop="DISCOVER"
        titleBottom="ALL OUR SERVICES"
        flankLeft="CATERING & CELEBRATIONS"
        flankRight="SULTAN KUDARAT"
        image="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=85"
        id="services"
        hasContentBelow={true}
        onExploreBelow={scrollToIndex}
        exploreLabel="SCROLL TO VIEW OUR SERVICES"
      />

      <OfferingsIndex
        id="services-index"
        label="Events and services"
        items={parkServices}
        footnote="Photos are from real events held at the park. Packages and rates are confirmed when you inquire."
        ctaLabel="Book your event"
        onNavigate={onNavigate}
      />
    </div>
  );
}

export default ServicesFrame;
