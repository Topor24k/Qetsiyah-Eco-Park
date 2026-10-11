import React from 'react';
import { CategoryOpeningHero } from '../CategoryOpeningHero';
import { ActivitiesShowcase } from '../activities/ActivitiesShowcase';

export function ActivitiesFrame({ onNavigate }) {
  const scrollToGuide = () => {
    document.querySelector('#activities-guide')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="frame-view-wrapper activities-page">
      <CategoryOpeningHero
        titleTop="DISCOVER"
        titleBottom="ALL OUR ACTIVITIES"
        flankLeft="ECO-PARK EXPERIENCES"
        flankRight="SULTAN KUDARAT"
        video="/Video/Qetsiyah Activities Hero Section.mp4"
        image="/optimized/activities-hero-poster-1600.webp"
        id="activities"
        hasContentBelow={true}
        onExploreBelow={scrollToGuide}
        exploreLabel="SCROLL TO EXPLORE ACTIVITIES"
      />

      <ActivitiesShowcase onNavigate={onNavigate} />
    </div>
  );
}

export default ActivitiesFrame;
