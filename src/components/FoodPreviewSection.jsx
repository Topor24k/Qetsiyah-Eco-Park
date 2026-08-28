import React from 'react';
import { ArrowRight, Utensils } from 'lucide-react';

export function FoodPreviewSection({ onNavigate }) {
  const dishes = [
    {
      id: 'beef',
      name: 'Beef Meals',
      // High quality savory beef meal
      image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=85'
    },
    {
      id: 'soup',
      name: 'Soup Meals',
      // Hearty comforting native soup dish
      image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=800&q=85'
    },
    {
      id: 'chicken',
      name: 'Chicken Meals',
      // Crispy golden glazed chicken meal
      image: 'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?auto=format&fit=crop&w=800&q=85'
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
