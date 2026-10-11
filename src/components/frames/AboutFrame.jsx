import React from 'react';
import { CategoryOpeningHero } from '../CategoryOpeningHero';
import { AboutStorySection } from '../about/AboutStorySection';
import { AboutChangingShowcase } from '../about/AboutChangingShowcase';

export function AboutFrame() {
  const scrollToStory = () => {
    document.querySelector('#about-story')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="about-page">
      <CategoryOpeningHero
        titleTop="ABOUT"
        titleBottom="QETSIYAH."
        flankLeft="EST. OCTOBER 20, 2023"
        flankRight="TACURONG CITY, SULTAN KUDARAT"
        lede="WHAT THE PARK IS, WHERE IT IS, AND WHAT VISITORS CAN EXPECT."
        image="/optimized/hero-layers/hero-back-1920.webp"
        id="about"
        hasContentBelow={true}
        onExploreBelow={scrollToStory}
        exploreLabel="SCROLL TO READ THE STORY"
      />
      <AboutStorySection />
      <AboutChangingShowcase />
    </div>
  );
}

export default AboutFrame;
