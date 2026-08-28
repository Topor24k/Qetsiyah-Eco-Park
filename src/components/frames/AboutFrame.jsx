import React from 'react';
import { HeroCarousel } from '../HeroCarousel';
import { ShieldCheck, Clock, Ticket, MapPin, ArrowRight } from 'lucide-react';

export function AboutFrame({ onNavigate }) {
  const carouselItems = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80',
      label: 'LUSH BOTANICAL GROUNDS'
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1587061949409-02df41d5e562?auto=format&fit=crop&w=800&q=80',
      label: 'VERDE VILLA RETREAT'
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1511497584788-87676104235f?auto=format&fit=crop&w=800&q=80',
      label: 'LAKESIDE CANOPIES'
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
      label: 'CELEBRATIONS & EVENTS'
    },
    {
      id: 5,
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
      label: 'QETSIYAH CAFÉ & DINING'
    }
  ];

  return (
    <div className="frame-view-wrapper">
      {/* Hero Carousel */}
      <HeroCarousel
        title="ABOUT"
        items={carouselItems}
        onNavigate={onNavigate}
      />

      {/* Editorial Content Section */}
      <div className="frame-content-container">
        
        {/* Park Mission & Accreditations Lockup */}
        <div className="about-editorial-intro">
          <div className="about-tag-eyebrow">
            <ShieldCheck size={16} className="text-accent" />
            <span>DOT-ACCREDITED TOURISM RECREATION FACILITY</span>
          </div>
          <h2 className="about-hero-title">
            Where Nature, Adventure, and Warm Hospitality Converge in Sultan Kudarat.
          </h2>
          <p className="about-lead-paragraph">
            Nestled in the tranquil landscapes of Barangay Calean, Tacurong City, Qetsiyah Eco Park is an officially accredited eco-tourism and recreation sanctuary. Designed for families, travelers, and nature enthusiasts, the park blends vibrant botanical flora with thrilling outdoor activities, cozy stays, and authentic countryside dining.
          </p>
        </div>

        {/* Essential Park Quick Facts */}
        <div className="about-facts-grid">
          <div className="about-fact-card">
            <div className="fact-icon-box">
              <Clock size={24} />
            </div>
            <div className="fact-details">
              <h4>Operating Hours</h4>
              <p>Open Daily (Monday to Sunday)</p>
              <strong>8:00 AM – 10:00 PM</strong>
            </div>
          </div>

          <div className="about-fact-card">
            <div className="fact-icon-box">
              <Ticket size={24} />
            </div>
            <div className="fact-details">
              <h4>General Admission</h4>
              <p>Park Day Entrance Fee</p>
              <strong>Around ₱100 / Guest</strong>
            </div>
          </div>

          <div className="about-fact-card">
            <div className="fact-icon-box">
              <MapPin size={24} />
            </div>
            <div className="fact-details">
              <h4>Location</h4>
              <p>Barangay Calean, Tacurong City</p>
              <strong>Sultan Kudarat, Philippines</strong>
            </div>
          </div>
        </div>

        {/* Detailed Park Pillars */}
        <div className="about-pillars-stack">
          
          <div className="about-pillar-row">
            <div className="pillar-text-col">
              <span className="pillar-num">01</span>
              <h3>Instagrammable Botanical Gardens & Lakeside Views</h3>
              <p>
                Take leisurely strolls through meticulously manicured gardens, vibrant flowering pathways, and expansive open-air green lawns. Whether capturing precious family photos, taking wedding portraits, or simply enjoying the crisp fresh air, every corner of Qetsiyah Eco Park is framed by lush nature.
              </p>
            </div>
            <div className="pillar-media-col">
              <img 
                src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80" 
                alt="Botanical Gardens at Qetsiyah" 
                loading="lazy" 
              />
            </div>
          </div>

          <div className="about-pillar-row reverse">
            <div className="pillar-text-col">
              <span className="pillar-num">02</span>
              <h3>Outdoor Adventure & Family Recreation</h3>
              <p>
                Experience adrenaline-pumping rides including our signature Sky Biking and Zip Lining overlooking scenic canopies, relaxing paddle boats across tranquil waters, horseback riding trails, kid-safe playgrounds, and a refreshing kiddy pool.
              </p>
              <div className="pillar-action">
                <button className="pillar-link-btn" onClick={() => onNavigate('activities')}>
                  <span>EXPLORE ACTIVITIES & RIDES</span>
                  <ArrowRight size={15} />
                </button>
              </div>
            </div>
            <div className="pillar-media-col">
              <img 
                src="/Activities/Sky Biking.jpg" 
                alt="Sky Biking at Qetsiyah" 
                loading="lazy" 
              />
            </div>
          </div>

          <div className="about-pillar-row">
            <div className="pillar-text-col">
              <span className="pillar-num">03</span>
              <h3>Verde Villa Stays, Event Function Halls & Catering</h3>
              <p>
                From overnight private retreats at Verde Villa and shaded lakeside cottages to grand milestone celebrations in our fully equipped Function Hall. We provide complete food catering services for weddings, family reunions, corporate team building, and birthdays.
              </p>
              <div className="pillar-action">
                <button className="pillar-link-btn" onClick={() => onNavigate('stays-venues')}>
                  <span>VIEW STAYS & VENUES</span>
                  <ArrowRight size={15} />
                </button>
              </div>
            </div>
            <div className="pillar-media-col">
              <img 
                src="https://images.unsplash.com/photo-1587061949409-02df41d5e562?auto=format&fit=crop&w=800&q=80" 
                alt="Verde Villa at Qetsiyah" 
                loading="lazy" 
              />
            </div>
          </div>

        </div>

        {/* Bottom Booking CTA Banner */}
        <div className="about-bottom-cta-banner">
          <div className="cta-banner-content">
            <span className="cta-eyebrow">PLAN YOUR VISIT TODAY</span>
            <h3>Ready to Experience Qetsiyah Eco Park?</h3>
            <p>Inquire for event reservations, day tours, cottage rentals, and private functions.</p>
          </div>
          <button 
            className="cta-banner-btn"
            onClick={() => {
              onNavigate('home');
              setTimeout(() => {
                const el = document.querySelector('#booking');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }, 120);
            }}
          >
            <span>SEND RESERVATION INQUIRY</span>
            <ArrowRight size={16} />
          </button>
        </div>

      </div>
    </div>
  );
}

export default AboutFrame;

