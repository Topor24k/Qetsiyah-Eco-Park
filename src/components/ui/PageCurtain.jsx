import React from 'react';

// The film-title card that covers the screen between pages: it wipes in,
// names the destination, then lifts away to reveal it.
export function PageCurtain({ curtain }) {
  if (!curtain) return null;

  return (
    <div className={`curtain is-${curtain.phase}`} aria-hidden="true">
      <span className="curtain-label label">Qetsiyah Eco Park</span>
      <span className="curtain-title display" key={curtain.title}>
        <span className="ln"><span>{curtain.title}</span></span>
      </span>
      <span className="curtain-label label curtain-label--end">Tacurong City</span>
    </div>
  );
}

export default PageCurtain;
