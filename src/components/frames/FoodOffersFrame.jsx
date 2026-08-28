import React, { useState, useEffect } from 'react';
import { HeroCarousel } from '../HeroCarousel';
import { foodMenuCatalog } from '../../data/foodMenuCatalog';
import { X } from 'lucide-react';

export function FoodOffersFrame({ onNavigate }) {
  // Track single open item by ID across the whole menu
  const [openItemId, setOpenItemId] = useState(null);

  // Close on Escape or click outside
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (!e.target.closest('.menu-single-item-row') && !e.target.closest('.mobile-food-modal-card')) {
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

  const handleToggleItem = (e, itemId) => {
    e.stopPropagation();
    setOpenItemId((prev) => (prev === itemId ? null : itemId));
  };

  const handleKeyDownRow = (e, itemId) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setOpenItemId((prev) => (prev === itemId ? null : itemId));
    }
  };

  // Find currently open item for mobile modal rendering
  let currentOpenItem = null;
  if (openItemId) {
    for (const cat of foodMenuCatalog) {
      const allItems = [...cat.topItems, ...cat.bottomLeft, ...cat.bottomRight];
      const match = allItems.find((_, idx) => `${cat.id}-${idx}` === openItemId || cat.topItems.some((it, i) => `${cat.id}-top-${i}` === openItemId && it === _) || cat.bottomLeft.some((it, i) => `${cat.id}-bl-${i}` === openItemId && it === _) || cat.bottomRight.some((it, i) => `${cat.id}-br-${i}` === openItemId && it === _));
      if (match) {
        currentOpenItem = match;
        break;
      }
    }
  }

  const carouselItems = [
    { 
      id: 1, 
      label: 'BEEF MEALS', 
      image: '/Food Menu/Beef Meals.jpg' 
    },
    { 
      id: 2, 
      label: 'CHICKEN MEALS', 
      image: '/Food Menu/Chicken Meals.jpg' 
    },
    { 
      id: 3, 
      label: 'COMBO MEALS', 
      image: '/Food Menu/Combo Meals.jpg' 
    },
    { 
      id: 4, 
      label: 'SIZZLING & GRILL', 
      image: '/Food Menu/Sizzling and Grill Meals.jpg' 
    },
    { 
      id: 5, 
      label: 'SOUP MEALS', 
      image: '/Food Menu/Soup Meals.jpg' 
    },
    { 
      id: 6, 
      label: 'PASTA & NOODLES', 
      image: '/Food Menu/Pasta and Noodles Meals.jpg' 
    },
    { 
      id: 7, 
      label: 'SHORT ORDERS', 
      image: '/Food Menu/Short Orders.jpg' 
    },
    { 
      id: 8, 
      label: 'SNACKS & BURGERS', 
      image: '/Food Menu/Snacks Meals.jpg' 
    },
    { 
      id: 9, 
      label: 'DRINKS & BEVERAGES', 
      image: '/Food Menu/Drinks.jpg' 
    }
  ];

  const renderRow = (item, itemId) => {
    const isOpen = openItemId === itemId;

    return (
      <div 
        key={itemId}
        className={`menu-single-item-row ${isOpen ? 'is-active-row' : ''}`}
        onClick={(e) => handleToggleItem(e, itemId)}
        onKeyDown={(e) => handleKeyDownRow(e, itemId)}
        role="button"
        tabIndex={0}
        aria-expanded={isOpen}
        aria-label={`Toggle image for ${item.name}`}
      >
        <span className="item-name-text">{item.name}</span>
        <span className="item-price-text">{item.price}</span>

        {/* Desktop Overlapping Floating Image (~240px wide, anchored right) */}
        {isOpen && (
          <div className="desktop-menu-float-card" onClick={(e) => e.stopPropagation()}>
            <img 
              src={item.image} 
              alt={item.name} 
              className="menu-float-img" 
              loading="eager"
            />
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="frame-view-wrapper food-offers-page">
      {/* 1. Top Hero Carousel */}
      <HeroCarousel 
        title="FOOD OFFERS" 
        items={carouselItems} 
        onNavigate={onNavigate} 
      />

      {/* 2. Editorial Menu Section */}
      <section className="food-catalog-sheet-section">
        <div className="food-catalog-container">
          
          {foodMenuCatalog.map((category) => {
            const isTitleLeft = category.titleSide === 'left';

            const TitleBlock = (
              <div className={`category-giant-title-box ${isTitleLeft ? 'title-align-left' : 'title-align-right'}`}>
                <h2 className="category-giant-title">
                  <span className="title-word-line1">{category.titleLine1}</span>
                  <span className="title-word-line2">{category.titleLine2}</span>
                </h2>
              </div>
            );

            const TopItemsList = (
              <div className="category-top-items-box">
                {category.topItems.map((item, idx) => 
                  renderRow(item, `${category.id}-top-${idx}`)
                )}
              </div>
            );

            return (
              <div key={category.id} className="menu-category-block">
                {/* Top Split */}
                <div className={`menu-category-top-split ${isTitleLeft ? 'layout-title-left' : 'layout-title-right'}`}>
                  <div className="top-split-left-col">
                    {isTitleLeft ? TitleBlock : TopItemsList}
                  </div>
                  <div className="top-split-right-col">
                    {isTitleLeft ? TopItemsList : TitleBlock}
                  </div>
                </div>

                {/* Bottom Balanced Columns */}
                <div className="menu-category-bottom-grid">
                  <div className="menu-col-subgrid">
                    {category.bottomLeft.map((item, idx) => 
                      renderRow(item, `${category.id}-bl-${idx}`)
                    )}
                  </div>

                  <div className="menu-col-subgrid">
                    {category.bottomRight.map((item, idx) => 
                      renderRow(item, `${category.id}-br-${idx}`)
                    )}
                  </div>
                </div>
              </div>
            );
          })}

        </div>
      </section>

      {/* Mobile Modal Backdrop & Centered Card (<640px) */}
      {currentOpenItem && (
        <div className="mobile-food-modal-backdrop" onClick={() => setOpenItemId(null)}>
          <div className="mobile-food-modal-card" onClick={(e) => e.stopPropagation()}>
            <button 
              className="mobile-modal-close-btn" 
              onClick={() => setOpenItemId(null)} 
              aria-label="Close photo"
            >
              <X size={18} />
            </button>
            <div className="mobile-modal-image-wrap">
              <img 
                src={currentOpenItem.image} 
                alt={currentOpenItem.name} 
                className="mobile-modal-img" 
              />
              <div className="mobile-modal-info">
                <h4>{currentOpenItem.name}</h4>
                <span>{currentOpenItem.price}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default FoodOffersFrame;
