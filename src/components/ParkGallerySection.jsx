import React, { useEffect, useMemo, useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const categories = [
  { id: 'scenery-atmosphere', label: 'Scenery & Atmosphere' },
  { id: 'events', label: 'Events' },
  { id: 'attractions-activities', label: 'Attractions & Activities' },
  { id: 'amenities-visitor-life', label: 'Amenities & Visitor Life' },
  { id: 'community', label: 'Community' },
  { id: 'culture-events', label: 'Culture & Events' }
];

const gallerySets = {
  'scenery-atmosphere': [
    '1455627183250241', '1455627169916909', '1455627133250246', '1455627116583581',
    '1455627083250251', '1455627066583586', '1455627036583589', '1455626986583594',
    '1455626976583595', '1424339129712380', '1424339093045717', '1424339079712385',
    '1424339046379055', '1424339026379057', '1414406397372320', '1414406344038992',
    '1414406334038993', '1414406280705665', '1414406267372333', '1413818884097738'
  ],
  events: [
    '1501614838651475', '1501614791984813', '1501614778651481', '1501614741984818',
    '1501614728651486', '1501614611984831', '1501614605318165', '1458182189661407',
    '1458182149661411', '1458182132994746', '1458182099661416', '1458182086328084',
    '1458182032994756', '1458182012994758', '1458181972994762', '1458181959661430',
    '1458181906328102', '1458181896328103', '1458181852994774', '1458181839661442'
  ],
  'attractions-activities': [
    '1290914199721541', '1290914186388209', '1290914149721546', '1290914133054881',
    '1290914083054886', '1290914069721554', '1290914036388224', '1290914013054893',
    '1219567490189546', '1219567480189547', '1219567423522886', '1219567416856220',
    '1219567376856224', '1219567363522892', '1191002939712668', '1191002956379333',
    '1191002896379339', '1191002879712674', '1191002843046011', '1183706117109017'
  ],
  'amenities-visitor-life': [
    '1453694993443460', '1453694946776798', '1453694930110133', '1453694896776803',
    '1453694880110138', '1453694833443476', '1453694823443477', '1453694773443482',
    '1453694750110151', '1453694703443489', '1453694683443491', '1453694636776829',
    '1453694623443497', '1453694580110168', '1453694556776837', '1453694503443509',
    '1381561047323522', '1381560920656868', '1381560907323536', '1379221397557487'
  ],
  community: [
    '1434052682074358', '1434052628741030', '1434052618741031', '1434052578741035',
    '1434052562074370', '1434051528741140', '1434051468741146', '1434051435407816',
    '1434048562074770', '1434048508741442', '1434048445408115', '1434048395408120',
    '1434048348741458', '1434048335408126', '1434048292074797', '1434048278741465',
    '1434048242074802', '1434048225408137', '1434048178741475', '1434048165408143'
  ],
  'culture-events': [
    '1427417202737906', '1427417159404577', '1427417146071245', '1427417106071249',
    '1427417092737917', '1427417052737921', '1427417039404589', '1427416999404593',
    '1427416949404598', '1427416936071266', '1427416892737937', '1427416879404605',
    '1427416846071275', '1427416832737943', '1288814503264844', '1288814473264847',
    '1288814449931516', '1288814423264852', '1288814386598189', '1288814359931525'
  ]
};

export function ParkGallerySection() {
  const [activeCategory, setActiveCategory] = useState('scenery-atmosphere');
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const activeItems = useMemo(
    () => gallerySets[activeCategory].map((photoId) => ({
      id: `${activeCategory}-${photoId}`,
      image: `/gallery/facebook/${activeCategory}/${photoId}.webp`,
      categoryLabel: categories.find((category) => category.id === activeCategory)?.label ?? 'Park'
    })),
    [activeCategory]
  );

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (lightboxIndex === null) return;
      if (event.key === 'Escape') setLightboxIndex(null);
      if (event.key === 'ArrowLeft') {
        setLightboxIndex((current) => current > 0 ? current - 1 : activeItems.length - 1);
      }
      if (event.key === 'ArrowRight') {
        setLightboxIndex((current) => current < activeItems.length - 1 ? current + 1 : 0);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeItems.length, lightboxIndex]);

  useEffect(() => () => {
    document.body.style.overflow = '';
  }, []);

  const openLightbox = (index) => {
    setLightboxIndex(index);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
    document.body.style.overflow = '';
  };

  const changeImage = (direction, event) => {
    event.stopPropagation();
    setLightboxIndex((current) => (
      direction === 'next'
        ? (current < activeItems.length - 1 ? current + 1 : 0)
        : (current > 0 ? current - 1 : activeItems.length - 1)
    ));
  };

  const handleTileKeyDown = (event, index) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      openLightbox(index);
    }
  };

  const renderTile = (item, index, extraClassName = '') => (
    <div
      key={item.id}
      className={`mosaic-card-wrapper ${extraClassName}`}
      onClick={() => openLightbox(index)}
      onKeyDown={(event) => handleTileKeyDown(event, index)}
      role="button"
      tabIndex={0}
      aria-label={`Open park photo ${index + 1}`}
    >
      <img
        src={item.image}
        alt={`${item.categoryLabel} at Qetsiyah Eco Park — photo ${index + 1}`}
        className="mosaic-img"
        loading="lazy"
        decoding="async"
      />
    </div>
  );

  return (
    <section className="park-gallery-editorial-section" id="park-gallery-mosaic">
      <div className="gallery-editorial-container">
        <div className="gallery-category-filter-bar" aria-label="Park photo categories">
          {categories.map((category) => (
            <button
              key={category.id}
              className={`gallery-category-pill-btn ${activeCategory === category.id ? 'is-active' : ''}`}
              onClick={() => {
                setActiveCategory(category.id);
                setLightboxIndex(null);
              }}
              type="button"
              aria-pressed={activeCategory === category.id}
            >
              <span className="gallery-btn-label">{category.label}</span>
            </button>
          ))}
        </div>

        <div key={activeCategory} className="gallery-reference-mosaic-grid gallery-photo-only-grid">
          {activeItems.map((item, index) => renderTile(item, index))}
        </div>
      </div>

      {lightboxIndex !== null && activeItems[lightboxIndex] && (
        <div className="gallery-lightbox-backdrop" onClick={closeLightbox}>
          <div className="gallery-lightbox-modal" onClick={(event) => event.stopPropagation()}>
            <button
              className="lightbox-close-btn"
              onClick={closeLightbox}
              aria-label="Close photo"
            >
              <X size={24} />
            </button>

            <button
              className="lightbox-arrow-btn arrow-prev"
              onClick={(event) => changeImage('previous', event)}
              aria-label="Previous photo"
            >
              <ChevronLeft size={32} />
            </button>

            <div className="lightbox-image-stage">
              <img
                src={activeItems[lightboxIndex].image}
                alt={`${activeItems[lightboxIndex].categoryLabel} at Qetsiyah Eco Park — photo ${lightboxIndex + 1}`}
                className="lightbox-display-img"
              />
            </div>

            <button
              className="lightbox-arrow-btn arrow-next"
              onClick={(event) => changeImage('next', event)}
              aria-label="Next photo"
            >
              <ChevronRight size={32} />
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

export default ParkGallerySection;
