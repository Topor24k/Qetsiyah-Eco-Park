import React, { useState, useEffect } from 'react';
import { CategoryOpeningHero } from '../CategoryOpeningHero';
import { foodMenuCatalog } from '../../data/foodMenuCatalog';
import { QuickNav } from '../shared/QuickNav';
import { Lines } from '../ui/Lines';

// Short labels for the sticky category bar.
const menuTabLabels = {
  'beef-meals': 'Beef',
  'chicken-meals': 'Chicken',
  'combo-meals': 'Combo',
  'sizzling-grill': 'Sizzling & Grill',
  'soup-meals': 'Soup',
  'pasta-noodles': 'Pasta & Noodles',
  'short-orders': 'Short Orders',
  'snacks-meals': 'Snacks',
  'drinks-beverages': 'Drinks'
};

const menuTabs = foodMenuCatalog.map((category) => ({
  id: category.id,
  label: menuTabLabels[category.id] || `${category.titleLine1} ${category.titleLine2}`
}));

// Each category's dishes in one list, keeping a stable id per dish.
const menuSections = foodMenuCatalog.map((category) => ({
  ...category,
  dishes: [
    ...category.topItems.map((item, idx) => ({ item, uid: `${category.id}-top-${idx}` })),
    ...category.bottomLeft.map((item, idx) => ({ item, uid: `${category.id}-bl-${idx}` })),
    ...category.bottomRight.map((item, idx) => ({ item, uid: `${category.id}-br-${idx}` }))
  ]
}));

export function FoodOffersFrame({ onNavigate }) {
  // Track single open item by ID across the whole menu
  const [openItemId, setOpenItemId] = useState(null);
  const [menuQuery, setMenuQuery] = useState('');
  const [activeCategoryId, setActiveCategoryId] = useState(foodMenuCatalog[0].id);

  const normalizedQuery = menuQuery.trim().toLowerCase();
  const matchesQuery = ({ item }) => !normalizedQuery || item.name.toLowerCase().includes(normalizedQuery);

  const visibleSections = menuSections
    .map((section) => ({ ...section, dishes: section.dishes.filter(matchesQuery) }))
    .filter((section) => section.dishes.length > 0);
  const menuResultCount = visibleSections.reduce((total, section) => total + section.dishes.length, 0);

  // Close on Escape or click outside
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (!e.target.closest('.menu-item')) {
        setOpenItemId(null);
      }
    };
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setOpenItemId(null);
      }
    };

    document.addEventListener('click', handleOutsideClick);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('click', handleOutsideClick);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Highlight the tab for whichever category is crossing the upper part of
  // the screen.
  useEffect(() => {
    if (!('IntersectionObserver' in window)) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveCategoryId(entry.target.id);
        });
      },
      { rootMargin: '-28% 0px -62% 0px' }
    );

    document.querySelectorAll('.menu-cat').forEach((block) => observer.observe(block));
    return () => observer.disconnect();
  }, [normalizedQuery]);

  const jumpToCategory = (categoryId) => {
    setActiveCategoryId(categoryId);
    if (onNavigate) onNavigate('food-offers', `#${categoryId}`);
  };

  const scrollToMenu = () => {
    document.querySelector('#food-catalog')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="food-page">
      <CategoryOpeningHero
        titleTop="DISCOVER"
        titleBottom="OUR FOOD OFFERS"
        flankLeft="FINE DINING & MEALS"
        flankRight="TACURONG CITY"
        video="/Video/Food Offer Hero Section Video.mp4"
        image="/food-plate-hero.jpg"
        id="food-offers"
        hasContentBelow={true}
        onExploreBelow={scrollToMenu}
      />

      <section className={`carte ${normalizedQuery ? 'is-searching' : ''}`} id="food-catalog">
        <QuickNav
          items={menuTabs}
          activeId={activeCategoryId}
          onJump={jumpToCategory}
          query={menuQuery}
          onQueryChange={setMenuQuery}
          resultCount={menuResultCount}
          placeholder="Search dishes"
          searchLabel="Search the menu"
          ariaLabel="Menu search and categories"
          singular="dish"
          plural="dishes"
        />

        <div className="shell menu-body">
          {normalizedQuery && menuResultCount === 0 && (
            <div className="menu-empty" role="status">
              <p className="display display-md">Nothing matches “{menuQuery.trim()}”.</p>
              <p className="body">Try a shorter word, like “sisig”, “soup”, or “chicken”.</p>
              <button type="button" className="link-arrow" onClick={() => setMenuQuery('')}>
                Show the full menu
              </button>
            </div>
          )}

          {visibleSections.map((section) => {
            const sectionNumber = foodMenuCatalog.findIndex((category) => category.id === section.id) + 1;

            return (
              <div key={section.id} id={section.id} className="menu-cat">
                <div className="menu-cat-head">
                  <p className="label menu-cat-label" data-reveal="fade">
                    <span className="num accent">{String(sectionNumber).padStart(2, '0')}</span>
                    <span>{section.dishes.length} {section.dishes.length === 1 ? 'dish' : 'dishes'}</span>
                  </p>
                  <Lines
                    className="display display-lg menu-cat-title"
                    lines={[section.titleLine1, section.titleLine2]}
                  />
                </div>

                <ul className="menu-items" data-reveal>
                  {section.dishes.map(({ item, uid }) => {
                    const isOpen = openItemId === uid;

                    return (
                      <li key={uid} className={`menu-item ${isOpen ? 'is-open' : ''}`}>
                        <button
                          type="button"
                          className="menu-item-row"
                          aria-expanded={isOpen}
                          onClick={() => setOpenItemId((prev) => (prev === uid ? null : uid))}
                        >
                          <span className="menu-item-name">{item.name}</span>
                          <span className="menu-item-price num">{item.price}</span>
                        </button>

                        {/* Dish photo, revealed in place under the row */}
                        <div className="menu-item-peek">
                          <div className="menu-item-peek-inner">
                            {isOpen && (
                              <div className="menu-item-card">
                                <img
                                  src={item.image}
                                  alt={item.name}
                                  loading="lazy"
                                  decoding="async"
                                />
                                <div>
                                  <p className="label accent">Authentic park cuisine</p>
                                  <p className="menu-item-desc">
                                    Freshly prepared with authentic countryside spices and farm-fresh ingredients at Qetsiyah Eco Park.
                                  </p>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

export default FoodOffersFrame;
