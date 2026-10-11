import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Lines } from './ui/Lines';
import { Media } from './ui/Media';

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
    <section id="food-preview" className="section section--paper dine" aria-labelledby="dine-title">
      <div className="shell">
        <header className="section-head">
          <p className="section-head-label label" data-reveal="fade">
            <span className="num">02</span>
            <span>Qetsiyah Café &amp; Dining</span>
          </p>
          <Lines
            id="dine-title"
            className="display display-lg section-head-title"
            lines={['Where every', { text: 'bite is a delight', className: 'hl' }]}
          />
          <p className="body section-head-aside" data-reveal>Delicious Moments, Perfectly Served.</p>
        </header>

        <div className="dine-grid">
          {dishes.map((dish, index) => (
            <figure key={dish.id} className="dine-item">
              <Media
                src={dish.image}
                alt={dish.name}
                className="dine-media"
                parallax
                delay={index * 140}
              />
              <figcaption data-reveal="fade" style={{ '--d': `${index * 140 + 300}ms` }}>
                <span className="label num">{String(index + 1).padStart(2, '0')}</span>
                <span className="label">{dish.name}</span>
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="dine-foot" data-reveal>
          <button
            type="button"
            className="btn btn--ink"
            onClick={() => onNavigate && onNavigate('food-offers')}
            aria-label="Navigate to full food offers and menu catalog"
          >
            <span>Explore full food offers &amp; menu</span>
            <ArrowRight size={16} aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
}

export default FoodPreviewSection;
