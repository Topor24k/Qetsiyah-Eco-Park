import React from 'react';
import { HeroCarousel } from '../HeroCarousel';
import { Compass, ShieldCheck, ArrowRight, Clock, Users, Award } from 'lucide-react';

export function ActivitiesFrame({ onNavigate }) {
  const carouselItems = [
    { 
      id: 1, 
      label: 'ZIP LINING', 
      image: '/Activities/Zip Lining.jpg' 
    },
    { 
      id: 2, 
      label: 'SKY BIKING', 
      image: '/Activities/Sky Biking.jpg' 
    },
    { 
      id: 3, 
      label: 'PADDLE BOATS', 
      image: '/Activities/Paddle Boats.jpg' 
    },
    { 
      id: 4, 
      label: 'HORSE RIDING', 
      image: '/Activities/Horse Riding.jpg' 
    },
    { 
      id: 5, 
      label: 'PLAYGROUND', 
      image: '/Activities/Playground.jpg' 
    },
    { 
      id: 6, 
      label: 'KIDDY POOL', 
      image: '/Activities/Kiddy Pool.jpg' 
    }
  ];

  const activitiesList = [
    {
      id: 'zipline',
      title: 'CANOPY ZIP LINING',
      kicker: 'AERIAL ADVENTURE',
      image: '/Activities/Zip Lining.jpg',
      shapeClass: 'shape-organic-1',
      specs: [
        { label: 'Elevation', value: 'High Canopy Cable Flight' },
        { label: 'Experience', value: 'Full Panoramic Nature Rush' },
        { label: 'Safety Gear', value: 'Double-Lock Harness & Helmet Included' }
      ],
      desc: 'Feel the exhilarating rush of flying high above the emerald canopies with sweeping 360-degree vistas across Qetsiyah Eco Park\'s gardens and rolling hills.',
      side: 'left' // Image on Left, Text on Right
    },
    {
      id: 'skybike',
      title: 'HIGH-WIRE SKY BIKING',
      kicker: 'SUSPENDED CYCLING',
      image: '/Activities/Sky Biking.jpg',
      shapeClass: 'shape-organic-2',
      specs: [
        { label: 'Track Type', value: 'Suspended Overhead Cable' },
        { label: 'Elevation', value: 'Mid-Air Lagoon Crossing' },
        { label: 'Safety Gear', value: 'Dual Anchor Lock & Guide Support' }
      ],
      desc: 'Pedal across the sky on a specialized high-wire bicycle suspended above the water. A thrilling signature experience combining gentle exercise with awe-inspiring nature views.',
      side: 'right' // Image on Right, Text on Left
    },
    {
      id: 'paddleboat',
      title: 'LAGOON PADDLE BOATS',
      kicker: 'AQUATIC RETREAT',
      image: '/Activities/Paddle Boats.jpg',
      shapeClass: 'shape-organic-3',
      specs: [
        { label: 'Location', value: 'Scenic Freshwater Lagoon' },
        { label: 'Capacity', value: '2 - 4 Passengers Per Boat' },
        { label: 'Safety Gear', value: 'Life Vests & Dock Attendant' }
      ],
      desc: 'Glide peacefully across the shimmering lagoon surrounded by floating flora and lush tropical greenery. Perfect for romantic cruises, relaxed family bonding, and photography.',
      side: 'left'
    },
    {
      id: 'horseriding',
      title: 'SCENIC HORSE RIDING',
      kicker: 'EQUESTRIAN TRAILS',
      image: '/Activities/Horse Riding.jpg',
      shapeClass: 'shape-organic-4',
      specs: [
        { label: 'Trail Type', value: 'Lush Coconut Groves & Meadows' },
        { label: 'Duration', value: 'Guided Nature Trek' },
        { label: 'Guidance', value: 'Accompanied by Expert Caretakers' }
      ],
      desc: 'Experience the rustic charm of countryside living on horseback. Gentle, well-trained horses guide you along scenic pathways flanked by towering palms and blooming flowers.',
      side: 'right'
    },
    {
      id: 'playground',
      title: 'PARK PLAYGROUND',
      kicker: 'FAMILY RECREATION',
      image: '/Activities/Playground.jpg',
      shapeClass: 'shape-organic-5',
      specs: [
        { label: 'Play Area', value: 'Spacious Open-Air Grass Lawn' },
        { label: 'Features', value: 'Swings, Slides & Climbing Sets' },
        { label: 'Access', value: 'Open Daily for All Guests' }
      ],
      desc: 'An open, green wonderland where kids can run, climb, and laugh freely under the shade of mature trees while parents relax nearby in peaceful picnic areas.',
      side: 'left'
    },
    {
      id: 'kiddypool',
      title: 'KIDDY SPLASH POOL',
      kicker: 'WATER FUN',
      image: '/Activities/Kiddy Pool.jpg',
      shapeClass: 'shape-organic-6',
      specs: [
        { label: 'Pool Depth', value: 'Safe Shallow Wading Pool' },
        { label: 'Ambiance', value: 'Refreshing Mountain Breeze' },
        { label: 'Amenities', value: 'Shaded Tables & Lounging Spots' }
      ],
      desc: 'Cool down under the tropical sun in our dedicated shallow splash pool, offering safe, sparkling clean water fun for toddlers, children, and families.',
      side: 'right'
    }
  ];

  return (
    <div className="frame-view-wrapper activities-page">
      {/* 1. Hero Carousel */}
      <HeroCarousel 
        title="ACTIVITIES" 
        items={carouselItems} 
        onNavigate={onNavigate} 
      />

      {/* 2. Adventure Exploration Trail (Matches Reference Poster Journey) */}
      <section className="activities-story-trail-section">
        
        {/* Subtle Section Header */}
        <div className="activities-trail-header">
          <span className="trail-subtitle">EXPLORATION & ADVENTURE</span>
          <h2 className="trail-title">DISCOVER OUR PARK ACTIVITIES</h2>
          <p className="trail-lead">
            Embark on a scenic journey through thrilling heights, tranquil waters, and open nature trails crafted for every adventurer.
          </p>
        </div>

        <div className="activities-trail-container">
          
          {/* SVG Winding Dashed Journey Trail */}
          <svg className="trail-connector-svg" preserveAspectRatio="none" viewBox="0 0 100 100">
            <path
              d="M 50,0 Q 80,10 50,20 Q 20,30 50,40 Q 80,50 50,60 Q 20,70 50,80 Q 80,90 50,100"
              className="trail-svg-path"
              fill="none"
            />
          </svg>

          {/* Activity Cards along the Winding Trail */}
          <div className="activities-trail-items">
            {activitiesList.map((item, index) => {
              const isImageLeft = item.side === 'left';

              return (
                <div 
                  key={item.id} 
                  className={`activity-trail-row ${isImageLeft ? 'image-left-layout' : 'image-right-layout'}`}
                >
                  {/* Waypoint Pin on the Trail */}
                  <div className="trail-waypoint-pin">
                    <span className="waypoint-ring"></span>
                    <span className="waypoint-dot"></span>
                    <span className="waypoint-number">{index + 1}</span>
                  </div>

                  {/* Organic Feathered Photo Card */}
                  <div className="activity-cloud-image-wrapper">
                    <div className="activity-cloud-glow"></div>
                    <div className={`activity-cloud-mask ${item.shapeClass}`}>
                      <img 
                        src={item.image} 
                        alt={item.title} 
                        className="activity-cloud-img" 
                      />
                    </div>
                  </div>

                  {/* Editorial Typography & Specs */}
                  <div className="activity-story-content">
                    <span className="activity-kicker-tag">{item.kicker}</span>
                    <h3 className="activity-story-title">{item.title}</h3>
                    
                    <p className="activity-story-description">
                      {item.desc}
                    </p>

                    {/* Key Specs / Details */}
                    <div className="activity-specs-list">
                      {item.specs.map((spec, sIdx) => (
                        <div key={sIdx} className="activity-spec-item">
                          <span className="spec-dot">•</span>
                          <span className="spec-label">{spec.label}:</span>
                          <span className="spec-value">{spec.value}</span>
                        </div>
                      ))}
                    </div>

                    {/* Action Link */}
                    <div className="activity-action-row">
                      <button 
                        className="activity-book-btn"
                        onClick={() => {
                          onNavigate('home');
                          setTimeout(() => {
                            const el = document.querySelector('#contact');
                            if (el) el.scrollIntoView({ behavior: 'smooth' });
                          }, 120);
                        }}
                      >
                        <span>BOOK THIS ACTIVITY</span>
                        <ArrowRight size={15} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>
    </div>
  );
}

export default ActivitiesFrame;
