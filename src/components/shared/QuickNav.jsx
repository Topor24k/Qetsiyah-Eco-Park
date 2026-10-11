import React, { useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';

// Sticky bar for a long page: search by name, or jump between its parts.
// The active tab follows the reader as they scroll. Used by the food menu
// and the activities guide.
export function QuickNav({
  items,
  activeId,
  onJump,
  query,
  onQueryChange,
  resultCount,
  placeholder = 'Search',
  searchLabel = 'Search',
  ariaLabel = 'Search and sections',
  singular = 'result',
  plural = 'results',
  centered = false
}) {
  const scrollerRef = useRef(null);
  const isSearching = query.trim().length > 0;

  // Keep the active tab in view inside the horizontal scroller.
  useEffect(() => {
    const scroller = scrollerRef.current;
    const tab = scroller?.querySelector('.tab.is-active');
    if (!scroller || !tab) return;
    const target = tab.offsetLeft - (scroller.clientWidth - tab.offsetWidth) / 2;
    scroller.scrollTo({ left: Math.max(0, target), behavior: 'smooth' });
  }, [activeId]);

  return (
    <div className={`tabs-bar menu-nav ${centered ? 'menu-nav--center' : ''}`} role="region" aria-label={ariaLabel}>
      <div className="menu-nav-inner shell">
        <label className={`menu-search ${isSearching ? 'is-filled' : ''}`}>
          <Search size={15} aria-hidden="true" />
          <span className="visually-hidden">{searchLabel}</span>
          <input
            type="search"
            inputMode="search"
            enterKeyHint="search"
            placeholder={placeholder}
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
            autoComplete="off"
          />
          {isSearching && (
            <button type="button" className="menu-search-clear" onClick={() => onQueryChange('')} aria-label="Clear search">
              <X size={14} />
            </button>
          )}
        </label>

        {isSearching ? (
          <p className="label menu-nav-count" role="status" aria-live="polite">
            {resultCount === 0 ? `No ${plural} found` : `${resultCount} ${resultCount === 1 ? singular : plural} found`}
          </p>
        ) : (
          <div className="tabs-scroll menu-nav-tabs" ref={scrollerRef}>
            {items.map((item) => (
              <button
                key={item.id}
                type="button"
                className={`tab ${activeId === item.id ? 'is-active' : ''}`}
                aria-current={activeId === item.id ? 'true' : undefined}
                onClick={() => onJump(item.id)}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default QuickNav;
