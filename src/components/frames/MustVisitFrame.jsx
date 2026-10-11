import React from 'react';
import { ComingSoonPanel } from '../shared/ComingSoonPanel';

export function MustVisitFrame({ onNavigate }) {
  return (
    <ComingSoonPanel
      pageClass="must-visit-page"
      eyebrow="WYATTEL HOTEL (TACURONG CITY)"
      actions={[
        { label: 'See the park gallery', onClick: () => onNavigate('gallery') },
        { label: 'Book a visit', onClick: () => onNavigate('home', '#booking') }
      ]}
    />
  );
}

export default MustVisitFrame;
