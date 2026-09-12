import React from 'react';
import { CalendarDays, Compass, Home, Images, Utensils } from 'lucide-react';

const mobileDestinations = [
  { id: 'home', label: 'Home', icon: Home, frame: 'home', hash: '#home' },
  { id: 'activities', label: 'Explore', icon: Compass, frame: 'activities' },
  { id: 'food-offers', label: 'Dining', icon: Utensils, frame: 'food-offers' },
  { id: 'gallery', label: 'Gallery', icon: Images, frame: 'gallery' },
  { id: 'booking', label: 'Book', icon: CalendarDays, frame: 'home', hash: '#booking' }
];

export function MobileBottomNav({ activeFrame, currentHash, onNavigate }) {
  const isActive = (item) => {
    const bookingDestination = currentHash === '#booking' || currentHash === '#contact';
    if (item.id === 'booking') return bookingDestination;
    if (item.id === 'home') return activeFrame === 'home' && !bookingDestination;
    if (item.id === 'activities') {
      return ['activities', 'stays-venues', 'services'].includes(activeFrame);
    }
    return activeFrame === item.frame;
  };

  return (
    <nav className="mobile-app-navigation" aria-label="Quick mobile navigation">
      <div className="mobile-app-navigation-inner">
        {mobileDestinations.map((item) => {
          const Icon = item.icon;
          const active = isActive(item);

          return (
            <a
              key={item.id}
              href={item.hash || `#${item.frame}`}
              className={`mobile-app-nav-item ${active ? 'is-active' : ''} ${item.id === 'booking' ? 'is-booking' : ''}`}
              aria-current={active ? 'page' : undefined}
              onClick={(event) => {
                event.preventDefault();
                onNavigate(item.frame, item.hash || null);
              }}
            >
              <span className="mobile-app-nav-icon" aria-hidden="true">
                <Icon size={20} strokeWidth={active ? 2.25 : 1.75} />
              </span>
              <span>{item.label}</span>
            </a>
          );
        })}
      </div>
    </nav>
  );
}

export default MobileBottomNav;
