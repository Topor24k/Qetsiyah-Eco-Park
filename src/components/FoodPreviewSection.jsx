import React from 'react';
import { ArrowRight, Utensils } from 'lucide-react';

export function FoodPreviewSection({ onNavigate }) {
  const dishes = [
    {
      id: 'combo',
      name: 'Combo Meals',
      image: '/Preview Food Picture/Combo Meals.jpg'
    },
    {
      id: 'soup',
      name: 'Soup Meals',
      image: '/Preview Food Picture/Soup Meals.jpg'
    },
    {
      id: 'snacks',
      name: 'Snacks Meals',
      image: '/Preview Food Picture/Snacks Meals.jpg'
    }
  ];

  return (
    <section id="food-preview" className="editorial-food-section" aria-label="Featured Culinary Highlights">
      <div className="editorial-food-container">
        
        {/* =========================================================================
            SECTION HEADER: HIGH-CONTRAST EDITORIAL DISPLAY
           ========================================================================= */}
        <header className="editorial-food-header">
          <span className="editorial-eyebrow-tag">QETSIYAH CAFÉ & DINING</span>
          <h2 className="editorial-food-title">
            <span className="title-row-dark">WHERE EVERY</span>
            <span className="title-row-accent">BITE IS A DELIGHT</span>
          </h2>
          <p className="editorial-food-tagline">Delicious Moments, Perfectly Served.</p>
        </header>

        {/* =========================================================================
            EQUAL SIZE 3-ITEM FOOD GALLERY (BEEF, SOUP, CHICKEN - NO BADGES)
           ========================================================================= */}
        <div className="equal-food-grid">
          {dishes.map((dish) => (
            <article key={dish.id} className="equal-food-tile" tabIndex="0" aria-label={dish.name}>
              <div className="equal-food-media">
                <img 
                  src={dish.image} 
                  alt={dish.name} 
                  className="tile-img"
                  loading="lazy" 
                />
              </div>
            </article>
          ))}
        </div>

        {/* =========================================================================
            CENTERED EDITORIAL CTA
           ========================================================================= */}
        <div className="editorial-food-footer">
          <button 
            type="button"
            className="editorial-explore-cta-btn"
            onClick={() => onNavigate && onNavigate('food-offers')}
            aria-label="Navigate to full food offers and menu catalog"
          >
            <Utensils size={16} aria-hidden="true" />
            <span>EXPLORE FULL FOOD OFFERS & MENU</span>
            <ArrowRight size={16} aria-hidden="true" />
          </button>
        </div>

      </div>
    </section>
  );
}

export default FoodPreviewSection;
