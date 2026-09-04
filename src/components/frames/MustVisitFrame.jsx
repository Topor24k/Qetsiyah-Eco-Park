import React from 'react';

export function MustVisitFrame({ onNavigate }) {
  return (
    <div 
      className="frame-view-wrapper must-visit-page" 
      style={{ 
        minHeight: '100vh', 
        width: '100%', 
        backgroundColor: '#eae3d4',
        backgroundImage: 'radial-gradient(ellipse at 50% 50%, #f3ede2 0%, #eae3d4 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        userSelect: 'none',
        padding: '24px'
      }}
    >
      <span 
        style={{
          fontFamily: 'var(--font-sans-ui)',
          fontSize: 'clamp(0.75rem, 1.2vw, 0.95rem)',
          fontWeight: 800,
          letterSpacing: '0.22em',
          color: '#9e7058',
          textTransform: 'uppercase',
          marginBottom: '16px',
          textAlign: 'center'
        }}
      >
        WYATTEL HOTEL (TACURONG CITY)
      </span>
      <h1 
        style={{
          fontFamily: 'var(--font-serif-heading)',
          fontWeight: 700,
          color: '#3d3830',
          fontSize: 'clamp(2.8rem, 6.8vw, 6.4rem)',
          lineHeight: 1.05,
          letterSpacing: '-0.01em',
          textTransform: 'uppercase',
          margin: 0,
          textAlign: 'center'
        }}
      >
        COMING SOON
      </h1>
    </div>
  );
}

export default MustVisitFrame;