import React from 'react';
import { CategoryOpeningHero } from '../CategoryOpeningHero';

export function ActivitiesFrame({ onNavigate }) {
  return (
    <CategoryOpeningHero
      titleTop="DISCOVER"
      titleBottom="ALL OUR ACTIVITIES"
      flankLeft="ECO-PARK EXPERIENCES"
      flankRight="SULTAN KUDARAT"
      video="/Video/Qetsiyah Activities Hero Section.mp4"
      image="/Background Pictures/Background Hero Section II.jpg"
      id="activities"
    />
  );
}

export default ActivitiesFrame;