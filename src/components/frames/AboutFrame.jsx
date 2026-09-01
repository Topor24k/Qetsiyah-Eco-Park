import React from 'react';
import { HeroSection } from '../HeroSection';
import { AboutStorySection } from '../about/AboutStorySection';
import { AboutChangingShowcase } from '../about/AboutChangingShowcase';

export function AboutFrame({ onNavigate, isExiting, previousFrame }) {
  return (
    <div className="frame-view-wrapper about-page about-hero-page">
      <HeroSection 
        onNavigate={onNavigate} 
        variant="about" 
        isExiting={isExiting} 
        previousFrame={previousFrame} 
      />
      <AboutStorySection />
      <AboutChangingShowcase />
    </div>
  );
}

export default AboutFrame;
