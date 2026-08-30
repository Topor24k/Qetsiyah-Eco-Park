import React from 'react';

export function AboutFrame({ onNavigate }) {
  return (
    <div 
      className="frame-view-wrapper about-page" 
      style={{ 
        minHeight: '100vh', 
        width: '100%', 
        backgroundColor: '#eae3d4',
        backgroundImage: 'radial-gradient(ellipse at 50% 50%, #f3ede2 0%, #eae3d4 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        userSelect: 'none'
      }}
    >
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

export default AboutFrame;
