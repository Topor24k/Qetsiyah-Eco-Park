import React, { useState, useEffect } from 'react';
import { CategoryOpeningHero } from '../CategoryOpeningHero';
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

  const scrollToMenu = () => {
    const el = document.querySelector('.food-catalog-sheet-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
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

  // Row Renderer with anchored floating card directly below underline
  const renderRow = (item, uniqueId) => {
    const isOpen = openItemId === uniqueId;

    return (
      <div 
        key={uniqueId}
        className={`menu-single-item-row ${isOpen ? 'active-preview-row' : ''}`}
        onClick={(e) => handleToggleItem(e, uniqueId)}
        onKeyDown={(e) => handleKeyDownRow(e, uniqueId)}
        role="button"
        tabIndex={0}
        aria-expanded={isOpen}
      >
        <div className="item-name-col">
          <span className="item-name-text">{item.name}</span>
        </div>

        <div className="item-dots-leader"></div>

        <div className="item-price-col">
          <span className="item-price-text">{item.price}</span>
        </div>

        {/* Anchored Floating Food Photo Dropdown */}
        {isOpen && (
          <div 
            className="item-anchored-card" 
            onClick={(e) => e.stopPropagation()}
          >
            <div className="anchored-card-img-wrap">
              <img 
                src={item.image} 
                alt={item.name} 
                className="anchored-card-img" 
                loading="lazy"
              />
            </div>
            <div className="anchored-card-details">
              <div className="card-dish-header">
                <span className="card-dish-name">{item.name}</span>
                <span className="card-dish-price">{item.price}</span>
              </div>
              <p className="card-dish-desc">
                Freshly prepared with authentic countryside spices and farm-fresh ingredients at Qetsiyah Eco Park.
              </p>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="frame-view-wrapper food-offers-page">
      {/* 1. Scroll-Driven Expanding Hero Opening with Authentic Restaurant Dining Photo */}
      <CategoryOpeningHero 
        titleTop="DISCOVER" 
        titleBottom="OUR FOOD OFFERS" 
        flankLeft="FINE DINING & MEALS"
        flankRight="TACURONG CITY"
        image="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1600&q=85"
        id="food-offers"
        hasContentBelow={true}
        onExploreBelow={scrollToMenu}
      />

      {/* 2. Editorial Menu Catalog Section (Preserved in Full) */}
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
