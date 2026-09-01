import React, { useEffect, useRef, useState } from 'react';

export function AboutStorySection() {
  const containerRef = useRef(null);
  const [progress, setProgress] = useState(0);

  const sentence = "Where families come together, celebrations feel special, adventures begin, and every moment is yours to enjoy.";
  const words = sentence.split(' ');

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      const totalScrollDistance = rect.height - windowHeight;
      let p = -rect.top / totalScrollDistance;
      p = Math.max(0, Math.min(1, p)); 
      setProgress(p);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="about-story-section" ref={containerRef}>
      <div className="about-story-container">
        <h2 className="story-sentence teleprompter-text">
          {words.map((word, i) => {
            const wordStart = i / words.length;
            const wordEnd = (i + 1) / words.length;
            
            let wordOpacity = 0.15;
            if (progress > wordStart) {
               let localProgress = (progress - wordStart) / (wordEnd - wordStart);
               localProgress = Math.min(1, localProgress);
               wordOpacity = 0.15 + (0.85 * localProgress);
            }
            
            return (
              <span 
                key={i} 
                style={{ 
                  opacity: wordOpacity, 
                  transition: 'opacity 0.1s ease-out',
                  color: '#383e24'
                }}
              >
                {word}{' '}
              </span>
            );
          })}
        </h2>
      </div>
    </section>
  );
}

export default AboutStorySection;
