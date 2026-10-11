import React from 'react';
import { ComingSoonPanel } from '../shared/ComingSoonPanel';

export function AnnouncementsFrame({ onNavigate }) {
  return (
    <ComingSoonPanel
      pageClass="announcements-page"
      eyebrow="PARK ANNOUNCEMENTS"
      lede="News, promos, and advisories for our valued guests will be posted here."
      actions={[
        { label: 'Explore the park', onClick: () => onNavigate('activities') },
        { label: 'Book a visit', onClick: () => onNavigate('home', '#booking') }
      ]}
    />
  );
}

export default AnnouncementsFrame;
